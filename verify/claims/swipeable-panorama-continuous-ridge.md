# claims: swipeable-panorama-continuous-ridge

Ledger for `src/content/blog/swipeable-panorama-continuous-ridge.mdx`. Locators are paths relative
to the monolith root (or the portfolio root), or `cmd:` lines run on the date shown. Every VERIFIED
row names an artifact opened on that date; nothing here is from memory. The seam measurements
(0.26 median, 0.03/0.10/0.10/0.41 fresh, 2.50/2.02/1.66/0.87 shipped) have no script anywhere in
the repo, so they stay UNCHECKABLE until one is written.

## Frontmatter (excerpt, opener)

- VERIFIED | 2026-08-24 | play/progress_panorama.py:46-48 | rendered as a single 6480x1920 panorama and sliced into six swipeable pages
- VERIFIED | 2026-08-24 | play/progress_panorama.py:1-5 | climbing from sea to summit, rendered as a single panorama and cut into six swipeable pages

## Body

- VERIFIED | 2026-08-24 | play/progress_panorama.py:66-75 | one continuous mountain ridge rising out of the sea, across desert, steppe, forest, and volcano
- VERIFIED | 2026-08-24 | projects/habitagram/components/progress/JourneyPanorama.tsx:61-62 | your reached pages in color and the locked ones in grey
- VERIFIED | 2026-08-24 | play/progress_panorama.py:21-23 | rendered by a numpy engine and sliced into six 1080x1920 portrait tiles
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/swipeable-panorama-continuous-ridge/panorama-continuous-ridge.png | Five cyan tick marks show where the strip is cut into six pages
- VERIFIED | 2026-08-24 | play/progress_panorama.py:66-71 | desert at 20% of the climb, steppe at 38%, forest 56%, volcano 76%, summit at 100%
- VERIFIED | 2026-08-24 | play/progress_panorama.py:86 | The ridge is a Catmull-Rom curve through one crest per biome
- VERIFIED | 2026-08-24 | decisions/lab-notes-digested.md:420 | tuned against a sea level of 1500. Then I lowered the sea level to 1300
- VERIFIED | 2026-08-24 | play/progress_panorama.py:52 | Each crest is now y = lerp(sealevel, summit_y, h) with h the climb fraction
- VERIFIED | 2026-08-24 | play/panorama-proto/PORT-SPEC.md:38 | so the sea-level knob rescales the whole ridge coherently
- VERIFIED | 2026-08-24 | play/progress_panorama.py:269-291 | draws the full 6480-wide world (ridge, waves, dashed trail, milestone flags, film grain) and then crops six tiles
- VERIFIED | 2026-08-24 | play/progress_panorama.py:203-205 | woven-paper noise field generated once across the full 6480 width
- VERIFIED | 2026-08-24 | play/progress_panorama.py:276-290 | the full panorama is rendered twice, color and desaturated, and both are sliced identically
- VERIFIED | 2026-08-24 | play/progress_panorama.py:47 | The tiles are exactly 9:16. Modern phones are taller
- VERIFIED | 2026-08-24 | projects/habitagram/components/progress/JourneyPanorama.tsx:9-13 | React Native's resizeMode="cover" handles that by scaling up and cropping the sides
- VERIFIED | 2026-08-24 | cmd: python3 -c "print(1-(9/20)/(1080/1920))" (0.2: a fifth in all, a tenth per edge) | removes about a tenth of each tile from each edge, a fifth of its width in all
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/swipeable-panorama-continuous-ridge/panorama-cover-crop.png | labelled cover, each page has been scaled up and cropped by about a tenth from each edge
- VERIFIED | 2026-08-24 | projects/habitagram/components/progress/JourneyPanorama.tsx:66-72 | labelled no crop, the same two pages sit at exact screen width at the art's own aspect
- VERIFIED | 2026-08-24 | play/test_refs/progress_panorama_ref.json | locked by golden-fingerprint tests, all twelve tiles hashed at the approved seed
- VERIFIED | 2026-08-24 | cmd: cd play && /usr/bin/python3 -m unittest test_progress_panorama (Ran 4 tests, OK) | locked by golden-fingerprint tests, all twelve tiles hashed at the approved seed
- VERIFIED | 2026-08-24 | play/test_progress_panorama.py:9 | so the render is pinned to the one I signed off on a real device
- VERIFIED | 2026-08-24 | play/progress_panorama.py:140-142 | draws one continuous cross-biome gradient across all 6480 pixels and cuts afterwards
- UNCHECKABLE | 2026-08-24 | no seam-measurement script in the repo; the number exists only in the figure | the median column-to-column change in brightness is 0.26
- UNCHECKABLE | 2026-08-24 | no seam-measurement script in the repo; the numbers exist only in the figure | the four inland seams measure 0.03, 0.10, 0.10 and 0.41
- UNCHECKABLE | 2026-08-24 | no seam-measurement script in the repo; the numbers exist only in the figure | shipped measure 2.50, 2.02, 1.66 and 0.87 at those same four seams
- VERIFIED | 2026-08-24 | play/progress_panorama.py:325-328 | The export loop runs img.quantize(colors=255) on each tile before saving it
- VERIFIED | 2026-08-24 | cmd: file projects/habitagram/assets/journey/panorama_p*.png (12 files, each 1080 x 1920, 8-bit colormap) | Six pages, six independent palettes, each one fitted to a different slice
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/swipeable-panorama-continuous-ridge/panorama-quantized-seam.png | The top strip, from the shipped tiles, shows flat bands of color with a distinct step at each page boundary
- UNCHECKABLE | 2026-08-24 | no seam-measurement script in the repo; the numbers are printed in the figure and nowhere else | 2.50, 2.02, 1.66 and 0.87 for the shipped tiles against 0.03, 0.10, 0.10 and 0.41 for the fresh render
- VERIFIED | 2026-08-24 | play/test_progress_panorama.py:33-35 | They pin the raw RGBA bytes of the render
- VERIFIED | 2026-08-24 | play/progress_panorama.py:50 | The sea meets the desert at exactly one sixth of the strip
- VERIFIED | 2026-08-24 | CONNECTIONS.md:17 | If you are slicing continuous art into pages, write me: contact@markostankovic.org
