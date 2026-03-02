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
  links: {
    label: string;
    href: string;
  }[];
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
    links: [
      { label: '发表论文', href: 'https://arxiv.org/search/?query=artificial+intelligence&searchtype=all' },
      { label: '开源项目', href: 'https://github.com/fuma-nama/fumadocs' },
      { label: '开放数据', href: 'https://huggingface.co/datasets' },
      { label: '研究成果', href: '/docs' },
      { label: '项目合作', href: '/docs/test' },
    ],
  },
  {
    title: '资源',
    links: [
      { label: '技术文档', href: '/docs' },
      { label: 'API 参考', href: '/docs/test' },
      { label: '官方博客', href: 'https://openai.com/news/' },
    ],
  },
  {
    title: '关于',
    links: [

      { label: '联系我们', href: 'mailto:hello@elexvx.ai' },
      { label: '关于我们', href: '/docs' },
      { label: '加入我们', href: '/docs' },
      { label: '隐私政策', href: '/docs' },
      { label: '服务条款', href: '/docs' },
    ],
  },
];
