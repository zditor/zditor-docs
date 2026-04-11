---
title:
  type: text
  description:
  label: タイトル
  value: "Sunset Blvd."
original_title:
  type: text
  description:
  label: 原題
  value: "Sunset Blvd."
year:
  type: number
  description:
  label: 年
  value: 1950
director:
  type: text
  description:
  label: 監督
  value: "Billy Wilder"
cast:
  type: array
  description:
  label: 出演
  value: ["Gloria Swanson", "William Holden", "Erich von Stroheim"]
country:
  type: text
  description:
  label: 国
  value: "アメリカ"
genre:
  type: multiselect
  description:
  label: ジャンル
  value: ["ドラマ", "ミステリー"]
  options: ["ドラマ", "ミステリー", "犯罪", "ロマンス", "コメディ", "アクション", "戦争", "SF", "ホラー", "スリラー", "西部劇", "ミュージカル", "アニメーション", "歴史", "伝記", "冒険", "ファンタジー"]
afi_rank:
  type: number
  description:
  label: AFI順位
  value: 16
douban_score:
  type: number
  description:
  label: Doubanスコア
  value: 8.7
watched:
  type: checkbox
  description:
  label: 視聴済み
  value: false
watch_date:
  type: date
  description:
  label: 視聴日
  value: ""
my_score:
  type: progress
  description: 100点満点
  label: 自分の評価
  value: 0
notes:
  type: text
  description:
  label: メモ
  value: ""
class:
  type: text
  description:
  label: class
  value: "ClassicMovieJapanese"
field:
  type: array
  description:
  label: field
  value: ["title", "original_title", "year", "director", "cast", "country", "genre", "afi_rank", "douban_score", "watched", "watch_date", "my_score", "notes"]
cover:
  type: asset
  description:
  label: Cover Image
  value: "../../assets/movies/covers/日落大道.jpg"
col:
  type: array
  description:
  label: Col
  value: ["year", "title", "director"]
row:
  type: array
  description:
  label: Row
  value: ["genre", "afi_rank", "douban_score", "watched"]
display:
  type: checkbox
  description: display
  label: プロパティを表示
  value: false
warm:
  type: checkbox
  description: warm
  label: 暖色
  value: false
---

## Sunset Blvd. を読むための入口

『Sunset Blvd.』は 1950 年の作品で、Billy Wilder による ドラマ・ミステリー の代表例として整理しやすい一本です。物語の強さだけでなく、画面構成、テンポ、人物配置を通して、古典映画がどのように主題と娯楽性を両立していたかを確かめやすい作品でもあります。

アメリカ 映画としての完成度を保ちながら、中心にあるのはつねに人物の感情と関係性です。Gloria Swanson、William Holden、Erich von Stroheim といった出演陣が作品のトーンを支え、一本の印象をはっきりと残します。AFI ランキングでは 16 位、Douban スコアは 8.7 で、映画史の定番をたどる際の基準点として置きやすいタイトルです。

## Zditor のサンプルとして見たときの使いやすさ

このページは映画レビュー本文と構造化 frontmatter を同時に持つため、作品メモ、鑑賞日、個人スコアを後から追加していく土台としても使えます。まずは作品情報を確認し、その後に本文で自分なりの見方を書き足していく運用がしやすく、映画データベースのサンプルとしても扱いやすい構成です。
