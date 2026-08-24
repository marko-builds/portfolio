# Claims ledger: solo-founder-observability

Post: `src/content/blog/solo-founder-observability.mdx`. Rows: `- STATUS | date | evidence | span`.
Locators are relative to the monolith root; `cmd:` rows were run on the date shown.

## Frontmatter and opener

- VERIFIED | 2026-08-24 | projects/deploylog/docs/runbooks/incident-response.md:12-15 | Sentry across three runtimes, two uptime monitors, a public status page, and one drill most people skip
- UNCHECKABLE | 2026-08-24 | rhetorical count, no artifact | a polite email three days later, or never
- VERIFIED | 2026-08-24 | projects/deploylog/docs/runbooks/incident-response.md:12-15 | Sentry across three runtimes, two uptime monitors and a public status page, then ran the drill
- VERIFIED | 2026-08-24 | projects/deploylog/docs/runbooks/incident-response.md:6-7 | There is no on-call rotation on a solo launch

## Intro

- VERIFIED | 2026-08-24 | projects/deploylog/README.md:5-6 | write release notes in Markdown, publish them to a hosted page and an embeddable widget
- VERIFIED | 2026-08-24 | context/projects.md:30 | It goes live on September 15

## Sentry

- VERIFIED | 2026-08-24 | projects/deploylog/sentry.client.config.ts:8-14 | All three share one DSN and only enable in production
- VERIFIED | 2026-08-24 | projects/deploylog/sentry.server.config.ts:3-7 | each needs its own Sentry init
- VERIFIED | 2026-08-24 | projects/deploylog/sentry.edge.config.ts:3-7 | Next.js code runs in three places inside one app
- VERIFIED | 2026-08-24 | projects/deploylog/sentry.client.config.ts:10-12 | 100% of traces, 10% of sessions recorded as replays, and 100% replay capture on errors
- VERIFIED | 2026-08-24 | projects/deploylog/sentry.client.config.ts:8-14 | Three Sentry inits, one per runtime, sharing one DSN and one production-only switch
- UNCHECKABLE | 2026-08-24 | elapsed time, no artifact | One gotcha cost me an evening
- VERIFIED | 2026-08-24 | projects/deploylog/sentry.client.config.ts:3-7 | that variable must be marked non-sensitive, and it only takes effect after a rebuild

## Uptime

- VERIFIED | 2026-08-24 | projects/deploylog/issues/done/02-uptime-monitors.md:33-35 | UptimeRobot polls two endpoints, and the pair is the point
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/api/ready/route.ts:15-30 | returns 200 with { status: 'ready' }, or a 503 that names the failed dependency
- VERIFIED | 2026-08-24 | projects/deploylog/src/lib/rate-limit.ts:54-57 | Supabase for the database, Upstash Redis for rate limiting
- VERIFIED | 2026-08-24 | cmd: curl -s --max-time 20 -w '\nHTTP %{http_code}\n' https://deploylog.dev/api/ready (printed {"status":"ready"} and HTTP 200; 2026-08-24 to 2026-09-15 is 22 days) | The readiness route polled on 2026-08-24, 22 days before launch
- VERIFIED | 2026-08-24 | projects/deploylog/docs/runbooks/incident-response.md:73-80 | with a pinned project id that never gets deleted
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/api/widget-data/route.ts:84-85 | The second is the public widget-data endpoint
- VERIFIED | 2026-08-24 | projects/deploylog/src/components/site/chrome.tsx:132-135 | Both feed a public status page, linked in the footer
- VERIFIED | 2026-08-24 | projects/deploylog/issues/done/03-public-status-page.md:15-16 | It costs nothing and answers "is it just me?" without a support email
- VERIFIED | 2026-08-24 | projects/deploylog/docs/runbooks/incident-response.md:26-27 | Two UptimeRobot monitors, one on the readiness route with its named dependencies and one on the widget-data endpoint

## The drill

- VERIFIED | 2026-08-24 | projects/deploylog/issues/done/02-uptime-monitors.md:38-40 | I created a throwaway monitor pointed at a route that 404s, and waited for the DOWN email
- UNCHECKABLE | 2026-08-24 | elapsed time, no artifact | The drill takes ten minutes and converts "should work" into "watched it work."
- VERIFIED | 2026-08-24 | projects/deploylog/issues/done/02-uptime-monitors.md:38-40 | now a real DOWN email has a known shape
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/solo-founder-observability/the-drill.svg | The drill in five steps: create a throwaway monitor, point it at a route that 404s, wait one check interval
- VERIFIED | 2026-08-24 | projects/deploylog/wiki/log.md:22-23 | I confirmed a real captured event end to end before calling it done

## The runbook

- VERIFIED | 2026-08-24 | projects/deploylog/docs/runbooks/incident-response.md:19-22 | All alerts route to a single inbox, there is no escalation because there is nobody to escalate to
- VERIFIED | 2026-08-24 | projects/deploylog/docs/runbooks/incident-response.md:49-58 | the fast path for a bad deploy is Vercel's instant rollback
- VERIFIED | 2026-08-24 | projects/deploylog/docs/runbooks/incident-response.md:5-7 | Future me, reading alerts on a phone at 2am, follows steps instead of improvising

## Close

- UNCHECKABLE | 2026-08-24 | elapsed time, no artifact | None of this took longer than a day
- VERIFIED | 2026-08-24 | projects/deploylog/wiki/log.md:22-23 | it has been watching the app since June
- VERIFIED | 2026-08-24 | https://deploylog.dev | well before the first user arrives. DeployLog is at deploylog.dev
