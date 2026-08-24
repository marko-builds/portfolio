# Claims ledger: building-pipeline-tooling-with-claude-code

Post: `src/content/blog/building-pipeline-tooling-with-claude-code.mdx`. Row format and rules:
`scripts/claims-ledger-lint.py` (monolith). Locators are relative to the monolith root. Every
VERIFIED row below was checked by opening the artifact on 2026-08-24, not from memory.

## Opener (line 5)

- VERIFIED | 2026-08-24 | projects/blender-studio/pipeline/lib/buildkit.py:1-5 | The tooling around the game I am building, the headless Blender exporters
- VERIFIED | 2026-08-24 | projects/BlenderBridge/README.md:3 | and the Unreal import plugin, is written with Claude Code
- VERIFIED | 2026-08-24 | projects/BlenderBridge/CLAUDE.md | is written with Claude Code, and most of that code comes from the model
- UNCHECKABLE | 2026-08-24 | rhetorical count, no artifact (the spec and the test cadence are method, not a file) | align on a one page spec, one failing test at a time, and a deterministic build

## Line 14 (the loop diagram)

- UNCHECKABLE | 2026-08-24 | rhetorical count, no artifact (a description of the method, not a measured thing) | align on a one page spec, write one failing test, make it pass

## Line 18

- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/importer.py:97-101 | A normal-map channel flip, a scale check, a folder contract between two programs
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/validate.py:43-47 | A normal-map channel flip, a scale check, a folder contract between two programs
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/importer.py:5-8 | A normal-map channel flip, a scale check, a folder contract between two programs

The folder contract is the drop-zone at `<project>/../blender-studio/exports` (importer.py:6-7), also spelled out in `projects/blender-studio/BRIDGE.md`.

## Line 26

- UNCHECKABLE | 2026-08-24 | rhetorical count, no artifact (interview cadence is method) | I start with a short interview, one question at a time
- UNCHECKABLE | 2026-08-24 | an unmeasured estimate; no timing record exists for the interview step | Ten minutes of this removes most of the rework

## Line 30

- UNCHECKABLE | 2026-08-24 | rhetorical count, no artifact | One behaviour, one failing test, one implementation, then repeat

## Line 32 (the green-channel test)

- UNCHECKABLE | 2026-08-24 | the green-channel test has no public artifact: BlenderBridge carries no test files (find . -name 'test*' returns nothing on 2026-08-24); only the implementation at importer.py:99-101 is public | write a test that asserts the green channel flips, watch it fail, then make it pass

## Line 34 (the normal-map slice diagram)

- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/importer.py:97-98 | Blender bakes tangent space normals in OpenGL convention, where green is plus Y
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/naming.py:48-51 | One check asks whether the file is a normal map
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/importer.py:99-101 | If it is not, the texture passes through untouched, base colour and roughness included
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/importer.py:98 | the old script flipped every texture, and a blanket flip quietly corrupting base colour

## Line 38

- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/naming.py:48-51 | It is one question, is_normal_map, with a right answer on both branches
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/importer.py:98 | The earlier version of this code flipped every texture it touched

## Line 42 (the Blender side)

- VERIFIED | 2026-08-24 | projects/blender-studio/pipeline/lib/buildkit.py:1-12 | The Blender side is headless and scripted. Same input, same output, no clicking
- VERIFIED | 2026-08-24 | projects/blender-studio/pipeline/build_asset.py:8-14 | Before anything is written to disk, a validation step checks the triangle budget
- VERIFIED | 2026-08-24 | projects/blender-studio/pipeline/lib/buildkit.py:71-87 | checks the triangle budget, the dimensions, and that the scale is a clean 1, 1, 1

`validate_mesh` (buildkit.py:71-87) checks tris against `max_tris`, dimensions for degeneracy, and `obj.scale == (1.0, 1.0, 1.0)`, and raises before `export_glb` runs (build_asset.py steps 5 then 6).

## Line 46 (the determinism diagram)

- UNCHECKABLE | 2026-08-24 | illustrative diagram; the hashes 9f2c, 41ab and c07e are invented labels and no run hashes are recorded anywhere (buildkit.py:8 promises byte-stable-ish output, not a hash) | three runs all produce hash 9f2c and pass the budget check

## Line 50

- UNCHECKABLE | 2026-08-24 | rhetorical: "ships the regression" is a figure of speech, no artifact | "It looks correct" is exactly what ships the regression

## Line 52 (the pre-flight report diagram)

- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/validate.py:29-57 | The pre-flight report as four checks with their thresholds
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/validate.py:21 | Triangle budget of 300 to 1500 tris for props at LOD0
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/validate.py:39 | Triangle budget of 300 to 1500 tris for props at LOD0
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/validate.py:43-47 | the longest axis must land between 1 and 100000 unreal units
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/validate.py:4 | a 1 metre crate should read about 100
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/validate.py:35-36 | A naming contract requiring the SM underscore prefix
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/validate.py:52-57 | Normal map compression set to TC_NORMALMAP, the flag the green-channel slice depends on
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/validate.py:10 | read only, it reports and never mutates

The four checks implemented are naming prefix, triangle count, bounds (scale), and normal-map compression. The docstring's "missing lightmap UVs" bullet (validate.py:7) is NOT implemented, and the post does not claim it.

## Line 64 (Unreal 5.8 MCP)

- VERIFIED | 2026-08-24 | https://dev.epicgames.com/documentation/unreal-engine/unreal-mcp-in-unreal-editor | Unreal 5.8 shipped an experimental MCP server that lets an agent drive the editor directly

Found via one web search on 2026-08-24: Epic's "Unreal MCP in Unreal Editor" docs page (200), the UE 5.8 announcement (unrealengine.com/news/unreal-engine-5-8-is-now-available, 403 to curl but indexed), and an Epic forum thread titled "Testing Experimental UE 5.8 MCP Server". The 5.8 release date was 2026-06-17.

## Line 66 (links and file names)

- VERIFIED | 2026-08-24 | https://github.com/marko-builds | Code is at github.com/marko-builds. The plugin this post describes is public
- VERIFIED | 2026-08-24 | cmd: gh repo view marko-builds/BlenderBridge --json visibility (PUBLIC, 2026-08-24) | The plugin this post describes is public in BlenderBridge
- VERIFIED | 2026-08-24 | https://github.com/marko-builds/BlenderBridge | The plugin this post describes is public in BlenderBridge
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/validate.py:21 | the validator with those thresholds is validate.py
- VERIFIED | 2026-08-24 | projects/BlenderBridge/Content/Python/blender_bridge/importer.py:99-101 | the flip is one line in importer.py

Both GitHub links returned HTTP/2 200 to `curl -sI` on 2026-08-24. "One line" is one `set_editor_property("invert_normal_maps", naming.is_normal_map(...))` call, wrapped over three physical lines (importer.py:99-101).
