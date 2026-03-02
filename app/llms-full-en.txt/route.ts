import { getLLMFullText } from '@/lib/get-llm-text';

export const runtime = 'nodejs';
export const revalidate = false;

const CACHE_CONTROL = 'public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400';

export async function GET() {
  return new Response(await getLLMFullText('en'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': CACHE_CONTROL,
    },
  });
}
