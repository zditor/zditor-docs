---
subject:
  type: text
  description: 
  label: Subject
  value: "Linear Algebra"
updated:
  type: date
  description: 
  label: Updated
  value: "2026-04-11"
display:
  type: checkbox
  description: display
  label: Display Properties
  value: false
tags:
  type: text
  description: 
  label: Tags
  value: "Linear Algebra · Formulas · Matrices · Vectors"
title:
  type: text
  description: 
  label: Title
  value: "Linear Algebra Formula Guide"
warm:
  type: checkbox
  description: warm
  label: 暖色调
  value: true
col:
  type: array
  description: 
  label: Col
  value: ["subject","title","description"]
cover:
  type: asset
  description: 
  label: Cover Image
  value: "../../assets/math/math-formulas-cover.jpg"
author:
  type: text
  description: 
  label: Author
  value: "SeeLey & Codex"
avatar:
  type: asset
  description: 
  label: Avatar
  value: "../../assets/nanobanana-avatar.svg"
description:
  type: text
  description: 
  label: Description
  value: "Vector Spaces · Matrix Operations · Linear Transformations · Eigenvalues · Singular Value Decomposition"
row:
  type: array
  description: 
  label: Row
  value: ["avatar","author","updated","tags"]
---
# Linear Algebra Formula Guide

Linear algebra studies vectors, matrices, systems of linear equations, and linear transformations. It is a common foundation for modern mathematics, physics, computer graphics, machine learning, and optimization. This document collects core linear algebra formulas and ties symbolic manipulation back to geometric intuition.


---

## 1. Vectors and Inner Products

Vectors can be understood both as ordered lists of numbers and as directions with magnitude in space.

### 1.1 Vector Representation

An $n$-dimensional vector can be written as:

$$
\mathbf{x} =
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix}
$$

The $p$-norm of a vector is defined by:

$$
\|\mathbf{x}\|_p = \left(\sum_{i=1}^{n} |x_i|^p \right)^{1/p}
$$

Common special cases are:

$$
\|\mathbf{x}\|_1 = \sum_{i=1}^{n}|x_i|, \qquad
\|\mathbf{x}\|_2 = \sqrt{\sum_{i=1}^{n}x_i^2}, \qquad
\|\mathbf{x}\|_{\infty} = \max_i |x_i|
$$

### 1.2 Inner Product and Angle

The inner product of two vectors is:

$$
\mathbf{x}^T \mathbf{y} = \sum_{i=1}^{n} x_i y_i
$$

Geometrically, it can also be written as:

$$
\mathbf{x}^T \mathbf{y} = \|\mathbf{x}\|_2 \|\mathbf{y}\|_2 \cos\theta
$$

So the angle satisfies:

$$
\cos\theta = \frac{\mathbf{x}^T \mathbf{y}}{\|\mathbf{x}\|_2 \|\mathbf{y}\|_2}
$$

If $\mathbf{x}^T \mathbf{y} = 0$, the two vectors are orthogonal.

!!! info Why orthogonality matters
    In linear algebra, orthogonality means two directions do not project onto each other. In machine learning, it often appears as decorrelation or complementary information.

### 1.3 Vector Projection

The projection of $\mathbf{x}$ onto the direction of $\mathbf{u}$ is:

$$
\operatorname{proj}_{\mathbf{u}}(\mathbf{x}) = \frac{\mathbf{x}^T \mathbf{u}}{\mathbf{u}^T \mathbf{u}} \mathbf{u}
$$

If $\mathbf{u}$ is a unit vector, this simplifies to:

$$
\operatorname{proj}_{\mathbf{u}}(\mathbf{x}) = (\mathbf{x}^T \mathbf{u})\mathbf{u}
$$


---

## 2. Matrix Operations

Matrices are algebraic representations of linear transformations and central tools for solving linear systems.

### 2.1 Matrix Multiplication

If $\mathbf{A} \in \mathbb{R}^{m \times n}$ and $\mathbf{B} \in \mathbb{R}^{n \times p}$, then:

$$
\mathbf{C} = \mathbf{A}\mathbf{B} \in \mathbb{R}^{m \times p}
$$

with entries:

$$
c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj}
$$

Matrix multiplication generally does not satisfy commutativity:

$$
\mathbf{A}\mathbf{B} \ne \mathbf{B}\mathbf{A}
$$

but it does satisfy associativity and distributivity:

$$
(\mathbf{A}\mathbf{B})\mathbf{C} = \mathbf{A}(\mathbf{B}\mathbf{C})
$$

$$
\mathbf{A}(\mathbf{B}+\mathbf{C}) = \mathbf{A}\mathbf{B} + \mathbf{A}\mathbf{C}
$$

### 2.2 Transpose, Inverse, and Identity

The transpose of a matrix is defined as:

$$
(\mathbf{A}^T)_{ij} = a_{ji}
$$

If there exists a matrix $\mathbf{A}^{-1}$ such that:

$$
\mathbf{A}\mathbf{A}^{-1} = \mathbf{A}^{-1}\mathbf{A} = \mathbf{I}
$$

then $\mathbf{A}$ is invertible.

For the 2D case:

$$
\mathbf{A} =
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

if ad - bc\
e 0, then:

$$
\mathbf{A}^{-1} = \frac{1}{ad-bc}
\begin{bmatrix}
d & -b \\
-c & a
\end{bmatrix}
$$

### 2.3 Determinant

For a 2 by 2 matrix, the determinant is:

$$
\det(\mathbf{A}) = ad - bc
$$

For a 3 by 3 matrix, the determinant can be expanded along the first row:

$$
\det(\mathbf{A}) = a_{11}C_{11} + a_{12}C_{12} + a_{13}C_{13}
$$

where $C_{ij}$ is the cofactor.

Geometrically, the determinant measures how a linear transformation scales area or volume. If $\det(\mathbf{A}) = 0$, the space is flattened and the matrix is not invertible.


---

## 3. Systems of Linear Equations

A linear system is commonly written as:

$$
\mathbf{A}\mathbf{x} = \mathbf{b}
$$

where $\mathbf{A}$ is the coefficient matrix, $\mathbf{x}$ is the unknown vector, and $\mathbf{b}$ is the constant vector.

### 3.1 Elimination and Rank

The rank of a matrix is written as:

$$
\operatorname{rank}(\mathbf{A})
$$

It is the maximum number of linearly independent rows or columns.

For the system $\mathbf{A}\mathbf{x} = \mathbf{b}$:

- if \operatorname{rank}(\mathbf{A})\
  e \operatorname{rank}([\mathbf{A}\mid\mathbf{b}]), there is no solution
- if $\operatorname{rank}(\mathbf{A}) = \operatorname{rank}([\mathbf{A}\mid\mathbf{b}]) = n$, there is a unique solution
- if $\operatorname{rank}(\mathbf{A}) = \operatorname{rank}([\mathbf{A}\mid\mathbf{b}]) < n$, there are infinitely many solutions

### 3.2 Least Squares Solution

When a system is overdetermined, it is usually impossible to satisfy every equation exactly. Then we solve:

$$
\min_{\mathbf{x}} \|\mathbf{A}\mathbf{x} - \mathbf{b}\|_2^2
$$

Its normal equation is:

$$
\mathbf{A}^T \mathbf{A}\mathbf{x} = \mathbf{A}^T \mathbf{b}
$$

If $\mathbf{A}^T \mathbf{A}$ is invertible, then:

$$
\hat{\mathbf{x}} = (\mathbf{A}^T \mathbf{A})^{-1}\mathbf{A}^T \mathbf{b}
$$

This formula appears constantly in linear regression and data fitting.


---

## 4. Eigenvalues and Eigenvectors

The eigenvalue problem describes special directions that are scaled by a linear transformation without changing direction.

### 4.1 Definition

If there exists a nonzero vector $\mathbf{v}$ and scalar $\lambda$ such that:

$$
\mathbf{A}\mathbf{v} = \lambda \mathbf{v}
$$

then $\lambda$ is an eigenvalue of $\mathbf{A}$ and $\mathbf{v}$ is a corresponding eigenvector.

Eigenvalues are determined by the characteristic equation:

$$
\det(\mathbf{A} - \lambda \mathbf{I}) = 0
$$

### 4.2 Diagonalization

If $\mathbf{A}$ has $n$ linearly independent eigenvectors, then:

$$
\mathbf{A} = \mathbf{P}\mathbf{\Lambda}\mathbf{P}^{-1}
$$

where:

$$
\mathbf{\Lambda} =
\begin{bmatrix}
\lambda_1 & 0 & \cdots & 0 \\
0 & \lambda_2 & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & \lambda_n
\end{bmatrix}
$$

So matrix powers can be computed efficiently:

$$
\mathbf{A}^k = \mathbf{P}\mathbf{\Lambda}^k\mathbf{P}^{-1}
$$

!!! tip Why diagonalize
    Diagonal matrices are easy to compute with. If a complicated matrix can be turned into a similar diagonal matrix, many problems become much simpler immediately.


---

## 5. Orthogonal Matrices and Factorizations

Matrix factorization is a core tool in numerical computation, compression, and machine learning.

### 5.1 Orthogonal Matrix

If a matrix $\mathbf{Q}$ satisfies:

$$
\mathbf{Q}^T \mathbf{Q} = \mathbf{Q}\mathbf{Q}^T = \mathbf{I}
$$

then $\mathbf{Q}$ is orthogonal.

Orthogonal matrices preserve lengths and angles:

$$
\|\mathbf{Q}\mathbf{x}\|_2 = \|\mathbf{x}\|_2
$$

### 5.2 QR Decomposition

Any full-column-rank matrix can be written as:

$$
\mathbf{A} = \mathbf{Q}\mathbf{R}
$$

where the columns of $\mathbf{Q}$ are orthonormal and $\mathbf{R}$ is upper triangular.

QR decomposition is widely used for least squares problems and eigenvalue computation.

### 5.3 Singular Value Decomposition

Any matrix $\mathbf{A} \in \mathbb{R}^{m \times n}$ can be decomposed as:

$$
\mathbf{A} = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T
$$

where:

- $\mathbf{U}$ and $\mathbf{V}$ are orthogonal matrices
- $\mathbf{\Sigma}$ is diagonal with nonnegative entries
- the diagonal entries $\sigma_1 \ge \sigma_2 \ge \cdots \ge 0$ are singular values

The truncated SVD gives a low-rank approximation:

$$
\mathbf{A}_k = \sum_{i=1}^{k} \sigma_i \mathbf{u}_i \mathbf{v}_i^T
$$

It is widely used in recommendation systems, principal component analysis, and image compression.


---

## 6. Quadratic Forms and Positive Definite Matrices

A quadratic form is often written as:

$$
q(\mathbf{x}) = \mathbf{x}^T \mathbf{A}\mathbf{x}
$$

If for every nonzero vector $\mathbf{x}$ we have:

$$
\mathbf{x}^T \mathbf{A}\mathbf{x} > 0
$$

then the symmetric matrix $\mathbf{A}$ is positive definite, written as:

$$
\mathbf{A} \succ 0
$$

Positive definite matrices correspond to bowl-shaped geometry in optimization, which is why they are closely tied to unique local minima.


---

## 7. Quick Reference

|Category |Formula |Use |
|---|---|---|
|Inner product |$\mathbf{x}^T \mathbf{y}$ |Measure directional relation |
|Projection |$\frac{\mathbf{x}^T \mathbf{u}}{\mathbf{u}^T \mathbf{u}}\mathbf{u}$ |Component decomposition |
|Inverse matrix |$\mathbf{A}^{-1}$ |Exact solution of linear systems |
|Characteristic equation |$\det(\mathbf{A} - \lambda \mathbf{I}) = 0$ |Find eigenvalues |
|Least squares |$(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\mathbf{b}$ |Fitting and estimation |
|SVD |$\mathbf{A} = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T$ |Dimensionality reduction and compression |

The real power of linear algebra is that it gives a common language of vectors, matrices, and transformations. Once that language is in place, many seemingly different engineering and data problems can be understood in the same framework.
