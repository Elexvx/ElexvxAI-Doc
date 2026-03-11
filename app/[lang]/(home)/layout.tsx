import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import type { ReactNode } from 'react';
import { getNavLinks } from '@/lib/nav-links';
import type { AppLocale } from '@/lib/i18n';
import { SiteFrameworkProvider } from '@/components/site-framework-provider';

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const options = baseOptions(lang);
  const links = await getNavLinks(lang as AppLocale, { includeLanguageToggle: true });

  return (
    <SiteFrameworkProvider>
      <HomeLayout
        {...options}
        i18n={false}
        links={links}
        className="[--fd-layout-width:min(1880px,92vw)]"
      >
        {children}
      </HomeLayout>
    </SiteFrameworkProvider>
  );
}
