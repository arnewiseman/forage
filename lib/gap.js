// Skills gap, computed locally from O*NET. OWNER: backend.
//
// CareerOneStop's Skills Gap API needs a registered account. We don't need it:
// data/onet.json carries importance scores per occupation, so the gap is a
// diff of two vectors. Same answer, no credentials, no network call.
//
// Three dimensions, because one isn't enough:
//   Skills     — O*NET's 35 competencies. Nearly identical across office jobs,
//                so on its own this returns an empty gap. Kept for coverage.
//   Knowledge  — where two white-collar roles actually diverge (Mathematics
//                63 vs 81 between ad manager and market research analyst).
//   Technology — hot technologies employers name in postings. "You're missing
//                Redshift and Hadoop" is the most concrete thing we can say.
//
// If CareerOneStop credentials show up, server.js prefers that API and this
// becomes the fallback. Both return the identical shape (see API.md).

import { getRecord } from './onet.js';

// A rated item counts as "already have" if your occupation scores within this
// many points of the target's. Below that, it's a real gap.
const TOLERANCE = 8;

function ratedNote(target, yours) {
  const gap = target - yours;
  if (yours === 0) return 'Not rated in your occupation at all — this is the real jump.';
  if (gap >= 20) return `Far more central here: ${yours} vs ${target} out of 100.`;
  if (gap >= 12) return `You use this, but the target leans harder on it (${yours} vs ${target}).`;
  return `A modest step up (${yours} vs ${target}).`;
}

/** Diff one rated dimension (skills or knowledge) into have/missing buckets. */
function diffRated(fromList, toList, depth) {
  const yours = new Map(fromList.map((item) => [item.name, item.importance]));
  const have = [];
  const missing = [];

  for (const item of toList.slice(0, depth)) {
    const mine = yours.get(item.name) ?? 0;
    if (mine >= item.importance - TOLERANCE) {
      have.push({ name: item.name, note: '', rank: mine });
    } else {
      missing.push({
        name: item.name,
        note: ratedNote(item.importance, mine),
        rank: item.importance - mine,
      });
    }
  }
  return { have, missing };
}

/**
 * @param {string} from O*NET-SOC code of the matched occupation
 * @param {string} to   O*NET-SOC code of the target occupation
 */
export async function computeGap(from, to) {
  const [fromOcc, toOcc] = await Promise.all([getRecord(from), getRecord(to)]);

  if (!fromOcc || !toOcc) {
    const err = new Error('Unknown occupation code.');
    err.code = 'NO_MATCH';
    throw err;
  }

  const skills = diffRated(fromOcc.skills, toOcc.skills, 12);
  const knowledge = diffRated(fromOcc.knowledge, toOcc.knowledge, 10);

  // Tools are a plain set difference — you either use Hadoop or you don't.
  const yourTech = new Set(fromOcc.tech);
  const missingTech = toOcc.tech.filter((tool) => !yourTech.has(tool)).slice(0, 4);
  const sharedTech = toOcc.tech.filter((tool) => yourTech.has(tool)).slice(0, 3);

  const missing = [
    // Rated gaps first — they're the "why", the tools are the "what".
    ...[...knowledge.missing, ...skills.missing].sort((a, b) => b.rank - a.rank).slice(0, 4),
    ...missingTech.map((tool) => ({
      name: tool,
      note: 'Listed as a hot technology for this role, not for yours.',
    })),
  ];

  const have = [
    ...[...skills.have, ...knowledge.have].sort((a, b) => b.rank - a.rank).slice(0, 7),
    ...sharedTech.map((tool) => ({ name: tool, note: 'You already use this.' })),
  ];

  return {
    from: { code: fromOcc.code, title: fromOcc.title },
    to: { code: toOcc.code, title: toOcc.title },
    have: have.map(({ name, note }) => ({ name, note })),
    missing: missing.map(({ name, note }) => ({ name, note })),
  };
}
