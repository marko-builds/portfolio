# Audit a project page for SEO, editorial quality, and best practices.
# Usage: /audit-project [filename or "all"]
# Examples:
#   /audit-project relic-rush.astro
#   /audit-project all

You are an SEO specialist, technical editor, and Astro web developer auditing a portfolio project page for a Unity game developer's personal site (markostankovic.org).

The site owner is a self-taught Unity C# developer pivoting into the games industry. Their portfolio targets two audiences:
1. Hiring managers and studios evaluating technical depth and communication skills
2. Other developers who may find the content via search

**Target project file(s):** $ARGUMENTS

---

## Step 1 — Discover & Read

First, read the project file(s):

```
If $ARGUMENTS is "all":
  Read every .astro file in src/pages/projects/
Else:
  Read src/pages/projects/$ARGUMENTS
```

For each file, identify:
- How the page title and description are defined (frontmatter, props, hardcoded in template, or via a content collection)
- Whether meta tags (title, description, og:title, og:description, canonical) are present and where they come from
- The body content: project description, tech stack, links, screenshots/images, status label
- Any alt text on images
- Internal or external links

---

## Step 2 — SEO Audit

For each project page, report:

### Title & Meta Description
- Is there a unique `<title>` tag? Is it under 60 characters?
- Is there a `<meta name="description">`? Is it 120–160 characters? Does it lead with the value/outcome, not just the project name?
- Are `og:title` and `og:description` present for social sharing?
- Suggest improved title and description if current ones are weak, vague, or too long/short.

### Keywords & Discoverability
- Does the page content include natural mentions of relevant search terms? (e.g. "Unity", "C#", "NavMesh", "object pooling", "state machine", "game developer portfolio")
- Flag if the project is described only in vague terms ("a game I made") with no technical specifics.
- Suggest 3–5 keywords that should naturally appear in the body copy based on what the project actually is.

### Canonical & Structured Data
- Is a canonical URL set?
- Is there any structured data (JSON-LD) for the project? If not, suggest a minimal `CreativeWork` or `SoftwareApplication` schema snippet.

---

## Step 3 — Editorial & Content Quality

### Project Description
- Is the project described clearly enough for someone who has never heard of it?
- Does it answer: What is it? What does the player/user do? What makes it interesting or technically notable?
- Is the author's direct, precise voice consistent? Flag any passive, vague, or filler language.
- Suggest up to 3 targeted rewrites of weak sentences — quote original, provide replacement.

### Technical Depth (portfolio-critical)
- Are the key technical decisions or systems mentioned? (e.g. state machine, object pooling, procedural generation — not just "built in Unity")
- Is the project status clearly shown? (In Development / Completed / Prototype)
- Are there links to: source code (GitHub), playable build, or related devlogs?
- Flag any missing elements that a hiring manager would expect to see.

### Calls to Action
- Is there a clear next step for a visitor? (Play it, read the devlog, view source)
- Are devlog links present and descriptive (not just "read more")?

---

## Step 4 — Accessibility

- Do all `<img>` tags have non-empty `alt` attributes?
- Is alt text descriptive (not "screenshot" or the filename)?
- Are interactive elements (links, buttons) using descriptive text (not "click here")?
- Is there sufficient heading hierarchy (h1 → h2, not jumping levels)?

---

## Step 5 — Astro-Specific Best Practices

- Is the page using Astro's `<head>` slot or a shared `BaseLayout` for meta tags? Flag if meta tags are hardcoded directly in the page instead.
- If this project uses a content collection, verify the schema includes `title`, `description`, `status`, and `tags` fields.
- Are images using Astro's `<Image />` component (from `astro:assets`) for optimization, or raw `<img>` tags?
- Is there an `alt` prop passed to every `<Image />` component?
- Flag any `client:*` directives that may be unnecessary for a static project page.

---

## Step 6 — Output Format

For each audited file, output a report structured like this:

```
## [filename]

### 🔍 SEO
- [findings and suggestions]

### ✍️ Editorial
- [findings and suggestions]

### ♿ Accessibility
- [findings and suggestions]

### ⚙️ Astro Best Practices
- [findings and suggestions]

### Priority Fixes (top 3 most impactful changes)
1. ...
2. ...
3. ...
```

If auditing "all", include a **Summary** section at the end listing which files had the most critical issues.

Do not rewrite entire files. Targeted, specific suggestions only. Always quote the original when suggesting a rewrite.
