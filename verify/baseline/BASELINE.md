# Redesign baseline — measured on main before any redesign code

Captured 2026-07-03 (issue 01). Every later gate compares against this.

> **Re-pinned 2026-08-15** by `issues/map-site-v2/10-close-out.md`. Everything below the
> "Re-baseline" section still describes the **July** capture and is kept as the record of what the
> site was before the site-v2 redesign. The values the gate reads today are in that section. Read
> it first.

## Re-baseline, 2026-08-15 (map-site-v2 ticket 10)

The July baseline had stopped describing the site: the gate reported **15 failures, every one of
them structural**, so its verdict carried no information and a real new failure in ticket 09 was
nearly read as inherited noise.

**Command:** `node verify/rebaseline.mjs <40-char main sha>`, run against a build you have already
inspected. It re-pins `routes.txt`, `devlog-bodies.json` and `main-sha.txt` using the gate's own
route derivation and body extraction, so the baseline and the check cannot drift into two
different definitions of the same thing. Lighthouse is re-measured by hand; the commands are below.

- **main HEAD:** `fb75b0fede53c89991c0669a2031695d7555fd36` — ground truth from `git ls-remote`,
  not from a local ref. Local `main` was two commits stale at `78fd2e1` at the moment of the
  re-pin, and check 6 now reads **both** `main` and `origin/main` because one local ref could not
  have shown that.
- **Routes: 15** (was 12 + `/404.html`). Every delta was traced to the ticket that caused it before
  it was blessed: `/projects/hide-and-seek/` and `/projects/tictactoe/` deleted by ticket 06; the
  three game devlog posts and their `/blog/` stubs unpublished by commit `370aeec`, which marked
  them drafts when the game lane was drawered; `/call/` added by ticket 05; `/cv/` is the
  `astro.config.mjs` redirect to the CV PDF.
- **Devlog bodies: 4 published posts.** The three July slugs are the drafted game posts above.
- **Tokens.** The colour half no longer bridges to `brands/marko/brand.json`. Map decision 4 made
  that unsatisfiable — the site is light, the brand file stays dark for studio renders, and ticket
  08 recorded the check as "unachievable as written". The gate now pins the fourteen light tokens
  ticket 08 locked and contrast-measured; the type half still bridges to `brand.json`.
- **Weight.** The budget counted `dist/**/*.js` and there are none — Astro inlines every script —
  so it had been passing on 0 bytes across 0 files while **5,129 B** of real JS shipped in five
  distinct inline blocks. It now counts those, deduped by content, and reports the two remote
  `<script src>` (Google Tag Manager, the highlight.js CDN bundle) as NOTE rather than budgeting
  them. **This is the number to compare against July's 9,106 B across 2 bundles**, not the old zero.

### Lighthouse, re-measured 2026-08-15

The July summary pointed at `/devlog/tictactoe-theme-system/`, which is now a draft, so `--full`
had been measuring a 404 against a July score. Pages re-pointed: the post page is now
`/devlog/zero-dollar-media-stack/`, and `/call/` was added.

Measured twice, back to back, same session, same machine, `astro preview` on :4399, Lighthouse via
`npx --yes lighthouse` with `CHROME_PATH=/usr/bin/chromium --headless --no-sandbox`:

| page | perf run 1 | run 2 | run 3 | spread | pinned floor | a11y | seo |
|---|---|---|---|---|---|---|---|
| home | 1.00 | 1.00 | 1.00 | 0.00 | 0.98 | 1.00 | 1.00 |
| call | 1.00 | 1.00 | 1.00 | 0.00 | 0.98 | 1.00 | 1.00 |
| devlog | 1.00 | 1.00 | 1.00 | 0.00 | 0.98 | 1.00 | 1.00 |
| projects/deploylog | 0.80 | 0.71 | 0.78 | **0.09** | 0.62 | 1.00 | 1.00 |
| devlog post | 0.77 | 0.90 | 0.74 | **0.16** | 0.58 | 1.00 | 1.00 |

**The two heavy pages are noisier than the gate's tolerance, so the tolerance moved.** A first pass
pinned `performance` at the lower of two runs and called it a floor; the very next run scored 0.74
against that 0.77 floor and failed. Three runs put the post at 0.77 / 0.90 / 0.74 — a 0.16 spread
against a ±0.02 band. **A check that fires at random carries exactly as much information as one
that cannot fire**, so `perfTolerance` is now per-page and set to the measured spread: the three
stable pages keep 0.02, the two heavy ones get 0.09 and 0.16. A band that wide still catches what a
perf gate is for, which is a collapse rather than a wobble. `_perfRuns` carries all three numbers so
the pinned value is never read as "the score", and a failure there still wants the same-session
pristine-main comparison the July caveat below prescribes.

**Re-pinning after a real perf change means re-measuring the spread, not editing one number.** Run
the page three times and take min and max; a single measurement cannot tell a regression from the
noise it sits in.

**a11y and seo are absolute and did not drift**: both pages measure 1.00 on both runs, up from
July's 0.95-0.96 on the dark site. The light palette's contrast pass (ticket 08) is the reason, and
it makes the a11y arm strictly stronger than it was — it now fails on any regression at all.

## Anchor (July 2026 capture — superseded)

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

## Route addition: /404.html (Marko-directed, 2026-07-03)

Issue 06 adds a custom 404 page (src/pages/404.astro); GitHub Pages serves dist/404.html for
unknown URLs automatically. Marko asked for the 404 template explicitly, so this is the one
deliberate exception to "route sets identical": routes.txt now includes /404.html.
