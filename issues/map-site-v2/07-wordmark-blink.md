# Wordmark: drop the blink across every surface

**Type:** task
**Status:** resolved 2026-08-15
**Blocked by:** None
**Estimate:** 0.1 session

## Resolution 2026-08-15

Four deletions, no replacements:

- `src/components/SiteNav.astro:19` — the `<span class="cursor-blink">` element.
- `src/styles/global.css:64-75` — the `.cursor-blink::after` rule **and** `@keyframes blink`,
  which had no other consumer.
- `src/styles/global.css:351-355` — the reduced-motion override, now dead.
- `src/pages/index.astro:431` — the `:global(.cursor-blink::after)` reduced-motion override, the
  orphan this ticket predicted.

**Acceptance, verified against the built artifact rather than the source.** `grep -rn cursor-blink
src/` and `grep -rn "animation: blink\|@keyframes blink" src/` both return zero; `dist/` contains
neither `cursor-blink` nor `@keyframes blink`; the mark renders as
`<span class="chev">&gt;</span> ms` with nothing after it.

**The mark ships on 10 pages, not six.** The ticket's count predates the four current devlog
posts, each of which renders the nav. The other six `dist/` HTML files are the `/blog/*` and
`/cv` redirect stubs, which carry no nav by design.

## `verify/gate.mjs` is structurally red, and it is not this change

The gate fails 7 checks. **Calibrated 2026-08-15 by stashing this ticket's `src/` changes,
rebuilding, and re-running: the failure set is byte-identical with and without them.** It was
already red at `349da1e`.

Every failure is expected drift against a baseline captured 2026-07-03 at main `2bc6308`:

- **route parity / 3 missing bodies** — the three Unity posts went `draft: true` on 2026-08-09,
  and four new posts plus the `/cv` redirect have shipped since.
- **copy lint** — `BaseLayout.astro:38` and `_endless-runner.astro` (11 lines). Neither file is
  touched by this ticket; `_endless-runner.astro` is underscore-prefixed and never built.
- **main untouched** — asserts main still sits at the July anchor. It has moved 40+ commits.

So the gate cannot pass, which means it cannot gate anything in this map. A check that always
fires is worth what a check that cannot fire is worth. **Re-baselining it belongs to
[ticket 10](10-close-out.md)** before it is cited as a green signal for 03, 08 or 09.

## Question

`src/components/SiteNav.astro:19` renders `<span class="chev">&gt;</span> ms` with a blinking
cursor. The nav ships on the home page, the devlog index, `BlogPost.astro`, the project pages and
the 404.

**The mark stays. The blink goes.** Settled 2026-08-14.

The reasoning, inherited from `map-public-proof/15-register-prototype.md`: the chevron at small
size reads as forward motion rather than a terminal prompt, and the mark has real provenance (the
aurora in the favicon set is sampled from the duskpaper engine, itself a live public artifact).
What actually reads as "terminal person" is the **animated cursor**, and removing it is one CSS
deletion.

This closes the other half of a decision that was already half-executed: the hero's REPL line
`> MarkoStankovic(Developer);` was deleted in the pre-interview sprint. Ticket 15 warned that
removing one instance of the motif and leaving six is worse than leaving all seven.

## Scope

- Remove the `.cursor-blink` animation and its element from `SiteNav.astro`.
- **Grep the family, not the file.** `index.astro:431` has a
  `:global(.cursor-blink::after)` reduced-motion rule that becomes dead. Search the whole `src/`
  tree for `cursor-blink` and remove every orphan.

## Acceptance

- `command grep -rn "cursor-blink" src/` returns nothing.
- The mark still renders on all six surfaces.

## Not in this ticket

The **favicon** simplification (seven rays at `width="8"` in a 512 viewBox render under 0.3px at
16px; ticket 15 called it "the one genuine defect in the mark") belongs to
[ticket 08](08-light-dark-token-set.md), where the palette work already touches the icon set.
