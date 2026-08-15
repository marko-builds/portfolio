# Experience timeline records, and the current-role title cascade

**Type:** task
**Status:** open
**Blocked by:** None
**Estimate:** 0.5 session

## Question

Put structured employment records on the site. Today there are none: no Replai, no dates, no
degree, nothing a recruiter can scan. The shape is the reference site's — role, company, location,
dates, bullets, tech tags — because structured records are what make a history scannable and cheap
to keep current.

## The records

| Role | Company | Location | Dates |
|---|---|---|---|
| **AI Engineer** | none — see the amendment below | Belgrade | Sep 2025 to present |
| Unity Game Developer | Replai | Belgrade (Remote) | Mar 2025 to Sep 2025 |
| Unity Developer Intern | Inlustris Studio | Belgrade | Jun 2024 to Nov 2024 |

Education: **BSc, Computer Games & Programming**, Univerzitet Metropolitan, Belgrade, 2021 to 2025.

Dates for the lower three verified against `projects/job-search/templates/cv-base.md:160`, `:172-173`,
`:232` on 2026-08-14.

## Amended 2026-08-15 — "Independent" and the invoicing entity are cut

Marko, reviewing the [ticket 02](02-register-ia-prototype.md) prototype: **cut "Independent" and
cut the "Monolithiq LLC (invoicing entity)" line.** The record is now the role, the location and
the dates, with **no organization field**.

Everything below about the cascade still holds, and one thing about it changes: the entry that
travels to `cv-base.md` and LinkedIn now has no employer at all. A CV template with a required
company field, or a LinkedIn position form that will not save without one, is the place this
decision will get quietly reversed. **Leave the field empty; do not fill it with Monolithiq to
satisfy a form.** If a surface genuinely cannot render an empty employer, bring it back here
rather than deciding it there.

The tension in the section below gets sharper, not softer: with "Independent" gone the entry no
longer explains itself, so the bullets carry the whole load. Verified in the prototype 2026-08-15
— it reads as a role, not as a gap.

## The current-role entry is new, and it cascades

**"AI Engineer, Independent" does not exist in `cv-base.md`.** Verified 2026-08-14: that file's
work-experience section ends at Replai. So this entry is **a decision originating in this map**,
not a fact being copied out of the CV, and the direction of travel is outward:

1. Write the entry here, with bullets from the AFK harness, claimcheck, skill-vibe-test and
   adpreflight.
2. **Then** add it to `cv-base.md` and regenerate the CV. `scripts/build-cv.sh` has a known
   false-pass on honouring its argument (`levelup-build-cv-hardening-candidate`, 2 sightings) —
   verify the generated PDF actually changed, do not trust the exit code.
3. **Then** update LinkedIn to match. `map-public-proof/11-surface-cascade.md` owns the wider
   cascade; this ticket owns the title.

Getting this backwards — treating the CV as the source — is how a ticket stalls on a record that
does not exist yet.

## The tension, accepted

Read chronologically, this timeline is an internship in games, six months in games, then a period
with no employer name, under a page titled "I build AI systems and prove they work." The visible
employed history is roughly one year and all of it is game dev. The current entry is what carries
the position. Marko accepted this on 2026-08-14 with the facts stated.

## Acceptance

- Three records plus education render on the home page.
- The same title appears in `cv-base.md`, in the regenerated PDF (verified by opening it, not by
  exit code), and on LinkedIn.
- Bullets are **L2 Drafted**: drafted, Marko edits, Marko approves.
