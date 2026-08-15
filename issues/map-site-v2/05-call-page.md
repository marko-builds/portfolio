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

## Acceptance

- `/call` renders in the winning direction's theme, both palettes if a toggle ships.
- A test submission arrives in Marko's inbox with all fields.
- The skip path reveals the appointment link.
- The appointment link books a real slot and sends a confirmation.
