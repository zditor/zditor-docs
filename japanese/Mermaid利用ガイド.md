---
description:
  type: text
  description:
  label: Description
  value: "フローチャート · シーケンス図 · ガントチャート · ER図 · Mindmap"
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
  value: "Mermaid"
avatar:
  type: asset
  description:
  label: Avatar
  value: "../assets/nanobanana-avatar.svg"
tags:
  type: text
  description:
  label: Tags
  value: "Mermaid · 図表 · ガイド"
title:
  type: text
  description:
  label: Title
  value: "Mermaid利用ガイド"
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
# Mermaid利用ガイド

Mermaid は、テキストで図を記述するための記法です。Markdown 内で `mermaid` コードブロックを書くだけで、フローチャート、シーケンス図、ガントチャート、ER 図、Git Graph などを描画できます。

このガイドは、全ての構文を網羅することが目的ではありません。Zditor で実用的で読みやすい Mermaid 図を書くための最短ルートをまとめています。

## クイックスタート

最小例：

```mermaid
flowchart TD
    A[開始] --> B[フォーム入力]
    B --> C{検証成功?}
    C -->|はい| D[送信成功]
    C -->|いいえ| E[エラー表示]
```

最初に意識すべき点は 2 つです。

- コードブロックの言語指定を必ず `mermaid` にする
- 先に図の種類を決め、その後で内容を足す

## どの図を使うべきか

|場面 |おすすめの図 |
|---|---|
|業務フロー、承認フロー、分岐 |Flowchart |
|フロントエンド、バックエンド、サービス、DB の呼び出し順 |Sequence Diagram |
|日程、マイルストーン、依存関係 |Gantt Chart |
|クラス、インターフェース、モジュール構造 |Class Diagram |
|状態遷移、ライフサイクル、状態機械 |State Diagram |
|テーブル構造、エンティティ関係 |ER Diagram |
|ユーザー体験と接点整理 |User Journey |
|割合の可視化 |Pie Chart |
|ブランチとマージの履歴 |Git Graph |
|発想整理、知識構造 |Mindmap |

## 共通の書き方

- ノードの文言は短くし、長い説明は本文に出す
- 1 枚の図では 1 つのテーマに絞る
- 内部略語よりも業務用語を優先する
- 図が混み合ってきたら分割する
- `TD` と `LR` は最も安定した向き

## フローチャート

フローチャートは手順、分岐、遷移、モジュール関係の表現に向いています。

```mermaid
flowchart TD
    A[ユーザーがページを開く] --> B[アカウントとパスワードを入力]
    B --> C{検証成功?}
    C -->|はい| D[ホームへ移動]
    C -->|いいえ| E[エラー表示]
```

### 実践例：注文送信フロー

```mermaid
flowchart TD
    A[ユーザーが注文を送信] --> B[未払い注文を作成]
    B --> C{在庫は十分か?}
    C -->|いいえ| D[在庫不足を表示]
    C -->|はい| E[在庫を確保]
    E --> F[支払い開始]
    F --> G{支払い結果}
    G -->|成功| H[出荷タスク作成]
    G -->|失敗| I[在庫解放]
    H --> J[倉庫へ通知]
    I --> K[注文クローズ]
```

### 実践例：スイムレーン付き協調フロー

```mermaid
flowchart LR
    subgraph ユーザー側
        A[公開をクリック]
        B[公開結果を確認]
    end

    subgraph Webアプリ
        C[内容送信]
        D[パラメータ検証]
        E[タスク記録作成]
    end

    subgraph 公開サービス
        F[公開タスクを処理]
        G[ページをレンダリング]
        H[静的アセットをアップロード]
    end

    A --> C
    C --> D
    D -->|成功| E
    D -->|失敗| B
    E --> F
    F --> G
    G --> H
    H --> B
```

## シーケンス図

シーケンス図は、誰が誰をどの順番で呼び出し、何を返すかを表すのに向いています。

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant FE as フロントエンド
    participant BE as バックエンド
    participant DB as データベース

    U->>FE: ログインフォーム送信
    FE->>BE: 認証情報送信
    BE->>DB: ユーザー照会
    DB-->>BE: ユーザー情報返却
    BE-->>FE: ログイン結果返却
    FE-->>U: 結果表示
```

### 実践例：ファイル保存の流れ

```mermaid
sequenceDiagram
    participant U as ユーザー
    participant E as エディタ
    participant S as 同期サービス
    participant G as Gitサービス

    U->>E: 保存をクリック
    E->>E: ローカルに書き込み
    E->>S: 変更サマリ送信
    alt 自動同期オン
        S->>G: コミット作成
        G-->>S: 結果返却
        S-->>E: 同期成功
    else ローカル保存のみ
        S-->>E: リモート同期をスキップ
    end
    E-->>U: 保存状態を表示
```

## ガントチャート

ガントチャートは、日程、段階、マイルストーンの表現に向いています。

```mermaid
gantt
    title リリース計画
    dateFormat YYYY-MM-DD

    section 要件
    要件収集      :done, r1, 2026-04-01, 3d
    方式レビュー  :done, r2, after r1, 2d

    section 開発
    主要機能開発  :active, d1, 2026-04-06, 6d
    回帰修正      :crit, d2, after d1, 3d

    section 公開
    カナリア公開  :g1, 2026-04-16, 2d
    本番公開      :milestone, g2, 2026-04-18, 0d
```

## クラス図

```mermaid
classDiagram
    class Editor {
        +String filePath
        +open()
        +save()
        +render()
    }

    class Document {
        +String title
        +String body
        +parse()
    }

    class Renderer {
        +renderMarkdown()
        +renderMermaid()
    }

    Editor --> Document : edits
    Editor --> Renderer : uses
```

## 状態図

```mermaid
stateDiagram-v2
    [*] --> 下書き
    下書き --> 審査中: 審査申請
    審査中 --> 公開済み: 承認
    審査中 --> 下書き: 差し戻し
    公開済み --> 非公開: 手動停止
    非公開 --> [*]
```

## ER 図

```mermaid
erDiagram
    USER ||--o{ DOCUMENT : creates
    DOCUMENT ||--o{ DOCUMENT_TAG : tagged_with
    TAG ||--o{ DOCUMENT_TAG : maps

    USER {
        string id
        string name
        string email
    }

    DOCUMENT {
        string id
        string title
        string status
    }
```

## その他の便利な図

### 円グラフ

```mermaid
pie title ドキュメントの出所
    "製品ドキュメント" : 35
    "技術設計" : 25
    "チュートリアル" : 20
    "運用コンテンツ" : 12
    "その他" : 8
```

### Git Graph

```mermaid
gitGraph
    commit id: "init"
    branch feature/editor
    checkout feature/editor
    commit id: "editor-ui"
    commit id: "autosave"
    checkout main
    merge feature/editor
    commit id: "release"
```

### Mindmap

```mermaid
mindmap
  root((エディタ計画))
    執筆体験
      自動保存
      分割プレビュー
      ショートカット
    図表
      Mermaid
      Excalidraw
      表
    AI
      要約
      書き換え
      Q&A
```

## よくある問題

### 図が表示されない

- コードブロックの言語指定が `mermaid` か確認する
- `flowchart` や `sequenceDiagram` などのキーワードを確認する
- まず最小例で動作確認し、その後で内容を増やす

### 図が大きすぎる、読みにくい

- ノード数を減らす
- ノード文言を短くする
- `LR` または `TD` を試す
- 複数の図に分割する

## 参考資料

- [examples/mermaid-examples/mermaid-examples.md](../examples/mermaid-examples/mermaid-examples.md)
- [guides/mermaid-guide.md](../guides/mermaid-guide.md)
