---
description:
  type: text
  description:
  label: Description
  value: "Zditor 语法 · 注释 · 修订 · Tip · Revision"
author:
  type: text
  description:
  label: Author
  value: "SeeLey & Codex"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../assets/guides/code-examples-cover-nanobanana.jpg"
col:
  type: array
  description:
  label: Col
  value: ["subject","title","description"]
subject:
  type: text
  description:
  label: Subject
  value: "Zditor Syntax"
avatar:
  type: asset
  description:
  label: Avatar
  value: "../assets/nanobanana-avatar.svg"
tags:
  type: text
  description:
  label: Tags
  value: "Zditor · 注释 · 修订 · Tip · Revision"
title:
  type: text
  description:
  label: Title
  value: "Zditor注释与修订指南"
display:
  type: checkbox
  description: display
  label: 显示属性
  value: false
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-21"
warm:
  type: checkbox
  description: warm
  label: 暖色调
  value: true
row:
  type: array
  description:
  label: Row
  value: ["avatar","author","updated","tags"]
---
# Zditor注释与修订指南

这篇文档专门演示 Zditor 里的两种行内标注能力：

- `注释`：给一段文字补充说明，不改原文
- `修订`：给一段文字提出替换建议，可接受修改

如果你正在做校对、协作编辑、术语解释、文稿润色，这两种语法通常够用了。

## 两者有什么区别

|能力 |用途 |是否能接受修改 |适合场景 |
|---|---|---|---|
|`mode=tip` |说明、解释、补充背景 |否 |术语注释、阅读提示、上下文说明 |
|`mode=revision` |对原文提出替换建议 |是 |错别字修正、措辞优化、时间补全、口吻统一 |

!!! info 使用建议
    需要“解释一下这段话”时用注释。
    需要“把这段话改成另一个版本”时用修订。

## 最小示例

先看两个最小可用写法：

```md
[术语](这里写说明|mode=tip|style=teal)

[原文](这里写为什么要改|mode=revision|style=indigo|advice=修改后的文本)
```

直接效果示例：

- [Zditor](一个支持扩展%20Markdown%20语法的编辑器|mode=tip|style=teal) 可以把说明直接挂在词语上。
- 请把 [上周左右](时间表达过于模糊|mode=revision|style=red|advice=2026年4月中旬) 改成更明确的时间。

!!! tip 手写源码时把空格写成 `%20`
    如果你直接编辑 Markdown 源码，`tip` 和 `revision` 的括号内容里一旦出现空格，就要写成 `%20`。
    这包括说明文字、文件路径、URL，以及 `advice` 的值。
    如果你是在工具栏里填写这些字段，可以直接输入普通空格；文档落盘时会自动转换成 `%20`。
    例如手写源码时可写成 `[Zditor](一个支持扩展%20Markdown%20语法的编辑器|mode=tip|style=teal)`。

## 注释 Tip

`Tip` 适合做解释型批注。它不会替换正文，只负责说明“这段文字是什么意思”或“读者需要知道什么背景”。

### 写法

```md
[文本内容](注释说明|mode=tip|style=颜色)
```

### 直接效果

[向量数据库](适合做语义检索，但不等于传统关系型数据库|mode=tip|style=teal) 常用于知识库检索。

建议先完成 [权限模型](这里指角色、资源、操作三者之间的授权规则|mode=tip|style=yellow) 再开放团队协作。

如果接口名保留英文，最好在第一次出现时给出 [DTO](Data%20Transfer%20Object，数据传输对象|mode=tip|style=indigo) 说明。

### 对应源码

```md
[向量数据库](适合做语义检索，但不等于传统关系型数据库|mode=tip|style=teal) 常用于知识库检索。

建议先完成 [权限模型](这里指角色、资源、操作三者之间的授权规则|mode=tip|style=yellow) 再开放团队协作。

如果接口名保留英文，最好在第一次出现时给出 [DTO](Data%20Transfer%20Object，数据传输对象|mode=tip|style=indigo) 说明。
```

## 修订 Revision

`Revision` 适合做可执行的修改建议。它会保留原文，同时给出一条替换方案，用户可以选择接受。

### 写法

```md
[原文内容](修改说明|mode=revision|style=颜色|advice=替换建议)
```

### 直接效果

本次发布计划 [尽快](时间要求不明确|mode=revision|style=red|advice=在2026年4月30日前) 完成。

建议把 [用了](口语化偏重|mode=revision|style=indigo|advice=采用了) 改成更书面的表达。

文档中的 [teh](拼写错误|mode=revision|style=red|advice=the) 需要修正。

### 对应源码

```md
本次发布计划 [尽快](时间要求不明确|mode=revision|style=red|advice=在2026年4月30日前) 完成。

建议把 [用了](口语化偏重|mode=revision|style=indigo|advice=采用了) 改成更书面的表达。

文档中的 [teh](拼写错误|mode=revision|style=red|advice=the) 需要修正。
```

## 一段文字里同时使用注释和修订

实际写作里，注释和修订经常混用：某些词只需要解释，另一些词需要直接改。

### 直接效果

这个版本基于 [MVP](Minimum%20Viable%20Product，最小可行产品|mode=tip|style=teal) 先验证核心流程，预计 [下个月初](时间范围过宽|mode=revision|style=red|advice=2026年5月上旬) 开始邀请首批用户试用。当前文案里把 [点击](交互文案更适合用“选择”或“打开”描述|mode=revision|style=indigo|advice=选择) 写成统一动作词，会更适合桌面端场景。

### 对应源码

```md
这个版本基于 [MVP](Minimum%20Viable%20Product，最小可行产品|mode=tip|style=teal) 先验证核心流程，预计 [下个月初](时间范围过宽|mode=revision|style=red|advice=2026年5月上旬) 开始邀请首批用户试用。当前文案里把 [点击](交互文案更适合用“选择”或“打开”描述|mode=revision|style=indigo|advice=选择) 写成统一动作词，会更适合桌面端场景。
```

## 颜色怎么选

参考 `zditor-syntax` 里的约定，颜色建议这样用：

|颜色 |适合场景 |
|---|---|
|`red` |错误、删除、时间不清、拼写问题 |
|`indigo` |措辞优化、风格统一、表达升级 |
|`teal` |中性说明、术语解释、一般建议 |
|`yellow` |提醒、注意事项、需要读者额外关注 |
|`green` |正向说明、推荐保留、通过确认 |

直接效果示例：

- [缓存预热](上线前建议先跑一次，避免冷启动抖动|mode=tip|style=yellow) 可以减少第一批请求的延迟。
- 这一处 [完成了](语气可以更具体|mode=revision|style=green|advice=已经完成联调) 也可以用 `green` 做正向修订。

## 适合放在哪里

- PR 评审文档：解释术语、指出措辞问题
- 产品方案：补充背景，修正模糊时间
- 论文或技术笔记：解释缩写、标记需要改写的句子
- 团队协作文档：统一口径、保留讨论痕迹

## 常见错误

!!! warning 容易写错的地方
    `revision` 必须带 `advice`，否则只有“指出问题”没有“替换建议”。
    `tip` 不需要 `advice`，写了也没有必要。
    `style` 只能用约定颜色，最稳妥的是 `teal`、`indigo`、`red`、`green`、`yellow`。
    注释和修订都是行内语法，适合标一小段文字，不要一整段都包进去。

## 复制即可用的模板

### 注释模板

```md
这里有一个 [术语](这里解释它的含义|mode=tip|style=teal) 需要说明。
```

### 修订模板

```md
请把 [原来的说法](这里说明为什么要改|mode=revision|style=indigo|advice=修改后的说法) 换成更准确的表达。
```

### 校对段落模板

```md
这个版本基于 [API Gateway](负责统一入口、鉴权和路由分发|mode=tip|style=teal) 提供外部访问能力，预计 [近期](时间太模糊|mode=revision|style=red|advice=2026年5月) 对合作方开放测试。
```

## 推荐搭配阅读

- [代码示例](./代码示例.md)
- [SuperTag使用指南](./SuperTag使用指南.md)
- [Mermaid使用指南](./Mermaid使用指南.md)


