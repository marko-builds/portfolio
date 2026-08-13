import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  // Drafts are excluded unconditionally — deliberately NOT the `import.meta.env.DEV || !draft`
  // convention the devlog pages use. A page rendered in dev is for Marko to review; a feed is a
  // publishing surface, and a draft that reaches a reader's feed reader cannot be recalled.
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Marko Stankovic — Devlog',
    description:
      'Build notes on the systems, tooling, and measurements behind the work.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.excerpt,
      pubDate: post.data.date,
      link: `/devlog/${post.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
