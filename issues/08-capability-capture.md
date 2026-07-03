# 08 — Capability capture: extract the website-builder skill

**Status:** ready-for-agent · **Type:** human-in-the-loop · **Lane:** portfolio (capability home: claude-video-studio)
**Parent:** issues/prd-website-builder-portfolio-redesign.md
**Blocked by:** issues/07-final-qa-preview-merge.md
**Verification:** the job's repeatable path exists as a skill Marko approves (/skill-builder
interview; no machine signal — process design)

## What to build

Turn the proven job into the standing capability: run /skill-builder over the notes kept during
01–07 (what was repeatable, what the gotchas were) to author the website-builder skill —
direction prototypes → pick → build with token/parity/budget gates → preview → human merge.
Add the capability row to the studio's capability backlog per the ledger convention, a lessons
entry for the web dialect of the motion vocabulary, and file any accumulated proposals (brand
tagline, token itches) toward the parked brand pass.

## Acceptance criteria

- [ ] Website-builder skill authored via /skill-builder and approved by Marko
- [ ] Studio capability backlog row + lessons entry written
- [ ] All proposals filed as proposal docs; none applied

## Completion note (2026-07-03)

- **/website-builder skill authored** (monolith `.claude/skills/website-builder/`) from the
  job's evidence: the gated path (baseline, gate runner, prototypes, copy pack, build,
  QA, PR) + every gotcha that cost time once. Awaiting Marko's approval read.
- **Studio capability row**: P15 in claude-video-studio `plans/capability-backlog.md`
  (DONE, Marko-driven session); **lessons entry** for the web dialect of the motion
  vocabulary + the Lighthouse-drift and verification-time findings in `docs/lessons.md`.
- **Proposals filed, none applied**: `verify/proposals/brand-tagline.md` (the stale
  "Game developer & technical artist" tagline) toward the parked brand pass. No token
  itches accumulated; CSS stayed value-identical to brands/marko.
