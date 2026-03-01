import { BookOpen, Code2, Gift, Newspaper, PenTool, type LucideIcon } from 'lucide-react';

export type CapabilityItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  hoverGradient: string;
  hoverGlow: string;
};

export type PostItem = {
  title: string;
  description: string;
  tag: string;
  icon: LucideIcon;
};

export type ExploreItem = {
  title: string;
  icon: LucideIcon;
  tint: string;
};

export type FooterColumn = {
  title: string;
  links: string[];
};

export const capabilities: CapabilityItem[] = [
  {
    title: '核心研究',
    description: '深度学习算法与基础模型，拓展生成式任务的 AI 能力边界。',
    icon: PenTool,
    hoverGradient: 'from-sky-300 via-blue-200 to-blue-500',
    hoverGlow: 'from-white/45 to-transparent',
  },
  {
    title: '开源贡献',
    description: '向全球研究社区贡献最前沿的代码、预训练模型和大规模数据集。',
    icon: Gift,
    hoverGradient: 'from-violet-300 via-indigo-200 to-blue-300',
    hoverGlow: 'from-lime-300/50 to-transparent',
  },
  {
    title: '工业应用',
    description: '部署可扩展的 AI 解决方案，优化制造、物流和供应链。',
    icon: BookOpen,
    hoverGradient: 'from-emerald-300/80 via-cyan-300/75 to-blue-400/90',
    hoverGlow: 'from-emerald-200/40 to-transparent',
  },
];

export const posts: PostItem[] = [
  {
    title: '本地搜索的设计笔记',
    description: '为什么选 Pagefind、如何过滤 Docs/Blog，以及中文检索注意事项。',
    tag: '研究',
    icon: Newspaper,
  },
  {
    title: '我们为什么要把 Blog 独立出来',
    description: '文档与博客的边界、写作节奏与内容复用方式。',
    tag: '工程',
    icon: Code2,
  },
];

export const exploreItems: ExploreItem[] = [
  {
    title: '博客',
    icon: PenTool,
    tint: 'from-indigo-200 via-violet-300 to-sky-300',
  },
  {
    title: '资源',
    icon: Gift,
    tint: 'from-cyan-100 via-sky-200 to-indigo-200',
  },
  {
    title: '使用手册',
    icon: BookOpen,
    tint: 'from-cyan-300 via-emerald-200 to-blue-300',
  },
];

export const footerColumns: FooterColumn[] = [
  {
    title: '研究',
    links: ['发表论文', '开源项目', '开放数据'],
  },
  {
    title: '资源',
    links: ['技术文档', 'API 参考', '官方博客'],
  },
  {
    title: '开发者',
    links: ['开发者社区', '模型代码'],
  },
  {
    title: '关于',
    links: ['研究成果', '项目合作', '联系我们', '关于我们', '加入我们', '隐私政策', '服务条款'],
  },
];
