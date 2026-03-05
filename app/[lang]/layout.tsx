import { i18n, isLocale } from '@/lib/i18n';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath, getHtmlLang } from '@/lib/site';

export default async function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return children;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return {
    alternates: {
      canonical: buildAbsoluteUrl(buildLocalePath(lang)),
      languages: buildLocaleAlternates(),
    },
    other: {
      'html-lang': getHtmlLang(lang),
    },
  };
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
