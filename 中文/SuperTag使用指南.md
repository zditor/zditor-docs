---
description:
  type: text
  description:
  label: Description
  value: "SuperTag · 结构化字段 · 数据表 · 电影示例"
author:
  type: text
  description:
  label: Author
  value: "SeeLey & Codex"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../assets/guides/mermaid-guide-cover-nanobanana.jpg"
col:
  type: array
  description:
  label: Col
  value: ["subject","title","description"]
subject:
  type: text
  description:
  label: Subject
  value: "SuperTag"
avatar:
  type: asset
  description:
  label: Avatar
  value: "../assets/nanobanana-avatar.svg"
tags:
  type: text
  description:
  label: Tags
  value: "SuperTag · 数据表 · Frontmatter · 电影"
title:
  type: text
  description:
  label: Title
  value: "SuperTag使用指南"
display:
  type: checkbox
  description: display
  label: 显示属性
  value: false
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-11"
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
# SuperTag使用指南

SuperTag 是 Zditor 里把 Markdown 文档组织成“结构化记录”的方式。你仍然在写普通 `.md` 文件，但可以在 frontmatter 里声明字段、类型、显示规则和分组布局，让一批文档同时具备“可读文章”和“可筛选数据表”两种能力。

这篇指南直接使用已经完善的中文电影类作为示例。对应目录见 [中文/电影/](./电影/)。

## SuperTag 适合解决什么问题

- 用 Markdown 管理一组同类对象，例如电影、书籍、论文、客户、项目、配方
- 每条记录都有固定字段，但正文部分又需要自由书写
- 希望既能当文章读，也能按字段汇总、筛选、展示

电影类就是一个典型例子：每部电影是一篇独立 Markdown 文档，但它们共享一套字段结构，例如片名、导演、年份、类型、评分、观影日期和封面。

## 一个最小的 SuperTag 记录

下面这个例子就是电影类的一条记录缩略版：

```yaml
---
title:
  type: text
  label: 片名
  value: "教父"
director:
  type: text
  label: 导演
  value: "弗朗西斯·福特·科波拉"
year:
  type: number
  label: 年份
  value: 1972
genre:
  type: multiselect
  label: 类型
  value: ["犯罪","剧情"]
  options: ["剧情","悬疑","犯罪","爱情","喜剧"]
class:
  type: text
  label: class
  value: "ClassicMovie"
---
```

关键点只有两个：

- 每个字段不只是值，还带有 `type`、`label` 等元信息
- 同一类记录通过 `class` 字段聚合到一起

## 电影类示例里有哪些字段

可以直接参考 [中文/电影/教父.md](./电影/教父.md)。

这个类已经覆盖了比较完整的结构化信息：

- 基本信息：`title`、`original_title`、`director`、`cast`
- 分类信息：`year`、`country`、`genre`
- 评分与状态：`douban_score`、`afi_rank`、`my_score`、`watched`
- 个人记录：`watch_date`、`notes`
- 展示相关：`cover`、`warm`、`col`、`row`
- 归类字段：`class`

这也是 SuperTag 的一个实际优势: 字段既能服务“数据视图”，也能服务“文档展示”。

## 常见字段类型

电影类里已经用到了多种常见类型：

- `text`: 文本，例如片名、导演、国家
- `number`: 数字，例如年份、评分、排名
- `date`: 日期，例如观看日期
- `checkbox`: 布尔值，例如是否已看、是否暖色调
- `multiselect`: 多选枚举，例如电影类型
- `array`: 数组，例如主演列表、布局字段列表
- `progress`: 进度型数值，例如“我的评分”
- `asset`: 资源路径，例如封面图

如果你要新建自己的类，优先从这几个类型开始，已经足够覆盖大多数知识库和资料库场景。

## `class` 是怎么起作用的

`class` 决定一篇文档属于哪一个 SuperTag 类。

例如电影文档统一写成：

```yaml
class:
  type: text
  label: class
  value: "ClassicMovie"
```

这样，Zditor 就可以把所有 `ClassicMovie` 记录当成同一张“表”来理解。你以后新增一篇 [中文/电影/唐人街.md](./电影/唐人街.md) 这样的文档，只要沿用同样的 `class`，它就会自动进入这个类。

## `col` 和 `row` 决定封面信息布局

SuperTag 不只是存字段，也可以直接参与文档封面卡片的展示。

电影类里的这两个字段很关键：

```yaml
col:
  type: array
  label: Col
  value: [year, title, director]
row:
  type: array
  label: Row
  value: [genre, afi_rank, douban_score, watched]
```

它们表达的是：

- `col`: 适合纵向主信息区展示的字段
- `row`: 适合底部或辅助信息区展示的字段

再配合 `cover`、`warm` 等字段，就能把一篇记录渲染成既有数据库感、又有卡片感的文档入口。

## 正文部分仍然是自由的 Markdown

SuperTag 不会限制正文写法。电影类最好的地方就在这里：frontmatter 负责结构化信息，正文负责长文评论、关联跳转和主题分析。

例如 [中文/电影/教父.md](./电影/教父.md) 的正文里同时包含：

- 长段落影评
- 指向其他电影文档的链接
- 类型比较和主题分析

这意味着 SuperTag 不是把 Markdown 变成僵硬表格，而是把“数据库字段”和“自由写作”放在同一篇文档里。

## 如何在文档里引用一个 SuperTag 记录

README 里已经有一个例子：

```md
[ClassicMovie](/中文/电影/教父.md|mode=supertag)
```

直接效果示例：[ClassicMovie](/中文/电影/教父.md|mode=supertag)

这种写法的重点不是链接文字本身，而是 `mode=supertag`。它表示这个链接按 SuperTag 方式展示，而不是普通文本链接。

如果你在自己的文档中整理书单、片单、论文列表，这种引用方式很适合做卡片化跳转入口。

## 如何新增一条同类记录

最稳妥的做法是直接复制一篇现有电影文档，再改值，不要从零手写全部字段。

建议步骤：

1. 复制一个同类文档，例如 [中文/电影/教父.md](./电影/教父.md)
2. 保留字段结构和 `class`
3. 替换具体值，例如片名、导演、年份、封面、正文
4. 如果新增了全类都需要的字段，再回头统一补齐这个类

这样做的好处是类结构会比较稳定，不容易出现字段名漂移、类型不一致、选项集分叉这些问题。

## 设计一个 SuperTag 类时的建议

- 先想清楚“这类对象最稳定的字段”是什么，再开字段
- 字段名尽量稳定，不要今天 `score` 明天 `rating`
- 多选字段尽量维护统一 `options`
- 同一类文档优先复用已有模板
- `class` 名称一旦开始使用，就不要频繁改

电影类之所以已经很好用，就是因为它既有通用字段，又有足够明确的展示约定。

## 推荐阅读

- [中文/电影/](./电影/)
- [中文/电影/教父.md](./电影/教父.md)
- [中文/README.md](./README.md)

如果你想给自己的资料库做一个 SuperTag 类，最直接的起点就是照着电影类复制一套，再把字段换成你的业务对象。
