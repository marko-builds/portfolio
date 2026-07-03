# PRD: Website-builder capability, proven via portfolio redesign

**Status:** ready-for-agent · **Lane:** portfolio (capability home: claude-video-studio) · **Date:** 2026-07-03

## Problem Statement

Marko's live portfolio (markostankovic.org) looks and reads like 2024: the hero says "game
developer based in Serbia," game projects lead, and the visual design predates the studio's
current design craft. Meanwhile his actual identity — AI-leveraged builder shipping DeployLog,
Habitagram, and a generative-media studio — has no web presence that proves it. Post-launch
traffic (DeployLog ~Jul 14) clicking through to the stale site undersells the person behind the
product.

Separately, the studio has no web capability: it can render video, stills, audio, and brand
assets, but cannot produce the front-end surfaces those assets promote. Every future landing
page or marketing site would start from zero.

## Solution

Redesign the portfolio as the **proving job** for a studio website-builder capability. The
studio contributes what it already owns — brand tokens, motion vocabulary (P14 primitives),
and verification loops (capture-web, design-critique, /qa, local-vision) — applied to web
front-ends. The site's code stays in its own repo and deploy pipeline; the studio designs,
builds, critiques, and gates, but never publishes.

The visitor-facing outcome: a dark, restrained, products-led builder-proof site (Linear/Vercel/
Raycast register, existing marko tokens) where shipped products are the metrics, copy is terse
and in Marko's voice, and motion is subtle, CSS-native, and fast.

The capability outcome: a documented, repeatable path (direction prototypes → pick → build →
gate → preview → human merge) that /skill-builder captures as a skill after the job proves it.

## User Stories

1. As an indie dev who found DeployLog, I want to see who built it and what else they ship, so that I trust the product's maintenance and taste.
2. As a visitor landing on the home page, I want to grasp within one viewport what Marko builds now, so that I don't misread him as a game-dev job seeker.
3. As a visitor on any device, I want the site to load fast and feel deliberate (no framework spinner, no jank), so that the "fast, ships things" positioning is demonstrated rather than claimed.
4. As a visitor with motion sensitivity, I want animations to respect prefers-reduced-motion, so that the site stays comfortable.
5. As a returning reader, I want every devlog post and project URL I bookmarked to still resolve with its content intact, so that the redesign costs me nothing.
6. As Marko, I want three genuinely distinct hero directions to choose from before any full build, so that my taste gates the expensive work like every studio A/B verdict.
7. As Marko, I want every line of new copy shown to me as a draft before it lands, so that nothing external ships in my voice unapproved.
8. As Marko, I want all work on a branch with a preview deployment, and the merge to main to be my action alone, so that production never changes without my word.
9. As Marko, I want the DeployLog launch window to preempt this job automatically, so that the background lane never steals launch hours.
10. As the studio operator, I want the site's design tokens to stay in lockstep with brands/marko, so that video, stills, and web read as one brand.
11. As the studio operator, I want any temptation to change a brand token captured as a written proposal instead of a silent code change, so that the parked brand pass gets evidence, not surprises.
12. As the studio operator, I want the motion vocabulary ported as CSS/vanilla-JS equivalents of the P14 primitives, so that the studio keeps one motion language in two dialects.
13. As the AIOS, I want the repeatable steps of this job noted as they happen, so that /skill-builder can extract the website-builder skill from evidence rather than invention.

## Implementation Decisions

- **Capability, not container** (grill Q1): the builder is studio skills + a brand bridge + verification loops. Site source, deps, and deploy stay in the portfolio repo. Nothing Astro enters the studio's npm app.
- **Job-first, skill-second** (Q2): run the redesign manually; extract the skill after via /skill-builder. During the job, keep a running note of repeatable steps and gotchas (feeds the skill and lessons).
- **Tokens frozen** (Q3): the existing marko palette/fonts (dark #0D0D0D/#141414, mint accent, Geist + JetBrains Mono) are the design system. Freshness comes from layout, typographic scale, spacing, texture (grain over gradients), and motion. Token-change urges become a proposal document for the parked brand pass. The stale brand.json tagline ("Game developer & technical artist") gets a proposal from the new hero copy, not an edit.
- **Positioning** (Q4, Q6): builder proof for indie devs and small teams. Hero + about rewritten from context/intention.md in the voice.md register; products lead (DeployLog, Habitagram, studio/OSS work), game-dev work present but not leading. Devlog MDX content untouched.
- **Direction gate** (Q5): three hero-section prototypes on the branch — (1) Linear-restrained: very dark, mint doing the gradient-accent job, grain texture, ruthless negative space; (2) Vercel-monochrome: grid lines, terminal/code motifs, sharp contrast; (3) Raycast-warm: product-forward with real app screenshots in floating cards, more color play. Screenshot each (capture-web), design-critique each, Marko picks; the winner drives all templates. Prototypes are deleted after the pick.
- **Motion** (Q8): CSS keyframes/transitions plus one small IntersectionObserver script for scroll reveals and count-ups. The P14 vocabulary (mask-reveal headings, kinetic hero text, stat counters, hover micro-interactions) translated, not imported — no React islands, no animation libraries. prefers-reduced-motion honored everywhere.
- **Scope** (Q10): all page templates (home, projects index/detail, devlog index/post, 404/contact) restyled — no half-reskin seams. Zero new routes; zero removed routes; llms.txt, robots, OG images, sitemap preserved or regenerated equivalently. Stack frozen: Astro 5 + Tailwind 4.
- **Publishing boundary** (Q7): one feature branch; Vercel preview URL is the review medium (verify the Vercel wiring first; fallback = local build + capture-web screenshots). Marko merges. No commit to main during the job.
- **Priority** (Q9): background lane. DeployLog launch prep preempts. No pre-launch ship target; landing post-launch is acceptable-to-preferable.
- **Asset gap**: DeployLog screenshots can be captured fresh from live prod (capture-web recipe exists). Habitagram has no screenshots in the repo — flag to Marko when the products section needs one; do not fake it.

## Validation Contract

### Seam

One seam: **the built site rendered in a real browser** — locally served `astro build` output
during iteration, the Vercel branch preview for final verdicts. All gates (qa, design-critique,
local-vision, route parity, Lighthouse) operate on this seam; no lower-level test seams exist or
are added in this repo.

### Assertions

1. Three visually distinct hero prototypes exist on the branch with screenshots + critiques delivered; no template beyond the hero is redesigned until Marko names a winning direction.
2. A visitor's first viewport on the redesigned home presents builder/products positioning — no "game developer" framing in hero or title tag — with DeployLog, Habitagram, and studio/OSS work ahead of game projects on the page.
3. Every URL that resolves on production today resolves on the redesign branch with equivalent content (devlog posts byte-identical in body content); the route sets of the two builds are identical.
4. Every line of changed or new visitor-facing copy was approved by Marko as a draft before landing, and no em/en dashes or arrows appear in site copy.
5. The built site ships no JS framework runtime; total JS stays under ~10 KB; all entrance/scroll motion is disabled under prefers-reduced-motion; Lighthouse performance/accessibility/SEO scores match or beat the pre-redesign baseline (measured on main first).
6. The CSS design tokens on the branch are value-identical to brands/marko/brand.json's corresponding colors and fonts; any desired deviation exists only as a written proposal file, not as shipped CSS.
7. A /qa browser pass on the preview and a design-critique pass on final page screenshots both complete with findings either fixed or explicitly accepted by Marko.
8. The main branch's history shows zero commits from this job until Marko's merge; the preview URL, not production, hosts every review round.

### Test strategy

- Behavior over implementation: gates run against the rendered site (screenshots, a driven
  browser, crawled routes), never against component internals.
- Route parity is mechanical: build main and the branch, diff the emitted route/file sets,
  spot-check content equivalence of MDX-driven pages.
- Visual/aesthetic checks split like the studio's: scripted gates (qa, critique, Lighthouse,
  reduced-motion toggle) catch the objective floor; Marko's eye on the preview is the
  aesthetic verdict, per the P1–P14 convention.
- Prior art: the studio's render-verify culture (qa-gate.mjs composition, frame-extraction
  reads) is the model; this repo has no test framework and gains none.

## Out of Scope

- Client-services or agency framing (drawered lane) — the site sells proof, not services.
- Follower/audience-metrics framing (nateherk pattern) — proof is shipped products.
- Brand token changes, renaming, or brand identity work — parked brand pass owns those; this job only feeds it proposals.
- Stack migration or framework additions; CMS, analytics, or contact-form changes.
- New routes/pages beyond restyled existing templates; rewriting or editing devlog post content.
- Publishing the studio's website capability externally (studio stays internal-only).
- Shipping before the DeployLog launch window.

## Further Notes

- The site's existing CSS custom properties already mirror brand.json values exactly — the
  token bridge exists; the job formalizes it (assertion 6) rather than inventing it.
- The three references Marko named (Linear, Vercel, Raycast) plus two counter-references
  (nateherk: metrics-forward creator; morningside: agency process-seller) are the taste corpus;
  the counter-references define what this site is not.
- After the job: /skill-builder interview to extract the website-builder skill; a lessons/
  lab-notes pass; and the capability gets a row in the studio's capability backlog per the
  ledger convention.
