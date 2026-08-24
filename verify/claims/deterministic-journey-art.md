# claims: deterministic-journey-art

Ledger for `src/content/blog/deterministic-journey-art.mdx`, checked 2026-08-24 by opening each
artifact (engine source, golden test + fingerprint json, decision log, habitagram source, the
figure files). Locators are relative to the monolith root. One WRONG found and fixed in the post
(line 51 alt text: the left panel is drawn at about 1:5.3, not 1:4.4; measured 206x904 px against
a 1080x4800 stack). The baked caption inside `sea-desert-seed42.png` still reads "1:4.4" and is
not fixable from this ledger (pixels, no generator in the repo).

## Excerpt / opener

- VERIFIED | 2026-08-24 | decisions/log.md:2897 | I started generating the backgrounds with SDXL
- VERIFIED | 2026-08-24 | decisions/log.md:3139 | ended up rewriting them as a deterministic numpy engine
- VERIFIED | 2026-08-24 | play/imagegen.py:79 | the first version of that art came out of Stable Diffusion XL
- VERIFIED | 2026-08-24 | decisions/log.md:3140 | so I rebuilt the backgrounds as a deterministic numpy engine
- VERIFIED | 2026-08-24 | decisions/log.md:3384 | how the paper-cut look is built from formulas, and the seam model it took a phone to find

## Body

- VERIFIED | 2026-08-24 | context/projects.md:38 | a habit tracker I am building for a December 2026 release
- VERIFIED | 2026-08-24 | projects/habitagram/constants/BIOME_ASSETS.ts:11 | sea, desert, steppe, forest, volcano, mountain
- VERIFIED | 2026-08-24 | play/journey_biome.py:33 | six slabs of 1080x2400 pixels forming a 14,400-pixel canvas
- VERIFIED | 2026-08-24 | play/test_refs/journey_biome_ref.json:59 | forming a 14,400-pixel canvas from navy sea floor to snow
- VERIFIED | 2026-08-24 | play/imagegen.py:3 | The SDXL version ran locally, with IP-Adapter
- VERIFIED | 2026-08-24 | play/imagegen.py:10 | with IP-Adapter feeding a reference image into the model
- UNCHECKABLE | 2026-08-24 | rhetorical count, no artifact | Three compounding problems. First, style anchoring bled more than style
- VERIFIED | 2026-08-24 | decisions/lab-notes-digested.md:254 | at full anchor strength, a desert-crop reference turned the sea biome into ochre dunes
- VERIFIED | 2026-08-24 | play/imagegen.py:81 | Aiming the adapter at the style attention blocks alone
- VERIFIED | 2026-08-24 | decisions/lab-notes-digested.md:254 | did not strip color the way the technique promises
- VERIFIED | 2026-08-24 | decisions/log.md:2899 | Every prompt tweak rerolled the whole image
- UNCHECKABLE | 2026-08-24 | rhetorical count, no artifact | a new image with a hundred other uninvited changes
- VERIFIED | 2026-08-24 | play/journey_biome.py:38 | these six backgrounds must tile into one continuous climb
- VERIFIED | 2026-08-24 | decisions/log.md:3141 | A diffusion model cannot promise an edge
- VERIFIED | 2026-08-24 | decisions/log.md:3140 | SDXL got demoted to what it is good at, one-off hero sprites
- VERIFIED | 2026-08-24 | cmd: wc -l play/journey_biome.py (729) | just over 700 lines of numpy and PIL
- VERIFIED | 2026-08-24 | play/journey_biome.py:27-29 | numpy and PIL that draw every slab from formulas and one seed
- VERIFIED | 2026-08-24 | play/journey_biome.py:53-54 | a stack of bands with one of three edge types
- VERIFIED | 2026-08-24 | play/journey_biome.py:202-204 | torn (a wavy line plus smoothed noise for the deckle)
- VERIFIED | 2026-08-24 | play/journey_biome.py:231-244 | hard (a crisp cut for cross-hue boundaries where any gradient would bleed)
- VERIFIED | 2026-08-24 | play/journey_biome.py:194-200 | a Catmull-Rom curve through control points for shaped coastlines
- VERIFIED | 2026-08-24 | play/journey_biome.py:124 | Torn: a wave of 44 px amplitude
- VERIFIED | 2026-08-24 | play/journey_biome.py:203-204 | with noise of sigma 7 smoothed by a 9 px average
- VERIFIED | 2026-08-24 | play/journey_biome.py:153 | Hard: 28 px amplitude, noise sigma 1.2
- VERIFIED | 2026-08-24 | play/journey_biome.py:206-207 | noise sigma 1.2, a 5 px average, flat fills on both sides
- VERIFIED | 2026-08-24 | play/journey_biome.py:107-108 | Catmull: a curve through 3 control points and no random numbers, the sea shore
- VERIFIED | 2026-08-24 | play/journey_biome.py:301-304 | Two orthogonal passes of smoothed white noise
- VERIFIED | 2026-08-24 | play/journey_biome.py:305 | blended half and half into a weave
- VERIFIED | 2026-08-24 | play/journey_biome.py:306-307 | high-passed so only the ~4px tooth remains
- VERIFIED | 2026-08-24 | play/journey_biome.py:315-316 | Applied at 16% strength it reads as canvas texture
- VERIFIED | 2026-08-24 | decisions/log.md:3198-3199 | keyed with Python's built-in hash(), which is salted per process
- VERIFIED | 2026-08-24 | play/journey_biome.py:181 | The fix is hashlib.sha256 for any seed derivation that must reproduce
- VERIFIED | 2026-08-24 | play/test_journey_biome.py:36-37 | A test now pins every biome's SHA-256 at seed 42
- VERIFIED | 2026-08-24 | cmd: cd play && /usr/bin/python3 -m unittest test_journey_biome.JourneyBiomeFingerprint.test_biomes_bit_identical (OK, 6.4s) | so this class of bug cannot return silently
- VERIFIED | 2026-08-24 | play/journey_biome.py:179-180 | salted per process through PYTHONHASHSEED, new bytes every run
- VERIFIED | 2026-08-24 | play/journey_biome.py:181 | takes hashlib.sha256 of the tier and primitive name
- VERIFIED | 2026-08-24 | play/journey_biome.py:182 | keeps the first 4 bytes modulo 2 to the 31
- VERIFIED | 2026-08-24 | play/journey_biome.py:183 | feeds seed, tier and key into np.random.default_rng
- VERIFIED | 2026-08-24 | decisions/log.md:3387-3388 | every slab transitions at both its top and bottom, each ramping to a shared junction color
- VERIFIED | 2026-08-24 | decisions/log.md:3401-3402 | all five seams side by side and compressed 4:1
- VERIFIED | 2026-08-24 | decisions/log.md:3384 | On the phone (an Android dev build) at full scale
- VERIFIED | 2026-08-24 | decisions/log.md:3388-3389 | two torn edges and a wedge of junction color between them
- VERIFIED | 2026-08-24 | play/journey_biome.py:73-77 | The redesign gives each seam a single owner
- VERIFIED | 2026-08-24 | play/journey_biome.py:174 | Ten pixels of flat color at each slab end
- VERIFIED | 2026-08-24 | play/journey_biome.py:34 | the dashed slab boundary at row 2400 has nothing to show
- VERIFIED | 2026-08-24 | play/journey_biome.py:270-272 | A 10 px flat band sits at each slab end
- VERIFIED | 2026-08-24 | decisions/log.md:3401-3402 | judge stacked art at true device scale, one screen cropped at the seam
- VERIFIED | 2026-08-24 | cmd: render sea+desert at seed 42 with play/journey_biome.render_biome, stack desert over sea, compare rows 2340:3240 pixel-for-pixel against the PNG right panel at x=298,y=200 (identical except the two cyan rows) | The real render at seed 42, desert over sea
- VERIFIED | 2026-08-24 | cmd: measure the PNG left panel (206x904 px) against the 1080x4800 stack; LANCZOS resize to panel size gives mean abs diff 5.8, resize at 1:4.4 gives 30 (was WRONG, post fixed from "1 to 4.4") | Left: both slabs, 1080 by 4800 pixels, shown at about 1 to 5.3
- VERIFIED | 2026-08-24 | cmd: PNG right panel rows equal stack[2340:3240] exactly outside crop rows 60-61 | Right: rows 2340 to 3240 at 1 to 1
- VERIFIED | 2026-08-24 | cmd: crop rows 60-61 (stack rows 2400-2401) are the only mismatch, colour (95,206,219) | with a cyan line on the slab boundary at row 2400
- VERIFIED | 2026-08-24 | play/test_refs/journey_biome_ref.json:2-20 | Both slabs match the pinned sha256
- VERIFIED | 2026-08-24 | projects/habitagram/components/journey/ScenePlaceholder.tsx:190-196 | The images render in an Image with explicit width and height
- VERIFIED | 2026-08-24 | projects/habitagram/package.json:47 | under React Native's new architecture (0.83 here)
- VERIFIED | 2026-08-24 | decisions/log.md:3356-3359 | an inset-styled image silently renders at its intrinsic bitmap size
- VERIFIED | 2026-08-24 | projects/habitagram/constants/BIOME_ASSETS.ts:22-29 | a pre-desaturated _gray variant shipped alongside each biome
- UNCHECKABLE | 2026-08-24 | rationale, no artifact | cheaper and more consistent than runtime tinting
- VERIFIED | 2026-08-24 | CONNECTIONS.md:17 | If you are pinning generative art the same way, write me
