#!/usr/bin/env node
// Redesign verification gate (issue 02). Runs the machine half of the PRD's
// validation contract against the built site + working tree. Exits nonzero on
// any failure.
//
//   node verify/gate.mjs            build + all fast checks
//   node verify/gate.mjs --no-build reuse existing dist/
//   node verify/gate.mjs --full     also run Lighthouse vs the 01 baseline (slow)
//
// Checks: route parity, devlog body equivalence, token parity vs brands/marko,
// weight budget, copy lint (changed files only), main-untouched.

import { execSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const BASE = join(ROOT, 'verify/baseline');
const BRAND_JSON = join(ROOT, '../claude-video-studio/brands/marko/brand.json');
const JS_BUDGET_BYTES = 10240;

// css var -> brand.json color key (the token bridge; PRD assertion 6)
const TOKEN_MAP = {
  '--color-bg': 'backgroundDeep',
  '--color-surface': 'background',
  '--color-border-strong': 'surface',
  '--color-accent': 'accent',
  '--color-text-primary': 'text',
  '--color-text-secondary': 'textDim',
};
// site-local derived tones with no brand.json counterpart; frozen at baseline values
const TOKEN_FROZEN = {
  '--color-border': '#1F1F1F',
  '--color-accent-dim': '#00FFC820',
  '--color-text-muted': '#5C5C5C',
};
const FONT_PREFIX = { '--font-sans': "'Geist'", '--font-mono': "'JetBrains Mono'" };

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
  const brand = JSON.parse(readFileSync(BRAND_JSON, 'utf8')).colors;
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
  for (const [v, key] of Object.entries(TOKEN_MAP)) check(v, brand[key]);
  for (const [v, frozen] of Object.entries(TOKEN_FROZEN)) check(v, frozen);
  for (const [v, prefix] of Object.entries(FONT_PREFIX)) {
    const got = vars[v] ?? '';
    got.startsWith(prefix)
      ? ok(`token ${v}`, prefix)
      : fail(`token ${v}`, `"${got}" does not start with ${prefix}`);
  }
}

// ── 4. weight budget ───────────────────────────────────────────────────────
console.log('weight:');
{
  const js = walk(join(ROOT, 'dist')).filter((f) => f.endsWith('.js'));
  const total = js.reduce((s, f) => s + statSync(f).size, 0);
  total <= JS_BUDGET_BYTES
    ? ok('js budget', `${total} B <= ${JS_BUDGET_BYTES} B across ${js.length} files`)
    : fail('js budget', `${total} B > ${JS_BUDGET_BYTES} B`);
  const sig = /from\s*["']react["']|preact\/|@vue\/|svelte\/internal/;
  for (const f of js) {
    if (sig.test(readFileSync(f, 'utf8')))
      fail('framework runtime', relative(ROOT, f));
  }
  ok('no framework runtime', `${js.length} JS files scanned`);
}

// ── 5. copy lint (changed authored files only) ─────────────────────────────
console.log('copy:');
{
  const sha = readFileSync(join(BASE, 'main-sha.txt'), 'utf8').trim();
  const changed = sh(`git diff --name-only ${sha} -- 'src/pages' 'src/components' 'src/layouts'`)
    .trim().split('\n').filter((f) => f.endsWith('.astro') && existsSync(join(ROOT, f)));
  if (!changed.length) ok('copy lint', 'no authored templates changed since baseline');
  for (const f of changed) {
    const lines = readFileSync(join(ROOT, f), 'utf8').split('\n');
    let inCode = false;
    const hits = [];
    lines.forEach((line, i) => {
      if (/<(pre|script|style)[\s>]/.test(line)) inCode = true;
      const wasCode = inCode;
      if (/<\/(pre|script|style)>/.test(line)) inCode = false;
      if (wasCode || /^\s*(\/\/|\/?\*|<!--)/.test(line)) return;
      if (/[—–→]| -> /.test(line)) hits.push(i + 1);
    });
    hits.length
      ? fail(`copy ${f}`, `dash/arrow on line(s) ${hits.join(',')}`)
      : ok(`copy ${f}`);
  }
}

// ── 6. main untouched ──────────────────────────────────────────────────────
console.log('main:');
{
  const sha = readFileSync(join(BASE, 'main-sha.txt'), 'utf8').trim();
  const got = sh('git rev-parse main').trim();
  got === sha ? ok('main untouched', sha.slice(0, 7))
    : fail('main untouched', `main moved: ${got.slice(0, 7)} != ${sha.slice(0, 7)}`);
}

// ── 7. lighthouse (--full only) ────────────────────────────────────────────
if (doFull) {
  console.log('lighthouse:');
  const baseline = JSON.parse(readFileSync(join(BASE, 'lighthouse-summary.json'), 'utf8'));
  const PAGES = {
    home: '/', projects_deploylog: '/projects/deploylog/',
    devlog: '/devlog/', 'devlog_tictactoe-theme-system': '/devlog/tictactoe-theme-system/',
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
      const perfOk = d.performance.score >= b.performance - 0.02;
      const rest = d.accessibility.score >= b.accessibility && d.seo.score >= b.seo;
      const msg = `perf ${d.performance.score} (base ${b.performance}) a11y ${d.accessibility.score} seo ${d.seo.score}`;
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
