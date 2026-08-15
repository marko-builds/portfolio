# Devlog reading surface pass

**Type:** task
**Status:** open
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
