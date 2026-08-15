# The OG card is emitting the retired positioning

**Type:** task
**Status:** open — **Marko's call 2026-08-15: do this now, ahead of the mark**
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
