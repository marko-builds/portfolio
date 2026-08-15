# Home page rebuild on the winning direction

**Type:** task
**Status:** **built 2026-08-15 — awaiting Marko's review of the copy and the screens**
**Blocked by:** ~~[02](02-register-ia-prototype.md)~~ resolved 2026-08-15, and
~~[08](08-light-dark-token-set.md)~~ resolved 2026-08-15
**Estimate:** 1.5 sessions

## Built 2026-08-15

`src/pages/index.astro` rewritten on the locked direction. Portrait promoted from the prototype's
`public/proto/portrait.webp` to `public/portrait.webp`. Screens at true device scale:
`.qa-reports/ticket-03-home/` (1440x900 fold, proof, timeline, bottom; 390x844 fold and bottom).

### The mobile stacking order, settled — Marko, 2026-08-15

The question [ticket 02](02-register-ia-prototype.md) handed over. **The rail splits.** A compact
identity chip (56px portrait, name, role) stays above the headline; the facts and the link set drop
to the end of the page and become the contact band. A phone reader now meets who, then the claim,
then the proof, and finds the links where a phone reader looks for them.

Implemented with `display: contents` on `.rail` plus `order`, so the two halves become grid
children the shell can reorder. **The DOM stays single-source** — there is one link set, not a
desktop copy and a mobile copy, so `/#contact` resolves on both and neither can drift from the
other. On desktop the block's `Contact` heading is screen-reader-only; on mobile it becomes the
band's visible heading.

### The About paragraph — Marko, 2026-08-15

The seven-band list omitted About while this ticket inherited a settled decision about it. **It
stays, short, directly under the lede**, carrying the existing approved paragraph minus its "I'm
Marko, an AI engineer" opener, which the rail says two inches to the left. It frames the timeline
before the timeline shows a games-first history under a role with no employer line.

### Three defects the locked direction carried, found and fixed here

None of these were named by any ticket.

1. **`SiteNav` links to `/#work` and `/#contact`; the prototype's IA has neither anchor.** Shipping
   the prototype's section ids verbatim would have broken both nav links on every page. The proof
   band takes `id="work"` and the rail's meta block takes `id="contact"`. `SiteNav.astro` was not
   touched, per the prototype's own alignment lesson.
2. **`global.css:82` puts a mono `// ` before every `section h2`.** That is the dark register's
   voice, and screen A deliberately removed it (`content: none`) — mono survives on exactly one
   thing, the metric. The page scopes it off locally rather than editing `global.css`, which the
   devlog and project pages still read.
3. **A proof card's metric overflowed its card**, the same defect the prototype's round 2 fixed and
   that returned with longer metrics. `.metric` is `white-space: nowrap`, so the fix is short
   metrics, not a wrap rule.

### Numbers on the proof cards are real, and were read off the repos

`gh repo list marko-builds` 2026-08-15: `skill-vibe-test`, `adpreflight` and `duskpaper` are all
**PUBLIC**. **`claimcheck` does not exist on GitHub at all**, so the dashed fourth slot holds.
Every metric came from the repo's own README in the same pass, because the prototype's were
flagged placeholder: `4 probes over 10 turns` (turns 1, 6, 8, 10), `2 network rule packs` (Unity
Ads, Google App campaigns), `6 scene engines`.

### Open, and carried out of this ticket

- **The rail's "Book a call" points at `/call`, which 404s.** Verified against the preview server,
  not assumed. [Ticket 05](05-call-page.md) owns it. **This is a merge blocker**, not a page
  defect: [ticket 10](10-close-out.md) must not cascade the surfaces while it stands.
- **The fourth-card slot ships build vocabulary to a public reader**: "Fourth card. Reserved. Sized
  so the band does not reflow when it lands." That is written to the developer. Either give it
  reader-facing text or hold the grid open in CSS alone. Marko's call.
- **`global.css` still holds 13 dark-brand literals** — the old cyan `rgb(95 206 219)` in the
  filter bar and the contact-input focus ring, `#0D0D0D` on `::selection`, `rgba(31,31,31)` on the
  lightbox buttons. [Ticket 08](08-light-dark-token-set.md)'s "zero literals" grep was
  `--include='*.astro'`, so it never looked at the stylesheet. Belongs to
  [ticket 09](09-devlog-reading-surface.md) or [10](10-close-out.md), not to this diff.
- **The timeline renders here; [ticket 04](04-experience-timeline.md) stays open** for the half
  this page cannot do: the cascade of the "AI Engineer" title with no employer field into
  `cv-base.md`, the regenerated PDF, and LinkedIn.

### Acceptance, answered honestly

| Item | Result |
|---|---|
| Seven bands render in the locked direction | Yes, screens attached |
| Every proof card's repo verified public in the same pass | Yes, `gh repo list` above |
| The CV link resolves to a PDF that is not stale | **Superseded.** No CV link on the site (ticket 05 amendment). The `/cv` route still builds and resolves; the PDF is dated 2026-07-29 and predates the "AI Engineer" title, which is ticket 04's cascade to fix |
| `verify/gate.mjs` passes | **It cannot** (map tension 6) and this ticket does not claim it does. Calibrated by stash-and-rerun: **16 findings with and without this change, diff empty.** `src/pages/index.astro` moved from FAIL to **PASS** on the copy lint |
| `/avoid-ai-writing`, `marko` profile, over the copy and anything appended after | Run 2026-08-15 over the rendered page text. One P1 fixed, three judgment calls left for Marko (below) |

### Copy audit, `marko` profile — one fix applied, three for Marko

**Fixed.** The second current-role bullet read "Shipped open-source measurement tools, each with a
calibrated check suite" — a capability claim naming nothing, which is exactly what the specificity
floor exists to catch, and [ticket 04](04-experience-timeline.md) had already said the bullets come
from the named tools. Now: "Shipped skill-vibe-test and adpreflight as open source, each with a
check suite calibrated against a known-bad input." **L2 Drafted: Marko edits, Marko approves.**

**Judgment calls, not changed.**

- **"seamless"** is a Tier 1 always-replace word, and "Every loop is seamless by construction, not
  by luck" is duskpaper's own README sentence. A seamless loop is the precise technical term, and
  the `not X, but Y` shape here carries two real claims rather than a rhetorical frame.
- **"real git history"** trips the real/actual inflation rule (the contrast goes unsaid). It is
  also the published `changelogue` repo description, so it is standing product copy.
- Zero em dashes, zero arrows. The four timeline ranges were authored with em dashes, caught by the
  gate's copy lint, and rewritten to "Sep 2025 to present", which is the form
  [ticket 04](04-experience-timeline.md)'s own table uses.

## The direction is locked: A, light — 2026-08-15

Marko picked **A (light, new IA)** over the dark control in
[ticket 02](02-register-ia-prototype.md). Consequences for this ticket:

- **The build chain to here is now 06 → 08 → 03.** Nothing on this ticket starts until the token
  set exists, because building the page against today's dark tokens and repainting after is the
  rework the prototype was run to avoid.
- **The site diverges from `brands/marko/brand.json`**, per the map's decision 4. Renders stay
  dark; no light variant is added to the brand file.
- **The IA is settled by the prototype**, not re-opened here: identity rail, proof band leading,
  products demoted, timeline, devlog rows.
- **Two amendments made during the prototype review land in this page.** The current-role record
  is "AI Engineer" with no organization line ([ticket 04](04-experience-timeline.md)), and there
  is **no CV link** — the rail slot is "Book a call" ([ticket 05](05-call-page.md)).
- **The mobile stacking order is unresolved.** The prototype puts the rail above the headline on
  narrow screens, so a phone reader meets the photo and links before the positioning line. Decide
  it here.

## Question

Build `src/pages/index.astro` in the direction ticket 02 locks, with the information architecture
the prototype tested.

## The bands, in order

1. **Hero.** The approved headline and sub, already live and unchanged:
   "I build AI systems and prove they work." / "Most teams ship AI features they cannot check. I
   build the tools that measure whether they worked, and I publish the numbers."
2. **Identity rail.** Photo, name, role, Belgrade, Serbian (native), and the link set: email,
   GitHub, LinkedIn, **CV (PDF)**, **Book a call** (`/call`). `public/Marko-Stankovic-CV.pdf` is
   currently referenced nowhere in `src/`. **No availability statement** — settled 2026-08-14.
3. **Proof band, leading.** Inherited from `map-public-proof/14`: proof leads, products go second.
   Cards for `adpreflight`, `skill-vibe-test`, `duskpaper`, **built to take a fourth card** for
   `claimcheck` when `map-public-proof/07` lands. Each card states the through-line's local form
   and carries **a link, a number and a date**. Every card links straight to its GitHub repo.
   **Verify visibility with `gh repo list marko-builds` before any card ships** — `proof-portfolio.md`
   has been wrong about this before.
4. **Products, demoted.** deploylog (keeps its project page), habitagram, studio.
5. **Experience timeline.** Rendered from [ticket 04](04-experience-timeline.md).
6. **Devlog rows.** As today.
7. **Contact.**

## Also settled and inherited

- **The About paragraph must not open on three years of Unity and Unreal.** Games belong in it as
  range, not as the first sentence (`map-public-proof/14`). **L2 Drafted**: draft it, Marko edits,
  Marko approves.
- **The photo** (`map-public-proof/16`): ship the LinkedIn-consistent one small now, a better one
  later. The pixel-art `src/components/Avatar.astro` is dead code with real charm — give it the 404
  or the nav mark, **never** the About band or a hero. It is more techy, not less.
- **Game screenshots stay off the home page.**
- **Evidence images for the proof cards are net-new work, not a swap.** `index.astro` imports no
  images at all today, so there is no existing set to replace. This is
  `map-public-proof/04-visual-standard-per-post.md`'s output applied to a page instead of a post.
  If the images are not ready, the cards ship text-first rather than blocking the page — but say so
  in the ticket, do not let the absence read as a decision.

## Acceptance

- Home page renders the seven bands in the locked direction.
- Every proof card's repo is verified public in the same pass that ships it.
- The CV link resolves to a PDF that is not stale.
- `verify/gate.mjs` passes.
- `/avoid-ai-writing` with the `marko` profile runs over the copy, **and over anything appended
  after that pass**.
