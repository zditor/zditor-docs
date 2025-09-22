<div align="center">

<h1 style="border-bottom: none">
<b><a href="https://zditor.com">
<img alt="zditor_logo" src="assets/logo.svg" style="width: 80%">
</a></b><br />
AI-Powered, Lightweight, High-Performance, Integrated Writing and Drawing
<br>
</h1>
<br/>
<p align="center">
Lightweight, High-Performance, AI-Powered, Integrated Writing and Drawing, WYSIWYG<br />
Localized, File-Based, Dual-Link
</p>

</div>

<div align="center">

[![BUILD](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml/badge.svg)](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml) [![VERSION](https://img.shields.io/github/v/release/zditor/zditor-docs)](https://img.shields.io/github/v/release/zditor/zditor-docs) [![ISSUE](https://img.shields.io/github/issues-closed/zditor/zditor-docs)](https://img.shields.io/github/issues-closed/zditor/zditor-docs)

</div>

[中文版本](README_zh.md)
[日本語版](README_ja.md)


---

<p align="center">Welcome to Zditor, an AI-powered markdown editor.</p>

<p align="center">This repository is not the source code repository; it only contains documentation related to Zditor.</p>

<p align="center">
<img alt="home" src="./assets/home.png">
</p>

## Table of Contents

- [Getting Started](#getting-started)
- [Roadmap](#roadmap)
- [MCP Server Configuration Guide](#mcp-server-configuration-guide)

## FeedBack

💬 Join [wechat group](https://github.com/zditor/zditor-docs/discussions/33)

## Getting Started

Zditor is a WYSIWYG markdown editor that supports basic markdown syntax and extends upon it. It currently supports `Windows`, `Macos`, and `Linux` platforms. To download, please visit the [release download page](https://github.com/zditor/zditor-docs/releases).

### Demo Video

[Simple Demo of Zditor](https://www.bilibili.com/video/BV1sKZPYBEJA/?share_source=copy_web&vd_source=1974ff0cf0dde44aad6580cca6526a34)

### Signature Issue

- `Macos` currently does not have a signature. After downloading, two additional steps are required: during installation and the first time opening the app, `go to Privacy & Security in Settings and select "Open Anyway."`

### LLM Model Configuration

Uses OpenAI SDK's streaming output, supporting both API and local models. As shown in the image below, you can fill in the relevant parameters. For the model section, separate the entries with commas (English commas). The `ollama` API key can be left blank.

### LLM Usage

Supports text selection and a separate chat tab. Text selection is for single-round conversations, while the chat tab supports multi-round conversations, file uploads, selecting documents as context, drag-and-drop uploads, etc.

### License

A free license is provided. Simply enter your email, click "Send," and then retrieve the license from your email.

!!! warning License Not Recieved?
    Please allow 1-2 minutes for the email to arrive after you've been prompted to check your inbox. First, check your spam/junk folder. If it's still not there, you can wait two minutes and then resend.

## AI

For AI feature usage, refer to the [AI Usage Guide](https://example.com/ai-usage-guide). For Ollama configuration, refer to the [Ollama Configuration Guide](https://example.com/ollama-config-guide). For Agent usage, refer to the [Agent Usage Guide](zh_cn/Agent智能体使用指南.md). If a connection failure is prompted, please check first:


1. Is Ollama already running?
2. Is VPN enabled (may need to be disabled)?
3. Is CORS configured: https://objectgraph.com/blog/ollama-cors/

   ![跨域检测](./assets/跨域.png)

### Ollama CORS Configuration

To test in the terminal, if `curl -X OPTIONS http://localhost:11434 -H "Origin: http://example.com" -H "Access-Control-Request-Method: GET" -I` displays "Forbidden", it means CORS is not enabled. For Windows systems, you need to configure the system environment variable: `OLLAMA_ORIGINS`. The specific steps are:


1. Open System Settings, search for "System Variables".
2. Click the pop-up dialog, select "Environment Variables".
3. Click "New", enter `OLLAMA_ORIGINS` and `*`.
4. Save, and restart Ollama.
5. Test: `curl -X OPTIONS http://localhost:11434 -H "Origin: http://example.com" -H "Access-Control-Request-Method: GET" -I`. If various headers are displayed, it means the setting was successful.
6. Open Zditor to test.

## Plugin System

zditor supports many syntax formats, such as tables, formulas, [Code Block](./en/PluginSystems/CodeBlock.md), [Smart Text](./en/PluginSystems/SmartText.md), etc.

## MCP Server Configuration Guide

For MCP server configuration, refer to the [MCP Server Configuration Guide](zh_cn/MCP服务器配置指南.md).
