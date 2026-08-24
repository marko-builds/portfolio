# claims: one-product-four-repos

Ledger for `src/content/blog/one-product-four-repos.mdx`. One row per checkable fact, span verbatim
from the post, locator relative to the monolith root unless absolute, a URL, or `cmd:`. Written
2026-08-24 against the live artifacts, never from memory. Format and rules:
`scripts/claims-ledger-lint.py`.

Live probes run 2026-08-24 (all `--max-time 20`):
`npm view deploylog version bin` returned `0.5.0` with bin `deploylog` and `dpl`;
`curl -sI https://cdn.deploylog.dev/widget.js` returned 200 from `server: cloudflare`, 13769 raw
bytes and 4283 bytes gzip-encoded; `curl -sD- -o /dev/null "https://deploylog.dev/api/widget-data?projectId=1bcdf792-e1bf-4cbf-bf2b-65afbc875582"`
twice returned `cache-control: public`, `age: 0`, `x-vercel-cache: MISS` then `HIT`, and a `&bust=`
variant returned `MISS` again; `curl -sD- -o /dev/null https://deploylog.dev/p/deploylog/changelog`
returned `cache-control: private, no-cache, no-store, max-age=0, must-revalidate`;
`gh repo view` reports deploylog PRIVATE, deploylog-widget PUBLIC, deploylog-cli PUBLIC,
deploylogdev/action PUBLIC; `gh release list -R deploylogdev/action` lists v1.0.0 through v1.2.2.

## Excerpt (line 7)

- VERIFIED | 2026-08-24 | projects/deploylog/package.json:42 | DeployLog is a Next.js app plus three satellites
- VERIFIED | 2026-08-24 | cmd: curl -s --max-time 20 -H "Accept-Encoding: gzip" https://cdn.deploylog.dev/widget.js -o /dev/null -w "%{size_download}" (4283 bytes, server: cloudflare) | a 4 KB embeddable widget on Cloudflare, a CLI on npm, and
- VERIFIED | 2026-08-24 | https://github.com/marketplace/actions/publish-to-deploylog | a GitHub Action on the Marketplace. Splitting them was right
- VERIFIED | 2026-08-24 | /home/ms/.claude/projects/-home-ms-Projects-monolith/memory/deploylog-satellite-deploys.md:12 | stops meaning 'deployed', and I paid it twice

## Opener (line 8)

- VERIFIED | 2026-08-24 | cmd: ls -d /home/ms/Projects/monolith/projects/deploylog* (deploylog, deploylog-action, deploylog-cli, deploylog-widget) | DeployLog is one product delivered from four repos
- VERIFIED | 2026-08-24 | projects/deploylog-widget/README.md:43 | the Next.js app, a 4 KB embeddable widget on Cloudflare, a CLI on npm and a GitHub Action
- VERIFIED | 2026-08-24 | decisions/log.md:3889 | paid it twice before writing down the rule that stops a third time

## Body

- VERIFIED | 2026-08-24 | projects/deploylog/src/app/p/[slug]/changelog/page.tsx | it shows up on a public page, in a feed, and in a widget on your own site
- VERIFIED | 2026-08-24 | cmd: ls -d /home/ms/Projects/monolith/projects/deploylog* (four directories) | Four repos for a solo project sounds like overhead
- VERIFIED | 2026-08-24 | projects/deploylog-widget/package.json:8 | vanilla TypeScript compiled by esbuild to a single self-contained script (an IIFE)
- VERIFIED | 2026-08-24 | cmd: curl -s --max-time 20 -H "Accept-Encoding: gzip" https://cdn.deploylog.dev/widget.js -o /dev/null -w "%{size_download}" (4283 bytes) | about 4 KB gzipped, rendering into a closed Shadow DOM
- VERIFIED | 2026-08-24 | projects/deploylog-widget/src/widget.ts:217 | rendering into a closed Shadow DOM so the host page's CSS and mine
- VERIFIED | 2026-08-24 | projects/deploylog-widget/README.md:24-30 | Integration is one script tag with data attributes for project, position, and theme
- VERIFIED | 2026-08-24 | cmd: npm view deploylog version bin (0.5.0; bin deploylog and dpl both dist/index.js) | which installs the short alias dpl) posts entries from the terminal
- VERIFIED | 2026-08-24 | projects/deploylog-cli/src/index.ts:350-362 | dpl push -t "v1.2 shipped" --from-git --ai-summarize
- VERIFIED | 2026-08-24 | projects/deploylog-cli/src/push.ts:118 | builds the body from the commits since the last tag
- VERIFIED | 2026-08-24 | projects/deploylog/src/lib/ai-summarize.ts:9 | rewrites it into release notes for end users with Claude Haiku
- VERIFIED | 2026-08-24 | projects/deploylog-action/action.yml:2 | turning a GitHub release into a changelog entry
- VERIFIED | 2026-08-24 | projects/deploylog-action/action.yml:9-14 | Two inputs are required, api-key and project
- VERIFIED | 2026-08-24 | projects/deploylog-action/action.yml:33-48 | Four of the optional ones run the same Haiku rewrite
- VERIFIED | 2026-08-24 | projects/deploylog/src/lib/api-keys.ts:3 | authenticated with keys that start with dk_
- VERIFIED | 2026-08-24 | cmd: curl -sI --max-time 20 https://deploylog.dev (server: Vercel) | The app on Vercel at the top holds the dashboard, the public changelog pages and the API
- VERIFIED | 2026-08-24 | projects/deploylog-widget/README.md:43 | the widget on Cloudflare Pages, which ships when Pages runs the build
- VERIFIED | 2026-08-24 | cmd: npm view deploylog version bin (0.5.0 published) | the CLI on npm, which ships when a version is published
- VERIFIED | 2026-08-24 | https://github.com/marketplace/actions/publish-to-deploylog | the Action on the GitHub Marketplace, which ships when a release is tagged
- VERIFIED | 2026-08-24 | projects/deploylog/vercel.json | With one repo on Vercel, merge means live
- VERIFIED | 2026-08-24 | /home/ms/.claude/projects/-home-ms-Projects-monolith/memory/deploylog-satellite-deploys.md:12-13 | the widget ships when Cloudflare Pages builds it, the CLI ships when a version hits npm
- VERIFIED | 2026-08-24 | cmd: gh release list -R deploylogdev/action --limit 5 (v1.0.0, v1.1.0, v1.2.0, v1.2.1, v1.2.2) | the Action ships when a release is tagged and the Marketplace picks it up
- VERIFIED | 2026-08-24 | projects/deploylog-widget/.gitignore:2 | because the widget's dist/ is gitignored and Cloudflare Pages had no build command set
- VERIFIED | 2026-08-24 | /home/ms/.claude/projects/-home-ms-Projects-monolith/memory/deploylog-satellite-deploys.md:12 | The fix was two fields in the Pages settings, a build command and an output directory
- VERIFIED | 2026-08-24 | projects/deploylog/docs/launch/go-no-go-jul14.md:18 | It was publishing the repo as-is, which meant a stale artifact
- VERIFIED | 2026-08-24 | projects/deploylog-widget/.gitignore:2 | A git push changes src/widget.ts, but dist/ is gitignored so the repo holds no bundle
- VERIFIED | 2026-08-24 | projects/deploylog-widget/package.json:8 | build command npm run build and output directory dist
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/api/widget-data/route.ts:13 | The widget's data endpoint runs on the edge
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/api/widget-data/route.ts:85 | serves with s-maxage=300, stale-while-revalidate=60. Five-minute cache
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/p/[slug]/changelog/rss.xml/route.ts:25 | The RSS and JSON feeds carry the same header
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/p/[slug]/changelog/feed.json/route.ts:25 | a changelog does not change every five minutes
- VERIFIED | 2026-08-24 | cmd: curl -sD- -o /dev/null --max-time 20 https://deploylog.dev/p/deploylog/changelog (cache-control: private, no-cache, no-store, max-age=0, must-revalidate) | the server-rendered changelog page shows it instantly
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/api/widget-data/route.ts:85 | keep getting the pre-publish payload for up to five minutes
- VERIFIED | 2026-08-24 | cmd: curl -sD- -o /dev/null --max-time 20 https://deploylog.dev/p/deploylog/changelog (cache-control: private, no-cache, no-store) | cache-control private and no-store, fresh on the next request
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/api/widget-data/route.ts:85 | with s-maxage 300 and stale-while-revalidate 60, answered from the edge copy
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/one-product-four-repos/two-clocks.svg | for 300 seconds the edge may still serve the old payload, for the next 60
- VERIFIED | 2026-08-24 | decisions/log.md:3889 | I hit this while recording demo footage
- VERIFIED | 2026-08-24 | cmd: curl -sD- -o /dev/null --max-time 20 "https://deploylog.dev/api/widget-data?projectId=1bcdf792-e1bf-4cbf-bf2b-65afbc875582" (age: 0, cache-control: public, x-vercel-cache: MISS then HIT on the second run) | check the x-vercel-cache and age headers, not the origin
- VERIFIED | 2026-08-24 | cmd: curl -sD- -o /dev/null --max-time 20 "https://deploylog.dev/api/widget-data?projectId=1bcdf792-e1bf-4cbf-bf2b-65afbc875582" (response says cache-control: public while route.ts:85 sets s-maxage=300) | Vercel strips the s-maxage on the way out, so the response only says cache-control: public
- VERIFIED | 2026-08-24 | cmd: curl -sD- -o /dev/null --max-time 20 "https://deploylog.dev/api/widget-data?projectId=1bcdf792-e1bf-4cbf-bf2b-65afbc875582&bust=1" (x-vercel-cache: MISS on the busted key while the plain key reads HIT) | A cache-busting query string does not help, because it is a different cache key
- VERIFIED | 2026-08-24 | cmd: curl -s --max-time 20 "https://deploylog.dev/api/widget-data?projectId=1bcdf792-e1bf-4cbf-bf2b-65afbc875582" (body: project slug deploylog, the dogfood project of decisions/log.md:3889) | the same curl against the live widget data endpoint for the demo project
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/one-product-four-repos/curl-headers.svg | cache-control public, age 301 and x-vercel-cache STALE
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/one-product-four-repos/curl-headers.svg | it reads age 30 and x-vercel-cache HIT
- VERIFIED | 2026-08-24 | cmd: git -C /home/ms/Projects/monolith/projects/deploylog-action tag (v1 major alias plus semver v1.0.0 to v1.2.2) | the Action's releases follow Marketplace conventions
- VERIFIED | 2026-08-24 | cmd: ls -d /home/ms/Projects/monolith/projects/deploylog* (four directories) | Four repos means four deploy pipelines to hold in your head
- VERIFIED | 2026-08-24 | https://deploylog.dev | DeployLog is at deploylog.dev.
