# The OG card is emitting the retired positioning

**Type:** task
**Status:** resolved 2026-08-15 — shipped as `og-default-v2.png`; **one Marko-only step left**
(force the LinkedIn / X re-scrape, which needs his login)
**Blocked by:** None
**Estimate:** 0.25 session

## Why this is its own ticket

Split out of [ticket 11](11-mark-favicon-og.md) on 2026-08-15. That ticket bundled the favicon and
the OG card as one design question. They are not one question: the favicon is a 16px cosmetic, and
the OG card is the highest-traffic surface of Marko's positioning. It is currently wrong, and
fixing it should not wait on a design conversation about a tile.

## The finding, verified 2026-08-15

`public/og-default.png` reads, in baked pixels:

```
> MarkoStankovic(Developer);_

I build software products
and ship them.

markostankovic.org
```

Three things wrong at once:

1. **"Developer"** is the retired identity. The site says **AI Engineer** everywhere else.
2. **"I build software products and ship them."** is the drawered tagline. The approved headline is
   **"I build AI systems and prove they work."**
3. **The trailing `_`** is the blinking cursor [ticket 07](07-wordmark-blink.md) removed from the
   wordmark on every surface that renders `SiteNav.astro`. A PNG is not such a surface, so it
   survived.

`BaseLayout.astro:21` makes this the `og:image` fallback for **every page with no explicit
`ogImage`**, which includes the home page. Only the four devlog posts carrying their own
`ogImage:` frontmatter escape it.

So every time `markostankovic.org` is pasted into a recruiter email, a LinkedIn message or a job
application, the link preview says *Developer* and *I build software products and ship them*. That
is the drawered positioning going out on the priority-#1 lane's primary link.

## Why no sweep caught it, and the lesson that generalises

[Ticket 01](01-stale-sweep-and-tagline.md) closed the tagline cascade correctly: it set the
approved tagline in `brand.json` and grepped the studio for the old string. **The grep could not
have found this.** The card was rendered months ago and the words are pixels. There is no string in
a PNG to match.

Root `CLAUDE.md` already says to grep the identity being replaced rather than the words describing
its state. This is one step past where that rule reaches: **a rendered asset carries text that no
text search can see.** When an identity changes, the sweep has to include an inventory of rendered
artifacts — OG cards, banners, thumbnails, slide exports, favicons, README hero images — and each
one has to be *opened*, not grepped.

## What to do

Re-render the card with the current copy. This is a copy fix, not a redesign: keep the existing
dark art, the grid, the crosses and the layout. Only the words change.

```
> MarkoStankovic(AI Engineer);

I build AI systems
and prove they work.

markostankovic.org
```

Cursor removed. **Deliberately not relit for the light palette** — that pre-commits the card to a
paint direction while [ticket 11](11-mark-favicon-og.md)'s mark is still being drawn, and Marko
picked the copy fix, not the repaint.

## The cache trap, recorded so it is not discovered

**Ship it under a new filename.** LinkedIn, X, Slack and iMessage cache an OG image against its
URL, often for weeks. Overwriting `og-default.png` in place means every recruiter who has already
seen a preview keeps getting the old one, and so does every platform that scraped it. Write
`public/og-default-v2.png` and point `BaseLayout.astro:21` at it. The old file can stay or go; the
URL is what matters.

Then force a re-scrape on the surfaces that matter: LinkedIn Post Inspector and the X card
validator both accept a URL and refresh their cache on demand.

## Acceptance

- The rendered card says **AI Engineer** and **"I build AI systems and prove they work."** with no
  cursor. Verified by **opening the PNG**, not by the render command's exit code.
- Served under a **new filename**, with `BaseLayout.astro` updated to match.
- `dist/index.html`'s `og:image` meta resolves to the new URL. Check the built artifact, not the
  source.
- LinkedIn Post Inspector shows the new card for `https://markostankovic.org`.
- An inventory pass over the other rendered assets that could carry the same stale identity:
  `public/logo.svg`, the favicon set, and any banner or thumbnail in `public/images/`. **Open each
  one.** A grep cannot answer this question.

## What shipped, 2026-08-15

The card now has a **source**, which it did not before — that absence is the whole reason the stale
copy survived. `play/og_card_portfolio.html` + `play/render_og_card.sh` in the monolith; the next
repositioning is a one-line edit and a re-render.

The art was **reproduced, not re-designed**. Every value in the source (the #0B0E15 ground, the
150px grid, the four crosses, the 4px cyan hairline falling to 38%, the type sizes and the
#46505F outline) was measured off the July card's pixels. Rendering the July *copy* through the
new source and diffing against the original PNG gives a mean per-pixel difference of **0.86 of
765** (0.1%), with every text band inside 1px. That diff is the evidence that only the words moved.

Two layout variants were rendered because the headline lost a line (3 rows -> 2). **B is pinned**:
the block is optically centred between the wordmark and the URL. A (July's top anchor, kept for
comparison at `?v=a`) leaves the card bottom-heavy with ~90px of dead space.

### The verification trap this ticket hit

The sibling `render_banner_ai.sh` guards a lost webfont with a **file-size floor**, and copying
that would have shipped a broken card. Measured: a render with `fonts.googleapis.com` blackholed
comes out at **61KB, larger than the correct 57KB render**, because the fallback face inks more
pixels. The floor passes the failure.

So the guard is geometric — `play/verify_og_card.py` asserts each ink band's bbox against a
golden. It was calibrated against a known negative before being trusted: it PASSES the good
render (all 5 bands, delta 0) and FAILS the fontless one (the ghost line's right edge moves 18px).
Note what could *not* carry the check: JetBrains Mono is installed system-wide, so both mono rows
are metrically identical with or without the network. Only the Geist rows can see the failure.

### Inventory pass — every rendered asset in `public/`, opened

| Asset | Verdict |
|---|---|
| `og-default.png` (v1) | the defect; **left in place on purpose** so already-scraped previews keep resolving |
| `og-default-v2.png` | fixed, opened, correct |
| `logo.svg` | vector aurora + chevron, **zero `<text>` elements** — carries no identity |
| `favicon.ico` / `favicon-96x96` / `apple-touch-icon` / `web-app-manifest-192` + `-512` | one wordless mark. The 512 was opened; the other four were proved to be the *same image* (mean diff <= 3.8, downscale noise) rather than assumed |
| `favicon.svg` | no `<text>` elements |
| 6 PNGs in `images/blog/` | all opened. Post-specific technical copy only (charts, panoramas, engine grids) — no identity, no tagline, no wordmark |
| 4 SVGs in `images/blog/` | text greppable and read: diagram labels only |
| `portrait.webp` | photo, no text |
| `site.webmanifest` | `"Marko Stankovic"` / `"MS"` — no role string |
| `Marko-Stankovic-CV.pdf` | already reads **AI Engineer** |

One `developer` hit remains repo-wide, in `llms.txt:25` — "Automation and developer tooling",
which is a skill description and not the retired identity. Left alone.
