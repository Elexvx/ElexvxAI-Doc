import { getPageImage, source } from '@/lib/source';
import { i18n, isLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { ImageResponse } from '@takumi-rs/image-response';
import { generate as DefaultImage } from 'fumadocs-ui/og/takumi';

export const runtime = 'nodejs';
export const revalidate = false;

const CACHE_CONTROL = 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;

  const localeCandidate = slug[0];
  const locale = isLocale(localeCandidate) ? localeCandidate : i18n.defaultLanguage;
  const pageSlug = isLocale(localeCandidate) ? slug.slice(1, -1) : slug.slice(0, -1);

  const page = source.getPage(pageSlug, locale);
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage title={page.data.title} description={page.data.description} site="My App" />,
    {
      width: 1200,
      height: 630,
      format: 'webp',
      headers: {
        'Cache-Control': CACHE_CONTROL,
      },
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
