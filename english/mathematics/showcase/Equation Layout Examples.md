---
col:
  type: array
  description: 
  label: Col
  value: ["subject","title","description"]
cover:
  type: asset
  description: 
  label: Cover Image
  value: "../../../assets/math/math-formulas-cover.jpg"
description:
  type: text
  description: 
  label: Description
  value: "Block Formulas · Multi-Step Derivations · Piecewise Functions · Matrices · Aligned Layout"
display:
  type: checkbox
  description: display
  label: Display Properties
  value: false
tags:
  type: text
  description: 
  label: Tags
  value: "Formula Showcase · LaTeX · Layout · Examples"
title:
  type: text
  description: 
  label: Title
  value: "Equation Layout Examples"
author:
  type: text
  description: 
  label: Author
  value: "SeeLey & Codex"
row:
  type: array
  description: 
  label: Row
  value: ["avatar","author","updated","tags"]
warm:
  type: checkbox
  description: warm
  label: 暖色调
  value: true
updated:
  type: date
  description: 
  label: Updated
  value: "2026-04-11"
subject:
  type: text
  description: 
  label: Subject
  value: "Math Showcase"
avatar:
  type: asset
  description: 
  label: Avatar
  value: "../../../assets/nanobanana-avatar.svg"
---
# Equation Layout Examples

This document is not centered on one academic subject. Instead, it showcases common mathematical layout patterns in Zditor, including block formulas, inline formulas, multi-step derivations, piecewise functions, matrices, sums, integrals, and formulas inside tables.


---

## 1. Inline and Block Formulas

Inline formulas work well for short expressions such as $E = mc^2$, the circle area formula $S = \pi r^2$, or the regression model $y = \beta_0 + \beta_1 x + \varepsilon$.

Block formulas work better when a result should stand on its own:

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$


---

## 2. Multi-Step Derivations

Continuous derivation is one of the most common formula layouts:

$$
\frac{d}{dx}\sin(x^2)
= \cos(x^2)\cdot \frac{d}{dx}(x^2)
= 2x\cos(x^2)
$$

Another example is the geometric series sum:

$$
S_n = a + ar + ar^2 + \cdots + ar^{n-1}
$$

$$
rS_n = ar + ar^2 + \cdots + ar^n
$$

$$
(1-r)S_n = a - ar^n
\quad \Rightarrow \quad
S_n = \frac{a(1-r^n)}{1-r}
$$

!!! tip Layout suggestion
    If the derivation is longer than three steps, split it into several block formulas instead of cramming everything into one dense formula block.


---

## 3. Piecewise Functions

Piecewise notation is common for activation functions, absolute value, and probability densities:

$$
|x| =
\begin{cases}
x, & x \ge 0 \\
-x, & x < 0
\end{cases}
$$

$$
\mathrm{ReLU}(x) =
\begin{cases}
x, & x > 0 \\
0, & x \le 0
\end{cases}
$$

$$
f(x) =
\begin{cases}
\lambda e^{-\lambda x}, & x \ge 0 \\
0, & x < 0
\end{cases}
$$


---

## 4. Matrices and Vectors

Matrix notation is one of the most important parts of formula-heavy documents:

$$
\mathbf{x} =
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix},
\qquad
\mathbf{A} =
\begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{bmatrix}
$$

Matrix multiplication can be presented as:

$$
\mathbf{A}\mathbf{x} =
\begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{bmatrix}
\begin{bmatrix}
x_1 \\
x_2
\end{bmatrix}
=
\begin{bmatrix}
a_{11}x_1 + a_{12}x_2 \\
a_{21}x_1 + a_{22}x_2
\end{bmatrix}
$$

Determinant and inverse can be shown together:

$$
\det(\mathbf{A}) = a_{11}a_{22} - a_{12}a_{21}
$$

$$
\mathbf{A}^{-1} = \frac{1}{\det(\mathbf{A})}
\begin{bmatrix}
a_{22} & -a_{12} \\
-a_{21} & a_{11}
\end{bmatrix}
$$


---

## 5. Sums, Integrals, and Limits

These are among the most common expressions in mathematics, physics, and machine learning documents.

$$
\lim_{x \to 0}\frac{\sin x}{x} = 1
$$

$$
\int_{0}^{1} x^2\,dx = \frac{1}{3}
$$

$$
\sum_{k=0}^{\infty} ar^k = \frac{a}{1-r}, \qquad |r| < 1
$$

$$
\mathbb{E}[X] = \sum_x xP(X=x)
\qquad \text{or} \qquad
\mathbb{E}[X] = \int_{-\infty}^{\infty} x f(x)\,dx
$$


---

## 6. Short Formulas in Tables

|Category |Example Formula |Notes |
|---|---|---|
|Derivative |$\frac{d}{dx}x^n = nx^{n-1}$ |Good for short formulas |
|Integral |$\int e^x\,dx = e^x + C$ |Avoid long table cells |
|Probability |$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ |Good for quick reference |
|Linear algebra |$\mathbf{A}\mathbf{x} = \mathbf{b}$ |Good for definitions |

!!! warning Table usage
    Tables are best for short formulas. If you need multi-step derivations, matrix expansions, or piecewise notation, use standalone block formulas instead.

This document is itself a layout sample. If you keep expanding formula demos, it can serve as a baseline page for rendering and presentation quality.
