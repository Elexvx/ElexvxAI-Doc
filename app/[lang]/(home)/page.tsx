import { CapabilitiesSection } from './_components/capabilities-section';
import { ExploreSection } from './_components/explore-section';
import { HeroSection } from './_components/hero-section';
import { HomeFooter } from './_components/home-footer';
import { NewsSection } from './_components/news-section';

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <>
      <main className="mx-auto w-full max-w-[1400px] px-6 pb-10 pt-3 md:px-12 md:pt-6 lg:px-16">
        <HeroSection />
        <CapabilitiesSection />
        <NewsSection />
        <ExploreSection />
      </main>
      <HomeFooter lang={lang} />
    </>
  );
}
