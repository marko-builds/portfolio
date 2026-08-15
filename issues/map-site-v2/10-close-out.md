# Close-out: cold read, then cascade the surfaces

**Type:** task
**Status:** open
**Blocked by:** [03](03-home-page-rebuild.md), [04](04-experience-timeline.md),
[05](05-call-page.md), [06](06-delete-game-project-pages.md), [07](07-wordmark-blink.md),
[08](08-light-dark-token-set.md), [09](09-devlog-reading-surface.md)
**Estimate:** 0.5 session

## Question

Close the stream on evidence, not on a checklist of shipped items.

## The cold read

Run `/cold-read` over the **live** home page, the timeline and `/call`. It is a process-isolated
reader with no access to this repo, this AIOS, or who Marko is.

**"Comes back clean" is defined, because a done-condition that cannot fail is not a
done-condition.** `/cold-read` is report-only and returns a qualitative read, so the stream closes
on **zero findings in these three classes**:

- **(a)** the reader cannot say what Marko does for work
- **(b)** the reader cannot name one thing he built, or cannot tell how to verify it
- **(c)** the reader cannot find a way to contact or book him

Anything else the cold read flags is input to a later pass, not a blocker. Record the full read in
this ticket either way, including what was *not* treated as blocking.

**Blocked-by includes 06 and 07** on purpose: a cold read of a site that still has the blinking
cursor and the dead game routes is a read of a half-migrated site.

## The cascade

Then update the surfaces that make claims about this site, in the same pass:

| Surface | What changes |
|---|---|
| `projects/job-search/proof-portfolio.md` | site rows, and the CV/site link set |
| `public/llms.txt` | flagged stale by `map-public-proof/11`; verify it matches the new page |
| LinkedIn | the `AI Engineer` title from [ticket 04](04-experience-timeline.md). **NOT "Independent"** — that word was cut 2026-08-15 and this row said otherwise until 08-15. **One decision is deferred here on purpose: what goes in LinkedIn's required Company field.** See ticket 04's cascade-run section for the narrowed option set |
| GitHub profile README | the through-line sentence, plus the `/call` link if wanted |
| `projects/job-search/presence-baseline.md` | a June snapshot with no staleness banner that has already produced one wrong claim — date-stamp it or re-capture it |

**Re-verify every repo link with `gh repo list marko-builds` before it ships.**
`proof-portfolio.md` has been wrong about repo visibility before, and a row asserting an external
state is unfalsifiable from inside this repo.

## Acceptance

- Cold read run against the live site, recorded, zero findings in classes (a), (b), (c).
- Every surface in the table updated, each verified against the thing it claims rather than against
  another row.
- The map's status flipped to resolved with the date.
