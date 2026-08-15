# Devlog reading surface pass

**Type:** task
**Status:** resolved 2026-08-15 — built, reviewed, eyeball gate passed
**Blocked by:** [02](02-register-ia-prototype.md)
**Estimate:** 0.75 session

## Question

Apply the winning register to the pages people actually read: `src/pages/devlog/index.astro` and
`src/layouts/BlogPost.astro`.

## Why it is in scope

Three reasons, all pre-existing:

1. `map-public-proof/15-register-prototype.md` named **type scale and measure on the devlog reading
   surface** as the highest-leverage lever for "reads warmer", and said it costs nothing.
2. `BlogPost.astro` holds **44 hardcoded hex literals**, the largest concentration outside the
   project pages.
3. **14 posts are draining onto this surface** between now and late October. It is where a peer
   reader lands, and peers were added as an explicit second audience on 2026-08-13
   (`map-public-proof/map.md`, the amendment).

Shipping a redesigned home page over an unstyled reading surface would leave the least-designed
page on a site whose main output is writing.

## Amended 2026-08-15 — the literal set, counted rather than described

Marko asked for this scope to be widened before the ticket runs, on the map's note that the
dark-brand literals are a larger set than this ticket describes. **Counting them widened the set
and narrowed the work at the same time**, so the amendment is worth more than the adjective was.

**Reason 2 above is stale.** `BlogPost.astro` does not hold 44 hex literals. It holds **three**,
and one of them is a comment. Tickets 03 and 08 converted the rest to tokens without updating this
row. Do not plan against the 44.

**The full census of colour literals under `src/` and `public/`** (hex and `rgb()`/`rgba()`, since
a `#hex`-only pattern is what made ticket 08 miss them twice):

| File | Literals | Ships? |
|---|---|---|
| `src/components/Avatar.astro` | 38 | **No.** Zero importers, verified. |
| `src/styles/global.css` | 36 | Mixed: the light tokens are the source of truth, plus the 12 dead-CSS dark literals the map already recorded. |
| 7 diagram SVGs under `public/images/blog/` | 81 | **No.** Every owning post is `draft: true`. |
| `src/layouts/BlogPost.astro` | 3 | **Yes, 1 of them** (corrected below). |
| `public/favicon.svg`, `logo.svg`, `site.webmanifest` | 8 | Yes, and all correct after ticket 11. |

**So the only dark-brand literal on a page a reader can currently reach is
`BlogPost.astro:70`** — and it is a real visible defect, not a tidy-up.
`#reading-progress-track` is `rgba(255,255,255,0.08)`, an 8% white veil built for the dark page.
On `--color-bg` it is invisible, so every published post renders a teal progress fill floating in
nothing.

**Corrected 2026-08-15, before the fix, by opening the other line instead of trusting the count.**
The census first recorded `BlogPost.astro` as shipping **2** of its 3 literals. The second one,
`:255`'s `rgba(217,154,94,0.06)`, is the draft banner, and `:18` guards it with
`import.meta.env.DEV && draft` — so it cannot appear in a build at all. It is a dark-brand literal
that renders only on Marko's dev server. **One of three ships, not two.** Worth recording because
the error was made *while writing the correction to someone else's stale count*: a census is a
claim about each row, and grepping a file tells you a literal exists, never whether anything
renders it.

**Resolved 2026-08-15: `BlogPost.astro:70` is now `var(--color-border)`.** Verified on a built
preview, not asserted: `rgba(255,255,255,0.08)` returns 0 matches across all four published posts,
the built CSS reads `background:var(--color-border)`, and a 3x screenshot shows the track as a warm
hairline under the nav where there had been nothing. The rest of this ticket is untouched.

**Confirmed, not inherited:** the map's claim that `difficulty-ramp-chart.svg:6` is the last
`#0B0E15` under `src/` or `public/` is **true** — a repo-wide grep returns exactly that one line.

**Three consequences for how this ticket runs:**

1. **Do the `BlogPost.astro` track first and separately.** It is one line and it is the only part
   of this census a reader meets.
2. **The 7 diagram SVGs are not this ticket's work.** They belong to the November drain, with the
   `/blog/<slug>` link fix already recorded below — same posts, same session, one pass. Repainting
   diagrams for posts that are not built is work whose result nobody can see.
3. **`Avatar.astro` is not dead code to sweep.** `map-public-proof/16` gives it a charm slot (404
   or nav mark), so its 38 literals are a **decision** about where the pixel avatar lands, not a
   lint. Deleting it would quietly resolve a question the map deliberately left open. Either give
   it its slot and repaint it there, or leave it alone.

## Scope

- Body size, line height and measure on `BlogPost.astro`.
- Section rhythm and the post-row list on `devlog/index.astro`.
- Both palettes if a toggle ships from [ticket 08](08-light-dark-token-set.md).
- Code blocks, blockquotes, figures and image captions — the elements the posts actually use.

## Not in this ticket

- **Post content.** The drain is `map-public-proof`'s business.
- **The six `/blog/<slug>` links that should be `/devlog/<slug>`** in `relic-rush-pivot.mdx` and
  `relic-rush-obstacle-system.mdx`. Both are `draft: true` and out of the drain
  (`publishing-schedule.md:52-54`), so they are not live dead links. Whoever ships those posts from
  November fixes them. Recorded here so it is not rediscovered as a new bug.

## Acceptance

- ~~A post renders in the winning register in both palettes.~~ **Amended 2026-08-15: light only.**
  Map decision 4 settled that no second palette ships, so "both palettes" is a condition that can
  never be met and would have blocked the ticket on a question already closed.
- The reading measure is deliberate rather than inherited.
- ~~`verify/gate.mjs` passes.~~ **Amended 2026-08-15: it cannot.** Tension 6 records that the gate
  fails 7 checks against a July baseline and that no ticket may cite it as a green signal until
  [ticket 10](10-close-out.md) re-baselines it. Written before that was known.
- ~~**New:** the reading progress bar has a visible track on a published post. This is the one
  literal in the census a reader currently meets.~~ **Met 2026-08-15**, taken out of this ticket
  and shipped on its own because it was live on four posts.

## Built 2026-08-15 — what shipped, and what counting changed again

Screens for the gate: `.qa-reports/ticket-09-devlog/`, `before-*` and `after-*`, 1440x900 and
390x844 at 2x plus a full-page pass each. Verified against a built preview on `:4399`, never
against the dev server.

### The scope line was wrong in the same way reason 2 was

The ticket's scope named "code blocks, blockquotes, figures and image captions — the elements the
posts actually use." **Counted from the built HTML of the four published posts, inside
`article.prose`:** 82 `p`, 20 `h2`, 27 inline `code`, 6 `img`, 5 `strong`, **1** `pre`. And
**zero** `blockquote`, `h3`, `figure`, `figcaption`, `hr`, `ul` or `a`. Across all 16 posts
including the drafts, `h3` and `blockquote` are still zero. Three of the four elements the scope
named as load-bearing render nowhere, and the two that carry the surface — the paragraph and the
inline code chip — were not named at all. Same failure as the 44 hex literals: written from a
description of the page rather than a reading of it.

`h3`, links and blockquote were still touched, but only where **leaving them would ship a defect
this change created**: after the body went to 18px, the old `h3` at 1.05rem would have been
smaller than the paragraphs under it. That is different from repainting the draft SVGs, which
consequence 2 correctly refuses.

### The register, taken from `call.astro` rather than invented

`call.astro` (ticket 05) and `index.astro` (ticket 03) are the built expression of the direction
ticket 02 locked, so the head band, the h1 clamp and the lede size were copied from them
value-for-value. The direction's one standing rule — **mono survives for small metadata only**,
written at `call.astro:181` — is what most of this diff enforces:

| Surface | Was | Now |
|---|---|---|
| post `h1` | JetBrains Mono 2.75rem, three lines, the whole fold | Geist 600, `clamp(1.9rem, 4vw, 2.6rem)`, two lines |
| post body | 1.05rem / 1.85 / `--color-text-secondary` / 680px | 1.125rem / 1.7 / `--color-text-primary` / 31em |
| post `h2` | mono 1.3rem with a teal `// ` prefix | Geist 600 1.4rem, no prefix |
| `/devlog` `h1` | mono 700, literal text `// Devlog` | Geist 600, `Devlog`, `call.astro`'s clamp |
| `/devlog` RSS link | a second `.sub`, at lede weight | mono 0.78rem muted, the register's meta size |
| tag chips (both) | square | 6px, the radius every other control on the direction uses |
| hero-to-body gap | ~155px with a rule floating in it | ~113px |

The lattice on `/devlog`'s head band **stays**. It looked like dark-era decoration and is not:
`call.astro:193` runs the same two gradients, so it is the register's head band on every secondary
page.

### Measured, not asserted

- **Body 16.17 contrast** against the page, up from 5.86. It was set to
  `--color-text-secondary`, a supporting-text role, on the surface where the text *is* the page.
- **~68 characters per line** (67 / 70 / 67 / 68 across the four published posts), from 86.
- **`::selection` was a live defect nobody had counted.** `global.css` set the selected-text
  colour to `#0D0D0D`, a near-black from the dark page, on the teal accent fill: **3.37**, below
  AA. Now `--color-bg`, **5.53**. The census above put `global.css` in a "Mixed" row and moved on;
  an aggregate row is exactly where a live literal hides, because the row is a claim about the
  file and the defect is in one declaration.
- **CSS the reader downloads: 26,886 → 24,782 bytes.** The 12 dead rules were not free. Vite
  bundles `global.css` into the blog-post chunk, so `.filter-btn`, `.project-card`,
  `.contact-input` and the rest shipped **on the reading surface and nowhere else**, carrying 13
  of the 14 retired dark-brand literals still reaching a browser. Every one was confirmed dead by
  a per-class grep over `src/`, not inherited from the map's row.
- **Zero retired literals left in any built CSS or HTML.** What remains in `dist/` is the six
  draft-post diagram SVGs (consequence 2 defers them, and no built page references them) and
  `#1f1f1f` in `.lb-btn`, the deploylog lightbox button — a deliberately dark surface on a
  different page, but a hex literal rather than `--color-backdrop`. Recorded for
  [ticket 10](10-close-out.md); not fixed here.

### Four things the checks caught that reading the CSS would not have

1. **`font-sans` on the h1 rendered mono.** Tailwind v4 puts its utilities in `@layer utilities`,
   and `global.css`'s unlayered `h1, h2, h3 { font-family: var(--font-mono) }` beats any layered
   rule regardless of specificity. The class was in the markup and the page was unchanged. Fixed
   inline; `index.astro` and `call.astro` sidestep it by writing the family in a scoped `<style>`,
   which is also unlayered.
2. **`68ch` never bound anything.** Copied from `index.astro`'s reading column, it resolves to
   810px in Geist at 18px — the `0` advance is 11.92px against a 7.95px average character advance
   — so it never reached the 720px container and the measure stayed 86 characters. **The home
   page's own `68ch` is decoration for the same reason**; its columns are bounded by the grid, so
   nothing is visibly wrong there and it was left alone. Follow-up for ticket 10.
3. **Narrowing the column clipped the code block.** At 558px the one published `pre` cut its own
   lines against its border. The measure is for sentences: `pre` and `img` now break back out to
   the 720px container, capped by the viewport on a phone. Caught in a screenshot after the
   change, then pinned with a check that reports `scrollWidth > clientWidth` per `pre` and
   `scrollWidth - clientWidth` on the document, run over all four posts at both sizes.
4. **The image breakout silently lost on source order**, leaving every chart at 558px while the
   rule looked correct. Same width check caught it.

Two instrumentation notes, both the shape of a probe that cannot fail. The screenshot script first
forced `opacity: 1` on everything to freeze entrance animations, which **revealed the hover-only
copy button** — a resting state no reader sees; it is now scoped to `.reveal`. And the copy-button
hover assertion first read `opacity: 0` and looked like a real failure: it was reading mid-
transition. Waiting for the value instead of sampling it turns it green.

### One deletion that would have taken a working thing with it

`BlogPost.astro` carried a second `.copy-btn` / `.pre-wrap` block disagreeing with `global.css` on
background, radius and hover-reveal — and **it won**, because Astro inlines a layout's `is:global`
styles *after* the linked bundle. So the reading surface was running a dark-era copy of a rule
ticket 03 had already audited. Deleting it is right, but its one real contribution was that the
copy button had no `opacity: 0`, which is the only reason it was reachable **on a phone**. That
moved to `global.css` as a `@media (hover: none)` rule, which covers the project page too. Checked
in a touch context: opacity 1 at rest on mobile, 0-then-1 on hover at 1440.

### Acceptance — status

- **A post renders in the winning register, light.** Met, on all four published posts, from a
  build.
- **The reading measure is deliberate rather than inherited.** Met, and it is the one item that
  needed two attempts to actually be true — see finding 2 above. 31em, measured at 67-70
  characters per line.
- **`verify/gate.mjs` passes.** Still cannot, per tension 6. Not run, not cited.
- ~~**Open: Marko's eyeball gate.**~~ **Passed 2026-08-15**, on the post-review screens
  (`.qa-reports/ticket-09-devlog/fix-*.png`), which are the ones that matter: the `before-`/`after-`
  pairs were captured before the review pass and no longer show what ships. The two questions put
  to the gate were the flush-left column and the narrowed lede; both stand.

## Reviewed 2026-08-15 — `/review-diff`, two axes plus a seam pass

Every blocking finding was verified against the artifact before being acted on, and each fix was
re-verified from a fresh build rather than from the edit.

**Three blocking, all fixed.**

1. **The diff added a new `verify/gate.mjs` failure.** `BlogPost.astro`'s h1 comment carried an em
   dash on a *wrapped* line, and check 5's comment skip only matches a comment's first line.
   Calibrated against a known negative: the same algorithm returns 0 hits on `origin/main`'s copy of
   the file and 1 on the branch's, so this was new, not inherited from tension 6's 15. Reworded.
2. **The same comment then blinded the check.** It spelled out a `style` open tag in prose;
   check 5 flips its skip state on any line matching one, and nothing flips it back, so lines
   320-461 were unlinted. Rephrased without the tag. Re-run flips are now
   `ON@59 → OFF@323 → ON@431 → OFF@517`, so the 100 lines that were dark are linted again.
   **Both defects are the gate's, not this file's** — see the new ticket-10 rows.
3. **The `@media (hover: none)` rule rested on a false premise.** The claim was that the deleted
   `BlogPost.astro` `.copy-btn` block was the only thing making the button reachable on touch.
   Measured on `origin/main`: that block declares **no `opacity` at all**, so `global.css`'s
   `opacity: 0` applied there too and the button was hover-only on touch before the change. The
   rule was not restoring anything, and because it lives in `global.css` it also unhid the button
   on `/projects/deploylog/`, where at 390px it sits on the first line of the code block. Reverted.
4. **The reduced-motion cancel the diff added was inert.** `.copy-btn` was appended to the
   `@media (prefers-reduced-motion: reduce)` list at the top of `global.css`, but its own rule is
   declared later at the same specificity and a media query adds none. Every selector in the old
   list was declared *earlier*, which is why they worked. Moved to sit directly under the
   `.copy-btn` rule; confirmed from built byte offsets (base rule 18857, cancel 19293).

**Worth-fixing, all applied.**

- `section h2::before` still injected `// ` into `devlog/index.astro`'s visually-hidden
  `<h2 class="sr-only">Posts</h2>` — the last `// ` of the retired register, on the one surface
  where only a screen-reader user meets it. Now `section h2:not(.sr-only)::before`.
- `--color-accent-veil` was orphaned by this diff (both consumers deleted). Removed.
- **The lede was the last prose still on the inherited container**: 87 characters over three lines
  directly above a body column set to 70. Given `max-width: 31em`, which at its own 16.8px is
  521px and lands at the same 70.
- **`.prose` is flush left on purpose and that is now written down.** The column sits at 558px in a
  720px container, so the page carries two right edges. It is also load-bearing: the breakout rule
  depends on it, because a centred `.prose` would overflow to the right only. **This is the open
  question for the eyeball gate**, not a defect.
- `calc(100vw - 3rem)` is not the container width — `vw` counts the scrollbar, so the media ran 6px
  wider than its own gutters on any desktop window under ~774px, and wider in Firefox, which
  ignores the 6px `::-webkit-scrollbar`. Replaced with `100cqi` against a new `.reading-container`,
  which measures the real layout box and hardcodes no width; the literal pair is kept underneath as
  the fallback and survives minification (verified in the built HTML).
- The two duplicated 720px rules are one rule, and `figcaption` joined it: it centres itself, and
  centring inside the 558px column would put a caption 81px left of the image it labels. No post
  emits a `figure` yet, so this ships before the first one, same reasoning as `h3`.
- **The head band was not "copied value-for-value" from `call.astro`.** `call.astro` wraps in
  `<main class="page">`, this page wrapped in `<main class="pt-14">`, so the same `8rem` cleared the
  56px fixed nav twice: 128px above the h1 against call's 72px. And the mobile override
  (`padding-block: 6.5rem 2.5rem` under 720px) was never copied, so a phone kept the full desktop
  band. Both fixed; the comment now says what actually differed.
- The RSS link was a 22x17px hit area with no underline and no transition (both lost when it
  stopped being a Tailwind class). Padded to ~41px, underlined, transition restored, and the
  margin above reduced by the padding so the optical gap is unchanged.
- `.tag-btn` had no reduced-motion cancel: `global.css` used to cancel `.filter-btn`, the control it
  replaced, and that selector was deleted with the rest of the dead CSS. Added in the page's own
  scoped style, because a global rule would lose to the scoped one on specificity.
- Two hardcoded `'Geist', system-ui, sans-serif` stacks now read `var(--font-sans)`.
- The `global.css` tombstone no longer lists the deleted class names: it was the only place in
  `src/` those strings still appeared, so the next "is this used?" grep would have found it and read
  as a hit. The durable half (why the deletion mattered) is kept.
- Four numbers in this file and in `map.md` were wrong and are corrected above: 27 inline `code` not
  28, 26,886 bytes before not 26,882, `index.astro:431` not `:113`, `call.astro:181` not
  `index.astro:141`. The two line numbers were the ones ticket 10 inherits as breadcrumbs.

**Verified after the fixes, from a build:** `npm run build` exit 0; check 5 PASSes on all four
authored templates; `hover:none` absent from both the bundled CSS and the built post HTML;
`container-type:inline-size` and two `100cqi` present in the post HTML; `accent-veil` absent from
all built CSS; `sr-only):before` present.

**Not fixed here, on purpose:** the CSS deletion was re-verified safe three independent ways (a
`command grep` for all 16 identifiers over `src/` and `public/` returns only this page's own scoped
`.post-row.filtered-out`; `SiteNav.astro` ships no mobile nav at all, so `#mobile-nav` could not
have broken anything; and full-page screenshots of `/`, `/call/`, `/404` and `/projects/deploylog/`
are byte-identical between the two builds). Nothing was changed on that finding.

## Left for ticket 10, recorded so it is not rediscovered

- **`index.astro:431`'s `max-width: 68ch` does not constrain anything** (finding 2). Harmless
  where it is; wrong if anyone copies it. (Cited as `:113` until the review pass above; `:113` is
  the `pageDescription` string.)
- **`.lb-btn`'s `#1f1f1f`** in `global.css` — the last hex literal in a shipping stylesheet.
  Deliberately dark, but it should be `--color-backdrop`.
- **The six draft-post diagram SVGs still hold `#5FCEDB` and one `#0B0E15`.** Unchanged by design
  (consequence 2); they belong to the November drain.

Added by the 2026-08-15 review pass:

- **`verify/gate.mjs` check 5 has two defects, and they are why it caught one dash and nothing
  else.** Its comment skip is `/^\s*(\/\/|\/?\*|<!--)/`, which only matches a comment's **first**
  line, so every wrapped line of a block comment is linted as reader-facing copy. And it flips
  `inCode` on any line matching `/<(pre|script|style)[\s>]/` — prose included — with no close tag
  to flip it back. The second one is not hypothetical anywhere: **`index.astro` flips at `:139` and
  never flips back until `:776`, so the home page's copy has never been linted at all.** Fixing the
  gate was deliberately left out of this ticket: it is the check that judges this diff, and the
  same pass should not both fail it and rewrite it. Re-baselining owns it.
- **`verify/baseline/main-sha.txt` is `2bc6308` while `main` is `78fd2e1`**, so check 6 fails by
  construction and the gate's verdict currently carries no information. Pre-existing; it is the
  first thing the re-baseline has to move.
- **The copy button is hover-only on touch and invisible to keyboard focus.** Both are site-wide
  and pre-existing (`opacity: 0` at rest, no `:focus-visible` reveal, so the 2px outline paints at
  zero opacity), and both were measured on `main` during the review. A `(hover: none)` rule fixes
  half of it in one line, but it changes `/projects/deploylog/` too and puts the button over the
  first line of code at 390px, so it wants a real decision and a screenshot, not a revert of a
  revert.
- **The seven raw-px font sizes in `devlog/index.astro`** (`.post-title` 17px, `.empty` 14px and
  five more). One was converted by this ticket and the rest were not, which is what made the
  comment beside it false.
