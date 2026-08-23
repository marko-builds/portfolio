import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string(),
    tags: z.array(z.string()),
    beat: z.enum(["artifacts","gadgets","engine","agents","games"]).optional(),
    draft: z.boolean().optional().default(false),
    ogImage: z.string().optional(),
  }),
});

export const collections = { blog };
