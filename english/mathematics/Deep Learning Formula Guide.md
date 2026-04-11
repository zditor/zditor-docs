---
tags:
  type: text
  description:
  label: Tags
  value: "Deep Learning · Formulas · AI"
description:
  type: text
  description:
  label: Description
  value: "Neural Networks · Optimization · CNN · RNN · Transformer"
title:
  type: text
  description:
  label: Title
  value: "Deep Learning Formula Guide"
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
  label: Warm Tone
  value: true
display:
  type: checkbox
  description: display
  label: Display Properties
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
# Deep Learning Formula Guide

Deep learning is a branch of machine learning built around multi-layer neural networks. Its formulas connect linear algebra, calculus, probability, and optimization. This document summarizes commonly used equations for neuron models, activations, losses, optimization, sequence models, and attention.


---

## 1. Neural Network Basics

### 1.1 Neuron Model

The output of a neuron is:

$$
y = \sigma\left(\sum_{i=1}^{n} w_i x_i + b\right) = \sigma(\mathbf{w}^T\mathbf{x}+b)
$$

For a full layer:

$$
\mathbf{y} = \sigma(\mathbf{W}\mathbf{x} + \mathbf{b})
$$

### 1.2 Activation Functions

Sigmoid:

$$
\sigma(x) = \frac{1}{1+e^{-x}}
$$

$$
\sigma'(x) = \sigma(x)(1-\sigma(x))
$$

Tanh:

$$
\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}
$$

$$
\tanh'(x) = 1 - \tanh^2(x)
$$

ReLU:

$$
\mathrm{ReLU}(x) = \max(0,x)
$$

Leaky ReLU:

$$
\mathrm{LeakyReLU}(x) =
\begin{cases}
x, & x > 0 \\
\alpha x, & x \le 0
\end{cases}
$$

GELU:

$$
\mathrm{GELU}(x) = x \cdot \Phi(x)
$$


---

## 2. Softmax and Loss Functions

### 2.1 Softmax

For logits $\mathbf{z}$:

$$
\mathrm{Softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{K} e^{z_j}}
$$

Numerically stable form:

$$
\mathrm{Softmax}(z_i) = \frac{e^{z_i-\max(\mathbf{z})}}{\sum_{j=1}^{K} e^{z_j-\max(\mathbf{z})}}
$$

### 2.2 Mean Squared Error

$$
L_{\mathrm{MSE}} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2
$$

### 2.3 Cross-Entropy

For multi-class classification:

$$
L_{\mathrm{CE}} = -\sum_{i=1}^{K} y_i \log \hat{y}_i
$$

With softmax logits:

$$
\frac{\partial L_{\mathrm{CE}}}{\partial z_i} = \hat{y}_i - y_i
$$

Binary cross-entropy:

$$
L_{\mathrm{BCE}} = -\left[y\log \hat{y} + (1-y)\log(1-\hat{y})\right]
$$


---

## 3. Optimization

Gradient descent:

$$
\theta_{t+1} = \theta_t - \eta \nabla_{\theta}L(\theta_t)
$$

Momentum:

$$
\mathbf{v}_{t+1} = \beta \mathbf{v}_t - \eta \nabla_\theta L(\theta_t)
$$

$$
\theta_{t+1} = \theta_t + \mathbf{v}_{t+1}
$$

Adam:

$$
m_t = \beta_1 m_{t-1} + (1-\beta_1)g_t
$$

$$
v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2
$$

$$
\hat{m}_t = \frac{m_t}{1-\beta_1^t}, \qquad \hat{v}_t = \frac{v_t}{1-\beta_2^t}
$$

$$
\theta_{t+1} = \theta_t - \eta \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}
$$

!!! tip Why Adam is common
    Adam mixes momentum and adaptive learning rates, which makes it robust across many training settings without much manual tuning.


---

## 4. Regularization

L2 regularization:

$$
L_{\mathrm{total}} = L_{\mathrm{data}} + \lambda \|\mathbf{w}\|_2^2
$$

L1 regularization:

$$
L_{\mathrm{total}} = L_{\mathrm{data}} + \lambda \|\mathbf{w}\|_1
$$

Dropout training rule:

$$
\tilde{\mathbf{h}} = \mathbf{m} \odot \mathbf{h}, \qquad m_i \sim \mathrm{Bernoulli}(p)
$$

Batch normalization:

$$
\hat{x}_i = \frac{x_i - \mu_B}{\sqrt{\sigma_B^2 + \epsilon}}
$$

$$
y_i = \gamma \hat{x}_i + \beta
$$


---

## 5. CNN and Sequence Models

### 5.1 Convolution

For a 2D convolution:

$$
Y(i,j) = \sum_m \sum_n X(i-m, j-n)K(m,n)
$$

Output size formula:

$$
\text{out} = \left\lfloor \frac{W-K+2P}{S} \right\rfloor + 1
$$

### 5.2 Recurrent Neural Networks

Basic RNN update:

$$
\mathbf{h}_t = \phi(\mathbf{W}_{xh}\mathbf{x}_t + \mathbf{W}_{hh}\mathbf{h}_{t-1} + \mathbf{b}_h)
$$

$$
\mathbf{y}_t = \mathbf{W}_{hy}\mathbf{h}_t + \mathbf{b}_y
$$

LSTM cell state update:

$$
\mathbf{c}_t = \mathbf{f}_t \odot \mathbf{c}_{t-1} + \mathbf{i}_t \odot \tilde{\mathbf{c}}_t
$$

GRU update:

$$
\mathbf{h}_t = (1-\mathbf{z}_t)\odot\mathbf{h}_{t-1} + \mathbf{z}_t \odot \tilde{\mathbf{h}}_t
$$


---

## 6. Transformer and Attention

Scaled dot-product attention:

$$
\mathrm{Attention}(Q,K,V) = \mathrm{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

Multi-head attention:

$$
\mathrm{MultiHead}(Q,K,V) = \mathrm{Concat}(\mathrm{head}_1,\ldots,\mathrm{head}_h)W^O
$$

with:

$$
\mathrm{head}_i = \mathrm{Attention}(QW_Q^i, KW_K^i, VW_V^i)
$$

Positional encoding:

$$
PE_{(pos,2i)} = \sin\left(\frac{pos}{10000^{2i/d_{\mathrm{model}}}}\right)
$$

$$
PE_{(pos,2i+1)} = \cos\left(\frac{pos}{10000^{2i/d_{\mathrm{model}}}}\right)
$$


---

## 7. Quick Reference

|Category |Formula |Use |
|---|---|---|
|Neuron |$\sigma(\mathbf{w}^T\mathbf{x}+b)$ |Basic neural unit |
|Softmax |$\frac{e^{z_i}}{\sum_j e^{z_j}}$ |Classification probabilities |
|Cross-entropy |$-\sum y_i \log \hat{y}_i$ |Classification loss |
|Gradient descent |$\theta_{t+1}=\theta_t-\eta\nabla L$ |Optimization |
|Convolution |$Y(i,j)=\sum\sum X K$ |Feature extraction |
|Attention |$\mathrm{softmax}(QK^T/\sqrt{d_k})V$ |Sequence modeling |

Deep learning formulas are easiest to understand when read as a pipeline: linear transform, nonlinearity, loss, gradient, update. Once that flow is clear, the architecture-specific equations become much easier to place.
