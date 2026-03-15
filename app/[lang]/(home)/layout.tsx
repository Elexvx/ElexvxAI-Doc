import Link from 'next/link';
import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import type { ReactNode } from 'react';
import { getNavLinks } from '@/lib/nav-links';
import { isLocale, type AppLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';
import { SITE_CONTAINER_CLASS } from '@/lib/responsive-layout';
import { Logo } from '@/components/logo';

type HeaderMainLink = {
  text: string;
  url: string;
};

type HeaderIconLink = Extract<LinkItemType, { type: 'icon' }>;

function toHeaderMainLinks(links: LinkItemType[]): HeaderMainLink[] {
  return links.flatMap((item) => {
    if ('type' in item && item.type === 'icon') return [];
    if ('url' in item && typeof item.url === 'string' && 'text' in item && typeof item.text === 'string') {
      return [{ text: item.text, url: item.url }];
    }
    return [];
  });
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
  const mainLinks = toHeaderMainLinks(links);
  const iconLinks = links.filter((item): item is HeaderIconLink => item.type === 'icon');
  const switchLocaleHref = locale === 'zh' ? '/en' : '/zh';
  const switchLocaleLabel = locale === 'zh' ? 'EN' : 'ZH';

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-zinc-200/80 bg-zinc-50/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
        <div className={`${SITE_CONTAINER_CLASS} flex min-h-16 items-center gap-4`}>
          <Link href={`/${locale}`} prefetch={false} className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Primary navigation" className="hidden items-center gap-6 md:flex">
            {mainLinks.map((item) => (
              <Link
                key={item.url}
                href={item.url}
                prefetch={false}
                className="text-sm font-medium text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div className="ms-auto flex items-center gap-1.5">
            <Link
              href={switchLocaleHref}
              prefetch={false}
              className="rounded-md border border-zinc-300 px-2.5 py-1 text-xs font-semibold tracking-wide text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              {switchLocaleLabel}
            </Link>
            {iconLinks.map((item) => {
              const ariaLabel =
                typeof item.label === 'string'
                  ? item.label
                  : typeof item.text === 'string'
                    ? item.text
                    : 'External link';

              return (
                <a
                  key={item.url}
                  href={item.url}
                  aria-label={ariaLabel}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer noopener' : undefined}
                  className="rounded-md p-2 text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                >
                  {item.icon}
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Mobile navigation" className={`${SITE_CONTAINER_CLASS} flex gap-4 overflow-x-auto py-2 md:hidden`}>
          {mainLinks.map((item) => (
            <Link
              key={`${item.url}-mobile`}
              href={item.url}
              prefetch={false}
              className="whitespace-nowrap pb-0.5 text-sm font-medium text-zinc-700 transition hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-50"
            >
              {item.text}
            </Link>
          ))}
        </nav>
      </header>

      {children}
    </div>
  );
}
