# claims: duskpaper-animated-wallpapers

Locators are relative to the monolith root. Every VERIFIED row was checked by opening the
artifact on the date shown, never from memory. Two claims were WRONG and the post was fixed
(2026-08-24): "thousands of times a day" (a two-minute loop plays 720 times a day) and "Each
engine carries a self-test" (flow.py, the silk scene, has no `__main__` seam test).

## line 4 (excerpt)
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/engines/__init__.py:17-34 | eight scenes, five palettes, seamless loops by construction
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/engines/aurora.py:28-71 | eight scenes, five palettes, seamless loops by construction
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:105-112 | Also the story of why one scene needed 10-bit HEVC
- VERIFIED | 2026-08-24 | decisions/lab-notes-digested.md:386 | a uv packaging gotcha that shipped me a stale build of my own fix

## line 5 (opener)
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:2-7 | a small CLI that synthesizes animated scenes from numpy math and loops them with no seam
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/engines/__init__.py:7-9 | loops them with no seam, by construction
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:105-112 | This entry also carries why one scene needed 10-bit HEVC
- VERIFIED | 2026-08-24 | decisions/lab-notes-digested.md:386 | the uv packaging trap that shipped me a stale build of my own fix

## line 13
- VERIFIED | 2026-08-24 | https://wiki.hypr.land/Useful-Utilities/Wallpapers/ | Hyprland is a tiling compositor for Wayland, and it draws no wallpaper of its own
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:257-268 | hands the file to mpvpaper, which plays a video as the wallpaper
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/engines/__init__.py:17-34 | Eight scenes (aurora, galaxy, silk, embers, fireflies, tide, terminal, caustics)
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/engines/aurora.py:28-71 | five palettes (aurora, ember, gold, nord, ice
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/engines/caustics.py:39-49 | nord, ice; caustics adds garnet), MIT licensed
- VERIFIED | 2026-08-24 | projects/duskpaper/LICENSE:1 | nord, ice; caustics adds garnet), MIT licensed
- VERIFIED | 2026-08-24 | projects/duskpaper/pyproject.toml:7 | nord, ice; caustics adds garnet), MIT licensed

## line 15
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:363-372 | First run renders, every run after that reuses the cached encode

## line 17 (alt text)
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/duskpaper-animated-wallpapers/scenes-2x2.png | Four preview frames from duskpaper in a two by two grid: aurora, galaxy, silk and tide, each labelled with the command that sets it

## line 21
- VERIFIED | 2026-08-24 | cmd: python3 -c "print(24*60*60//120)" (720 plays of the default 120 s loop, cli.py:328) | A wallpaper loop plays hundreds of times a day
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/engines/__init__.py:3-9 | a frame(t) function returning an RGB array
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/engines/tide.py:23-27 | integer-frequency harmonics of tau = 2*pi*t/period

## line 23
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/engines/aurora.py:292-293 | Seven of the eight engines carry a self-test asserting frame(0) and frame(period) differ by at most 1 per channel
- VERIFIED | 2026-08-24 | cmd: grep -L "assert delta <= 1\|assert diff <= 1" projects/duskpaper/src/duskpaper/engines/*.py (only flow.py and __init__.py) | differ by at most 1 per channel (silk has none yet)
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:115-133 | Frames pipe as raw bytes straight into ffmpeg's stdin; there is no intermediate image sequence on disk

## line 25 (alt text)
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/duskpaper-animated-wallpapers/loop-contract.svg | Three waves with frequencies one, two and three cross one period
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/duskpaper-animated-wallpapers/loop-contract.svg | The gate reads: every engine asserts frame(0) and frame(period) differ by at most 1 per channel
  note: the alt text describes the diagram correctly, but the diagram's own line "Each engine asserts, on every run" is false for silk (flow.py has no seam test). The SVG is outside this ledger's write scope; it needs the same fix as line 23.

## line 27
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:330-331 | Rendering happens at a native width of 1280
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:130-132 | upscales to your monitor with Lanczos (a sharp resampling filter)
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:44-47 | scenes range from about a minute (fireflies) to thirty-five (caustics)
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:328-329 | for a two-minute 30 fps loop
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:32 | Playback is mpvpaper with hardware decode
- VERIFIED | 2026-08-24 | projects/duskpaper/README.md:74-75 | around 5% of one core at 1600p on an Intel iGPU
- VERIFIED | 2026-08-24 | cmd: mpvpaper -h (the -p flag, "Automagically pause mpv when the wallpaper is hidden", passed at cli.py:268) | it pauses itself when a fullscreen window covers the wallpaper

## line 29 (heading)
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:110-112 | The tide scene and the case for 10 bits

## line 33
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/engines/tide.py:49 | The sky gradient spans a few dozen 8-bit code values per channel
- VERIFIED | 2026-08-24 | cmd: tide.Tide(cols=640, rows=180, palette="ice").frame(0) top 35% rows, moon and stars masked: p1..p99 per channel R 4..51, G 7..60, B 20..80 | The sky gradient spans a few dozen 8-bit code values per channel
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:105-109 | the band boundaries re-quantize differently every frame

## line 35 (alt text)
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/duskpaper-animated-wallpapers/tide-8bit-vs-10bit.png | A real tide frame at 640 wide with an amber box on the sky beside the moon
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/duskpaper-animated-wallpapers/tide-8bit-vs-10bit.png | contrast stretched and magnified four times, is shown twice
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/duskpaper-animated-wallpapers/tide-8bit-vs-10bit.png | The quantization is simulated on the engine's float output rather than read from an encode

## line 37
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:110-112 | tide encodes as HEVC 10-bit (the libx265 encoder, pixel format yuv420p10le, tagged hvc1 so players accept it)
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/duskpaper-animated-wallpapers/tide-8bit-vs-10bit.png | Four times the tonal resolution dissolves the bands
- UNCHECKABLE | 2026-08-24 | general hardware fact, no artifact in the repo; the rationale is recorded at projects/duskpaper/src/duskpaper/cli.py:108-109 | modern GPUs decode HEVC in hardware anyway
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:113-114 | The other seven scenes keep plain 8-bit h264

## line 41
- VERIFIED | 2026-08-24 | decisions/lab-notes-digested.md:386 | reinstalled with uv tool install --force . (uv is a Python package installer), ran duskpaper set tide, and watched it flicker
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:105-114 | I edited the encoder, reinstalled with

## line 43
- VERIFIED | 2026-08-24 | decisions/lab-notes-digested.md:386 | --force reinstalls the tool entry and leaves the build alone
- VERIFIED | 2026-08-24 | projects/duskpaper/pyproject.toml:3 | uv had cached the wheel, the built package, for version 0.1.0
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:367 | set reuses an existing encode, so even a fresh binary would serve the stale MP4

## line 45 (alt text)
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/duskpaper-animated-wallpapers/stale-build.svg | edit the encoder, uv tool install with force, cached wheel 0.1.0, old bytes run
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/duskpaper-animated-wallpapers/stale-build.svg | reinstall with no cache or a version bump, fresh build, new bytes run
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/duskpaper-animated-wallpapers/stale-build.svg | A note adds the second cache: set reuses an existing encode

## line 47
- VERIFIED | 2026-08-24 | decisions/lab-notes-digested.md:386 | The escape is --reinstall --no-cache (or bumping the version), plus clearing the scene's cache file

## line 51
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:241-268 | Duskpaper stops static wallpaper daemons when it starts, records what it stopped
- VERIFIED | 2026-08-24 | projects/duskpaper/src/duskpaper/cli.py:273-287 | duskpaper off restores exactly what you had
- UNCHECKABLE | 2026-08-24 | effort figure, no time record; git log shows v0 on Thu 2026-07-02 and the HEVC fix on Sat 2026-07-04 | it took a weekend plus one codec lesson
- VERIFIED | 2026-08-24 | projects/duskpaper/README.md:79-87 | The repo has since grown an Omarchy 4 plugin that runs the aurora as a live shader inside the shell
- VERIFIED | 2026-08-24 | projects/duskpaper/manifest.json:1-14 | with no render wait and no video file
- VERIFIED | 2026-08-24 | projects/duskpaper/README.md:113-114 | the CLI still works on its own

## line 53
- VERIFIED | 2026-08-24 | cmd: gh repo view marko-builds/duskpaper --json visibility (PUBLIC, MIT) | Code is at [github.com/marko-builds/duskpaper](https://github.com/marko-builds/duskpaper).
