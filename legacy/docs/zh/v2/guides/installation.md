---
title: 安装与本地运行
description: 本地启动、目录约定与常见安装问题。
nav:
  order: 5
---

## 环境要求

- Node.js 18+
- 推荐使用 npm 或 pnpm

## 项目结构约定

本仓库按“代码 + 文档”同仓管理：

| 目录 | 用途 |
| --- | --- |
| `src/` | Astro 站点代码 |
| `docs/` | 真实 Markdown 文档（内容源） |
| `public/` | 静态资源（图片、图标等） |

## 本地运行

```bash
npm install
npm run dev
```

启动后访问：

- `/`：站点首页
- `/zh/docs/v2/`：中文 v2 文档
- `/en/docs/v2/`：英文 v2 文档
- `/zh/search/`：搜索页

## 构建与搜索索引

构建会在 `dist/` 输出静态站点，并在构建结束后生成本地搜索索引：

```bash
npm run build
```

搜索使用 Pagefind，对中文不做词干匹配，但可正常全文检索（关键词命中、标题命中等）。
