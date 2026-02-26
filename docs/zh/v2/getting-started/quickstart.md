---
title: "开发者快速入门"
description: "只需要几个简单的步骤，即可运行您的第一个 API 调用。本指南将带您完成使用我们 API 所需的基础设置。"
nav:
  order: 1
  label: "快速入门"
---

欢迎使用 API。您可以通过我们的 API 访问所有模型，包括最新的语言和视觉模型。以下是如何开始：

## 创建并导出API密钥

首先，您需要一个 API 密钥来进行身份验证。在您的环境变量中导出此密钥以便在代码中使用。

:::code-group
:::code title="macOS / Linux"
```bash
export OPENAI_API_KEY="your_api_key_here"
```
:::
:::code title="Windows"
```cmd
setx OPENAI_API_KEY "your_api_key_here"
```
:::
:::

完成此步骤后，系统就能识别您的请求了。

## 安装OpenAI SDK并运行API调用

您可以通过 NPM 或 Python 的 pip 安装 SDK：

:::code-group
:::code title="Node.js"
```bash
npm install openai
```
:::
:::code title="Python"
```bash
pip install openai
```
:::
:::

## 添加信用点以持续建设

在您探索完免费的测试功能后，需要添加 billing credit 以继续使用。您可以随时前往账单页面充值。

```json
{
  "billing": "active",
  "limits": 50000
}
```

## 分析图像和文件

除了简单的文本，您还可以发送图像、PDF 和其他文件格式。使用增强版的 SDK 以支持多模态请求。
