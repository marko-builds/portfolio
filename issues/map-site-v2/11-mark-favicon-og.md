# The mark: a new favicon and logo

**Type:** ~~decision, then~~ task — **the decision is made**
**Status:** built 2026-08-15 — **one Marko-only step left**: look at a real browser tab
(`npm run preview`, http://localhost:4321) and sign off acceptance 1
**Blocked by:** None
**Estimate:** 0.5 session (was unscoped; the direction is what made it scopeable)

## What shipped, 2026-08-15

`public/favicon.svg` is now the single source and `scripts/render-icons.sh` regenerates every
raster from it. Six files changed plus the manifest; the chevron path exists in exactly one place.

**The geometry was measured, not eyeballed.** The first draft was traced off JetBrainsMono Nerd
Font **Bold**, which is not what the site loads, and side by side at 32px it read as a heavier
cousin of the wordmark rather than the same mark — acceptance 4 failing. Real JetBrains Mono 600
(what `SiteNav.astro` renders) draws `>` with an ink box of 178x218: aspect 0.8165, stroke/height
0.156. The shipped drawing is 268x328 = 0.817, stroke 52/328 = 0.159.

**The stroke weight was a bake-off, not a guess.** The assumption was that a wordmark-weight stroke
would be too thin to survive 16px, which is why the first draft inflated it to 68. Rendering 52 /
60 / 68 at 16px side by side refuted that — they are near-indistinguishable at tab size. So the
weight could be matched to the wordmark instead of traded against it, and both acceptance 1 and
acceptance 4 are satisfied rather than one bought with the other.

**What actually caps the size:** the Android maskable safe circle (radius 204.8). The far arm-end
cap sits at radius 201.2. The chevron cannot grow further without being cropped on Android, and
that bound — not the tile — is why it fills 64% of the viewBox rather than more. Verified by
compositing the safe circle over the 512 render, not computed and trusted.

### Corner radius is the one per-platform divergence, and it is a requirement not a second drawing

- **rounded** (`rx=112`, as authored) → `favicon.svg`, `favicon.ico`, `favicon-96x96.png`
- **square, opaque** (`rx=0`) → `apple-touch-icon.png`, both manifest PNGs. iOS composites the
  Apple icon on black, so transparent corners ship as black corners; Android maskable crops the
  tile and requires full bleed. Verified opaque: corner pixel is `srgb(251,250,247)` on all three.

### `logo.svg`: decided

It was byte-identical to `favicon.svg` and referenced nowhere in `src/`. It is now **the chevron
with no tile behind it** — the mark for surfaces that bring their own background. A wordmark
lockup was rejected: `> ms` renders as live text in `SiteNav.astro` and has no consumer that needs
it as a vector, so drawing one would be speculative. Deleting it was rejected too — the file is
free, and a mark-on-transparent is the one variant a set like this actually gets asked for.

The script rewrites `logo.svg`'s comment header rather than inheriting `favicon.svg`'s, which
claims "THIS FILE IS THE SOURCE". A copied claim outlives its truth.

### The script's three guards are calibrated

Both derivations are `sed` replacements, and a `sed` that matches nothing is a silent no-op that
still exits 0. Each is asserted by counting. Run against three deliberately-broken sources:

| Arm | Result |
|---|---|
| real source | exit 0 |
| `rx="112"` renamed | exit 1 — `rx override matched 0 times, expected 1` |
| `id="tile"` renamed | exit 1 — `tile strip left 1 rect(s) behind` |
| `<path>` deleted | exit 1 — `logo.svg has 0 chevron path(s), expected 1` |

The tile guard asserts on `<rect`, **not** on the `id="tile"` its own `sed` matches: a guard
sharing a pattern with the mutation it checks passes whenever a rename breaks both, which is the
"a check that cannot fail" shape. Renaming the id is the arm that proves it.

### The tile is `#EAE7DF`, not `--color-bg`

Amended 2026-08-15 on Marko's look at the first build: paper on paper made the tile invisible
against a light browser tab strip, so the icon read as a chevron floating loose in the chrome
rather than as a mark. `#EAE7DF` is the darkest warm paper that still clears WCAG AA against the
teal (**4.67**); one notch further, the border token `#E4E0D8`, measures **4.38**. `#F3F1EC`
(`--color-surface-raised`) was rendered too and is barely distinguishable from the original at
16px, which is the reason a non-token value earned its place here. Deliberately not added to the
token set: an asset is not a surface and no stylesheet reads it.

**This change also bought the script's fourth guard.** The comment carrying the rationale above
contained a double hyphen, XML forbids that inside a comment, `rsvg-convert` refused the file — and
every raster silently kept the old tile while `favicon.svg` carried the new one. Nothing downstream
would have caught it: the six rasters stay perfectly consistent *with each other* and disagree only
with their source, which is the exact failure a source-plus-generator setup is supposed to make
impossible. The guard now reads the fill out of `favicon.svg` and asserts it against a rendered
corner pixel, so the assertion cannot drift from the source the way a typed-in expected value
would. Calibrated: pointing one render at an old-tile SVG exits 1 with `stale raster`.

### `site.webmanifest`

`theme_color` and `background_color` moved `#0B0E15` → `#FBFAF7` (`--color-bg`). Swept the class,
not the file: `#0B0E15` now appears nowhere in `src/` or `public/` except one blog diagram SVG's
text fill (`difficulty-ramp-chart.svg:6`), which belongs to the devlog surface pass. There is no
`<meta name="theme-color">` in `BaseLayout.astro` to keep in sync.

### Verified

- `npm run build` — 8 pages, clean. `dist/` carries all six icons byte-identical to `public/`,
  and the five `<link rel="...icon">` / `rel="manifest"` tags in `dist/index.html` are unchanged.
- 16px renders inspected against both a Chrome-light (`#DEE1E6`) and Chrome-dark (`#202124`) tab
  strip. The chevron reads at 16, 20, 24, 32 and 48.
- **Not verified by me: acceptance 1 as written.** It says a real browser tab, and a headless
  screenshot has no tab strip in it. That is Marko's look.

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
  **Decided: neither — the chevron on transparent. See "What shipped" above.**

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
