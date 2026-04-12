---
tags:
  type: text
  description:
  label: Tags
  value: "Mathematics · Formulas · Reference"
description:
  type: text
  description:
  label: Description
  value: "Calculus · Linear Algebra · Probability · Statistics · Optimization"
title:
  type: text
  description:
  label: Title
  value: "Mathematics Formula Guide"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../../assets/math/math-formulas-cover.jpg"
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
  value: "Mathematics"
---
# Mathematics Formula Guide

Mathematics is the language behind science, engineering, data analysis, and optimization. This document organizes commonly used formulas across calculus, linear algebra, probability, statistics, and optimization, with short explanations of what each formula means and why it matters.


---

## 1. Calculus Basics

Calculus studies change and accumulation. Derivatives describe local variation, while integrals describe cumulative effects.

### 1.1 Limits

Some of the most important limits are:

$$
\lim_{x \to 0}\frac{\sin x}{x} = 1
$$

$$
\lim_{x \to 0}\frac{e^x - 1}{x} = 1
$$

$$
\lim_{x \to 0}\frac{\ln(1+x)}{x} = 1
$$

$$
\lim_{x \to \infty}\left(1+\frac{1}{x}\right)^x = e
$$

!!! tip Why these matter
    These limits are the building blocks of derivative formulas, local approximations, and the definition of the natural constant $e$.

### 1.2 Derivatives

The derivative of a function is:

$$
f'(x) = \lim_{h \to 0}\frac{f(x+h)-f(x)}{h}
$$

Common derivative rules:

|Function |Derivative |
|---|---|
|$c$ |$0$ |
|$x^n$ |$nx^{n-1}$ |
|$e^x$ |$e^x$ |
|$\ln x$ |$\frac{1}{x}$ |
|$\sin x$ |$\cos x$ |
|$\cos x$ |$-\sin x$ |

Product rule:

$$
\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)
$$

Chain rule:

$$
\frac{d}{dx}f(g(x)) = f'(g(x))g'(x)
$$

Example:

$$
\frac{d}{dx}\sin(x^2) = 2x\cos(x^2)
$$

### 1.3 Integrals

An indefinite integral reverses differentiation:

$$
\int f(x)\,dx = F(x) + C
$$

Common integral formulas:

|Function |Integral |
|---|---|
|$x^n$ |$\frac{x^{n+1}}{n+1}+C,\; n \ne -1$ |
|$\frac{1}{x}$ |$\ln|x|+C$ |
|$e^x$ |$e^x+C$ |
|$\sin x$ |$-\cos x + C$ |
|$\cos x$ |$\sin x + C$ |

Integration by parts:

$$
\int u\,dv = uv - \int v\,du
$$

Substitution:

$$
\int f(g(x))g'(x)\,dx = \int f(u)\,du
$$


---

## 2. Linear Algebra Essentials

Linear algebra describes vectors, matrices, systems, and linear transformations.

### 2.1 Vectors and Inner Products

The Euclidean norm is:

$$
\|\mathbf{x}\|_2 = \sqrt{\sum_{i=1}^{n}x_i^2}
$$

The inner product is:

$$
\mathbf{x}^T\mathbf{y} = \sum_{i=1}^{n}x_i y_i
$$

The cosine of the angle between vectors is:

$$
\cos\theta = \frac{\mathbf{x}^T\mathbf{y}}{\|\mathbf{x}\|_2\|\mathbf{y}\|_2}
$$

### 2.2 Matrices

Matrix multiplication:

$$
c_{ij} = \sum_{k=1}^{n} a_{ik}b_{kj}
$$

For a 2 by 2 matrix:

$$
\mathbf{A} =
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

its determinant is:

$$
\det(\mathbf{A}) = ad - bc
$$

and if $ad-bc \ne 0$, then:

$$
\mathbf{A}^{-1} = \frac{1}{ad-bc}
\begin{bmatrix}
d & -b \\
-c & a
\end{bmatrix}
$$

### 2.3 Eigenvalues

Eigenvalues satisfy:

$$
\mathbf{A}\mathbf{v} = \lambda \mathbf{v}
$$

and are found from:

$$
\det(\mathbf{A} - \lambda \mathbf{I}) = 0
$$


---

## 3. Probability and Statistics

Probability models uncertainty. Statistics turns data into inference.

### 3.1 Basic Probability

Conditional probability:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
$$

Bayes' theorem:

$$
P(A \mid B) = \frac{P(B \mid A)P(A)}{P(B)}
$$

Expectation and variance:

$$
\mathbb{E}[X] = \sum_x xP(X=x)
\quad \text{or} \quad
\mathbb{E}[X] = \int x f(x)\,dx
$$

$$
\operatorname{Var}(X) = \mathbb{E}[(X-\mu)^2]
$$

### 3.2 Common Distributions

Binomial distribution:

$$
P(X=k) = \binom{n}{k}p^k(1-p)^{n-k}
$$

Poisson distribution:

$$
P(X=k) = \frac{\lambda^k e^{-\lambda}}{k!}
$$

Normal distribution:

$$
f(x) = \frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

### 3.3 Estimation

Sample mean:

$$
\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_i
$$

Sample variance:

$$
s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2
$$

Confidence interval for a mean with known variance:

$$
\bar{x} \pm z_{\alpha/2}\frac{\sigma}{\sqrt{n}}
$$


---

## 4. Optimization Basics

Optimization looks for the best value of an objective function subject to structure or constraints.

### 4.1 First-Order Condition

For a differentiable function $f(x)$, local optima often satisfy:

$$
\nabla f(x) = 0
$$

### 4.2 Gradient Descent

The standard update rule is:

$$
x_{t+1} = x_t - \eta \nabla f(x_t)
$$

where $\eta$ is the learning rate.

### 4.3 Newton's Method

For a scalar function:

$$
x_{t+1} = x_t - \frac{f'(x_t)}{f''(x_t)}
$$

In multivariable form:

$$
\mathbf{x}_{t+1} = \mathbf{x}_t - H^{-1}\nabla f(\mathbf{x}_t)
$$

where $H$ is the Hessian matrix.

### 4.4 Lagrange Multipliers

To optimize $f(x,y)$ subject to $g(x,y)=0$, define:

$$
\mathcal{L}(x,y,\lambda) = f(x,y) - \lambda g(x,y)
$$

Then solve:

$$
\nabla \mathcal{L} = 0
$$


---

## 5. Quick Reference

|Area |Formula |Use |
|---|---|---|
|Limit |$\lim_{x \to 0}\frac{\sin x}{x}=1$ |Core calculus identity |
|Derivative |$\frac{d}{dx}x^n = nx^{n-1}$ |Local change |
|Integral |$\int x^n dx = \frac{x^{n+1}}{n+1}+C$ |Accumulation |
|Inner product |$\mathbf{x}^T\mathbf{y}$ |Geometry and projection |
|Bayes |$P(A \mid B)=\frac{P(B \mid A)P(A)}{P(B)}$ |Conditional inference |
|Gradient descent |$x_{t+1}=x_t-\eta\nabla f(x_t)$ |Optimization |

Mathematics becomes much easier to navigate when formulas are grouped by role rather than memorized in isolation. A good formula reference should always connect notation, interpretation, and use.
