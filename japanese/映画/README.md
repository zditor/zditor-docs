---
display:
  type: checkbox
  description: display
  label: プロパティを表示
  value: false
description:
  type: text
  description: 
  label: Description
  value: "日本語映画ディレクトリ · SuperTag映画クラス · 構造化映画データ"
row:
  type: array
  description: 
  label: Row
  value: ["author","tags"]
cover:
  type: asset
  description: 
  label: Cover Image
  value: "../../assets/movies/covers/教父.jpg"
tags:
  type: text
  description: 
  label: Tags
  value: "映画 · SuperTag · 日本語"
author:
  type: text
  description: 
  label: Author
  value: "SeeLey & Codex"
updated:
  type: date
  description: 
  label: Updated
  value: "2026-04-11"
col:
  type: array
  description: 
  label: Col
  value: ["title","description","updated"]
title:
  type: text
  description: 
  label: Title
  value: "映画ディレクトリ"
warm:
  type: checkbox
  description: warm
  label: 暖色调
  value: false
---
# 映画ディレクトリ

このディレクトリには、日本語で読める映画の SuperTag サンプルをまとめています。各作品は独立した Markdown ファイルですが、共通の frontmatter によって同じ映画クラスとして扱えます。

現在は英語映画ディレクトリと同じ 100 作品をそろえた完全版になっており、既存の日本語サンプルに加えて残りの作品も日本語向けの frontmatter と本文説明で参照できます。

## 代表的なサンプル作品

- [ゴッドファーザー](./ゴッドファーザー.md)
- [市民ケーン](./市民ケーン.md)
- [裏窓](./裏窓.md)
- [サイコ](./サイコ.md)
- [チャイナタウン](./チャイナタウン.md)
- [Casablanca](./Casablanca.md)
- [The Shawshank Redemption](./The%20Shawshank%20Redemption.md)
- [Star Wars](./Star%20Wars.md)

## このディレクトリで確認できること

- 映画向けの共通フィールド設計
- `class` によるグループ化
- `cover`, `col`, `row` を使ったカード表示
- 本文でのレビュー、比較、相互リンク
- 100 本規模の映画コレクションを多言語で運用する構成

`SuperTag利用ガイド` と合わせて読むと、構造化 Markdown の実例として使いやすくなります。
