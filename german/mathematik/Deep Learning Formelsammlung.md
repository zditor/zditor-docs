---
tags:
  type: text
  description:
  label: Tags
  value: "Deep Learning · Formeln · KI"
description:
  type: text
  description:
  label: Description
  value: "Neuronale Netze · Optimierung · CNN · RNN · Transformer"
title:
  type: text
  description:
  label: Title
  value: "Deep Learning Formelsammlung"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../../assets/math/deep-learning-formulas-cover.jpg"
col:
  type: array
  description:
  label: Col
  value: ["subject","title","description"]
warm:
  type: checkbox
  description: warm
  label: Warmer Farbton
  value: true
display:
  type: checkbox
  description: display
  label: Eigenschaften anzeigen
  value: false
avatar:
  type: asset
  description:
  label: Avatar
  value: "../../assets/nanobanana-avatar.svg"
row:
  type: array
  description:
  label: Row
  value: ["avatar","author","updated","tags"]
author:
  type: text
  description:
  label: Author
  value: "SeeLey & Codex"
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-11"
subject:
  type: text
  description:
  label: Subject
  value: "Deep Learning"
---
# Deep Learning Formelsammlung

Deep Learning ist ein Teilgebiet des maschinellen Lernens, das auf mehrschichtigen neuronalen Netzen basiert. Die Formeln verbinden lineare Algebra, Analysis, Wahrscheinlichkeit und Optimierung.


---

## 1. Neuronale Netze

Neuron:

$$
y = \sigma\left(\sum_{i=1}^{n} w_i x_i + b\right) = \sigma(\mathbf{w}^T\mathbf{x}+b)
$$

Schicht:

$$
\mathbf{y} = \sigma(\mathbf{W}\mathbf{x} + \mathbf{b})
$$

Sigmoid:

$$
\sigma(x) = \frac{1}{1+e^{-x}}
$$

ReLU:

$$
\mathrm{ReLU}(x) = \max(0,x)
$$

GELU:

$$
\mathrm{GELU}(x) = x \cdot \Phi(x)
$$


---

## 2. Softmax und Verlustfunktionen

Softmax:

$$
\mathrm{Softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{K} e^{z_j}}
$$

MSE:

$$
L_{\mathrm{MSE}} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2
$$

Kreuzentropie:

$$
L_{\mathrm{CE}} = -\sum_{i=1}^{K} y_i \log \hat{y}_i
$$

Gradient:

$$
\frac{\partial L_{\mathrm{CE}}}{\partial z_i} = \hat{y}_i - y_i
$$


---

## 3. Optimierung und Regularisierung

Gradientenabstieg:

$$
\theta_{t+1} = \theta_t - \eta \nabla_{\theta}L(\theta_t)
$$

Momentum:

$$
\mathbf{v}_{t+1} = \beta \mathbf{v}_t - \eta \nabla_\theta L(\theta_t)
$$

Adam:

$$
\theta_{t+1} = \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}
$$

L2-Regularisierung:

$$
L_{\mathrm{total}} = L_{\mathrm{data}} + \lambda \|\mathbf{w}\|_2^2
$$

Batch-Normalisierung:

$$
\hat{x}_i = \frac{x_i - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}
$$


---

## 4. CNN, RNN und Attention

Faltung:

$$
Y(i,j) = \sum_m \sum_n X(i-m, j-n)K(m,n)
$$

RNN:

$$
\mathbf{h}_t = \phi(\mathbf{W}_{xh}\mathbf{x}_t + \mathbf{W}_{hh}\mathbf{h}_{t-1} + \mathbf{b}_h)
$$

LSTM-Zustand:

$$
\mathbf{c}_t = \mathbf{f}_t \odot \mathbf{c}_{t-1} + \mathbf{i}_t \odot \tilde{\mathbf{c}}_t
$$

Scaled Dot-Product Attention:

$$
\mathrm{Attention}(Q,K,V) = \mathrm{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

Multi-Head Attention:

$$
\mathrm{MultiHead}(Q,K,V) = \mathrm{Concat}(\mathrm{head}_1,\ldots,\mathrm{head}_h)W^O
$$


---

## 5. Schnelluebersicht

|Kategorie |Formel |Zweck |
|---|---|---|
|Neuron |$\sigma(\mathbf{w}^T\mathbf{x}+b)$ |Grundbaustein |
|Softmax |$\frac{e^{z_i}}{\sum_j e^{z_j}}$ |Klassifikation |
|Kreuzentropie |$-\sum y_i \log \hat{y}_i$ |Verlust |
|Gradientenabstieg |$\theta_{t+1}=\theta_t-\eta\nabla L$ |Optimierung |
|Faltung |$Y(i,j)=\sum\sum XK$ |Merkmalsextraktion |
|Attention |$\mathrm{softmax}(QK^T/\sqrt{d_k})V$ |Sequenzmodellierung |
