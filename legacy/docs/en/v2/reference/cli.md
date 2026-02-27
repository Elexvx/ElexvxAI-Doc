---
title: CLI Reference
description: Common commands, flags, and example output.
nav:
  order: 50
---

## Commands (example)

```bash
elexvxai login
elexvxai whoami
elexvxai jobs list --limit 20
elexvxai jobs get job_123
```

## Flag conventions

- `--json` machine-readable output
- `--limit` pagination size
- `--profile` select environment (dev/staging/prod)

## Example output

```json
{
  "data": [
    { "id": "job_1", "status": "running" },
    { "id": "job_2", "status": "completed" }
  ]
}
```
