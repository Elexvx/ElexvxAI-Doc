'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import type { TagItem } from 'fumadocs-ui/contexts/search';
import { DocsSearchDialog } from '@/components/search/docs-search-dialog';
import { i18n, isLocale, type AppLocale } from '@/lib/i18n';
import type { I18nUIText } from '@/lib/i18n-ui';
import { localeDisplayNames } from '@/lib/locale-labels';

function replaceLocale(pathname: string, nextLocale: string) {
  const segments = pathname.split('/');
  if (segments[1] && isLocale(segments[1])) {
    segments[1] = nextLocale;
    return segments.join('/') || '/';
  }

  return `/${nextLocale}${pathname === '/' ? '' : pathname}`;
}

export function SiteRootProvider({
  locale,
  uiText,
  tags,
  children,
}: {
  locale: AppLocale;
  uiText: I18nUIText;
  tags: TagItem[];
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const locales = i18n.languages.map((item) => ({
    locale: item,
    name: localeDisplayNames[item],
  }));

  return (
    <RootProvider
      i18n={{
        locale,
        locales,
        translations: {
          search: uiText.search,
          searchNoResult: uiText.searchNoResult,
          chooseLanguage: uiText.chooseLanguage,
          toc: uiText.toc,
          tocNoHeadings: uiText.tocNoHeadings,
          nextPage: uiText.nextPage,
          previousPage: uiText.previousPage,
        },
        onLocaleChange(nextLocale) {
          if (!i18n.languages.includes(nextLocale as AppLocale)) return;
          router.push(replaceLocale(pathname, nextLocale));
        },
      }}
      search={{
        enabled: true,
        SearchDialog: DocsSearchDialog,
        options: {
          tags,
          allowClear: true,
        },
      }}
    >
      {children}
    </RootProvider>
  );
}
