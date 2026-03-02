import { defineI18n } from 'fumadocs-core/i18n';
import { defineI18nUI } from 'fumadocs-ui/i18n';

export const i18n = defineI18n({
  languages: ['zh', 'en'],
  defaultLanguage: 'zh',
  parser: 'dir',
  hideLocale: 'never',
  fallbackLanguage: null,
});

export type AppLocale = (typeof i18n.languages)[number];

export const i18nUI = defineI18nUI(i18n, {
  translations: {
    zh: {
      displayName: '中文',
      search: '搜索文档',
      searchNoResult: '未找到结果',
      chooseLanguage: '选择语言',
      toc: '目录',
      tocNoHeadings: '暂无标题',
      nextPage: '下一页',
      previousPage: '上一页',
    },
    en: {
      displayName: 'English',
      search: 'Search docs',
      searchNoResult: 'No results found',
      chooseLanguage: 'Choose language',
      toc: 'On this page',
      tocNoHeadings: 'No headings',
      nextPage: 'Next page',
      previousPage: 'Previous page',
    },
  },
});

export function isLocale(value: string): value is AppLocale {
  return (i18n.languages as string[]).includes(value);
}
