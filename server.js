// Skills Bridge PDX — thin backend.
// Exists only because O*NET and CareerOneStop both require auth headers the
// browser can't send. Everything else is static files.
//
// Zero dependencies on purpose: no npm install, no lockfile, deploys anywhere.
//   node --env-file=.env server.js
//   MOCK=1 node server.js          (fixtures only, no credentials needed)

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as onet from './lib/onet.js';
import * as cos from './lib/careeronestop.js';
import * as jobs from './lib/jobs.js';
import { fixture } from './lib/fixtures.js';

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
      onetConfigured: onet.isConfigured(),
      cosConfigured: cos.isConfigured(),
    });
  },

  'POST /api/match': async (req, res) => {
    const body = await readJsonBody(req);
    const text = (body.text || '').trim();
    if (!text) return fail(res, 400, 'EMPTY_INPUT', 'Tell us about the job you did.');

    // Fixture path is both the pre-credentials dev mode AND the live-demo
    // safety net. If the network dies on stage, the demo still runs.
    if (MOCK || !onet.isConfigured()) {
      return send(res, 200, { ...(await fixture('match')), source: 'fixture' });
    }

    try {
      const occupation = await onet.searchOccupation(text);
      if (!occupation) return fail(res, 404, 'NO_MATCH', "We couldn't match that to an occupation. Try describing the day-to-day work.");
      const [skills, related] = await Promise.all([
        onet.getSkills(occupation.code),
        onet.getRelated(occupation.code),
      ]);
      send(res, 200, { occupation, skills, related, source: 'onet' });
    } catch (err) {
      console.error('[match] upstream failed, serving fixture:', err.message);
      send(res, 200, { ...(await fixture('match')), source: 'fixture' });
    }
  },

  'GET /api/gap': async (req, res, url) => {
    const from = url.searchParams.get('from');
    const to = url.searchParams.get('to');
    if (!from || !to) return fail(res, 400, 'MISSING_PARAM', 'Need both ?from= and ?to= occupation codes.');

    if (MOCK || !cos.isConfigured()) {
      return send(res, 200, { ...(await fixture('gap')), source: 'fixture' });
    }

    try {
      send(res, 200, { ...(await cos.getSkillsGap(from, to)), source: 'careeronestop' });
    } catch (err) {
      console.error('[gap] upstream failed, serving fixture:', err.message);
      send(res, 200, { ...(await fixture('gap')), source: 'fixture' });
    }
  },

  'GET /api/jobs': async (req, res, url) => {
    const code = url.searchParams.get('code');
    if (!code) return fail(res, 400, 'MISSING_PARAM', 'Need ?code= an occupation code.');
    send(res, 200, await jobs.findForOccupation(code));
  },
};

// --- static files ---------------------------------------------------------

async function serveStatic(req, res, url) {
  const rel = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
  // normalize() collapses ../ before we join, so a crafted path can't escape /public.
  const path = join(PUBLIC_DIR, normalize(rel));
  if (!path.startsWith(PUBLIC_DIR)) return fail(res, 403, 'FORBIDDEN', 'Nope.');

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
  console.log(`  MOCK=${MOCK ? '1 (serving fixtures)' : '0 (live API calls)'}`);
  console.log(`  O*NET credentials: ${onet.isConfigured() ? 'set' : 'MISSING'}`);
  console.log(`  CareerOneStop credentials: ${cos.isConfigured() ? 'set' : 'MISSING'}`);
});
