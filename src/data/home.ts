// Home hero copy and receipts, promoted 2026-08-23 from src/pages/proto/_hero.ts
// (issues/10-promote-register-home.md). The words are the prototype's; slice 11
// (issues/11-copy-pass-and-receipts.md, copy-pack-v3 section 11) owns every string
// here and the three receipts' sources. The "[PLACEHOLDER] " markers the prototype
// carried are stripped at the call site (stripPlaceholder), the way proto/04 and 05 did.
export const hero = {
  name: "Marko Stankovic",
  line: "[PLACEHOLDER] I build real things with AI agents and show the receipts.",
  sub: "[PLACEHOLDER] Agent harnesses, eval gates and a generative media engine, built in the open from Belgrade.",
  photo: "/portrait.webp",
  ctas: [
    { label: "Read the lab notes", href: "/field-journal", primary: true },
    { label: "See the tools", href: "#gadgets", primary: false },
  ],
};

// Receipts. The entry count is read off the content collection at build time
// (non-draft only in a build); the other two are stand-ins until slice 11.
export const receipts = (postCount: number) => [
  { n: "3", label: "open source tools", note: "[PLACEHOLDER] source: GitHub", href: "https://github.com/marko-builds" },
  { n: String(postCount), label: "lab notes published", note: "source: this site", href: "/field-journal" },
  { n: "2", label: "apps shipping", note: "[PLACEHOLDER] source: stores", href: "#artifacts" },
];

export const stripPlaceholder = (s: string) => s.replace(/^\[PLACEHOLDER\]\s*/, "");
