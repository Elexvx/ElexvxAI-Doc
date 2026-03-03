import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import type { AppLocale } from '@/lib/i18n';
import { Github, Globe } from 'lucide-react';
import { NavLanguageToggle } from '@/components/nav/nav-language-toggle';

export function getNavLinks(
  lang: AppLocale,
  { includeLanguageToggle = false }: { includeLanguageToggle?: boolean } = {},
): LinkItemType[] {
  return [
    {
      text: lang === 'zh' ? '首页' : 'Home',
      url: `/${lang}`,
      active: 'url',
      on: 'nav',
    },
    {
      text: lang === 'zh' ? '文档' : 'Docs',
      url: `/${lang}/docs`,
      active: 'nested-url',
      on: 'nav',
    },
    {
      text: lang === 'zh' ? '博客' : 'Blog',
      url: `/${lang}/blog`,
      active: 'nested-url',
      on: 'nav',
    },
    {
      text: lang === 'zh' ? '赞助商' : 'Sponsors',
      url: `/${lang}/sponsors`,
      active: 'nested-url',
      on: 'nav',
    },
    ...(includeLanguageToggle
      ? ([
          {
            type: 'custom',
            secondary: true,
            children: <NavLanguageToggle lang={lang} showText showChevron className="-mx-1 first:ms-0 last:me-0" />,
          },
        ] as LinkItemType[])
      : []),
    {
      type: 'icon',
      text: 'GitHub',
      label: 'GitHub',
      url: 'https://github.com/elexvx',
      icon: <Github />,
      external: true,
      active: 'none',
    },
    {
      type: 'icon',
      text: lang === 'zh' ? '官网' : 'Website',
      label: lang === 'zh' ? '官网' : 'Website',
      url: 'https://www.elexvx.com/',
      icon: <Globe />,
      external: true,
      active: 'none',
    },
  ];
}
