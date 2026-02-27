---
title: Webhook 回调
description: 回调签名校验、重试与幂等处理的示例。
nav:
  order: 20
---

## 典型流程

1. 你在控制台配置一个回调地址（例如 `https://example.com/webhook`）
2. 平台在事件发生时向该地址 POST JSON
3. 你的服务校验签名、解析 payload 并处理

## 请求示例（payload）

```json
{
  "id": "evt_123",
  "type": "job.completed",
  "created_at": "2026-02-23T00:00:00Z",
  "data": {
    "job_id": "job_abc",
    "status": "completed"
  }
}
```

## 幂等与重试

- 以 `event.id` 作为幂等键（处理过就跳过）
- 处理失败返回非 2xx，让平台按策略重试

## 签名校验（示例）

假设 header 携带 `X-Signature`，使用共享密钥计算 HMAC：

```ts
import crypto from "node:crypto";

export function verify(sig: string, body: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
```

## 排障建议

- 记录事件 id、类型与耗时（避免记录敏感数据）
- 提供重放工具：按 event id 拉取原始 payload 重新执行
