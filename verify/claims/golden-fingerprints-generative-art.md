# claims: golden-fingerprints-generative-art

Ledger for `src/content/blog/golden-fingerprints-generative-art.mdx`. Locators are paths relative
to the monolith root or the portfolio root, or `cmd:` lines run on the date shown. Every VERIFIED
row names an artifact opened on that date; nothing here is from memory.

## Frontmatter (excerpt, opener)

- VERIFIED | 2026-08-24 | play/goldens.py:31-40 | committing SHA-256 hashes of the raw pixel and sample arrays
- UNCHECKABLE | 2026-08-24 | rhetorical, no artifact for a hypothetical refactor | A refactor can shift one gradient band by a pixel and no test notices
- VERIFIED | 2026-08-24 | play/test_refs/music_ref.json | render app art, music beds and wallpapers from seeded math
- VERIFIED | 2026-08-24 | projects/duskpaper/README.md:17 | render app art, music beds and wallpapers from seeded math
- VERIFIED | 2026-08-24 | play/goldens.py:34 | SHA-256 fingerprints of the raw arrays, committed beside each engine
- VERIFIED | 2026-08-24 | src/content/blog/golden-fingerprints-generative-art.mdx:33-39 | the three rules that keep a golden from lying

## Body

- VERIFIED | 2026-08-24 | cmd: grep -c -i "torch\|diffusers\|onnx\|tensorflow" play/journey_biome.py play/music.py play/landscape.py play/aurora.py play/progress_panorama.py (all 0) | seeded math (procedural, no trained model anywhere) and ship baked
- VERIFIED | 2026-08-24 | projects/habitagram/assets/journey/sea.png | ship baked into app builds, so a shifted band is a store release to fix
- VERIFIED | 2026-08-24 | play/goldens.py:37-40 | A fingerprint is three fields: the array's shape, its dtype, and the SHA-256 of its raw bytes
- VERIFIED | 2026-08-24 | play/goldens.py:9-11 | PNG bytes vary across libpng versions; pixels don't
- VERIFIED | 2026-08-24 | cmd: wc -l play/goldens.py (77) | The harness lives in one small module, goldens.py. A fingerprint is three fields
- VERIFIED | 2026-08-24 | play/test_refs/journey_biome_ref.json | ndarray of shape 2400 by 1080 by 3, dtype uint8
- VERIFIED | 2026-08-24 | play/goldens.py:32-34 | takes the bytes with tobytes and hashes them with sha256
- VERIFIED | 2026-08-24 | play/goldens.py:10-12 | the same pixels can give other bytes on another libpng
- VERIFIED | 2026-08-24 | play/test_refs/music_ref.json | The music engine pins all six moods at seed 30
- VERIFIED | 2026-08-24 | play/test_refs/journey_biome_ref.json | The journey-biome engine pins six biomes at seed 42, plus the full stacked canvas and two sea variants
- VERIFIED | 2026-08-24 | play/test_refs/landscape_ref.json | Landscape pins six palettes, aurora pins five palettes at two timepoints each
- VERIFIED | 2026-08-24 | play/test_refs/aurora_ref.json | aurora pins five palettes at two timepoints each
- VERIFIED | 2026-08-24 | play/test_refs/progress_panorama_ref.json | the progress panorama pins all twelve of its tiles
- VERIFIED | 2026-08-24 | play/goldens.py:66-77 | fails loudly with the exact case name
- VERIFIED | 2026-08-24 | play/test_refs/journey_biome_ref.json | Journey biome: seed 42, 9 cases, uint8, six biomes plus the stacked canvas and two sea variants
- VERIFIED | 2026-08-24 | play/test_refs/landscape_ref.json | Landscape: seed 42, 7 cases, uint8, six palettes at t 0 plus forest at t 7.5
- VERIFIED | 2026-08-24 | play/test_aurora.py:40-62 | Aurora: no seed, 10 cases, uint8, five palettes at t 0 and t 20 with meteors off
- VERIFIED | 2026-08-24 | play/test_refs/progress_panorama_ref.json | Progress panorama: seed 52, 12 cases, uint8, six tiles each in colour and gray
- VERIFIED | 2026-08-24 | play/test_refs/music_ref.json | Music: seed 30, 6 cases, float64, six moods of 8 bars each
- VERIFIED | 2026-08-24 | cmd: ast count of def test_ over the 11 classes named in play/run-goldens.sh:33-43 (9+6+4+4+1+2+3+2+3+1+3 = 38; ref cases 9+7+10+12+6 = 44) | Totals: 44 pinned cases, 38 tests in run-goldens.sh across 11 classes
- VERIFIED | 2026-08-24 | play/goldens.py:13-14 | float64 is toolchain locked, so a numpy, BLAS or FFT change can trip a false regression
- UNCHECKABLE | 2026-08-24 | wall-clock estimate, machine-dependent, no recorded timing artifact | runs the whole lane in about a minute
- VERIFIED | 2026-08-24 | cmd: ast count of def test_ over the 11 classes named in play/run-goldens.sh:33-43 (= 38) | 38 tests, because it hashes raw render output and never touches ffmpeg
- VERIFIED | 2026-08-24 | play/run-goldens.sh:4-8 | Pulling in the encode-heavy suites would turn a fast pixel-pin into a multi-minute run
- VERIFIED | 2026-08-24 | play/run-goldens.sh:21-27 | It also runs a JS conformance suite
- VERIFIED | 2026-08-24 | src/content/blog/golden-fingerprints-generative-art.mdx:33-39 | Three rules came out of building this one
- VERIFIED | 2026-08-24 | play/test_music.py:81 | UPDATE_MUSIC_REF=1 regenerates the music reference and nothing else
- VERIFIED | 2026-08-24 | play/goldens.py:53-63 | I rejected a single global UPDATE_REF flag on purpose
- VERIFIED | 2026-08-24 | play/test_journey_biome.py:18 | music with UPDATE_MUSIC_REF, journey biome marked broken with UPDATE_JOURNEY_REF
- VERIFIED | 2026-08-24 | play/test_landscape.py:488 | journey biome marked broken with UPDATE_JOURNEY_REF, landscape with UPDATE_LANDSCAPE_REF
- VERIFIED | 2026-08-24 | play/test_aurora.py:21 | landscape with UPDATE_LANDSCAPE_REF, aurora with UPDATE_AURORA_REF
- VERIFIED | 2026-08-24 | play/test_progress_panorama.py:13 | aurora with UPDATE_AURORA_REF, progress panorama with UPDATE_PANORAMA_REF
- VERIFIED | 2026-08-24 | play/run-goldens.sh:13-15 | Run A sets UPDATE_MUSIC_REF=1 and runs python3 -m unittest test_music
- VERIFIED | 2026-08-24 | play/goldens.py:56-58 | a single UPDATE_REF=1 under unittest discover pins all five rows at once
- VERIFIED | 2026-08-24 | decisions/log.md:4607-4608 | the tests for the math went green and the golden stayed intentionally red, because the render hadn't been reviewed on an actual phone yet
- VERIFIED | 2026-08-24 | decisions/log.md:4229-4230 | I broke an engine on purpose and watched the fingerprint trip
- VERIFIED | 2026-08-24 | cmd: /usr/bin/python3 in play/: render_biome(BIOMES["sea"], 42), flip bit 0 of [1200,540,0], hash_arr moved dbf8ca0c to 856b11cc | I broke an engine on purpose and watched the fingerprint trip
- UNCHECKABLE | 2026-08-24 | wall-clock estimate, no recorded timing artifact | This cost five minutes and caught a case where
- VERIFIED | 2026-08-24 | play/goldens.py:66-69 | caught a case where a skipped-reference path made a whole suite silently pass
- VERIFIED | 2026-08-24 | play/test_refs/journey_biome_ref.json | shows an expected hash beginning dbf8ca0c against a different hash
- VERIFIED | 2026-08-24 | cmd: /usr/bin/python3 in play/: render_biome(BIOMES["sea"], 42) hashes dbf8ca0cff255ed7; b[1200,540,0] ^= 1 hashes 856b11ccf7dc401a4f4512db6c4d2ed4 | against a different hash beginning 856b11cc. Below: the array
- VERIFIED | 2026-08-24 | cmd: python3 -c "print(2400*1080*3)" (7776000) | the array is 2400 by 1080 by 3, so that is one changed value out of 7,776,000
- VERIFIED | 2026-08-24 | cmd: python3 -c "print(2400*1080*3)" (7776000) | out of nearly eight million values, and the guard trips with the case name attached
- UNCHECKABLE | 2026-08-24 | rhetorical count, refers to the two rows of the figure above it | That is the whole contract in two rows
- VERIFIED | 2026-08-24 | play/goldens.py:12-14 | The music engine outputs float64, and float64 is only bit-exact on one toolchain
- VERIFIED | 2026-08-24 | play/run-goldens.sh:10-14 | The comment at the top of the script says exactly this
- VERIFIED | 2026-08-24 | play/goldens.py:15-16 | refs are generated on one machine, numpy gets pinned before the suite runs anywhere else
- VERIFIED | 2026-08-24 | play/journey_biome.py:73 | I rewrote the biome seam model, restructured band fills
- VERIFIED | 2026-08-24 | play/journey_biome.py:237-239 | restructured band fills, and added new edge types
- VERIFIED | 2026-08-24 | play/journey_biome.py:53 | restructured band fills, and added new edge types
- VERIFIED | 2026-08-24 | cmd: wc -l play/goldens.py (77) | goldens.py is 77 lines. If you pin renders and want it
- VERIFIED | 2026-08-24 | CONNECTIONS.md:17 | If you pin renders and want it, write me: contact@markostankovic.org
