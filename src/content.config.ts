import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    nav: z
      .object({
        label: z.string().optional(),
        order: z.number().optional(),
      })
      .optional(),
    draft: z.boolean().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    image: z.string().optional(),
    author: z.string().optional(),
    authorImg: z.string().optional(),
    readTime: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { docs, blog };
