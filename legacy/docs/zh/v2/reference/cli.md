---
title: CLI 参考
description: 常见命令、参数与示例输出。
nav:
  order: 50
---

## 常见命令（示例）

```bash
elexvxai login
elexvxai whoami
elexvxai jobs list --limit 20
elexvxai jobs get job_123
```

## 参数约定

- `--json`：输出 JSON（便于脚本处理）
- `--limit`：分页数量
- `--profile`：选择环境（dev/staging/prod）

## 示例：列出任务

```bash
elexvxai jobs list --limit 2 --json
```

示例输出：

```json
{
  "data": [
    { "id": "job_1", "status": "running" },
    { "id": "job_2", "status": "completed" }
  ]
}
```
