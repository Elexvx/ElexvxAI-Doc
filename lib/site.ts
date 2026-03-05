import type { AppLocale } from '@/lib/i18n';

const normalizedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.elexvx.com').replace(/\/+$/, '');

export const siteConfig = {
  name: 'ElexvxAI Lab',
  url: normalizedSiteUrl,
  description: 'ElexvxAI Lab 的官方文档与工程资源中心。',
};

export function buildAbsoluteUrl(pathname: string) {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return new URL(normalizedPath, siteConfig.url).toString();
}

export function buildLocalePath(locale: AppLocale, pathname = '') {
  const normalizedPath = pathname ? (pathname.startsWith('/') ? pathname : `/${pathname}`) : '';
  return `/${locale}${normalizedPath}`;
}

export function buildLocaleAlternates(pathname = '') {
  return {
    zh: buildAbsoluteUrl(buildLocalePath('zh', pathname)),
    en: buildAbsoluteUrl(buildLocalePath('en', pathname)),
  };
}

export function getHtmlLang(locale: AppLocale) {
  return locale === 'zh' ? 'zh-CN' : 'en';
}
