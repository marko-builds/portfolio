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
    // Issue 18 (prd-field-journal-openers). `opener` is the one-line frame the post hero
    // renders in the excerpt's slot; absent, the hero shows the excerpt. `entry` is the
    // permanent "Entry NN" number, a QUOTED two-digit string: YAML reads a bare 08 or 09 as a
    // different type from a bare 01, so the schema refuses anything that is not "\d\d".
    opener: z.string().optional(),
    entry: z.string().regex(/^\d{2}$/, 'entry must be a quoted two-digit string such as "03"').optional(),
  }),
});

export const collections = { blog };
