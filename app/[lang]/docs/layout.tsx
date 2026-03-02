import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { DocsLanguageSwitcher } from '@/components/docs-language-switcher';
import { i18nUI, type AppLocale } from '@/lib/i18n';
import type { ReactNode } from 'react';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as AppLocale;

  const pageSlugs = Object.fromEntries(
    i18nUI.provider(locale).locales?.map((item) => [
      item.locale,
      source.getPages(item.locale).map((page) => page.slugs.join('/')),
    ]) ?? [],
  );

  return (
    <DocsLayout tree={source.getPageTree(locale)} {...baseOptions(locale)}>
      <div className="px-4 py-3 md:px-6 lg:px-8">
        <DocsLanguageSwitcher lang={locale} locales={i18nUI.provider(locale).locales ?? []} pageSlugs={pageSlugs} />
      </div>
      {children}
    </DocsLayout>
  );
}
