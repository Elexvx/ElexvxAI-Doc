import { i18n, isLocale } from '@/lib/i18n';
import { source } from '@/lib/source';

export const runtime = 'nodejs';
export const revalidate = false;

const CACHE_CONTROL = 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const localeParam = url.searchParams.get('locale');
  const locale = localeParam && isLocale(localeParam) ? localeParam : i18n.defaultLanguage;

  const lines: string[] = [];
  lines.push('# Documentation');
  lines.push('');

  for (const page of source.getPages(locale)) {
    lines.push(`- [${page.data.title}](${page.url}): ${page.data.description}`);
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': CACHE_CONTROL,
    },
  });
}
