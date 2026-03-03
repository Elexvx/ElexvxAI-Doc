import { defineCollections, defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

const docsPageSchema = pageSchema.extend({
  tags: z.array(z.string()).optional(),
});

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: docsPageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

const blogSchema = z.object({
  title: z.string(),
  date: z.preprocess(
    (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
    z.string(),
  ),
  category: z.union([z.string(), z.array(z.string()).min(1)]),
  summary: z.string(),
  cover: z.string(),
  featured: z.boolean().default(false),
});

export const blog = defineCollections({
  type: 'doc',
  dir: 'content/blog',
  schema: blogSchema,
});

export default defineConfig({
  mdxOptions: {
    // MDX options
  },
});
