// PROTOTYPE, throwaway. Ticket 05's mark and wordmark candidates
// (issues/map-site-v3/05-mark-and-wordmark.md). Every mark is drawn ONCE here, in the
// favicon.svg coordinate system (512 viewBox, ink inside the Android maskable safe circle,
// radius 204.8 about 256,256, stroke 52 = the weight v2 measured to hold at a 16px tab).
// The nav, the OG mock and the favicon candidates under public/proto/05/ all read this
// geometry; scripts at the pick copy the winner's `ink` into public/favicon.svg unchanged.
export type Mark = {
  slug: string;
  label: string;
  ink: string;      // SVG markup inside the 512 viewBox, fill/stroke = currentColor
  note: string;
};

export const INK = "#5FCEDB";   // --color-aurora-cyan, the brand triad's accent
export const TILE = "#0B0E15";  // --color-night-bg, the brand triad's navy (brand.json backgroundDeep)

const S = 'fill="none" stroke="currentColor" stroke-width="52" stroke-linecap="round" stroke-linejoin="round"';

export const marks: Mark[] = [
  {
    slug: "curtain",
    label: "Curtain: three rays",
    ink: `<path d="M176 186V372M256 140V372M336 210V372" ${S}/>`,
    note: "three aurora rays hanging to one baseline; the studio logo's ray motif at a weight that survives 16px",
  },
  {
    slug: "ribbon",
    label: "Ribbon: one wave",
    ink: `<path d="M118 300C170 150 226 150 256 256S342 362 394 212" ${S}/>`,
    note: "a single aurora band as one S-curve stroke; reads as a tilde at tab size",
  },
  {
    slug: "fold",
    label: "Fold: the M drape",
    ink: `<path d="M136 352L200 166L256 300L312 166L376 352" ${S}/>`,
    note: "a folded curtain that is also an M; the only candidate with a letter in it",
  },
  {
    slug: "veil",
    label: "Veil: filled curtain",
    ink: `<path d="M112 372V236C160 150 204 306 256 196C308 86 352 280 400 204V372Z" fill="currentColor"/>`,
    note: "a filled curtain silhouette with a wavy top edge; the one solid shape in the set",
  },
  {
    slug: "strands",
    label: "Strands: two waves",
    ink: `<path d="M118 256C170 126 226 126 256 226S342 326 394 196" fill="none" stroke="currentColor" stroke-width="40" stroke-linecap="round"/><path d="M118 346C170 216 226 216 256 316S342 416 394 286" fill="none" stroke="currentColor" stroke-width="40" stroke-linecap="round" opacity="0.6"/>`,
    note: "two layered bands, the lower one dimmed, the closest to the hero's stacked curtains; the risk is the two merging at 16px",
  },
];

export type Word = { slug: string; label: string; text: string; css: string; note: string };

export const words: Word[] = [
  {
    slug: "grotesk",
    label: "Space Grotesk 600",
    text: "Marko Stankovic",
    css: "font-family:var(--font-display);font-weight:600;font-size:1rem;letter-spacing:-0.01em",
    note: "the ticket 04 display face, so the wordmark and the h1 are one voice",
  },
  {
    slug: "geist",
    label: "Geist 600",
    text: "Marko Stankovic",
    css: "font-family:var(--font-sans);font-weight:600;font-size:1rem;letter-spacing:-0.01em",
    note: "the body face; quieter, no fourth role for the display face",
  },
  {
    slug: "mono",
    label: "JetBrains Mono 600, lowercase",
    text: "markostankovic",
    css: "font-family:var(--font-mono);font-weight:600;font-size:0.9rem;letter-spacing:0.02em",
    note: "the lineage of `> ms` without the prompt; matches the mono labels and the receipts",
  },
];

// 512-viewBox SVG with the tile behind the ink, in the exact shape public/favicon.svg has
// (rect id="tile" with rx=112, then the ink), so scripts/render-icons.sh consumes the winner as is.
export const faviconSvg = (m: Mark) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512" role="img" aria-label="Marko Stankovic">\n` +
  `  <!-- CANDIDATE ${m.slug}, ticket map-site-v3/05. Generated from src/pages/proto/05/_marks.ts. -->\n` +
  `  <rect id="tile" width="512" height="512" rx="112" fill="${TILE}"/>\n` +
  `  <g color="${INK}">${m.ink}</g>\n</svg>\n`;

// The ink alone, for inline use on a surface that brings its own background (the nav, the OG card).
export const inlineSvg = (m: Mark, px: number, cls = "mk") =>
  `<svg class="${cls}" viewBox="0 0 512 512" width="${px}" height="${px}" aria-hidden="true">${m.ink}</svg>`;
