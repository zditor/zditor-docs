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
  value: "2026-04-11"
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
- 本地 PDF 资源：[1706.03762v7.pdf](../assets/papers/1706.03762v7.pdf)

## 核心思想

论文提出了 Transformer，一种完全建立在注意力机制上的序列建模架构。它不再依赖 RNN 或 CNN，而是通过注意力直接建模序列中不同位置之间的关系，因此训练更容易并行化，也更擅长处理长距离依赖。

!!! info 为什么它这么重要
    这篇论文直接影响了后来的 BERT、GPT、T5 等模型，也让“注意力”成为大模型时代的默认架构语言。

## 架构概览

|组件 |说明 |
|---|---|
|Encoder |6 层自注意力加前馈网络 |
|Decoder |6 层 masked self-attention、cross-attention 和前馈网络 |
|模型宽度 |dmodel=512 |
|注意力头数 |8 个 head |
|前馈层宽度 |dff=2048 |

![Transformer 架构图](../assets/papers/transformer-paper-cover-nanobanana.jpg)

## 关键机制

### Scaled Dot-Product Attention

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

这里的缩放项用于避免点积数值过大，让 softmax 过早进入非常尖锐的区域。

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

它最关键的优势是任意两个位置之间都能通过常数长度路径建立联系，这对长距离依赖和并行计算都非常有利。

## 实验结果

|任务 |模型 |BLEU |训练成本 |
|---|---|---|---|
|WMT 2014 英德翻译 |Transformer big |**28.4** |2.3e19 FLOPs |
|WMT 2014 英法翻译 |Transformer big |**41.8** |2.3e19 FLOPs |

论文在当时取得了最先进的机器翻译结果，同时训练成本也低于许多竞争方案。

## 长期影响

Transformer 后来成为现代基础模型的核心架构。即使后续模型不断改变训练配方、缩放策略或分词方法，基于注意力的主体设计仍然被沿用到了今天。
