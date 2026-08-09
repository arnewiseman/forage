// Regenerate data/portland-jobs.json from the live boards.
//
//   node scripts/snapshot-jobs.mjs
//
// The result is the demo safety net: if every board is unreachable on stage,
// lib/jobs.js serves this instead. It's real data with a real timestamp, so
// the disclosure line stays true either way. Re-run it the morning of.

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { fetchPortlandJobs, SOURCES } from '../lib/boards.js';

const OUT = fileURLToPath(new URL('../data/portland-jobs.json', import.meta.url));

const { jobs, boardsOk, boardsTried } = await fetchPortlandJobs({ force: true });

const snapshot = {
  _README: 'GENERATED — do not hand-edit. Run: node scripts/snapshot-jobs.mjs',
  pulledAt: new Date().toISOString().slice(0, 10),
  boards: `${boardsOk}/${boardsTried} reachable`,
  sources: SOURCES.map((s) => `${s.company} (${s.type})`),
  disclosure:
    "Pulled from Greenhouse and Lever's public, unauthenticated job board APIs. " +
    'Served live; this file is the offline fallback.',
  jobs,
};

await writeFile(OUT, JSON.stringify(snapshot, null, 2) + '\n');
console.log(`wrote ${jobs.length} Portland-area jobs from ${boardsOk}/${boardsTried} boards`);
for (const job of jobs) {
  console.log(`  ${job.remote ? 'remote' : 'metro '}  ${job.company} — ${job.title}`);
}
