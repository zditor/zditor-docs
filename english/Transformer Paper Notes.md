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
# Attention Is All You Need Paper Notes

This page is a concise reading note for the 2017 Transformer paper, one of the most influential works in modern NLP.

## Paper Info

- Title: Attention Is All You Need
- Venue: NeurIPS 2017
- Authors: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin
- arXiv: <https://arxiv.org/abs/1706.03762>
- Local PDF asset: [1706.03762v7.pdf](../assets/papers/1706.03762v7.pdf)

## Core Idea

The paper proposes the Transformer, a sequence model built entirely on attention mechanisms. It removes recurrence and convolutions, making training more parallelizable while still modeling long-range dependencies effectively.

!!! info Why it mattered
    This paper changed the default design of sequence models. It directly influenced BERT, GPT, T5, and most later large language models.

## Architecture Summary

|Component |Summary |
|---|---|
|Encoder |6 layers of self-attention and feed-forward blocks |
|Decoder |6 layers with masked self-attention, cross-attention, and feed-forward blocks |
|Model width |$d_{model} = 512$ |
|Heads |8 attention heads |
|Feed-forward width |$d_{ff} = 2048$ |

![Transformer architecture](../assets/papers/transformer-paper-cover-nanobanana.jpg)

## Key Mechanisms

### Scaled Dot-Product Attention

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

The scaling term keeps large dot products from pushing softmax into extremely sharp regions.

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

## Experimental Results

|Task |Model |BLEU |Training cost |
|---|---|---|---|
|WMT 2014 En-De |Transformer big |**28.4** |2.3e19 FLOPs |
|WMT 2014 En-Fr |Transformer big |**41.8** |2.3e19 FLOPs |

The paper reported state-of-the-art translation quality with lower training cost than many competing systems at the time.

## Long-Term Impact

Transformer became the core architecture behind modern foundation models. Even when later systems changed training recipes, scaling methods, or tokenization, the central attention-based design remained.
