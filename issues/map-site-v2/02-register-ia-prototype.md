# Register + IA prototype: two screens, light versus the dark control

**Type:** prototype
**Status:** resolved 2026-08-15 — **A (light) wins**
**Blocked by:** None
**Estimate:** 1 session

## The pick: A, light — Marko, 2026-08-15

**Light beats dark for this site.** The new IA in light is the locked direction; the dark control
loses. Both questions this ticket was opened to answer are closed: the page reads as approachable
without the terminal register, and light wins.

Acceptance item three fires: **[ticket 08](08-light-dark-token-set.md) is now a hard blocker of
[ticket 03](03-home-page-rebuild.md)**, and since 08 is itself blocked by
[ticket 06](06-delete-game-project-pages.md), the build chain is **06 → 08 → 03**. The map's table
carries the edge.

Consequences already recorded elsewhere, so they are not re-decided: the site diverges from
`brand.json` and renders stay dark (map decision 4); the current-role record loses its
organization line (ticket 04); the CV link is gone and the rail says "Book a call" (ticket 05).

**Unresolved and handed to ticket 03:** the mobile stacking order. Both variants put the rail
above the headline on narrow screens.

## Built 2026-08-15 — review it here

Branch **`proto/site-v2-register`**. Route `src/pages/proto/site-v2.astro`. **This route must never
reach main.**

```
npm run dev
http://localhost:4321/proto/site-v2?variant=a   A — Light, new IA (the proposal)
http://localhost:4321/proto/site-v2?variant=b   B — Dark, new IA, today's tokens (the control)
```

Arrow keys or the pink pill at the bottom cycle the variants; the URL updates so a screen is
shareable and reload-stable. The pill is deliberately ugly so it does not read as part of the
design. Screenshots at device scale: `.qa-reports/proto-site-v2/` (1440x900, 390x844, and a
full-page pass each).

**Sub-shape B, a throwaway route, chosen against the skill's stated preference.** Mounting the new
IA inside `index.astro` would mean gutting the live home page to host a prototype. The route still
carries the real `SiteNav`, real fonts and the real four devlog posts, so it is not judged in a
vacuum.

### What is real and what is placeholder

Real: the four live devlog posts pulled from the content collection; the three public proof repos;
the timeline records from [ticket 04](04-experience-timeline.md); the contact links already on the
site; the CV route (`/cv`, which already redirects to the PDF).

Placeholder: the proof cards' one-line descriptions and metrics (ticket 14 still owns those), and
the two timeline bullets on the current role.

### Deliberate calls made while building, each reversible

- **The fourth proof card ships as a sized dashed slot.** `gh repo list marko-builds` on
  2026-08-15 still shows **no claimcheck on GitHub at all**, so `map-public-proof/14`'s soft-block
  holds. The slot means the band will not reflow when it lands.
- **The photo is `claude-video-studio/studio/public/brands/marko/portrait.webp`**, downscaled to
  480px and staged at `public/proto/portrait.webp`. It is the portrait staged for Instagram on
  2026-06-17, and it is the only real photo in the workspace. **Confirmed good by Marko
  2026-08-15**, which closes the photo question `map-public-proof/16` handed over. The
  "better photo later" half of that decision is now optional, not queued.
- **Both palettes live in one block inside the prototype file.** Ticket 08 owns the real token
  set; nothing in that block should be hand-copied into `global.css`.

### One defect the prototype surfaced, which belongs to ticket 08

The light screen shipped with a **dark nav** on the first render. `SiteNav.astro:42` sets
`background: #0d0d0dcc` as a hex literal rather than a token, so redefining the `--color-*`
custom properties repainted every other token-driven rule and left the bar dark. That literal is
one of the 645 [ticket 08](08-light-dark-token-set.md) measured, and it is evidence for that
ticket's estimate: a token flip does not reach a hardcoded value, and the miss is invisible until
something renders. The prototype overrides it on one line.

### Round 2, 2026-08-15 — Marko's first pass on the screens

- **Photo: good.** Kept as-is.
- **Timeline: cut "Independent" and the Monolithiq invoicing-entity line.** Applied. Recorded as
  an amendment to the map's decision 8 and to [ticket 04](04-experience-timeline.md), because it
  cascades to `cv-base.md` and LinkedIn.
- **Header alignment.** He flagged the `> ms` mark and the work/devlog/contact links as
  misaligned. **The defect was the prototype's, not the site's.** `SiteNav.astro` and the live
  home page's `.frame` both use `max-width: 1000px; padding-inline: 56px`; the prototype's shell
  used `1120px / 2rem`, which pushed the mark 84px inside the rail and the links 84px inside the
  content edge at 1440px. Fixed by putting the shell on the nav's grid — the shared component was
  not touched. The mark now lines up with the portrait's left edge and the links with the proof
  band's right edge.

  One knock-on: the narrower content column split a proof card's meta line mid-phrase. The
  placeholder metric was shortened and `.proof-meta` now wraps as a unit.

### Round 3, 2026-08-15

- ~~**Photo re-cropped and re-centred**~~ at `1840x1840+410+187`. **Reverted 2026-08-15 — Marko:
  "the crop was good before."** The portrait is the source square resized, uncropped, which is how
  it was staged originally. What actually read as off was the *spacing*, not the framing, and a
  re-crop was the wrong fix for it. Recorded so it is not re-attempted.
- **The portrait was flush against the header.** `SiteNav` is `position: fixed` and 56px tall, and
  the shell's `padding-top` was `3.5rem` — exactly 56px, so it cleared the bar by zero and the
  photo snapped to it. Raised to `7rem` (nav height plus a full gap), and the rail's sticky `top`
  moved with it so it does not re-snap on scroll. Mobile went to `5.5rem`.
- **CV link removed from the site.** Reverses the map's decision 9; the rail slot now reads
  "Book a call". [Ticket 05](05-call-page.md) takes ownership of CV delivery and carries the gap
  this opens. The `/cv` redirect route was **not** touched.

### Open sub-question for the review, not resolved here

**On mobile the rail stacks above the headline**, so the first thing a phone reader sees is the
photo and the contact links rather than the positioning line. Both variants do this. Judge it on
the 390px shots; the fix is an order swap, not a redesign.

## Awaiting

Per the gate below: **the pick, and the date, written into this ticket.** If light wins,
[ticket 08](08-light-dark-token-set.md) becomes a blocker of
[ticket 03](03-home-page-rebuild.md) and the map's table needs that edge added.

## Question

Two questions get answered by one throwaway build, on the live route, with `/prototype`:

1. **Does the page read as approachable to someone who is not a terminal person?** This is the
   question Marko opened with on 2026-08-08 and again on 2026-08-14.
2. **Does light beat dark for this site?**

## What gets built

**Two screens, not four** (trimmed 2026-08-14 on the red-team's finding that two full directions in
both palettes re-litigates a call this map treats as settled):

- **Screen A — the new IA in light.** The full new structure, light palette.
- **Screen B — the dark control.** The same new structure, today's dark tokens.

Both screens carry the **new information architecture**, not today's structure. A light page with a
persistent identity rail is a different layout, so judging paint on the old structure answers the
wrong question. The IA under test:

- a persistent identity rail: photo, name, role, location, email / GitHub / LinkedIn / **CV**
- a proof band leading the page, products demoted beneath it
- experience timeline records
- the devlog rows

## What the screens vary beyond palette

From `map-public-proof/15-register-prototype.md`, inherited:

- **Type scale and measure.** Body size, line height, column width. The highest-leverage warmth
  lever and it costs nothing.
- **Whitespace density.** Section rhythm.
- **How much mono survives.** One mono detail as an accent, versus mono as the page's voice.
- **The proof cards' visual weight** against the demoted product cards.

## Gate

Present at **true device scale with the exact params attached**, and hold the commit gate until
Marko picks. He reviews visual work frame by frame (memory `video-review-bar`). This ticket ends at
a **locked direction**, not a shipped page.

## Acceptance

- Two screens rendered, presented at device scale, params attached.
- Marko picks one, and the pick is written into this ticket with the date.
- If light wins, [ticket 08](08-light-dark-token-set.md) becomes a blocker of
  [ticket 03](03-home-page-rebuild.md).

## Notes

Do not let this grow into the rebuild it was scoped away from. If the winning direction's build
runs past its estimate in [ticket 03](03-home-page-rebuild.md), that overrun is named in the map,
not absorbed silently.
