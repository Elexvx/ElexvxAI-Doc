import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { isLocale, type AppLocale } from '@/lib/i18n';
import type { ReactNode } from 'react';
import { getNavLinks } from '@/lib/nav-links';
import { notFound } from 'next/navigation';
import { SiteRootProvider } from '@/components/site-root-provider';

function normalizeTagName(tag: string) {
  return tag
    .split(/[-_\s]+/)
    .map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as AppLocale;
  const tags = Array.from(
    new Set(
      source
        .getPages(locale)
        .flatMap((page) => page.data.tags ?? [])
        .filter((tag): tag is string => typeof tag === 'string' && tag.length > 0),
    ),
  )
    .sort((a, b) => a.localeCompare(b))
    .map((tag) => ({
      value: tag,
      name: normalizeTagName(tag),
    }));

  return (
    <SiteRootProvider locale={locale} tags={tags}>
      <DocsLayout tree={source.getPageTree(locale)} {...baseOptions(locale)} links={getNavLinks(locale, { includeLanguageToggle: false })}>
        {children}
      </DocsLayout>
    </SiteRootProvider>
  );
}
