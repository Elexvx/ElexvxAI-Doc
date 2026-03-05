'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from '@/lib/cn';

type LocaleItem = {
  locale: string;
  name: string;
};

function slugFromParams(slug: string | string[] | undefined): string[] {
  if (!slug) return [];
  return Array.isArray(slug) ? slug : [slug];
}

export function DocsLanguageSwitcher({
  lang,
  locales,
  pageSlugs,
}: {
  lang: string;
  locales: LocaleItem[];
  pageSlugs: Record<string, string[]>;
}) {
  const params = useParams<{ slug?: string | string[] }>();
  const currentSlug = slugFromParams(params.slug);
  const slugKey = currentSlug.join('/');
  const label = lang === 'zh' ? '语言' : 'Language';

  return (
    <div className="rounded-xl border bg-fd-card px-4 py-3">
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">{label}</p>
      <div className="flex flex-wrap gap-2">
        {locales.map((localeItem) => {
          const isCurrent = localeItem.locale === lang;
          const hasMatchingPage = pageSlugs[localeItem.locale]?.includes(slugKey) ?? false;
          const href = hasMatchingPage
            ? `/${localeItem.locale}/docs${currentSlug.length > 0 ? `/${currentSlug.join('/')}` : ''}`
            : `/${localeItem.locale}/docs`;

          return (
            <Link
              key={localeItem.locale}
              href={href}
              className={cn(
                buttonVariants({
                  size: 'sm',
                  color: isCurrent ? 'secondary' : 'outline',
                  className: 'h-8',
                }),
              )}
            >
              {localeItem.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
