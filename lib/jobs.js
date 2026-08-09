// Match a target occupation to real open Portland roles. OWNER: backend.
//
// Live boards have no O*NET SOC codes on them, so matching is title-token
// overlap between the occupation title and the job title. That's crude, and we
// say so in the UI rather than dressing it up as semantic matching.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { fetchPortlandJobs } from './boards.js';

const DATA = fileURLToPath(new URL('../data/', import.meta.url));
const cache = new Map();

async function load(name) {
  if (!cache.has(name)) {
    cache.set(name, JSON.parse(await readFile(`${DATA}${name}.json`, 'utf8')));
  }
  return cache.get(name);
}

// Words that appear in half of all O*NET titles and carry no signal.
const STOP = new Set([
  'and', 'or', 'of', 'the', 'for', 'all', 'other', 'general', 'first',
  'line', 'except', 'workers', 'occupation', 'occupations', 'staff',
  'senior', 'junior', 'lead', 'principal', 'ii', 'iii', 'sr', 'jr',
]);

// Crude singularization is enough: "Analysts" and "Analyst" must collide.
const tokenize = (text) =>
  new Set(
    String(text)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((word) => word.length > 2 && !STOP.has(word))
      .map((word) => (word.endsWith('s') && !word.endsWith('ss') ? word.slice(0, -1) : word))
  );

function score(occupationTokens, job) {
  const jobTokens = tokenize(job.title);
  let shared = 0;
  for (const token of jobTokens) if (occupationTokens.has(token)) shared++;
  // A local role outranks an equally-matched remote one.
  return shared > 0 ? shared * 10 - (job.remote ? 1 : 0) : 0;
}

/**
 * @param {string} code  O*NET-SOC code (carried through for display only)
 * @param {string} title Occupation title — this is what actually drives matching
 */
export async function findForOccupation(code, title) {
  let pool = [];
  let live = false;
  let boards = null;

  try {
    const result = await fetchPortlandJobs();
    pool = result.jobs;
    boards = `${result.boardsOk}/${result.boardsTried}`;
    live = pool.length > 0;
  } catch (err) {
    console.warn('[jobs] live fetch failed, using snapshot:', err.message);
  }

  // Committed snapshot — the demo safety net. Regenerate with
  // `node scripts/snapshot-jobs.mjs`.
  if (!pool.length) {
    const snapshot = await load('portland-jobs');
    pool = snapshot.jobs || [];
  }

  const occupationTokens = tokenize(title || '');
  const matches = pool
    .map((job) => ({ job, points: score(occupationTokens, job) }))
    .filter((entry) => entry.points > 0)
    .sort((a, b) => b.points - a.points)
    .slice(0, 8)
    .map((entry) => entry.job);

  if (matches.length) {
    return { matches, fallback: null, live, boards, matchedOn: title };
  }

  // The honest dead end. The PRD is explicit: say so, then point somewhere real.
  const { sectors, resource } = await load('growth-sectors');
  return {
    matches: [],
    live,
    boards,
    matchedOn: title,
    fallback: {
      message:
        `None of the ${pool.length} open Portland-area roles we can see right now line up with ` +
        `${title || 'that occupation'}. That's a gap in the boards we watch, not a verdict on you — ` +
        `here's where the metro is actually growing.`,
      sectors,
      resource,
    },
  };
}
