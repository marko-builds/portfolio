// The Legend page's dated facts (issues/13-legend-page.md; map-site-v3 ticket 12 Answer,
// point 2). Promoted from src/pages/proto/about/_dates.ts, which slice 14 deletes.
//
// Every row is read off the v2 `timeline` and `education` arrays and the proof-card
// dates; nothing is invented. The current role carries NO organization line on purpose
// (Marko, 2026-08-15; cold-read item 7 declined). Labels are copy-pack-v3 section 8's
// table as approved by section 11 ("tile labels unchanged, they are facts") with the one
// change that table makes: the degree tile carries "BSc" as its small figure and reads
// "Degree completed", so the two 2025 tiles stop reading as twins.
//
// `photo` is the repo photo for that date, or null. Every dated entry is null: the repo
// holds one people photo (public/portrait.webp, 480x480, undated) and it stands on the
// undated "Now" tile only. Gaps render as typographic year tiles (LegendStrip.astro);
// photos are Marko's to source and never come from outside the repo.
export type DateEntry = {
  when: string;       // as printed under the tile
  year: string;       // the big figure on a typographic tile
  figure?: string;    // the small figure on a typographic tile (a month, or "BSc")
  label: string;
  org: string;
  photo: string | null;
  href?: string;
};

export const dates: DateEntry[] = [
  { when: "2021", year: "2021", label: "BSc, Computer Games & Programming", org: "Univerzitet Metropolitan, Belgrade", photo: null },
  { when: "Jun 2024", year: "2024", figure: "Jun", label: "Unity Developer Intern", org: "Inlustris Studio, Belgrade", photo: null },
  { when: "Mar 2025", year: "2025", figure: "Mar", label: "Unity Game Developer", org: "Replai, Belgrade (Remote)", photo: null },
  { when: "2025", year: "2025", figure: "BSc", label: "Degree completed", org: "Univerzitet Metropolitan, Belgrade", photo: null },
  { when: "Sep 2025", year: "2025", figure: "Sep", label: "AI Engineer", org: "Belgrade", photo: null },
  { when: "Jul 2026", year: "2026", figure: "Jul", label: "skill-vibe-test and duskpaper, open source", org: "github.com/marko-builds", photo: null, href: "https://github.com/marko-builds" },
  { when: "Aug 2026", year: "2026", figure: "Aug", label: "adpreflight, open source", org: "github.com/marko-builds", photo: null, href: "https://github.com/marko-builds/adpreflight" },
  { when: "Now", year: "Now", label: "DeployLog and Habitagram", org: "Belgrade", photo: "/portrait.webp", href: "#current-dig" },
];
