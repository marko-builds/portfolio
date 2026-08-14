# Delete the two live game project pages and their screenshots

**Type:** task
**Status:** open
**Blocked by:** None
**Estimate:** 0.25 session

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
