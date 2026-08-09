<div align="center">

<h1 style="border-bottom: none">
<b><a href="https://zditor.com">
<img alt="zditor_logo" src="assets/logo.svg" style="width: 80%">
</a></b><br />
原生Agent、轻量、高性能、写画一体
<br>
</h1>
<br/>
<p align="center">
轻量、高性能、AI赋能、写画一体、所见即所得<br />
本地优先、基于文件、双向链接
</p>

</div>

<div align="center">

[![BUILD](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml/badge.svg)](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml) [![VERSION](https://img.shields.io/github/v/release/zditor/zditor-docs)](https://img.shields.io/github/v/release/zditor/zditor-docs) [![ISSUE](https://img.shields.io/github/issues-closed/zditor/zditor-docs)](https://img.shields.io/github/issues-closed/zditor/zditor-docs) [![官网](https://img.shields.io/badge/官网-zditor.com-blue)](https://zditor.com) [![文档](https://img.shields.io/badge/文档-docs.zditor.com-green)](https://docs.zditor.com)

[![哔哩哔哩](https://img.shields.io/badge/哔哩哔哩-官方频道-00A1D6)](https://space.bilibili.com/) [![YouTube](https://img.shields.io/badge/YouTube-@SeeLeyWang-FF0000)](https://youtube.com/@SeeLeyWang) [![公众号](https://img.shields.io/badge/公众号-扫码关注-07C160)](https://zditor.com/wechat) [![Discord](https://img.shields.io/badge/Discord-加入社区-5865F2)](https://discord.gg/juxMNxKs) [![微信群](https://img.shields.io/badge/微信-扫码入群-07C160)](https://zditor.com/wechat)

</div>

[English](README.md) | [日本語](README_ja.md) | [Deutsch](README_de.md)


---

<p align="center">欢迎来到 Zditor，一个 AI 加持的 Markdown 编辑器。</p>

<p align="center">这个仓库是 Zditor 的 Markdown 文档仓库，切换到 <code>docs</code> 分支可以查看富文本文档。</p>

<p align="center">
<img alt="home" src="assets/home_zh.png">
</p>

## 目录

- [入门](#入门)
- [社区](#社区)
- [技能](#技能)
- [中文文档](#中文文档)
- [其他语言](#其他语言)

## 入门

Zditor 是一个所见即所得的 Markdown 编辑器，支持标准 Markdown，并在此基础上扩展出结构化文档能力。目前支持 `Windows`、`macOS` 和 `Linux`。

下载请前往 [Releases 页面](https://github.com/zditor/zditor-docs/releases)，或访问 [官网](https://zditor.com)。

## 社区

- [公众号](https://zditor.com/wechat)
- [微信群](https://zditor.com/wechat)
- [Discord](https://discord.gg/juxMNxKs)
- [YouTube](https://youtube.com/@SeeLeyWang)

## 技能

这个仓库现在是一套可由 agent 自动安装的 skill 集合。[`skills/manifest.json`](skills/manifest.json) 是机器可读清单，[`AGENTS.md`](AGENTS.md) 则明确告诉 agent 如何 clone 仓库并安装兼容的 skill。

| Skill | Codex | Zditor Native Agent | 用途 |
|---|:---:|:---:|---|
| `zditor-syntax` | 支持 | 支持 | 生成和修复 Zditor 扩展 Markdown |
| `import-excel` | 支持 | 支持 | 把 Excel 转换为 SuperTag 项目 |
| `img-gen` | 不支持 | 支持 | 生成图片 |
| `music-gen` | 不支持 | 支持 | 生成音乐 |
| `speech-gen` | 不支持 | 支持 | 生成语音 |
| `video-gen` | 不支持 | 支持 | 生成视频 |

直接把下面这句话发给 agent 即可：

> 安装 https://github.com/zditor/zditor-docs 中所有适用于你当前运行环境的 skills。

agent 会 clone 仓库、读取清单并执行安装脚本。手动给 Codex 安装时运行：

```bash
git clone --depth 1 https://github.com/zditor/zditor-docs.git
cd zditor-docs
./scripts/install-skills.sh --target codex
```

安装到 Zditor App 时运行：

```bash
git clone --depth 1 https://github.com/zditor/zditor-docs.git
./zditor-docs/scripts/install-skills.sh --target zditor
```

安装器会自动识别 Zditor App 的全局 skills 目录；macOS 上是 `~/Library/Application Support/com.zditor.ai/skills`。只有 App 使用非默认位置时才需要设置 `ZDITOR_SKILLS_DIR` 或传入 `--dest <skills目录>`。已经存在的 skill 目录会保持原样，因此本地配置不会被覆盖；新安装只复制 `.env.example` 模板，绝不会复制 `.env` 或 API key。仅为需要使用的 skill 在本地填写凭据，然后重新加载 App。

#### 强大的文本格式化功能

<div><video src="https://download.zditor.com/zditor-com/basic_zh_small.mov" controls autoplay loop muted playsinline
style="width: 100%; ">
您的浏览器不支持 Video 标签。
</video></div>

## 中文文档

中文文档位于 `中文/` 目录，当前包含数学、电影、代码示例、论文解读、一份带分段音频的 Zditor 复盘分享、SuperTag 指南、Mermaid 指南，以及一份注释与修订语法示例。

### 目录导航

- [数学](中文/数学/)
- [代码示例](中文/代码示例.md)
- [Transformer论文解读](中文/Transformer论文解读.md)
- [Zditor复盘分享](中文/Zditor复盘分享.md)
- [电影](中文/电影/)
- [SuperTag 使用指南](中文/SuperTag使用指南.md)
- [Zditor 注释与修订指南](中文/Zditor注释与修订指南.md)
- [Mermaid 使用指南](中文/Mermaid使用指南.md)

### 数学文档

- [数学公式详解](中文/数学/数学公式详解.md)
- [统计学公式详解](中文/数学/统计学公式详解.md)
- [线性代数公式详解](中文/数学/线性代数公式详解.md)
- [经典物理学公式详解](中文/数学/经典物理学公式详解.md)
- [化学公式与反应详解](中文/数学/化学公式与反应详解.md)
- [深度学习公式详解](中文/数学/深度学习公式详解.md)
- [数学公式排版示例](中文/数学/示例/数学公式排版示例.md)
- [公式推导示例](中文/数学/示例/公式推导示例.md)

### 电影文档

电影目录是一组结构化电影文档，每部电影对应一个独立 Markdown 文件。

- [教父](中文/电影/教父.md)
- [公民凯恩](中文/电影/公民凯恩.md)
- [后窗](中文/电影/后窗.md)
- [惊魂记](中文/电影/惊魂记.md)
- [浏览完整电影目录](中文/电影/)

### 其他中文文档

- [代码示例](中文/代码示例.md)
- [Transformer论文解读](中文/Transformer论文解读.md)
- [Zditor复盘分享](中文/Zditor复盘分享.md)
- [SuperTag 使用指南](中文/SuperTag使用指南.md)
- [Zditor 注释与修订指南](中文/Zditor注释与修订指南.md)
- [Mermaid 使用指南](中文/Mermaid使用指南.md)

## 其他语言

其他语言的根 README：

- [English](README.md)
- [日本語](README_ja.md)
- [Deutsch](README_de.md)
