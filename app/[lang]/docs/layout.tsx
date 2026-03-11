import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { baseOptions } from '@/lib/layout.shared';
import { isLocale, type AppLocale } from '@/lib/i18n';
import type { ReactNode } from 'react';
import { getNavLinks } from '@/lib/nav-links';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SiteRootProvider } from '@/components/site-root-provider';
import { getI18nUIText } from '@/lib/i18n-ui';
import { NavLanguageToggle } from '@/components/nav/nav-language-toggle';
import { SidebarThemeToggle } from '@/components/nav/sidebar-theme-toggle';
import { cn } from '@/lib/cn';
import { SITE_LAYOUT_WIDTH_CLASS } from '@/lib/responsive-layout';

function normalizeTagName(tag: string) {
  return tag
    .split(/[-_\s]+/)
    .map((part) => (part.length > 0 ? part[0].toUpperCase() + part.slice(1) : part))
    .join(' ');
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as AppLocale;
  const links = await getNavLinks(locale);
  const iconLinks = links.filter((item): item is Extract<LinkItemType, { type: 'icon' }> => item.type === 'icon');
  const linksWithoutIcons = links.filter((item) => item.type !== 'icon');
  const mobileShortcutLinks = linksWithoutIcons.flatMap((item) =>
    'url' in item && typeof item.url === 'string' ? [{ url: item.url, text: item.text }] : [],
  );
  const mobileOnlyLinks: LinkItemType[] =
    mobileShortcutLinks.length > 0
      ? [
          {
            type: 'custom',
            on: 'menu',
            children: (
              <div className="md:hidden mb-4 flex flex-col gap-1">
                {mobileShortcutLinks.map((item, index) => (
                  <Link
                    key={`${item.url}-${index}`}
                    href={item.url}
                    className="relative flex flex-row items-center gap-2 rounded-lg p-2 text-start text-fd-muted-foreground wrap-anywhere transition-colors hover:bg-fd-accent/50 hover:text-fd-accent-foreground/80 hover:transition-none"
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            ),
          },
        ]
      : [];
  const uiText = await getI18nUIText(locale);
  const tags = Array.from(
    new Set(
      source
        .getPages(locale)
        .flatMap((page) => page.data.tags ?? [])
        .filter((tag): tag is string => typeof tag === 'string' && tag.length > 0),
    ),
  )
    .sort((a, b) => a.localeCompare(b))
    .map((tag) => ({
      value: tag,
      name: normalizeTagName(tag),
    }));

  return (
    <SiteRootProvider locale={locale} uiText={uiText} tags={tags}>
      <DocsLayout
        tree={source.getPageTree(locale)}
        {...baseOptions(locale)}
        i18n={false}
        themeSwitch={{ enabled: false }}
        links={mobileOnlyLinks}
        containerProps={{
          className: SITE_LAYOUT_WIDTH_CLASS,
        }}
        sidebar={{
          footer: (
            <div className="flex flex-nowrap items-center text-fd-muted-foreground whitespace-nowrap">
              <NavLanguageToggle lang={locale} showText showChevron className="-mx-1 first:ms-0 last:me-0" />
              {iconLinks.map((item, index) => (
                <a
                  key={`${item.url}-${index}`}
                  href={item.url}
                  className={cn(buttonVariants({ size: 'icon-sm', color: 'ghost' }))}
                  aria-label={typeof item.label === 'string' ? item.label : undefined}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer noopener' : undefined}
                >
                  {item.icon}
                </a>
              ))}
              <SidebarThemeToggle className="ms-auto p-0" />
            </div>
          ),
        }}
      >
        {children}
      </DocsLayout>
    </SiteRootProvider>
  );
}
