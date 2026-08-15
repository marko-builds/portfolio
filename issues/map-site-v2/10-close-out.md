# Close-out: re-baseline the gate, cold read, then cascade the surfaces

**Type:** task
**Status:** open — **the gate half is done 2026-08-15** (see below); the copy-button decision is
measured and waiting on Marko's pick; the cold read and the cascade are **unblocked**
**Blocked by:** ~~[04](04-experience-timeline.md)~~ **released 2026-08-15 by Marko**: 04's one
remaining step is the LinkedIn edit, he is doing it later, and it does not gate a cold read of the
site or the cascade of the other surfaces. 04 stays open on its own. All other blockers resolved:
[03](03-home-page-rebuild.md), [05](05-call-page.md), [06](06-delete-game-project-pages.md),
[07](07-wordmark-blink.md), [08](08-light-dark-token-set.md), [09](09-devlog-reading-surface.md)
**Estimate:** 0.5 session

## Question

Close the stream on evidence, not on a checklist of shipped items.

## The gate re-baseline (map tension 6) — done 2026-08-15

This ticket owns `verify/gate.mjs`, and the ticket file did not say so until now: the scope lived
only in `map.md:146`. Recorded here so the next reader finds it by opening the ticket.

**The gate's verdict carried no information before this pass.** It reported 15 failures, every one
of them a July baseline that no longer described the site, so a real new failure was indistinguishable
from inherited noise — which is nearly what happened to [ticket 09](09-devlog-reading-surface.md).

**Three checks were lying, and all three were found by measuring rather than reading.**

- **Check 5, the copy lint, had two single-line assumptions.** Its comment skip
  `/^\s*(\/\/|\/?\*|<!--)/` matched only a comment's *first* line, so every wrapped line of a block
  comment was linted as reader-facing copy. And it set `inCode` on any line matching
  `/<(pre|script|style)[\s>]/` with no way back for a self-closing tag: `index.astro:139` is a
  self-closing `<script … />`, so everything from there to the `</style>` at `:776` was treated as
  code and **the home page's copy had never been linted at all**. Verified against the file before
  the fix, not inherited from the review note.
- **Check 4, the weight budget, scanned nothing.** It counted `dist/**/*.js` and there are none —
  Astro inlines every script into the HTML — so it printed `PASS js budget (0 B <= 10240 B across 0
  files)` and ran the framework-runtime signature over zero bytes while **5,129 B of real JS
  shipped**. Its answer for a site with no JS at all was identical to its answer for this one.
- **Check 6 read one local ref.** `verify/baseline/main-sha.txt` was pinned at `2bc6308` while local
  `main` sat at `78fd2e1` and the remote — the ref GitHub Pages actually deploys — was at `fb75b0f`.
  Local `main` was two commits stale, and a check reading it alone cannot see that.

**What changed.** Check 5's scanner now tracks `<pre>`/`<script>`/`<style>` bodies, HTML comments and
frontmatter `//` and `/* */` comments *across* lines, and a self-closing tag opens nothing; its scope
moved from the diff to every authored template, because re-pinning the baseline would otherwise have
dropped `index.astro` out of scope and kept its never-linted copy blessed by omission. Check 4 counts
the inline blocks, deduped by content, and reports remote `<script src>` as a NOTE. Check 6 checks
both `main` and `origin/main`. Check 3 stopped bridging colour to `brand.json` (see below).
`verify/rebaseline.mjs` is new and re-pins the artifacts using the gate's own extraction, so the two
cannot drift apart.

**One blind spot the fix introduced and then closed.** Treating any `//` as a frontmatter comment
swallows the rest of a line carrying a URL, and nine frontmatter URLs in `src/` sit on lines that
also hold reader-facing strings. `//` now opens a comment only where it is not a scheme's `//`,
and the planted case (`blurb: "a URL https://x.dev — and a dash"`) fails correctly.

**Lighthouse re-measured and re-pointed, and the perf arm's threshold was wrong.** The July summary
named `/devlog/tictactoe-theme-system/`, a draft since the game lane was drawered, so `--full` had
been scoring a 404 against a July number. The first re-pin took the lower of two runs as a floor —
**and the very next run failed against it**, 0.74 against 0.77. Three runs put the post at 0.77 /
0.90 / 0.74 and the deploylog page at 0.80 / 0.71 / 0.78, spreads of 0.16 and 0.09 against a ±0.02
band. A check that fires at random carries as much information as one that cannot fire, so
`perfTolerance` is now per-page and set to the measured spread; the three stable pages keep 0.02.
Re-pinning after a real perf change means re-measuring the spread, not editing one number. a11y and
seo did not drift: 1.00 across all five pages, up from July's 0.95-0.96 on the dark site, which is
ticket 08's contrast pass showing up in a second instrument. Detail in `verify/baseline/BASELINE.md`.

**Calibrated in both directions, against the real gate, because a green run is not evidence.**

| Planted input | Expected | Result |
|---|---|---|
| Em dash at `index.astro:200`, inside the region the old scanner treated as code | check 5 FAILs | `FAIL copy src/pages/index.astro: dash/arrow on line(s) 200` — old scanner: 0 hits |
| A four-line frontmatter comment carrying four banned characters | check 5 PASSes | PASS — old scanner false-positived on two of those lines |
| `--color-text-muted` lightened to `#9AA3AF` | check 3 FAILs | `FAIL token --color-text-muted: #9AA3AF != #6B7480` |
| `import x from "react"` in a built inline block | check 4 FAILs | `FAIL framework runtime: 1 inline block(s) match a framework signature` |

**Check 3 reconciled with decision 4.** The colour half asserted the CSS vars *equal*
`brand.json`'s, which decision 4 makes unsatisfiable — the site is light and the brand file stays
dark for studio renders. [Ticket 08](08-light-dark-token-set.md) recorded it as "unachievable as
written" and handed it here. It now pins the fourteen light tokens ticket 08 locked and
contrast-measured, with `verify/proposals/` as the same escape hatch for a deliberate change; the
type half still bridges to `brand.json`, which is the axis that did not diverge.

**Baseline artifacts re-pinned.** `main-sha.txt` → `fb75b0f` (ground truth from `git ls-remote`, not
the stale local mirror, which was fast-forwarded to match); `routes.txt` → the 15 current routes;
`devlog-bodies.json` → the 4 published posts. Every route delta was traced to the ticket that caused
it before it was blessed: the two game project pages to [06](06-delete-game-project-pages.md), the
three game devlog posts to commit `370aeec` marking them drafts, `/call/` to
[05](05-call-page.md), `/cv/` to the `astro.config.mjs` redirect.

**Scope note for Marko:** check 4's rewrite was not on this ticket's list. It was found while
re-baselining, it is the same false-pass class the session was sent to fix, and leaving it would
have meant re-pinning a gate with a check that cannot fail. Say the word and it comes back out.

## The copy button, measured 2026-08-15

Ticket 09 handed this over as "wants a real decision and a screenshot, not a revert of a revert".
Rendered at 390px with touch emulation on both surfaces that carry code blocks, with the overlap
**measured** rather than judged by eye. Harness: `scripts/copy-btn-variants.mjs`, renders and
`measurements.json` in `.qa-reports/copy-btn-390/` (gitignored; re-run the script to regenerate).

**Both halves of the defect are confirmed, and neither was inherited on trust.**

- **Touch.** `.copy-btn` is `opacity: 0` at `global.css:295` and revealed only by
  `.pre-wrap:hover` at `:304`. In a `hasTouch` context `matchMedia('(hover: none)')` matches, so
  the button never appears. Confirmed in every render.
- **Keyboard.** The button is a real `<button>`, `tabIndex >= 0`, and `document.activeElement`
  after `.focus()` — so it takes tab focus, then paints its 2px outline at **opacity 0**. Focused,
  reachable, invisible. `keyboard__A_control.png` is a code block with a focused control in it and
  nothing on screen to show it.

| Variant | What it does | Measured at 390px on `/projects/deploylog/` |
|---|---|---|
| **A** control | today: touch never reveals it | button invisible; if revealed it would sit `48x16px` over text rects on lines 1 **and** 2 |
| **B** reveal | the reverted one-liner, `@media (hover: none) { opacity: 1 }` | reveals it **over lines 1 and 2** — the documented defect, now measured |
| **C** reveal + pad | B, plus `padding-top: 3.25rem` on `code.hljs` | **clear**, all 34 text rects checked |
| **D** reveal + bottom | B, plus `top: auto; bottom: 0.6rem` | clear on both blocks, but see below |
| **E** focus | `.copy-btn:focus-visible { opacity: 1 }` | focus ring visible; opacity 0 → 1 while focused |

**Three things the measurement changed about the inherited description.**

1. **The overlap is two lines, not one.** The button is taller than a code line, so it covers text
   rects on lines 1 and 2. The first version of this harness tested line 1 only and would have
   reported D "clear" without having looked at the line D can actually hit — a check scoped
   narrower than its own claim, caught inside the pass that exists to fix exactly that.
2. **The padding has to go on `code.hljs`, not on `pre`.** Measured: `pre` is a transparent
   0-padding wrapper on both surfaces and `code.hljs` carries the white fill, the 1px border and
   the 8px radius. The first C render padded `pre` and left the button floating above the visible
   block, detached from it.
3. **D's "clear" is content luck, not a property.** It clears because both blocks happen to end on
   a short line (`></script>`, 11 chars). A long last line collides exactly the way B's first line
   does. **C is the only variant whose correctness does not depend on what the code says**, because
   the button gets dedicated space no line can enter.

**Marko picked C, 2026-08-15, and it shipped with the keyboard fix.** `global.css` now carries
`@media (hover: none) { .copy-btn { opacity: 1 } .pre-wrap code.hljs { padding-top: 3.25rem } }`
and `.copy-btn:focus-visible { opacity: 1 }`.

**Verified from a build, not from the diff.** With nothing injected, the harness's control arm now
measures what variant C measured: `hover:none=true`, button `opacity 1`, **clear across all 34 text
rects** on deploylog and all 21 on the post, where before the change the same arm read
`48x16px OVER lines 1, 2`. Keyboard focus reports `opacity 1` with the 2px outline. And the change
is scoped where it was meant to be: at 1280px `hover:none=false`, `code.hljs` padding stays `20px`
and the button stays `opacity 0` at rest, so the desktop hover behaviour is untouched. At 390px the
padding is `52px`.

**The first verification run disagreed with itself and was not believed.** One arm reported
`hover:none=false` while the other seven reported true, in the first browser context after launch;
a re-run came back true on all eight. A first-context reading is a warm-up artifact, and one
sample of an emulated media query is not a result.

**One thing the harness itself nearly got wrong, recorded because it is the session's own lesson.**
The first run produced four byte-identical blank PNGs on the deploylog surface: the code block sits
at y≈1688 inside a `.reveal` wrapper an IntersectionObserver fades in, and it was screenshot before
that fired. A blank render reads as "no overlap, looks fine". The harness now waits for every
ancestor to reach full opacity and **throws** if it never does.

## Inherited rows, none of them started

Carried from [ticket 09](09-devlog-reading-surface.md), which recorded them so they would not be
rediscovered. They are claims about artifacts — open the file before acting on one.

| Row | Where |
|---|---|
| `max-width: 68ch` constrains nothing. Opened and confirmed: `.body` at `index.astro:430-432` | `index.astro:431` |
| **Corrected on the way in.** The row said "the last hex literal in a shipping stylesheet: `.lb-btn`'s `#1f1f1f`". There is no `#1f1f1f` in `global.css` — the only occurrence is inside a comment at `:45` — and **zero hex literals remain outside the `:root` token block**. What is actually there is `rgba(31, 31, 31, 0.8)` at `:372` and a **second** literal the row never mentioned, `rgba(50, 50, 50, 0.9)` at `:386`. The defect is real and the description was ungreppable, which is ticket 08's own blind spot inherited one ticket down: its sweep pattern was `#hex` and could not match an `rgb()`/`rgba()` literal. Note before fixing that both are translucent, so pointing them at `--color-backdrop` repeats the `#1f1f1f80` mistake ticket 08 documented | `global.css:372,386` |
| Six draft-post diagram SVGs still hold `#5FCEDB` and one `#0B0E15` | the November drain, unchanged by design |
| ~~The copy button is hover-only on touch and invisible to keyboard focus~~ **Measured 2026-08-15, see the section above.** Both halves confirmed; variants rendered; awaiting Marko's pick | `global.css:295,304` |
| Seven raw-px font sizes in `devlog/index.astro` (`.post-title` 17px, `.empty` 14px, five more) | one was converted by 09, the rest were not |
| Two remote `<script src>` the weight budget deliberately does not gate: Google Tag Manager and the highlight.js CDN bundle. A policy call, not a re-baseline | reported as NOTE by check 4 |

## The cold read

Run `/cold-read` over the **live** home page, the timeline and `/call`. It is a process-isolated
reader with no access to this repo, this AIOS, or who Marko is.

**"Comes back clean" is defined, because a done-condition that cannot fail is not a
done-condition.** `/cold-read` is report-only and returns a qualitative read, so the stream closes
on **zero findings in these three classes**:

- **(a)** the reader cannot say what Marko does for work
- **(b)** the reader cannot name one thing he built, or cannot tell how to verify it
- **(c)** the reader cannot find a way to contact or book him

Anything else the cold read flags is input to a later pass, not a blocker. Record the full read in
this ticket either way, including what was *not* treated as blocking.

**Blocked-by includes 06 and 07** on purpose: a cold read of a site that still has the blinking
cursor and the dead game routes is a read of a half-migrated site.

## The cascade

Then update the surfaces that make claims about this site, in the same pass:

| Surface | What changes |
|---|---|
| `projects/job-search/proof-portfolio.md` | site rows, and the CV/site link set |
| `public/llms.txt` | flagged stale by `map-public-proof/11`; verify it matches the new page |
| LinkedIn | the `AI Engineer` title from [ticket 04](04-experience-timeline.md). **NOT "Independent"** — that word was cut 2026-08-15 and this row said otherwise until 08-15. **One decision is deferred here on purpose: what goes in LinkedIn's required Company field.** See ticket 04's cascade-run section for the narrowed option set |
| GitHub profile README | the through-line sentence, plus the `/call` link if wanted |
| `projects/job-search/presence-baseline.md` | a June snapshot with no staleness banner that has already produced one wrong claim — date-stamp it or re-capture it |

**Re-verify every repo link with `gh repo list marko-builds` before it ships.**
`proof-portfolio.md` has been wrong about repo visibility before, and a row asserting an external
state is unfalsifiable from inside this repo.

## Acceptance

- **The gate is green on a re-pinned baseline, and each check has been shown to fail on a planted
  input.** Done 2026-08-15; the calibration table above is the evidence. A green gate on an unproven
  check is what this ticket inherited.
- Cold read run against the live site, recorded, zero findings in classes (a), (b), (c).
- Every surface in the table updated, each verified against the thing it claims rather than against
  another row.
- The map's status flipped to resolved with the date.
