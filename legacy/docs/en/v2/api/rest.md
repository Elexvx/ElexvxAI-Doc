---
title: REST API Conventions
description: Paths, pagination, error shape, and example requests.
nav:
  order: 30
---

## Basics (example)

- Base URL: `https://api.example.com`
- Version: `/v2`
- Auth: `Authorization: Bearer <token>`

## Pagination

Cursor-based pagination:

```http
GET /v2/jobs?limit=20&after=job_abc
```

Response example:

```json
{
  "data": [{ "id": "job_1" }, { "id": "job_2" }],
  "has_more": true,
  "next_cursor": "job_2"
}
```

## Error shape

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Missing required field: name",
    "request_id": "req_123"
  }
}
```

## Quick map

| Case | Recommendation |
| --- | --- |
| Invalid params | 400 + `invalid_request` |
| Unauthenticated | 401 + `unauthorized` |
| Forbidden | 403 + `forbidden` |
| Not found | 404 + `not_found` |
| Rate limited | 429 + `rate_limited` |
