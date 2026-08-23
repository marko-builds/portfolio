// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://markostankovic.org',
  redirects: {
    // The journal lives at /field-journal (issues/map-site-v3/10-devlog-name.md, amendment
    // 2026-08-23). Every old route goes there in ONE hop: /blog used to point at /devlog and
    // would otherwise chain through it. /devlog and /lab-notes are the two earlier names.
    '/devlog': '/field-journal',
    '/devlog/[slug]': '/field-journal/[slug]',
    '/lab-notes': '/field-journal',
    '/blog': '/field-journal',
    '/blog/[slug]': '/field-journal/[slug]',
    // Permanent CV link for job applications. Points at the base CV in public/,
    // so the downloaded filename stays Marko-Stankovic-CV.pdf.
    '/cv': '/Marko-Stankovic-CV.pdf',
  },
  markdown: { syntaxHighlight: false },
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
