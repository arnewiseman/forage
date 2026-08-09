// Client-side data layer. Same three operations the server's /api/* routes
// expose, computed in the browser instead.
//
// This is what lets the app deploy to a static host with no backend: O*NET is
// a local JSON file, the skills gap is arithmetic over it, and all four job
// board APIs send `Access-Control-Allow-Origin: *`.
//
// It imports the SAME lib/ modules the server uses — not a reimplementation —
// so the two can't drift. See lib/loadJson.js for how that works.

import * as onet from './lib/onet.js';
import * as jobs from './lib/jobs.js';
import { computeGap } from './lib/gap.js';

/** Free text → { occupation, skills, related }. Throws NO_MATCH. */
export async function match(text) {
  const trimmed = String(text).trim();
  if (!trimmed) {
    throw new Error('Tell us about the job you did.');
  }

  const occupation = await onet.searchOccupation(trimmed);
  if (!occupation) {
    throw new Error(
      "We couldn't match that to an occupation. Try describing the day-to-day work."
    );
  }

  const [skills, related] = await Promise.all([
    onet.getSkills(occupation.code),
    onet.getRelated(occupation.code),
  ]);
  return { occupation, skills, related, source: 'onet-local' };
}

/** Two occupation codes → { from, to, have[], missing[] }. */
export async function gap(from, to) {
  return { ...(await computeGap(from, to)), source: 'onet-local' };
}

/** Target occupation → live Portland roles, or the growth-sector fallback. */
export async function findJobs(code, title) {
  return jobs.findForOccupation(code, title);
}
