# Stale-status sweep, handover, and the dropped tagline cascade

**Type:** task
**Status:** resolved 2026-08-15
**Blocked by:** None
**Estimate:** 0.25 session

## Resolution 2026-08-15

Three of the four acceptance items are closed. The fourth was a **false finding** and the correct
action was to change nothing.

**1. Tagline — done.** `brands/marko/brand.json:3` now reads *"I build AI systems and prove they
work."*, matching `src/pages/index.astro:17` and `:55-56`. Family grep over the studio for the old
string returns only this ticket and `plans/capability-backlog.md:29`, which describes the
deviation historically and is correct as written. `verify/proposals/brand-tagline.md` is marked
resolved — note it proposed *"Builds and ships his own products"*, a third string that was itself
pre-repositioning, so it was applied against neither of its own options.

**2. `portrait` — REFUTED, field left alone.** The path is correct. `brand.logo.mark` and
`brand.portrait` are **Remotion `staticFile()` arguments**, which resolve against
`studio/public/`, and `studio/public/brands/marko/portrait.webp` exists (1.2 MB, staged
2026-06-17). `logo-mark.svg` sits beside it and is consumed at five call sites in
`studio/src/lib/components.tsx`. Emptying the field, as this ticket instructed, would have broken
a working reference.

The 2026-08-08 red-team and the 2026-08-14 re-verification both `ls`-ed the **repo-root**
`brands/marko/`, which holds only `brand.json` by design. The proxy could not distinguish "the
asset is missing" from "you are reading the wrong root", and it was cited twice as verified. The
check that settles it is the consumer, not the directory: `grep staticFile` before calling a
brand-file path broken.

Two docs do describe the file as repo-root-relative — `plans/instagram-content-strategy.md:225`
(a ticked checkbox) and `plans/channel-setup.md:40,74`. Left as-is; they are unambiguous about
which file they mean, and rewording them is not this stream's work.

**3. Stale rows — done.** All eight `projects/portfolio/issues/0*.md` carry
`Status: resolved 2026-07-03` plus a one-line **Shipped:** naming the artifact, each checked on
disk this pass rather than inherited from the map's evidence list. Nothing deleted.

**4. Handover — already done 2026-08-14.** Tickets 14, 15 and 16 and the fog/scope-out entries in
`issues/map-public-proof/map.md:208,228` were amended in the same batch that charted this map,
each naming what it settled. This ticket's own row was stale about its own acceptance.

## Question

Three pieces of bookkeeping that all have the same shape: a decision was made, the artifact was
never updated, and the row now lies.

### 1. The tagline has been emitting the drawered positioning since 2026-08-08

`projects/claude-video-studio/brands/marko/brand.json:3` reads:

```
"tagline": "I build software products and ship them.",
```

That is the **pre-repositioning** headline. `issues/map-public-proof/14-home-page-story.md` settled
that the approved headline cascades to this file, explicitly because "the studio renders from that
file, so a stale tagline propagates into every future render, not just this page." It was never
done. Verified 2026-08-14.

**This is the one genuinely urgent item in the map**, because it is a positioning leak into an
output channel rather than a stale doc. It was also the item the handover to this map nearly
dropped, which the red-team caught.

- **Action:** set the tagline to the approved home-page headline, **"I build AI systems and prove
  they work."**
- Then grep the studio for other copies of the old string before claiming done. When fixing a class
  of thing, grep the family, not the file you touched.

**Same file, second broken reference.** `brand.json:50` reads
`"portrait": "brands/marko/portrait.webp"` and **that file does not exist** — the directory holds
`brand.json` and nothing else (verified 2026-08-14; originally found by the 2026-08-08 red-team on
`map-public-proof/16-photo-and-face.md`). Either point it at a real image or empty the field. A
broken path that fails at render time is worse than an absent one.

Both defects are the same shape: the studio renders from this file, so a stale or broken value
propagates into every future render rather than into one page.

### 2. `projects/portfolio/issues/01-08` are stale rows, not a backlog

All eight read `Status: ready-for-agent` and are dated 2026-07-03. The work shipped. Evidence:
`src/pages/index.astro:179` comments "Vercel-monochrome direction (issue 03 pick)"; `verify/gate.mjs`
and `verify/baseline/` exist (issue 02); `.claude/skills/website-builder/` exists (issue 08); the
secondary templates render (issue 06); the site has been live since 2026-07-03.

- **Action:** mark all eight resolved with the date and a one-line what-shipped. Do **not** delete
  them; the PRD and both copy packs are the record of how the current site got its shape.

### 3. Handover from `issues/map-public-proof/`

Tickets 14, 15 and 16 there are superseded by this map. Amend each with a pointer, and amend that
map's `map.md` to resolve its "A light mode" fog entry and its "A full rebuild of
markostankovic.org" scope-out.

**Carry the settled content forward rather than re-deciding it** — the amendments must name what
each inherited ticket already settled, or the handover loses decisions. That is what this ticket
exists to prevent.

## Acceptance

- `brand.json` carries the approved tagline, and a repo-wide grep of the studio for the old string
  returns only history and files that quote it deliberately.
- `brand.json`'s `portrait` field points at a file that exists, or is empty.
- All eight `projects/portfolio/issues/0*.md` carry a resolved status with a date.
- `map-public-proof` tickets 14, 15, 16 and its `map.md` point here, each naming what it settled.
