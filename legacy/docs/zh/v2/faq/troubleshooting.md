---
title: 常见问题与排障
description: 本地开发、构建与搜索相关问题的快速定位。
nav:
  order: 90
---

## 构建后搜索为空

检查点：

1. 是否执行过 `npm run build`（Pagefind 在构建后生成索引）
2. 文档页正文是否包含 `data-pagefind-body`（本站已在布局里配置）
3. 是否存在语言/版本切换导致的路径变化

## 新增 Markdown 后页面没出现

- 确认文件放在 `docs/{lang}/{version}/.../*.md`
- Frontmatter 至少包含 `title`
- 文件名建议用小写与短横线：`my-page.md`

## TOC 没生成

TOC 来自 Markdown 标题（h2/h3），确保文档里有：

```md
## 二级标题
### 三级标题
```
