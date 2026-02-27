---
title: Errors & Retry Strategy
description: Error categories, retryability, and backoff examples.
nav:
  order: 40
---

## Categories (example)

### Retryable (transient)

- `rate_limited`
- `service_unavailable`
- `timeout`

Use exponential backoff with jitter.

### Non-retryable (permanent)

- `invalid_request`
- `unauthorized`
- `forbidden`

Fix the request first.

## Backoff (pseudo code)

```ts
function backoff(attempt: number) {
  const base = Math.min(1000 * 2 ** attempt, 30_000);
  const jitter = Math.random() * 250;
  return base + jitter;
}
```
