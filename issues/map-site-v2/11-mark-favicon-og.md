# The mark: a new favicon and logo, and the OG card

**Type:** decision, then task
**Status:** open — **awaiting a conversation with Marko, not a build**
**Blocked by:** None
**Estimate:** unscoped until the direction is decided

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

## Sequencing

Off the critical path. [Ticket 10](10-close-out.md)'s cascade should not claim the surfaces are
consistent while this is open, so 10 either waits for it or records it as knowingly outstanding.
