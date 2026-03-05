import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'yaml';
import type { AppLocale } from '@/lib/i18n';

type LocalizedText = Record<AppLocale, string>;

export type HomeCapabilityItem = {
  title: string;
  description: string;
  icon: string;
  hoverGradient: string;
  hoverGlow: string;
};

export type HomeExploreItem = {
  title: string;
  icon: string;
  tint: string;
  href: string;
};

export type HomeHeroCopy = {
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  promoTitle: string;
  promoDescription: string;
};

export type HomePageCopy = {
  hero: HomeHeroCopy;
  news: {
    title: string;
    viewAll: string;
  };
  explore: {
    title: string;
  };
};

export type HomeFooterColumn = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export type HomeFooterContent = {
  title: string;
  description: string;
  copyright: string;
  columns: HomeFooterColumn[];
};

type HomeFooterLocalizedContent = Record<AppLocale, HomeFooterContent>;

type HomePageCopyYaml = Record<AppLocale, HomePageCopy>;

type HomeCapabilityItemYaml = Omit<HomeCapabilityItem, 'title' | 'description'> & {
  title: LocalizedText;
  description: LocalizedText;
};

type HomeExploreItemYaml = Omit<HomeExploreItem, 'title'> & {
  title: LocalizedText;
};

type HomeContentYaml = {
  copy: HomePageCopyYaml;
  capabilities: HomeCapabilityItemYaml[];
  exploreItems: HomeExploreItemYaml[];
  footer: HomeFooterLocalizedContent;
};

function getHomeYamlPath() {
  return path.join(process.cwd(), 'data', 'yaml', 'home', 'home.yaml');
}

async function readHomeYaml(): Promise<HomeContentYaml> {
  const file = await readFile(getHomeYamlPath(), 'utf8');
  return parse(file) as HomeContentYaml;
}

export async function getHomePageCopy(locale: AppLocale): Promise<HomePageCopy> {
  const data = await readHomeYaml();
  return data.copy[locale];
}

export async function getHomeCapabilities(locale: AppLocale): Promise<HomeCapabilityItem[]> {
  const data = await readHomeYaml();
  return data.capabilities.map((item) => ({
    title: item.title[locale],
    description: item.description[locale],
    icon: item.icon,
    hoverGradient: item.hoverGradient,
    hoverGlow: item.hoverGlow,
  }));
}

export async function getHomeExploreItems(locale: AppLocale): Promise<HomeExploreItem[]> {
  const data = await readHomeYaml();
  return data.exploreItems.map((item) => ({
    title: item.title[locale],
    icon: item.icon,
    tint: item.tint,
    href: item.href.replace('{lang}', locale),
  }));
}

export async function getHomeFooterContent(locale: AppLocale): Promise<HomeFooterContent> {
  const data = await readHomeYaml();
  const content = data.footer[locale];
  return {
    ...content,
    columns: content.columns.map((column) => ({
      ...column,
      links: column.links.map((item) => ({
        ...item,
        href: item.href.replace('{lang}', locale),
      })),
    })),
  };
}
