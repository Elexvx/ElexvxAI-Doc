import { CapabilitiesSection } from './_components/capabilities-section';
import { ExploreSection } from './_components/explore-section';
import { HeroSection } from './_components/hero-section';
import { HomeFooter } from './_components/home-footer';
import { NewsSection } from './_components/news-section';
import { getHomeCapabilities, getHomeExploreItems, getHomePageCopy } from '@/lib/home-content';
import { isLocale, type AppLocale } from '@/lib/i18n';
import { getSeoPage } from '@/lib/seo-content';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';
import { SITE_HOME_MAIN_CLASS } from '@/lib/responsive-layout';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as AppLocale;
  const [copy, capabilities, exploreItems] = await Promise.all([
    getHomePageCopy(locale),
    getHomeCapabilities(locale),
    getHomeExploreItems(locale),
  ]);

  return (
    <>
      <main className={SITE_HOME_MAIN_CLASS}>
        <HeroSection lang={locale} copy={copy.hero} />
        <CapabilitiesSection capabilities={capabilities} />
        <NewsSection lang={lang} copy={copy.news} />
        <ExploreSection title={copy.explore.title} exploreItems={exploreItems} />
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
  const seo = await getSeoPage(lang, 'home');
  const canonical = buildAbsoluteUrl(buildLocalePath(lang));

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages: buildLocaleAlternates(),
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
