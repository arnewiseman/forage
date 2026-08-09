// Match a target occupation to real open Portland roles. OWNER: backend.
//
// Live boards have no O*NET SOC codes on them, so matching happens on titles.
// The occupation's canonical title is bureaucratic ("Market Research Analysts
// and Marketing Specialists") and overlaps everything on a generic word, so we
// match against O*NET's ~60 alternate titles per occupation instead — those are
// worded the way postings are. Still title matching, and we say so in the UI.

import { loadJson } from './loadJson.js';
import { fetchPortlandJobs } from './boards.js';
import { getAltTitles } from './onet.js';

const DATA = new URL('../data/', import.meta.url);
const cache = new Map();

async function load(name) {
  if (!cache.has(name)) {
    cache.set(name, await loadJson(new URL(`${name}.json`, DATA)));
  }
  return cache.get(name);
}

// Words that appear in half of all O*NET titles and carry no signal.
const STOP = new Set([
  'and', 'or', 'of', 'the', 'for', 'all', 'other', 'general', 'first',
  'line', 'except', 'workers', 'occupation', 'occupations', 'staff',
  'senior', 'junior', 'lead', 'principal', 'ii', 'iii', 'iv', 'sr', 'jr',
]);

// Words that describe the SHAPE of a role, never its domain. A posting that
// overlaps an occupation only here has told us nothing — this list is what
// keeps "Customer Solutions Analyst II" out of "Market Research Analysts".
const GENERIC = new Set([
  'analyst', 'specialist', 'manager', 'associate', 'coordinator', 'director',
  'representative', 'rep', 'consultant', 'assistant', 'supervisor', 'executive',
  'officer', 'agent', 'worker', 'professional', 'administrator', 'technician',
  'engineer', 'developer', 'partner', 'advisor', 'clerk', 'business',
  'development', 'president', 'chief', 'head', 'service',
]);

// The plural strip below can't see that "Manager, Software Engineering" and
// "Software Engineer" are the same word to a human. Two aliases buy most of it.
const ALIAS = new Map([
  ['management', 'manager'],
  ['engineering', 'engineer'],
]);

// Crude singularization is enough: "Analysts" and "Analyst" must collide.
const tokenize = (text) =>
  new Set(
    String(text)
      .toLowerCase()
      // "Certified Public Accountant (CPA)" — the parenthetical is an echo of
      // the title it follows, and counting it wrecks the coverage ratio.
      .replace(/\([^)]*\)/g, ' ')
      .split(/[^a-z0-9]+/)
      // Two letters, not three: "RN", "IT" and "HR" are the whole domain of the
      // alt titles they appear in, and dropping them left "Medical RN" as the
      // bare word "medical", which matched a veterinarian posting.
      .filter((word) => word.length > 1 && !STOP.has(word))
      .map((word) => (word.endsWith('s') && !word.endsWith('ss') ? word.slice(0, -1) : word))
      .map((word) => ALIAS.get(word) ?? word)
  );

// A posting matches an alternate title when it reproduces that title: all of
// its words, or 60% of them including two domain words. So "Marketing Analyst"
// is never satisfied by "Analyst", and "Customer Care Specialist" isn't
// satisfied by "Health Care Specialist" — one soft word plus a job-title suffix
// is a coincidence, not a match.
function scoreTitle(tokens, jobTokens) {
  let specific = 0;
  let generic = 0;
  for (const token of tokens) {
    if (!jobTokens.has(token)) continue;
    if (GENERIC.has(token)) generic++;
    else specific++;
  }

  const covered = specific + generic;
  const complete = covered === tokens.size;
  if (!specific || covered / tokens.size < 0.6) return 0;
  if (!complete && specific < 2) return 0;
  // Domain words carry the match; generic ones only break ties between alts.
  return specific * 20 + generic * 5 + (complete ? 15 : 0);
}

// One domain word in common and nothing else. Real, but thin — kept only when
// nothing better exists, which is also the path for the handful of occupations
// our O*NET build carries no alternate titles for.
const WEAK = 10;

// Sixty alt titles against a hundred postings: tokenize the occupation once.
function indexOccupation(title, alts) {
  return {
    titles: [title, ...alts].map(tokenize).filter((tokens) => tokens.size),
    // Only the canonical title feeds the weak signal. The alt titles collectively
    // mention half the dictionary — "Field Nurse" would drag in "Field Marketing".
    domain: new Set([...tokenize(title)].filter((token) => !GENERIC.has(token))),
  };
}

function score(occupation, job) {
  const jobTokens = tokenize(job.title);

  let best = 0;
  for (const tokens of occupation.titles) best = Math.max(best, scoreTitle(tokens, jobTokens));
  if (best) return best;

  for (const token of occupation.domain) if (jobTokens.has(token)) return WEAK;
  return 0;
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

  const occupation = indexOccupation(title || '', await getAltTitles(code));
  const scored = pool
    .map((job) => ({ job, points: score(occupation, job) }))
    .filter((entry) => entry.points > 0);

  // Relative floor: once a posting reproduces a real alternate title, the ones
  // hanging on by a single word are noise. When nothing scores well, they're
  // the best we have and they stay. Fewer, better beats more, looser.
  const top = Math.max(0, ...scored.map((entry) => entry.points));
  const matches = scored
    .filter((entry) => entry.points >= Math.max(WEAK, top * 0.35))
    // A local role outranks an equally-matched remote one.
    .sort((a, b) => b.points - a.points || Number(a.job.remote) - Number(b.job.remote))
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
