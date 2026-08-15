# Light/dark token set, toggle, favicon and OG card

**Type:** task
**Status:** resolved 2026-08-15 — **light only**; the mark is carved out to
[ticket 11](11-mark-favicon-og.md)
**Blocked by:** ~~02, 06~~ both resolved 2026-08-15
**Estimate:** 1 session

## Resolution 2026-08-15

**Light only. No dark set, no toggle.** Marko's call: one palette, one surface to maintain,
nothing to persist and no flash of the wrong theme to guard against. The title of this ticket is
now wrong and is left as written so the change of scope is visible.

### The palette, and why these exact values

The prototype's screen-A values were measured before shipping, and **two of them failed WCAG AA
body contrast**: `text-muted` at 3.29 and `warm` at 3.78 against the page background. Both carry
small meta text — dates, labels, badges — which is exactly where a 3.3 ratio hurts. Darkened to
`#6B7480` and `#9C6031`. Every text role now clears 4.5 against **both** `--color-bg` and
`--color-surface`:

| role | on bg | on surface |
|---|---|---|
| text-primary | 16.17 | 16.88 |
| text-secondary | 5.87 | 6.13 |
| text-muted | 4.54 | 4.74 |
| accent | 5.53 | 5.77 |
| warm | 4.87 | 5.08 |

### Every literal is gone from the shipping surfaces

`command grep -rnE '#[0-9a-fA-F]{3,8}' src --include='*.astro'` returns **zero** outside
`Avatar.astro`, whose 28 are pixel-art palette entries and deliberately fixed. 135 occurrences
resolved to 16 distinct values, mapped by usage rather than by find-and-replace: the same
`#1F1F1F` was a border in one place and a raised surface in another.

### Three things the ticket's own measurement could not see

1. **The 645-literal count was blind to Tailwind palette classes.** `deploylog.astro` carried
   `bg-cyan-400`, `text-cyan-300` and `border-cyan-400`, which are colours with no `#` in them.
   Tailwind's cyan-400 is `#00d2ef` — **not** the brand accent — so two pairs of sibling elements
   that were meant to match (the two hero badges, the two CTA buttons) had silently been two
   different cyans since they were written. Now both sides use `--color-accent`. Any future count
   of "how many hardcoded colours" must include the palette classes or it will understate.
2. **An assumption about Tailwind cost a detour, and the build refuted it.** Two throwaway tokens
   were added on the belief that `border-[var(--x)]/50` does not compose. It does: Tailwind v4
   emits `color-mix(in oklab, var(--x) 50%, transparent)` behind an `@supports`, with a solid
   fallback. Verified in the built CSS, tokens removed, modifier form restored. Recorded because
   the wrong version was briefly written into `global.css` as a comment stating the opposite.
3. **The accent's alpha steps failed AA once the background flipped.** `text-[…]/55` and `/75`
   were tuned for a bright cyan on near-black; on light they measure 2.35 and 3.40. Both were
   CTA labels. Raised to full opacity. The decorative background and border alphas were kept —
   they are not text.

### One hero fix that a token swap alone got wrong

`#1f1f1f80` was a 50%-alpha near-black graph-paper lattice that read as a whisper on the dark
page. Mapping it to a solid token turned it into a tan cage over the whole hero. It now has its
own low-alpha token, `--color-grid`. Same class of error as the two above: **an alpha value
carries design intent that its opaque twin does not.**

### Deliberately not done here

- **The favicon and the OG card.** Marko wants to discuss a new mark for the site rather than
  recolour the existing one, so this is no longer a token flip. Carved out to
  [ticket 11](11-mark-favicon-og.md). Both remain dark, which is defensible, but it is now an
  open decision rather than a settled one.
- **Acceptance item 4, `verify/gate.mjs` token check, is unachievable as written** and was not
  chased. That check asserts the CSS vars *equal* `brand.json`'s colours, while the map's decision
  4 says the site diverges from `brand.json`. The two cannot both hold. Re-scoping it belongs to
  [ticket 10](10-close-out.md) with the rest of the gate's re-baseline.

## Question

If light wins ticket 02, the site needs a second palette and a toggle. This ticket also owns the two
fixed dark artifacts that a palette flip does **not** reach on its own, which the red-team caught.

## The token work

`src/styles/global.css:10-21` holds the current tokens as hand-copied hex literals. Add a light set
and a toggle that respects `prefers-color-scheme` with an explicit override.

**Measured cost, 2026-08-14.** 645 hardcoded hex literals live in `.astro` files, but the
distribution matters:

| File | Count |
|---|---|
| `src/pages/projects/_endless-runner.astro` | 220 |
| `src/pages/projects/hide-and-seek.astro` | 214 |
| `src/pages/projects/deploylog.astro` | 79 |
| `src/pages/projects/tictactoe.astro` | 77 |
| `src/layouts/BlogPost.astro` | 44 |
| `src/components/Avatar.astro` | 27 |
| `src/pages/devlog/index.astro` | 4 |
| `src/pages/index.astro` | 3 |
| `src/pages/404.astro` | 3 |
| `src/components/SiteNav.astro` | 1 |

**511 of those disappear with [ticket 06](06-delete-game-project-pages.md)**, which is why 06 blocks
this. What remains is `BlogPost.astro` (44) plus deploylog's page (79) plus about a dozen elsewhere.
`Avatar.astro`'s 27 are pixel-art palette entries and are deliberately fixed.

Two known off-token literals in `index.astro`: the hero grid uses `#1f1f1f80` (`:215-216`) and
`.btn-fill:hover` uses `#cfcfcf` (`:254`). Both break in light.

## The two artifacts a token flip does not reach

1. **The favicon set.** `BaseLayout.astro:59-63` hardcodes a dark aurora tile
   (`favicon.ico/svg/png`, `apple-touch-icon`). On a light-default site the browser tab keeps a dark
   tile. **Also fix the size defect ticket 15 identified**: seven rays at `width="8"` in a 512
   viewBox render under 0.3px at 16px, and the 4px border plus the sun's radial gradient mush at
   that size. Ship a dedicated 16-32px variant.
2. **The OG / social card.** `BaseLayout.astro:21` falls back to `public/og-default.png`, a fixed
   dark image. Every link preview stays dark regardless of the site's default.

Neither is fatal — a dark favicon on a light site is a common and defensible choice — but both must
be **decided** rather than discovered after launch.

## The brand policy, settled

**If light wins, the site diverges from `brands/marko/brand.json`.** Renders stay dark. No light
variant is added to the brand file; the studio has no consumer for one. Nothing couples them
technically (verified 2026-08-14), so this is a choice and it is recorded as one.

## Acceptance

- Both palettes render every in-scope surface with no off-token literal left on the core pages.
- The toggle persists across navigation and respects `prefers-color-scheme` on first visit.
- Favicon and OG card are either updated or explicitly recorded as intentionally staying dark.
- `verify/gate.mjs` token check passes.
