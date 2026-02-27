---
title: 错误码与重试策略
description: 错误码分类、是否可重试、退避策略示例。
nav:
  order: 40
---

## 错误码分类（示例）

### 可重试（通常是暂态）

- `rate_limited`：限流
- `service_unavailable`：服务暂时不可用
- `timeout`：请求超时

建议：指数退避 + 抖动（jitter）。

### 不可重试（通常是永久性）

- `invalid_request`：参数问题
- `unauthorized`：认证失败
- `forbidden`：权限不足

建议：修正请求后再重试。

## 退避策略（伪代码）

```ts
function backoff(attempt: number) {
  const base = Math.min(1000 * 2 ** attempt, 30_000);
  const jitter = Math.random() * 250;
  return base + jitter;
}
```

## 观察与告警

- 以 `request_id` 做全链路追踪
- 按错误码聚合监控（例如 4xx/5xx、rate limited 占比）
