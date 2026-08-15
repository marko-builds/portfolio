#!/usr/bin/env node
// Render the copy-button variants at 390px on the two surfaces that carry code
// blocks, and MEASURE the overlap rather than eyeballing it.
//
//   node scripts/copy-btn-variants.mjs        (expects astro preview on :4399)
//
// Written 2026-08-15 for issues/map-site-v2/10-close-out.md's copy-button row.
// The button is opacity:0 at rest and revealed only by .pre-wrap:hover, so on a
// touch device it never appears and under keyboard focus it paints a 2px outline
// at zero opacity. The one-line (hover: none) fix was reverted once already
// because it puts the button over the first line of code at 390px — this renders
// that claim and the alternatives side by side instead of arguing about it.
//
// Playwright comes from the /qa skill's vendored node_modules; chromium is the
// system one.

import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire('/home/ms/.claude/skills/qa/');
const { chromium } = require('playwright');

const BASE = 'http://localhost:4399';
const OUT = '.qa-reports/copy-btn-390';
const SURFACES = {
  deploylog: '/projects/deploylog/',
  devlog_post: '/devlog/skill-vibe-test-decay-probe/',
};

// Every variant is pure CSS, injected at render time. Nothing is edited in src/
// until Marko picks one, which is the point: these are throwaway renders.
const REVEAL = '@media (hover: none) { .copy-btn { opacity: 1; } }';
const VARIANTS = {
  A_control: { css: '', note: 'current main. Touch never reveals the button at all.' },
  B_reveal: { css: REVEAL, note: 'the reverted one-liner. Reveals it where it already sits.' },
  C_reveal_padded: {
    // Pads `code.hljs`, NOT `pre`. Measured: `pre` is a transparent 0-padding
    // wrapper on both surfaces and `code.hljs` carries the white fill, the 1px
    // border and the 8px radius. Padding `pre` grew an invisible box and left the
    // button floating above the visible block, detached — which is what the first
    // render of this variant showed.
    css: `${REVEAL}\n@media (hover: none) { .pre-wrap code.hljs { padding-top: 3.25rem; } }`,
    note: 'reveal, and pad the visible code box so no line runs under the button.',
  },
  D_reveal_bottom: {
    css: `${REVEAL}\n@media (hover: none) { .copy-btn { top: auto; bottom: 0.6rem; } }`,
    note: 'reveal, anchored bottom-right instead of top-right.',
  },
};

rmSync(OUT, { recursive: true, force: true }); // one canonical folder, no stale renders
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: '/usr/bin/chromium' });
const rows = [];

for (const [surface, path] of Object.entries(SURFACES)) {
  for (const [name, v] of Object.entries(VARIANTS)) {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    if (v.css) await page.addStyleTag({ content: v.css });

    // The deploylog code block sits at y≈1688 inside a `.reveal` wrapper that an
    // IntersectionObserver fades in. The first run screenshot it before that
    // fired and produced four byte-identical blank PNGs — a blank render reads as
    // "no overlap, looks fine", so this waits for every ancestor to reach full
    // opacity and THROWS if it never does, rather than shooting an empty box.
    await page.locator('.pre-wrap').first().scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => {
        let el = document.querySelector('.pre-wrap');
        while (el && el !== document.body) {
          if (parseFloat(getComputedStyle(el).opacity) < 1) return false;
          el = el.parentElement;
        }
        return true;
      },
      null,
      { timeout: 8000 }
    );
    await page.waitForTimeout(300);

    // ── calibration, before any screenshot is trusted ──────────────────────
    // A variant that silently failed to apply renders as a clean control, which
    // is the exact false-pass this whole session has been about.
    const probe = await page.evaluate(() => {
      const btn = document.querySelector('.copy-btn');
      const pre = document.querySelector('.pre-wrap pre');
      const code = pre?.querySelector('code');
      if (!btn || !pre) return { ok: false };
      const b = btn.getBoundingClientRect();
      const p = pre.getBoundingClientRect();
      // EVERY rendered line, not just the first. The first version of this probe
      // tested line 1 only and reported the bottom-anchored variant "clear" —
      // a check scoped narrower than its own claim, which is the defect this
      // whole ticket is about. A Range over the code's contents yields one rect
      // per rendered line, wrapping included.
      const lines = [];
      if (code) {
        const r = document.createRange();
        r.selectNodeContents(code);
        const cb = code.getBoundingClientRect();
        for (const rect of r.getClientRects()) {
          // clip to the visible code box: the block scrolls horizontally, so text
          // beyond its right edge is not something the button can be said to cover
          const left = Math.max(rect.left, cb.left);
          const right = Math.min(rect.right, cb.right);
          if (right > left && rect.height > 0) lines.push({ top: rect.top, bottom: rect.bottom, left, right });
        }
      }
      return {
        ok: true,
        hoverNone: matchMedia('(hover: none)').matches,
        opacity: getComputedStyle(btn).opacity,
        btn: { top: b.top, right: b.right, bottom: b.bottom, left: b.left },
        pre: { top: p.top, right: p.right },
        lines,
        codeText: (code?.textContent ?? '').slice(0, 46).replace(/\n/g, '⏎'),
      };
    });

    let overlap = 'n/a';
    if (probe.ok && probe.lines?.length) {
      const b = probe.btn;
      const hit = probe.lines
        .map((l, i) => {
          const x = Math.min(l.right, b.right) - Math.max(l.left, b.left);
          const y = Math.min(l.bottom, b.bottom) - Math.max(l.top, b.top);
          return x > 0 && y > 0 ? { i: i + 1, x: Math.round(x), y: Math.round(y) } : null;
        })
        .filter(Boolean);
      overlap = hit.length
        ? hit.map((h) => `${h.x}x${h.y}px OVER line ${h.i}`).join(', ')
        : `clear (${probe.lines.length} lines checked)`;
    }

    const file = `${OUT}/${surface}__${name}.png`;
    // Element shot of .pre-wrap: it is exactly the code block plus its button, at
    // true device scale, and it sidesteps page-vs-viewport clip coordinates —
    // the first attempt used a computed clip and threw "outside the image".
    await page.locator('.pre-wrap').first().screenshot({ path: file });

    rows.push({ surface, variant: name, opacity: probe.opacity, hoverNone: probe.hoverNone, overlap, file });
    console.log(
      `${surface.padEnd(12)} ${name.padEnd(16)} hover:none=${probe.hoverNone} opacity=${probe.opacity} ${overlap}`
    );
    await ctx.close();
  }
}

// ── keyboard arm, on a desktop context where hover exists ──────────────────
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + SURFACES.deploylog, { waitUntil: 'networkidle' });
await page.locator('.pre-wrap').first().scrollIntoViewIfNeeded();
await page.waitForFunction(() => {
  let el = document.querySelector('.pre-wrap');
  while (el && el !== document.body) {
    if (parseFloat(getComputedStyle(el).opacity) < 1) return false;
    el = el.parentElement;
  }
  return true;
});
// The button is a real <button>, so it takes tab focus. It is also opacity:0 at
// rest with no :focus-visible reveal, which means the 2px focus outline paints at
// zero opacity: focused, reachable, and invisible. Shot before and after the fix.
const kbShot = async (tag) => {
  await page.evaluate(() => document.querySelector('.copy-btn').focus());
  await page.waitForTimeout(200);
  await page.locator('.pre-wrap').first().screenshot({ path: `${OUT}/keyboard__${tag}.png` });
  return page.evaluate(() => {
    const btn = document.querySelector('.copy-btn');
    return {
      focused: document.activeElement === btn,
      tabbable: btn.tabIndex >= 0,
      opacityWhileFocused: getComputedStyle(btn).opacity,
      outline: getComputedStyle(btn).outlineWidth,
    };
  });
};
const kb = await kbShot('A_control');
await page.addStyleTag({ content: '.copy-btn:focus-visible { opacity: 1; }' });
const kbFixed = await kbShot('E_focus_visible');
console.log('keyboard fixed:', JSON.stringify(kbFixed));
console.log('\nkeyboard:', JSON.stringify(kb));
rows.push({ surface: 'keyboard', variant: 'A_control', opacity: kb.opacityWhileFocused, overlap: `focused=${kb.focused} tabbable=${kb.tabbable}` });

writeFileSync(`${OUT}/measurements.json`, JSON.stringify({ rows, keyboard: kb, variants: VARIANTS }, null, 2) + '\n');
await browser.close();
console.log(`\n${rows.length} rows -> ${OUT}/measurements.json`);
