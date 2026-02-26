// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkDirective from 'remark-directive';
import { remarkCards } from './src/plugins/remark-cards.mjs';
import { remarkCodeGroup } from './src/plugins/remark-code-group.mjs';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  integrations: [mdx()],
  markdown: {
    remarkPlugins: [remarkDirective, remarkCards, remarkCodeGroup],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
        },
      ],
    ],
  },
});
