---
title: Webhooks
description: Signature verification, retries, and idempotency patterns.
nav:
  order: 20
---

## Typical flow

1. Configure a callback URL (e.g. `https://example.com/webhook`)
2. Platform sends event payloads as POST requests
3. Your service verifies signatures and processes the event

## Example payload

```json
{
  "id": "evt_123",
  "type": "job.completed",
  "created_at": "2026-02-23T00:00:00Z",
  "data": { "job_id": "job_abc", "status": "completed" }
}
```

## Retries & idempotency

- Use `event.id` as your idempotency key
- Return non-2xx to trigger a retry (according to platform policy)

## Signature verification (example)

```ts
import crypto from "node:crypto";

export function verify(sig: string, body: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}
```
