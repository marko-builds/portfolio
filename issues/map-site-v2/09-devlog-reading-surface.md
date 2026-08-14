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

- A post renders in the winning register in both palettes.
- The reading measure is deliberate rather than inherited.
- `verify/gate.mjs` passes.
