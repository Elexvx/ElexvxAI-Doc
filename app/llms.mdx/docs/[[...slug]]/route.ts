import { getLLMText } from '@/lib/get-llm-text';
import { i18n, isLocale } from '@/lib/i18n';
import { source } from '@/lib/source';
import { notFound } from 'next/navigation';

export const runtime = 'nodejs';
export const revalidate = false;
export const dynamicParams = false;

const CACHE_CONTROL = 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const { slug = [] } = await params;
  const [first, ...rest] = slug;

  const locale = first && isLocale(first) ? first : i18n.defaultLanguage;
  const actualSlug = first && isLocale(first) ? rest : slug;
  const page = source.getPage(actualSlug, locale);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': CACHE_CONTROL,
    },
  });
}

export function generateStaticParams() {
  const localized = source.generateParams('slug', 'lang').map((param) => ({
    slug: [param.lang, ...param.slug],
  }));

  const defaultLocale = source
    .generateParams('slug', 'lang')
    .filter((param) => param.lang === i18n.defaultLanguage)
    .map((param) => ({ slug: param.slug }));

  return [...defaultLocale, ...localized];
}
