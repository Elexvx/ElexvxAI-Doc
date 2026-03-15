import { i18n, isLocale } from '@/lib/i18n';
import type { AppLocale } from '@/lib/i18n';
import { getSeoSite } from '@/lib/seo-content';
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
  const locale = lang as AppLocale;
  const siteSeo = await getSeoSite(locale);

  return {
    title: {
      default: siteSeo.title,
      template: `%s | ${siteSeo.title}`,
    },
    description: siteSeo.description,
    alternates: {
      canonical: buildAbsoluteUrl(buildLocalePath(lang)),
      languages: buildLocaleAlternates(),
    },
    openGraph: {
      type: 'website',
      title: siteSeo.title,
      description: siteSeo.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteSeo.title,
      description: siteSeo.description,
    },
    other: {
      'html-lang': getHtmlLang(lang),
    },
  };
}

export function generateStaticParams() {
  return i18n.languages.map((lang) => ({ lang }));
}
