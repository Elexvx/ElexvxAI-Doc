import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { i18n } from '@/lib/i18n';
import type { AppLocale } from '@/lib/i18n';
import { getMDXComponents } from '@/mdx-components';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';
import { HomeFooter } from '../../_components/home-footer';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const MDX = post.body;
  const displayCategory = post.categories.join(' · ');
  const summaryText = post.summary;

  return (
    <>
      <DocsPage
        toc={[]}
        breadcrumb={{ enabled: false }}
        footer={{ enabled: false }}
        tableOfContent={{ enabled: false }}
        tableOfContentPopover={{ enabled: false }}
      >
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-black dark:text-white md:text-base">
            <span>{post.formattedDate}</span>
            <span>·</span>
            <span className="uppercase">{displayCategory}</span>
          </div>
          <DocsTitle className="mx-auto mt-5 max-w-[22ch] text-center text-[clamp(1.9rem,6.2vw,4.2rem)] leading-[1.08] [text-wrap:balance]">
            {post.title}
          </DocsTitle>
          <DocsDescription className="mx-auto mt-4 mb-0 max-w-3xl text-center text-base !text-black dark:!text-white md:text-lg">
            {summaryText}
          </DocsDescription>
        </div>
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border bg-fd-card">
          <Image src={post.cover} alt={post.title} fill className="object-cover" sizes="(min-width: 1024px) 960px, 100vw" />
        </div>
        <DocsBody>
          <MDX components={getMDXComponents()} />
        </DocsBody>
      </DocsPage>
      <HomeFooter lang={lang as AppLocale} />
    </>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return i18n.languages.flatMap((lang) => posts.map((post) => ({ lang, slug: post.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();
  const canonicalPath = buildLocalePath((i18n.languages.includes(lang as AppLocale) ? (lang as AppLocale) : 'zh'), `/blog/${slug}`);
  const canonical = buildAbsoluteUrl(canonicalPath);

  return {
    title: post.title,
    description: `${post.categories.join(' · ')} · ${post.formattedDate}`,
    alternates: {
      canonical,
      languages: buildLocaleAlternates(`/blog/${slug}`),
    },
    openGraph: {
      type: 'article',
      url: canonical,
      images: post.cover,
    },
    twitter: {
      card: 'summary_large_image',
      images: post.cover,
    },
  };
}

export const dynamicParams = false;
