import { CapabilitiesSection } from './_components/capabilities-section';
import { ExploreSection } from './_components/explore-section';
import { HeroSection } from './_components/hero-section';
import { HomeFooter } from './_components/home-footer';
import { NewsSection } from './_components/news-section';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <main className="mx-auto w-full max-w-[var(--fd-layout-width)] px-4 pb-10 pt-3 md:pt-6">
        <HeroSection />
        <CapabilitiesSection />
        <NewsSection />
        <ExploreSection />
      </main>
      <HomeFooter lang={lang} />
    </>
  );
}
