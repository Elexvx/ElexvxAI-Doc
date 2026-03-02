import { i18n, isLocale } from '@/lib/i18n';
import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';
import type { StructuredData } from 'fumadocs-core/mdx-plugins/remark-structure';

const searchAPI = createFromSource(source, {
  localeMap: {
    zh: 'english',
    en: 'english',
  },
  async buildIndex(page) {
    const data = page.data as {
      structuredData?: unknown;
      load?: () => Promise<{ structuredData?: unknown }>;
    };
    const structuredData = data.structuredData ?? (await data.load?.())?.structuredData;
    if (!structuredData) {
      throw new Error(`Cannot build search index for page: ${page.url}`);
    }

    return {
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: structuredData as StructuredData,
      tag: page.data.tags,
    };
  },
});

export const runtime = 'nodejs';
export const revalidate = false;

const CACHE_CONTROL = 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400';

function resolveLocale(req: Request, url: URL) {
  const queryLocale = url.searchParams.get('locale');
  if (queryLocale && isLocale(queryLocale)) return queryLocale;

  const headerLocale = req.headers.get('x-docs-locale');
  if (headerLocale && isLocale(headerLocale)) return headerLocale;

  return i18n.defaultLanguage;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get('query');

  if (!query) {
    const exported = await searchAPI.export();
    return Response.json(exported, {
      headers: {
        'Cache-Control': CACHE_CONTROL,
      },
    });
  }

  const tag = url.searchParams
    .get('tag')
    ?.split(',')
    .map((value) => value.trim())
    .filter(Boolean);

  const results = await searchAPI.search(query, {
    locale: resolveLocale(req, url),
    tag,
    mode: url.searchParams.get('mode') === 'vector' ? 'vector' : 'full',
  });

  return Response.json(results, {
    headers: {
      'Cache-Control': CACHE_CONTROL,
    },
  });
}
