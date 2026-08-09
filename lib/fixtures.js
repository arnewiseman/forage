// Canned normalized responses.
//
// Two jobs, one artifact:
//   1. MOCK=1 dev mode, so the frontend is buildable before credentials exist.
//   2. The demo safety net the PRD calls for — if O*NET is down or rate-limited
//      on stage, the routes fall back here instead of dying on a network call.
//
// These are shaped exactly like API.md. They are NOT verified against real API
// output yet — Engineer A overwrites them with a real captured response the
// first time a live call succeeds (see scripts/capture-fixture.sh).

import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = join(fileURLToPath(new URL('../data/fixtures/', import.meta.url)));
const cache = new Map();

export async function fixture(name) {
  if (!cache.has(name)) {
    cache.set(name, JSON.parse(await readFile(join(DIR, `${name}.json`), 'utf8')));
  }
  // Clone so a caller spreading extra keys onto it can't poison the cache.
  return structuredClone(cache.get(name));
}
