---
title: 快速开始
description: v2 文档的目录结构与写作方式。
nav:
  order: 1
---

## 目录结构

所有文档都放在仓库根目录的 `docs/` 下，并按语言与版本分层：

- `docs/zh/v2/...`
- `docs/en/v2/...`

## 新增一篇文档

1. 在对应目录创建一个 `.md` 文件
2. 写入 Frontmatter：

```yaml
---
title: 标题
description: 简短描述
nav:
  order: 10
---
```

## 路由规则

页面 URL 与文件路径一致：

- `docs/zh/v2/getting-started/intro.md` → `/zh/docs/v2/getting-started/intro`
