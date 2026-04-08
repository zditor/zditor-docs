# Attention Is All You Need 论文解读

## 概述

这是 Google 在 2017 年发表的 Transformer 奠基性论文，是 NLP 领域最具影响力的工作之一，由 Ashish Vaswani、Noam Shazeer 等人提出[^1]。

**论文信息**

- 标题：Attention Is All You Need
- 发表：NIPS 2017 (Neural Information Processing Systems)
- 论文链接：<https://arxiv.org/abs/1706.03762>
- 本地 PDF：[1706.03762v7.pdf](./1706.03762v7.pdf)

## 核心贡献

**创新点**：提出完全基于注意力机制（Attention Mechanism）的网络架构——**Transformer**，彻底摒弃了传统的 RNN 和 CNN 结构。

!!! info "核心思想"
    Transformer 的核心思想是： ==仅使用注意力机制== 来处理序列建模任务，不再依赖循环或卷积结构，从而实现更好的并行化能力。

## 核心架构

|组件 |说明 |
|---|---|
|**Encoder** |6 层，每层包含 Multi-Head Self-Attention + Position-wise Feed-Forward |
|**Decoder** |6 层，每层包含 Masked Self-Attention + Encoder-Decoder Attention + Feed-Forward |
|**d_model** |512（embedding 维度） |
|**Multi-Head** |8 个并行的注意力头，每头 $d_k = d_v = 64$ |

![Transformer 架构图](./transformer-cartoon.jpg)

## 关键机制

### 1. Scaled Dot-Product Attention

输入包含维度为 $d_k$ 的查询（Query）和键（Key），以及维度为 $d_v$ 的值（Value），注意力函数定义为：

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

!!! tip "为什么要缩放？"
    当 $d_k$ 较大时，点积的值倾向于增长到很大，使 softmax 函数被推入梯度极小的区域。因此需要除以 $\sqrt{d_k}$ 进行缩放。

### 2. Multi-Head Attention

将 Q、K、V 分别投影到 $h$ 个子空间，允许模型同时关注不同位置的不同表示子空间：

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)W^O
$$

其中：

$$
\text{head}_i = \text{Attention}(QW_Q^i, KW_K^i, VW_V^i)
$$

投影矩阵维度：

- $W_Q^i \in \mathbb{R}^{d_{\text{model}} \times d_k}$
- $W_K^i \in \mathbb{R}^{d_{\text{model}} \times d_k}$
- $W_V^i \in \mathbb{R}^{d_{\text{model}} \times d_v}$
- $W_O \in \mathbb{R}^{hd_v \times d_{\text{model}}}$

### 3. 三种注意力使用方式

|类型 |来源 |作用 |
|---|---|---|
|**Encoder Self-Attention** |Encoder 内部 |每个位置 attend 到前一层所有位置 |
|**Decoder Self-Attention** |Decoder 内部 |带 mask，防止 attend 到未来位置 |
|**Cross Attention** |Encoder-Decoder |Decoder attend 到 Encoder 的输出 |

??? warning "Decoder 的 Mask"
    Decoder 中的 self-attention 需要 mask 掉未来位置，以保护自回归（auto-regressive）特性，确保预测只能依赖已生成的词。

### 4. Positional Encoding

由于模型不含循环和卷积，需要注入位置信息。使用正弦/余弦编码：

$$
PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)
$$

$$
PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{\text{model}}}}\right)
$$

!!! info "选择正弦版本的原因"
    对于任何固定偏移 $k$，$PE_{pos+k}$ 可以线性表示为 $PE_{pos}$ 的函数，这使得模型容易学习相对位置的依赖。此外，正弦版本可以外推到比训练序列更长的长度。

### 5. Position-wise Feed-Forward Network

每个位置独立应用两层线性变换，中间使用 ReLU 激活：

$$
\text{FFN}(x) = \max(0, xW_1 + b_1)W_2 + b_2
$$

其中 $d_{\text{model}} = 512$，$d_{ff} = 2048$。

## 与传统模型对比

|模型 |复杂度（每层） |最大路径长度 |顺序操作 |
|---|---|---|---|
|Self-Attention |$O(n^2 \cdot d)$ |$O(1)$ |$O(1)$ |
|Recurrent |$O(n \cdot d^2)$ |$O(n)$ |$O(n)$ |
|Convolutional |$O(k \cdot n \cdot d^2)$ |$O(\log_k(n))$ |$O(1)$ |

**核心优势**：Self-Attention 将任意位置间的路径长度缩短为常数 $O(1)$，大大缓解了长距离依赖问题[^2]。

## 实验结果

|任务 |模型 |BLEU |训练成本 |
|---|---|---|---|
|WMT EN-DE |Transformer big |**28.4** |2.3·10¹⁹ FLOPs |
|WMT EN-FR |Transformer big |**41.8** |2.3·10¹⁹ FLOPs |

比之前最好的模型（包含集成）高出 2+ BLEU，且训练成本大幅降低（8 P100 GPU 训练 3.5 天）。

!!! success "关键成就"
    - WMT 2014 英德翻译：首次超越 28 BLEU
    - WMT 2014 英法翻译：41.8 BLEU，创下单模型新高
    - 训练效率：远低于其他模型的训练成本

## 泛化能力

论文还展示了 Transformer 在**英语句法分析**任务上的优秀表现，仅用 WSJ 40K 句子训练就超越了 BerkeleyParser。

|设置 |F1 分数 |
|---|---|
|WSJ only (40K sentences) |91.3 |
|半监督设置 |92.7 |

## 影响力

这篇论文开创了 NLP 的 Transformer 时代，直接催生了 ==BERT==、==GPT==、==T5== 等一系列划时代模型，至今仍是大语言模型的核心架构。

??? quote "论文摘要原文"
    > The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.


---

*本文档使用 Zditor 扩展语法编写，包含 LaTeX 公式、脚注、Admonition 提示块等。*

[^1]: Vaswani, A., Shazeer, N., Parmar, N., et al. *Attention Is All You Need*. NeurIPS 2017. https://arxiv.org/abs/1706.03762
[^2]: Hochreiter, S., et al. 指出长短距离依赖是序列建模的主要挑战。Transformer 通过注意力机制实现了任意位置间的直接连接。
