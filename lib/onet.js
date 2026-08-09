// O*NET Web Services client.  OWNER: Engineer A
//
// THE ONE RULE: this file returns *our* shape (see API.md), never O*NET's.
// Everything upstream-specific stops here. When you find out what the API
// really returns, you edit the normalize* functions below and nothing else in
// the codebase changes.
//
// Register: https://services.onetcenter.org/   (Basic Auth: username:password)
// Docs:     https://services.onetcenter.org/reference/

const BASE = 'https://services.onetcenter.org/ws';
const TIMEOUT_MS = 8000;

export function isConfigured() {
  return Boolean(process.env.ONET_USERNAME && process.env.ONET_PASSWORD);
}

async function get(path, params = {}) {
  const url = new URL(BASE + path);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  const auth = Buffer.from(
    `${process.env.ONET_USERNAME}:${process.env.ONET_PASSWORD}`
  ).toString('base64');

  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
      // O*NET asks callers to identify themselves.
      'User-Agent': 'skills-bridge-pdx/0.1 (hackathon)',
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!res.ok) throw new Error(`O*NET ${res.status} on ${path}: ${await res.text()}`);
  return res.json();
}

// --- normalize ------------------------------------------------------------
// VERIFY each field path against a real response before trusting it. Run:
//   ./scripts/capture-fixture.sh
// and read the raw JSON. Optional chaining everywhere is deliberate — a shape
// surprise should degrade one field, not 500 the whole request.

function normalizeOccupation(raw) {
  if (!raw) return null;
  return {
    code: raw.code ?? raw.onetsoc_code ?? '',
    title: raw.title ?? '',
    description: raw.description ?? raw.what_they_do ?? '',
  };
}

function normalizeSkills(raw) {
  const list = raw?.element ?? raw?.skills ?? [];
  return list
    .map((s) => ({
      name: s.name ?? s.title ?? '',
      description: s.description ?? '',
      // O*NET importance comes back on a 0–100 scale in `score.value` on the
      // summary endpoints. VERIFY — some endpoints use 1–5 instead.
      importance: Math.round(s.score?.value ?? s.value ?? 0),
    }))
    .filter((s) => s.name)
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 8);
}

function normalizeRelated(raw) {
  const list = raw?.occupation ?? raw?.related_occupation ?? [];
  return list.slice(0, 5).map((o) => ({
    code: o.code ?? o.href?.split('/').pop() ?? '',
    title: o.title ?? '',
    // O*NET gives no plain-language overlap, so we write one. Keep it a real
    // sentence — "82% similar" is exactly the useless output Dana already gets
    // everywhere else. Upgrade this to a Claude call if there's time left.
    overlap: describeOverlap(o.title),
  }));
}

function describeOverlap(title) {
  return `Shares most of the day-to-day skills you already use — ${title} is a realistic next step, not a restart.`;
}

// --- public API -----------------------------------------------------------

/** Free-text job description → single best-matching occupation, or null. */
export async function searchOccupation(text) {
  // VERIFY: /online/search?keyword= returns { occupation: [...] } ranked by relevance.
  const raw = await get('/online/search', { keyword: text, start: 1, end: 1 });
  return normalizeOccupation(raw?.occupation?.[0]);
}

/** Occupation code → top skills, sorted by importance desc. */
export async function getSkills(code) {
  const raw = await get(`/online/occupations/${encodeURIComponent(code)}/summary/skills`);
  return normalizeSkills(raw);
}

/** Occupation code → 3–5 adjacent occupations with a plain-language overlap line. */
export async function getRelated(code) {
  const raw = await get(`/online/occupations/${encodeURIComponent(code)}/related_occupations`);
  return normalizeRelated(raw);
}
