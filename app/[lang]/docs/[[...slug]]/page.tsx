import { getPageImage, source } from '@/lib/source';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { LLMCopyButton, ViewOptions } from '@/components/ai/page-actions';
import { gitConfig } from '@/lib/layout.shared';
import { isLocale } from '@/lib/i18n';
import { buildAbsoluteUrl, buildLocalePath } from '@/lib/site';
import { DOCS_PAGE_MAX_WIDTH_CLASS } from '@/lib/responsive-layout';

export default async function Page({ params }: { params: Promise<{ lang: string; slug?: string[] }> }) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const page = source.getPage(slug, lang);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      className={DOCS_PAGE_MAX_WIDTH_CLASS}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">{page.data.description}</DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pb-6">
        <LLMCopyButton markdownUrl={`${page.url}.mdx`} />
        <ViewOptions
          markdownUrl={`${page.url}.mdx`}
          githubUrl={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${lang}/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams('slug', 'lang');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug?: string[] }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const page = source.getPage(slug, lang);
  if (!page) notFound();
  const canonical = buildAbsoluteUrl(page.url);
  const languages = {
    zh: buildAbsoluteUrl(source.getPage(slug, 'zh')?.url ?? buildLocalePath('zh', '/docs')),
    en: buildAbsoluteUrl(source.getPage(slug, 'en')?.url ?? buildLocalePath('en', '/docs')),
  };
  const image = getPageImage(page).url;

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'article',
      url: canonical,
      images: image,
    },
    twitter: {
      card: 'summary_large_image',
      images: image,
    },
  };
}

export const dynamicParams = false;
