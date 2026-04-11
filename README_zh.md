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
本地化、基于文件、双链
</p>

</div>

<div align="center">

[![BUILD](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml/badge.svg)](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml) [![VERSION](https://img.shields.io/github/v/release/zditor/zditor-docs)](https://img.shields.io/github/v/release/zditor/zditor-docs) [![ISSUE](https://img.shields.io/github/issues-closed/zditor/zditor-docs)](https://img.shields.io/github/issues-closed/zditor/zditor-docs) [![官网](https://img.shields.io/badge/官网-zditor.com-blue)](https://zditor.com) [![文档](https://img.shields.io/badge/文档-docs.zditor.com-green)](https://docs.zditor.com)

[![哔哩哔哩](https://img.shields.io/badge/哔哩哔哩-官方频道-00A1D6)](https://space.bilibili.com/) [![YouTube](https://img.shields.io/badge/YouTube-@SeeLeyWang-FF0000)](https://youtube.com/@SeeLeyWang) [![公众号](https://img.shields.io/badge/公众号-扫码关注-07C160)](https://zditor.com/wechat) [![Discord](https://img.shields.io/badge/Discord-加入社区-5865F2)](https://discord.gg/juxMNxKs) [![微信群](https://img.shields.io/badge/微信-扫码入群-07C160)](https://zditor.com/wechat)

</div>

[English Version](README.md)


---

<p align="center">欢迎来到 Zditor，一个AI加持的markdown编辑器。</p>

<p align="center">这个仓库是Zditor的文档仓库(markdown)，<code>docs</code> 分支可以查看富文本文档</p>

<p align="center">
<img alt="home" src="https://download.zditor.com/newweb/home.png">
</p>

## 目录

- [入门指南](#入门指南)
- [技能](#技能)
- [文档](#文档)

## 社区

- [公众号](https://zditor.com/wechat) 后续接bot用于反馈和排序功能&优先级
- [微信群](https://zditor.com/wechat)

## 入门指南

Zditor 是一个所见即所得的 markdown 编辑器，支持 markdown 基础语法，并在此基础上扩展。目前支持`Windows`、`Macos`、`Linux大的多大的点点滴滴sadfasdfdd`da1平台，下载请前往 [release下载界面](https://github.com/zditor/zditor-docs/releases),或者前往[官网](https://zditor.com)下载。

## 技能

当前工作区 `.claudes/commands`可用的两个技能如下：

- `zditor-syntex`: 用于帮助agent学习使用zditor的markdown扩展语法。
- `import-excel`: 是将excel文档转换为zditor支持的数据库表。

#### 强大的文本格式化功能

<div><video src="https://download.zditor.com/newweb/format.mov" controls autoplay loop muted playsinline
style="width: 100%; ">
您的浏览器不支持 Video 标签。
</video></div>

#### 数据表示例

本仓库包含一个完整的电影数据表示例，位于 `movies` 目录下。这个数据表展示了 Zditor 的 SuperTag 功能，每部电影都是一个独立的 markdown 文件，包含丰富的结构化数据：

- **片名**、**原片名**、**导演**、**主演**等基本信息
- **年份**、**国家**、**类型**等分类字段
- **豆瓣评分**、**AFI排名**、**我的评分**等评分系统
- **观看日期**、**已看状态**、**观后感**等个人记录
- **封面图片**、**暖色调标记**等视觉元素
- 支持多种字段类型：文本、数字、日期、多选、进度条、数组等

示例文件：[movies/教父.md](movies/教父.md)，你也可以在文档中这样引用 [ClassicMovie](/movies/教父.md|mode=supertag)

这个数据表可以作为你创建自己的数据库表的参考模板，展示了如何使用 Zditor 管理结构化内容。

#### 数学公式文档示例

本仓库包含数学与深度学习公式文档示例，位于 `math` 目录下。这些文档展示了 Zditor 的封面卡片（Cover Card）功能，结合 SuperTag 结构化数据与丰富的 LaTeX 公式渲染：

- **封面图片**：卡通风格插画，左上角留白供标题展示，右下密集元素
- **结构化元信息**：标题、学科、描述、作者、标签、更新日期等字段
- **LaTeX 公式**：微积分、线性代数、概率论、神经网络、优化算法等
- **暖/冷色调**：通过 `warm` 字段控制封面色调风格

示例文件：[math/math-formulas.md](math/math-formulas.md)、[math/deep-learning-formulas.md](math/deep-learning-formulas.md)

#### PPT 演示文档示例

本仓库包含一个完整的 PPT 演示文档示例，位于 `examples/llm_model_critique_talk` 目录下。这个示例展示了如何使用 Zditor 创建富媒体演示文档：

- **视频嵌入**：支持在文档中直接嵌入和播放视频
- **音频讲解**：每一页 PPT 都配有对应的音频讲解文件
- **图片展示**：包含完整的 PPT 页面截图
- **结构化内容**：清晰的章节划分，包含页上文字和详细讲稿
- **多媒体整合**：将视频、音频、图片和文本完美结合在一个 markdown 文档中

示例文件：[examples/llm_model_critique_talk/llm_world_model_critique_talk.md](examples/llm_model_critique_talk/llm_world_model_critique_talk.md)

这个示例展示了 Zditor 在创建演示文档、教学材料、多媒体笔记等场景下的强大能力。

#### 代码示例文档

本仓库新增了一个代码示例目录，位于 `examples/code-examples`。这个示例展示了如何在 Zditor 文档中直接编写和组织代码内容：

- **行内代码**：适合在正文中标注命令、变量、函数名
- **多语言代码块**：包含 JavaScript、TypeScript、Python、Bash、JSON 等示例
- **文档与代码混排**：适合教程、API 文档、开发说明等场景

示例文件：[examples/code-examples/code-examples.md](examples/code-examples/code-examples.md)

#### Mermaid 图表文档

本仓库包含一个 Mermaid 示例目录，位于 `examples/mermaid-examples`。这个示例展示了如何在 Zditor 中通过 ` ```mermaid ` 代码块编写常见图表：

- **流程图**：用于展示业务流程、判断分支与系统流转
- **时序图**：用于描述前后端、服务与数据库之间的调用顺序
- **甘特图**：用于项目排期、任务计划与关键路径表达
- **类图 / 状态图 / ER 图**：用于软件设计、状态机和数据建模
- **思维导图 / Git 图 / 饼图 / 用户旅程图**：适合知识整理、版本历史和产品分析

示例文件：[examples/mermaid-examples/mermaid-examples.md](examples/mermaid-examples/mermaid-examples.md)

## 文档

文档见网站[文档](https://docs.zditor.com)或者切换到分支`git checkout docs`。
