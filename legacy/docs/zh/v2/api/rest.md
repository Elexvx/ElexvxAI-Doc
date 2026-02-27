---
title: REST API 约定
description: 路径、分页、错误结构与示例请求。
nav:
  order: 30
---

## 基本约定（示例）

- Base URL：`https://api.example.com`
- 版本：`/v2`
- 认证：`Authorization: Bearer <token>`

## 分页

采用游标分页（cursor）：

```http
GET /v2/jobs?limit=20&after=job_abc
```

响应示例：

```json
{
  "data": [{ "id": "job_1" }, { "id": "job_2" }],
  "has_more": true,
  "next_cursor": "job_2"
}
```

## 错误结构

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Missing required field: name",
    "request_id": "req_123"
  }
}
```

## 速查

| 场景 | 建议 |
| --- | --- |
| 参数缺失/格式错误 | 400 + `invalid_request` |
| 未认证 | 401 + `unauthorized` |
| 无权限 | 403 + `forbidden` |
| 资源不存在 | 404 + `not_found` |
| 触发限流 | 429 + `rate_limited` |
