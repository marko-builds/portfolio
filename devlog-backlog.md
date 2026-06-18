# Devlog backlog

Planning doc for `markostankovic.org` devlogs (posts live in `src/content/blog/*.mdx`, schema in
`src/content/config.ts`: `title, date, excerpt, tags[], draft, ogImage`). Technique + structure:
`references/writing-playbook.md` (summary -> how -> why -> learned). Prompt: `references/prompt-library.md` §4.

**Publishing rule:** new posts ship `draft: true`, get reviewed in Marko's voice (`references/voice.md`,
no em/en dashes or arrows), then flip to `draft: false`. Each devlog is the canonical long-form **source**
the reels/carousels repurpose from (reciprocal funnel: bio/site link both ways).

---

## Reality check (2026-06-18) — read before picking the next post

The locked social anchor is **shaders + rendering/VFX**, but the *finished, publishable* work skews
**tools/pipeline + shipped gameplay**, not shaders:

- The **reef** build is a **GTA home assignment** (a Three.js recreation of a reference game, "Pixel
  Flow", reskinned to a Fish of Fortune look). It is **not publishable as-is** (test-task + FoF/Nemo
  identity exposure). And its "water" is JS `Math.sin` sway, **not a shader** — a "water shader" devlog
  would be fiction. Publish only the **de-FoF original reskin** (Abyssal Glow / Tidewell), and only once
  that's built.
- **Abyssal Glow** (the actual shader/lighting showcase) is a locked *brief*, not built. It is the
  **prerequisite** that would earn the shaders/VFX anchor.

**Implication:** either build Abyssal Glow before leaning the anchor on shaders, or shift the anchor
toward **tools/pipeline** (where real artifacts exist). Flagged for Marko. The backlog below is ordered
by what's *finished + safe + recruiter-valuable today*, not by the aspirational anchor.

---

## Backlog (priority order)

| # | Working title | Status | Recruiter value | Source | Repurpose |
|---|---|---|---|---|---|
| 1 | **One ScriptableObject Per Theme: A Data-Driven Theme System in Unity** | ✅ finished, shipped (itch), own IP | Med-high (SOLID/ISP, data-driven, ships clean) | `projects/TicTacToe` theme system | Carousel exists; reel of live theme-swap |
| 2 | **From Concept Art to Game-Ready Mesh: A Local AI 3D Pipeline (SF3D + Blender + UE5)** | ✅ finished (proven axe/bow) | High (tech-art tooling + the geometry-routing insight) | `blender-studio` SF3D pipeline | Pipeline timelapse reel; carousel |
| 3 | **Driving the Unreal Editor Headless: Building Game Content with a Python Commandlet** | ✅ finished (first playable) | High (automation, the gotchas read as senior) | `Survival3D-UE5/tools/build_first_playable.py` | Reel of the headless build run |
| 4 | **One Entry, Five Surfaces: The Publish Fan-Out Architecture Behind DeployLog** | ✅ built; **launch fuel** | Med for GTA (not games/art); high for the launch | `projects/deploylog` | HN/dev.to/Reddit at launch; X thread |
| 5 | **Reskinning a Game With Light: From a Bright Reef to a Bioluminescent Deep** | ⏳ aspirational (brief locked, not built) | High **once built** (the shaders/VFX showcase) | Abyssal Glow reskin (`pixelflow-.../reef/specs/original-reskin.md`) | The shaders/VFX anchor reel + carousel |
| 6 | **Migrating From Unity to Unreal 5 Without Losing Your Architecture** | ◑ ongoing | Med (discipline carryover, good SEO) | Survival3D-UE5 migration | Carousel of the mapping |
| 7 | **A Deterministic, Headless Blender -> Unreal Asset Pipeline** | ✅ finished | Med-high (pipeline depth) | `blender-studio` BRIDGE | Reel/carousel |

**Gated / do-not-publish-as-is:** the reef *Fish of Fortune* recreation. If it becomes a devlog, it's a
process / agent-driven-development piece on the **de-FoF original**, leading with technique and showing
only original art — never the FoF-styled home-assignment build.

**Keep, don't lead:** the 4 existing Unity/Relic-Rush posts (object-pooling + enemy-AI published; pivot +
obstacle-system still `draft`). Honest history, no longer the spine.

## Recommended order

1. **#1 TicTacToe** — drafting now (finished, safe, own IP, carousel already built).
2. **#2 SF3D pipeline** + **#3 UE5 headless** — the strongest *finished* tech-art/tools signal.
3. **#4 DeployLog** — write at launch, for HN/dev.to/Reddit.
4. **Build Abyssal Glow**, then **#5** — this is what makes the shaders/VFX anchor real.
5. #6 / #7 as SEO/depth fill.
