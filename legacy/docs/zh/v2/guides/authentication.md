---
title: 认证与权限
description: API Key、环境变量与最小权限原则示例。
nav:
  order: 10
---

## 目标

本文用一套“可复制”的范式描述认证与权限设计，便于你后续替换成真实业务逻辑。

## API Key（示例）

假设你要调用一个 REST API，需要传 `Authorization: Bearer <token>`。

```bash
curl -H "Authorization: Bearer $ELEXVXAI_API_KEY" \
  https://api.example.com/v1/ping
```

## 环境变量管理

在本地开发中，用 `.env` 管理敏感信息（不要提交到仓库）：

```ini
ELEXVXAI_API_KEY=replace_me
```

## 最小权限原则

- 为不同环境（dev/staging/prod）使用不同的密钥
- 为不同能力拆分密钥（读/写、管理/执行）
- 定期轮换密钥，支持快速吊销

## 常见错误

### 401 Unauthorized

通常是 token 缺失、过期或格式错误。

### 403 Forbidden

通常是权限不足（token 有效但不允许访问该资源）。
