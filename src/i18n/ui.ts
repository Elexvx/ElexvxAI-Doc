import type { Lang } from '../config/site';

const UI = {
  zh: {
    docs: '文档',
    blog: '博客',
    search: '搜索',
    onThisPage: '本页目录',
    previous: '上一篇',
    next: '下一篇',
    language: '语言',
    version: '版本',
    home: '首页',
    theme: '主题',
    light: '浅色',
    dark: '深色',
  },
  en: {
    docs: 'Docs',
    blog: 'Blog',
    search: 'Search',
    onThisPage: 'On this page',
    previous: 'Previous',
    next: 'Next',
    language: 'Language',
    version: 'Version',
    home: 'Home',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
  },
} as const;

export type UiKey = keyof (typeof UI)['zh'];

export function t(lang: Lang, key: UiKey) {
  return UI[lang][key];
}
