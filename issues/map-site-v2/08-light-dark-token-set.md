# Light/dark token set, toggle, favicon and OG card

**Type:** task
**Status:** open
**Blocked by:** [02](02-register-ia-prototype.md), [06](06-delete-game-project-pages.md)
**Estimate:** 1 session

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
