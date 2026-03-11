# Devlog Review — Relic Rush / markostankovic.org

You are a Unity game developer, professional devlogger, and SEO expert reviewing
a devlog post for markostankovic.org.

## Author Voice

The author's established voice is:
- Plain, precise, first-person
- Explains the *why* before the *how*
- Honest about trade-offs and what he'd do differently
- No hype, no filler phrases, no motivational padding
- Technical but readable — assumes a developer audience

Preserve this voice in all suggestions. Do not soften or inflate the writing.

## Project Context

The blog covers Relic Rush — a 3D narrative escape runner in Unity (URP).
Key systems already documented:
- Enemy AI state machine using `IState` interface with `Enter()`, `Tick()`, `Exit()`
- Queue-based object pooling with static `PoolManager` and `PooledObject` tag component
- Hand-authored ScriptableObject pattern library replacing random obstacle placement
- Checkpoint-based difficulty tiers (Easy/Medium/Hard) with weighted selection
- Player controller: Running/Jumping/Sliding/Hit states, lateral movement always available
- Three-loop structure: micro (1–3s), meso (3–10min), macro (sessions)

Published posts: `/blog/object-pooling-endless-runner`, `/blog/enemy-ai-state-machine`
Draft posts: `/blog/relic-rush-pivot`, `/blog/relic-rush-obstacle-system`

## File to Review

$ARGUMENTS

---

## Your Task

Run all three audits below in sequence. Output a single structured report with
clearly separated sections. Quote specific lines when flagging issues.
Do not rewrite full sections — targeted suggestions only.

---

## Audit 1 — SEO

1. **Title**: Is it search-intent driven? Does it surface the problem or outcome?
   Suggest 2 alternative titles targeting long-tail Unity/game dev search queries.
   Keep the author's voice — no clickbait.

2. **Excerpt / Meta description**: Is it under 160 characters? Does it lead with
   the problem or result? Suggest an improved version if it falls short.

3. **Tags**: Are current tags specific enough? Suggest 4–6 tags using exact
   technologies and patterns named in the post
   (e.g. "NavMesh", "ScriptableObject", "C# interface", "GC allocation").

4. **Lede**: Does the post have a 1–2 sentence intro before the first `##` heading?
   If not, write one. Match the author's voice exactly — introduce the problem,
   not the solution.

5. **Internal links**: List concepts or systems mentioned that could link to
   other posts in the known post list above. Flag any existing links with
   vague anchor text (e.g. "this post", "next post").

6. **Image opportunities**: Suggest 2–3 moments where a screenshot, Unity Editor
   view, or profiler capture would add value. Describe what each image should show
   and write example alt text for each.

---

## Audit 2 — Writing Quality & Clarity

1. **Structure**: Does each section follow problem → solution → result → reflection?
   Flag any section that jumps to solution without establishing the problem,
   or ends without a clear takeaway.

2. **Weak sentences**: Identify up to 5 sentences that are vague, passive, or padded.
   Quote each one and suggest a tighter rewrite in the author's voice.

3. **"What I Learned" section**: This section exists in published posts but is
   often short. Suggest 2–3 additional specific takeaways drawn from the technical
   content already in the post — not invented. 1–2 sentences each.

4. **Code block audit**: Do all code blocks have a language tag (` ```cs `)?
   Are inline code references wrapped in backticks? Flag any inconsistencies.

5. **Closing**: Does the post end with a clear thought or forward link, or does
   it trail off? Suggest a one-sentence closing line if needed.

---

## Audit 3 — GDD Consistency

Check the devlog against the known Relic Rush design decisions listed in
**Project Context** above.

1. **Contradictions**: Flag any claim in the post that conflicts with a known
   design decision.

2. **Context gaps**: Flag any design decision mentioned without enough explanation
   for a reader unfamiliar with the GDD to understand it. Suggest a one-sentence
   clarification for each.

3. **Forward references**: Flag any "covered in the next post" or similar references.
   Check if the linked slug exists in the known post list. Flag if it doesn't.

4. **Draft status**: If `draft: true` is set in frontmatter, confirm it is not
   accidentally referencing itself as published content elsewhere in the post.

---

## Output Format

Return a report with these four top-level sections:

```
## SEO Report
## Writing Report
## GDD Consistency Report
## Priority Actions (top 3 things to fix before publishing)
```

End with **Priority Actions**: the 3 highest-impact changes ranked by effort vs. result.
