# claims: multi-tenant-uniqueness-postgres

Row format: `- STATUS | YYYY-MM-DD | evidence | span` (span last, six or more words verbatim from the post).
Locators are relative to the monolith root unless they are a URL or a `cmd:`.

## Frontmatter

- VERIFIED | 2026-08-24 | decisions/lab-notes-digested.md:305 | I spec'd a pre-insert slug check for DeployLog and a review caught it as structurally impossible
- VERIFIED | 2026-08-24 | projects/deploylog/issues/prd-launch-security-billing-remediation.md:106-110 | Under row-level security the app can only see one tenant's rows. In a multi-tenant Postgres database the UNIQUE constraint is not a backstop

## Body

- VERIFIED | 2026-08-24 | projects/deploylog/package.json:42 | a Next.js app on Supabase with one Postgres database shared by every customer
- VERIFIED | 2026-08-24 | decisions/lab-notes-digested.md:305 | The reviewer, an adversarial plan-review agent with no context on the feature, did not object to the idea
- VERIFIED | 2026-08-24 | cmd: grep -ciE 'create table' and 'enable row level security' over projects/deploylog/supabase/migrations/*.sql, 16 distinct tables and 16 static enable statements, one per table | sixteen tables, sixteen enable statements, and an event trigger
- VERIFIED | 2026-08-24 | projects/deploylog/supabase/migrations/20260619010000_advisor_hardening.sql:85-87 | an event trigger that switches it on for any table created later
- VERIFIED | 2026-08-24 | projects/deploylog/src/lib/supabase/server.ts:5-9 | the Supabase client built from the user's cookies
- VERIFIED | 2026-08-24 | projects/deploylog/supabase/migrations/20260409000000_initial_schema.sql:142-157 | RLS filters every query it makes down to rows the caller's organization owns
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/api/projects/route.ts:39-42 | Another tenant's `my-app` project is invisible to the query by design
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/multi-tenant-uniqueness-postgres/rls-bubble.svg | the insert of my-app fails with 23505 on projects_slug_key, raised by the row the query could not see
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/multi-tenant-uniqueness-postgres/check-then-insert.svg | The constraint alone is one insert statement that returns 201 or 23505, atomic, with no read and no privilege escalation
- UNCHECKABLE | 2026-08-24 | rhetorical count (two statements), no artifact | The classic argument against check-then-insert is the race window between the two statements
- VERIFIED | 2026-08-24 | projects/deploylog/src/lib/public-data.ts:5-12 | because public changelog URLs resolve slugs across all tenants
- VERIFIED | 2026-08-24 | projects/deploylog/supabase/migrations/20260704000000_projects_global_slug_unique.sql:6-21 | existing cross-org collisions got suffixed `-2`, `-3` by creation order before the constraint could apply
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/api/projects/route.ts:63-73 | Postgres reports a unique violation as error code 23505, and inside the create route's insert loop it is the one error that does not end the request
- VERIFIED | 2026-08-24 | projects/deploylog/src/lib/slug.ts:41-45 | on 23505 retries with `base-2` up to `base-10`, ten attempts in all
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/api/projects/route.test.ts:133-149 | Only when every candidate collides does the user see a 409 asking for a different name
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/api/projects/route.ts:78-86 | only if all ten collide does the route answer 409 with: Could not generate a unique URL for this project name. Try a different name. MAX_SLUG_ATTEMPTS is 10 in src/lib/slug.ts
- VERIFIED | 2026-08-24 | projects/deploylog/src/app/api/projects/route.ts:76-77 | confirming another tenant's slug would itself be a small information leak
- UNCHECKABLE | 2026-08-24 | rhetorical count, no artifact | Your query runs inside one tenant's bubble, so it validates against a fraction of the data
- VERIFIED | 2026-08-24 | projects/portfolio/public/images/blog/multi-tenant-uniqueness-postgres/invariant-rule.svg | let the database throw 23505, translate at the boundary into a 409 with a generic message
- VERIFIED | 2026-08-24 | projects/deploylog/src/lib/supabase/service.ts:4-9 | There is a service-role client that bypasses RLS, and the temptation is to use it for the check
- VERIFIED | 2026-08-24 | decisions/lab-notes-digested.md:305 | No test ran, because there was no code yet. The plan went through an adversarial review
- VERIFIED | 2026-08-24 | .claude/agents/plan-review-redteamer.md:4-6 | an agent with no context on the feature and one job, poke holes
- VERIFIED | 2026-08-24 | cmd: curl -sI --max-time 20 https://deploylog.dev/ (HTTP/2 200 on 2026-08-24) | DeployLog is at deploylog.dev.

Note: the closing line normalizes to four words, under the linter's six-word span floor, so the row above cannot cover it. The check was run; the linter cannot record it.
