// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://markostankovic.org',
  redirects: {
    '/blog': '/devlog',
    '/blog/[slug]': '/devlog/[slug]',
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
