---
title:
  type: text
  description: 
  label: Title
  value: "Attention Is All You Need 论文解读"
updated:
  type: date
  description: 
  label: Updated
  value: "2026-04-20"
warm:
  type: checkbox
  description: warm
  label: 暖色调
  value: true
display:
  type: checkbox
  description: display
  label: 显示属性
  value: false
subject:
  type: text
  description: 
  label: Subject
  value: "论文解读"
tags:
  type: text
  description: 
  label: Tags
  value: "Transformer · Attention · 论文 · NLP"
avatar:
  type: asset
  description: 
  label: Avatar
  value: "../assets/nanobanana-avatar.svg"
col:
  type: array
  description: 
  label: Col
  value: ["subject","title","description"]
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
description:
  type: text
  description: 
  label: Description
  value: "Transformer 论文解读 · 注意力机制 · 架构 · 代码示例"
row:
  type: array
  description: 
  label: Row
  value: ["avatar","author","updated","tags"]
---
# Attention Is All You Need 论文解读

这篇文档是对 2017 年 Transformer 论文的简明解读。它几乎定义了现代 NLP 和大语言模型时代的基础架构。

## 论文信息

- 标题：Attention Is All You Need
- 会议：NeurIPS 2017
- 作者：Ashish Vaswani、Noam Shazeer、Niki Parmar、Jakob Uszkoreit、Llion Jones、Aidan N. Gomez、Lukasz Kaiser、Illia Polosukhin
- arXiv：<https://arxiv.org/abs/1706.03762>
- 本地 PDF 资源：[attention.pdf](../assets/papers/attention.pdf)

## 核心思想

论文提出了 Transformer，一种完全建立在注意力机制上的序列建模架构。它承接了 seq2seq 与 attention 的工作脉络 [^2][^5][^24][^35]，但不再依赖 RNN 或 CNN，而是通过注意力直接建模序列中不同位置之间的关系 [^9][^13][^18]，因此训练更容易并行化，也更擅长处理长距离依赖。

!!! info 为什么它这么重要
    这篇论文直接影响了后来的 BERT、GPT、T5 等模型，也让“注意力”成为大模型时代的默认架构语言。

## 研究背景

在 Transformer 之前，序列建模的主流方案长期由 LSTM / GRU 等循环网络主导 [^7][^13]，机器翻译里则普遍采用 encoder-decoder 和 seq2seq 框架 [^5][^35]，再叠加 attention 机制提升对齐能力 [^2][^24]。另一条减少串行依赖的路线是卷积式序列模型，例如 ByteNet 和 ConvS2S [^9][^18]。Transformer 的关键突破，是把这些路线里“依赖建模”的核心工作统一交给 self-attention 来完成。

## 架构概览

|组件 |说明 |
|---|---|
|Encoder |6 层自注意力加前馈网络 |
|Decoder |6 层 masked self-attention、cross-attention 和前馈网络 |
|模型宽度 |dmodel=512 |
|注意力头数 |8 个 head |
|前馈层宽度 |dff=2048 |

编码器和解码器的每个子层都带有残差连接与 LayerNorm，这一点分别继承了 ResNet 与 Layer Normalization 的设计经验 [^1][^11]。论文还共享了输入嵌入、输出嵌入和 softmax 前线性层的权重矩阵，这与输出嵌入共享的做法一致 [^30]。

![Transformer 架构图](../assets/papers/transformer-paper-cover-nanobanana.jpg)

## 关键机制

### Scaled Dot-Product Attention

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

这里的缩放项用于避免点积数值过大，让 softmax 过早进入非常尖锐的区域。论文也把它与更早的 additive attention 工作做了对照说明 [^2]。

如果想直接对照原论文里的那张经典示意图，可以先看下面这张 PDF 批注卡。它圈出的正是论文中解释 scaled dot-product attention 的关键区域，适合和公式、示意图一起对照阅读。

[论文](/assets/papers/attention.pdf|mode=pdf_card|highlight=873c76c8-9921-4012-b91a-3bc6e5452330)

下面这张整理后的示意图则更适合快速看清这一机制的输入、打分、softmax 和加权求和过程。

![Scaled Dot-Product Attention](../assets/papers/scaled-dot-product-attention.jpg)

### Multi-Head Attention

模型不是只在一个表示空间里做一次注意力，而是把 Q、K、V 投影到多个子空间中并行计算，再把结果拼接起来。

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)W^O
$$

![Multi-Head Attention](../assets/papers/multi-head-attention.jpg)

### Positional Encoding

由于 Transformer 没有循环结构，所以需要显式加入位置信息。论文采用的是正弦和余弦形式的位置编码。

$$
PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

$$
PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

![Positional Encoding](../assets/papers/positional-encoding.jpg)

作者也实验了 learned positional embeddings，并指出结果与卷积式序列模型中使用的可学习位置表示相近，因此最终保留了更容易外推到长序列的正弦位置编码 [^9]。

### Position-wise Feed-Forward

每个位置都会独立经过同一个两层前馈网络，这让模型在注意力之后还能完成非线性变换。

![Encoder Layer 细节](../assets/papers/encoder-layer.jpg)

## 最小 PyTorch 示例

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

## 为什么 Transformer 胜出

|模型 |每层复杂度 |最大路径长度 |顺序操作 |
|---|---|---|---|
|Self-Attention |O(n2⋅d) |O(1) |O(1) |
|Recurrent |O(n⋅d2) |O(n) |O(n) |
|Convolutional |O(k⋅n⋅d2) |O(logk⁡(n)) |O(1) |

它最关键的优势是任意两个位置之间都能通过常数长度路径建立联系，这对长距离依赖和并行计算都非常有利。这也是它相对循环模型 [^7][^13] 和卷积式序列模型 [^9][^18] 的决定性优势之一。

## 实验结果

|任务 |模型 |BLEU |训练成本 |
|---|---|---|---|
|WMT 2014 英德翻译 |Transformer big |**28.4** |2.3e19 FLOPs |
|WMT 2014 英法翻译 |Transformer big |**41.8** |2.3e19 FLOPs |

论文在当时取得了最先进的机器翻译结果，同时训练成本也低于许多竞争方案。原文对比的代表性系统包括 ByteNet、ConvS2S、GNMT、Deep-Att 和 MoE 等路线 [^9][^18][^32][^38][^39]。训练细节上，它还结合了 Adam、dropout、label smoothing、BPE 子词切分与输出嵌入共享等做法 [^20][^30][^31][^33][^36]。

## 长期影响

Transformer 后来成为现代基础模型的核心架构。即使后续模型不断改变训练配方、缩放策略或分词方法，基于注意力的主体设计仍然被沿用到了今天。

## 参考文献

这篇解读直接用到的原论文相关文献主要覆盖四条线索：seq2seq 与 attention [^2][^5][^24][^35]、循环与卷积式替代路线 [^7][^9][^13][^18][^38][^39]、训练与结构细节 [^1][^11][^20][^30][^31][^33][^36]，以及当时的重要对比模型路线 [^32]。

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
