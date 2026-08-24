# Claims ledger: browser-prototype-then-port

Post: `src/content/blog/browser-prototype-then-port.mdx`. Rows: `- STATUS | date | evidence | span`.
Locators are relative to the monolith root. Every VERIFIED row was checked by opening the artifact
on the date shown, never from memory. Lint: `python3 scripts/claims-ledger-lint.py browser-prototype-then-port`.

## Frontmatter (lines 4-5)

- VERIFIED | 2026-08-24 | play/lookdev/README.md:3-4 | My workflow uses both: a zero-dependency browser canvas for the feel
- VERIFIED | 2026-08-24 | play/render_spec.md:3-7 | a 1:1 port into the production engine
- VERIFIED | 2026-08-24 | play/lookdev/README.md:3-4 | My workflow is a zero-dependency browser canvas for the feel
- VERIFIED | 2026-08-24 | play/test_journey_biome.py:148-157 | The port is a tested claim, not a hope

## Body

- UNCHECKABLE | 2026-08-24 | no artifact records the old per-tweak cost; a workflow memory, not a measured number | every tweak cost a full Python render
- VERIFIED | 2026-08-24 | context/projects.md:11 | a habit tracker due December 2026
- VERIFIED | 2026-08-24 | cmd: grep -cE '^    "[a-z]+": Biome\(' play/journey_biome.py  (prints 6: sea, desert, steppe, forest, volcano, mountain) | a climb in six stages the code calls biomes
- VERIFIED | 2026-08-24 | play/render_spec.md:9-11 | so "1:1" is something a test checks
- VERIFIED | 2026-08-24 | cmd: grep -Hn "^import" play/lookdev/harness.mjs play/lookdev/compose.mjs play/lookdev/schema.mjs  (harness imports compose and schema, both import render_math: four modules behind index.html:74) | a plain canvas page plus four ES modules
- VERIFIED | 2026-08-24 | cmd: ls play/lookdev/package.json play/lookdev/node_modules  (both absent; README.md:12 serves it with python3 -m http.server) | No framework, no build step, no npm install
- VERIFIED | 2026-08-24 | play/lookdev/index.html:44-48 | Five color pickers (sand, sky reflection, shallow water, deep water, desert body)
- VERIFIED | 2026-08-24 | play/lookdev/index.html:52-53 | with a position slider and three edge kinds (catmull, torn, hard)
- VERIFIED | 2026-08-24 | play/lookdev/index.html:63-65 | Sliders for the ripple texture's frequency, amplitude and strength
- VERIFIED | 2026-08-24 | play/lookdev/harness.mjs:85-95 | Path waypoints you move by clicking the canvas
- VERIFIED | 2026-08-24 | play/lookdev/harness.mjs:42-82 | clicking the canvas. Every control redraws immediately
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/browser-prototype-then-port/harness.png | the seam controls set to catmull at position 0.26, the band split
- VERIFIED | 2026-08-24 | play/lookdev/harness.mjs:102-109 | one button validates the parameters and downloads a JSON file
- VERIFIED | 2026-08-24 | play/lookdev/harness.mjs:110 | downloads a JSON file. Another takes a screenshot
- VERIFIED | 2026-08-24 | play/lookdev/screenshot.mjs:1-11 | writes a PNG using nothing but Node builtins
- VERIFIED | 2026-08-24 | play/lookdev/README.md:3 | The point of zero dependencies is speed of iteration
- UNCHECKABLE | 2026-08-24 | rhetorical count, no artifact; harness.mjs:73-78 shows two lines per slider plus one label in index.html plus a read-out entry, and the total depends on how the lines are split | Adding a slider is four lines
- VERIFIED | 2026-08-24 | play/lookdev/render_math.mjs:28-84 | a spec with four functions: Catmull-Rom evaluation, multi-stop gradient interpolation
- VERIFIED | 2026-08-24 | cmd: git -C /home/ms/Projects/monolith ls-files play/test_refs/spec_conformance_fixture.json  (tracked) | asserted against the same committed conformance fixture
- VERIFIED | 2026-08-24 | play/test_refs/spec_conformance_fixture.json:49 | inputs and expected outputs at 1e-6 tolerance
- VERIFIED | 2026-08-24 | play/test_refs/spec_conformance_fixture.json:31-42 | disagree about the curve's value at x = 0.375
- VERIFIED | 2026-08-24 | play/lookdev/render_math.test.mjs:14 | implemented in render_math.mjs for the JS harness
- VERIFIED | 2026-08-24 | play/test_render_spec.py:2-8 | and render_spec.py for the Python engine, and both test files
- VERIFIED | 2026-08-24 | play/test_refs/spec_conformance_fixture.json:3-50 | the Catmull-Rom block of the fixture, values as committed
- VERIFIED | 2026-08-24 | play/journey_biome.py:29 | built on numpy's RNG and scipy's gaussian filters
- VERIFIED | 2026-08-24 | play/render_spec.md:15-20 | The browser only approximates them, and no test pretends otherwise
- VERIFIED | 2026-08-24 | play/test_journey_biome.py:10-14 | a sha256 of the raw render pinned in a test
- VERIFIED | 2026-08-24 | projects/habitagram/assets/journey/sea-params.json | The locked sea look exported as a JSON of parameters
- VERIFIED | 2026-08-24 | play/journey_biome.py:107-108 | a Catmull-Rom edge at 0.26 from the top with control points at
- VERIFIED | 2026-08-24 | play/journey_biome.py:112 | a three-stop gradient from sky reflection through shallow to deep
- VERIFIED | 2026-08-24 | play/journey_biome.py:114-115 | a contour signature at frequency 5.5, gated to render only below the seam
- VERIFIED | 2026-08-24 | play/journey_biome.py:112 | a three stop water gradient with shallow at 0.43
- VERIFIED | 2026-08-24 | play/journey_biome.py:114-115 | frequency 5.5, amplitude 5.5 and strength 0.045
- VERIFIED | 2026-08-24 | play/journey_biome.py:284-287 | a ripple gate of below_edge 0 so only the water is modulated
- VERIFIED | 2026-08-24 | play/test_journey_biome.py:169-190 | sand rows byte-identical to before, water rows visibly modulated
- VERIFIED | 2026-08-24 | play/test_journey_biome.py:63-64 | The engine renders at the pinned seed (42)
- UNCHECKABLE | 2026-08-24 | a manual device step; nothing on disk records the phone comparison | I compare against the prototype on a phone
- VERIFIED | 2026-08-24 | projects/habitagram/issues/05-port-sea-dawn-sky-golden.md:7-9 | Until that eyeball happens the golden stays red on purpose
- VERIFIED | 2026-08-24 | play/test_journey_biome.py:10-14 | eyeball the engine render at seed 42 against the prototype
- VERIFIED | 2026-08-24 | projects/habitagram/issues/05-port-sea-dawn-sky-golden.md:7-9 | The golden stays red through the port and the eyeball
- VERIFIED | 2026-08-24 | play/render_spec.md:1-7 | for the price of one spec file and a fixture
- VERIFIED | 2026-08-24 | projects/portfolio/src/pages/field-journal/[slug].astro:15 | has its own entry: golden fingerprints for generative art
- VERIFIED | 2026-08-24 | projects/portfolio/src/content/blog/golden-fingerprints-generative-art.mdx | caught downstream by the engine's golden fingerprint instead
