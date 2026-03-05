import type { MetadataRoute } from 'next';
import { i18n } from '@/lib/i18n';
import { getAllPosts } from '@/lib/blog';
import { source } from '@/lib/source';
import { buildAbsoluteUrl, buildLocalePath } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [];
  const posts = await getAllPosts();

  for (const locale of i18n.languages) {
    pages.push({
      url: buildAbsoluteUrl(buildLocalePath(locale)),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    });
    pages.push({
      url: buildAbsoluteUrl(buildLocalePath(locale, '/docs')),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    });
    pages.push({
      url: buildAbsoluteUrl(buildLocalePath(locale, '/blog')),
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    });
    pages.push({
      url: buildAbsoluteUrl(buildLocalePath(locale, '/sponsors')),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    });

    for (const page of source.getPages(locale)) {
      pages.push({
        url: buildAbsoluteUrl(page.url),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }

    for (const post of posts) {
      pages.push({
        url: buildAbsoluteUrl(buildLocalePath(locale, `/blog/${post.slug}`)),
        lastModified: post.date ? new Date(post.date) : now,
        changeFrequency: 'weekly',
        priority: 0.6,
      });
    }
  }

  return pages;
}
