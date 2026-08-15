# The `/call` page: intake survey, Formspree, appointment link

**Type:** task
**Status:** open
**Blocked by:** None
**Estimate:** 0.75 session

## Amended 2026-08-15 — this page now owns CV delivery

Marko, reviewing the [ticket 02](02-register-ia-prototype.md) prototype: **remove the CV link from
the site; the CV should come through the call.** That reverses the map's decision 9, and the rail
now carries a "Book a call" link where the CV link was.

**The gap that opens, stated because nothing else in the map closes it.** With no CV link and no
availability statement (decision 10 stands), a recruiter who wants to skim a CV has no path to one
except booking a call. That is friction on the primary audience, and it lands on the same page
this ticket already argues must not gate a recruiter behind a form. **So this page has to deliver
the CV, not just a slot** — the design question is how, and it is not settled:

- reveal the PDF link alongside the appointment link on submit, or
- offer it on the page unconditionally and keep only the *scheduling* behind the survey.

The second keeps the skippable-survey principle intact and is the likelier answer, but it is close
to putting the link back on the site, which is what was just removed. **Bring the choice back to
Marko when this ticket is built; do not settle it here.**

**The `/cv` route stays either way.** `astro.config.mjs:15` redirects `/cv` to the PDF, and sent
job applications already carry that URL. Removing the *link* is not removing the *route* —
deleting the route would break links already in recruiters' inboxes.

## Question

A recruiter or a peer who wants to talk should get a slot instead of composing an email, and Marko
should know what the call is about before it starts.

## The shape, and why it is this shape

**Survey first, scheduler last.** Marko's own form in the site's theme, posting to **Formspree**
(already wired for the contact form). On submit, the page reveals a **Google Calendar
appointment-schedule link**.

Fields: purpose of the call, role, company, a link, and free text.

**The survey is skippable.** A form gate in front of a recruiter is friction on the primary
audience.

**Rejected 2026-08-14:**

- **A self-hosted scheduler.** Availability sync, timezone math, double-booking prevention, event
  writes and intake storage is a backend on a static Astro site, plus a Google token to keep alive.
  It is the reference site's `/admin` panel arriving by the back door.
- **A styled iframe wrapper.** Styling around an embed you do not control, which will fight the
  light/dark toggle.

Note that the reference site's "confirm your booking details" step exists precisely *because* its
Google embed could not capture intake. It is a workaround, not a design worth copying.

## Two things this design does not do, stated so they are not discovered

1. **The skip is a soft gate, not a real one.** The appointment link sits in the page source
   whether or not the form is submitted. Anyone who looks can book without answering. That is
   acceptable: the survey is for context, not gatekeeping.
2. **Formspree's free tier shares its submission quota with the contact form.** If booking traffic
   is real, the quota is the thing that breaks first. Check the plan limits before shipping, and
   decide then whether the contact form or the survey gets the quota.

## Placement

Its own page at `/call`, linked from the identity rail and the contact band. It gives the survey
room without crowding the home page, and it is a URL Marko can paste into a recruiter email, which
is probably how it will mostly be used.

## Built 2026-08-15 — `src/pages/call.astro`, one thing outstanding

**The CV question is settled: the link is unconditional on `/call`.** Marko's call, given the
three options above plus a third (no CV on the page at all). It is not gated behind the survey and
it appears nowhere else on the site, so decision 9's reversal holds: the *site* does not advertise
a CV, the call page does. The rejected reveal-on-submit had a defect worth recording — it is
JS-only over a soft gate, so it adds friction for honest readers and none at all for anyone who
reads the page source. The same soft-gate logic this ticket already accepted for the appointment
link now applies to the CV consistently.

**Two premises in this ticket were wrong, verified against the code rather than the text.**

1. **"Formspree (already wired for the contact form)" is stale.** The contact form was deleted in
   `cfdd76c` (the 2026-07-03 rebuild); today `index.astro:169` is a `mailto:` link and the site has
   no form at all. The endpoint `formspree.io/f/xlgpgwva` survives only in git history, at
   `462d6e9`. Marko's call: reuse it. **Consequence: the "shared quota" tension above is moot** —
   nothing shares that form's quota now. Whether the form is still live in the account is
   unverifiable from the repo and is what the test submission actually proves.
2. **The Google Calendar appointment link does not exist**, anywhere in the monolith. It is
   Marko-only to create. The page ships with `BOOKING_URL = ""` and renders an email fallback in
   that branch rather than a dead button, because the identity rail links this page and a dead
   primary CTA is worse than a plain instruction. **Delete the fallback branch when the URL lands.**

**Two additions beyond the ticket's field list, stated because they are additions.** `name` and
`email` are required. The listed fields (purpose, role, company, link, free text) give Marko no way
to answer a submission that is not followed by a booking, which is a dead end for anyone who fills
the survey and then does not book.

**The submit flow needs no JS to work.** A hidden `_next` sends Formspree back to
`/call?sent=1#book`, so the fragment lands the reader on the booking section by itself; the inline
script only swaps the form for a confirmation note.

**Register:** the page follows `index.astro`'s locked direction (sans headings, mono kept for small
meta), not `/devlog`'s older mono register, which ticket 09 still owns.

**Also noted, not fixed here:** `public/Marko-Stankovic-CV.pdf` is dated **Jul 29**, before the
"AI Engineer" title decision. The cascade belongs to [ticket 04](04-experience-timeline.md), but
this page is now the surface that delivers it.

## Acceptance

- ~~`/call` renders in the winning direction's theme, both palettes if a toggle ships.~~
  **Met 2026-08-15.** Light only (no toggle shipped, map decision 4). Verified on a preview server
  at 1280 and 390 wide, not assumed: the rail's `/call` link now resolves 200 instead of 404.
- A test submission arrives in Marko's inbox with all fields. **Open — needs the live form.**
- ~~The skip path reveals the appointment link.~~ **Met 2026-08-15, by removing the reveal.** The
  booking section is always rendered. The ticket's own point 1 concedes the gate is soft, so a
  hidden-then-shown link buys nothing and costs a JS dependency.
- The appointment link books a real slot and sends a confirmation. **Blocked on `BOOKING_URL`.**
