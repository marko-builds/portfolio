#!/usr/bin/env node
// Re-pin verify/baseline/ to the current build. Run from a clean tree, after a
// build you have already inspected — this blesses what is in dist/ right now.
//
//   node verify/rebaseline.mjs <main-sha>
//
// Written 2026-08-15 (issues/map-site-v2/10-close-out.md) because the July
// baseline still described the pre-redesign site and 15 of the gate's assertions
// failed by construction. It exists so the next re-pin uses the gate's own
// extraction rather than a hand-written twin of it that can drift.

import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const BASE = join(ROOT, 'verify/baseline');
const DIST = join(ROOT, 'dist');

const sha = process.argv[2];
if (!/^[0-9a-f]{40}$/.test(sha ?? '')) {
  console.error('usage: node verify/rebaseline.mjs <40-char main sha>');
  process.exit(1);
}

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};

// routes — same derivation as gate check 1, /proto/ excluded the same way
const routes = walk(DIST)
  .filter((f) => f.endsWith('.html'))
  .map((f) => '/' + relative(DIST, f).replace(/index\.html$/, ''))
  .filter((r) => !r.startsWith('/proto/'))
  .sort();
writeFileSync(join(BASE, 'routes.txt'), routes.join('\n') + '\n');

// journal bodies — same extraction and hash as gate check 2, read from the same
// directory (JOURNAL_DIR there). Moved from dist/devlog 2026-08-23, issue 09.
const JOURNAL_DIR = 'field-journal';
const bodies = {};
for (const f of walk(join(DIST, JOURNAL_DIR)).filter((f) => f.endsWith('index.html'))) {
  const slug = relative(join(DIST, JOURNAL_DIR), f).replace(/\/?index\.html$/, '');
  if (!slug) continue; // the journal index itself
  const m = readFileSync(f, 'utf8').match(/<article class="prose">(.*?)<\/article>/s);
  if (!m) { console.error(`  no <article class="prose"> in ${slug} — skipped`); continue; }
  bodies[slug] = createHash('sha256')
    .update(m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .digest('hex');
}
writeFileSync(join(BASE, 'devlog-bodies.json'), JSON.stringify(bodies, null, 2) + '\n');

// journal-source.json (gate check 2b) is deliberately NOT written here: it is pinned once
// (issue 18, 2026-08-23) and a rolling re-pin would launder a body edit. See its first line.

writeFileSync(join(BASE, 'main-sha.txt'), sha + '\n');

console.log(`routes.txt        ${routes.length} routes`);
console.log(`devlog-bodies.json ${Object.keys(bodies).length} posts: ${Object.keys(bodies).sort().join(', ')}`);
console.log(`main-sha.txt      ${sha}`);
