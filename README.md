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

#### Math Formula Document Examples

This repository includes math and deep learning formula document examples in the `math` directory. They demonstrate Zditor's Cover Card feature combined with SuperTag structured data and LaTeX formula rendering:

- **Cover images**: Cartoon-style illustrations with clean top-left area for titles, dense elements toward bottom-right
- **Structured metadata**: title, subject, description, author, tags, updated date, and more
- **LaTeX formulas**: calculus, linear algebra, probability, neural networks, optimization algorithms, etc.
- **Warm/cool tone**: controlled via the `warm` field to adjust cover color style

Example files: [math/math-formulas.md](math/math-formulas.md), [math/deep-learning-formulas.md](math/deep-learning-formulas.md)
