---
description:
  type: text
  description:
  label: Description
  value: "Transformer 論文解説 · Attention · アーキテクチャ · コード例"
author:
  type: text
  description:
  label: Author
  value: "SeeLey & Codex"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../assets/papers/transformer-paper-cover-nanobanana.jpg"
col:
  type: array
  description:
  label: Col
  value: ["subject","title","description"]
subject:
  type: text
  description:
  label: Subject
  value: "論文解説"
avatar:
  type: asset
  description:
  label: Avatar
  value: "../assets/nanobanana-avatar.svg"
tags:
  type: text
  description:
  label: Tags
  value: "Transformer · Attention · 論文 · NLP"
title:
  type: text
  description:
  label: Title
  value: "Attention Is All You Need 論文解説"
display:
  type: checkbox
  description: display
  label: Display Properties
  value: false
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-11"
warm:
  type: checkbox
  description: warm
  label: Warm Tone
  value: true
row:
  type: array
  description:
  label: Row
  value: ["avatar","author","updated","tags"]
---
# Attention Is All You Need 論文解説

このページは、2017 年の Transformer 論文をコンパクトに整理した読書ノートです。現代の NLP と大規模言語モデルの基盤を形づくった重要な論文です。

## 論文情報

- タイトル: Attention Is All You Need
- 掲載: NeurIPS 2017
- 著者: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin
- arXiv: <https://arxiv.org/abs/1706.03762>
- ローカル PDF アセット: [1706.03762v7.pdf](../assets/papers/1706.03762v7.pdf)

## 中核アイデア

この論文は Transformer を提案しました。これは注意機構だけで構成された系列モデルで、RNN や CNN を使わずに長距離依存を扱いながら、高い並列性を実現します。

!!! info なぜ重要なのか
    この論文は BERT、GPT、T5 などに直接つながり、その後の大規模モデル設計の標準を作りました。

## アーキテクチャ概要

|要素 |概要 |
|---|---|
|Encoder |自己注意と Feed-Forward を持つ 6 層 |
|Decoder |Masked Self-Attention、Cross-Attention、Feed-Forward を持つ 6 層 |
|モデル幅 |$d_{model} = 512$ |
|ヘッド数 |8 |
|FFN 幅 |$d_{ff} = 2048$ |

![Transformer architecture](../assets/papers/transformer-paper-cover-nanobanana.jpg)

## 主要メカニズム

### Scaled Dot-Product Attention

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

このスケーリングは、内積が大きくなりすぎて softmax が極端に鋭くなるのを防ぐためのものです。

![Scaled Dot-Product Attention](../assets/papers/scaled-dot-product-attention.jpg)

### Multi-Head Attention

単一の表現空間で 1 回だけ注意を計算するのではなく、複数の部分空間に射影して並列に注意を計算します。

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)W^O
$$

![Multi-Head Attention](../assets/papers/multi-head-attention.jpg)

### Positional Encoding

Transformer には再帰構造がないため、位置情報を明示的に加える必要があります。論文では正弦波と余弦波を用いた位置埋め込みを使います。

$$
PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

$$
PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

![Positional Encoding](../assets/papers/positional-encoding.jpg)

### Position-wise Feed-Forward

各トークン位置は同じ 2 層の Feed-Forward Network を独立に通過します。

![Encoder layer detail](../assets/papers/encoder-layer.jpg)

## 最小 PyTorch 例

```py
import math
import torch
import torch.nn.functional as F

def scaled_dot_product_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(d_k)

    if mask is not None:
        scores = scores.masked_fill(mask == 0, float("-inf"))

    weights = F.softmax(scores, dim=-1)
    output = torch.matmul(weights, V)
    return output, weights
```

## Transformer が勝った理由

|モデル |層ごとの計算量 |最大経路長 |逐次操作 |
|---|---|---|---|
|Self-Attention |$O(n^2 \cdot d)$ |$O(1)$ |$O(1)$ |
|Recurrent |$O(n \cdot d^2)$ |$O(n)$ |$O(n)$ |
|Convolutional |$O(k \cdot n \cdot d^2)$ |$O(\log_k(n))$ |$O(1)$ |

任意の 2 位置が定数長の経路でつながる点が大きな強みで、長距離依存の学習と並列計算に有利でした。

## 実験結果

|タスク |モデル |BLEU |学習コスト |
|---|---|---|---|
|WMT 2014 En-De |Transformer big |**28.4** |2.3e19 FLOPs |
|WMT 2014 En-Fr |Transformer big |**41.8** |2.3e19 FLOPs |

当時の機械翻訳で最高水準の性能を示しつつ、多くの競合手法よりも学習コストを抑えました。

## 長期的な影響

Transformer は現代の基盤モデルにおける中心的アーキテクチャになりました。学習手法やスケーリングの流儀が変わっても、注意ベースの設計そのものは今も主流です。

[^1]: Vaswani, A., Shazeer, N., Parmar, N., et al. *Attention Is All You Need*. NeurIPS 2017. <https://arxiv.org/abs/1706.03762>
