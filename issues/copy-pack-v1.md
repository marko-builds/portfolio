> **SUPERSEDED by copy-pack-v2.md** (Marko forked mid-edit; v2 is canonical).

# Copy pack v1 (issue 04) — DRAFTS, nothing ships until Marko approves

**Status:** Marko's adjustments · **Parent:** issues/04-repositioning-copy-pack.md · **Date:** 2026-07-03

Every changed visitor-facing string for the redesign, in the voice.md register: warm but
economical, short direct sentences, no hype, no em/en dashes or arrows, no banned marketing
words. Devlog post content untouched. Direction: Vercel-monochrome (issue 03 pick).

Legend: [KEEP] = current string survives unchanged; everything else is a draft replacing the
current string shown in *(now: ...)*.

## Home page
Net title status: **Approved**
**Title tag** *(now: "Marko Stankovic — Generalist Technical Artist & Gameplay Programmer")*
> Marko Stankovic | I build my own products and ship them

**Meta description** *(now: the Technical Artist / Unity / UE5 paragraph)*
> Solo builder. DeployLog turns deploys into release notes. Habitagram turns habits into a
> journey. A homegrown generative studio renders the art for both.

Marko's meta description version:
> Solo developer. DeployLog turns deploys into release notes. Habitagram turns your habits
> inot a journey. A homegrown generative media studio renders the art for both.

**Person schema jobTitle** *(now: "Generalist Technical Artist")

**Hero prompt block** *(new element, from the picked direction)*
> $ whoami
> marko stankovic, builder

**Hero headline** *(now: "Marko Stankovic" + "Technical Artist · Tools, Pipeline & Gameplay")*
> I build my own products and ship them.

**Hero subline** *(now: "I build the systems that make games feel alive...")*
> DeployLog turns deploys into release notes. Habitagram turns habits into a journey.
> A homegrown generative studio renders the art for both.

**Hero CTAs** *(now: "Let's Build" / "View Projects")*
> See the work · Read the devlog

## Products section (new, leads the page)

**Heading:** Products

- **deploylog** · Release notes from your deploys. · status: launching
  (links to /projects/deploylog/)
- **habitagram** · Habit tracking as a journey. · status: near launch
  (no page exists and zero new routes allowed: card is unlinked for now)
- **studio** · The generative media engine behind both. · status: internal
  (unlinked, or points at the devlog)

## Game work section (present, no longer leading)

**Heading:** Game work
**Intro line (new):**
> Three years of Unity and Unreal before the products. The craft still shows.

Game project cards keep their current titles and one-liners (unchanged strings).

## About section

**Heading:** About
**Blurb** *(now: skills-focused game-dev framing)*
> I'm Marko, solo founder of Monolithiq. I spent three years building game systems in Unity
> and Unreal, then turned the same craft on my own products. Now I ship small software with
> an AI-heavy workflow: two apps in flight, and a generative studio that renders their art,
> video, and sound. I write about the process on the devlog.

## Contact section

**Heading** *(now: "Let's Build")*
> Contact

**Blurb** *(now: "Open to roles remote or across the EU...")*
> Building something similar, or want to compare notes? My inbox is open.

Email / GitHub / LinkedIn link labels: [KEEP]

## Footer

**Mono line** *(now: "Technical Artist · Gameplay Programmer · Serbia")*
> Builder · Serbia

"© 2026 Marko Stankovic": [KEEP]

## Devlog index

**Title tag** *(now: "Devlog — Marko Stankovic")*
> Devlog | Marko Stankovic

**H1:** // Devlog [KEEP]

**Subline + meta description** *(now: "Architecture decisions, Unity patterns, and the
trade-offs behind both.")*
> Build notes from the products, the studio, and the occasional game system.

## Project detail pages (deploylog, tictactoe, hide-and-seek)

**Title tags:** swap the em dash for a pipe, e.g. *(now: "DeployLog — Marko Stankovic")*
> DeployLog | Marko Stankovic

Body copy on detail pages is otherwise out of 04's scope; BUT issue 06's restyle touches those
files, which makes them copy-lint targets. Standing rule for 06: existing em dashes in their
prose get replaced with a period, comma, colon, or parentheses (per voice.md); the decorative
"—" list markers get replaced by the design system's mono markers. Notable rewrites will be
shown at 06 review.

## Not in this pack

- Devlog post MDX content: untouched by contract (assertion 3).
- brand.json tagline: proposal only, in verify/proposals/brand-tagline.md (parked brand pass
  owns the decision).
