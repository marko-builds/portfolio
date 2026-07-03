# 01 — Baseline capture, redesign branch, deploy-wiring probe

**Status:** ready-for-agent · **Type:** AFK · **Lane:** portfolio
**Parent:** issues/prd-website-builder-portfolio-redesign.md
**Blocked by:** None — can start immediately
**Verification:** assertions 3, 5, 8 (their baselines) — build green + baseline artifacts exist
(route manifest, Lighthouse scores, main HEAD sha recorded)

## What to build

The measured "before" that every later gate compares against, plus the working branch. Build
current main; crawl the emitted output into a route manifest; record Lighthouse
performance/accessibility/SEO scores and total JS bytes for the key pages; record main's HEAD
sha (the zero-commits-to-main check anchors here). Create the redesign branch from that sha.
Probe how Vercel is wired (does a branch push produce a preview URL?) and record the answer —
if previews are off, note the local-build + capture-web fallback as the review medium.

## Acceptance criteria

- [ ] `astro build` green on main; route manifest committed to the branch (a generated file listing every emitted route)
- [ ] Lighthouse + JS-weight baseline recorded per key template (home, projects index, project detail, devlog index, post)
- [ ] Redesign branch exists and pushes; Vercel preview behavior confirmed and documented
- [ ] Main HEAD sha at job start recorded
