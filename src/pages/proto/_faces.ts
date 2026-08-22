// PROTOTYPE, throwaway. Ticket 04's display-face candidates, one self-hosted latin woff2
// each under public/fonts/ (pulled from Google Fonts' static CDN on 2026-08-23, OFL).
// `geist` is the control: no file, the hero and h2 fall back to --font-sans.
export type Face = {
  slug: string;
  label: string;
  family: string | null;   // @font-face family; null = control
  file: string | null;     // public/fonts/<file>
  weight: number;
  bytes: number;
  tracking: string;        // letter-spacing on the hero h1
  scale: number;           // hero h1 size multiplier (serif runs small at equal px)
  note: string;
};

export const faces: Face[] = [
  { slug: "geist", label: "Geist (control)", family: null, file: null, weight: 600, bytes: 0,
    tracking: "-0.025em", scale: 1, note: "today's body face on the headings, nothing added" },
  { slug: "space-grotesk", label: "Space Grotesk 600", family: "Space Grotesk", file: "space-grotesk-600.woff2",
    weight: 600, bytes: 13284, tracking: "-0.02em", scale: 1, note: "ticket 01 precedent (naypache), geometric with odd details" },
  { slug: "bricolage", label: "Bricolage Grotesque 600", family: "Bricolage Grotesque", file: "bricolage-grotesque-600.woff2",
    weight: 600, bytes: 40016, tracking: "-0.02em", scale: 1, note: "opsz axis, display cut at large sizes, most character" },
  { slug: "syne", label: "Syne 700", family: "Syne", file: "syne-700.woff2",
    weight: 700, bytes: 14072, tracking: "-0.01em", scale: 0.96, note: "wide, agency voice, loudest of the set" },
  { slug: "instrument-serif", label: "Instrument Serif 400", family: "Instrument Serif", file: "instrument-serif-400.woff2",
    weight: 400, bytes: 21032, tracking: "0", scale: 1.16, note: "editorial contrast against Geist, one weight only" },
  { slug: "sora", label: "Sora 600", family: "Sora", file: "sora-600.woff2",
    weight: 600, bytes: 15000, tracking: "-0.02em", scale: 1, note: "rounded geometric, quietest departure from Geist" },
];
