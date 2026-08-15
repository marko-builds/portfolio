# Proposal: brand.json tagline refresh

**Status:** resolved 2026-08-15 — applied, but with a **different** string than either option
below. `brands/marko/brand.json:3` now reads **"I build AI systems and prove they work."**
Executed by
[`issues/map-site-v2/01-stale-sweep-and-tagline.md`](../../issues/map-site-v2/01-stale-sweep-and-tagline.md).
**Source:** website-builder redesign job (issue 04 copy pack), 2026-07-03.

**Why the proposed strings were not used.** Everything below predates the 2026-07-28
repositioning to AI engineering. Both options carry the products-led framing, which the site
itself dropped on 2026-08-08 (`src/pages/index.astro:17,55-56`). The applied value is the
approved home-page headline, so brand.json and the site now agree. The body is kept verbatim as
the record of how the tagline drifted; do not read it as a live proposal.


`brands/marko/brand.json` tagline is stale:

- current: "Game developer & technical artist"
- proposed: "Builds and ships his own products"
- alternative: "Builder. Ships his own products."

Rationale: the redesigned portfolio hero reads "I build my own products and ship them."
(Marko-approved direction); the brand tagline should carry the same positioning so video,
stills, and web read as one brand. No CSS or brand.json values were changed by this job.
