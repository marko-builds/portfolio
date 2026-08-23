#!/usr/bin/env bash
# Regenerate the whole icon set from public/favicon.svg.
#
# Ticket: issues/map-site-v2/11-mark-favicon-og.md. Acceptance says the set is regenerated
# from ONE source so no two sizes carry different art. This script is that guarantee — the
# chevron path is read from favicon.svg every time and never redrawn here.
#
# The only per-platform divergence is the corner radius, and it is a platform requirement,
# not a second drawing:
#   - rounded (rx=112, as authored) -> favicon.ico, favicon-96x96.png, the .svg itself
#   - square  (rx=0, opaque)        -> apple-touch-icon.png and the two manifest PNGs.
#     iOS composites apple-touch-icon on black, so transparent corners ship as black
#     corners; Android maskable icons crop the tile and require full bleed. The chevron's
#     furthest ink (an arm-end cap, radius 201.2) sits inside the maskable safe circle
#     (radius 204.8), so nothing is clipped. Measure ink radius, not bounding-box diagonal:
#     the box corners are empty here, and reading 413 off them says "clipped" wrongly.
#
# Deps: rsvg-convert (librsvg), magick (ImageMagick 7).
set -euo pipefail

cd "$(dirname "$0")/.."
PUB=public
SRC=$PUB/favicon.svg
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

command -v rsvg-convert >/dev/null || { echo "need rsvg-convert (librsvg)" >&2; exit 1; }
command -v magick       >/dev/null || { echo "need magick (ImageMagick 7)" >&2; exit 1; }

# Both derivations below are sed replacements, and a sed replacement that matches nothing is
# a silent no-op that still exits 0. Each one is asserted by counting, never by an && chain:
# a no-match grep exits 1 and would take the rest of the script with it.

# Square variant: same file, corner radius flattened.
sed 's/rx="112"/rx="0"/' "$SRC" > "$TMP/square.svg"
n=$(command grep -c 'rx="0"' "$TMP/square.svg" || true)
[ "$n" = 1 ] || { echo "rx override matched $n times, expected 1 — did the rect change?" >&2; exit 1; }

# public/logo.svg (the bare mark) retired with site-v3 slice 14 (2026-08-23): the nav
# carries the fold mark inline and favicon.svg is the only shipped vector.

render() { rsvg-convert -w "$2" -h "$2" "$1" -o "$3"; }

render "$SRC" 96  "$PUB/favicon-96x96.png"
render "$TMP/square.svg" 180 "$PUB/apple-touch-icon.png"
render "$TMP/square.svg" 192 "$PUB/web-app-manifest-192x192.png"
render "$TMP/square.svg" 512 "$PUB/web-app-manifest-512x512.png"

# Multi-resolution .ico. 16 is the one that has to hold.
for s in 16 32 48; do render "$SRC" $s "$TMP/ico-$s.png"; done
magick "$TMP/ico-16.png" "$TMP/ico-32.png" "$TMP/ico-48.png" "$PUB/favicon.ico"

# The failure this catches: favicon.svg is edited, a render step fails or is skipped, and the SVG
# ships a new mark while every raster still carries the old one. Nothing downstream would notice —
# the set stays internally consistent with itself and disagrees only with its source. So assert a
# rendered pixel against the source's own fill, not against a value typed here.
fill=$(sed -n 's/.*<rect id="tile"[^>]*fill="\(#[0-9A-Fa-f]\{6\}\)".*/\1/p' "$SRC")
[ -n "$fill" ] || { echo "could not read the tile fill out of $SRC" >&2; exit 1; }
want=$(magick "xc:$fill" -format '%[pixel:p{0,0}]' info:)
for f in apple-touch-icon.png web-app-manifest-192x192.png web-app-manifest-512x512.png; do
  got=$(magick "$PUB/$f" -format '%[pixel:p{0,0}]' info:)
  [ "$got" = "$want" ] || { echo "$f corner is $got, source says $fill ($want) — stale raster" >&2; exit 1; }
done

echo "rendered from $SRC (tile $fill):"
ls -l "$PUB"/favicon.ico "$PUB"/favicon-96x96.png "$PUB"/apple-touch-icon.png \
      "$PUB"/web-app-manifest-192x192.png "$PUB"/web-app-manifest-512x512.png
