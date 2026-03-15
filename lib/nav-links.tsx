import type { LinkItemType } from 'fumadocs-ui/layouts/shared';
import type { AppLocale } from '@/lib/i18n';
import { Github, Globe } from 'lucide-react';
import { readLocaleYaml } from '@/lib/content-yaml';

type NavMainItem = {
  text: string;
  url: string;
  active: 'url' | 'nested-url';
  on?: 'menu' | 'nav' | 'all';
};

type NavIconItem = {
  text: string;
  label: string;
  url: string;
  icon: 'Github' | 'Globe';
  external: boolean;
  active: 'none';
};

type NavLinksYaml = {
  main: NavMainItem[];
  icons: NavIconItem[];
};

async function readNavLinksYaml(locale: AppLocale): Promise<NavLinksYaml> {
  return readLocaleYaml<NavLinksYaml>('navigation', locale);
}

function getIcon(icon: NavIconItem['icon']) {
  if (icon === 'Github') return <Github />;
  return <Globe />;
}

export async function getNavLinks(
  lang: AppLocale,
  { includeLanguageToggle = false }: { includeLanguageToggle?: boolean } = {},
): Promise<LinkItemType[]> {
  const navData = await readNavLinksYaml(lang);
  const languageToggleLinks: LinkItemType[] = [];

  if (includeLanguageToggle) {
    const { NavLanguageToggle } = await import('@/components/nav/nav-language-toggle');
    languageToggleLinks.push({
      type: 'custom',
      secondary: true,
      children: <NavLanguageToggle lang={lang} showText showChevron className="-mx-1 first:ms-0 last:me-0" />,
    });
  }

  return [
    ...navData.main.map((item) => ({
      text: item.text,
      url: item.url.replace('{lang}', lang),
      active: item.active,
      on: item.on ?? 'all',
    })),
    ...languageToggleLinks,
    ...navData.icons.map((item) => ({
      type: 'icon' as const,
      text: item.text,
      label: item.label,
      url: item.url,
      icon: getIcon(item.icon),
      external: item.external,
      active: item.active,
    })),
  ];
}
