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
8. ~~**The current period is titled "AI Engineer, Independent"**, Belgrade, Sep 2025 to present,
   with Monolithiq LLC named as the invoicing entity rather than the employer.~~
   **Amended 2026-08-15 by Marko, reviewing the prototype:** the current period is titled
   **"AI Engineer"**, Belgrade, Sep 2025 to present, with **no organization line at all**. Both
   "Independent" and the Monolithiq invoicing-entity line are cut. Still **a new decision
   originating here**, not a fact read out of the CV, and it still **cascades outward** to
   `cv-base.md` and LinkedIn — the cascade now carries a record with no employer field, so whoever
   executes it must not reintroduce one to fill the gap.
9. ~~**The identity rail carries a CV link.**~~ **Reversed 2026-08-15 by Marko, reviewing the
   prototype: no CV link anywhere on the site.** The CV goes out through the call instead, so the
   rail carries "Book a call" in that slot and
   [ticket 05](05-call-page.md) now owns CV delivery — including the gap this opens, which is
   recorded there. **The `/cv` redirect route stays** (`astro.config.mjs:15`): sent applications
   already carry that URL, and removing the link is not removing the route.
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

| # | Title | Type | Blocked by | Est | Status |
|---|---|---|---|---|---|
| [01](01-stale-sweep-and-tagline.md) | Stale-status sweep, handover, and the dropped tagline cascade | task | None | 0.25 | **resolved 2026-08-15** |
| [02](02-register-ia-prototype.md) | Register + IA prototype: two screens, light vs the dark control | prototype | None | 1.0 | **resolved 2026-08-15 — A (light) wins** |
| [03](03-home-page-rebuild.md) | Home page rebuild on the winning direction | task | ~~06 → 08 → 03~~ cleared | 1.5 | **resolved 2026-08-15** |
| [04](04-experience-timeline.md) | Experience timeline records + the current-role title cascade | task | None | 0.5 | open |
| [05](05-call-page.md) | The `/call` page: intake survey, Formspree, appointment link | task | None | 0.75 | **resolved 2026-08-15** |
| [06](06-delete-game-project-pages.md) | Delete the two live game project pages and their screenshots | task | None | 0.25 | **resolved 2026-08-15** |
| [07](07-wordmark-blink.md) | Wordmark: drop the blink across every surface | task | None | 0.1 | **resolved 2026-08-15** |
| [08](08-light-dark-token-set.md) | Light/dark token set, toggle, favicon and OG card | task | 02, 06 | 1.0 | **resolved 2026-08-15 — light only** |
| [09](09-devlog-reading-surface.md) | Devlog reading surface pass | task | 02 | 0.75 | **resolved 2026-08-15** |
| [10](10-close-out.md) | Close-out: re-baseline the gate, cold read, then cascade the surfaces | task | ~~04~~ released; rest resolved | 0.5 | **resolved 2026-08-15** |
| [11a](11a-og-card-copy-fix.md) | OG card: it is emitting the retired positioning | task | None | 0.25 | open — **do this first** |
| [11](11-mark-favicon-og.md) | The mark: a new favicon and logo | task | None | 0.5 | **resolved 2026-08-15 — the chevron alone, tile `#EAE7DF`** |

~~Fastest unblocked win is **01** (the tagline has been emitting the drawered identity since
2026-08-08).~~ **Resolved 2026-08-15.** The tagline leak is closed; ticket 01's `portrait` defect
was refuted (a repo-root `ls` against a Remotion `staticFile()` path) and the field was left
alone.

**Resolved 2026-08-15: 01, 07, and 02 — which picked A, light.** The light/dark question is
closed, so the conditional edge fired and **08 is now a hard blocker of 03**.

**01, 02, 06, 07 and 08 all resolved 2026-08-15.** The whole 06 → 08 → 03 chain is cleared down to
its last link: **03 is unblocked and is the next thing to build**, 1.5 sessions.

**04** (0.5) and **05** (0.75) are unblocked and off the path. **09** (0.75) is unblocked. ~~**10**
closes out and must re-baseline `verify/gate.mjs` (tension 6) — including its token check, which
now contradicts decision 4 and cannot pass as written.~~ **Gate re-baselined 2026-08-15**; the scope
line now lives in [ticket 10](10-close-out.md) itself rather than only here, which is why it was
missing from the ticket for the whole stream. See "Tension 6 closed" below.

**03 built 2026-08-15**, so six of eleven tickets are done. Two things it produced that the rest of
the map has to carry:

- **`/call` is linked from the identity rail and 404s** until [ticket 05](05-call-page.md) ships.
  Verified against a preview server, not assumed. **Ticket 10 must not cascade the surfaces while
  this stands** — a live home page whose most prominent rail link is dead is worse than no link.
  This makes **05 the highest-priority remaining ticket**, ahead of 04 and 09.
- **`global.css` holds 12 dark-brand literals that ticket 08 never saw, and all of them are dead
  CSS.** Verified 2026-08-15: `filter-btn`, `filter-bar`, `project-card`, `contact-input`,
  `hero-name`, `card-glow` and `card-accent` are referenced by **zero source files**, so this is
  rules to delete, not a repaint. Belongs to **09 or 10**. Ticket 08's sweep missed them twice: the
  scope was `--include='*.astro'` so it never read the stylesheet, and the pattern was `#hex` so it
  could not match an `rgb()`/`rgba()` literal anywhere, including inside `.astro` files. A scope
  narrower than the claim *and* a pattern narrower than the class, which is the shape the root
  `CLAUDE.md` names twice over.

**03 signed off 2026-08-15** after one review fix: devlog code blocks were rendering
highlight.js's **github-dark** palette on a white block, measured at **1.54** contrast. Swapped to
the light theme, separation moved from the fill to the border (tinting the block drops 9 of 20
token classes below AA, versus 2 on white — the third-party palette pins the background), and the
2 remaining classes remapped to `--color-warm`. Now 21 classes measured, zero below AA, min 4.57.
Detail in [ticket 03](03-home-page-rebuild.md).

~~**11 is new and is not a build ticket.** The favicon and OG card left 08 when Marko asked to
discuss a new mark rather than recolour the old one. It needs a conversation before it can be
scoped.~~

**Conversation held 2026-08-15. Two outcomes.**

**The mark is the `>` chevron alone**, teal on paper, aurora and sun cut. The current tile does
three jobs at a size that fits one, the one-shape mark already exists as `SiteNav.astro`'s `> ms`
wordmark, and making the tab icon that same glyph is the first thing to connect the wordmark, the
favicon and the social card. duskpaper's lineage survives where it renders: its own repo and every
studio render, all still dark. Ticket 11 is now scopeable at 0.5.

**The OG card split out as [11a](11a-og-card-copy-fix.md) and jumped the queue.**
`public/og-default.png` reads "> MarkoStankovic(Developer);\_" and "I build software products and
ship them." — the retired identity, the drawered tagline, and the cursor ticket 07 removed. It is
the `og:image` fallback for every page without its own, so it is what a recruiter sees whenever
the site link is pasted anywhere.

**[Ticket 01](01-stale-sweep-and-tagline.md) could not have caught it and was not wrong.** It
fixed `brand.json` and grepped for the old string. The card was rendered months ago and the words
are pixels. **This is one step past the root `CLAUDE.md` sweep rule: a rendered asset carries text
no text search can see.** When an identity changes, the sweep needs an inventory of *rendered*
artifacts — OG cards, banners, thumbnails, favicons, README heroes — each one opened rather than
grepped. 11a's acceptance carries that inventory pass.

**Revised order for what is left: 11a → 05 → 04 → 09 → 11 → 10.** 11a because it is live and
wrong on the priority-#1 lane; 05 because ticket 03 shipped a rail link to a route that 404s.

**11a and 11 both built 2026-08-15**, out of that order — 11 was taken early because its direction
was already named and it is 0.5. ~~**Eight of eleven tickets are done; what is left is 05, 04, 09,
then 10.** 05 stays the highest priority: the identity rail still links a `/call` route that
404s.~~

**05 resolved 2026-08-15, and the dead rail link is closed** — verified against a server, not
assumed. ~~**Nine of eleven are done; what is left is 04, 09, then 10.**~~ Ticket 10's cascade is
no longer blocked by a 404.

**10 resolved 2026-08-15, and the stream is closed on evidence.** The destination's done-condition
is met: a `/cold-read` of the **live** home page returns **no findings in classes (a), (b) or (c)**,
3 of 3 samples on each, free-form and mechanically. PR #10 merged mid-session and deployed green, so
the read was of the real site rather than of a page one PR behind.

**One blocking finding, fixed inside the ticket.** `/call` read standalone could not tell a reader
what Marko does for work (0 of 3). It is a **landing surface** — the URL pasted into a reply, reached
without passing the home page — so it now carries the home page's through-line verbatim, and the same
probe answers 3 of 3. **The timeline's standalone NOs on (b) and (c) were judged scope artifacts and
not defects**: an experience section is not asked to carry repo links and a contact form, and scoring
it as though it were is the narrower-scope-than-claim shape this map has hit repeatedly.

**Every read stopped in the same place, and it is a decision rather than a defect.** The current role
has no employer line, so all three reads flagged it and one said a hiring manager would "pause or lose
trust in the rest of the document". That is decision 8 working as specified and **tension 2 confirmed
by an independent instrument three times** — now measured rather than predicted. Not reopened here.

**Two things the cascade found that no row could have told it**, both recorded in
[ticket 10](10-close-out.md): `proof-portfolio.md` listed `habitagram.app` as a live link and it
serves a **Namecheap domain-parking page** (apex HTTPS times out; the Cloudflare Pages wiring is
Marko's step and never completed), and ticket 05's Formspree probe **could not fail as specified** —
its spec named the right status codes and omitted the request shape, and a bare POST returns the same
`400` for a real form and a nonsense one.

**Eleven of eleven tickets are now resolved except [04](04-experience-timeline.md)**, whose one
remaining step is the LinkedIn edit Marko is doing himself.

**09 resolved 2026-08-15**: built, reviewed the same day (`/review-diff`, two axes plus a seam pass;
three blocking findings and eleven smaller ones, all fixed, all re-verified from a build), and
through the eyeball gate on the post-review screens. **Ten of eleven are done; what is left is 04,
then 10.** Four things it produced that the rest of the map has to carry:

- **The dead-CSS literals in `global.css` are gone, and they were never free.** Vite bundles that
  stylesheet into the **blog-post** chunk, so the 12 dead rules shipped on the reading surface and
  nowhere else: 26,886 → 24,782 bytes, and zero retired dark-brand literals left in any built CSS
  or HTML. Two survivors are recorded in ticket 09 for **ticket 10**: `.lb-btn`'s `#1f1f1f`, and
  `index.astro:431`'s `max-width: 68ch`, which **does not constrain anything** — Geist's `0`
  advance is 11.92px against a 7.95px average character, so 68ch resolves to 810px. Harmless where
  it sits; wrong the moment it is copied, which is exactly how it reached the reading surface.
- **Tailwind v4's utilities are layered and `global.css` is not, so `h1, h2, h3 { font-family:
  var(--font-mono) }` beats `font-sans` regardless of specificity.** The post title shipped mono
  with the class in the markup and the page unchanged. Any future surface that reaches for a
  Tailwind font utility on a heading will hit this; scoped `<style>` or an inline family is the
  way, which is what `index.astro` and `call.astro` already do by accident of how they were built.
- **A third sighting of the map's own recurring failure**, this time in ticket 09's own scope
  line: it named blockquotes, figures and image captions as "the elements the posts actually use",
  and counted from the built HTML, all three render **zero** times across every post including the
  drafts, while the two that carry the surface — 82 paragraphs and 27 inline code chips — were not
  named. Ticket 11a's OG card, ticket 05's Formspree field, and now this: **each was written
  before anyone opened the thing it described, and each read as settled because of it.**
- **A fourth sighting, and this one was in the correction rather than the claim.** The review found
  four numbers wrong in ticket 09's own write-up, including two of the line numbers it was handing
  forward to ticket 10 as breadcrumbs (`index.astro:113` for the `68ch`, which is at `:431`;
  `index.astro:141` for the mono-for-metadata rule, which is at `call.astro:181`). The write-up was
  the most carefully measured document in this map and it still shipped four wrong pointers, so the
  lesson is not "count more" but **cite a line only after opening it** — the same move the ticket
  had already made twice against other people's counts. Two related shapes the review names, both
  now recorded in ticket 09 for **ticket 10**: `verify/gate.mjs`'s copy lint **has never examined
  `index.astro` at all** (its skip state flips at `:139` on a prose mention of a tag and never flips
  back), and a comment in a diff can assert a safeguard that measurement refutes — a `(hover: none)`
  rule shipped on the claim that it was restoring behaviour the deletion would have taken, when the
  button had been hover-only on touch all along.

Two things ticket 05 produced that the rest of the map has to carry:

- **The site now depends on two external accounts that no check in this repo can see**: a Formspree
  form (`portfolio-website`, notifying smankovic@gmail.com) and a Google Calendar appointment
  schedule. Both were verified live and calibrated against a known-bad control, and **both can
  break silently at any time without a single file in this repo changing**. Ticket 10's close-out
  should probe them rather than assume them: a `POST` to the form endpoint that returns `400 EMPTY`
  rather than `404 FORM_NOT_FOUND`, and a `HEAD` on the short link that 302s rather than 404s.
- **A documented field name is not a supported field name.** The page was first built on Formspree's
  `_next` redirect, taken from this ticket's own text. `_next` has left their special-fields list
  and the redirect that replaced it is paid-plan only, so a free-plan submission would have stranded
  the reader on formspree.io with no way back — and the page would have looked entirely correct
  until the first real submission. This is the map's second sighting in two days of a claim that
  reads as settled because it was written before anyone checked (the first was ticket 11a's OG
  card). **Checking a third-party contract costs one fetch; inheriting it from a ticket costs a
  silent break in production.**

Two things ticket 11 produced that the rest of the map has to carry:

- **`public/favicon.svg` is now a source file with a generator behind it**
  (`scripts/render-icons.sh`, the repo's first `scripts/` entry). Any later change to the mark is a
  one-line edit plus a re-run, never a hand-edited PNG. This is the structural answer to 11a's
  finding that a rendered asset carries words and shapes no grep can see: **OG card v1 had no
  source at all, and neither did the old favicon set** — which is exactly why both went stale
  invisibly. Every rendered artifact this lane ships should leave a source and a regenerator behind
  it, and ticket 10's cascade should check for one.
- **`site.webmanifest`'s two colours were the last `#0B0E15` in a shipping surface.** The only one
  left under `src/` or `public/` is a text fill in
  `public/images/blog/relic-rush-obstacle-system/difficulty-ramp-chart.svg:6`. It belongs to
  [ticket 09](09-devlog-reading-surface.md), together with the dark-brand literals in the other
  blog diagram SVGs and in `Avatar.astro` — a larger set than 09 currently describes, and a
  different one from the 12 dead-CSS literals already recorded above.

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
   work**, read chronologically games-first. ~~The "AI Engineer, Independent" entry carries the
   position.~~ **Corrected 2026-08-15:** "Independent" was cut (decision 8 above), so the entry has
   no employer and no longer explains itself — **the bullets carry the position**, which is why
   [ticket 04](04-experience-timeline.md) makes them the load-bearing part. Accepted 2026-08-14
   with the facts stated; the tension got sharper, not softer, when the word came out.
3. **Deleting the game project pages while `RelicRush` is a live lane** and November game posts are
   planned on an AI angle (`publishing-schedule.md:74`). The pages return in a different form or
   the call is revisited then, not silently.
4. ~~**No availability statement, but a booking page and a CV link.** Judged not contradictory: a
   booking link serves anyone.~~ **Corrected 2026-08-15:** decision 9 above reversed the CV link,
   so there is no CV link anywhere on the site and half this tension no longer exists. What remains
   is the booking page with no availability statement, and that judgement stands unchanged: a
   booking link serves anyone. CV delivery moved to [ticket 05](05-call-page.md).
5. **Six internal links in two withheld drafts point at `/blog/<slug>` when the route is
   `/devlog/<slug>`** (`relic-rush-pivot.mdx`, `relic-rush-obstacle-system.mdx`). Both are
   `draft: true` and out of the drain, so this is a November problem for whoever ships them, not
   this stream's. Recorded so it is not rediscovered.

   **Corrected 2026-08-15.** `astro.config.mjs:10-16` declares `'/blog': '/devlog'` and
   `'/blog/[slug]': '/devlog/[slug]'`, and the build emits the redirect stubs, so the **prefix**
   is not the problem it was recorded as. The same block declares `'/cv':
   '/Marko-Stankovic-CV.pdf'`, which is what let decision 9 be reversed without losing the route.

   **Amended again during [ticket 06](06-delete-game-project-pages.md), because the first
   correction was too strong.** The redirects fix the prefix but not the target: the posts those
   links point at (`object-pooling-endless-runner`, `relic-rush-pivot`) are themselves
   `draft: true` and are not built at all, so a redirect lands on a 404. Verified 2026-08-15 —
   all five posts in that cluster are drafts. **Nothing broken ships, because neither end is
   published**, and that is the real reason this is safe, not the redirects. Whoever drains these
   in November has to publish them as a set or fix the links, and a redirect will not save them.

6. **`verify/gate.mjs` cannot pass, so it cannot gate this map.** It fails 7 checks against a
   baseline captured 2026-07-03 at main `2bc6308` — route parity and three devlog bodies (the
   Unity posts went `draft: true` on 2026-08-09, four new posts and `/cv` shipped since), copy
   lint on two files this map does not touch, and a "main untouched" assertion 40+ commits stale.
   Calibrated by stash-and-rerun: identical red with and without ticket 07's change. Re-baselining
   belongs to [ticket 10](10-close-out.md); until then no ticket may cite it as a green signal.

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
