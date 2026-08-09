// CareerOneStop Skills Gap client.  OWNER: Engineer A
//
// Same rule as lib/onet.js: returns *our* shape (API.md), never theirs.
//
// Register: https://www.careeronestop.org/Developers/WebAPI/registration.aspx
// Auth:     Bearer token in the header, userId baked into the URL path.
// Docs:     https://api.careeronestop.org/api-explorer/home/index/Skills_GetSkillsGap

const BASE = 'https://api.careeronestop.org/v1';
const TIMEOUT_MS = 8000;

export function isConfigured() {
  return Boolean(process.env.CAREERONESTOP_USER_ID && process.env.CAREERONESTOP_TOKEN);
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${process.env.CAREERONESTOP_TOKEN}`,
      Accept: 'application/json',
    },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`CareerOneStop ${res.status} on ${path}: ${await res.text()}`);
  return res.json();
}

// --- normalize ------------------------------------------------------------
// VERIFY against a real response. CareerOneStop uses PascalCase and is
// inconsistent about it, hence the ?? chains.

function normalizeGap(raw, from, to) {
  const rows = raw?.SkillsGap ?? raw?.Skills ?? [];

  const have = [];
  const missing = [];
  for (const row of rows) {
    const entry = { name: row.ElementName ?? row.SkillName ?? '', note: '' };
    if (!entry.name) continue;
    // VERIFY: the flag distinguishing "already have" from "need to learn".
    // Could be a boolean, could be a score comparison between the two
    // occupations. Whichever it is, resolve it HERE, not in the frontend.
    const hasIt = row.SkillGapFlag === 'N' || row.HasSkill === true;
    (hasIt ? have : missing).push(entry);
  }

  return {
    from: { code: from, title: raw?.OccupationTitle1 ?? '' },
    to: { code: to, title: raw?.OccupationTitle2 ?? '' },
    have,
    // Demo depends on the first missing skill being the interesting one.
    // If the API order is boring, sort it here.
    missing,
  };
}

// --- public API -----------------------------------------------------------

/** Two occupation codes → { from, to, have[], missing[] }. */
export async function getSkillsGap(from, to) {
  const userId = process.env.CAREERONESTOP_USER_ID;
  const path =
    `/skillsgap/${encodeURIComponent(userId)}` +
    `/${encodeURIComponent(from)}/${encodeURIComponent(to)}`;
  return normalizeGap(await get(path), from, to);
}
