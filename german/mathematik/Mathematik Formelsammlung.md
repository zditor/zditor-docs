---
tags:
  type: text
  description:
  label: Tags
  value: "Mathematik · Formeln · Referenz"
description:
  type: text
  description:
  label: Description
  value: "Analysis · Lineare Algebra · Wahrscheinlichkeit · Statistik · Optimierung"
title:
  type: text
  description:
  label: Title
  value: "Mathematik Formelsammlung"
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
  value: "Mathematik"
---
# Mathematik Formelsammlung

Die Mathematik ist die Sprache von Naturwissenschaft, Technik, Datenanalyse und Optimierung. Dieses Dokument ordnet haeufig genutzte Formeln aus Analysis, linearer Algebra, Wahrscheinlichkeit, Statistik und Optimierung und verbindet sie mit kurzen Erklaerungen.


---

## 1. Grundlagen der Analysis

### 1.1 Grenzwerte

Wichtige Standardgrenzwerte:

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

### 1.2 Ableitungen

Definition:

$$
f'(x) = \lim_{h \to 0}\frac{f(x+h)-f(x)}{h}
$$

Wichtige Regeln:

|Funktion |Ableitung |
|---|---|
|$c$ |$0$ |
|$x^n$ |$nx^{n-1}$ |
|$e^x$ |$e^x$ |
|$\ln x$ |$\frac{1}{x}$ |
|$\sin x$ |$\cos x$ |
|$\cos x$ |$-\sin x$ |

Produktregel:

$$
\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)
$$

Kettenregel:

$$
\frac{d}{dx}f(g(x)) = f'(g(x))g'(x)
$$

### 1.3 Integrale

Unbestimmtes Integral:

$$
\int f(x)\,dx = F(x) + C
$$

|Funktion |Integral |
|---|---|
|$x^n$ |$\frac{x^{n+1}}{n+1}+C,\; n \ne -1$ |
|$\frac{1}{x}$ |$\ln|x|+C$ |
|$e^x$ |$e^x+C$ |
|$\sin x$ |$-\cos x + C$ |
|$\cos x$ |$\sin x + C$ |

Partielle Integration:

$$
\int u\,dv = uv - \int v\,du
$$


---

## 2. Lineare Algebra und Wahrscheinlichkeit

Euklidische Norm:

$$
\|\mathbf{x}\|_2 = \sqrt{\sum_{i=1}^{n}x_i^2}
$$

Skalarprodukt:

$$
\mathbf{x}^T\mathbf{y} = \sum_{i=1}^{n}x_i y_i
$$

Matrixinverse im 2x2-Fall:

$$
\mathbf{A}^{-1} = \frac{1}{ad-bc}
\begin{bmatrix}
d & -b \\
-c & a
\end{bmatrix}
$$

Bedingte Wahrscheinlichkeit:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}
$$

Bayes-Formel:

$$
P(A \mid B) = \frac{P(B \mid A)P(A)}{P(B)}
$$

Erwartungswert:

$$
\mathbb{E}[X] = \sum_x xP(X=x)
\quad \text{oder} \quad
\mathbb{E}[X] = \int x f(x)\,dx
$$

Varianz:

$$
\operatorname{Var}(X) = \mathbb{E}[(X-\mu)^2]
$$


---

## 3. Statistik und Optimierung

Stichprobenmittelwert:

$$
\bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_i
$$

Stichprobenvarianz:

$$
s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2
$$

Konfidenzintervall:

$$
\bar{x} \pm z_{\alpha/2}\frac{\sigma}{\sqrt{n}}
$$

Gradientenabstieg:

$$
x_{t+1} = x_t - \eta \nabla f(x_t)
$$

Newton-Verfahren:

$$
x_{t+1} = x_t - \frac{f'(x_t)}{f''(x_t)}
$$

Lagrange-Funktion:

$$
\mathcal{L}(x,y,\lambda) = f(x,y) - \lambda g(x,y)
$$


---

## 4. Schnelluebersicht

|Bereich |Formel |Zweck |
|---|---|---|
|Grenzwert |$\lim_{x \to 0}\frac{\sin x}{x}=1$ |Analysis |
|Ableitung |$\frac{d}{dx}x^n = nx^{n-1}$ |Aenderung |
|Integral |$\int x^n dx = \frac{x^{n+1}}{n+1}+C$ |Akkumulation |
|Bayes |$P(A \mid B)=\frac{P(B \mid A)P(A)}{P(B)}$ |Inferenz |
|Mittelwert |$\bar{x} = \frac{1}{n}\sum x_i$ |Statistik |
|Gradientenabstieg |$x_{t+1}=x_t-\eta\nabla f(x_t)$ |Optimierung |

Eine gute Formelsammlung verknuepft Notation, Bedeutung und Einsatz. Dann werden Formeln zu einem Werkzeug statt zu isolierten Symbolen.
