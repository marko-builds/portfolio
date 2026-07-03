# Redesign baseline — measured on main before any redesign code

Captured 2026-07-03 (issue 01). Every later gate compares against this.

## Anchor

- **main HEAD at job start:** `2bc63087d87f120d429586ff4fbe349ac005b7e1`
  (the zero-commits-to-main check anchors here; assertion 8)
- **Working branch:** `feat/redesign`, cut from that sha

## Routes (assertion 3)

`routes.txt` — 12 emitted HTML routes from `astro build` on main (8 pages + the 4 `/blog/*`
redirect stubs from astro.config redirects). The redesign build's route set must be identical.

## Weight (assertion 5)

- Total shipped JS: **9,106 bytes** across 2 files (both inline-script bundles, no framework
  runtime): `index.astro` script 4,951 B + `Avatar.astro` script 4,155 B.
- Budget for the redesign: no framework runtime chunk; total JS under ~10 KB per the PRD.
  Note the baseline is already at 9.1 KB, so the redesign's IntersectionObserver script must
  replace, not add to, the current scripts.

## Lighthouse (assertion 5)

`lighthouse-summary.json` — Lighthouse 13.4.0, headless system Chromium, local `astro preview`
serve, categories performance/accessibility/seo:

| page | perf | a11y | seo |
|---|---|---|---|
| home | 0.93 | 0.96 | 1.00 |
| projects/deploylog | 0.97 | 0.96 | 1.00 |
| devlog index | 0.92 | 0.95 | 1.00 |
| devlog post (tictactoe-theme-system) | 0.95 | 0.95 | 1.00 |

Local scores are noisier than lab/CI; treat the gate as "within noise or better" (>= baseline
minus 0.02) rather than strictly greater-or-equal on perf. a11y/seo must not regress at all.

## Deploy wiring (the probe)

**The live site is GitHub Pages, not Vercel.** `.github/workflows/deploy.yml` builds and
deploys on push to `main` only (plus manual workflow_dispatch). Headers from
markostankovic.org confirm `server: GitHub.com`.

Consequences:
- **There are no branch preview deployments.** The PRD's fallback is the review medium:
  local `astro build` + `astro preview`, screenshots via capture-web.
- Pushing `feat/redesign` is safe — the workflow ignores non-main branches.
- **Any commit to main auto-publishes production.** The branch discipline is load-bearing.

## Lighthouse drift caveat (learned 2026-07-03, issue 05)

Local absolute Lighthouse scores drift with machine state: the untouched deploylog page
measured 0.97 at baseline time and 0.74 the same afternoon, and a pristine main worktree
build measured the identical 0.74 at that moment. When the `--full` perf gate fails,
re-measure pristine main (worktree at the baseline sha, build, serve, Lighthouse) in the
same session before believing a regression; the verdict is branch vs same-session main,
not branch vs the recorded absolute. a11y/seo stay absolute (they do not drift).
