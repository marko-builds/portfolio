// PROTOTYPE hero copy, identical in both variants. Nothing here is approved copy:
// ticket 11 owns the words, the receipts row and the photo are still fog.
export const hero = {
  name: "Marko Stankovic",
  line: "[PLACEHOLDER] I build real things with AI agents and show the receipts.",
  sub: "[PLACEHOLDER] Agent harnesses, eval gates and a generative media engine, built in the open from Belgrade.",
  photo: "/portrait.webp",
  ctas: [
    { label: "Read the lab notes", href: "/devlog", primary: true },
    { label: "See the tools", href: "#work", primary: false },
  ],
};

// Receipts. The post count is read off the content collection at build time;
// the other two are placeholders until the map settles which three numbers go
// here and where each comes from (proof card contract: link + number + date).
export const receipts = (postCount: number) => [
  { n: "3", label: "open source tools", note: "[PLACEHOLDER] source: GitHub", href: "https://github.com/marko-builds" },
  { n: String(postCount), label: "lab notes published", note: "source: this site", href: "/devlog" },
  { n: "2", label: "apps shipping", note: "[PLACEHOLDER] source: stores", href: "#products" },
];
