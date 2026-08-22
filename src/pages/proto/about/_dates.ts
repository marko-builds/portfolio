// PROTOTYPE, throwaway. issues/map-site-v3/12-about-page.md.
// The dated facts for the /about strip, read off main's src/pages/index.astro
// (the v2 `timeline` and `education` arrays, records from map-site-v2/04) and the
// v2 proof-card dates. Nothing here is invented; the current role carries NO
// organization line on purpose (Marko cut it 2026-08-15). Role titles are the v2
// wording; any new sentence on the page itself is marked [PLACEHOLDER] for ticket 11.
//
// `photo` is the repo photo for that date, or null. Today every dated entry is null:
// the repo holds one people photo (public/portrait.webp, 480x480, undated, added
// 2026-08-15) and it stands on the undated "Now" tile only. The gaps ARE the
// inventory; see the ticket's dated section.
export type DateEntry = {
  when: string;       // as printed under the tile
  year: string;       // the big figure on a typographic tile
  month?: string;     // the small figure on a typographic tile
  label: string;
  org: string;
  photo: string | null;
  href?: string;
};

export const dates: DateEntry[] = [
  { when: "2021", year: "2021", label: "BSc, Computer Games & Programming", org: "Univerzitet Metropolitan, Belgrade", photo: null },
  { when: "Jun 2024", year: "2024", month: "Jun", label: "Unity Developer Intern", org: "Inlustris Studio, Belgrade", photo: null },
  { when: "Mar 2025", year: "2025", month: "Mar", label: "Unity Game Developer", org: "Replai, Belgrade (Remote)", photo: null },
  { when: "2025", year: "2025", label: "BSc completed", org: "Univerzitet Metropolitan, Belgrade", photo: null },
  { when: "Sep 2025", year: "2025", month: "Sep", label: "AI Engineer", org: "Belgrade", photo: null },
  { when: "Jul 2026", year: "2026", month: "Jul", label: "skill-vibe-test and duskpaper, open source", org: "github.com/marko-builds", photo: null, href: "https://github.com/marko-builds" },
  { when: "Aug 2026", year: "2026", month: "Aug", label: "adpreflight, open source", org: "github.com/marko-builds", photo: null, href: "https://github.com/marko-builds/adpreflight" },
  { when: "Now", year: "Now", label: "DeployLog and Habitagram", org: "Belgrade", photo: "/portrait.webp", href: "#now" },
];

export const identity = {
  name: "Marko Stankovic",
  location: "Belgrade, Serbia",
  languages: "Serbian (native), English",
  github: "https://github.com/marko-builds",
  rss: "/rss.xml",
  email: "contact@markostankovic.org",
  call: "/call",
};

// Story paragraphs. Facts from context/about-me.md and the v2 timeline; every sentence is
// a stand-in and carries the marker, ticket 11 writes the real ones.
export const story = [
  "[PLACEHOLDER] I am Marko, a builder in Belgrade. I spent three years making games in Unity and C#, first at Inlustris Studio and then at Replai, and finished a BSc in game development along the way.",
  "[PLACEHOLDER] In 2025 I stopped shipping features and started shipping the engine: an agent harness that implements whole branches overnight behind tests and a review gate, a generative media studio that renders its own launch media, and the small tools that measure whether an AI feature actually worked.",
  "[PLACEHOLDER] Everything on this site comes out of that engine, and every number on it links to the thing it counts. Outside work I am a beginner at three things: photography, guitar and short stories.",
];

export const now = {
  intro: "[PLACEHOLDER] Two apps are on the way out the door, and the lab notes record how they get there.",
  rows: [
    { name: "deploylog", what: "Release notes from real git history.", href: "/projects/deploylog/", status: "launching" },
    { name: "habitagram", what: "Habit tracking as a journey.", href: null, status: "near launch" },
    { name: "studio", what: "The generative media engine behind both.", href: "/devlog", status: "internal" },
  ],
};

export const follow = {
  intro: "[PLACEHOLDER] No newsletter. The lab notes have a feed and the tools live on GitHub; both are free to follow and neither asks for an address.",
};
