// Assemble dist/ for static hosting.
//
//   node scripts/build-static.mjs
//
// Not a build step in the bundler sense — nothing is compiled, transpiled or
// minified. It's a copy, because the browser needs public/, lib/ and data/
// sitting at the same origin in the layout their relative imports expect:
//
//   dist/index.html          <- public/
//   dist/lib/onet.js         <- lib/          (imported by public/api.js)
//   dist/data/onet.json      <- data/         (fetched by lib/onet.js)
//
// server.js serves the identical layout in dev, so what you test is what ships.

import { cp, rm, mkdir, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');

// Server-only modules. Shipping them would be harmless (the repo is public)
// but they'd be dead weight the browser might try to resolve.
const SERVER_ONLY = new Set(['careeronestop.js']);

// Docs live next to the code they describe; they don't belong on the CDN.
const SKIP_EXT = new Set(['.md']);

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

await cp(join(ROOT, 'public'), DIST, {
  recursive: true,
  filter: (src) => !SKIP_EXT.has(src.slice(src.lastIndexOf('.'))),
});

await cp(join(ROOT, 'lib'), join(DIST, 'lib'), {
  recursive: true,
  filter: (src) => !SERVER_ONLY.has(src.slice(src.lastIndexOf('/') + 1)),
});

await cp(join(ROOT, 'data'), join(DIST, 'data'), { recursive: true });

// Report what shipped, so a missing data file is obvious before deploy.
async function walk(dir, prefix = '') {
  const out = [];
  for (const entry of await readdir(dir)) {
    const full = join(dir, entry);
    if ((await stat(full)).isDirectory()) out.push(...(await walk(full, `${prefix}${entry}/`)));
    else out.push([`${prefix}${entry}`, (await stat(full)).size]);
  }
  return out;
}

const files = (await walk(DIST)).sort((a, b) => b[1] - a[1]);
const total = files.reduce((n, [, size]) => n + size, 0);
console.log(`dist/ — ${files.length} files, ${(total / 1048576).toFixed(1)} MB`);
for (const [name, size] of files.slice(0, 8)) {
  console.log(`  ${(size / 1024).toFixed(0).padStart(6)} KB  ${name}`);
}
