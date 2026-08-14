# Register + IA prototype: two screens, light versus the dark control

**Type:** prototype
**Status:** open
**Blocked by:** None
**Estimate:** 1 session

## Question

Two questions get answered by one throwaway build, on the live route, with `/prototype`:

1. **Does the page read as approachable to someone who is not a terminal person?** This is the
   question Marko opened with on 2026-08-08 and again on 2026-08-14.
2. **Does light beat dark for this site?**

## What gets built

**Two screens, not four** (trimmed 2026-08-14 on the red-team's finding that two full directions in
both palettes re-litigates a call this map treats as settled):

- **Screen A — the new IA in light.** The full new structure, light palette.
- **Screen B — the dark control.** The same new structure, today's dark tokens.

Both screens carry the **new information architecture**, not today's structure. A light page with a
persistent identity rail is a different layout, so judging paint on the old structure answers the
wrong question. The IA under test:

- a persistent identity rail: photo, name, role, location, email / GitHub / LinkedIn / **CV**
- a proof band leading the page, products demoted beneath it
- experience timeline records
- the devlog rows

## What the screens vary beyond palette

From `map-public-proof/15-register-prototype.md`, inherited:

- **Type scale and measure.** Body size, line height, column width. The highest-leverage warmth
  lever and it costs nothing.
- **Whitespace density.** Section rhythm.
- **How much mono survives.** One mono detail as an accent, versus mono as the page's voice.
- **The proof cards' visual weight** against the demoted product cards.

## Gate

Present at **true device scale with the exact params attached**, and hold the commit gate until
Marko picks. He reviews visual work frame by frame (memory `video-review-bar`). This ticket ends at
a **locked direction**, not a shipped page.

## Acceptance

- Two screens rendered, presented at device scale, params attached.
- Marko picks one, and the pick is written into this ticket with the date.
- If light wins, [ticket 08](08-light-dark-token-set.md) becomes a blocker of
  [ticket 03](03-home-page-rebuild.md).

## Notes

Do not let this grow into the rebuild it was scoped away from. If the winning direction's build
runs past its estimate in [ticket 03](03-home-page-rebuild.md), that overrun is named in the map,
not absorbed silently.
