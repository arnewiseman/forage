// Local job matching. OWNER: Engineer A (but it needs no credentials, so it's
// done and testable at minute zero — this route works before anything else does).
//
// Reads the hand-assembled, disclosed datasets in /data. No network calls.

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA = fileURLToPath(new URL('../data/', import.meta.url));
const cache = new Map();

async function load(name) {
  if (!cache.has(name)) {
    cache.set(name, JSON.parse(await readFile(join(DATA, `${name}.json`), 'utf8')));
  }
  return cache.get(name);
}

// "13-1161.00" → "13-1161". Listings tagged with a slightly different suffix
// than O*NET returns should still match; the detail after the dot is noise here.
const group = (code) => String(code).trim().split('.')[0];

/**
 * @param {string} code O*NET-SOC code
 * @returns {Promise<{matches: object[], fallback: object|null}>}
 */
export async function findForOccupation(code) {
  const { jobs } = await load('portland-jobs');
  const target = group(code);

  const matches = jobs.filter((job) =>
    (job.socCodes || []).some((c) => group(c) === target)
  );

  if (matches.length) return { matches, fallback: null };

  // The honest dead end. The PRD is explicit: say so, then point somewhere real.
  const { sectors, resource } = await load('growth-sectors');
  return {
    matches: [],
    fallback: {
      message:
        'No open Portland-area role in our dataset maps to this occupation right now. ' +
        "That's a gap in our list, not a verdict on you — here's where the metro is actually growing.",
      sectors,
      resource,
    },
  };
}
