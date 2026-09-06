<div align="center">

<h1 style="border-bottom: none">
<b><a href="https://zditor.com">
<img alt="zditor_logo" src="https://docs-assets.zditor.com/v1/assets/logo.svg" style="width: 80%">
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
<img alt="home" src="https://docs-assets.zditor.com/v1/assets/home_en.png">
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

- [Discord](https://discord.gg/juxMNxKs)
- [YouTube](https://youtube.com/@SeeLeyWang)
- [WeChat Official Account](https://zditor.com/wechat)
- [WeChat Group](https://zditor.com/wechat)

## Skills

This repository is an agent-installable skill collection. [`skills/manifest.json`](skills/manifest.json) is the machine-readable catalog, and [`AGENTS.md`](AGENTS.md) tells an agent how to clone and install compatible skills.

| Skill | Codex | Zditor Native Agent | Purpose |
|---|:---:|:---:|---|
| `zditor-syntax` | Yes | Yes | Create and repair Zditor extended Markdown |
| `import-excel` | Yes | Yes | Convert Excel workbooks into SuperTag projects |
| `img-gen` | No | Yes | Generate images |
| `music-gen` | No | Yes | Generate music |
| `speech-gen` | No | Yes | Generate speech |
| `video-gen` | No | Yes | Generate videos |

You can give an agent only this instruction:

> Install every skill compatible with your runtime from https://github.com/zditor/zditor-docs

The agent can clone the repository, read the catalog, and run the installer. To install manually for Codex:

```bash
git clone --depth 1 https://github.com/zditor/zditor-docs.git
cd zditor-docs
./scripts/install-skills.sh --target codex
```

To install into the Zditor App:

```bash
git clone --depth 1 https://github.com/zditor/zditor-docs.git
./zditor-docs/scripts/install-skills.sh --target zditor
```

The installer detects the Zditor App's global skills directory; on macOS it is `~/Library/Application Support/com.zditor.ai/skills`. Use `ZDITOR_SKILLS_DIR` or `--dest <skills-directory>` only for a non-default location. Existing skill directories are left unchanged, preserving local configuration. New installs copy `.env.example` templates but never `.env` or API keys. Configure credentials locally only for the skills you use, then reload the app.

#### Powerful Text Formatting

<div><video src="https://download.zditor.com/zditor-com/basic_en_small.mov" controls autoplay loop muted playsinline
style="width: 100%; ">
Your browser does not support the video tag.
</video></div>

## English Docs

The English documentation lives in the `english/` directory. It currently includes mathematics guides, code examples, paper notes, a retrospective talk with section audio, movies, a SuperTag guide, a Mermaid guide, and a guide for annotations and revisions.

### Directory Guide

- [Mathematics](english/mathematics/)
- [Code Examples](english/Code%20Examples.md)
- [Transformer Paper Notes](english/Transformer%20Paper%20Notes.md)
- [Zditor Retrospective Talk](english/Zditor%20Retrospective%20Talk.md)
- [Movies](english/movies/)
- [SuperTag Guide](english/SuperTag%20Guide.md)
- [Zditor Annotations and Revisions Guide](english/Zditor%20Annotations%20and%20Revisions%20Guide.md)
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
- [Zditor Retrospective Talk](english/Zditor%20Retrospective%20Talk.md)
- [SuperTag Guide](english/SuperTag%20Guide.md)
- [Zditor Annotations and Revisions Guide](english/Zditor%20Annotations%20and%20Revisions%20Guide.md)
- [Mermaid Guide](english/Mermaid%20Guide.md)

## Other Languages

Root README files in other languages:

- [中文](README_zh.md)
- [日本語](README_ja.md)
- [Deutsch](README_de.md)
