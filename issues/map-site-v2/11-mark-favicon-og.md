# The mark: a new favicon and logo

**Type:** ~~decision, then~~ task — **the decision is made**
**Status:** open — **direction named 2026-08-15, ready to build**
**Blocked by:** None
**Estimate:** 0.5 session (was unscoped; the direction is what made it scopeable)

## The direction, named 2026-08-15 by Marko: the chevron alone

**The mark becomes the `>` chevron and nothing else.** Teal `#14707C` on paper `#FBFAF7`. The
aurora band, the seven rays and the amber sun all come out.

Three reasons, in the order they carried the decision:

1. **The current tile does three jobs at a size that fits one.** A chevron, an aurora band and a
   sun in one 512 viewBox. At 16px the rays are `8/512` wide, a quarter of a pixel, and the 4px
   border and the sun's radial gradient mush together. Whatever the art, a favicon gets one shape.
2. **The one-shape mark already exists and is already his.** `SiteNav.astro`'s wordmark is
   `> ms`, and [ticket 07](07-wordmark-blink.md) settled that the mark stays. Making the tab icon
   the same glyph means the wordmark, the favicon and the social card finally agree. **Nothing on
   the site currently does.**
3. **The lineage argument is answered rather than overruled.** The aurora's duskpaper provenance is
   real, and it is not lost: it renders in duskpaper's own repo, its six preview GIFs, and every
   studio render, all of which stay dark. It was never legible in the favicon anyway.

### What this settles for free

The size defect this ticket was carrying stops being a task. A single stroked chevron scales from
512 to 16 without a dedicated small cut, because there is nothing in it to lose. Draw it once, at
a stroke weight that holds at 16px, and export the set.

### Not reopened

`> ms` in `SiteNav.astro` stays exactly as [ticket 07](07-wordmark-blink.md) left it: mark kept,
blink gone. This ticket changes what the *icon* is, not what the wordmark is.

## The OG card left this ticket

Split to [ticket 11a](11a-og-card-copy-fix.md) on 2026-08-15, and it is the urgent half. The card
is emitting the retired positioning ("Developer", "I build software products and ship them") to
every recruiter the site link is sent to, and no grep could have found it because the words are
pixels. Marko's call: fix that now, independent of the mark.

## What to produce

The set `BaseLayout.astro:59-63` already wires, redrawn on the chevron:

- `favicon.svg` — the source. One stroked chevron, `--color-accent` teal on `--color-bg` paper.
- `favicon.ico`, `favicon-96x96.png`, `apple-touch-icon.png` (180px)
- `web-app-manifest-192x192.png`, `-512x512.png`
- `logo.svg` — currently byte-identical to `favicon.svg`. Decide whether it stays a copy or becomes
  a wordmark lockup (`> ms`); it is referenced nowhere in `src/`, so it is free to change.

`site.webmanifest` carries theme colours that were written for the dark tile. Check them against
the light palette in the same pass.

## Acceptance

- The favicon is legible at **16px in a real browser tab**, checked by looking at a tab, not by
  scaling the SVG in an editor.
- The set is regenerated from one source, so no two sizes carry different art.
- `site.webmanifest`'s colours match the shipped palette.
- The chevron in the tab and the chevron in `> ms` read as the same mark side by side.

## Sequencing

Off the critical path, and [ticket 10](10-close-out.md)'s cascade should not claim the surfaces are
consistent while this or [11a](11a-og-card-copy-fix.md) is open. **11a is the one that actually
gates 10** — a stale favicon is cosmetic, a stale positioning card is not.

## Why this exists

Carved out of [ticket 08](08-light-dark-token-set.md) on 2026-08-15. That ticket framed the
favicon and the OG card as two dark artifacts a palette flip does not reach, and offered a binary:
recolour them light, or record that they intentionally stay dark.

Marko chose neither. He wants to **discuss a new favicon and logo for the site**. That makes this
a design question rather than a token question, and 08 had no business holding it.

## What is actually there today

- **The favicon set** is a dark aurora tile, wired in `BaseLayout.astro:59-63` as
  `favicon.ico`, `favicon.svg`, `favicon-96x96.png`, `apple-touch-icon.png`, plus
  `web-app-manifest-192x192.png` / `-512x512.png` and `site.webmanifest`.
- **A known size defect, from `map-public-proof/15`:** seven rays at `width="8"` inside a 512
  viewBox render under 0.3px at 16px, and the 4px border plus the sun's radial gradient mush
  together at tab size. Whatever direction wins, a dedicated 16-32px variant is part of it.
- **The OG card** is `public/og-default.png`, a fixed dark image, referenced at
  `BaseLayout.astro:21` as the fallback for every page with no explicit `ogImage`.
- **The wordmark** is `> ms` in `SiteNav.astro`, which [ticket 07](07-wordmark-blink.md) settled:
  the mark stays, the blink is gone. **That decision is not reopened by this ticket** unless the
  conversation deliberately reopens it.

## Live provenance worth knowing before deciding

The aurora in the current icon set is sampled from the **duskpaper** engine, which is a real
public artifact of Marko's. That is genuine provenance, and it is the argument for keeping the
mark's lineage rather than drawing something new. The argument against is that the site is now
light and the tile is not.

## What this ticket must NOT do

Decide the direction inside a build ticket. The previous shape of this work was a checkbox in a
token pass; it is a brand decision and it gets a conversation first. Ship nothing until the
direction is named.

**Satisfied 2026-08-15.** The conversation happened, the direction is named at the top of this
file, and the build can start. Left as written because it is the reason this ticket existed
separately from [ticket 08](08-light-dark-token-set.md) at all.

The two sections above are the pre-decision record and are kept unedited. Two of their claims are
now superseded by the decision: the OG card moved to [11a](11a-og-card-copy-fix.md), and the
"dedicated 16-32px variant" is no longer needed because a single chevron does not lose anything at
16px.
