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
  value: "2026-04-20"
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
- ローカル PDF アセット: [attention.pdf](../assets/papers/attention.pdf)

## 中核アイデア

この論文は Transformer を提案しました。これは注意機構だけで構成された系列モデルで、seq2seq と attention の系譜 [^2][^5][^24][^35] を受け継ぎつつ、RNN や CNN を使わずに注意だけで位置間の関係を直接モデリングします [^9][^13][^18]。その結果、長距離依存を扱いながら高い並列性を実現しました。

!!! info なぜ重要なのか
    この論文は BERT、GPT、T5 などに直接つながり、その後の大規模モデル設計の標準を作りました。

## 研究背景

Transformer 以前の系列モデリングは、LSTM や GRU などの再帰ネットワークが主流でした [^7][^13]。機械翻訳では encoder-decoder と seq2seq の枠組み [^5][^35] に、attention を重ねてアラインメントを改善する構成が広く使われていました [^2][^24]。逐次依存を減らす別系統として、ByteNet や ConvS2S のような畳み込み系列モデルもありました [^9][^18]。Transformer の決定的な突破口は、依存関係モデリングの中心を self-attention に一本化したことです。

## アーキテクチャ概要

|要素 |概要 |
|---|---|
|Encoder |自己注意と Feed-Forward を持つ 6 層 |
|Decoder |Masked Self-Attention、Cross-Attention、Feed-Forward を持つ 6 層 |
|モデル幅 |$d_{model} = 512$ |
|ヘッド数 |8 |
|FFN 幅 |$d_{ff} = 2048$ |

Encoder と Decoder の各サブレイヤーには residual connection と LayerNorm が入り、ResNet と Layer Normalization の設計知見を受け継いでいます [^1][^11]。さらに入力埋め込み、出力埋め込み、softmax 前の線形層で重みを共有しており、出力埋め込み共有の流れとも整合しています [^30]。

![Transformer architecture](../assets/papers/transformer-paper-cover-nanobanana.jpg)

## 主要メカニズム

### Scaled Dot-Product Attention

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

このスケーリングは、内積が大きくなりすぎて softmax が極端に鋭くなるのを防ぐためのものです。論文では、これを従来の additive attention とも比較しています [^2]。

原論文のあの定番の図と直接見比べたい場合は、まず次の PDF 注釈カードを見ると分かりやすいです。scaled dot-product attention を説明している原論文中の該当箇所をそのまま囲っているので、数式や図と並べて読むのに向いています。

[論文](/assets/papers/attention.pdf|mode=pdf_card|highlight=873c76c8-9921-4012-b91a-3bc6e5452330)

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

著者らは learned positional embeddings も試しており、畳み込み系列モデルで使われる学習可能な位置表現と近い結果を報告しています。そのうえで、より長い系列へ外挿しやすい sinusoidal encoding を採用しました [^9]。

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

任意の 2 位置が定数長の経路でつながる点が大きな強みで、長距離依存の学習と並列計算に有利でした。これは再帰モデル [^7][^13] や畳み込み系列モデル [^9][^18] に対する決定的な優位性の 1 つです。

## 実験結果

|タスク |モデル |BLEU |学習コスト |
|---|---|---|---|
|WMT 2014 En-De |Transformer big |**28.4** |2.3e19 FLOPs |
|WMT 2014 En-Fr |Transformer big |**41.8** |2.3e19 FLOPs |

当時の機械翻訳で最高水準の性能を示しつつ、多くの競合手法よりも学習コストを抑えました。原論文で比較対象になっている代表的な系統には ByteNet、ConvS2S、GNMT、Deep-Att、MoE などがあります [^9][^18][^32][^38][^39]。学習面では Adam、dropout、label smoothing、BPE によるサブワード分割、出力埋め込み共有も組み合わせています [^20][^30][^31][^33][^36]。

## 長期的な影響

Transformer は現代の基盤モデルにおける中心的アーキテクチャになりました。学習手法やスケーリングの流儀が変わっても、注意ベースの設計そのものは今も主流です。

## 参考文献

この解説で直接参照している文献は、主に 4 つの流れに分かれます。seq2seq と attention [^2][^5][^24][^35]、再帰系と畳み込み系の代替路線 [^7][^9][^13][^18][^38][^39]、学習と構造の細部 [^1][^11][^20][^30][^31][^33][^36]、そして当時の重要な比較モデル群 [^32] です。

[^2]: Dzmitry Bahdanau, Kyunghyun Cho, and Yoshua Bengio. *Neural Machine Translation by Jointly Learning to Align and Translate*. CoRR, abs/1409.0473, 2014.
[^5]: Kyunghyun Cho, Bart van Merrienboer, Caglar Gulcehre, Fethi Bougares, Holger Schwenk, and Yoshua Bengio. *Learning Phrase Representations Using RNN Encoder-Decoder for Statistical Machine Translation*. CoRR, abs/1406.1078, 2014.
[^24]: Minh-Thang Luong, Hieu Pham, and Christopher D. Manning. *Effective Approaches to Attention-based Neural Machine Translation*. arXiv preprint arXiv:1508.04025, 2015.
[^35]: Ilya Sutskever, Oriol Vinyals, and Quoc V. Le. *Sequence to Sequence Learning with Neural Networks*. In Advances in Neural Information Processing Systems, pages 3104-3112, 2014.
[^9]: Jonas Gehring, Michael Auli, David Grangier, Denis Yarats, and Yann N. Dauphin. *Convolutional Sequence to Sequence Learning*. arXiv preprint arXiv:1705.03122v2, 2017.
[^13]: Sepp Hochreiter and Jurgen Schmidhuber. *Long Short-Term Memory*. Neural Computation, 9(8):1735-1780, 1997.
[^18]: Nal Kalchbrenner, Lasse Espeholt, Karen Simonyan, Aaron van den Oord, Alex Graves, and Koray Kavukcuoglu. *Neural Machine Translation in Linear Time*. arXiv preprint arXiv:1610.10099v2, 2017.
[^7]: Junyoung Chung, Caglar Gulcehre, Kyunghyun Cho, and Yoshua Bengio. *Empirical Evaluation of Gated Recurrent Neural Networks on Sequence Modeling*. CoRR, abs/1412.3555, 2014.
[^1]: Jimmy Lei Ba, Jamie Ryan Kiros, and Geoffrey E. Hinton. *Layer Normalization*. arXiv preprint arXiv:1607.06450, 2016.
[^11]: Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun. *Deep Residual Learning for Image Recognition*. In Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition, pages 770-778, 2016.
[^30]: Ofir Press and Lior Wolf. *Using the Output Embedding to Improve Language Models*. arXiv preprint arXiv:1608.05859, 2016.
[^32]: Noam Shazeer, Azalia Mirhoseini, Krzysztof Maziarz, Andy Davis, Quoc Le, Geoffrey Hinton, and Jeff Dean. *Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer*. arXiv preprint arXiv:1701.06538, 2017.
[^38]: Yonghui Wu, Mike Schuster, Zhifeng Chen, Quoc V. Le, Mohammad Norouzi, Wolfgang Macherey, Maxim Krikun, Yuan Cao, Qin Gao, Klaus Macherey, et al. *Google's Neural Machine Translation System: Bridging the Gap between Human and Machine Translation*. arXiv preprint arXiv:1609.08144, 2016.
[^39]: Jie Zhou, Ying Cao, Xuguang Wang, Peng Li, and Wei Xu. *Deep Recurrent Models with Fast-Forward Connections for Neural Machine Translation*. CoRR, abs/1606.04199, 2016.
[^20]: Diederik Kingma and Jimmy Ba. *Adam: A Method for Stochastic Optimization*. In ICLR, 2015.
[^31]: Rico Sennrich, Barry Haddow, and Alexandra Birch. *Neural Machine Translation of Rare Words with Subword Units*. arXiv preprint arXiv:1508.07909, 2015.
[^33]: Nitish Srivastava, Geoffrey E. Hinton, Alex Krizhevsky, Ilya Sutskever, and Ruslan Salakhutdinov. *Dropout: A Simple Way to Prevent Neural Networks from Overfitting*. Journal of Machine Learning Research, 15(1):1929-1958, 2014.
[^36]: Christian Szegedy, Vincent Vanhoucke, Sergey Ioffe, Jonathon Shlens, and Zbigniew Wojna. *Rethinking the Inception Architecture for Computer Vision*. CoRR, abs/1512.00567, 2015.
