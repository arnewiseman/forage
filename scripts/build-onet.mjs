// Build data/onet.json from O*NET's PUBLIC database download.
//
//   node scripts/build-onet.mjs
//
// Why this exists: services.onetcenter.org returns 401 without a registered
// account, and registration is human-reviewed. But the same data ships as a
// public-domain bulk download with no account at all:
//
//   https://www.onetcenter.org/dl_files/database/db_29_1_text.zip   -> 200
//
// So the app's entire occupation backbone runs locally with zero credentials,
// zero rate limits, and zero chance of dying on stage. Run this once; the
// output is committed.
//
// Requires `curl` and `unzip` (both stock on macOS and Linux). Dev-time only —
// the server never runs this.

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RELEASE = 'db_29_1_text';
const DB_URL = `https://www.onetcenter.org/dl_files/database/${RELEASE}.zip`;
const OUT = fileURLToPath(new URL('../data/onet.json', import.meta.url));

const SKILLS_PER_OCC = 20; // display shows top 8; the rest powers the local skills-gap diff
const KNOWLEDGE_PER_OCC = 15;
const TECH_PER_OCC = 30;
const RELATED_PER_OCC = 5;

const work = mkdtempSync(join(tmpdir(), 'onet-'));
try {
  console.log(`downloading ${DB_URL}`);
  execFileSync('curl', ['-sSL', '--max-time', '180', '-o', join(work, 'db.zip'), DB_URL]);
  execFileSync('unzip', ['-o', '-q', join(work, 'db.zip'), '-d', work]);

  // Tab-separated with a header row. Values are never quoted in this dataset.
  const table = (name) => {
    const lines = readFileSync(join(work, RELEASE, `${name}.txt`), 'utf8').split('\n');
    const cols = lines[0].split('\t');
    return lines.slice(1).filter(Boolean).map((line) => {
      const cells = line.split('\t');
      return Object.fromEntries(cols.map((col, i) => [col, cells[i]]));
    });
  };

  // --- occupations ---
  const occupations = {};
  for (const row of table('Occupation Data')) {
    occupations[row['O*NET-SOC Code']] = {
      code: row['O*NET-SOC Code'],
      title: row.Title,
      description: row.Description,
      skills: [],
      knowledge: [],
      tech: [],
      related: [],
      alts: [],
    };
  }
  console.log(`  ${Object.keys(occupations).length} occupations`);

  // --- skills and knowledge (IM = importance, reported 1–5; we publish 0–100)
  // Skills alone barely separate two office roles — every white-collar job
  // rates high on Active Listening. Knowledge is what actually differentiates
  // (Mathematics 63 vs 81), so we carry both.
  const rate = (file, field, limit) => {
    const byOcc = new Map();
    for (const row of table(file)) {
      if (row['Scale ID'] !== 'IM') continue;
      if (row['Recommend Suppress'] === 'Y') continue;
      const code = row['O*NET-SOC Code'];
      if (!occupations[code]) continue;
      if (!byOcc.has(code)) byOcc.set(code, []);
      byOcc.get(code).push({
        name: row['Element Name'],
        importance: Math.round((parseFloat(row['Data Value']) / 5) * 100),
      });
    }
    for (const [code, rows] of byOcc) {
      occupations[code][field] = rows
        .sort((a, b) => b.importance - a.importance)
        .slice(0, limit);
    }
  };
  rate('Skills', 'skills', SKILLS_PER_OCC);
  rate('Knowledge', 'knowledge', KNOWLEDGE_PER_OCC);

  // --- hot technologies: the concrete, nameable gap ---
  // "You're missing Redshift and Hadoop" lands harder than any competency
  // score. Hot Technology = O*NET's flag for tools employers actually ask for.
  //
  // Two filters matter here. Without the category blocklist you get "Apple
  // macOS" and "Microsoft Excel" as career gaps, which is noise — everyone
  // uses those. And "In Demand" sorts first so the slice keeps the
  // differentiating tools rather than whatever starts with 'A'.
  const GENERIC = new Set([
    'Operating system software',
    'Office suite software',
    'Electronic mail software',
    'Word processing software',
    'Spreadsheet software',
    'Presentation software',
    'Web browser software',
    'Calendar and scheduling software',
    'Document management software',
    'Video conferencing software',
    'Instant messaging software',
    'Internet browser software',
  ]);

  const techBy = new Map();
  for (const row of table('Technology Skills')) {
    if (row['Hot Technology'] !== 'Y') continue;
    if (GENERIC.has(row['Commodity Title'])) continue;
    const code = row['O*NET-SOC Code'];
    if (!occupations[code]) continue;
    if (!techBy.has(code)) techBy.set(code, new Map());
    // Keep the strongest flag if a tool appears under several categories.
    const prev = techBy.get(code).get(row.Example);
    techBy.get(code).set(row.Example, prev || row['In Demand'] === 'Y');
  }
  for (const [code, tools] of techBy) {
    occupations[code].tech = [...tools.entries()]
      .sort(([aName, aHot], [bName, bHot]) => Number(bHot) - Number(aHot) || aName.localeCompare(bName))
      .slice(0, TECH_PER_OCC)
      .map(([name]) => name);
  }

  // --- related occupations (Primary-Short is O*NET's closest tier) ---
  const relatedBy = new Map();
  for (const row of table('Related Occupations')) {
    const code = row['O*NET-SOC Code'];
    if (!occupations[code]) continue;
    if (!relatedBy.has(code)) relatedBy.set(code, []);
    relatedBy.get(code).push({
      code: row['Related O*NET-SOC Code'],
      tier: row['Relatedness Tier'],
      index: parseInt(row.Index, 10) || 99,
    });
  }
  for (const [code, list] of relatedBy) {
    occupations[code].related = list
      .sort((a, b) => {
        const primary = (t) => (t.tier?.startsWith('Primary') ? 0 : 1);
        return primary(a) - primary(b) || a.index - b.index;
      })
      .slice(0, RELATED_PER_OCC)
      .map((r) => r.code)
      .filter((c) => occupations[c]);
  }

  // --- alternate titles: what makes free-text search actually work ---
  // "ad ops account manager" isn't an O*NET title, but it's an alternate one.
  let altCount = 0;
  for (const row of table('Alternate Titles')) {
    const occ = occupations[row['O*NET-SOC Code']];
    const alt = row['Alternate Title'];
    if (!occ || !alt) continue;
    occ.alts.push(alt);
    altCount++;
  }
  console.log(`  ${altCount} alternate titles`);

  // Drop occupations with no skills — they can't produce a useful result.
  const kept = Object.values(occupations).filter((o) => o.skills.length);

  writeFileSync(
    OUT,
    JSON.stringify(
      {
        _README: `GENERATED — do not hand-edit. Run: node scripts/build-onet.mjs`,
        source: DB_URL,
        release: RELEASE,
        license: 'O*NET database is public domain, published by the U.S. Department of Labor.',
        occupations: kept,
      },
      null,
      0
    ) + '\n'
  );

  const mb = (readFileSync(OUT).length / 1024 / 1024).toFixed(1);
  console.log(`wrote data/onet.json — ${kept.length} occupations, ${mb} MB`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
