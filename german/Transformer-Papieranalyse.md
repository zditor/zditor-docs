---
description:
  type: text
  description:
  label: Description
  value: "Transformer-Papieranalyse · Attention · Architektur · Codebeispiel"
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
  value: "Papieranalyse"
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
  value: "Attention Is All You Need Papieranalyse"
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
# Attention Is All You Need Papieranalyse

Diese Seite ist eine kompakte Einordnung der Transformer-Arbeit von 2017. Das Paper gehoert zu den einflussreichsten Veroeffentlichungen in modernem NLP und bildet die Grundlage vieler heutiger Sprachmodelle.

## Paper-Informationen

- Titel: Attention Is All You Need
- Konferenz: NeurIPS 2017
- Autoren: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin
- arXiv: <https://arxiv.org/abs/1706.03762>
- Lokales PDF-Asset: [1706.03762v7.pdf](../assets/papers/1706.03762v7.pdf)

## Kerngedanke

Das Paper fuehrt den Transformer ein, ein Sequenzmodell, das ausschliesslich auf Attention-Mechanismen basiert. Rekurrenz und Faltungen entfallen, wodurch das Training besser parallelisierbar wird und lange Abhaengigkeiten direkter modelliert werden koennen.

!!! info Warum das wichtig war
    Dieses Paper fuehrte direkt zu Modellen wie BERT, GPT und T5 und praegte die Standardarchitektur moderner Foundation Models.

## Architektur im Ueberblick

|Komponente |Zusammenfassung |
|---|---|
|Encoder |6 Schichten mit Self-Attention und Feed-Forward |
|Decoder |6 Schichten mit Masked Self-Attention, Cross-Attention und Feed-Forward |
|Modellbreite |$d_{model} = 512$ |
|Heads |8 |
|FFN-Breite |$d_{ff} = 2048$ |

![Transformer-Architektur](../assets/papers/transformer-paper-cover-nanobanana.jpg)

## Wichtige Mechanismen

### Scaled Dot-Product Attention

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

Die Skalierung verhindert, dass grosse Skalarprodukte die Softmax-Funktion zu frueh in extrem scharfe Bereiche treiben.

![Scaled Dot-Product Attention](../assets/papers/scaled-dot-product-attention.jpg)

### Multi-Head Attention

Anstatt nur einmal in einem einzigen Repraesentationsraum zu attentieren, projiziert das Modell Queries, Keys und Values in mehrere Teilraeume und berechnet die Attention parallel.

$$
\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \ldots, \text{head}_h)W^O
$$

![Multi-Head Attention](../assets/papers/multi-head-attention.jpg)

### Positional Encoding

Da der Transformer keine Rekurrenz besitzt, wird Positionsinformation explizit per sinusfoermiger Kodierung hinzugefuegt.

$$
PE_{(pos, 2i)} = \sin\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

$$
PE_{(pos, 2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

![Positional Encoding](../assets/papers/positional-encoding.jpg)

### Position-wise Feed-Forward

Jede Token-Position durchlaeuft unabhaengig dasselbe zweistufige Feed-Forward-Netzwerk.

![Encoder-Layer-Detail](../assets/papers/encoder-layer.jpg)

## Minimales PyTorch-Beispiel

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

## Warum sich Transformer durchsetzte

|Modell |Komplexitaet pro Schicht |Maximale Pfadlaenge |Sequenzielle Operationen |
|---|---|---|---|
|Self-Attention |$O(n^2 \cdot d)$ |$O(1)$ |$O(1)$ |
|Recurrent |$O(n \cdot d^2)$ |$O(n)$ |$O(n)$ |
|Convolutional |$O(k \cdot n \cdot d^2)$ |$O(\log_k(n))$ |$O(1)$ |

Der entscheidende Vorteil war, dass beliebige Positionen ueber einen Pfad konstanter Laenge verbunden werden koennen. Das hilft sowohl bei langen Abhaengigkeiten als auch bei paralleler Berechnung.

## Experimentelle Ergebnisse

|Aufgabe |Modell |BLEU |Trainingskosten |
|---|---|---|---|
|WMT 2014 En-De |Transformer big |**28.4** |2.3e19 FLOPs |
|WMT 2014 En-Fr |Transformer big |**41.8** |2.3e19 FLOPs |

Damit erreichte das Paper damalige Bestwerte in der maschinellen Uebersetzung und blieb zugleich guenstiger zu trainieren als viele konkurrierende Systeme.

## Langfristiger Einfluss

Transformer wurde zur Kernarchitektur moderner Foundation Models. Auch wenn sich spaetere Trainingsrezepte, Skalierungsstrategien oder Tokenizer veraenderten, blieb das attentionbasierte Grundprinzip erhalten.

[^1]: Vaswani, A., Shazeer, N., Parmar, N., et al. *Attention Is All You Need*. NeurIPS 2017. <https://arxiv.org/abs/1706.03762>
