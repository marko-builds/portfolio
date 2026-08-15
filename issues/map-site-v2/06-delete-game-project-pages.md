# Delete the two live game project pages and their screenshots

**Type:** task
**Status:** resolved 2026-08-15
**Blocked by:** None
**Estimate:** 0.25 session

## Resolution 2026-08-15

Every claim in this ticket was re-verified before anything was deleted, and all of them held
exactly: 214 / 77 / 220 hex literals (511 total), 12 screenshots, 2 thumbnail videos, and every
reference to the deleted assets contained inside the three deleted files.

Deleted: the three `.astro` files, the 11 game screenshots (`deploylog-1.png` stays), and
`public/assets/thumbnails/`, which held only the two videos and is now gone.

**Acceptance, verified after the fact rather than predicted.** Build green, 8 pages. Astro's image
pipeline dropped from 39 optimized entries to 6, all `deploylog-1` variants, which is independent
confirmation that nothing else consumed those assets. `dist/` no longer emits
`/projects/hide-and-seek/` or `/projects/tictactoe/`, and the sitemap does not list them.

**The repo-wide sweep found seven hits and none of them is a reference to a deleted page.** Five
are links between devlog posts (`/blog/object-pooling-endless-runner`, `/blog/relic-rush-pivot`),
one is an external itch.io URL, one is a tag string. Recorded because a future sweep will surface
them again and they look alarming until classified.

**All five of those link targets are `draft: true`** — verified, not assumed. So the withheld
drafts link to other withheld drafts, which is internally consistent and ships nothing broken.
See the correction in the map's tension 5: the `/blog` redirects fix the *prefix*, but the deeper
reason those links are harmless is that neither end of them is published.

**Gate delta:** `verify/gate.mjs` went from 7 failures to 6. The `_endless-runner.astro`
copy-lint failure disappeared with the file, and route parity gained the two deleted routes under
`missing=[]` against its July baseline. No new failure class. The gate was already structurally
red; see [ticket 07](07-wordmark-blink.md) and the map's tension 6.

## Question

The game project pages are built, carry twelve screenshots between them, and are reachable from
nowhere. Under an AI-engineering-only public face they are not coming back, so they go.

## What is actually there — corrected 2026-08-14

**Two live routes, not three.**

| File | Routed? | Hex literals |
|---|---|---|
| `src/pages/projects/hide-and-seek.astro` | yes | 214 |
| `src/pages/projects/tictactoe.astro` | yes | 77 |
| `src/pages/projects/_endless-runner.astro` | **no** — underscore prefix, Astro never routes it | 220 |

The underscore-prefixed file was never a live page. Delete it too; it is dead weight and it is 220
of the site's hardcoded hex literals, which matters to [ticket 08](08-light-dark-token-set.md).

**Nothing links to any of them.** Verified 2026-08-14 with `command grep -rn` over `src/` and
`public/`, excluding the pages themselves: zero inbound references. Deletion breaks no internal
link.

`src/pages/projects/deploylog.astro` **stays** — it is the one product with a narrative worth
controlling before Sep 15.

## Scope

- Delete the three files above.
- Delete the 11 game screenshots in `src/assets/screenshots/` (everything except
  `deploylog-1.png`), and the two thumbnail videos in `public/assets/thumbnails/`.
- Confirm `verify/gate.mjs` still passes and the build has no dangling imports.
- The two routes were live from 2026-07-03, so search engines may hold them. The existing
  `src/pages/404.astro` is the answer; no redirects.

## Ordering

Do this **before** [ticket 08](08-light-dark-token-set.md), or 08 tokenizes 511 hex literals across
pages that are about to be deleted.

## The tension, recorded

`RelicRush` is a live lane and new game posts are planned from November on an AI angle
(`publishing-schedule.md:74`). Deleting these pages is not a statement that games are gone; it is a
statement that they do not get their own public surface under this face. If they return it is in a
different form, and that is a fresh decision, not a silent restore.

## Acceptance

- The three files and twelve assets are gone, the build passes, no dangling imports.
- A repo-wide grep for the deleted route paths comes back clean outside of git history.
