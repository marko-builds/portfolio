# Claims ledger: green-suite-silent-cli

Post: `src/content/blog/green-suite-silent-cli.mdx`. Row format and rules:
`scripts/claims-ledger-lint.py` (monolith). Locators are relative to the monolith root. Every
VERIFIED row below was checked by opening the artifact or running the command on 2026-08-24, in a
scratch copy of `projects/changelogue` with dependencies installed (the lane checkout has no
`node_modules`). `13e2e9b` is the fix commit; `13e2e9b^` carries the guard as it shipped.

## Excerpt (line 4)

- VERIFIED | 2026-08-24 | cmd: git checkout 13e2e9b^ -- src/index.ts then npx vitest run (Tests 98 passed, 4 files) | changelogue passed 98 tests and, once installed, exited 0 with no output for every user
- VERIFIED | 2026-08-24 | cmd: with the 13e2e9b^ guard, ./scripts/smoke.sh prints SMOKE FAIL --version printed nothing through the bin symlink and exits 1 | once installed, exited 0 with no output for every user
- VERIFIED | 2026-08-24 | cmd: git checkout HEAD -- src/index.ts then ./scripts/smoke.sh prints SMOKE PASS and exits 0 | calibrated by putting the bug back, is the check I kept

## Opener (line 5)

- VERIFIED | 2026-08-24 | cmd: git checkout 13e2e9b^ -- src/index.ts then npx vitest run (Tests 98 passed) | Ninety-eight tests passed. The installed binary ran, printed nothing, and exited with code 0
- VERIFIED | 2026-08-24 | cmd: with the 13e2e9b^ guard, ./scripts/smoke.sh reports --version printed nothing through the bin symlink | The installed binary ran, printed nothing, and exited with code 0
- VERIFIED | 2026-08-24 | projects/changelogue/package.json:24-26 | the unit suite was blind to the one path every installed user takes
- VERIFIED | 2026-08-24 | cmd: smoke.sh with the 13e2e9b^ guard exits 1, with HEAD exits 0, same tree, back to back | the smoke check I calibrated by putting the bug back

## Line 13

- VERIFIED | 2026-08-24 | projects/changelogue/package.json:4 | changelogue is a small CLI that writes a changelog from git history
- VERIFIED | 2026-08-24 | cmd: git -C projects/changelogue show 13e2e9b^:src/index.ts (the guard is lines 154-156, the last statement in the file) | The whole bug is one line at the bottom of its `src/index.ts`

## Line 21

- VERIFIED | 2026-08-24 | projects/changelogue/src/index.ts:127 | something imported the file, so stay quiet and let the importer call `buildProgram()` itself

## Line 23

- VERIFIED | 2026-08-24 | cmd: node node_modules/hello-cli/index.js in the seven-line repro prints the greeting and exits 0 | `node dist/index.js` answers yes. The path node was given and the path of the file it loaded are the same string
- VERIFIED | 2026-08-24 | cmd: git -C projects/changelogue log -1 --format=%B 13e2e9b (the fix commit records that every dev invocation and every test looked fine) | Every development run and every test run took that route, and every one of them worked

## Line 25

- VERIFIED | 2026-08-24 | cmd: with the 13e2e9b^ guard, ./node_modules/.bin/changelogue --version prints nothing and exits 0 (smoke.sh step 1 fails on the empty string) | `npx changelogue` answers no. And a no here is silent by design: no parse, no output, no error, exit 0

## Line 29

- VERIFIED | 2026-08-24 | https://docs.npmjs.com/cli/v10/configuring-npm/package-json | npm does not copy a package's bin into place. It writes a symlink at `node_modules/.bin/changelogue`
- VERIFIED | 2026-08-24 | projects/changelogue/package.json:24-26 | a symlink at `node_modules/.bin/changelogue` that points at `../changelogue/dist/index.js`
- VERIFIED | 2026-08-24 | cmd: in the repro, import.meta.url is file:///proj/node_modules/hello-cli/index.js while argv[1] is /proj/node_modules/.bin/hello-cli | When node loads that file, it resolves the symlink first, so `import.meta.url` holds the real path

## Line 31 (figure: two paths to one file)

- VERIFIED | 2026-08-24 | projects/changelogue/package.json:24-26 | What you typed, node_modules/.bin/changelogue, is a symlink to node_modules/changelogue/dist/index.js
- VERIFIED | 2026-08-24 | cmd: repro node -e printing process.argv[1] and import.meta.url side by side | process.argv[1] keeps the typed path. import.meta.url resolves the symlink and holds the real path

## Line 33

- VERIFIED | 2026-08-24 | cmd: wc -l pkg/index.js in the repro (7 lines: shebang, isEntryPoint, the guard, one console.log) | You can reproduce it with a seven-line package

## Line 35 (figure: repro terminal)

- VERIFIED | 2026-08-24 | cmd: the repro run saved as repro-output.txt (node on the file prints the greeting, exit 0; the .bin entry prints nothing, exit 0) | Running node on the file directly prints the greeting and exits 0
- VERIFIED | 2026-08-24 | cmd: readlink node_modules/.bin/hello-cli prints ../hello-cli/index.js | readlink shows the bin entry is a symlink to the same file
- VERIFIED | 2026-08-24 | cmd: repro node -e prints file:///proj/node_modules/.bin/hello-cli for the glued form | gluing file:// onto argv[1] produces a URL that matches neither

## Line 37

- VERIFIED | 2026-08-24 | cmd: npx vitest run at 13e2e9b^ (Tests 98 passed) | Why 98 tests could not see it

## Line 39

- VERIFIED | 2026-08-24 | projects/changelogue/src/index.test.ts:2-10 | The unit suite imports `buildProgram()` and drives it in-process
- VERIFIED | 2026-08-24 | cmd: a throwaway vitest test logging process.argv[1] prints the vitest binary path (node_modules/tinypool/dist/esm/entry/worker.js, the vitest worker) | Importing the module runs the guard once, with a vitest worker as `argv[1]`

## Line 41 (figure: three ways)

- VERIFIED | 2026-08-24 | cmd: throwaway vitest test logging process.argv[1] | A test file imports index.ts: argv[1] is a vitest worker, the guard is false
- VERIFIED | 2026-08-24 | cmd: repro, node on the file directly | A dev run of node dist/index.js: both sides hold the same path
- VERIFIED | 2026-08-24 | cmd: repro, ./node_modules/.bin/hello-cli prints nothing, exit 0 | the guard is false, and the process exits 0 having done nothing

## Line 43

- VERIFIED | 2026-08-24 | projects/portfolio/src/content/blog/building-pipeline-tooling-with-claude-code.mdx:8 | the same rule as the agent being only as good as the check that grades it

## Line 47

- VERIFIED | 2026-08-24 | projects/changelogue/src/index.ts:163-171 | Resolve the symlink before comparing, and build the URL with `pathToFileURL`
- VERIFIED | 2026-08-24 | cmd: node -e prints file:///a b/x.js for the glued form and file:///a%20b/x.js for pathToFileURL | which also breaks on a path with a space in it

## Line 61

- VERIFIED | 2026-08-24 | https://github.com/marko-builds/changelogue/blob/main/scripts/smoke.sh | The check I kept is scripts/smoke.sh. It packs the package
- VERIFIED | 2026-08-24 | projects/changelogue/scripts/smoke.sh:17-24 | It packs the package, installs the tarball into a throwaway project
- VERIFIED | 2026-08-24 | projects/changelogue/scripts/smoke.sh:39-45 | runs the tool through `node_modules/.bin` in a throwaway git repo with one commit
- VERIFIED | 2026-08-24 | projects/changelogue/scripts/smoke.sh:28-45 | It asserts three things: `--version` prints the manifest version, `--help` prints usage, and the repo produces output that names the commit

## Line 63

- VERIFIED | 2026-08-24 | cmd: smoke.sh with the 13e2e9b^ guard: SMOKE FAIL --version printed nothing through the bin symlink (the 2026-08-09 bug), exit 1 | I put the old guard back and ran the check. It failed, with the message written for this bug
- VERIFIED | 2026-08-24 | cmd: smoke.sh with HEAD src/index.ts: SMOKE PASS bin symlink works, exit 0 | I restored the fix and ran it again. It passed

## Line 65 (figure: suite vs smoke)

- VERIFIED | 2026-08-24 | cmd: npx vitest run at 13e2e9b^ and at HEAD, 98 passed both times | npx vitest run reports 98 passed, and npm run smoke reports SMOKE FAIL
- VERIFIED | 2026-08-24 | cmd: smoke.sh both arms, saved as smoke-output.txt | Right, with the fix: 98 passed, and SMOKE PASS, bin symlink works, exit 0

## Line 69

- VERIFIED | 2026-08-24 | https://deploylog.dev | changelogue is the changelog generator I built alongside DeployLog
- VERIFIED | 2026-08-24 | projects/changelogue/README.md:40 | the changelog generator I built alongside DeployLog, and it was not on npm yet
- VERIFIED | 2026-08-24 | cmd: npm view changelogue version returns E404 on 2026-08-24 | and it was not on npm yet
- VERIFIED | 2026-08-24 | cmd: git -C projects/changelogue log --date=iso (8155488 chore: publish-ready for v0.1.0 and 13e2e9b the fix are both dated 2026-08-09) | I found this on the day I was preparing the first publish
- VERIFIED | 2026-08-24 | https://docs.npmjs.com/cli/v10/commands/npm-publish | npm does not let you publish over a version, so a silent 0.1.0 would have stayed 0.1.0 on the registry
- VERIFIED | 2026-08-24 | projects/changelogue/package.json:3 | a silent 0.1.0 would have stayed 0.1.0 on the registry

## Line 73

- VERIFIED | 2026-08-24 | projects/changelogue/scripts/smoke.sh:24-29 | run it once the way a user will: `./node_modules/.bin/<name> --version` from a project that installed the tarball
