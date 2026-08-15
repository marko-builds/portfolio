#!/usr/bin/env node
// Redesign verification gate (issue 02). Runs the machine half of the PRD's
// validation contract against the built site + working tree. Exits nonzero on
// any failure.
//
//   node verify/gate.mjs            build + all fast checks
//   node verify/gate.mjs --no-build reuse existing dist/
//   node verify/gate.mjs --full     also run Lighthouse vs the 01 baseline (slow)
//
// Checks: route parity, devlog body equivalence, token parity (light palette +
// brand type), weight budget, copy lint (every authored template), main-untouched.
//
// Re-baselined 2026-08-15 by issues/map-site-v2/10-close-out.md. Before that the
// baseline still described the pre-redesign site, so 15 of the gate's assertions
// failed by construction and its verdict carried no information at all.

import { execSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const BASE = join(ROOT, 'verify/baseline');
const BRAND_JSON = join(ROOT, '../claude-video-studio/brands/marko/brand.json');
const JS_BUDGET_BYTES = 10240;

// The light palette locked by issues/map-site-v2/08, frozen here as the contract.
//
// This used to bridge seven of these to brands/marko/brand.json's colours. Map
// decision 4 made that unsatisfiable: the site is light and deliberately diverges
// from the brand file, which stays dark because the studio renders are dark and no
// light variant is being added. Ticket 08 recorded the check as "unachievable as
// written" and handed the re-scope here.
//
// Divergence on colour, unity on type: the font bridge below still reads brand.json,
// which is the axis that did not diverge. A deliberate palette change is made by
// naming the token in verify/proposals/, same escape hatch as before.
//
// Ticket 08 measured every text role in this set at >= 4.5 contrast against BOTH
// --color-bg and --color-surface, and darkened text-muted and warm to get there.
// Freezing the values pins that measurement; it does not re-derive it.
const TOKEN_FROZEN = {
  '--color-bg': '#FBFAF7',
  '--color-surface': '#FFFFFF',
  '--color-border': '#E4E0D8',
  '--color-accent': '#14707C',
  '--color-accent-dim': '#14707C1F',
  '--color-warm': '#9C6031',
  '--color-border-strong': '#CFC9BD',
  '--color-text-primary': '#1A1D23',
  '--color-text-secondary': '#5B6270',
  '--color-text-muted': '#6B7480',
  '--color-surface-raised': '#F3F1EC',
  '--color-surface-veil': '#F3F1ECCC',
  '--color-backdrop': '#1A1D23',
  '--color-grid': '#1A1D2312',
};
// css var -> brand.json font key. Compared on the first family in the stack, with
// spaces dropped: brand.json says "JetBrainsMono", CSS says 'JetBrains Mono'.
const FONT_MAP = { '--font-sans': 'body', '--font-mono': 'code' };

const failures = [];
const ok = (name, msg) => console.log(`  PASS ${name}${msg ? ` (${msg})` : ''}`);
const fail = (name, msg) => { failures.push(`${name}: ${msg}`); console.log(`  FAIL ${name}: ${msg}`); };
const sh = (cmd) => execSync(cmd, { cwd: ROOT, encoding: 'utf8' });

const args = process.argv.slice(2);
const doBuild = !args.includes('--no-build');
const doFull = args.includes('--full');

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    statSync(p).isDirectory() ? walk(p, out) : out.push(p);
  }
  return out;
};

// Line numbers holding a banned dash/arrow in reader-facing copy. Everything that
// is not reader-facing is stripped first, each region tracked ACROSS lines:
// <pre>/<script>/<style> bodies, HTML comments, and the frontmatter's // and /* */
// comments. A self-closing <script ... /> opens nothing. See the note at check 5.
const copyHits = (src) => {
  const BANNED = /[—–→]| -> /;
  let codeTag = null, inHtmlComment = false, inBlockComment = false, fence = 0;
  const hits = [];
  src.split('\n').forEach((raw, i) => {
    if (fence < 2 && /^---\s*$/.test(raw)) { fence++; return; }
    const inFrontmatter = fence === 1;
    let rest = raw, visible = '';
    while (rest.length) {
      if (codeTag) {
        const close = rest.match(new RegExp(`</${codeTag}\\s*>`, 'i'));
        if (!close) break;
        rest = rest.slice(close.index + close[0].length);
        codeTag = null;
        continue;
      }
      if (inHtmlComment || inBlockComment) {
        const end = inHtmlComment ? '-->' : '*/';
        const at = rest.indexOf(end);
        if (at === -1) break;
        rest = rest.slice(at + end.length);
        inHtmlComment = inBlockComment = false;
        continue;
      }
      const opens = [];
      const tag = rest.match(/<(pre|script|style)(\s[^>]*)?>/i);
      if (tag) opens.push([tag.index, tag[0].length, tag[0].endsWith('/>') ? 'self' : 'code', tag[1].toLowerCase()]);
      const marks = inFrontmatter ? [['<!--', 'html'], ['/*', 'block']] : [['<!--', 'html']];
      for (const [tok, kind] of marks) {
        const at = rest.indexOf(tok);
        if (at !== -1) opens.push([at, tok.length, kind]);
      }
      // `//` opens a comment only where it is not the `//` of a scheme. Nine of the
      // frontmatter URLs in src/ sit on lines that also carry reader-facing strings,
      // and treating https:// as a comment would blind the lint to the rest of them.
      if (inFrontmatter) {
        for (let at = rest.indexOf('//'); at !== -1; at = rest.indexOf('//', at + 1)) {
          if (rest[at - 1] !== ':') { opens.push([at, 2, 'line']); break; }
        }
      }
      if (!opens.length) { visible += rest; break; }
      opens.sort((a, b) => a[0] - b[0]);
      const [at, len, kind, name] = opens[0];
      visible += rest.slice(0, at);
      rest = rest.slice(at + len);
      if (kind === 'line') break;          // // runs to end of line
      if (kind === 'code') codeTag = name;
      if (kind === 'html') inHtmlComment = true;
      if (kind === 'block') inBlockComment = true;
    }
    if (BANNED.test(visible)) hits.push(i + 1);
  });
  return hits;
};

if (doBuild) {
  console.log('build:');
  try { sh('npm run build 2>&1 >/dev/null'); ok('astro build'); }
  catch (e) { fail('astro build', e.message.split('\n')[0]); report(); }
}

// ── 1. route parity ────────────────────────────────────────────────────────
console.log('routes:');
{
  const baseline = readFileSync(join(BASE, 'routes.txt'), 'utf8').trim().split('\n').sort();
  const all = walk(join(ROOT, 'dist'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => '/' + relative(join(ROOT, 'dist'), f).replace(/index\.html$/, ''))
    .sort();
  // /proto/ pages are issue-03 throwaway review artifacts; excluded from parity,
  // must be deleted after the direction pick (issue 03 acceptance).
  const proto = all.filter((r) => r.startsWith('/proto/'));
  if (proto.length) console.log(`  NOTE ${proto.length} /proto/ route(s) present (throwaway, delete after the pick): ${proto.join(' ')}`);
  const built = all.filter((r) => !r.startsWith('/proto/'));
  const missing = baseline.filter((r) => !built.includes(r));
  const added = built.filter((r) => !baseline.includes(r));
  if (missing.length || added.length)
    fail('route parity', `missing=[${missing}] added=[${added}]`);
  else ok('route parity', `${built.length} routes identical`);
}

// ── 2. devlog body equivalence ─────────────────────────────────────────────
console.log('bodies:');
{
  const baseline = JSON.parse(readFileSync(join(BASE, 'devlog-bodies.json'), 'utf8'));
  for (const [slug, hash] of Object.entries(baseline)) {
    const f = join(ROOT, 'dist/devlog', slug, 'index.html');
    if (!existsSync(f)) { fail(`body ${slug}`, 'page missing'); continue; }
    const m = readFileSync(f, 'utf8').match(/<article class="prose">(.*?)<\/article>/s);
    if (!m) { fail(`body ${slug}`, 'no <article class="prose"> found'); continue; }
    const text = m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const got = createHash('sha256').update(text).digest('hex');
    got === hash ? ok(`body ${slug}`) : fail(`body ${slug}`, 'content text changed');
  }
}

// ── 3. token parity ────────────────────────────────────────────────────────
console.log('tokens:');
{
  const css = readFileSync(join(ROOT, 'src/styles/global.css'), 'utf8');
  const vars = {};
  for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) vars[m[1]] ??= m[2].trim();
  const brandFonts = JSON.parse(readFileSync(BRAND_JSON, 'utf8')).fonts;
  const proposals = existsSync(join(ROOT, 'verify/proposals'))
    ? walk(join(ROOT, 'verify/proposals')).map((f) => readFileSync(f, 'utf8')).join('\n')
    : '';
  const check = (name, want) => {
    const got = vars[name];
    if (got === undefined) return fail(`token ${name}`, 'missing from global.css');
    if (got.toLowerCase() === want.toLowerCase()) return ok(`token ${name}`, got);
    if (proposals.includes(name)) return ok(`token ${name}`, `deviation covered by proposal`);
    fail(`token ${name}`, `${got} != ${want} and no proposal names it`);
  };
  for (const [v, frozen] of Object.entries(TOKEN_FROZEN)) check(v, frozen);
  for (const [v, key] of Object.entries(FONT_MAP)) {
    const want = (brandFonts[key] ?? '').replace(/\s+/g, '').toLowerCase();
    const got = (vars[v] ?? '').split(',')[0].replace(/['"]/g, '').replace(/\s+/g, '').toLowerCase();
    got && got === want
      ? ok(`token ${v}`, brandFonts[key])
      : fail(`token ${v}`, `first family "${got}" != brand.json fonts.${key} "${brandFonts[key]}"`);
  }
}

// ── 4. weight budget ───────────────────────────────────────────────────────
// Counts the JS that actually ships. Until 2026-08-15 it counted dist/**/*.js
// and there are none — Astro inlines every one of these scripts into the HTML —
// so it printed "PASS js budget (0 B <= 10240 B across 0 files)" and ran the
// framework-runtime signature over zero bytes, while 5,129 B of real JS shipped.
// Its answer for a site with no JS at all was identical, which is the same
// defect class as check 5's, found the same way: by measuring instead of reading.
//
// Deduped by content — five distinct blocks repeat across fifteen pages, and the
// July baseline's 9,106 B was likewise two bundles rather than two per page.
// `application/ld+json` is data, not code, and is excluded.
//
// Remote <script src> is reported and NOT budgeted. Google Tag Manager and the
// highlight.js CDN bundle are pre-existing deliberate choices; failing the gate
// on them is a policy decision, not a re-baseline. Recorded in ticket 10.
console.log('weight:');
{
  const blocks = new Map(); // content hash -> body, so a repeated block counts once
  const remote = new Set();
  for (const f of walk(join(ROOT, 'dist')).filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(f, 'utf8');
    for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (/\bsrc=/.test(m[1]) || /application\/ld\+json/.test(m[1])) continue;
      blocks.set(createHash('sha256').update(m[2]).digest('hex'), m[2]);
    }
    for (const m of html.matchAll(/<script[^>]*\bsrc=["']([^"']+)["']/g)) remote.add(m[1]);
  }
  const bodies = [...blocks.values()];
  const total = bodies.reduce((s, b) => s + Buffer.byteLength(b), 0);
  total <= JS_BUDGET_BYTES
    ? ok('js budget', `${total} B <= ${JS_BUDGET_BYTES} B across ${blocks.size} inline blocks`)
    : fail('js budget', `${total} B > ${JS_BUDGET_BYTES} B across ${blocks.size} inline blocks`);
  for (const r of remote) console.log(`  NOTE remote script, not budgeted: ${r}`);
  const sig = /from\s*["']react["']|preact\/|@vue\/|svelte\/internal/;
  const hits = bodies.filter((b) => sig.test(b));
  hits.length
    ? fail('framework runtime', `${hits.length} inline block(s) match a framework signature`)
    : ok('no framework runtime', `${blocks.size} inline blocks scanned`);
}

// ── 5. copy lint (every authored template) ─────────────────────────────────
// Marko's punctuation rule: no em/en dash and no arrow in reader-facing copy.
//
// Rewritten 2026-08-15. The old scanner had two single-line assumptions and both
// were wrong in the same direction, which is why it had caught exactly one dash:
//
//   - its comment skip was /^\s*(\/\/|\/?\*|<!--)/, matching only a comment's
//     FIRST line, so every wrapped line of a block comment was linted as copy;
//   - it set inCode on any line matching /<(pre|script|style)[\s>]/ with no way
//     back for a self-closing tag. index.astro:139 is a self-closing <script/>,
//     so everything from there to the </style> at :776 was treated as code and
//     the home page's copy had never been linted at all. Measured, not inferred.
//
// Scope moved from the diff to every authored template in the same pass. The
// ground truth for this check does live in the changed file, so diff-scoping was
// defensible — but it also meant re-pinning main-sha.txt would drop index.astro
// out of scope and keep its never-linted copy blessed by omission forever. Ten
// files cost nothing. All ten were measured clean before the scope widened, so
// this inherits no other ticket's failure.
//
// Known limit, currently unexercised: a reader-facing string inside a skipped
// region (a CSS `content:` declaration) is invisible to this. Zero today.
console.log('copy:');
{
  const authored = ['src/pages', 'src/components', 'src/layouts']
    .flatMap((d) => walk(join(ROOT, d)))
    .filter((f) => f.endsWith('.astro'))
    .map((f) => relative(ROOT, f))
    .sort();
  for (const f of authored) {
    const hits = copyHits(readFileSync(join(ROOT, f), 'utf8'));
    hits.length
      ? fail(`copy ${f}`, `dash/arrow on line(s) ${hits.join(',')}`)
      : ok(`copy ${f}`);
  }
}

// ── 6. main untouched ──────────────────────────────────────────────────────
// Both refs, because on 2026-08-15 they disagreed: local main sat two commits
// behind at 78fd2e1 while the remote — the ref GitHub Pages actually deploys —
// was at fb75b0f. A check reading one local ref cannot see that, and this one
// reported "main moved" for the wrong reason. origin/main is still a local
// mirror; git ls-remote is the only ground truth, and it costs a network call
// this check deliberately does not make.
console.log('main:');
{
  const sha = readFileSync(join(BASE, 'main-sha.txt'), 'utf8').trim();
  for (const ref of ['main', 'origin/main']) {
    const got = sh(`git rev-parse ${ref}`).trim();
    got === sha ? ok(`main untouched (${ref})`, sha.slice(0, 7))
      : fail(`main untouched (${ref})`, `${ref} is ${got.slice(0, 7)}, pinned ${sha.slice(0, 7)}`);
  }
}

// ── 7. lighthouse (--full only) ────────────────────────────────────────────
if (doFull) {
  console.log('lighthouse:');
  const baseline = JSON.parse(readFileSync(join(BASE, 'lighthouse-summary.json'), 'utf8'));
  // Re-pointed 2026-08-15: the old post page was /devlog/tictactoe-theme-system/,
  // which became a draft when the game lane was drawered, so --full had been
  // measuring a 404 against a July score. /call/ is new and is the conversion page.
  const PAGES = {
    home: '/', projects_deploylog: '/projects/deploylog/', call: '/call/',
    devlog: '/devlog/', 'devlog_zero-dollar-media-stack': '/devlog/zero-dollar-media-stack/',
  };
  const server = spawn('npx', ['astro', 'preview', '--port', '4399'], { cwd: ROOT, stdio: 'ignore' });
  try {
    await new Promise((r) => setTimeout(r, 4000));
    for (const [name, path] of Object.entries(PAGES)) {
      const out = `/tmp/lh-gate-${name}.json`;
      sh(`CHROME_PATH=/usr/bin/chromium npx --yes lighthouse "http://localhost:4399${path}" --quiet ` +
         `--chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,seo ` +
         `--output=json --output-path=${out} 2>/dev/null`);
      const d = JSON.parse(readFileSync(out, 'utf8')).categories;
      const b = baseline[name];
      // Per-page perf tolerance, set to the measured run-to-run spread rather than
      // a hopeful flat 0.02. Three back-to-back runs on 2026-08-15 put the devlog
      // post at 0.77 / 0.90 / 0.74 and the deploylog page at 0.80 / 0.71 / 0.78, so
      // a 0.02 band on those two pages fired at random — which carries exactly as
      // much information as a check that cannot fire. The stable pages keep 0.02.
      // A wide band still catches what a perf gate is for: a collapse, not a wobble.
      const tol = b.perfTolerance ?? 0.02;
      const perfOk = d.performance.score >= b.performance - tol;
      const rest = d.accessibility.score >= b.accessibility && d.seo.score >= b.seo;
      const msg = `perf ${d.performance.score} (floor ${(b.performance - tol).toFixed(2)} = ${b.performance} - ${tol}) a11y ${d.accessibility.score} seo ${d.seo.score}`;
      perfOk && rest ? ok(`lighthouse ${name}`, msg) : fail(`lighthouse ${name}`, msg);
    }
  } finally { server.kill(); }
}

report();

function report() {
  console.log('');
  if (failures.length) {
    console.log(`GATE FAILED (${failures.length}):`);
    for (const f of failures) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log('GATE GREEN');
  process.exit(0);
}
