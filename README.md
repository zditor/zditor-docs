<div align="center">

<h1 style="border-bottom: none">
<b><a href="https://zditor.com">
<img alt="zditor_logo" src="assets/logo.svg" style="width: 80%">
</a></b><br />
Native Agent, Lightweight, High Performance, Writing + Drawing in One
<br>
</h1>
<br/>
<p align="center">
Lightweight, high performance, AI-powered, writing + drawing in one, WYSIWYG<br />
Local-first, file-based, bidirectional links
</p>

</div>

<div align="center">

[![BUILD](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml/badge.svg)](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml) [![VERSION](https://img.shields.io/github/v/release/zditor/zditor-docs)](https://img.shields.io/github/v/release/zditor/zditor-docs) [![ISSUE](https://img.shields.io/github/issues-closed/zditor/zditor-docs)](https://img.shields.io/github/issues-closed/zditor/zditor-docs) [![Website](https://img.shields.io/badge/Website-zditor.com-blue)](https://zditor.com) [![Docs](https://img.shields.io/badge/Docs-docs.zditor.com-green)](https://docs.zditor.com)

[![Bilibili](https://img.shields.io/badge/Bilibili-Official%20Channel-00A1D6)](https://space.bilibili.com/) [![YouTube](https://img.shields.io/badge/YouTube-@SeeLeyWang-FF0000)](https://youtube.com/@SeeLeyWang) [![WeChat OA](https://img.shields.io/badge/WeChat-Official%20Account-07C160)](https://zditor.com/wechat) [![Discord](https://img.shields.io/badge/Discord-Join%20Community-5865F2)](https://discord.gg/juxMNxKs) [![WeChat Group](https://img.shields.io/badge/WeChat-Join%20Group-07C160)](https://zditor.com/wechat)

</div>

[中文版本](README_zh.md)

---

<p align="center">Welcome to Zditor, an AI-enhanced markdown editor.</p>

<p align="center">This repository contains Zditor documentation (Markdown). Switch to the <code>docs</code> branch to view rich-text documents.</p>

<p align="center">
<img alt="home" src="https://download.zditor.com/newweb/home.png">
</p>

## Table of Contents

- [Getting Started](#getting-started)
- [Skills](#skills)
- [Documentation](#documentation)

## Community

- [WeChat Official Account](https://zditor.com/wechat) (A bot will be added later for feedback collection and feature-priority ranking.)
- [WeChat Group](https://zditor.com/wechat)

## Getting Started

Zditor is a WYSIWYG markdown editor. It supports standard markdown syntax and extends it with additional capabilities. It currently supports `Windows`, `macOS`, and `Linux`.

Download from the [Releases page](https://github.com/zditor/zditor-docs/releases), or from the [official website](https://zditor.com).

## Skills

Two skills are currently available in the workspace `.claudes/commands`:

- `zditor-syntex`: Helps agents learn and use Zditor's extended markdown syntax.
- `import-excel`: Converts Excel documents into database tables supported by Zditor.

#### Powerful Text Formatting

<div><video src="https://download.zditor.com/newweb/format.mov" controls autoplay loop muted playsinline
style="width: 100%; ">
Your browser does not support the video tag.
</video></div>

## Documentation

See the [documentation site](https://docs.zditor.com), or switch to the `docs` branch with `git checkout docs`.

#### Mermaid Diagram Guide

This repository includes a Mermaid example directory in `examples/mermaid-examples`. It shows how to write common diagrams in Zditor with fenced `mermaid` code blocks:

- **Flowcharts** for workflows, branching logic, and process visualization
- **Sequence diagrams** for frontend/backend/service interaction flows
- **Gantt charts** for schedules, milestones, and task planning
- **Class, state, and ER diagrams** for software and data modeling
- **Mindmaps, git graphs, pie charts, and user journeys** for planning and analysis

Example file: [examples/mermaid-examples/mermaid-examples.md](examples/mermaid-examples/mermaid-examples.md)

Language-specific guides:

- Chinese: [中文/Mermaid使用指南.md](中文/Mermaid使用指南.md)
- English: [english/Mermaid Guide.md](english/Mermaid%20Guide.md)
- German: [german/Mermaid Leitfaden.md](german/Mermaid%20Leitfaden.md)
- Japanese: [japanese/Mermaid利用ガイド.md](japanese/Mermaid利用ガイド.md)

#### Math Formula Document Examples

This repository includes cross-disciplinary formula document examples in the `math` directory. They demonstrate Zditor's Cover Card feature combined with SuperTag structured data and LaTeX formula rendering:

- **Cover images**: Cartoon-style illustrations with clean top-left area for titles, dense elements toward bottom-right
- **Structured metadata**: title, subject, description, author, tags, updated date, and more
- **LaTeX formulas**: calculus, linear algebra, probability, statistics, physics, chemistry, neural networks, optimization algorithms, and more
- **Warm/cool tone**: controlled via the `warm` field to adjust cover color style

Example files: [中文/数学/数学公式详解.md](中文/数学/数学公式详解.md), [中文/数学/统计学公式详解.md](中文/数学/统计学公式详解.md), [中文/数学/线性代数公式详解.md](中文/数学/线性代数公式详解.md), [中文/数学/经典物理学公式详解.md](中文/数学/经典物理学公式详解.md), [中文/数学/化学公式与反应详解.md](中文/数学/化学公式与反应详解.md), [中文/数学/深度学习公式详解.md](中文/数学/深度学习公式详解.md)

The `中文/数学/示例` subdirectory contains demos focused on formula presentation rather than subject coverage:

- **Equation layout examples**: block formulas, inline formulas, multi-step derivations, piecewise functions, matrices, and formulas inside tables
- **Derivation examples**: chain rule, least squares, geometric series, Newton updates, and other step-by-step derivations

Example files: [中文/数学/示例/数学公式排版示例.md](中文/数学/示例/数学公式排版示例.md), [中文/数学/示例/公式推导示例.md](中文/数学/示例/公式推导示例.md)

Current multilingual layout:

- Chinese: [中文/数学/](中文/%E6%95%B0%E5%AD%A6/)
- English: [english/mathematics/](english/mathematics/)
- German: [german/mathematik/](german/mathematik/)
- Japanese: [japanese/数学/](japanese/%E6%95%B0%E5%AD%A6/)
