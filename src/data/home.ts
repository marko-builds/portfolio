// Home hero copy, receipts and inline links. Promoted 2026-08-23 from
// the slice-03 prototype's _hero.ts, deleted in slice 14 (issues/10-promote-register-home.md); the words set by slice 11
// (issues/11-copy-pass-and-receipts.md) from issues/copy-pack-v3.md section 11, verbatim.
// Change a string here only by changing the copy pack first.
export const hero = {
  name: "Marko Stankovic",
  line: "I create constructs of artificial intelligence, and I bring back the proof.",
  sub: "DeployLog and Habitagram are nearly out of the vault, three open source gadgets sit on GitHub, and the engine that paints the maps is mine, built with AI agents. Every number below links to the dig site.",
  photo: "/portrait.webp",
  ctas: [
    { label: "Open the field journal", href: "/field-journal", primary: true },
    { label: "See the gadgets", href: "#gadgets", primary: false },
  ],
};

// Band intros (copy pack section 11, Home body). Rendered through linkify below.
export const intros = {
  artifacts: "Two apps about to leave the vault, and the engine that paints their art.",
  journal: "What got built, what collapsed, and what the instruments read either way.",
  gadgets: "Open source, every one. Each has a repo you can read and a check you can run.",
  contact: "Hiring, building something similar, or want to compare maps? My inbox is open.",
};

// Receipts: link + number + date (copy pack section 3 sources, section 11 labels). The
// entry count is read off the content collection at build time, non-draft only in a
// production build (the dev server counts drafts too). The other two are literals
// carrying their date; the query that produces each is recorded in the copy pack:
//   4  gh search issues --author marko-builds --repo HANCORE-linux/omarchy-plugin-marketplace --label listed --json number -q length
//   17 gh repo list marko-builds --visibility public --limit 100 --json isFork -q '[.[] | select(.isFork|not)] | length'
// Receipt 3 links to the repositories tab with type=source so the page shows 17 (forks excluded).
export const receipts = (postCount: number) => [
  { n: String(postCount), label: "journal entries", note: "this site, Aug 2026", href: "/field-journal" },
  {
    n: "4",
    label: "plugins in the Omarchy (Linux desktop) marketplace",
    note: "Aug 2026",
    href: "https://omarchyplugins.com/?author=marko-builds",
  },
  { n: "17", label: "public repos", note: "github.com/marko-builds, Aug 2026", href: "https://github.com/marko-builds?tab=repositories&type=source" },
];

// Inline links (PRD, Marko 2026-08-23): wherever body copy names a page or band, the
// words link to it. Whole-word, case-insensitive, first occurrence per phrase; the copy
// itself stays a plain string so it can be diffed against the copy pack character for
// character.
export const inlineLinks: [string, string][] = [
  ["field journal", "/field-journal"],
  ["dig site", "#receipts"],
  ["artifacts", "#artifacts"],
  ["gadgets", "#gadgets"],
  ["legend", "/about"],
];

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// ONE pass over the text. The hazard (review of c19e6a5): a per-phrase loop re-scans its
// own output, so a later phrase that is a substring of an earlier href or of the class
// name ("journal" after "field journal", or a phrase matching "inline") lands an anchor
// inside an attribute. A single alternation regex, longest phrase first, sees the text
// once and never re-reads inserted markup; a phrase already linked is skipped.
export const linkify = (text: string, links: [string, string][] = inlineLinks): string => {
  const table = [...links].sort((a, b) => b[0].length - a[0].length);
  const hrefOf = new Map(table.map(([p, h]) => [p.toLowerCase(), h]));
  const re = new RegExp(`\\b(${table.map(([p]) => escapeRe(p)).join("|")})\\b`, "gi");
  const used = new Set<string>();
  return escapeHtml(text).replace(re, (m) => {
    const key = m.toLowerCase();
    if (used.has(key)) return m;
    used.add(key);
    return `<a class="inline-link" href="${hrefOf.get(key)}">${m}</a>`;
  });
};
