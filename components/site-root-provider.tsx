'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import type { TagItem } from 'fumadocs-ui/contexts/search';
import { DocsSearchDialog } from '@/components/search/docs-search-dialog';
import { i18n, i18nUI, isLocale, type AppLocale } from '@/lib/i18n';

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
  tags,
  children,
}: {
  locale: AppLocale;
  tags: TagItem[];
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <RootProvider
      i18n={{
        ...i18nUI.provider(locale),
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
