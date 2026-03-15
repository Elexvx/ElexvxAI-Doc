import { BlogIndexClient } from '@/components/blog/blog-index-client';
import { getAllPosts } from '@/lib/blog';
import { isLocale, type AppLocale } from '@/lib/i18n';
import { getSeoPage } from '@/lib/seo-content';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';
import { HomeFooter } from '../_components/home-footer';
import { SITE_BLOG_MAIN_CLASS } from '@/lib/responsive-layout';
import { Suspense } from 'react';

const blogPageCopy: Record<AppLocale, { featuredLabel: string; allLabel: string; tabsAriaLabel: string }> = {
  zh: {
    featuredLabel: '精选内容',
    allLabel: '全部',
    tabsAriaLabel: '博客分类',
  },
  en: {
    featuredLabel: 'Featured',
    allLabel: 'All',
    tabsAriaLabel: 'Blog categories',
  },
};

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as AppLocale;
  const copy = blogPageCopy[locale];

  const allPosts = await getAllPosts();
  const categories = [...new Set(allPosts.flatMap((post) => post.categories))].sort((a, b) => a.localeCompare(b));

  return (
    <>
      <main className={SITE_BLOG_MAIN_CLASS}>
        <Suspense>
          <BlogIndexClient
            lang={lang}
            allPosts={allPosts}
            categories={categories}
            featuredLabel={copy.featuredLabel}
            allLabel={copy.allLabel}
            tabsAriaLabel={copy.tabsAriaLabel}
          />
        </Suspense>
      </main>
      <HomeFooter lang={locale} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const seo = await getSeoPage(lang, 'blog');
  const canonical = buildAbsoluteUrl(buildLocalePath(lang, '/blog'));

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages: buildLocaleAlternates('/blog'),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: seo.title,
      description: seo.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
  };
}
