---
title: 快速开始
description: 用最短路径了解目录结构、路由与写作方式。
nav:
  order: 1
---

## 目录结构

所有文档都放在仓库根目录的 `docs/` 下，并按语言与版本分层：

- `docs/zh/v1/...`
- `docs/en/v1/...`

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

3. 用目录层级表达信息架构，例如：

- `docs/zh/v1/guides/xxx.md`
- `docs/zh/v1/reference/yyy.md`

## 路由规则

页面 URL 与文件路径一致：

- `docs/zh/v1/getting-started/intro.md` → `/zh/docs/v1/getting-started/intro`
