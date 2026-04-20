---
description:
  type: text
  description:
  label: Description
  value: "Transformer paper notes · attention · architecture · code examples"
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
  value: "Paper Notes"
avatar:
  type: asset
  description:
  label: Avatar
  value: "../assets/nanobanana-avatar.svg"
tags:
  type: text
  description:
  label: Tags
  value: "Transformer · Attention · Paper · NLP"
title:
  type: text
  description:
  label: Title
  value: "Attention Is All You Need Paper Notes"
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
# Attention Is All You Need Paper Notes

This page is a concise reading note for the 2017 Transformer paper, one of the most influential works in modern NLP.

## Paper Info

- Title: Attention Is All You Need
- Venue: NeurIPS 2017
- Authors: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin
- arXiv: <https://arxiv.org/abs/1706.03762>
- Local PDF asset: [attention.pdf](../assets/papers/attention.pdf)

## Core Idea

The paper proposes the Transformer, a sequence modeling architecture built entirely on attention mechanisms. It follows the seq2seq and attention line of work [^2][^5][^24][^35], but removes both RNNs and CNNs. Instead, it models relationships between token positions directly with attention [^9][^13][^18], which makes training more parallelizable and improves its ability to capture long-range dependencies.

!!! info Why it mattered
    This paper changed the default design of sequence models. It directly influenced BERT, GPT, T5, and most later large language models.

## Research Background

Before the Transformer, sequence modeling was dominated by recurrent networks such as LSTM and GRU [^7][^13]. Machine translation commonly used encoder-decoder and seq2seq setups [^5][^35], often combined with attention to improve alignment [^2][^24]. Another line of work reduced sequential dependence with convolutional sequence models such as ByteNet and ConvS2S [^9][^18]. The key breakthrough of the Transformer was to hand the core job of dependency modeling entirely to self-attention.

## Architecture Summary

|Component |Summary |
|---|---|
|Encoder |6 layers of self-attention and feed-forward blocks |
|Decoder |6 layers with masked self-attention, cross-attention, and feed-forward blocks |
|Model width |$d_{model} = 512$ |
|Heads |8 attention heads |
|Feed-forward width |$d_{ff} = 2048$ |

Each encoder and decoder sublayer uses residual connections and LayerNorm, inheriting ideas from ResNet and Layer Normalization [^1][^11]. The paper also shares the weight matrix across the input embedding, output embedding, and pre-softmax linear layer, following prior work on output-embedding weight tying [^30].

![Transformer architecture](../assets/papers/transformer-paper-cover-nanobanana.jpg)

## Key Mechanisms

### Scaled Dot-Product Attention

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

The scaling term keeps large dot products from pushing softmax into extremely sharp regions.
The paper also contrasts it with earlier additive attention [^2].

![Scaled Dot-Product Attention](../assets/papers/scaled-dot-product-attention.jpg)

### Multi-Head Attention

Instead of attending once in a single representation space, the model projects queries, keys, and values into several subspaces and attends in parallel.

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)W^O
$$

![Multi-Head Attention](../assets/papers/multi-head-attention.jpg)

### Positional Encoding

Because the Transformer has no recurrence, it adds position information explicitly with sinusoidal encodings.

$$
PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

$$
PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

![Positional Encoding](../assets/papers/positional-encoding.jpg)

The authors also tested learned positional embeddings and reported similar results to the learnable position representations used in convolutional sequence models, so they kept sinusoidal encodings because they extrapolate more naturally to longer sequences [^9].

### Feed-Forward Layer

Each token position passes through the same two-layer feed-forward network independently.

![Encoder layer detail](../assets/papers/encoder-layer.jpg)

## Minimal PyTorch Example

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

## Why Transformer Won

|Model |Per-layer complexity |Maximum path length |Sequential operations |
|---|---|---|---|
|Self-Attention |$O(n^2 \cdot d)$ |$O(1)$ |$O(1)$ |
|Recurrent |$O(n \cdot d^2)$ |$O(n)$ |$O(n)$ |
|Convolutional |$O(k \cdot n \cdot d^2)$ |$O(\log_k(n))$ |$O(1)$ |

The key advantage is that any two positions can interact through a constant-length path, which helps with long-distance dependencies and parallel computation.
That is one of the decisive advantages over recurrent models [^7][^13] and convolutional sequence models [^9][^18].

## Experimental Results

|Task |Model |BLEU |Training cost |
|---|---|---|---|
|WMT 2014 En-De |Transformer big |**28.4** |2.3e19 FLOPs |
|WMT 2014 En-Fr |Transformer big |**41.8** |2.3e19 FLOPs |

The paper reported state-of-the-art translation quality with lower training cost than many competing systems at the time.
Representative comparison systems in the paper include ByteNet, ConvS2S, GNMT, Deep-Att, and MoE-style models [^9][^18][^32][^38][^39]. On the training side, it also combined Adam, dropout, label smoothing, BPE subword segmentation, and output-embedding weight sharing [^20][^30][^31][^33][^36].

## Long-Term Impact

Transformer became the core architecture behind modern foundation models. Even when later systems changed training recipes, scaling methods, or tokenization, the central attention-based design remained.

## References

This note mainly draws on four reference threads from the original paper: seq2seq and attention [^2][^5][^24][^35], recurrent and convolutional alternatives [^7][^9][^13][^18][^38][^39], training and architectural details [^1][^11][^20][^30][^31][^33][^36], and important comparison-model directions from that period [^32].

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
