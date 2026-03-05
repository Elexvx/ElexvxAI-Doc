'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { cn } from '@/lib/cn';
import { Languages, ChevronDown } from 'lucide-react';
import { i18n, isLocale, type AppLocale } from '@/lib/i18n';
import { chooseLanguageLabels, localeDisplayNames } from '@/lib/locale-labels';

function replaceLocale(pathname: string, nextLocale: AppLocale) {
  const segments = pathname.split('/');
  if (segments[1] && isLocale(segments[1])) {
    segments[1] = nextLocale;
    return segments.join('/') || '/';
  }

  return `/${nextLocale}${pathname === '/' ? '' : pathname}`;
}

export function NavLanguageToggle({
  lang,
  showText = false,
  showChevron = false,
  className,
}: {
  lang: AppLocale;
  showText?: boolean;
  showChevron?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const currentName = localeDisplayNames[lang];
  const label = chooseLanguageLabels[lang];
  const triggerClassName = cn(
    buttonVariants({
      color: 'ghost',
      size: showText ? undefined : 'icon',
      className: showText ? 'gap-1.5 p-1.5' : undefined,
    }),
    className,
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button type="button" aria-label={label} className={triggerClassName} disabled>
        <Languages className="size-5" />
        {showText && <span>{currentName}</span>}
        {showChevron && <ChevronDown className="size-3 text-fd-muted-foreground" />}
      </button>
    );
  }

  return (
    <Popover>
      <PopoverTrigger
        aria-label={label}
        className={triggerClassName}
      >
        <Languages className="size-5" />
        {showText && <span>{currentName}</span>}
        {showChevron && <ChevronDown className="size-3 text-fd-muted-foreground" />}
      </PopoverTrigger>
      <PopoverContent className="flex flex-col overflow-x-hidden p-0">
        <p className="mb-1 p-2 text-xs font-medium text-fd-muted-foreground">{label}</p>
        {i18n.languages.map((locale) => (
          <button
            key={locale}
            type="button"
            className={cn(
              'p-2 text-start text-sm',
              locale === lang
                ? 'bg-fd-primary/10 font-medium text-fd-primary'
                : 'hover:bg-fd-accent hover:text-fd-accent-foreground',
            )}
            onClick={() => {
              if (locale === lang) return;
              const nextPath = replaceLocale(pathname, locale);
              router.push(nextPath);
            }}
          >
            {localeDisplayNames[locale]}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
