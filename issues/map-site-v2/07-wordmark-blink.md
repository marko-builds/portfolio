# Wordmark: drop the blink across every surface

**Type:** task
**Status:** open
**Blocked by:** None
**Estimate:** 0.1 session

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
