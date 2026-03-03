import type { AppLocale } from '@/lib/i18n';

export type SponsorsPageCopy = {
  title: string;
  description: string;
  cta: string;
  subline: string;
  stats: {
    totalLabel: string;
    totalValue: string;
    yearlyLabel: string;
    yearlyValue: string;
    openSourceLabel: string;
    openSourceValue: string;
  };
  sectionTitle: string;
};

export type SponsorItem = {
  name: string;
  category: {
    zh: string;
    en: string;
  };
  description: {
    zh: string;
    en: string;
  };
  href: string;
  accent: string;
};

const sponsorsPageCopyMap: Record<AppLocale, SponsorsPageCopy> = {
  zh: {
    title: '赞助商计划',
    description: '感谢每一家支持者，让文档、组件与工程实践能够持续免费开放。',
    cta: '成为赞助商',
    subline: '与我们一起推动开发者生态建设。',
    stats: {
      totalLabel: '合作赞助商',
      totalValue: '48+',
      yearlyLabel: '年度新增',
      yearlyValue: '12',
      openSourceLabel: '开源维护项目',
      openSourceValue: '9',
    },
    sectionTitle: '合作品牌',
  },
  en: {
    title: 'Sponsorship Program',
    description: 'Thanks to every partner supporting free docs, components, and engineering resources.',
    cta: 'Become a Sponsor',
    subline: 'Build the developer ecosystem together with us.',
    stats: {
      totalLabel: 'Sponsors',
      totalValue: '48+',
      yearlyLabel: 'New This Year',
      yearlyValue: '12',
      openSourceLabel: 'Open-source Projects',
      openSourceValue: '9',
    },
    sectionTitle: 'Partner Brands',
  },
};

export const sponsorItems: SponsorItem[] = [
  {
    name: 'AxionJS',
    category: { zh: '前端框架', en: 'Frontend Framework' },
    description: {
      zh: '专注于高性能组件编译与渐进式渲染。',
      en: 'Focused on high-performance component compilation and progressive rendering.',
    },
    href: 'https://example.com/axionjs',
    accent: 'from-indigo-500/20 via-sky-400/15 to-cyan-300/20',
  },
  {
    name: 'NeuroDB',
    category: { zh: '数据库', en: 'Database' },
    description: {
      zh: '分布式数据库引擎，提供毫秒级查询能力。',
      en: 'A distributed database engine with millisecond-level query performance.',
    },
    href: 'https://example.com/neurodb',
    accent: 'from-emerald-500/25 via-teal-400/15 to-cyan-300/15',
  },
  {
    name: 'CloudNest',
    category: { zh: '云平台', en: 'Cloud Platform' },
    description: {
      zh: '帮助团队快速搭建稳定、可观测的云原生环境。',
      en: 'Helps teams build stable and observable cloud-native environments.',
    },
    href: 'https://example.com/cloudnest',
    accent: 'from-violet-500/25 via-fuchsia-400/15 to-indigo-300/20',
  },
  {
    name: 'TypeFlow',
    category: { zh: '开发工具', en: 'Developer Tooling' },
    description: {
      zh: '提供类型安全的 API 工作流与调试体验。',
      en: 'Provides type-safe API workflows and debugging experiences.',
    },
    href: 'https://example.com/typeflow',
    accent: 'from-blue-500/20 via-indigo-300/15 to-purple-300/15',
  },
  {
    name: 'Kibo UI',
    category: { zh: '设计系统', en: 'Design System' },
    description: {
      zh: '面向中后台场景的企业级组件与设计规范。',
      en: 'Enterprise-ready components and design standards for admin products.',
    },
    href: 'https://example.com/kibo-ui',
    accent: 'from-orange-500/20 via-amber-300/15 to-rose-300/15',
  },
  {
    name: 'MintOps',
    category: { zh: '可观测性', en: 'Observability' },
    description: {
      zh: '统一日志、指标与追踪，支持问题快速定位。',
      en: 'Unifies logs, metrics, and tracing for faster issue diagnosis.',
    },
    href: 'https://example.com/mintops',
    accent: 'from-lime-500/20 via-emerald-300/15 to-teal-300/15',
  },
  {
    name: 'OpenPart',
    category: { zh: '开源社区', en: 'Open-source Community' },
    description: {
      zh: '持续赞助文档基础设施与开发者活动。',
      en: 'Continuously sponsors docs infrastructure and developer events.',
    },
    href: 'https://example.com/openpart',
    accent: 'from-cyan-500/20 via-sky-300/15 to-blue-300/15',
  },
  {
    name: 'ZenBrowser',
    category: { zh: '浏览器生态', en: 'Browser Ecosystem' },
    description: {
      zh: '围绕开发者效率打造更快、更轻的浏览器体验。',
      en: 'Builds a faster and lighter browser experience for developers.',
    },
    href: 'https://example.com/zenbrowser',
    accent: 'from-rose-500/20 via-orange-300/15 to-yellow-300/15',
  },
  {
    name: 'Yecord',
    category: { zh: '协作平台', en: 'Collaboration Platform' },
    description: {
      zh: '将知识库、任务和沟通整合到一个工作流中。',
      en: 'Combines docs, tasks, and communication into one workflow.',
    },
    href: 'https://example.com/yecord',
    accent: 'from-slate-500/20 via-zinc-300/10 to-sky-300/10',
  },
  {
    name: 'Laminex',
    category: { zh: '构建工具', en: 'Build Tooling' },
    description: {
      zh: '提供跨框架的高速构建链路与缓存能力。',
      en: 'Delivers cross-framework fast builds with smart caching.',
    },
    href: 'https://example.com/laminex',
    accent: 'from-fuchsia-500/20 via-violet-300/15 to-indigo-300/15',
  },
  {
    name: 'SwiftLyn',
    category: { zh: '工程平台', en: 'Engineering Platform' },
    description: {
      zh: '通过平台化能力提升团队交付效率。',
      en: 'Improves delivery speed through platform engineering capabilities.',
    },
    href: 'https://example.com/swiftlyn',
    accent: 'from-red-500/20 via-rose-300/15 to-orange-300/15',
  },
  {
    name: 'Nextra Docs',
    category: { zh: '文档生态', en: 'Documentation Ecosystem' },
    description: {
      zh: '支持结构化内容管理与团队协同写作。',
      en: 'Supports structured content management and team co-authoring.',
    },
    href: 'https://example.com/nextra-docs',
    accent: 'from-sky-500/20 via-cyan-300/15 to-teal-300/15',
  },
  {
    name: 'Codify',
    category: { zh: 'AI 编程', en: 'AI Coding' },
    description: {
      zh: '为开发团队提供代码生成与重构辅助。',
      en: 'Provides code generation and refactoring assistance for teams.',
    },
    href: 'https://example.com/codify',
    accent: 'from-violet-500/20 via-purple-300/15 to-pink-300/15',
  },
  {
    name: 'TarotStarter',
    category: { zh: '应用模板', en: 'App Starter' },
    description: {
      zh: '提供可开箱即用的全栈模板与最佳实践。',
      en: 'Offers production-ready full-stack templates and best practices.',
    },
    href: 'https://example.com/tarotstarter',
    accent: 'from-indigo-500/20 via-blue-300/15 to-cyan-300/15',
  },
  {
    name: 'Rehooks',
    category: { zh: 'React 工具库', en: 'React Utilities' },
    description: {
      zh: '聚焦可复用 Hook 与状态管理模式。',
      en: 'Focuses on reusable hooks and state management patterns.',
    },
    href: 'https://example.com/rehooks',
    accent: 'from-emerald-500/20 via-green-300/15 to-lime-300/15',
  },
  {
    name: 'DirStarter',
    category: { zh: 'CLI 工具', en: 'CLI Tooling' },
    description: {
      zh: '通过脚手架提升项目初始化与规范落地效率。',
      en: 'Speeds up project bootstrapping and standards adoption.',
    },
    href: 'https://example.com/dirstarter',
    accent: 'from-zinc-500/20 via-slate-300/10 to-blue-300/10',
  },
];

export function getSponsorsPageCopy(locale: AppLocale): SponsorsPageCopy {
  return sponsorsPageCopyMap[locale];
}
