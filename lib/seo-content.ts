import { readLocaleYaml } from '@/lib/content-yaml';
import type { AppLocale } from '@/lib/i18n';

export type SeoPageKey = 'home' | 'blog' | 'sponsors' | 'maintenance' | 'docs';

export type SeoEntry = {
  title: string;
  description: string;
};

type SeoContentYaml = {
  site?: Partial<SeoEntry>;
  pages?: Partial<Record<SeoPageKey, Partial<SeoEntry>>>;
};

const seoFallbacks: Record<
  AppLocale,
  {
    site: SeoEntry;
    pages: Record<SeoPageKey, SeoEntry>;
  }
> = {
  zh: {
    site: {
      title: 'ElexvxAI Lab',
      description: 'ElexvxAI Lab 官方网站，聚焦 AI 研究、工程实践与产业落地。',
    },
    pages: {
      home: {
        title: '以智能技术赋能数字化未来',
        description: '欢迎访问 ElexvxAI Lab，了解我们的 AI 研究进展、工程能力与产业实践。',
      },
      blog: {
        title: '博客',
        description: 'ElexvxAI Lab 的最新动态、研究进展与工程实践。',
      },
      sponsors: {
        title: '同行计划',
        description: '了解 ElexvxAI Lab 的合作伙伴与开源生态共建计划。',
      },
      maintenance: {
        title: '系统维护中',
        description: 'ElexvxAI Lab 页面维护中，服务升级完成后将恢复访问。',
      },
      docs: {
        title: '技术文档',
        description: '浏览 ElexvxAI Lab 文档，查看产品能力与技术说明。',
      },
    },
  },
  en: {
    site: {
      title: 'ElexvxAI Lab',
      description: 'Official site of ElexvxAI Lab focused on AI research, engineering, and real-world deployment.',
    },
    pages: {
      home: {
        title: 'Empower the Digital Future with Intelligent Technology',
        description:
          'Welcome to ElexvxAI Lab and explore our AI research progress, engineering capabilities, and industrial practices.',
      },
      blog: {
        title: 'Blog',
        description: 'Latest updates, research progress, and engineering practices from ElexvxAI Lab.',
      },
      sponsors: {
        title: 'Partnership Program',
        description: 'Discover ElexvxAI Lab partners and our open ecosystem collaboration program.',
      },
      maintenance: {
        title: 'Maintenance In Progress',
        description: 'ElexvxAI Lab page is under maintenance and will be back online after service upgrades.',
      },
      docs: {
        title: 'Documentation',
        description: 'Browse ElexvxAI Lab documentation for product capabilities and technical guidance.',
      },
    },
  },
};

function normalizeEntry(fallback: SeoEntry, value?: Partial<SeoEntry>): SeoEntry {
  const title = value?.title?.trim();
  const description = value?.description?.trim();

  return {
    title: title && title.length > 0 ? title : fallback.title,
    description: description && description.length > 0 ? description : fallback.description,
  };
}

async function getSeoContent(locale: AppLocale) {
  const raw = await readLocaleYaml<SeoContentYaml>('seo', locale);
  const fallback = seoFallbacks[locale];

  return {
    site: normalizeEntry(fallback.site, raw.site),
    pages: {
      home: normalizeEntry(fallback.pages.home, raw.pages?.home),
      blog: normalizeEntry(fallback.pages.blog, raw.pages?.blog),
      sponsors: normalizeEntry(fallback.pages.sponsors, raw.pages?.sponsors),
      maintenance: normalizeEntry(fallback.pages.maintenance, raw.pages?.maintenance),
      docs: normalizeEntry(fallback.pages.docs, raw.pages?.docs),
    },
  };
}

export async function getSeoSite(locale: AppLocale): Promise<SeoEntry> {
  const content = await getSeoContent(locale);
  return content.site;
}

export async function getSeoPage(locale: AppLocale, page: SeoPageKey): Promise<SeoEntry> {
  const content = await getSeoContent(locale);
  return content.pages[page];
}
