---
title: Authentication & Authorization
description: API keys, environment variables, and least-privilege examples.
nav:
  order: 10
---

## API key (example)

```bash
curl -H "Authorization: Bearer $ELEXVXAI_API_KEY" \
  https://api.example.com/v2/ping
```

## Environment variables

Store secrets in `.env` locally and keep them out of Git:

```ini
ELEXVXAI_API_KEY=replace_me
```

## Least privilege

- Separate keys per environment (dev/staging/prod)
- Split keys by capability (read/write/admin)
- Rotate regularly and support revocation

## Common failures

### 401 Unauthorized

Missing or invalid token.

### 403 Forbidden

Token is valid but lacks permission.
