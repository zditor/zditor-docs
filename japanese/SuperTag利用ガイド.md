---
description:
  type: text
  description:
  label: Description
  value: "SuperTag · 構造化フィールド · データテーブル · 映画サンプル"
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
  value: "SuperTag · データテーブル · Frontmatter · 映画"
title:
  type: text
  description:
  label: Title
  value: "SuperTag利用ガイド"
display:
  type: checkbox
  description: display
  label: プロパティを表示
  value: false
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-11"
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
# SuperTag利用ガイド

SuperTag は、Zditor で Markdown 文書を構造化レコードとして扱うための仕組みです。通常の `.md` ファイルを書きながら、frontmatter に型、表示名、レイアウト、グループ化ルールを定義することで、同じ文書群を「読める記事」と「絞り込み可能なデータ表」の両方として使えます。

このガイドでは、実例として [映画/](./映画/) の日本語映画クラスを使います。

## SuperTag が向いている場面

- 映画、書籍、論文、顧客、案件、レシピのような同種オブジェクトを Markdown で管理したい
- 各レコードに安定したフィールドを持たせつつ、本文は自由に書きたい
- 同じ文書群を読み物としても、テーブルとしても使いたい

映画クラスは典型例です。各映画は独立した Markdown ファイルですが、タイトル、監督、年、ジャンル、評価、視聴状態、カバーといった共通構造を持っています。

## 最小の SuperTag レコード

```yaml
---
title:
  type: text
  label: タイトル
  value: "ゴッドファーザー"
director:
  type: text
  label: 監督
  value: "フランシス・フォード・コッポラ"
year:
  type: number
  label: 年
  value: 1972
genre:
  type: multiselect
  label: ジャンル
  value: ["犯罪", "ドラマ"]
  options: ["ドラマ", "ミステリー", "犯罪", "ロマンス", "コメディ"]
class:
  type: text
  label: class
  value: "ClassicMovieJapanese"
---
```

重要なのは次の 2 点です。

- 1 つのフィールドは値だけでなく、`type` や `label` などのメタ情報も持つ
- 同じ `class` を持つ文書が 1 つのグループになる

## 映画クラスで使われているフィールド

[ゴッドファーザー](./映画/ゴッドファーザー.md) を参照してください。

このクラスには、かなり実用的な構造がそろっています。

- 基本情報: `title`, `original_title`, `director`, `cast`
- 分類情報: `year`, `country`, `genre`
- 評価と状態: `douban_score`, `afi_rank`, `my_score`, `watched`
- 個人メモ: `watch_date`, `notes`
- 表示関連: `cover`, `warm`, `col`, `row`
- グループ化フィールド: `class`

これが SuperTag の実用上の強みです。1 つのフィールド定義が、データ表示にもドキュメント表示にも使えます。

## よく使うフィールド型

映画クラスでは、次のような型がすでに使われています。

- `text`: タイトル、監督、国名などの文字列
- `number`: 年、スコア、順位などの数値
- `date`: 視聴日などの日付
- `checkbox`: 視聴済みや暖色設定のような真偽値
- `multiselect`: ジャンルのような複数選択
- `array`: キャストやレイアウト指定のような配列
- `progress`: 個人スコアのような進捗型数値
- `asset`: カバー画像などのリソースパス

独自のクラスを作る場合でも、まずはこの範囲で大半の用途をカバーできます。

## `class` の役割

`class` は、その文書がどの SuperTag グループに属するかを決めます。

日本語映画文書では次のように書かれています。

```yaml
class:
  type: text
  label: class
  value: "ClassicMovieJapanese"
```

この共通値があることで、Zditor は `ClassicMovieJapanese` の文書を 1 つのテーブルとして扱えます。たとえば [チャイナタウン](./映画/チャイナタウン.md) のような新規文書も、同じ `class` を使えば自動的に同じグループに入ります。

## `col` と `row` がカバー表示を決める

SuperTag はフィールドを保存するだけでなく、カバーカードの見た目にも直接使えます。

特に重要なのが次の 2 つです。

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

意味は次の通りです。

- `col`: メインの縦方向情報エリアに表示するフィールド
- `row`: 下部や補助情報エリアに表示するフィールド

`cover` や `warm` と組み合わせることで、1 件のレコードをデータカードでもあり文書カードでもある形で表示できます。

## 本文は自由な Markdown のまま

SuperTag は本文の書き方を縛りません。frontmatter が構造を担当し、本文がレビュー、相互リンク、テーマ分析を担当します。

たとえば [ゴッドファーザー](./映画/ゴッドファーザー.md) には次のような内容があります。

- 長めの映画コメント
- 他の映画文書へのリンク
- ジャンルや主題の比較

つまり SuperTag は Markdown を硬い表に変えるのではなく、構造化データと自由記述を 1 つのファイルに共存させます。

## SuperTag レコードを参照する方法

通常のリンクに `mode=supertag` を付けます。

```md
[ClassicMovieJapanese](/japanese/%E6%98%A0%E7%94%BB/%E3%82%B4%E3%83%83%E3%83%89%E3%83%95%E3%82%A1%E3%83%BC%E3%82%B6%E3%83%BC.md|mode=supertag)
```

表示例: [ClassicMovieJapanese](/japanese/%E6%98%A0%E7%94%BB/%E3%82%B4%E3%83%83%E3%83%89%E3%83%95%E3%82%A1%E3%83%BC%E3%82%B6%E3%83%BC.md|mode=supertag)

重要なのはリンク文字列ではなく `mode=supertag` です。これにより、Zditor は通常リンクではなく SuperTag ノードとして描画します。

## 新しいレコードを追加する方法

最も安全なのは、既存ファイルを複製して値だけ差し替える方法です。

おすすめの手順:

1. [ゴッドファーザー](./映画/ゴッドファーザー.md) のような既存ファイルをコピーする
2. フィールド構造と `class` はそのまま残す
3. タイトル、監督、年、カバー、本文を差し替える
4. クラス全体で必要な新規フィールドがあれば、後でまとめて補完する

この方法なら、フィールド名や型、`options` のずれを防ぎやすくなります。

## SuperTag クラス設計のコツ

- まず安定したフィールドを決める
- フィールド名は途中で揺らさない
- 複数選択フィールドは共有の `options` を保つ
- 既存テンプレートを優先して使う
- 一度使い始めた `class` 名は安易に変えない

映画クラスが扱いやすいのは、共有スキーマと表示ルールの両方がはっきりしているからです。

## 関連ドキュメント

- [映画/](./映画/)
- [ゴッドファーザー](./映画/ゴッドファーザー.md)
- [日本語ドキュメント入口](./README.md)

自分用の構造化ドキュメント群を作るなら、この映画クラスを出発点として流用するのが最短です。
