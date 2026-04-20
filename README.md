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

[中文](README_zh.md) | [日本語](README_ja.md) | [Deutsch](README_de.md)


---

<p align="center">Welcome to Zditor, an AI-enhanced markdown editor.</p>

<p align="center">This repository contains Zditor documentation in Markdown. Switch to the <code>docs</code> branch to view rich-text documents.</p>

<p align="center">
<img alt="home" src="https://download.zditor.com/newweb/home.png">
</p>

## Table of Contents

- [Getting Started](#getting-started)
- [Community](#community)
- [Skills](#skills)
- [English Docs](#english-docs)
- [Other Languages](#other-languages)

## Getting Started

Zditor is a WYSIWYG markdown editor that supports standard Markdown and extends it with structured-document features. It currently supports `Windows`, `macOS`, and `Linux`.

Download from the [Releases page](https://github.com/zditor/zditor-docs/releases), or from the [official website](https://zditor.com).

## Community

- [WeChat Official Account](https://zditor.com/wechat)
- [WeChat Group](https://zditor.com/wechat)
- [Discord](https://discord.gg/juxMNxKs)
- [YouTube](https://youtube.com/@SeeLeyWang)

## Skills

This repository ships two installable Codex skills and matching Claude Code commands:

- `zditor-syntax`: Helps agents learn and use Zditor's extended markdown syntax.
- `import-excel`: Converts Excel documents into database tables supported by Zditor.

Install them for Codex:

```bash
git clone https://github.com/zditor/zditor-docs.git
cd zditor-docs
./scripts/install-codex-skills.sh
```

The installer copies both skills into `$CODEX_HOME/skills` when `CODEX_HOME` is set, or `~/.codex/skills` otherwise. Restart Codex after installation.

For Claude Code, open this repository as the workspace and use the repo-local commands in `.claude/commands`:

- `/zditor-syntax`
- `/import-excel`

#### Powerful Text Formatting

<div><video src="https://download.zditor.com/newweb/format.mov" controls autoplay loop muted playsinline
style="width: 100%; ">
Your browser does not support the video tag.
</video></div>

## English Docs

The English documentation lives in the `english/` directory. It currently includes mathematics guides, code examples, paper notes, movies, a SuperTag guide, and a Mermaid guide.

### Directory Guide

- [Mathematics](english/mathematics/)
- [Code Examples](english/Code%20Examples.md)
- [Transformer Paper Notes](english/Transformer%20Paper%20Notes.md)
- [Movies](english/movies/)
- [SuperTag Guide](english/SuperTag%20Guide.md)
- [Mermaid Guide](english/Mermaid%20Guide.md)

### Mathematics Docs

- [Mathematics Formula Guide](english/mathematics/Mathematics%20Formula%20Guide.md)
- [Statistics Formula Guide](english/mathematics/Statistics%20Formula%20Guide.md)
- [Linear Algebra Formula Guide](english/mathematics/Linear%20Algebra%20Formula%20Guide.md)
- [Classical Physics Formula Guide](english/mathematics/Classical%20Physics%20Formula%20Guide.md)
- [Chemistry Formulas and Reactions Guide](english/mathematics/Chemistry%20Formulas%20and%20Reactions%20Guide.md)
- [Deep Learning Formula Guide](english/mathematics/Deep%20Learning%20Formula%20Guide.md)

### Movies

The movie directory contains a structured movie database. Each movie is stored as its own Markdown file with frontmatter fields and body content.

- [The Godfather](english/movies/The%20Godfather.md)
- [Citizen Kane](english/movies/Citizen%20Kane.md)
- [Rear Window](english/movies/Rear%20Window.md)
- [Psycho](english/movies/Psycho.md)
- [Browse the full movie directory](english/movies/)

### More English Guides

- [Code Examples](english/Code%20Examples.md)
- [Transformer Paper Notes](english/Transformer%20Paper%20Notes.md)
- [SuperTag Guide](english/SuperTag%20Guide.md)
- [Mermaid Guide](english/Mermaid%20Guide.md)

## Other Languages

Root README files in other languages:

- [中文](README_zh.md)
- [日本語](README_ja.md)
- [Deutsch](README_de.md)

