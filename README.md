<h1 align="center">Zditor</h1>
<p align="center">
  <a href="https://github.com/zditor/zditor-docs">Documentation</a> - <a href="https://zditor.com">Official Website</a>
</p>

<div align="center">

[![build_zditor](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml/badge.svg)](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml)

</div>

[中文版](README_zh.md)

---

<p align="center">Welcome to Zditor, an AI-powered markdown editor.</p>
<p align="center">This repository is not for source code, it only contains Zditor-related documentation.</p>

<p align="center">
  <img alt="home" src="./assets/home.png">
</p>

## Table of Contents

- [Getting Started](#getting-started)
- [Roadmap](#roadmap)

## Getting Started

Zditor is a WYSIWYG markdown editor that supports basic markdown syntax with extensions. Currently available for `Windows`, `Macos`, and `Linux` platforms. Download from the [releases page](https://github.com/zditor/zditor-docs/releases).

### Signature Issues

- `Macos` currently lacks code signing. After downloading, you'll need two additional steps:
  1. During installation
  2. When opening for the first time
  Go to Privacy & Security settings and select "Open Anyway", as shown below:

![install](./assets/install.gif)

### LLM Model Configuration

Uses OpenAI SDK's streaming output, supporting both API and local models. As shown below, enter the relevant parameters. For models, separate them with commas (English commas). The `ollama` API key can be left blank.

![model](./assets/model.gif)

### Using LLM Features

Supports text selection and dedicated chat tabs. Text selection enables single-turn conversations, while chat tabs support multi-turn conversations with file uploads, document selection as context, and drag-and-drop uploads.

![session](./assets/session.gif)

![ask](./assets/ask.gif)

### License

Provides free licenses. Just enter your email, click send, and retrieve the license from your email.

![license](./assets/license.gif)

## Roadmap

- UI Optimization: Current UI needs improvement, especially in light mode. Considering using Claude for optimization.
- Bug Fixes: Many bugs exist, like mermaid sometimes failing to intercept errors causing layout issues. Prioritizing critical fixes.
- Infinite Canvas Inspiration: Inspired by Affine's infinite canvas, currently Zditor has Excalidraw but needs better integration with markdown:
  - Performance optimization (current performance issues may relate to webview)
  - Embed Excalidraw in markdown documents
  - AI conversion of markdown to Excalidraw
  - Fine-grained block-level embedding of Excalidraw in markdown
- Git Module Improvements:
  - Replaced slow open-source diff package with custom solution (handles 1M+ documents instantly), needs UI polish
  - Current git functionality (commit/push/pull) is too basic
- Multilingual Support: Currently only partial modules support multiple languages
- Performance Optimization:
  - While compute-intensive tasks are implemented in Rust, more optimization needed
  - Some ProseMirror plugins from open source need optimization
  - File opening performance still insufficient (though better than mainstream ProseMirror editors)
  - **Goal**: Achieve instant opening of 1M+ character documents (like Obsidian)
- Shortcuts: Many exist but need refinement

### Thoughts 🤔

- Considered knowledge base features but rejected due to large app size (model embeddings) or requiring external services. Goal is to keep app size **under 20MB**.
- Global text selection plugin would require simulating mod c/v (with side effects) or deeper system APIs (though Swift experience exists, not ObjC). Douban's implementation seems good (likely uses simulated mod c/v 😂)
- Planning a state machine plugin - more advanced than mind maps. When AI analyzes code with if-else branches, it could generate Excalidraw-style hand-drawn mind maps. State machines would guide next steps based on conditions, handling loops better than mind maps.