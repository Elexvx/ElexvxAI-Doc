import { source } from '@/lib/source';
import { i18n, isLocale } from '@/lib/i18n';
import { SiteRootProvider } from '@/components/site-root-provider';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

function normalizeTagName(tag: string) {
  return tag
    .split(/[-_\s]+/)
    .map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');
}

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const tags = Array.from(
    new Set(
      source
        .getPages(lang)
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
    <SiteRootProvider locale={lang} tags={tags}>
      {children}
    </SiteRootProvider>
  );
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
