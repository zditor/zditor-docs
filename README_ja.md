---
createdAt: 2025-11-02
---

<div align="center">

<h1 style="border-bottom: none">
<b><a href="https://zditor.com">
<img alt="zditor_logo" src="assets/logo.svg" style="width: 80%">
</a></b><br />
AI搭載、軽量、高性能、統合された執筆と描画
<br>
</h1>
<br/>
<p align="center">
軽量、高性能、AI搭載、統合された執筆と描画、WYSIWYG<br />
ローカライズ、ファイルベース、デュアルリンク
</p>

</div>

<div align="center">

[![BUILD](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml/badge.svg)](https://github.com/zditor/zditor-docs/actions/workflows/build_app.yml) [![VERSION](https://img.shields.io/github/v/release/zditor/zditor-docs)](https://img.shields.io/github/v/release/zditor/zditor-docs) [![ISSUE](https://img.shields.io/github/issues-closed/zditor/zditor-docs)](https://img.shields.io/github/issues-closed/zditor/zditor-docs)

</div>

[English Version](README.md)
[中文版本](README_zh.md)


---

<p align="center">AI搭載のマークダウンエディタ、Zditorへようこそ。</p>

<p align="center">このリポジトリはソースコードリポジトリではなく、Zditor関連のドキュメントのみを含んでいます。</p>

<p align="center">
<img alt="home" src="./assets/home.png">
</p>

## 目次

- [はじめに](#はじめに)
- [AI 機能](#AI機能)
- [Agent 智能体系统](#Agent智能体系统)
- [プラグインシステム](#プラグインシステム)

## フィードバック

💬 [WeChatグループ](https://github.com/zditor/zditor-docs/discussions/33)に参加する

## はじめに

Zditorは、基本的なマークダウン構文をサポートし、それを拡張したWYSIWYGマークダウンエディタです。現在、`Windows`、`Macos`、`Linux`プラットフォームをサポートしています。ダウンロードは[リリースダウンロードページ](https://github.com/zditor/zditor-docs/releases)をご覧ください。

### デモビデオ

[Zditorの簡単なデモ](https://www.bilibili.com/video/BV1sKZPYBEJA/?share_source=copy_web&vd_source=1974ff0cf0dde44aad6580cca6526a34)

### 署名に関する問題

- `Macos`は現在署名されていません。ダウンロード後、インストール時とアプリを初めて開くときに、`設定のプライバシーとセキュリティに移動し、「とにかく開く」を選択する`という2つの追加手順が必要です。

### LLMモデル設定

OpenAI SDKのストリーミング出力を利用し、APIとローカルモデルの両方をサポートしています。以下の画像に示すように、関連するパラメータを入力できます。モデルセクションでは、エントリをコンマ（英語のコンマ）で区切ります。`ollama` APIキーは空白のままで構いません。

### LLMの使用方法

テキスト選択と個別のチャットタブをサポートしています。テキスト選択は単一の会話用で、チャットタブは複数回の会話、ファイルのアップロード、ドキュメントをコンテキストとして選択、ドラッグアンドドロップアップロードなどをサポートしています。

### ライセンス

無料ライセンスが提供されます。メールアドレスを入力し、「送信」をクリックして、メールからライセンスを取得するだけです。

!!! warning ライセンスが届かない場合
    受信トレイを確認するよう促された後、メールが届くまで1〜2分かかる場合があります。まず、迷惑メール/ジャンクフォルダを確認してください。それでも届かない場合は、2分待ってから再送信してください。

## AI 機能

AI機能の使用方法については、[AI使用ガイド](./zh_cn/AI使用指南.md)を参照してください。Ollamaの設定については、[Ollama設定ガイド](https://www.bilibili.com/video/BV1Uz8xz2EEQ/)を参照してください。接続失敗のプロンプトが表示された場合は、まず以下を確認してください。


1. Ollamaはすでに実行されていますか？
2. VPNは有効になっていますか（無効にする必要がある場合があります）？
3. CORSは設定されていますか：https://objectgraph.com/blog/ollama-cors/

   ![クロスオリジン検出](./assets/跨域.png)

### Ollama CORS設定

ターミナルで`curl -X OPTIONS http://localhost:11434 -H "Origin: http://example.com" -H "Access-Control-Request-Method: GET" -I`をテストし、「Forbidden」と表示された場合、CORSが有効になっていません。Windowsシステムでは、システム環境変数`OLLAMA_ORIGINS`を設定する必要があります。具体的な手順は次のとおりです。


1. システム設定を開き、「システム変数」を検索します。
2. ポップアップダイアログをクリックし、「環境変数」を選択します。
3. 「新規」をクリックし、`OLLAMA_ORIGINS`と`*`を入力します。
4. 保存し、Ollamaを再起動します。
5. テスト：`curl -X OPTIONS http://localhost:11434 -H "Origin: http://example.com" -H "Access-Control-Request-Method: GET" -I`。さまざまなヘッダーが表示された場合、設定は成功しています。
6. Zditorを開いてテストします。


## Agent 智能体系统

zditorは強力なAgent智能体機能を統合し、Agent Client Protocol（ACP）とModel Context Protocol（MCP）をサポートして、よりインテリジェントな書き込みとタスク実行体験を提供します。

- **[Agent智能体使用ガイド](./zh_cn/Agent智能体使用指南.md)** - Agent智能体の設定と使用方法を学ぶ
- **[MCPサーバー設定ガイド](./zh_cn/MCP服务器配置指南.md)** - 様々なMCPサーバーを統合して機能を拡張する方法を学ぶ

## プラグインシステム

zditorは、テーブル、数式、[コードブロック](./zh_cn/插件系统/代码块.md)、[スマートテキスト](./zh_cn/插件系统/智能文本.md)など、多くの構文形式をサポートしています。