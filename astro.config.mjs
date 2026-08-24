// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Post reveals (map-site-v3 ticket 06: "reveals on figures and headings"). Marks the
// top-level h2, h3, figure and pre nodes of every post body, plus a paragraph that is only
// an image (MDX emits figures that way), with class="reveal" at build time, so the one
// observer in BaseLayout picks them up and no script runs per post. Paragraphs are not
// marked on purpose.
const REVEAL_TAGS = new Set(['h2', 'h3', 'figure', 'pre']);
const isImgOnly = (n) =>
  n.tagName === 'p' &&
  n.children.filter((c) => c.type !== 'text' || c.value.trim()).every((c) => c.type === 'element' && c.tagName === 'img');
const rehypePostReveal = () => (tree) => {
  for (const n of tree.children) {
    if (n.type !== 'element' || !(REVEAL_TAGS.has(n.tagName) || isImgOnly(n))) continue;
    const cls = n.properties.className;
    n.properties.className = [...(Array.isArray(cls) ? cls : cls ? [cls] : []), 'reveal'];
    // Open full size (journal review, 2026-08-24). Post images render at 340 css px on a
    // phone (the figure sits on the 31em text measure, ticket 03), and a 1676 px strip with
    // 14 px labels is 3 px there. A plain link to the file is the zero-JS fallback: the
    // browser opens it at native size and the phone pinch-zooms. Only image-only paragraphs,
    // so an image inside a figure with its own markup is left alone.
    if (isImgOnly(n)) {
      n.children = n.children.map((c) =>
        c.type === 'element' && c.tagName === 'img'
          ? { type: 'element', tagName: 'a', properties: { href: c.properties.src, className: ['zoom'], target: '_blank', rel: 'noopener', ariaLabel: 'Open the image at full size' }, children: [c] }
          : c,
      );
    }
  }
};

// https://astro.build/config
export default defineConfig({
  site: 'https://markostankovic.org',
  redirects: {
    // The journal lives at /field-journal (issues/map-site-v3/10-devlog-name.md, amendment
    // 2026-08-23). Every old route goes there in ONE hop: /blog used to point at /devlog and
    // would otherwise chain through it. /devlog and /lab-notes are the two earlier names.
    // Static targets carry the trailing slash so the host does not add a 301; dynamic targets
    // must match the route pattern exactly (Astro borrows its getStaticPaths) and cannot.
    '/devlog': '/field-journal/',
    '/devlog/[slug]': '/field-journal/[slug]',
    '/lab-notes': '/field-journal/',
    '/blog': '/field-journal/',
    '/blog/[slug]': '/field-journal/[slug]',
    // Permanent CV link for job applications. Points at the base CV in public/,
    // so the downloaded filename stays Marko-Stankovic-CV.pdf.
    '/cv': '/Marko-Stankovic-CV.pdf',
  },
  markdown: { syntaxHighlight: false, rehypePlugins: [rehypePostReveal] },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
