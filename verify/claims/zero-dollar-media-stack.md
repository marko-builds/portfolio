# claims: zero-dollar-media-stack

Ledger for `src/content/blog/zero-dollar-media-stack.mdx`. One row per checkable claim, span
copied verbatim from the post, locator = what was opened on the date. Lint:
`python3 scripts/claims-ledger-lint.py zero-dollar-media-stack` from the monolith root.

## Frontmatter (excerpt, opener)

- VERIFIED | 2026-08-24 | play/music.py:197-277 six MOODS keys | Six music moods, 33 sound effects, fifteen scenes, nine overlay loops
- VERIFIED | 2026-08-24 | cmd: sed -n 493,528p play/sfx.py \| grep -cE '^\s+"[a-z_]+":\s+\(s_' prints 33 | 33 sound effects, fifteen scenes, nine overlay loops, every render deterministic
- VERIFIED | 2026-08-24 | play/scenes.py:25-41 fifteen SCENES entries | fifteen scenes, nine overlay loops, every render deterministic and copyright-clean
- VERIFIED | 2026-08-24 | play/vfx.py:50-111 nine FX entries | nine overlay loops, every render deterministic and copyright-clean
- VERIFIED | 2026-08-24 | play/test_music.py:106-112 same seed byte-equal across every mood | I built numpy engines that synthesize all of it
- VERIFIED | 2026-08-24 | play/scenes.py:9-23 four engine files behind one registry plus music.py and sfx.py | Four engines, every render deterministic and copyright-clean. Here is how each one is built

## Body

- VERIFIED | 2026-08-24 | play/scenery.py:28-29 orchestrator over scenes.SCENES; play/music.py, play/sfx.py, play/vfx.py exist | so the stack is four engines in one folder: music.py, sfx.py, a set of scenery renderers behind one orchestrator, and vfx.py for overlay loops
- VERIFIED | 2026-08-24 | cmd: grep -nE "^(import\|from) " play/music.py play/sfx.py play/vfx.py play/embers.py play/godrays.py shows only numpy, scipy, PIL, stdlib | No samples, no models, no downloads
- VERIFIED | 2026-08-24 | play/test_music.py:104-112 | Same seed, same bytes, so the media pipeline can be tested like code
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/zero-dollar-media-stack/synth-engines.png opened; four panels, amber wrap marker, black god-ray corners | Four panels, one per engine. First: a spectrogram of the synthesized zap
- VERIFIED | 2026-08-24 | play/sfx.py:333-338 sweep(1900*j, 200, ...) and the 75 Hz AM buzz | as the saw sweep drops from 1900 Hz to 200 Hz, with a horizontal ripple from the 75 Hz buzz
- VERIFIED | 2026-08-24 | play/music.py:197-277 six mood dicts; play/music.py:489-493 the --mood choices | music.py has six moods: lofi, chiptune, tension, upbeat, corporate, trap
- VERIFIED | 2026-08-24 | play/music.py:194-195 and play/music.py:331 sixteen steps per bar | which instruments play, and 16-step drum patterns
- VERIFIED | 2026-08-24 | play/music.py:198-200 bpm=75, swing=0.16, crackle=True, ii-V-I-vi | Lofi runs at 75 bpm with a ii-V-I-vi progression, 16% swing, and a vinyl crackle overlay
- VERIFIED | 2026-08-24 | play/music.py:93 bass808 glide_semis=7, glide_frac=0.35 (the post rounds 0.35 to a third); play/music.py:265 bpm=140 | Trap runs at 140 with a gliding 808 sub that drops seven semitones over the first third of each note
- VERIFIED | 2026-08-24 | play/music.py:62-70 | The kick is a sine sweep from 118 Hz down to 48 Hz with a click transient
- VERIFIED | 2026-08-24 | play/music.py:73-77 band 200-8000 noise plus a 180 Hz sine body | The snare is band-filtered noise plus a sine body
- VERIFIED | 2026-08-24 | play/music.py:148-152 | The marimba is a pluck with a quiet 4th and 6th partial
- VERIFIED | 2026-08-24 | play/music.py:330-339 uniform(-0.004, 0.004) s timing jitter and _jit velocity from the seeded rng | Humanity comes from per-hit velocity and a few milliseconds of timing jitter, all from a seeded RNG
- VERIFIED | 2026-08-24 | play/music.py:468-470 loudnorm=I=-14:TP=-1.5 two-pass | a two-pass loudnorm to -14 LUFS with a -1.5 dB true-peak ceiling
- VERIFIED | 2026-08-24 | play/music.py:280-295 circ_reverb via rfft/irfft | The reverb is a circular convolution, so the tail of the last bar wraps around into the first
- VERIFIED | 2026-08-24 | play/music.py:510 and play/music.py:524 seam = max abs(mix[0] - mix[-1]) printed at exit | The render even measures the seam delta at exit
- VERIFIED | 2026-08-24 | play/music.py:383 buses drums/bass/pad/lead; play/music.py:436-465 export_stems writes manifest.json; play/music.py:497-498 the --stems flag | There is also a --stems flag that exports per-bus loops (drums, bass, pad, lead) with a manifest
- VERIFIED | 2026-08-24 | cmd: rendered play/music.py --mood lofi --seed 30 and --seed 31 to wav, decoded lofi-loop.mp3, FFT cross-correlation peak 0.998 for seed 30 vs 0.543 for seed 31 | music.py, lofi, seed 30. 8 bars at 75 bpm
- VERIFIED | 2026-08-24 | cmd: ffprobe projects/portfolio/public/media/blog/zero-dollar-media-stack/lofi-loop.mp3 duration=25.600000 (8 bars x 4 beats / 75 bpm); ffmpeg -af ebur128 integrated -14.5 LUFS after mp3 encode | 8 bars at 75 bpm, mastered to -14 LUFS
- VERIFIED | 2026-08-24 | play/music.py:280-295 | the reverb tail is a circular convolution, so the seam has nowhere to appear
- VERIFIED | 2026-08-24 | play/sfx.py:493-528 thirty-three SOUNDS entries, teleport at play/sfx.py:526 | sfx.py synthesizes 33 sounds: clicks, whooshes, impacts, zaps, coins, explosions, a teleport
- VERIFIED | 2026-08-24 | play/sfx.py:111-121 dark/bright crossfade under hann(n), pan linspace(-0.9, 0.9) | A whoosh is noise swept dark to bright and back under a hann window, panning left to right as it goes
- VERIFIED | 2026-08-24 | play/sfx.py:333-341 | A zap is a saw sweep from 1900 Hz to 200 Hz with a 75 Hz amplitude buzz and some crackle on top
- VERIFIED | 2026-08-24 | play/sfx.py:174-178 np.sign(sin) at 988 then 1319 | The coin is two square waves, 988 Hz then 1319 Hz
- VERIFIED | 2026-08-24 | play/sfx.py:6-9 and play/sfx.py:539-541 render_one(name, seed) seeds a default_rng per render | Every recipe takes an RNG and jitters pitch, timing, and filter cutoffs
- VERIFIED | 2026-08-24 | play/sfx.py:551 and play/sfx.py:558-571 --pack writes every sound plus MANIFEST.md | --pack renders the whole library with a manifest in one command
- VERIFIED | 2026-08-24 | play/sfx.py:15-16 docstring names applause, camera shutter, animals and points to CC0 (Freesound) | Applause, animals, a real camera shutter are not synthesizable, and the tooling says so and points to CC0 sources instead of faking it
- VERIFIED | 2026-08-24 | play/scenes.py:25-41 fifteen entries incl. aurora, rain, space, terminal, flow, caustics, embers | Fifteen scene engines render numpy frames: aurora curtains, rain, starfields, terminal code rain, silk flow, water caustics, drifting embers
- VERIFIED | 2026-08-24 | play/scenery.py:14-16 and play/scenery.py:61 base-seconds default 60; play/scenery.py:135-136 -stream_loop | scenery.py orchestrates a full kit: it renders one seamless base loop (60 seconds by default), stitches it to an hour with ffmpeg stream looping
- VERIFIED | 2026-08-24 | play/scenery.py:147-163 15 s reel, play/scenery.py:176-179 linkedin 1584x396 and youtube 2560x1440, play/scenery.py:187 thumbnail | then cuts a 15-second vertical reel, LinkedIn and YouTube banners, and a thumbnail from the same frames
- VERIFIED | 2026-08-24 | play/embers.py:12-21 and play/embers.py:69 integer wraps, play/embers.py:80-84 edge fade, play/embers.py:98-108 splat, blur, fade | Sparks are splatted into a buffer and blurred into soft glowing dots over black
- VERIFIED | 2026-08-24 | play/embers.py:68-69 rng.integers(1, 3) frame-heights per loop; play/embers.py:90 wraps modulo H | Each one drifts upward a whole number of frame-heights per loop, so it re-enters the bottom exactly as it leaves the top, and a vertical edge fade hides the moment it wraps
- VERIFIED | 2026-08-24 | play/vfx.py:50-111 FX registry: nine entries, seven mode additive, two mode alpha (sparkles-alpha, smoke) | vfx.py renders nine overlay assets, among them dust, bokeh, smoke, light leaks, sparkles and god rays
- VERIFIED | 2026-08-24 | play/vfx.py:6 additive on pure black composited Screen/Add; play/vfx.py:87-91 smoke occludes=True darkens footage Over | Seven of them are additive light on true black, built for a Screen blend
- VERIFIED | 2026-08-24 | play/vfx.py:79-91 the two alpha-mode assets, smoke marked occludes | Two ship a straight alpha channel instead, and one of those, smoke, darkens the footage rather than adding to it
- VERIFIED | 2026-08-24 | play/godrays.py:56-57 source at sy=-0.28*H; play/godrays.py:72-74 k=4 integer angular frequencies; play/godrays.py:65-69 raised-cosine radial window to exactly 0 at Rmax | A source point sits above the top edge, and for every pixel the engine takes the angle back to it and carves bright shafts out of a smooth angular pattern built from a few integer frequencies
- VERIFIED | 2026-08-24 | play/godrays.py:97-108 asserts diff == 0 and far == 0 | The module's self-test asserts both properties: that frame zero equals frame period, and that the far corners are pure black
- VERIFIED | 2026-08-24 | cmd: ffprobe projects/portfolio/public/media/blog/zero-dollar-media-stack/god-rays.mp4 width=1280 height=720 duration=8.000000 r_frame_rate=60/1; play/godrays.py:97-108 the two assertions | vfx.py, god-rays, an 8 second loop at 1280 by 720
- VERIFIED | 2026-08-24 | projects/claude-video-studio/bin/music (vendored python, docstring lines 1-27) and projects/claude-video-studio/bin/sfx (bash exec of play/sfx.py) | consumes all of this through vendored wrappers (bin/music, bin/sfx)
- VERIFIED | 2026-08-24 | projects/portfolio/src/content/blog/golden-fingerprints-generative-art.mdx exists | That is the golden fingerprints entry

## Verified but not coverable by a row (lint limit)

The three `media-label` lines ("whoosh, seed 7", "zap, seed 7", "coin, seed 7") normalize to
three words each, under the six-word span floor, so no row can cover them. Verified anyway on
2026-08-24: rendered `play/sfx.py --name {whoosh,zap,coin} --seed 7` and `--seed 8` to wav, decoded
the three mp3s under `public/media/blog/zero-dollar-media-stack/`, FFT cross-correlation peaks
whoosh 0.856 (seed 8: 0.035), zap 0.998 (seed 8: 0.766), coin 1.000 (seed 8: 0.490). ffprobe
durations 0.50 s, 0.28 s, 0.47 s match `s_whoosh`, `s_zap`, `s_coin` at `play/sfx.py:112`,
`play/sfx.py:334`, `play/sfx.py:176`.
- VERIFIED | 2026-08-24 | cmd: /usr/bin/python3 play/sfx.py --name whoosh --seed 7 --out /tmp/w7.wav, FFT cross-correlation 0.856 against public/media/blog/zero-dollar-media-stack/whoosh.mp3 (seed 8 gives 0.035) | whoosh, seed 7
- VERIFIED | 2026-08-24 | cmd: /usr/bin/python3 play/sfx.py --name zap --seed 7 --out /tmp/z7.wav, FFT cross-correlation 0.998 against public/media/blog/zero-dollar-media-stack/zap.mp3 (seed 8 gives 0.766) | zap, seed 7
- VERIFIED | 2026-08-24 | cmd: /usr/bin/python3 play/sfx.py --name coin --seed 7 --out /tmp/c7.wav, FFT cross-correlation 1.000 against public/media/blog/zero-dollar-media-stack/coin.mp3 (seed 8 gives 0.490) | coin, seed 7
