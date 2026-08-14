# Map: markostankovic.org v2 — the recruiter-and-peer surface

_Charted 2026-08-14 from a `/grill-me` session (6 rounds), red-teamed the same day. Lane:
`projects/portfolio/`. Feeds `projects/job-search/` (priority #1)._

## Where this came from

Marko brought a reference portfolio he liked: `suzi-omega.vercel.app`, light, dense, readable. The
teardown found it is a client-acquisition brochure with fabricated content — a Vite SPA under the
name "Suzuki Taro", template projects (E-Commerce Platform, NFT Marketplace) with **zero links to
any repo or live URL**, unattributed testimonials, a self-serve review form, and a hidden `/admin`
panel. What is good about it is the **information architecture**, not the content model. Its
projects are unfalsifiable by construction, which is the exact inverse of Marko's position.

So this map steals the chassis and fills it with the opposite content: every card carries a link,
a number and a date.

## Destination

markostankovic.org answers, in one scroll, what a recruiter and a peer each need: what Marko does,
what he has built with links they can open, who he worked for and when, and how to reach or book
him.

**Done when** the pages are live **and** a `/cold-read` pass over the home page, the timeline and
`/call` returns **no findings in these three classes**: (a) the reader cannot say what Marko does
for work, (b) the reader cannot name one thing he built or how to verify it, (c) the reader cannot
find a way to contact him. Anything else the cold read flags is input to a later pass, not a
blocker. This wording exists because "comes back clean" is a judgment, and a done-condition that
cannot fail is not a done-condition.

## Budget and rate

**1 day/week, targeting end of September 2026.** Ticket estimates below total ~6.6 sessions.

**The overrun is accepted and unallocated — stated, not hidden.** `issues/map-public-proof/map.md`
lines 121-129 measured claimcheck plus the RAG service at 2.25-3 days/week, which consumes the
**entire** 2-3 day budget on its own, with the blog drain and tickets 09/10 already demoted to
slack-only work. This is a **fifth** stream against a budget with no slack in it, and applications
keep first claim.

Marko chose "no displacement" for the budget and "nothing, it just runs longer" for the cut line,
both on 2026-08-14, with the arithmetic in front of him. **This map therefore has no pre-committed
cut line and does not claim the other streams absorb it.** They cannot. If this stream runs past
end of September, it runs longer and the other four move less. That is the accepted cost.

**Collision to watch:** the target window overlaps DeployLog's Sep 15 launch prep, which appears in
no map as an hours consumer.

## Decisions settled 2026-08-14

### Register and paint

1. **The light/dark gate is collapsed.** `issues/map-public-proof/15-register-prototype.md`
   sequenced a dark-only register prototype with light held in reserve as an escape hatch.
   Superseded by [ticket 02](02-register-ia-prototype.md).
   - The old gate's stated ground was that a light flip "cascades past this site" through the
     studio's `brand.json`. **Verified 2026-08-14: that is a brand policy, not a coupling.**
     `src/styles/global.css:10-21` holds the tokens as hand-copied hex literals, and nothing in
     `src/`, `astro.config.mjs` or `package.json` reads `brands/marko/brand.json`.
   - Second ground: Marko pulled toward light twice independently (scribe.com, 2026-08-08; this
     reference site, 2026-08-14).
2. **The prototype carries the new information architecture**, not a repaint of the current
   structure. A light page with a persistent identity rail is a different layout, so judging paint
   on the old structure would answer the wrong question.
3. **Two screens, not four.** One new IA direction in light, plus today's dark page as the control.
   Trimmed from four on the red-team's finding that two full directions in both palettes
   re-litigates a call this map says is already settled.
4. **If light wins, the site diverges from `brand.json`.** Renders stay dark. No light variant is
   added to the brand file; the studio has no consumer for one.
5. **`> ms` stays, the blinking cursor goes**, on every surface that renders `SiteNav.astro`.
6. **The devlog reading surface is in scope.** It is the highest-leverage warmth lever
   (`map-public-proof/15`), holds 44 of the site's core hex literals, and 14 posts are draining
   onto it.

### Structure

7. **Full timeline records on the page**, in the reference site's shape (role, company, location,
   dates, bullets). Three records plus education. See [ticket 04](04-experience-timeline.md).
8. **The current period is titled "AI Engineer, Independent"**, Belgrade, Sep 2025 to present, with
   Monolithiq LLC named as the invoicing entity rather than the employer. **This is a new decision
   originating here**, not a fact read out of the CV, and it **cascades outward** to
   `cv-base.md` and LinkedIn.
9. **The identity rail carries a CV link.** `public/Marko-Stankovic-CV.pdf` exists and is
   referenced nowhere in `src/` (verified 2026-08-14).
10. **No availability statement on the site.** No "open to work" pill, no status line.
11. **The two live game project pages are deleted** with their screenshots. See
    [ticket 06](06-delete-game-project-pages.md).
12. **`deploylog` keeps its project page.** The proof artifacts link straight to their GitHub
    repos and READMEs.

### New surfaces

13. **A `/call` page**: Marko's own styled intake survey posting to Formspree, revealing a Google
    Calendar appointment link on submit. No embed, no scheduler, no backend. Survey is skippable.
14. **Serbian + English is declined.** Every devlog post would need a Serbian twin permanently,
    against a backlog whose bottleneck is already Marko's reading hours. Belgrade roles are in
    scope (`fit-framework.md:235`) and he has applied to at least one Serbian-language posting
    (Orion Telekom), but those arrive through the posting and he answers them in Serbian directly.
    Cheap substitute: "Belgrade" and "Serbian (native)" as facts in the identity rail.

## Correction this map carries

`projects/portfolio/issues/01-08` are marked `Status: ready-for-agent`, dated 2026-07-03.
**They shipped.** `index.astro:179` comments "Vercel-monochrome direction (issue 03 pick)";
`verify/gate.mjs` and `verify/baseline/` exist (issue 02); the `website-builder` skill exists
(issue 08); the secondary templates render (issue 06); the site has been live since 2026-07-03.
Stale rows, not a backlog. [Ticket 01](01-stale-sweep-and-tagline.md) closes them.

## Tickets

| # | Title | Type | Blocked by | Est |
|---|---|---|---|---|
| [01](01-stale-sweep-and-tagline.md) | Stale-status sweep, handover, and the dropped tagline cascade | task | None | 0.25 |
| [02](02-register-ia-prototype.md) | Register + IA prototype: two screens, light vs the dark control | prototype | None | 1.0 |
| [03](03-home-page-rebuild.md) | Home page rebuild on the winning direction | task | 02, 08 (if light wins) | 1.5 |
| [04](04-experience-timeline.md) | Experience timeline records + the current-role title cascade | task | None | 0.5 |
| [05](05-call-page.md) | The `/call` page: intake survey, Formspree, appointment link | task | None | 0.75 |
| [06](06-delete-game-project-pages.md) | Delete the two live game project pages and their screenshots | task | None | 0.25 |
| [07](07-wordmark-blink.md) | Wordmark: drop the blink across every surface | task | None | 0.1 |
| [08](08-light-dark-token-set.md) | Light/dark token set, toggle, favicon and OG card | task | 02, 06 | 1.0 |
| [09](09-devlog-reading-surface.md) | Devlog reading surface pass | task | 02 | 0.75 |
| [10](10-close-out.md) | Close-out: cold read, then cascade the surfaces | task | 03, 04, 05, 06, 07, 08, 09 | 0.5 |

Fastest unblocked win is **01** (the tagline has been emitting the drawered identity since
2026-08-08). Cheapest is **07**.

## Amendments made to `issues/map-public-proof/`

Ownership of the site moves here. Handled in [ticket 01](01-stale-sweep-and-tagline.md); recorded
here so nothing is relitigated in two places:

- **14 (home page story)** — ownership moves here. Its settled content decisions are inherited by
  ticket 03 (proof leads, products demoted, game screenshots off the home page, About rewritten off
  the Unity opening) and by ticket 01 (**the brand.json tagline cascade, which was never done**).
- **15 (register prototype)** — ownership moves here, superseded by ticket 02. Its wordmark finding
  goes to ticket 07 and its favicon finding to ticket 08.
- **16 (photo and face)** — ownership moves here. Its settled call is inherited by ticket 03: ship
  the LinkedIn-consistent photo small now, better photo later; the pixel `Avatar.astro` gets a
  charm slot (404 or nav mark), never the About band or a hero.
- **`map.md` fog list, "A light mode"** — resolved by decision 1.
- **`map.md` scope-out, "A full rebuild of markostankovic.org"** — superseded 2026-08-14.

## Known tensions, recorded not argued

1. **Five streams, no displacement, no cut line.** See Budget.
2. **A full timeline under an AI-engineering face shows roughly one year of employed game-dev
   work**, read chronologically games-first. The "AI Engineer, Independent" entry carries the
   position. Accepted 2026-08-14 with the facts stated.
3. **Deleting the game project pages while `RelicRush` is a live lane** and November game posts are
   planned on an AI angle (`publishing-schedule.md:74`). The pages return in a different form or
   the call is revisited then, not silently.
4. **No availability statement, but a booking page and a CV link.** Judged not contradictory: a
   booking link serves anyone.
5. **Six internal links in two withheld drafts point at `/blog/<slug>` when the route is
   `/devlog/<slug>`** (`relic-rush-pivot.mdx`, `relic-rush-obstacle-system.mdx`). Both are
   `draft: true` and out of the drain, so this is a November problem for whoever ships them, not
   this stream's. Recorded so it is not rediscovered.

## Out of scope

- **Serbian, or any second locale.** Declined, decision 14.
- **A self-hosted scheduler.** Declined: availability sync, timezone math, double-booking
  prevention, event writes and intake storage is a backend on a static site, and it is the
  reference site's `/admin` panel arriving by the back door.
- **Testimonials or a review system.** No clients, and farming them would be the reference site's
  worst trait.
- **An AI assistant / chatbot on the site.** For someone whose position is that AI output needs
  checking, a generic chat wrapper is a negative signal.
- **The five withheld Unity devlog posts.** Their fate was settled 2026-08-09
  (`publishing-schedule.md:52-54`): out of the drain, staying `draft: true`, replaced from November
  by new game posts on an AI angle.
