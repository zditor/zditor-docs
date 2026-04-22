---
col:
  type: array
  description: 
  label: Col
  value: ["subject","title","description"]
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
description:
  type: text
  description: 
  label: Description
  value: "Vektorraeume · Matrixoperationen · Lineare Abbildungen · Eigenwerte · Singulaerwertzerlegung"
subject:
  type: text
  description: 
  label: Subject
  value: "Lineare Algebra"
cover:
  type: asset
  description: 
  label: Cover Image
  value: "../../assets/math/math-formulas-cover.jpg"
tags:
  type: text
  description: 
  label: Tags
  value: "Lineare Algebra · Formeln · Matrizen · Vektoren"
title:
  type: text
  description: 
  label: Title
  value: "Lineare Algebra Formelsammlung"
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
---
# Lineare Algebra Formelsammlung

Die lineare Algebra untersucht Vektoren, Matrizen, lineare Gleichungssysteme und lineare Abbildungen. Sie ist eine Grundlage fuer moderne Mathematik, Physik, Computergrafik, maschinelles Lernen und Optimierung.


---

## 1. Vektoren und Skalarprodukt

Ein $n$-dimensionaler Vektor:

$$
\mathbf{x} =
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix}
$$

$p$-Norm:

$$
\|\mathbf{x}\|_p = \left(\sum_{i=1}^{n}|x_i|^p\right)^{1/p}
$$

Spezialfaelle:

$$
\|\mathbf{x}\|_1 = \sum |x_i|, \qquad
\|\mathbf{x}\|_2 = \sqrt{\sum x_i^2}, \qquad
\|\mathbf{x}\|_{\infty} = \max_i |x_i|
$$

Skalarprodukt:

$$
\mathbf{x}^T\mathbf{y} = \sum_{i=1}^{n} x_i y_i
$$

Winkelbeziehung:

$$
\cos\theta = \frac{\mathbf{x}^T\mathbf{y}}{\|\mathbf{x}\|_2\|\mathbf{y}\|_2}
$$

Projektion:

$$
\operatorname{proj}_{\mathbf{u}}(\mathbf{x}) = \frac{\mathbf{x}^T\mathbf{u}}{\mathbf{u}^T\mathbf{u}}\mathbf{u}
$$


---

## 2. Matrixoperationen

Wenn $\mathbf{A} \in \mathbb{R}^{m \times n}$ und $\mathbf{B} \in \mathbb{R}^{n \times p}$, dann gilt:

$$
\mathbf{C} = \mathbf{A}\mathbf{B}
$$

mit

$$
c_{ij} = \sum_{k=1}^{n} a_{ik}b_{kj}
$$

Matrixmultiplikation ist im Allgemeinen nicht kommutativ:

$$
\mathbf{A}\mathbf{B} \ne \mathbf{B}\mathbf{A}
$$

Transposition:

$$
(\mathbf{A}^T)_{ij} = a_{ji}
$$

Fuer

$$
\mathbf{A} =
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}
$$

gilt

$$
\det(\mathbf{A}) = ad - bc
$$

und bei ad-bc\
e 0:

$$
\mathbf{A}^{-1} = \frac{1}{ad-bc}
\begin{bmatrix}
d & -b \\
-c & a
\end{bmatrix}
$$


---

## 3. Lineare Gleichungssysteme

Ein lineares Gleichungssystem hat die Form:

$$
\mathbf{A}\mathbf{x} = \mathbf{b}
$$

Der Rang:

$$
\operatorname{rank}(\mathbf{A})
$$

bestimmt die Loesbarkeit.

- Ist \operatorname{rank}(\mathbf{A})\
  e \operatorname{rank}([\mathbf{A}\mid\mathbf{b}]), gibt es keine Loesung.
- Ist der gemeinsame Rang gleich der Zahl der Unbekannten, gibt es genau eine Loesung.
- Ist der gemeinsame Rang kleiner, gibt es unendlich viele Loesungen.

Kleinste-Quadrate-Problem:

$$
\min_{\mathbf{x}}\|\mathbf{A}\mathbf{x} - \mathbf{b}\|_2^2
$$

Normalengleichung:

$$
\mathbf{A}^T\mathbf{A}\mathbf{x} = \mathbf{A}^T\mathbf{b}
$$

Loesung:

$$
\hat{\mathbf{x}} = (\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\mathbf{b}
$$


---

## 4. Eigenwerte und Eigenvektoren

Eigenwertgleichung:

$$
\mathbf{A}\mathbf{v} = \lambda \mathbf{v}
$$

Charakteristische Gleichung:

$$
\det(\mathbf{A} - \lambda \mathbf{I}) = 0
$$

Ist $\mathbf{A}$ diagonalisierbar, dann:

$$
\mathbf{A} = \mathbf{P}\mathbf{\Lambda}\mathbf{P}^{-1}
$$

und damit

$$
\mathbf{A}^k = \mathbf{P}\mathbf{\Lambda}^k\mathbf{P}^{-1}
$$

!!! tip Nutzen
    Diagonalmatrizen sind leicht zu berechnen. Deshalb vereinfacht eine Diagonalisierung viele Probleme sofort.


---

## 5. Orthogonale Matrizen und Zerlegungen

Eine Matrix $\mathbf{Q}$ ist orthogonal, wenn:

$$
\mathbf{Q}^T\mathbf{Q} = \mathbf{I}
$$

Dann bleiben Laengen und Winkel erhalten:

$$
\|\mathbf{Q}\mathbf{x}\|_2 = \|\mathbf{x}\|_2
$$

QR-Zerlegung:

$$
\mathbf{A} = \mathbf{Q}\mathbf{R}
$$

Singulaerwertzerlegung:

$$
\mathbf{A} = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T
$$

Trunkierte SVD:

$$
\mathbf{A}_k = \sum_{i=1}^{k} \sigma_i \mathbf{u}_i \mathbf{v}_i^T
$$


---

## 6. Quadratische Formen

Eine quadratische Form lautet:

$$
q(\mathbf{x}) = \mathbf{x}^T\mathbf{A}\mathbf{x}
$$

Ist fuer alle \mathbf{x}\
e 0:

$$
\mathbf{x}^T\mathbf{A}\mathbf{x} > 0
$$

dann ist $\mathbf{A}$ positiv definit.


---

## 7. Schnelluebersicht

|Kategorie |Formel |Zweck |
|---|---|---|
|Skalarprodukt |$\mathbf{x}^T\mathbf{y}$ |Richtungsbeziehung |
|Projektion |$\frac{\mathbf{x}^T\mathbf{u}}{\mathbf{u}^T\mathbf{u}}\mathbf{u}$ |Zerlegung |
|Inverse |$\mathbf{A}^{-1}$ |Exakte Loesung |
|Eigenwerte |$\det(\mathbf{A}-\lambda \mathbf{I})=0$ |Spektralanalyse |
|Kleinste Quadrate |$(\mathbf{A}^T\mathbf{A})^{-1}\mathbf{A}^T\mathbf{b}$ |Schaetzung |
|SVD |$\mathbf{A}=\mathbf{U}\mathbf{\Sigma}\mathbf{V}^T$ |Kompression und Reduktion |

Die lineare Algebra gibt vielen unterschiedlichen Problemen dieselbe Sprache. Genau deshalb ist sie fuer Technik und Datenwissenschaft so zentral.
