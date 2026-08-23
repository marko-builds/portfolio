#!/usr/bin/env node
// Redesign verification gate (issue 02). Runs the machine half of the PRD's
// validation contract against the built site + working tree. Exits nonzero on
// any failure.
//
//   node verify/gate.mjs            build + all fast checks
//   node verify/gate.mjs --no-build reuse existing dist/
//   node verify/gate.mjs --full     also run Lighthouse vs the 01 baseline (slow)
//
// Checks: route parity, journal body equivalence (posts at /field-journal/<slug>),
// token parity (light palette + night register + aurora ramp + brand type), weight budget (general + the aurora allowance), reduced-motion
// render (only on a page carrying the aurora block), copy lint (every authored
// template plus src/data/*.ts), placeholders (none in dist outside /proto/), receipts
// (number + href + date per card, entry count = non-draft posts),
// main-untouched.
//
// Re-baselined 2026-08-15 by issues/map-site-v2/10-close-out.md. Before that the
// baseline still described the pre-redesign site, so 15 of the gate's assertions
// failed by construction and its verdict carried no information at all.

import { execSync, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = new URL('..', import.meta.url).pathname;
const BASE = join(ROOT, 'verify/baseline');
const BRAND_JSON = join(ROOT, '../claude-video-studio/brands/marko/brand.json');
const JS_BUDGET_BYTES = 10240;
// The one named allowance (issues/map-site-v3/07-gate-rescope.md, 2026-08-22). Ticket 02
// measured the live WebGL aurora hero at 10646 B raw (3571 B JS + 7075 B shader; the gate
// counts raw, not gzip), which is over the general budget on its own. Blocks carrying
// data-budget="aurora" share this allowance instead of the general one: at most ONE
// marked script plus at most ONE marked shader block (type="x-shader/..."), so the mark
// cannot be reused to walk a second module past the general budget. Any other
// data-budget value fails outright. Both budget lines print on every run.
const AURORA_MARK = 'aurora';
const AURORA_BUDGET_BYTES = 11264;

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
//
// Re-frozen 2026-08-23 (issues/09-gate-config-reconcile.md) to the site-v3 lock:
//   - accent, accent-dim and warm are the aurora hues darkened to clear AA on both light
//     surfaces (map-site-v3 ticket 03 "Accent sync", confirmed by Marko 2026-08-23). They
//     were #14707C / #14707C1F / #9C6031 and passed only through
//     verify/proposals/accent-sync-aurora.md, which that slice deleted: a frozen value
//     needs no proposal, and a proposal left behind would let the next drift through.
//   - the night tokens and the aurora ramp (ticket 03 lock, point 2). Provenance per
//     ticket 07's answer: night-bg is brands/marko/brand.json backgroundDeep, aurora-cyan
//     is its accent, aurora-amber is its gold; the ramp is the "aurora" row of the
//     Borealis.qml paletteTable and is not in brand.json at all. Copied values, not
//     bridged: a drift in brand.json does not move the site (v2 decision 4 still holds).
const TOKEN_FROZEN = {
  '--color-bg': '#FBFAF7',
  '--color-surface': '#FFFFFF',
  '--color-border': '#E4E0D8',
  '--color-accent': '#1D7781',
  '--color-accent-dim': '#1D77811F',
  '--color-warm': '#9B5E25',
  '--color-border-strong': '#CFC9BD',
  '--color-text-primary': '#1A1D23',
  '--color-text-secondary': '#5B6270',
  '--color-text-muted': '#6B7480',
  '--color-surface-raised': '#F3F1EC',
  '--color-surface-veil': '#F3F1ECCC',
  '--color-backdrop': '#1A1D23',
  '--color-grid': '#1A1D2312',
  // night register (ticket 03 lock)
  '--color-night-bg': '#0B0E15',
  '--color-night-surface': '#121726CC',
  '--color-night-border': '#5FCEDB4D',
  '--color-night-text': '#E6E9EF',
  '--color-night-text-secondary': '#A7B0C0',
  '--color-aurora-cyan': '#5FCEDB',
  '--color-aurora-amber': '#D99A5E',
  // aurora ramp (ticket 03 lock)
  '--aurora-0': '#962DB4',
  '--aurora-1': '#5A6ECD',
  '--aurora-2': '#23C8C8',
  '--aurora-3': '#1EEB82',
  '--aurora-4': '#19B450',
  '--aurora-5': '#084623',
  '--aurora-ramp': 'linear-gradient(90deg, var(--aurora-0), var(--aurora-1), var(--aurora-2), var(--aurora-3), var(--aurora-4))',
};
// Where the journal posts are read from for check 2. Was dist/devlog; the route moved to
// /field-journal (map-site-v3 ticket 10, amendment 2026-08-23). rebaseline.mjs reads the
// same directory; the pages moved there in the same slice (issue 09, folded in from 12).
const JOURNAL_DIR = 'field-journal';
// css var -> brand.json font key. Compared on the first family in the stack, with
// spaces dropped: brand.json says "JetBrainsMono", CSS says 'JetBrains Mono'.
const FONT_MAP = { '--font-sans': 'body', '--font-mono': 'code' };

const failures = [];
const ok = (name, msg) => console.log(`  PASS ${name}${msg ? ` (${msg})` : ''}`);
const fail = (name, msg) => { failures.push(`${name}: ${msg}`); console.log(`  FAIL ${name}: ${msg}`); };
const sh = (cmd) => execSync(cmd, { cwd: ROOT, encoding: 'utf8' });
// data-budget="<name>" on an inline <script>, or undefined when unmarked.
const budgetOf = (attrs) => (attrs.match(/\bdata-budget=["']([^"']*)["']/) ?? [])[1];

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

// ── 2. journal body equivalence ────────────────────────────────────────────
// Keyed by slug; the file keeps its devlog-bodies.json name (re-keyed to the new
// route by the path below, not duplicated).
console.log('bodies:');
{
  const baseline = JSON.parse(readFileSync(join(BASE, 'devlog-bodies.json'), 'utf8'));
  for (const [slug, hash] of Object.entries(baseline)) {
    const f = join(ROOT, 'dist', JOURNAL_DIR, slug, 'index.html');
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
  // Comments stripped first (2026-08-23, issue 09): the PROPOSED night block's own comment
  // reads "against --color-night-bg: text 15.2, ..." and the first match won, so the check
  // compared a comment fragment against the frozen value and reported #0B0E15 != #0B0E15.
  const css = readFileSync(join(ROOT, 'src/styles/global.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
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
//
// Carve-out, 2026-08-22 (map-site-v3 ticket 07): a block marked data-budget="aurora"
// leaves the general budget and lands in the aurora allowance above. Everything unmarked
// still has to fit under JS_BUDGET_BYTES. Known negatives, each planted and watched fail
// before this shipped (outputs in the ticket's answer): an unmarked block over 10240 B, a
// marked block over 11264 B, and a second marked script block.
console.log('weight:');
const auroraPages = [];
{
  const blocks = new Map(); // content hash to { body, attrs }, so a repeated block counts once
  const remote = new Set();
  for (const f of walk(join(ROOT, 'dist')).filter((f) => f.endsWith('.html'))) {
    const html = readFileSync(f, 'utf8');
    for (const m of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      if (/\bsrc=/.test(m[1]) || /application\/ld\+json/.test(m[1])) continue;
      blocks.set(createHash('sha256').update(m[2]).digest('hex'), { body: m[2], attrs: m[1] });
      if (budgetOf(m[1]) === AURORA_MARK && !auroraPages.includes(f)) auroraPages.push(f);
    }
    for (const m of html.matchAll(/<script[^>]*\bsrc=["']([^"']+)["']/g)) remote.add(m[1]);
  }
  const all = [...blocks.values()];
  const bytes = (bs) => bs.reduce((s, b) => s + Buffer.byteLength(b.body), 0);
  const general = all.filter((b) => budgetOf(b.attrs) === undefined);
  const marked = all.filter((b) => budgetOf(b.attrs) === AURORA_MARK);
  const unknown = all.filter((b) => budgetOf(b.attrs) !== undefined && budgetOf(b.attrs) !== AURORA_MARK);
  const total = bytes(general);
  total <= JS_BUDGET_BYTES
    ? ok('js budget', `${total} B <= ${JS_BUDGET_BYTES} B across ${general.length} unmarked inline blocks`)
    : fail('js budget', `${total} B > ${JS_BUDGET_BYTES} B across ${general.length} unmarked inline blocks`);
  for (const b of unknown) fail('js budget', `unknown data-budget="${budgetOf(b.attrs)}", the only allowance is "${AURORA_MARK}"`);
  const isShader = (b) => /\btype=["']x-shader\//.test(b.attrs);
  const mScripts = marked.filter((b) => !isShader(b)), mShaders = marked.filter(isShader);
  const aTotal = bytes(marked);
  if (mScripts.length > 1) fail('aurora budget', `${mScripts.length} marked script blocks, the allowance covers one`);
  else if (mShaders.length > 1) fail('aurora budget', `${mShaders.length} marked shader blocks, the allowance covers one`);
  else if (aTotal > AURORA_BUDGET_BYTES) fail('aurora budget', `${aTotal} B > ${AURORA_BUDGET_BYTES} B across ${marked.length} marked block(s)`);
  else ok('aurora budget', marked.length
    ? `${aTotal} B <= ${AURORA_BUDGET_BYTES} B across ${marked.length} marked block(s): ${mScripts.length} script, ${mShaders.length} shader`
    : `0 B of ${AURORA_BUDGET_BYTES} B, no block marked data-budget="${AURORA_MARK}"`);
  const bodies = all.map((b) => b.body);
  for (const r of remote) console.log(`  NOTE remote script, not budgeted: ${r}`);
  const sig = /from\s*["']react["']|preact\/|@vue\/|svelte\/internal/;
  const hits = bodies.filter((b) => sig.test(b));
  hits.length
    ? fail('framework runtime', `${hits.length} inline block(s) match a framework signature`)
    : ok('no framework runtime', `${blocks.size} inline blocks scanned`);
}

// ── 4b. reduced motion ─────────────────────────────────────────────────────
// Added 2026-08-22 (map-site-v3 ticket 07). Runs on every built page that carries the
// marked aurora block, so today it prints NOTE and asserts nothing: a page with no
// aurora has no canvas to hide, and a PASS there would be decoration. The page's
// contract: the live canvas is [data-aurora="canvas"], the still is [data-aurora="poster"];
// a page that carries the block without both fails rather than skipping.
//
// Two chromium launches per page, because the check has to be able to fail in both
// directions. Motion allowed: the canvas must be displayed and the poster hidden, which
// also proves WebGL ran in this headless chromium, so the reduced arm's "canvas hidden"
// is the page honouring the media query and not a missing GL context. Reduced
// (--force-prefers-reduced-motion): matchMedia must report the flag took, the canvas
// must be display:none, the poster displayed. Known negative: a copy of the spike page
// with the rm.matches branch removed fails the reduced arm (output in the ticket).
console.log('motion:');
if (!auroraPages.length) console.log(`  NOTE no page carries data-budget="${AURORA_MARK}", reduced-motion check not run`);
else {
  const PORT = 4398;
  const server = spawn('python3', ['-m', 'http.server', String(PORT), '--bind', '127.0.0.1', '-d', join(ROOT, 'dist')], { stdio: 'ignore' });
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const PROBE = `(() => { const c = document.querySelector('[data-aurora="canvas"]'), p = document.querySelector('[data-aurora="poster"]');
    return { rm: matchMedia('(prefers-reduced-motion: reduce)').matches, webgl: !!document.createElement('canvas').getContext('webgl2'),
      canvas: c ? getComputedStyle(c).display : null, poster: p ? getComputedStyle(p).display : null }; })()`;
  async function render(url, reduced) {
    const profile = mkdtempSync(join(tmpdir(), 'gate-rm-'));
    const chrome = spawn('/usr/bin/chromium', ['--headless=new', '--remote-debugging-port=0', '--enable-unsafe-swiftshader',
      '--no-first-run', '--no-default-browser-check', '--window-size=1280,800', `--user-data-dir=${profile}`,
      ...(reduced ? ['--force-prefers-reduced-motion'] : []), 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe'] });
    try {
      const wsUrl = await new Promise((res, rej) => {
        let err = ''; const t = setTimeout(() => rej(new Error('chromium did not open a CDP port: ' + err.slice(-200))), 15000);
        chrome.stderr.on('data', (d) => { err += d; const m = err.match(/DevTools listening on (ws:\/\/\S+)/); if (m) { clearTimeout(t); res(m[1]); } });
      });
      const ws = new WebSocket(wsUrl);
      await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
      let id = 0; const waiting = new Map();
      ws.onmessage = (e) => { const m = JSON.parse(e.data); const w = waiting.get(m.id); if (!w) return; waiting.delete(m.id); m.error ? w.rej(new Error(m.error.message)) : w.res(m.result); };
      const send = (method, params = {}, sessionId) => new Promise((res, rej) => { const n = ++id; waiting.set(n, { res, rej }); ws.send(JSON.stringify({ id: n, method, params, sessionId })); });
      const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
      const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
      await send('Runtime.enable', {}, sessionId);
      await send('Page.navigate', { url }, sessionId);
      const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true }, sessionId)).result.value;
      for (let i = 0; i < 50 && (await evaluate('document.readyState')) !== 'complete'; i++) await sleep(100);
      await sleep(800); // the page's first rAF flips the live class; the spike measured first paint at 33 ms on SwiftShader
      const r = await evaluate(PROBE);
      ws.close();
      return r;
    } finally {
      chrome.kill();
      // chrome.kill() returns before the process exits and it keeps writing its profile,
      // so a bare rmSync raced it to ENOTEMPTY about one run in three (2026-08-23) and
      // reported a random /proto/ page as a motion FAIL. Retry; the dir is in tmp anyway.
      rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
    }
  }
  try {
    await sleep(500);
    for (const f of auroraPages) {
      const route = '/' + relative(join(ROOT, 'dist'), f).replace(/index\.html$/, '');
      const url = `http://127.0.0.1:${PORT}${route}`;
      const shown = (d) => d !== null && d !== 'none';
      try {
        const m = await render(url, false);
        if (m.canvas === null || m.poster === null) { fail(`reduced motion ${route}`, `page carries the aurora block but lacks [data-aurora="canvas"] and/or [data-aurora="poster"]`); continue; }
        if (!m.webgl) { fail(`reduced motion ${route}`, 'no WebGL2 in headless chromium, the check cannot tell reduced motion from no-GL'); continue; }
        if (m.rm || !shown(m.canvas) || shown(m.poster)) { fail(`reduced motion ${route}`, `motion allowed: rm=${m.rm} canvas=${m.canvas} poster=${m.poster} (expected canvas shown, poster hidden)`); continue; }
        const r = await render(url, true);
        if (!r.rm) { fail(`reduced motion ${route}`, '--force-prefers-reduced-motion did not take, matchMedia reports false'); continue; }
        shown(r.canvas) || !shown(r.poster)
          ? fail(`reduced motion ${route}`, `reduced: canvas=${r.canvas} poster=${r.poster} (expected canvas none, poster shown)`)
          : ok(`reduced motion ${route}`, `motion: canvas=${m.canvas} poster=${m.poster}; reduced: canvas=${r.canvas} poster=${r.poster}`);
      } catch (e) { fail(`reduced motion ${route}`, e.message.split('\n')[0]); }
    }
  } finally { server.kill(); }
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
  // src/data/*.ts added 2026-08-23 (review of c19e6a5): every approved home string
  // lives in src/data/home.ts, so a scan of .astro alone could never see it.
  const authored = ['src/pages', 'src/components', 'src/layouts', 'src/data']
    .flatMap((d) => walk(join(ROOT, d)))
    .filter((f) => f.endsWith('.astro') || (f.includes('/src/data/') && f.endsWith('.ts')))
    .map((f) => relative(ROOT, f))
    .sort();
  for (const f of authored) {
    // A .ts module is all "frontmatter": prefix an opening fence so its // and /* */
    // comments are stripped the way an .astro frontmatter's are; string literals are linted.
    const src = readFileSync(join(ROOT, f), 'utf8');
    const hits = copyHits(f.endsWith('.ts') ? '---\n' + src : src).map((n) => (f.endsWith('.ts') ? n - 1 : n));
    hits.length
      ? fail(`copy ${f}`, `dash/arrow on line(s) ${hits.join(',')}`)
      : ok(`copy ${f}`);
  }
}

// ── 5a. placeholders (built site) ──────────────────────────────────────────
// "[PLACEHOLDER] " prefixes marked unapproved copy through slices 10 and 11; none may
// ship. /proto/ keeps its old copy until slice 14 deletes it, so it is excluded by the
// one constant below (slice 14: set it to [] and the exclusion is gone).
// Known negative (2026-08-23): dist/404.html with "[PLACEHOLDER]" planted fails.
const PLACEHOLDER_EXCLUDE = ['dist/proto/'];
console.log('placeholders:');
{
  const pages = walk(join(ROOT, 'dist'))
    .filter((f) => f.endsWith('.html'))
    .map((f) => relative(ROOT, f))
    .filter((f) => !PLACEHOLDER_EXCLUDE.some((x) => f.startsWith(x)))
    .sort();
  const hits = pages.filter((f) => readFileSync(join(ROOT, f), 'utf8').includes('PLACEHOLDER'));
  hits.length
    ? fail('placeholders', `PLACEHOLDER in ${hits.join(', ')}`)
    : ok('placeholders', `${pages.length} pages clean, excluding ${PLACEHOLDER_EXCLUDE.join(' ')}`);
}

// ── 5b. receipts (built home) ──────────────────────────────────────────────
// The contract from map-site-v3 ticket 03 and issue 11: every receipt card under the
// hero carries a number, an href and a date, and the entry count equals the number of
// non-draft posts. Read off dist/index.html, not the template: the count is computed at
// build and the dev server counts drafts too, so only the production build can be right.
// Known negative (issue 11, 2026-08-23): a card with its date removed from dist fails.
console.log('receipts:');
{
  const html = readFileSync(join(ROOT, 'dist/index.html'), 'utf8');
  // Astro stamps data-astro-cid-* on every scoped element, so tags are matched on their
  // leading attributes, never on an exact opening tag.
  const row = html.match(/<ul class="receipts" id="receipts"[^>]*>([\s\S]*?)<\/ul>/);
  const cards = row ? [...row[1].matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((m) => m[1]) : [];
  const DATE = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) 20\d\d\b/;
  const text = (s) => s.replace(/<[^>]+>/g, ' ');
  if (!row) fail('receipts row', 'receipts row not found in dist/index.html');
  else cards.length === 3 ? ok('receipts count', '3 cards') : fail('receipts count', `${cards.length} cards, want 3`);
  cards.forEach((c, i) => {
    const missing = [];
    if (!/<span class="n"[^>]*>\d+<\/span>/.test(c)) missing.push('number');
    // An href that proves something: a site path or an https URL. A bare "#" passes a
    // presence test and proves nothing, so the shape is checked, not the attribute.
    const href = (c.match(/<a[^>]*\bhref="([^"]+)"/) ?? [])[1] ?? '';
    if (!/^(\/|https:\/\/)/.test(href)) missing.push('href');
    if (!DATE.test(text(c))) missing.push('date');
    missing.length ? fail(`receipt ${i + 1}`, `missing ${missing.join('+')}`) : ok(`receipt ${i + 1}`);
  });
  const journal = cards.find((c) => /<a[^>]*\bhref="\/field-journal"/.test(c));
  const shown = journal ? Number((journal.match(/<span class="n"[^>]*>(\d+)<\/span>/) ?? [])[1]) : NaN;
  const posts = walk(join(ROOT, 'src/content/blog')).filter((f) => f.endsWith('.mdx'));
  const live = posts.filter((f) => !/^draft:\s*true\s*$/m.test(readFileSync(f, 'utf8'))).length;
  shown === live ? ok('receipts entry count', `${shown} = ${live} non-draft posts`)
    : fail('receipts entry count', `card shows ${shown}, ${live} non-draft posts in src/content/blog`);
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
    // Re-pointed again 2026-08-23 (issue 09): the journal moved to /field-journal. Keys keep
    // their names so lighthouse-summary.json's floors still resolve; floors untouched.
    devlog: '/field-journal/', 'devlog_zero-dollar-media-stack': '/field-journal/zero-dollar-media-stack/',
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
