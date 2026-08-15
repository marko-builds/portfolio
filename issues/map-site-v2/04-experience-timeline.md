# Experience timeline records, and the current-role title cascade

**Type:** task
**Status:** open — **cascade steps 1-4 done and gated 2026-08-15, bullets approved**; LinkedIn is
the only step left, and its employer-field decision is **deferred by Marko to the close-out**
**2026-08-15: this ticket no longer blocks [ticket 10](10-close-out.md).** Marko is doing the
LinkedIn edit later and released 10's cold read and cascade from waiting on it. LinkedIn is an
external surface with its own edit path; the site read and the repo-side surface updates do not
depend on it. 04 stays open until the edit is made.
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

## Amended 2026-08-15 — the gate, and a fourth cascade step nobody owned

Marko's call: the regenerated CV goes **through the gate**, not just through the generator.

**Step 2 above gains a gate.** `projects/job-search/templates/verify-cv.sh` runs ATS text-layer
parseability, link annotations, the deliverable dash lint, page count and metadata hygiene, and
exits non-zero on any FAIL. It is the check that catches what "the PDF changed" cannot: a contact
detail carried only by an icon glyph is invisible to a resume parser, and the metadata can ship as
`Документ без наслова` with no author, which is what the 2026-07-31 Bending Spoons cover letter
did. So step 2 is now **regenerate, confirm the bytes changed, then `./verify-cv.sh`, and read its
output** rather than its exit code alone.

**Step 4, which no ticket owned until now: copy the PDF into this repo.** The site serves its own
copy at `public/Marko-Stankovic-CV.pdf`, and `astro.config.mjs:15` redirects `/cv` at it. That file
is not generated, not symlinked, and not checked by anything.

**It has already drifted, verified 2026-08-15 by hash, not by date:**

| File | Modified | md5 |
|---|---|---|
| `job-search/templates/cv-marko-stankovic.pdf` | Aug 9 | `78a36222…` |
| `portfolio/public/Marko-Stankovic-CV.pdf` | Jul 29 | `bc32fc34…` |

So the site has been serving an eleven-day-stale CV, and since
[ticket 05](05-call-page.md) shipped, `/call` hands that file to anyone who asks for it. **The copy
step is the whole risk in this cascade**: `cv-base.md`, the generator and the gate all live in the
job-search lane, and the only artifact a recruiter reaches lives here. A cascade that ends at the
generator ends one repo short of the reader.

**Also amended: acceptance item 1 is already met.** [Ticket 03](03-home-page-rebuild.md) shipped
all three records plus education to `index.astro:77-109`, rendered in the Experience band at
`:251-288`, carrying this ticket's amended shape (the current role with an empty `org`, and a
comment telling the next editor not to fill it). What is actually left of this ticket is the
outward cascade: `cv-base.md`, the regenerated and gated PDF, the copy into this repo, and
LinkedIn.

## The tension, accepted

Read chronologically, this timeline is an internship in games, six months in games, then a period
with no employer name, under a page titled "I build AI systems and prove they work." The visible
employed history is roughly one year and all of it is game dev. The current entry is what carries
the position. Marko accepted this on 2026-08-14 with the facts stated.

## Acceptance

- ~~Three records plus education render on the home page.~~ **Met by ticket 03, 2026-08-15.**
- ~~The same title appears in `cv-base.md`, in the regenerated PDF (verified by opening it, not by
  exit code)~~ **done 2026-08-15**, and on LinkedIn (**Marko-only, outstanding**).
- ~~**New:** `verify-cv.sh` runs clean on the regenerated PDF, with its output read rather than its
  exit code trusted.~~ **Done 2026-08-15: all 19 checks PASS**, and the gate earned its place by
  catching a real regression (page count 2) on the first build.
- ~~**New:** `portfolio/public/Marko-Stankovic-CV.pdf` matches the regenerated file **by hash**~~
  **Done 2026-08-15: both `d8c95868…`.** The eleven-day drift is closed, and `verify-cv.sh` was
  re-run against the *site copy* itself, not only the source.
- ~~Bullets are **L2 Drafted**: drafted, Marko edits, Marko approves.~~ **Approved 2026-08-15,
  unedited** — Marko read them against the built PDF and made no changes (HTML mtime unchanged
  after the build; both PDFs still `7ddff3c9`). The CV entry stands as shipped, with no employer.

## Cascade run 2026-08-15

Steps 1-4 executed. The CV source of truth is `cv-marko-stankovic.html`, not `cv-base.md` (that
file is the superseded v2 TA body kept for its verified facts); the entry was written to both, and
the HTML is what `build-cv.sh` reads.

**The gate caught the thing the ticket could not predict.** `cv-base.md:46` warned "there is no
slack left" at one page, and it was right: the first build came out **2 pages** and `verify-cv.sh`
FAILed on page count. Regaining one page took, in order, removing the duplication the new entry
created (the AIOS project entry and the work entry both claimed the open-sourced tools), trimming
the Profile's enumeration (every item in it is stated in more detail under Projects), a spacing
pass, and collapsing a three-word orphan line in the Skills block. **No proof was dropped.**

Two deliberate calls that are Marko's to reverse:

- **`claimcheck` is not on the CV.** It has no public repo (`gh repo list marko-builds`, verified
  2026-08-15), so it falls under the same ruling as NEREUS. The ticket named it as a bullet source;
  `adpreflight` took its place and is the one proof that was on no CV surface before today.
- **The `@page` horizontal margin went 14mm to 11mm**, and `custom subagents` left the skills line
  (`multi-agent orchestration` already covers it). The 8mm vertical and 9.9pt/1.2 body that
  `cv-base.md` pinned as the floor were **not** touched.

Hashes: source PDF `78a36222` (Aug 9) to `7ddff3c9`; site copy `bc32fc34` (Jul 29) to `7ddff3c9`.

## DEFERRED 2026-08-15 — the LinkedIn employer field

Marko deferred this to the close-out. **The CV stands as shipped, with no employer**; only the
LinkedIn rendering is open. Recorded here so the decision at the end does not re-derive it.

**Why it is a decision at all:** the no-organization call was made for a surface Marko *renders*
(`index.astro` has no opinion about an empty string). LinkedIn's position form requires a Company
value and will not save without one, so the decision does not transfer mechanically. This is the
exact reversal point the 2026-08-15 amendment above predicted.

**Monolithiq LLC is out, and an agreement with his brother does not revive it.** Marko raised that
it would need one. True, and it is the smaller obstacle: the lane already settled the vehicle on
**2026-07-31, confirmed 2026-08-01** — paušalac (preduzetnik), *not* Monolithiq — and it was
settled on **tax grounds**, because Monolithiq is a US LLC whose pass-through recreates the tax
question one hop later. Permission was never the blocker, so resolving permission leaves the
original objection standing. `.claude/rules/job-search.md`: never write "Monolithiq LLC" in a
job-search deliverable. Reopening it is a tax call with a knjigovođa, not a ticket amendment.

**The narrowed set, for the decision at the end:**

| Option | Standing |
|---|---|
| `Self-employed` | LinkedIn's own token, and the plain rendering of the **paušalac, live since 2026-08-01**. Needs nobody's agreement. The precise agreed wording, "a registered entrepreneur in Serbia (paušalac)", stays in cover letters where there is room for the parenthetical |
| No current position | Honest, and matches the site exactly, but LinkedIn recruiter search and job-matching lean on a current position, so it costs visibility on the recruiter-primary channel during a priority-#1 search |
| `Monolithiq LLC` | **Out** on the tax decision above, independent of any agreement |

The three surfaces rendering differently is not a contradiction to resolve: no-employer on the site
and the CV, `Self-employed` on LinkedIn, both say there is no third-party employer.

**One thing this ticket's hash condition gets slightly wrong, found while satisfying it.** A PDF
rebuild changes the bytes even when nothing visible changed: editing only an HTML *comment* moved
the hash from `d8c95868` to `7ddff3c9`, because chromium embeds a creation timestamp that
`build-cv.sh`'s exiftool pass does not strip. So "the two files match by hash" is not a durable
invariant, it is a **same-build** invariant, and it decays to false the next time anyone runs
`build-cv.sh` for any reason without re-copying. The condition worth automating is *copy from the
build you just gated*, in one step, rather than *compare hashes later* — a check that will start
failing for a reason that is not the drift it exists to catch. Left as-is for now; the candidate
belongs in `/level-up`, not in this ticket.
