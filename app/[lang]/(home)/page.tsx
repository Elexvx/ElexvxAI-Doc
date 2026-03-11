import { CapabilitiesSection } from './_components/capabilities-section';
import { ExploreSection } from './_components/explore-section';
import { HeroSection } from './_components/hero-section';
import { HomeFooter } from './_components/home-footer';
import { NewsSection } from './_components/news-section';
import { getHomeCapabilities, getHomeExploreItems, getHomePageCopy } from '@/lib/home-content';
import { isLocale, type AppLocale } from '@/lib/i18n';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildAbsoluteUrl, buildLocaleAlternates, buildLocalePath } from '@/lib/site';

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
      <main className="mx-auto w-full max-w-[var(--fd-layout-width)] px-4 pb-10 pt-3 md:pt-6">
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
  const copy = await getHomePageCopy(lang);
  const canonical = buildAbsoluteUrl(buildLocalePath(lang));

  return {
    title: copy.hero.headline,
    description: copy.hero.description,
    alternates: {
      canonical,
      languages: buildLocaleAlternates(),
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: copy.hero.headline,
      description: copy.hero.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.hero.headline,
      description: copy.hero.description,
    },
  };
}
