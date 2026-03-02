import { type InferPageType } from 'fumadocs-core/source';
import { source } from '@/lib/source';

export async function getLLMText(page: InferPageType<typeof source>) {
  const processed = await page.data.getText('processed');

  return `# ${page.data.title}\n\n${processed}`;
}

export async function getLLMFullText(locale?: string) {
  const scanned = await Promise.all(source.getPages(locale).map(getLLMText));
  return scanned.join('\n\n');
}
