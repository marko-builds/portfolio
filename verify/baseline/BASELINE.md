# Redesign baseline — measured on main before any redesign code

Captured 2026-07-03 (issue 01). Every later gate compares against this.

> **Re-pinned 2026-08-15** by `issues/map-site-v2/10-close-out.md`. Everything below the
> "Re-baseline" section still describes the **July** capture and is kept as the record of what the
> site was before the site-v2 redesign. The values the gate reads today are in that section. Read
> it first.

## Load guard and quiet floors, 2026-09-29 (supersedes the floors in the next section)

`--full` now reads each report's `environment.benchmarkIndex` (Lighthouse's CPU benchmark, taken once
at the start of a run) and prints it on every Lighthouse line. At 1900 or above the perf floor is
judged as before. Below 1900 the page gets no perf verdict: the gate prints `INCONCLUSIVE` and, if
nothing failed, ends `GATE INCONCLUSIVE` with exit 2, meaning re-run when idle. a11y and seo are
judged on every run. A report without a numeric benchmark is a FAIL, because `undefined < 1900` is
false and a renamed field would otherwise switch the guard off in silence. `--full` also stopped
hard-coding :4399: it asks the OS for a free port, and it measures nothing until the preview server
returns this checkout's `dist/index.html` byte for byte.

Floors, from the 2026-09-29 runs at benchmarkIndex 1900 or above only, same formula as before
(`performance` = minimum, `perfTolerance` = spread floored at 0.02):

| page | quiet n | quiet runs (bench >= 1900) | min | spread | floor | excluded as loaded (perf at bench) |
|---|---|---|---|---|---|---|
| home | 7 | 0.78, 0.65, 0.66, 0.78, 0.62, 0.66, 0.66 | 0.62 | 0.16 | 0.46 | 0.58 at 1660, 0.61 at 1212, 0.54 at 1010 |
| call | 6 | 1.00, 0.99, 1.00, 0.99, 0.97, 0.98 | 0.97 | 0.03 | 0.94 | 0.93 at 1273, 0.96 at 1724, 0.93 at 963, 0.91 at 1088 |
| devlog | 6 | 0.99, 0.95, 0.90, 0.90, 0.98, 0.89 | 0.89 | 0.10 | 0.79 | 0.86 at 1172, 0.88 at 1815, 0.84 at 1024, 0.85 at 1080 |
| projects/deploylog | 6 | 0.83, 0.95, 0.96, 0.95, 0.94, 0.94 | 0.83 | 0.13 | 0.70 | 0.82 at 1336, 0.73 at 1364, 0.70 at 973, 0.73 at 1448 |
| devlog post | 7 | 0.78, 0.77, 0.79, 0.78, 0.66, 0.68, 0.74 | 0.66 | 0.13 | 0.53 | 0.78 at 1882, 0.56 at 1088, 0.73 at 1864 |

**Out of sample.** The threshold and the floors came from the same 50 runs, so the guarded gate then
ran `--full` five more times: 25 page-runs, all quiet (benchmarkIndex 2128 to 2677), all PASS. home
0.66 to 0.81, projects/deploylog 0.95 to 0.98, call 0.99 to 1.00, devlog 0.89 to 0.99, the post 0.72 to
0.79.

**Each arm watched failing (2026-09-29):**
- Floor: a 3 s synchronous busy loop planted in the built `dist/call/index.html` (run with
  `--no-build`, or the build erases the plant) took call to 0.47 at benchmarkIndex 2677, a FAIL.
- Guard: all 12 cores loaded for four minutes put every page at benchmarkIndex 1201 to 1284; all five
  read `INCONCLUSIVE`, the gate ended `GATE INCONCLUSIVE` with exit 2, and a11y, seo, the motion arm
  and both main arms still passed. Unguarded, call's 0.95 and home's 0.60 from that run would have
  been read as real scores.
- Fail closed: a scratch copy reading a renamed benchmark field failed all five pages, naming the
  missing field.
- Port: a stale server on `[::1]:4399` (the address `astro preview` binds on Windows) with the gate
  forced onto 4399 failed with "does not serve this checkout's dist", and nothing was measured. A
  dummy on the wildcard address alone did not collide (Windows let astro take the specific `[::1]`),
  and the check correctly passed there.

**What each floor catches now.** The planted blocking script took call from 0.99 to 0.47, so call
(0.94), projects/deploylog (0.70) and devlog (0.79) catch a real slowdown, not only a collapse. home
(0.46) and the post (0.53) stay close to collapse detectors: home's spread is its aurora (two modes by
first-paint timing), and the post's quiet set includes runs slowed by load that began after the
benchmark was taken (0.66 at 2031), which no start-of-run benchmark can see.

**Designed out, after a plan review.** Retrying a loaded or below-floor page up to three times and
passing on the best: it would hide a regression that only sometimes lands below the floor, judge on
a better statistic than the floors were pinned from, and add load of its own while the box is busy.
An INCONCLUSIVE is a re-run by a person, not a loop. `BENCH_MIN` (1900) is this box's number: quiet
runs read 1660 to 2542 and loaded ones 963 to 1448. A new machine re-measures it.

## Lighthouse floors re-measured, 2026-09-29 (Windows box, first measure since site-v3)

The perf floors in `lighthouse-summary.json` were pinned on 2026-08-15. Site-v3 then changed every
gated page on 2026-08-23 (the aurora home in `a0e0833`, the display face, the bands, the journal
move), and both site-v3 re-pins below left the floors untouched. So until today no floor had been
measured against the site it gates. That is the "change that is supposed to move performance" the
ratchet rule below allows a re-pin for; this is not a re-pin on a failure.

Measured on the Windows 11 box: Lighthouse 13.5.0, HeadlessChrome 154, mobile form factor with
simulated throttling, the gate's own invocation (`astro preview` on :4399, `npx --yes lighthouse`
with `--headless --no-sandbox`, Chrome found by the gate's resolver). Every current-site run counts,
in the order taken: a home probe and one `--full` run on 2026-09-26; on 2026-09-29 a night batch of
five rounds (each round a fresh preview server and the five pages in the gate's order), one `--full`
run, and a morning batch of five rounds. The site bytes were identical throughout (the commits
between the two days touch only `verify/` and `CLAUDE.md`).

| page | n | perf runs, in order | min | max | spread | pinned floor | a11y | seo |
|---|---|---|---|---|---|---|---|---|
| home | 13 | 0.69, 0.67 / 0.58, 0.78, 0.65, 0.66, 0.78 / 0.68 / 0.62, 0.61, 0.66, 0.54, 0.66 | 0.54 | 0.78 | 0.24 | 0.30 | 1.00 | 1.00 |
| call | 12 | 0.99 / 1.00, 0.99, 1.00, 0.99, 0.97 / 0.99 / 0.93, 0.96, 0.98, 0.93, 0.91 | 0.91 | 1.00 | 0.09 | 0.82 | 1.00 | 1.00 |
| devlog | 12 | 0.91 / 0.99, 0.95, 0.90, 0.90, 0.98 / 0.90 / 0.86, 0.88, 0.89, 0.84, 0.85 | 0.84 | 0.99 | 0.15 | 0.69 | 1.00 | 1.00 |
| projects/deploylog | 12 | 0.96 / 0.83, 0.95, 0.96, 0.95, 0.94 / 0.98 / 0.82, 0.73, 0.94, 0.70, 0.73 | 0.70 | 0.98 | 0.28 | 0.42 | 1.00 | 1.00 |
| devlog post | 12 | 0.79 / 0.78, 0.77, 0.78, 0.79, 0.78 / 0.74 / 0.66, 0.68, 0.74, 0.56, 0.73 | 0.56 | 0.79 | 0.23 | 0.33 | 1.00 | 1.00 |

Same method as 2026-08-15: `performance` is the minimum, `perfTolerance` the spread floored at 0.02,
so the floor is the minimum minus the spread. **a11y and seo read 1.00 on all 83 runs of 2026-09-29
(the current site, the control and the aurora-off diagnostic below), so they stay absolute gates.**

**Load is part of the sample, on purpose.** A first pin from the night batch alone (n=6, call 0.94,
the post 0.75) failed on the very next run, the post at 0.74: a 0.02 band from six runs, the
under-sample the 2026-08-15 section warns about. The morning batch then ran while other sessions
worked the same machine: Lighthouse's `benchmarkIndex` fell to 963 at worst, 13 of its 25 runs under
1500, against 1660 to 2542 in the night batch, and every page dropped together. This box is shared
by design, so floors that ignore load fire whenever another session is busy. **Every floor above is
a collapse detector:** it catches a page that falls well below its loaded minimum, never a slip of
five or ten points. Before believing a red, read the other pages in the same run (the section below):
if they all moved, the machine moved.

**The machine is comparable; the pages changed.** Control: the site at `c5dba0b` (the 2026-08-15
pin, pre-site-v3), built and measured on this box in five rounds, gave home 0.99 to 1.00,
projects/deploylog 0.78 to 0.95, call 0.93 to 0.99, devlog 0.98 to 0.99 and the post 0.90 to 0.91,
inside or next to the Arch ranges in the 2026-08-15 table below. Its one low call run (0.93) came in
a round where `benchmarkIndex` fell to 1119. So the drop from the old floors is site-v3, not Windows.

**Home, and why its floor carries the aurora (Marko, 2026-09-29, option A).** Forcing reduced motion
(the poster instead of the WebGL canvas) put home at 0.96, 0.96, 0.96 with TBT about 59 ms. With the
aurora running, headless Chrome renders the shader in software and TBT reaches 1.7 to 4.7 s whenever
first paint lands early. Pinned as measured: the arm watches the page visitors get, and the aurora
keeps its own byte budget and reduced-motion arm. Rejected option B was to run home's Lighthouse
under reduced motion, which is tighter but stops measuring the aurora.

**A tighter perf arm needs a load guard, not a narrower band.** Each report carries
`environment.benchmarkIndex`; a gate that refused a perf verdict below a measured threshold could pin
from quiet runs only. Not built here: it changes what the arm reports, so it is its own decision.

**Separate finding, not fixed here:** home's CLS is 0.103 on every run, with or without the aurora.
Lighthouse's `layout-shifts` audit names one shift on `section#hero > ul#receipts`, cause "Web font
loaded" twice. It does not move the floors (the same value in every run) and is queued as its own
task.

## Re-pin, 2026-08-23 (issues/16-captures-qa-cold-read-merge.md, site-v3 merged to main)

`main-sha.txt` re-pinned to the site-v3 merge commit; `routes.txt` and `devlog-bodies.json` re-pinned from the dist built at that commit (25 routes, 5 posts; the bodies are unchanged by the merge). Expected gate after this: green on every arm including both `main untouched` arms.

## Re-pin, 2026-08-23 (issues/13-legend-page.md, branch wt/slice-13)

Routes re-pinned by `node verify/rebaseline.mjs 6a5b8c5b7e6e66e10a8cc2fba78cd4b569576d3d` against
the real build. Same main sha passed back in unchanged (`git diff -- verify/baseline/main-sha.txt`
empty; re-pinning it is still slice 16's job), `devlog-bodies.json` byte-identical.

- **Routes: 25** (was 24). Added: `/about/`, the Legend page (`src/pages/about/index.astro`,
  `src/components/LegendStrip.astro`, `LegendDates.ts`). Removed: none.
- **Weight: 6906 B across 7 unmarked blocks** (was 6127 across 6). The page's drag script is
  779 B and no longer the prototype's bytes (review of 0c0bc94: pointer capture moved off
  pointerdown so a still click on a linked tile navigates; the `?scroll=` hook dropped), so both
  copies count until slice 14 deletes `/proto/about/`, after which the number drops by its 742 B.
  Aurora budget untouched (9135 B, no aurora on inner routes).
- **Motion, tokens, bodies, Lighthouse floors: untouched.** `/about/` carries no aurora block, so
  the reduced-motion arm does not run on it; its own reduced-motion contract (the strip's
  `scroll-behavior: smooth` only under `prefers-reduced-motion: no-preference`) was read off the
  built page by CDP: `auto` under `--force-prefers-reduced-motion`, `smooth` without.

## Re-pin, 2026-08-23 (issues/09-gate-config-reconcile.md, branch build/site-v3)

Routes and bodies re-pinned by `node verify/rebaseline.mjs 6a5b8c5b7e6e66e10a8cc2fba78cd4b569576d3d`
against the real build. The main sha is the same one ticket 07 pinned, passed back in unchanged
(`git diff -- verify/baseline/main-sha.txt` empty); re-pinning it is slice 16's job.

- **Routes: 24** (was 17). The journal moved from `/devlog` to `/field-journal` (map-site-v3
  ticket 10, amendment 2026-08-23). Added: `/field-journal/` and `/field-journal/<slug>/` for the
  five non-draft posts (building-pipeline-tooling-with-claude-code, golden-fingerprints-generative-art,
  skill-vibe-test-decay-probe, swipeable-panorama-continuous-ridge, zero-dollar-media-stack), plus
  `/lab-notes/`, a redirect stub. Removed: none by path. `/devlog/`, `/devlog/<slug>/`, `/blog/`
  and `/blog/<slug>/` keep their lines but are now meta-refresh stubs (one hop each to
  `/field-journal...`), not pages. `/about/` is not pinned: it does not exist until slice 13.
- **Why the page move is in this slice and not slice 12.** Astro 5.18 builds a dynamic config
  redirect (`/devlog/[slug]`) by calling the TARGET route's `getStaticPaths`, so the build fails
  with `GetStaticPathsRequired` while `/field-journal/[slug]` has no page; and a config redirect
  replaces a file-based page with the same pattern rather than the page shadowing it
  (`astro/dist/core/routing/manifest/create.js`, the `filteredFiledBasedRoutes` filter). The two
  page files were `git mv`'d with only their hrefs changed; slice 12 still owns the visual work.
- **Journal bodies: 5**, byte-identical hashes, now read from `dist/field-journal/<slug>/` (the
  `JOURNAL_DIR` constant in both scripts). The file keeps its `devlog-bodies.json` name.
- **Tokens: 30** (was 16). Accent, accent-dim and warm re-frozen to the confirmed aurora sync
  (`#1D7781`, `#1D77811F`, `#9B5E25`); `verify/proposals/accent-sync-aurora.md` deleted. The seven
  night tokens, `--aurora-0..5` and `--aurora-ramp` added from the ticket 03 lock. The parser now
  strips CSS comments first: the night block's own comment mentions `--color-night-bg:` and the
  first match had been winning.
- **Weight, motion, Lighthouse floors: untouched.** The `--full` page list points at
  `/field-journal/` and `/field-journal/zero-dollar-media-stack/`; keys and floors unchanged.
- **Planted negatives** (each restored, plant string grep = 0): off-token hex in `global.css`
  `FAIL token --color-accent: #DEADBE != #1D7781 and no proposal names it`; unbudgeted inline
  script in `dist/index.html` `FAIL js budget: 16191 B > 10240 B across 7 unmarked inline blocks`;
  em dash in `404.astro` `FAIL copy src/pages/404.astro: dash/arrow on line(s) 18`. The token and
  copy arms read source, so a plant in `dist/` cannot fire them.

## Re-pin, 2026-08-22 (map-site-v3 ticket 07)

Two arms were red on main before any v3 code existed, so ticket 07 re-pinned them before adding
its own checks. Nothing else moved; no threshold widened; Lighthouse untouched (no re-measure, so
the 2026-08-15 floors and `_perfRuns` stand as they are).

- **Routes: 17** (was 15). `606e6cb` flipped `draft: false` on
  `src/content/blog/building-pipeline-tooling-with-claude-code.mdx` (dated 2026-08-19), which
  emits `/devlog/building-pipeline-tooling-with-claude-code/` and its `/blog/` redirect stub from
  `astro.config.mjs`. Published on purpose by the devlog timer, baseline never followed.
- **Devlog bodies: 5.** The same post's body hash, taken by `rebaseline.mjs` from the build.
- **main HEAD: `6a5b8c5b7e6e66e10a8cc2fba78cd4b569576d3d`** (was `b42f9bf`). Nine commits
  since the pin, all docs, issues and the devlog publish; `git log --oneline b42f9bf..main`
  lists them. This is the local main the `gate/aurora-carveout` branch was cut from.
  `git ls-remote origin main` at the moment of the re-pin read `87f038f`, one commit behind: the
  map-charting commit `6a5b8c5` is not pushed yet, so check 6's `origin/main` arm reads red until
  `git push origin main` and goes green on its own after it. Pinned to the local ref on purpose so
  the push needs no second re-pin.
- **Weight.** General budget unchanged at 10240 B over unmarked inline blocks (5129 B on main).
  New: the aurora allowance, 11264 B over blocks marked `data-budget="aurora"`, one script plus
  one shader at most. Measured aurora block on the spike page: 10646 B. See
  `issues/map-site-v3/07-gate-rescope.md` for the planted negatives.

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
