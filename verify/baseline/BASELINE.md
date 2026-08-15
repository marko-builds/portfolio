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

Measured on this machine, `astro preview` on :4399, Lighthouse via `npx --yes lighthouse` with
`CHROME_PATH=/usr/bin/chromium --headless --no-sandbox`.

Final pin, from every perf measurement taken on 2026-08-15 (`_perfRuns` in the summary carries them):

| page | n | perf runs | min | spread | pinned floor | a11y | seo |
|---|---|---|---|---|---|---|---|
| home | 9 | 1.00 x7, 0.98, 0.96 | 0.96 | 0.04 | 0.92 | 1.00 | 1.00 |
| call | 5 | 1.00 x5 | 1.00 | 0.02 | 0.98 | 1.00 | 1.00 |
| devlog | 6 | 1.00 x5, 0.99 | 0.99 | 0.02 | 0.97 | 1.00 | 1.00 |
| projects/deploylog | 5 | 0.80, 0.71, 0.78, 0.94, 0.92 | 0.71 | **0.23** | 0.48 | 1.00 | 1.00 |
| devlog post | 5 | 0.77, 0.90, 0.74, 0.69, 0.75 | 0.69 | **0.21** | 0.48 | 1.00 | 1.00 |

**Every page is noisier than the gate's original ±0.02 band, so the band became per-page.** The
July arm compared against `baseline - 0.02` for everything. Measured: the devlog post spans 0.69 to
0.90 and `projects/deploylog` spans 0.71 to 0.94, both an order of magnitude wider than 0.02. **A
check that fires at random carries exactly as much information as one that cannot fire**, so
`perfTolerance` is per-page and set to that page's measured spread, floored at 0.02. `_perfRuns`
carries every number so the pinned value is never read as "the score".

**This took three attempts, and each wrong one is worth more than the final number.** First pin:
the lower of two runs, called a floor — the very next run came in below it. Second pin: spreads
from three runs, which put home at 0.00 because three runs had all landed on a flat 1.00; the run
after that put home at 0.96 and failed. Third and current pin: every measurement of the day, n=5 to
n=9. **A spread of zero from a small sample is an under-sample that looks like precision**, and it
is the most convincing wrong number of the three.

**Re-pinning after a real perf change means re-measuring the spread, not editing one number.** Run
the page at least five times and take min and max; a single measurement cannot tell a regression
from the noise it sits in.

**A whole-run load excursion has a signature, and it is not a regression: every page moves at once,
including pages the change cannot touch.** Seen the same day, on the run right after the copy-button
fix. `home` failed at 0.96 against its 0.98 floor — and in that same run `projects/deploylog`
measured 0.94, *above* its previous maximum of 0.80, while the devlog post measured 0.69, *below* its
previous minimum of 0.74. A change cannot make one page faster and another slower at once, and the
copy-button change touches `.copy-btn` and `.pre-wrap code.hljs`, neither of which appears on the
home page at all (`grep -c 'copy-btn\|pre-wrap\|<pre' dist/index.html` returns 0). **When a perf arm
fails, read the other pages in the same run first: if they all moved, the machine moved.**

**The ratchet hazard, named so nobody keeps feeding it.** A floor set to "observed minimum minus
observed spread" can only ever move down: every unlucky run lowers the minimum and widens the spread,
so re-pinning after each failure walks the gate toward useless. Do not re-pin on a failure. Re-pin
only after a change that is *supposed* to move performance, and re-measure the whole set when you do.

**What this arm honestly is.** Local Lighthouse perf on this box cannot support a tight regression
gate — that is what the July caveat below already said, and three separate re-measurements have now
confirmed it. Treat the perf arm as a **collapse detector**: `projects/deploylog` and the devlog post
sit at floor 0.48, which still catches a page that has fallen to 0.3 and will never catch a 5-point
slip. **`a11y` and `seo` are the real gates here** — every page, every run, all day, 1.00 with zero
drift, up from July's 0.95-0.96 on the dark site. Ticket 08's contrast pass is the reason. They are
compared absolutely, with no tolerance, so they fail on any regression at all.

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
