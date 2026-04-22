---
tags:
  type: text
  description:
  label: Tags
  value: "Formel-Demo · Herleitung · Analysis · Optimierung"
description:
  type: text
  description:
  label: Description
  value: "Schrittweise Herleitungen · Kettenregel · Kleinste Quadrate · Newton-Verfahren"
title:
  type: text
  description:
  label: Title
  value: "Beispiele fuer Herleitungen"
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
# Beispiele fuer Herleitungen

Dieses Dokument zeigt, wie man mathematische Herleitungen in Zditor klar strukturiert. Im Mittelpunkt stehen fortlaufende Blockformeln, kurze Erklaerungen und gut platzierte Hinweisboxen.


---

## 1. Kettenregel

Sei

$$
y = \sin(x^2 + 1)
$$

mit Zwischenvariable

$$
u = x^2 + 1
$$

Dann gilt:

$$
\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}
$$

also:

$$
\frac{dy}{dx} = \cos(x^2 + 1)\cdot 2x
$$


---

## 2. Kleinste-Quadrate-Loesung

Zielfunktion:

$$
J(\boldsymbol{\beta}) = \|\mathbf{y} - \mathbf{X}\boldsymbol{\beta}\|_2^2
$$

Ausmultipliziert:

$$
J(\boldsymbol{\beta})
= \mathbf{y}^T\mathbf{y}
- 2\mathbf{y}^T\mathbf{X}\boldsymbol{\beta}
+ \boldsymbol{\beta}^T\mathbf{X}^T\mathbf{X}\boldsymbol{\beta}
$$

Gradient:

$$
\nabla_{\boldsymbol{\beta}}J
= -2\mathbf{X}^T\mathbf{y}
+ 2\mathbf{X}^T\mathbf{X}\boldsymbol{\beta}
$$

Durch Nullsetzen:

$$
\mathbf{X}^T\mathbf{X}\boldsymbol{\beta} = \mathbf{X}^T\mathbf{y}
$$

Ergibt sich:

$$
\hat{\boldsymbol{\beta}} = (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{y}
$$


---

## 3. Geometrische Reihe

$$
S_n = a + ar + ar^2 + \cdots + ar^{n-1}
$$

$$
rS_n = ar + ar^2 + \cdots + ar^n
$$

Subtraktion liefert:

$$
S_n - rS_n = a - ar^n
$$

also:

$$
S_n = \frac{a(1-r^n)}{1-r}
$$

Fuer $|r| < 1$ und $n \to \infty$:

$$
\sum_{k=0}^{\infty} ar^k = \frac{a}{1-r}
$$


---

## 4. Newton-Verfahren

Lineare Approximation von $f(x)$ um $x_n$:

$$
f(x) \approx f(x_n) + f'(x_n)(x-x_n)
$$

Setzt man die Approximation gleich null, folgt:

$$
0 = f(x_n) + f'(x_n)(x_{n+1}-x_n)
$$

und damit:

$$
x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}
$$

!!! tip Warum das gut als Demo funktioniert
    Herleitungen zeigen nicht nur das Endergebnis, sondern auch die Struktur des Denkwegs. Genau das macht Formel-Dokumente anschaulicher.
