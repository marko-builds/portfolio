# Home page rebuild on the winning direction

**Type:** task
**Status:** open
**Blocked by:** ~~[02](02-register-ia-prototype.md)~~ resolved 2026-08-15, and
[08](08-light-dark-token-set.md) — **the conditional fired: light won**, so 08 is a hard blocker,
and 08 is itself blocked by [06](06-delete-game-project-pages.md).
**Estimate:** 1.5 sessions

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
