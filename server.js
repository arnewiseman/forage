// Skills Bridge PDX — thin backend.
//
// Zero dependencies, zero credentials, no build step:
//   npm start
//
// O*NET runs off a local copy of the public-domain bulk database
// (scripts/build-onet.mjs). Jobs come live from Greenhouse's and Lever's
// public board APIs. Nothing here needs an API key. CareerOneStop is the one
// optional upgrade — if its credentials exist, /api/gap prefers it.

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as onet from './lib/onet.js';
import * as cos from './lib/careeronestop.js';
import * as jobs from './lib/jobs.js';
import { computeGap } from './lib/gap.js';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC_DIR = join(ROOT, 'public');
const PORT = process.env.PORT || 3000;
const MOCK = process.env.MOCK === '1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function send(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(payload);
}

function fail(res, status, code, message) {
  send(res, status, { error: message, code });
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
    // A job description is a paragraph. Anything bigger is not a job description.
    if (chunks.reduce((n, c) => n + c.length, 0) > 100_000) throw new Error('BODY_TOO_LARGE');
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

// --- routes ---------------------------------------------------------------

const routes = {
  'GET /api/health': async (_req, res) => {
    send(res, 200, {
      ok: true,
      mock: MOCK,
      onet: 'local (public-domain bulk database, no credentials)',
      gap: cos.isConfigured() ? 'careeronestop' : 'local importance diff',
      jobs: 'live Greenhouse + Lever (public APIs)',
    });
  },

  // Served from data/onet.json, built from O*NET's public-domain bulk
  // download. No credentials, no network call, nothing to fail on stage.
  'POST /api/match': async (req, res) => {
    const body = await readJsonBody(req);
    const text = (body.text || '').trim();
    if (!text) return fail(res, 400, 'EMPTY_INPUT', 'Tell us about the job you did.');

    const occupation = await onet.searchOccupation(text);
    if (!occupation) {
      return fail(res, 404, 'NO_MATCH', "We couldn't match that to an occupation. Try describing the day-to-day work.");
    }
    const [skills, related] = await Promise.all([
      onet.getSkills(occupation.code),
      onet.getRelated(occupation.code),
    ]);
    send(res, 200, { occupation, skills, related, source: 'onet-local' });
  },

  // Local importance diff by default. CareerOneStop only if credentials exist,
  // and it falls back here rather than erroring.
  'GET /api/gap': async (req, res, url) => {
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    if (!from || !to) return fail(res, 400, 'MISSING_PARAM', 'Need both ?from= and ?to= occupation codes.');

    if (!MOCK && cos.isConfigured()) {
      try {
        return send(res, 200, { ...(await cos.getSkillsGap(from, to)), source: 'careeronestop' });
      } catch (err) {
        console.error('[gap] CareerOneStop failed, computing locally:', err.message);
      }
    }

    try {
      send(res, 200, { ...(await computeGap(from, to)), source: 'onet-local' });
    } catch (err) {
      fail(res, err.code === 'NO_MATCH' ? 404 : 500, err.code || 'SERVER_ERROR', err.message);
    }
  },

  // Live Greenhouse + Lever, both public and unauthenticated. Falls back to the
  // committed snapshot if the boards are unreachable.
  'GET /api/jobs': async (req, res, url) => {
    const code = url.searchParams.get('code');
    const title = url.searchParams.get('title');
    if (!code) return fail(res, 400, 'MISSING_PARAM', 'Need ?code= an occupation code.');
    // Title drives the matching — board postings carry no SOC codes.
    if (!title) return fail(res, 400, 'MISSING_PARAM', 'Need ?title= the occupation title.');
    send(res, 200, await jobs.findForOccupation(code, title));
  },
};

// --- static files ---------------------------------------------------------

// The browser now imports lib/ and fetches data/ directly (that's what makes
// the static build possible), so dev has to serve them from the repo root the
// same way the static host will.
const ROOT_SERVED = ['/lib/', '/data/'];

async function serveStatic(req, res, url) {
  const rel = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  const base = ROOT_SERVED.some((p) => url.pathname.startsWith(p)) ? ROOT : PUBLIC_DIR;
  // normalize() collapses ../ before we join, so a crafted path can't escape base.
  const path = join(base, normalize(rel));
  if (!path.startsWith(base)) return fail(res, 403, 'FORBIDDEN', 'Nope.');

  try {
    const file = await readFile(path);
    res.writeHead(200, { 'content-type': MIME[extname(path)] || 'application/octet-stream' });
    res.end(file);
  } catch {
    fail(res, 404, 'NOT_FOUND', `No such path: ${url.pathname}`);
  }
}

// --- wiring ---------------------------------------------------------------

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const handler = routes[`${req.method} ${url.pathname}`];

  try {
    if (handler) await handler(req, res, url);
    else if (url.pathname.startsWith('/api/')) fail(res, 404, 'NOT_FOUND', `No route ${req.method} ${url.pathname}`);
    else await serveStatic(req, res, url);
  } catch (err) {
    console.error('[server]', err);
    if (!res.headersSent) fail(res, 500, 'SERVER_ERROR', err.message);
  }
});

server.listen(PORT, () => {
  console.log(`Skills Bridge PDX  →  http://localhost:${PORT}`);
  console.log(`  O*NET: local bulk database (no credentials)`);
  console.log(`  Gap: ${cos.isConfigured() ? "CareerOneStop API" : "local importance diff"}`);
  console.log(`  Jobs: live Greenhouse + Lever`);
});
