# 05 — Home page full build (winning direction + approved copy + motion port)

**Status:** ready-for-agent · **Type:** human-in-the-loop · **Lane:** portfolio
**Parent:** issues/prd-website-builder-portfolio-redesign.md
**Blocked by:** issues/02-verification-gates.md, issues/03-hero-direction-prototypes.md, issues/04-repositioning-copy-pack.md
**Verification:** assertions 2, 3, 5, 6 machine halves — gate 02 green on every iteration;
final look is Marko's eye on screenshots/preview (taste gate)

## What to build

The flagship page, end to end, in the winning direction with the approved copy: hero,
products-first section (real app screenshots in the direction's treatment), about, devlog
teaser, footer. This slice also ports the motion vocabulary — mask-reveal headings, kinetic
hero text, stat counters, hover micro-interactions — as CSS keyframes plus one small
IntersectionObserver script, all honoring prefers-reduced-motion. The ported motion utilities
are built as reusable pieces the secondary templates (06) will consume, but they ship here
inside a complete, demoable page — not as a standalone library. Habitagram screenshot gap:
flag to Marko when the products section needs one; never fake it.

## Acceptance criteria

- [ ] Redesigned home renders complete on the branch; gate 02 fully green
- [ ] First viewport reads builder/products positioning; no game-dev framing in hero or title
- [ ] Motion behaves per the P14 vocabulary and disappears under prefers-reduced-motion
- [ ] capture-web screenshots + design-critique delivered; Marko's look verdict recorded
