# 07 — Final QA, preview verdict, Marko's merge

**Status:** ready-for-agent · **Type:** human-in-the-loop · **Lane:** portfolio
**Parent:** issues/prd-website-builder-portfolio-redesign.md
**Blocked by:** issues/06-secondary-templates.md
**Verification:** assertions 5, 7, 8 — /qa pass + design-critique + Lighthouse-vs-baseline +
gate 02 all green on the preview; then Marko's device pass and HIS merge (the publishing gate)

## What to build

The closing pass on the real deployed artifact: run /qa (real browser) against the Vercel
preview URL (or the local-build fallback recorded in 01), design-critique on final page
screenshots, Lighthouse compared against the 01 baseline, reduced-motion spot check, full gate
02 run. Fix or get explicit acceptance on every finding. Then hand Marko the preview URL for
his own devices. The merge to main is his action — this issue closes when production serves the
redesign after HIS merge, with main's pre-merge history unchanged since the 01 sha.

## Acceptance criteria

- [ ] /qa, design-critique, Lighthouse ≥ baseline, gate 02: all green on the preview, findings triaged
- [ ] Marko reviewed the preview on his devices; his fixes folded in
- [ ] Marko merged (or explicitly said "merge it"); zero other commits reached main during the job

## Completion note (2026-07-03, machine half)
/qa full pass: 13 routes 200, zero console errors; interactions verified (tag filter, copy
buttons, IO reveals); 1 bug found + fixed (stale /#projects back-links to /#work). Reduced
motion verified visually (chromium --force-prefers-reduced-motion). Lighthouse: home
0.98/1.00/1.00, devlog 0.99, post 0.96; deploylog perf delta vs same-session pristine main
-0.02 (noise band, per the BASELINE.md drift procedure). Gate GREEN. Remaining: Marko's device
pass + HIS merge (PR opened).
