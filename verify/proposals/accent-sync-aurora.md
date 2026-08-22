# Proposal: light-surface accents derived from the aurora pair

**Status:** proposed 2026-08-23, applied on `proto/register-v3`, NOT locked. Marko confirms
alongside the ticket 05 mark pick; on a no, revert `global.css` and delete this file.
**Source:** Marko, 2026-08-23: "fix accent colors across the whole site so it is synced with the
Aurora theme". Record: `issues/map-site-v3/03-register-prototype.md`, "Accent sync proposal".

The night register uses `--color-aurora-cyan #5FCEDB` and `--color-aurora-amber #D99A5E`. Neither
clears WCAG AA as text on the light surfaces (cyan 1.85 on white, amber 2.40), so the light accents
are those two hues at the same HSL hue and saturation with lightness lowered until both surfaces
clear 4.5 with margin. Computed with the WCAG 2.x relative-luminance formula, not eyeballed.

| token | was | proposed | hue/sat source |
|---|---|---|---|
| `--color-accent` | `#14707C` (H 186.9, S 0.72) | `#1D7781` (H 186.0, S 0.63, L 0.31) | `#5FCEDB` H 186.3, S 0.63 |
| `--color-accent-dim` | `#14707C1F` | `#1D77811F` | the accent at 12% alpha, fills only |
| `--color-warm` | `#9C6031` (H 26.4, S 0.52) | `#9B5E25` (H 29.0, S 0.62, L 0.38) | `#D99A5E` H 29.3, S 0.62 |

The old accent already shared the aurora hue to within a degree; the sync is a saturation match
and a half-step lighter. The old warm was three degrees off the amber and desaturated; the new one
is on it.

Measured ratios (text roles): see the ticket 03 section. Night tokens are untouched by this.
