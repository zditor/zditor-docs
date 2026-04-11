---
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
col:
  type: array
  description: 
  label: Col
  value: ["subject","title","description"]
warm:
  type: checkbox
  description: warm
  label: 暖色调
  value: true
avatar:
  type: asset
  description: 
  label: Avatar
  value: "../../../assets/nanobanana-avatar.svg"
subject:
  type: text
  description: 
  label: Subject
  value: "Math Showcase"
cover:
  type: asset
  description: 
  label: Cover Image
  value: "../../../assets/math/math-formulas-cover.jpg"
author:
  type: text
  description: 
  label: Author
  value: "SeeLey & Codex"
display:
  type: checkbox
  description: display
  label: Eigenschaften anzeigen
  value: false
tags:
  type: text
  description: 
  label: Tags
  value: "Formel-Demo · LaTeX · Layout · Beispiele"
title:
  type: text
  description: 
  label: Title
  value: "Beispiele fuer Formelsatz"
description:
  type: text
  description: 
  label: Description
  value: "Blockformeln · Mehrzeilige Herleitungen · Fallunterscheidungen · Matrizen · Tabellen"
---
# Beispiele fuer Formelsatz

Dieses Dokument zeigt typische Muster fuer mathematischen Formelsatz in Zditor: Inline-Formeln, Blockformeln, mehrzeilige Herleitungen, Fallunterscheidungen, Matrizen und Formeln in Tabellen.


---

## 1. Inline- und Blockformeln

Inline-Formeln eignen sich fuer kurze Ausdruecke wie $E = mc^2$ oder $S = \pi r^2$.

Blockformeln eignen sich fuer zentrale Aussagen:

$$
\int_{-\infty}^{\infty} e^{-x^2}\,dx = \sqrt{\pi}
$$

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$


---

## 2. Mehrzeilige Herleitungen

$$
\frac{d}{dx}\sin(x^2)
= \cos(x^2)\cdot \frac{d}{dx}(x^2)
= 2x\cos(x^2)
$$

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


---

## 3. Fallunterscheidungen

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


---

## 4. Matrizen und Vektoren

$$
\mathbf{x} =
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix}
$$

$$
\mathbf{A} =
\begin{bmatrix}
a_{11} & a_{12} \\
a_{21} & a_{22}
\end{bmatrix}
$$

$$
\mathbf{A}\mathbf{x} =
\begin{bmatrix}
a_{11}x_1 + a_{12}x_2 \\
a_{21}x_1 + a_{22}x_2
\end{bmatrix}
$$


---

## 5. Formeln in Tabellen

|Kategorie |Formel |Hinweis |
|---|---|---|
|Ableitung |$\frac{d}{dx}x^n = nx^{n-1}$ |Kurz und gut lesbar |
|Integral |$\int e^x\,dx = e^x + C$ |Nicht zu lang machen |
|Wahrscheinlichkeit |$P(A \mid B) = \frac{P(A \cap B)}{P(B)}$ |Gut fuer Uebersichten |
|Lineare Algebra |$\mathbf{A}\mathbf{x} = \mathbf{b}$ |Gut fuer Definitionen |

!!! warning Tabellenregel
    Tabellen eignen sich vor allem fuer kurze Formeln. Fuer Matrizen, Fallunterscheidungen oder laengere Herleitungen sind eigene Blockformeln klarer.

