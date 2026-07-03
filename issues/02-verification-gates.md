# 02 — Verification gate scripts (parity, tokens, budget, copy lint)

**Status:** ready-for-agent · **Type:** AFK · **Lane:** portfolio
**Parent:** issues/prd-website-builder-portfolio-redesign.md
**Blocked by:** issues/01-baseline-branch-and-wiring.md
**Verification:** assertions 3, 4 (dash half), 5 (budget half), 6, 8 — each checker proven
red/green against a deliberate violation, then green on the untouched branch

## What to build

The machine half of the PRD's validation contract, manufactured before any redesign code exists
(verification-time architecture). One gate runner (same spirit as the studio's qa-gate) with
four checks: **route parity** (branch build's route set ≡ the 01 manifest; MDX page body content
equivalent), **token parity** (CSS custom-property values ≡ the corresponding brands/marko
values; any mismatch fails unless a written proposal file names it), **weight budget** (no
framework runtime chunk; total JS under the PRD ceiling; Lighthouse ≥ the 01 baseline),
**copy lint** (no em/en dashes or arrows in visitor-facing copy), plus a **main-untouched**
check (main HEAD still the recorded sha). Prove each check catches a violation (red) and passes
the clean branch (green).

## Acceptance criteria

- [ ] One command runs all checks and exits nonzero on any failure
- [ ] Each check demonstrated red on a synthetic violation and green on the clean branch
- [ ] Gate documented in the issue's completion note so slices 05–07 can name it in their loops
