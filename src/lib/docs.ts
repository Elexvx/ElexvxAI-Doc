import type { CollectionEntry } from 'astro:content';
import { SITE, type Lang } from '../config/site';

export type DocEntry = CollectionEntry<'docs'>;

export function parseDocId(id: string) {
  const parts = id.split('/');
  const lang = parts[0] ?? '';
  const version = parts[1] ?? '';
  const rest = parts.slice(2);
  const slug = rest.join('/');

  return { lang, version, slug, rest };
}

export function isSupportedLang(lang: string): lang is Lang {
  return (SITE.langs as readonly string[]).includes(lang);
}

export function getVersionHomeId(lang: Lang, version: string) {
  return `${lang}/${version}/index`;
}

export function getDocUrl(opts: {
  lang: string;
  version: string;
  slug?: string;
}) {
  const base = `/${opts.lang}/docs/${opts.version}`;
  if (!opts.slug) return `${base}/`;
  return `${base}/${opts.slug}`;
}

export function sortDocs(a: DocEntry, b: DocEntry) {
  const ao = a.data.nav?.order ?? 9999;
  const bo = b.data.nav?.order ?? 9999;
  if (ao !== bo) return ao - bo;
  return a.data.title.localeCompare(b.data.title);
}

export type SidebarItem = {
  title: string;
  href: string;
};

export type SidebarGroup = {
  title: string;
  items: SidebarItem[];
};

export function buildSidebar(entries: DocEntry[], opts: { lang: Lang; version: string }) {
  const relevant = entries
    .filter((e) => {
      const p = parseDocId(e.id);
      return p.lang === opts.lang && p.version === opts.version && p.slug !== '' && p.slug !== 'index';
    })
    .sort(sortDocs);

  const groups = new Map<string, SidebarItem[]>();

  for (const entry of relevant) {
    const p = parseDocId(entry.id);
    const groupKey = p.rest[0] ?? 'root';
    const title = entry.data.nav?.label ?? entry.data.title;
    const href = getDocUrl({ lang: opts.lang, version: opts.version, slug: p.slug });

    const list = groups.get(groupKey) ?? [];
    list.push({ title, href });
    groups.set(groupKey, list);
  }

  const zhGroupMap: Record<string, string> = {
    'getting-started': '快速入门',
    'guides': '指南',
    'models': '模型',
    'api': 'API',
    'resources': '图书馆',
    'library': '图书馆',
  };

  const out: SidebarGroup[] = [];
  for (const [key, items] of groups) {
    let title = key === 'root' ? 'Overview' : key.replace(/-/g, ' ');

    if (opts.lang === 'zh') {
      if (key === 'root') title = '概览';
      else if (zhGroupMap[key]) title = zhGroupMap[key];
    }

    out.push({ title, items });
  }

  out.sort((a, b) => a.title.localeCompare(b.title));
  return out;
}
