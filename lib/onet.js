// O*NET, served from the public-domain bulk database. OWNER: backend.
//
// services.onetcenter.org returns 401 without a registered account, and
// registration is human-reviewed. The same data ships as a free public-domain
// download with no account at all, so we build data/onet.json from it
// (scripts/build-onet.mjs) and answer locally.
//
// That's not a workaround, it's better: no credentials, no rate limits, no
// network call that can die mid-demo, sub-millisecond responses. O*NET
// publishes roughly annually, so "live" would buy us nothing.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const PATH = fileURLToPath(new URL('../data/onet.json', import.meta.url));

let db = null;
async function load() {
  if (db) return db;
  const raw = JSON.parse(await readFile(PATH, 'utf8'));
  db = {
    release: raw.release,
    list: raw.occupations,
    byCode: new Map(raw.occupations.map((o) => [o.code, o])),
  };
  return db;
}

// Always available — that's the entire point of doing it this way.
export function isConfigured() {
  return true;
}

// --- text matching --------------------------------------------------------

const STOP = new Set([
  'and', 'the', 'for', 'with', 'was', 'were', 'have', 'has', 'had', 'been',
  'this', 'that', 'from', 'they', 'them', 'their', 'our', 'his', 'her',
  'about', 'into', 'over', 'out', 'all', 'other', 'more', 'most', 'some',
  'year', 'years', 'work', 'worked', 'working', 'job', 'jobs', 'role',
  'roles', 'company', 'companies', 'team', 'teams', 'also', 'would',
]);

// Crude prefix stemming: "manager", "managed", "managing", "management" all
// collapse to "manag". Beats a real stemmer for effort-per-point here.
const stem = (word) => (word.length > 5 ? word.slice(0, 5) : word);

function tokens(text) {
  return new Set(
    String(text)
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
      .map(stem)
  );
}

function overlap(setA, setB) {
  let n = 0;
  for (const item of setA) if (setB.has(item)) n++;
  return n;
}

// Token sets are derived once per occupation, then cached on the record.
function indexOf(occ) {
  if (!occ._idx) {
    occ._idx = {
      title: tokens(occ.title),
      alts: tokens(occ.alts.join(' ')),
      desc: tokens(occ.description),
      altPhrases: occ.alts.map((a) => a.toLowerCase()).filter((a) => a.length >= 9),
    };
  }
  return occ._idx;
}

function scoreOccupation(occ, input, inputTokens) {
  const idx = indexOf(occ);
  let score =
    overlap(inputTokens, idx.title) * 6 +
    overlap(inputTokens, idx.alts) * 3 +
    overlap(inputTokens, idx.desc);

  // "ad operations manager" appearing verbatim in the input is the strongest
  // signal there is — alternate titles are what people actually call the job.
  for (const phrase of idx.altPhrases) {
    if (input.includes(phrase)) {
      score += 25;
      break;
    }
  }
  return score;
}

// --- public API -----------------------------------------------------------
// Same three functions the live-API version exposed, so nothing downstream
// knows or cares where the data comes from.

/** Free-text job description → single best-matching occupation, or null. */
export async function searchOccupation(text) {
  const { list } = await load();
  const input = String(text).toLowerCase();
  const inputTokens = tokens(text);
  if (!inputTokens.size) return null;

  let best = null;
  let bestScore = 0;
  for (const occ of list) {
    const score = scoreOccupation(occ, input, inputTokens);
    if (score > bestScore) {
      bestScore = score;
      best = occ;
    }
  }

  // Below this, matches are coincidental token collisions. Better to say we
  // don't know than to send someone down a wrong path.
  if (!best || bestScore < 8) return null;
  return { code: best.code, title: best.title, description: best.description };
}

/** Occupation code → top skills for display, sorted by importance desc. */
export async function getSkills(code, limit = 8) {
  const { byCode } = await load();
  return (byCode.get(code)?.skills ?? []).slice(0, limit).map((s) => ({
    name: s.name,
    description: '',
    importance: s.importance,
  }));
}

/** Full stored record — skills, knowledge, tech. Used by the gap diff. */
export async function getRecord(code) {
  const { byCode } = await load();
  return byCode.get(code) ?? null;
}

export async function getOccupation(code) {
  const { byCode } = await load();
  const occ = byCode.get(code);
  return occ ? { code: occ.code, title: occ.title, description: occ.description } : null;
}

/** Occupation code → adjacent occupations with a plain-language overlap line. */
export async function getRelated(code) {
  const { byCode } = await load();
  const occ = byCode.get(code);
  if (!occ) return [];

  const source = new Map(occ.skills.map((s) => [s.name, s.importance]));

  return occ.related
    .map((relatedCode) => byCode.get(relatedCode))
    .filter(Boolean)
    .map((rel) => ({
      code: rel.code,
      title: rel.title,
      overlap: describeOverlap(source, rel),
    }));
}

// O*NET gives a relatedness tier, not an explanation. "82% similar" is exactly
// the useless output Dana already gets everywhere else, so we name the actual
// shared skills instead.
function describeOverlap(sourceSkills, target) {
  const shared = target.skills
    .filter((s) => (sourceSkills.get(s.name) ?? 0) >= s.importance - 10)
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 3)
    .map((s) => s.name.toLowerCase());

  if (!shared.length) {
    return `A recognized step across from your occupation — the day-to-day differs more than most on this list.`;
  }
  const list =
    shared.length === 1
      ? shared[0]
      : `${shared.slice(0, -1).join(', ')} and ${shared[shared.length - 1]}`;
  return `Leans on the same ${list} you already use — this is a step across, not a restart.`;
}
