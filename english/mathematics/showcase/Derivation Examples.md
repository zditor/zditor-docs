---
tags:
  type: text
  description:
  label: Tags
  value: "Formula Showcase · Derivation · Calculus · Optimization"
description:
  type: text
  description:
  label: Description
  value: "Step-by-Step Derivations · Chain Rule · Least Squares · Softmax Cross-Entropy"
title:
  type: text
  description:
  label: Title
  value: "Derivation Examples"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../../../assets/math/math-formulas-cover.jpg"
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
  value: "../../../assets/nanobanana-avatar.svg"
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
  value: "Derivation Showcase"
---
# Derivation Examples

This document shows how to write mathematical derivations from result back to process. Compared with a pure formula sheet, derivation-focused pages are better for demonstrating continuous block formulas, short explanations, and admonitions working together.


---

## 1. Chain Rule Example

Let:

$$
y = \sin(x^2 + 1)
$$

Treat it as a composition of functions:

$$
u = x^2 + 1, \qquad y = \sin u
$$

By the chain rule:

$$
\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}
$$

Therefore:

$$
\frac{dy}{dx} = \cos(x^2 + 1)\cdot 2x
$$

!!! info Writing suggestion
    Do not jump straight to the final answer in derivation documents. Introducing intermediate variables makes each transformation much easier to follow.


---

## 2. Least Squares Closed-Form Solution

The objective function is:

$$
J(\boldsymbol{\beta}) = \|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2
$$

First expand it:

$$
J(\boldsymbol{\beta})
= (\mathbf{y} - \mathbf{X}\boldsymbol{\beta})^T(\mathbf{y} - \mathbf{X}\boldsymbol{\beta})
$$

$$
= \mathbf{y}^T\mathbf{y}
- 2\mathbf{y}^T\mathbf{X}\boldsymbol{\beta}
+ \boldsymbol{\beta}^T\mathbf{X}^T\mathbf{X}\boldsymbol{\beta}
$$

Take the gradient with respect to $\boldsymbol{\beta}$:

$$
\nabla_{\boldsymbol{\beta}} J
= -2\mathbf{X}^T\mathbf{y}
+ 2\mathbf{X}^T\mathbf{X}\boldsymbol{\beta}
$$

Set the gradient to zero:

$$
\mathbf{X}^T\mathbf{X}\boldsymbol{\beta} = \mathbf{X}^T\mathbf{y}
$$

If $\mathbf{X}^T\mathbf{X}$ is invertible, then:

$$
\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}
$$


---

## 3. Softmax and Cross-Entropy Gradient

Let the model output logits $\mathbf{z}$, and define softmax probabilities as:

$$
\hat{y}_i = \frac{e^{z_i}}{\sum_{j=1}^{K} e^{z_j}}
$$

The cross-entropy loss is:

$$
L = -\sum_{i=1}^{K} y_i \log \hat{y}_i
$$

Combining softmax with cross-entropy gives the familiar result:

$$
\frac{\partial L}{\partial z_i} = \hat{y}_i - y_i
$$

This result matters because it compresses a complicated chain of differentiation into a very compact expression.

!!! tip Why this is a strong demo example
    This derivation spans probability, exponentials, differentiation, and vector notation, so it shows the layering ability of formula documents very clearly.


---

## 4. Geometric Series Sum

Let the common ratio satisfy r\
e 1:

$$
S_n = a + ar + ar^2 + \cdots + ar^{n-1}
$$

Multiply both sides by $r$:

$$
rS_n = ar + ar^2 + \cdots + ar^n
$$

Subtract the two equations:

$$
S_n - rS_n = a - ar^n
$$

Rearranging gives:

$$
S_n = \frac{a(1-r^n)}{1-r}
$$

When $|r| < 1$ and $n \to \infty$:

$$
\sum_{k=0}^{\infty} ar^k = \frac{a}{1-r}
$$


---

## 5. Newton's Method

To solve $f(x)=0$, take a first-order linear approximation around the current point $x_n$:

$$
f(x) \approx f(x_n) + f'(x_n)(x - x_n)
$$

Set the approximation equal to zero:

$$
0 = f(x_n) + f'(x_n)(x_{n+1} - x_n)
$$

Then the update rule becomes:

$$
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}
$$

This is a classic derivation pattern in optimization and numerical analysis.

The point of derivation documents is not only to show what formulas look like, but also to show how they are built step by step. For a Zditor demo, this kind of page is often more convincing than a plain list of formulas.
