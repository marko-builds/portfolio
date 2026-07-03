# 06 — Secondary templates (projects, devlog, post, 404)

**Status:** ready-for-agent · **Type:** human-in-the-loop · **Lane:** portfolio
**Parent:** issues/prd-website-builder-portfolio-redesign.md
**Blocked by:** issues/05-home-page-build.md
**Verification:** assertions 3, 5, 6 machine halves — gate 02 green; template consistency is
Marko's eye on a screenshot set (taste gate)

## What to build

Extend the approved home direction across every remaining template so no click leaves the new
design: projects index (re-weighted per the approved ordering), project detail layout, devlog
index, post layout (MDX bodies untouched — restyle the frame, not the words), 404 and contact
elements. Reuse the motion utilities from 05 with restraint (posts are for reading). All routes
identical to the 01 manifest.

## Acceptance criteria

- [ ] Every template restyled; zero new or removed routes (gate 02 parity green)
- [ ] Devlog post body content byte-equivalent; only layout/frame changed
- [ ] Screenshot set across all templates delivered; Marko's consistency verdict recorded

## Completion note (2026-07-03)
Built + Marko consistency verdict APPROVED. Shared SiteNav; devlog rows + filter; BlogPost
chrome; 3 project pages via parallel agents (full dash cleanup, ~34 hide-and-seek prose splits
shown to Marko); NEW /404.html (Marko-directed route addition). BlogCard removed (orphaned).
