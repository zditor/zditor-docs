---
description:
  type: text
  description:
  label: Description
  value: "Zditor 構文 · 注釈 · 修正 · Tip · Revision"
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
  value: "Zditor · 注釈 · 修正 · Tip"
title:
  type: text
  description:
  label: Title
  value: "Zditor注釈と修正ガイド"
display:
  type: checkbox
  description: display
  label: プロパティを表示
  value: false
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-21"
warm:
  type: checkbox
  description: warm
  label: 暖色
  value: true
row:
  type: array
  description:
  label: Row
  value: ["avatar","author","updated","tags"]
---
# Zditor注釈と修正ガイド

このガイドでは、Zditor の 2 つのインライン校正機能を扱います。

- `注釈`: 元の文を変えずに説明を付ける
- `修正`: 置き換え候補を提示し、受け入れ可能にする

校正、共同編集、用語解説、文体調整のような場面で便利です。

## 何が違うのか

|機能 |用途 |変更の受け入れ |向いている場面 |
|---|---|---|---|
|`mode=tip` |説明や補足を付ける |不可 |用語注釈、読解補助、背景説明 |
|`mode=revision` |置き換え候補を出す |可 |誤字修正、言い換え、曖昧な日付の具体化 |

!!! info 使い分け
    説明を足したいなら注釈を使います。
    文面を差し替えたいなら修正を使います。

## 最小例

```md
[用語](ここに説明を書く|mode=tip|style=teal)

[元の文](なぜ直すかを書く|mode=revision|style=indigo|advice=修正後の文)
```

表示例:

- [Zditor](Markdown を拡張して構造化機能も扱えるエディタ|mode=tip|style=teal) では語句に直接説明を付けられます。
- [近日中](計画文書としては曖昧すぎる|mode=revision|style=red|advice=2026年4月30日までに) は具体的な日付に直すと明確です。

## 注釈として使う Tip

`Tip` は説明用のマークです。本文はそのまま残し、補足だけを追加します。

### 構文

```md
[テキスト](注釈文|mode=tip|style=色)
```

### 表示例

[ベクトルデータベース](意味検索に向いているが、通常のリレーショナルDBとは別物|mode=tip|style=teal) は知識検索でよく使われます。

チーム共有を始める前に [権限モデル](ロール、リソース、操作の対応関係を指す|mode=tip|style=yellow) を固めておくべきです。

API 用語を英語のまま残すなら、最初の出現で [DTO](Data Transfer Object|mode=tip|style=indigo) を説明すると親切です。

### 元の記述

```md
[ベクトルデータベース](意味検索に向いているが、通常のリレーショナルDBとは別物|mode=tip|style=teal) は知識検索でよく使われます。

チーム共有を始める前に [権限モデル](ロール、リソース、操作の対応関係を指す|mode=tip|style=yellow) を固めておくべきです。

API 用語を英語のまま残すなら、最初の出現で [DTO](Data Transfer Object|mode=tip|style=indigo) を説明すると親切です。
```

## 修正として使う Revision

`Revision` は実際に置き換えられる修正提案のための記法です。元の文を残しつつ、`advice` に修正版を書きます。

### 構文

```md
[元の文](なぜ直すかを書く|mode=revision|style=色|advice=修正後の文)
```

### 表示例

このリリースは [近日中](計画として曖昧|mode=revision|style=red|advice=2026年4月30日までに) 完了予定です。

[使った](この文脈では少し口語的|mode=revision|style=indigo|advice=採用した) をより書き言葉に寄せると統一感が出ます。

文書中の [teh](スペルミス|mode=revision|style=red|advice=the) は修正が必要です。

### 元の記述

```md
このリリースは [近日中](計画として曖昧|mode=revision|style=red|advice=2026年4月30日までに) 完了予定です。

[使った](この文脈では少し口語的|mode=revision|style=indigo|advice=採用した) をより書き言葉に寄せると統一感が出ます。

文書中の [teh](スペルミス|mode=revision|style=red|advice=the) は修正が必要です。
```

## 1 つの段落で注釈と修正を併用する

実際の文書では、説明だけが必要な語と、差し替えたい語が同時に出てきます。

### 表示例

この版は [MVP](Minimum Viable Product|mode=tip|style=teal) を基点にコア導線を検証し、最初の試験ユーザー招待は [来月ごろ](時期が広すぎる|mode=revision|style=red|advice=2026年5月) を予定しています。現在の文言では [クリック](デスクトップ文脈では「選択」の方が自然|mode=revision|style=indigo|advice=選択) に統一すると表現が揃います。

### 元の記述

```md
この版は [MVP](Minimum Viable Product|mode=tip|style=teal) を基点にコア導線を検証し、最初の試験ユーザー招待は [来月ごろ](時期が広すぎる|mode=revision|style=red|advice=2026年5月) を予定しています。現在の文言では [クリック](デスクトップ文脈では「選択」の方が自然|mode=revision|style=indigo|advice=選択) に統一すると表現が揃います。
```

## 色の選び方

`zditor-syntax` の指針に沿うと、次の対応が使いやすいです。

|色 |向いている用途 |
|---|---|
|`red` |誤り、削除、曖昧な日付、スペルミス |
|`indigo` |言い換え、文体調整、表現の統一 |
|`teal` |中立的な説明や一般的な補足 |
|`yellow` |注意喚起、追加で見てほしい点 |
|`green` |肯定的な確認、残してよい修正 |

表示例:

- [キャッシュウォームアップ](本番前に 1 回走らせると初回遅延を抑えやすい|mode=tip|style=yellow) は先に済ませると安定します。
- ここは [完了した](もう少し具体的に書ける|mode=revision|style=green|advice=結合テストまで完了した) のように `green` を使うこともできます。

## どこで使うと有効か

- PR レビュー文書
- 仕様書
- 技術メモや論文読解ノート
- 原文を残したままコメントを付けたい社内共同文書

## よくあるミス

!!! warning 注意点
    `revision` には必ず `advice` が必要です。
    `tip` に `advice` は不要です。
    迷ったら `teal`、`indigo`、`red`、`green`、`yellow` を使うのが安全です。
    どちらもインライン構文なので、長い段落全体ではなく短い語句を囲む方が扱いやすいです。

## そのまま使えるテンプレート

### 注釈テンプレート

```md
この文には [用語](ここで意味を説明する|mode=tip|style=teal) があります。
```

### 修正テンプレート

```md
[元の表現](なぜ直すかを書く|mode=revision|style=indigo|advice=修正後の表現) に置き換えてください。
```

### 校正段落テンプレート

```md
この版は [API Gateway](認証とルーティングの共通入口|mode=tip|style=teal) を使い、[近日中](曖昧すぎる|mode=revision|style=red|advice=2026年5月) にパートナー向け試験を始める予定です。
```

## あわせて読む

- [コード例](./コード例.md)
- [SuperTag利用ガイド](./SuperTag利用ガイド.md)
- [Mermaid利用ガイド](./Mermaid利用ガイド.md)
