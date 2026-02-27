---
title: 站点配置
description: 语言、版本与站点标题的配置位置。
nav:
  order: 10
---

## 站点级配置

站点的默认语言、支持语言列表与版本列表在 `src/config/site.ts` 中维护。

## 添加新版本

1. 在 `src/config/site.ts` 中把 `versions` 增加到包含 `v2`
2. 在 `docs/zh/v2` 与 `docs/en/v2` 下创建对应文档
3. 重新构建后，版本下拉会自动出现
