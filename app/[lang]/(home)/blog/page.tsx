import { BlogFeatured } from '@/components/blog/blog-featured';
import { BlogPostRow } from '@/components/blog/blog-post-row';
import { BlogTabs } from '@/components/blog/blog-tabs';
import { getAllPosts, getBlogCategories, getFeaturedPost, getPostsByCategory } from '@/lib/blog';
import { isLocale, type AppLocale } from '@/lib/i18n';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';
import { HomeFooter } from '../_components/home-footer';

const blogPageCopy: Record<AppLocale, { featuredLabel: string; allLabel: string; tabsAriaLabel: string; title: string; description: string }> = {
  zh: {
    featuredLabel: '精选内容',
    allLabel: '全部',
    tabsAriaLabel: '博客分类',
    title: '博客',
    description: 'ElexvxAI Lab 的最新动态、研究进展与工程实践。',
  },
  en: {
    featuredLabel: 'Featured',
    allLabel: 'All',
    tabsAriaLabel: 'Blog categories',
    title: 'Blog',
    description: 'Latest updates, research progress, and engineering practices from ElexvxAI Lab.',
  },
};

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const { category: rawCategory } = await searchParams;
  const locale = lang as AppLocale;
  const copy = blogPageCopy[locale];

  const categories = await getBlogCategories();
  const activeCategory = rawCategory && categories.includes(rawCategory) ? rawCategory : null;
  const featuredPost = await getFeaturedPost();

  const postsByCategory = await getPostsByCategory(activeCategory ?? '');
  const listPosts =
    featuredPost == null ? postsByCategory : postsByCategory.filter((post) => post.slug !== featuredPost.slug);

  const fallbackPosts = featuredPost == null ? await getAllPosts() : [];
  const displayFeatured = featuredPost ?? fallbackPosts[0];

  return (
    <>
      <main className="mx-auto w-full max-w-[1460px] px-8 pb-10 pt-8 md:px-12 md:pb-12 md:pt-12 lg:px-20">
        {displayFeatured ? <BlogFeatured post={displayFeatured} lang={lang} badgeLabel={copy.featuredLabel} /> : null}

        <BlogTabs
          lang={lang}
          categories={categories}
          activeCategory={activeCategory}
          allLabel={copy.allLabel}
          navAriaLabel={copy.tabsAriaLabel}
        />

        <section className="mt-2 grid gap-x-10 md:grid-cols-2">
          {listPosts.map((post) => (
            <BlogPostRow key={post.slug} post={post} lang={lang} />
          ))}
        </section>
      </main>
      <HomeFooter lang={locale} layout="blog" />
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
  const copy = blogPageCopy[lang];
  const canonical = buildAbsoluteUrl(buildLocalePath(lang, '/blog'));

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: buildLocaleAlternates('/blog'),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: copy.title,
      description: copy.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
    },
  };
}
