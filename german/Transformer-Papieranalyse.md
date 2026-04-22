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
# Attention Is All You Need Papieranalyse

Diese Seite ist eine kompakte Einordnung der Transformer-Arbeit von 2017. Das Paper gehoert zu den einflussreichsten Veroeffentlichungen in modernem NLP und bildet die Grundlage vieler heutiger Sprachmodelle.

## Paper-Informationen

- Titel: Attention Is All You Need
- Konferenz: NeurIPS 2017
- Autoren: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin
- arXiv: <https://arxiv.org/abs/1706.03762>
- Lokales PDF-Asset: [attention.pdf](../assets/papers/attention.pdf)

## Kerngedanke

Das Paper fuehrt den Transformer ein, eine Sequenzarchitektur, die vollstaendig auf Attention-Mechanismen basiert. Sie steht in der Linie von seq2seq- und Attention-Arbeiten [^2][^5][^24][^35], verzichtet aber auf RNNs und CNNs und modelliert Beziehungen zwischen Positionen direkt ueber Attention [^9][^13][^18]. Dadurch wird das Training besser parallelisierbar und der Umgang mit langen Abhaengigkeiten staerker.

!!! info Warum das wichtig war
    Dieses Paper fuehrte direkt zu Modellen wie BERT, GPT und T5 und praegte die Standardarchitektur moderner Foundation Models.

## Forschungskontext

Vor dem Transformer wurde Sequenzmodellierung weitgehend von rekurrenten Netzen wie LSTM und GRU dominiert [^7][^13]. In der maschinellen Uebersetzung waren Encoder-Decoder- und seq2seq-Setups ueblich [^5][^35], oft kombiniert mit Attention zur besseren Ausrichtung [^2][^24]. Eine weitere Linie reduzierte serielle Abhaengigkeiten mit Faltungsmodellen wie ByteNet und ConvS2S [^9][^18]. Der entscheidende Durchbruch des Transformers bestand darin, die eigentliche Abhaengigkeitsmodellierung komplett an Self-Attention zu uebergeben.

## Architektur im Ueberblick

|Komponente |Zusammenfassung |
|---|---|
|Encoder |6 Schichten mit Self-Attention und Feed-Forward |
|Decoder |6 Schichten mit Masked Self-Attention, Cross-Attention und Feed-Forward |
|Modellbreite |$d_{model} = 512$ |
|Heads |8 |
|FFN-Breite |$d_{ff} = 2048$ |

Jede Encoder- und Decoder-Unterschicht verwendet Residualverbindungen und LayerNorm und uebernimmt damit Ideen aus ResNet und Layer Normalization [^1][^11]. Ausserdem teilt das Paper die Gewichtsmatrix zwischen Eingabe-Embedding, Ausgabe-Embedding und der linearen Schicht vor dem Softmax, im Sinne frueherer Arbeiten zum Weight Tying [^30].

![Transformer-Architektur](../assets/papers/transformer-paper-cover-nanobanana.jpg)

## Wichtige Mechanismen

### Scaled Dot-Product Attention

$$
\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

Die Skalierung verhindert, dass grosse Skalarprodukte die Softmax-Funktion zu frueh in extrem scharfe Bereiche treiben. Das Paper stellt dies auch der frueheren additiven Attention gegenueber [^2].

Wer die klassische Abbildung im Originalpaper direkt daneben ansehen will, sollte zuerst die folgende PDF-Karte oeffnen. Sie markiert genau den Abschnitt, in dem das Paper scaled dot-product attention erklaert, und laesst sich gut zusammen mit Formel und Grafik lesen.

[Paper](/assets/papers/attention.pdf|mode=pdf_card|highlight=873c76c8-9921-4012-b91a-3bc6e5452330)

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

Die Autoren testeten auch gelernte Positions-Embeddings und berichteten aehnliche Resultate wie bei lernbaren Positionsdarstellungen in Faltungsmodellen. Beibehalten wurden dennoch sinusfoermige Encodings, weil sie sich natuerlicher auf laengere Sequenzen extrapolieren lassen [^9].

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

Der entscheidende Vorteil war, dass beliebige Positionen ueber einen Pfad konstanter Laenge verbunden werden koennen. Das hilft sowohl bei langen Abhaengigkeiten als auch bei paralleler Berechnung. Genau darin lag ein zentraler Vorteil gegenueber rekurrenten Modellen [^7][^13] und Faltungsmodellen fuer Sequenzen [^9][^18].

## Experimentelle Ergebnisse

|Aufgabe |Modell |BLEU |Trainingskosten |
|---|---|---|---|
|WMT 2014 En-De |Transformer big |**28.4** |2.3e19 FLOPs |
|WMT 2014 En-Fr |Transformer big |**41.8** |2.3e19 FLOPs |

Damit erreichte das Paper damalige Bestwerte in der maschinellen Uebersetzung und blieb zugleich guenstiger zu trainieren als viele konkurrierende Systeme. Zu den im Original verglichenen Richtungen gehoeren ByteNet, ConvS2S, GNMT, Deep-Att und MoE-Modelle [^9][^18][^32][^38][^39]. Im Training wurden zudem Adam, Dropout, Label Smoothing, BPE-Subwords und geteilte Ausgabe-Embeddings kombiniert [^20][^30][^31][^33][^36].

## Langfristiger Einfluss

Transformer wurde zur Kernarchitektur moderner Foundation Models. Auch wenn sich spaetere Trainingsrezepte, Skalierungsstrategien oder Tokenizer veraenderten, blieb das attentionbasierte Grundprinzip erhalten.

## Literatur

Diese Einordnung stuetzt sich vor allem auf vier Referenzlinien aus dem Originalpaper: seq2seq und Attention [^2][^5][^24][^35], rekurrente und faltungsbasierte Alternativen [^7][^9][^13][^18][^38][^39], Trainings- und Architekturdetails [^1][^11][^20][^30][^31][^33][^36] sowie wichtige Vergleichsmodelle aus dieser Zeit [^32].

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
