# portfolio — markostankovic.org

Astro 5 static site, Tailwind v4, deployed by Cloudflare Pages from `main`. An audience site in an
expedition voice (PRD at `~/Projects/monolith/projects/portfolio-planning/issues/prd-site-v3-audience.md`): a night hero running the Borealis aurora live,
alternating light and night bands, the Legend page, the approved copy on every surface. Recruiters
are served as a floor, not the design target: what he does, one verifiable built thing, a way to
contact him, checked by a cold read. Copy changes are still positioning changes.

- **Planning record lives in the monolith**, `~/Projects/monolith/projects/portfolio-planning/` (private; this repo moved to `~/Work/ai-env/projects/` on 2026-08-29, the planning dir did not): the maps, PRDs,
  copy packs, cold reads, build slices and the review captures. Moved out of this public repo
  2026-08-23. Provenance comments in `src/` and `verify/` cite `issues/...` paths; resolve them
  there. Rows in a map are claims — open the ticket **and** the artifact.
- **Gate:** `node verify/gate.mjs` (route parity, token lint, budget, copy lint, main-untouched).
  Its Lighthouse floors are noisy and per-item; read
  `.claude/rules/verification-before-completion.md` before re-pinning any of them.
- **Publishing:** posts live in `src/content/blog/*.mdx` and ship `draft: true`. The site filters on
  `draft` only, never on the date, so the flip **is** the publish. `scripts/publish-devlog.sh` in
  the monolith does it on a timer behind an approval sentinel.
- **Copy:** no em/en dashes or arrows anywhere reader-facing (`references/voice.md`).

## Three web facts this lane has already paid for

Metabolized 2026-08-18. Each one cost a chunk of a session and each produced a confident wrong
conclusion first.

**1. In Tailwind v4, a bare-element rule in a plain stylesheet beats any utility class, regardless
of specificity.** Utilities live in `@layer utilities`, and **unlayered CSS wins the cascade over
layered CSS** — specificity never enters it. `global.css`'s `h1,h2,h3 { font-family: var(--font-mono) }`
silently ate `class="font-sans"` on a post title: the class was in the markup, the built page was
unchanged, and it read as a caching problem.

- Write the property in a scoped `<style>` or inline, or layer the base rule.
- **Never conclude "the change did not apply" from the source.** Read the computed style off the
  built page.

**2. `1ch` is the width of the `0` glyph, not of an average character**, so a `max-width` in `ch` is
not a character count. In Geist at 18px, `1ch` is 11.92px against a 7.95px average advance, so
`68ch` resolves to **810px** and constrained nothing inside a 720px container — the measure stayed
at 86 characters while the CSS read as if it set 68.

- Set the measure in `em`.
- Verify by measuring a real line against its own text (`Range.getClientRects()` width over
  `textContent.length`), never by trusting the unit.

**3. `element.innerText` includes visually-hidden subtrees, and `getComputedStyle(el)` lies about it
when the clip sits on an ancestor.** On `/call`, the Formspree `_gotcha` honeypot reached a text
extraction as the line "Leave this empty" while the input itself reported `visibility: visible`,
`opacity: 1` and a real 218x27 box, because `clip: rect(0,0,0,0)` is on the parent `p.gotcha`.
Feeding that to a context-blind reader manufactures a defect on a page that does not have one.

- When extracting "what a reader sees" from a live page, strip clipped and 1px-overflow-hidden nodes
  first, and **report the count you stripped**.
- The probe that settles it is `document.elementFromPoint` at the element's own centre (it returns a
  different element) plus an ancestor walk.
