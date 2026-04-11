---
tags:
  type: text
  description:
  label: Tags
  value: "Statistik · Formeln · Wahrscheinlichkeit · Inferenz"
description:
  type: text
  description:
  label: Description
  value: "Deskriptive Statistik · Verteilungen · Schaetzung · Hypothesentests · Regression"
title:
  type: text
  description:
  label: Title
  value: "Statistik Formelsammlung"
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
  value: "Statistik"
---
# Statistik Formelsammlung

Die Statistik untersucht, wie man Informationen aus Daten gewinnt, Muster beschreibt und unter Unsicherheit Schlussfolgerungen zieht. Sie verbindet Wahrscheinlichkeitstheorie, Datenanalyse und wissenschaftliche Entscheidungen. Dieses Dokument fasst haeufig genutzte statistische Formeln zusammen und erklaert ihre praktische Rolle.


---

## 1. Deskriptive Statistik

Die deskriptive Statistik beschreibt Lage, Streuung und Form einer Datenverteilung. Sie ist fast immer der erste Schritt einer Analyse.

### 1.1 Mittelwert, Median und Modus

Der Stichprobenmittelwert ist:

$$
\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i
$$

Der gewichtete Mittelwert ist:

$$
\bar{x}_w = \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i}
$$

Der Median ist der mittlere Wert nach dem Sortieren, der Modus der haeufigste Wert. Bei schiefen Verteilungen ist der Median oft robuster als der Mittelwert.

### 1.2 Varianz und Standardabweichung

Populationsvarianz:

$$
\sigma^2 = \frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2
$$

Stichprobenvarianz:

$$
s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2
$$

Standardabweichung:

$$
\sigma = \sqrt{\sigma^2}, \qquad s = \sqrt{s^2}
$$

### 1.3 Kovarianz und Korrelation

Kovarianz:

$$
\operatorname{Cov}(X, Y) = \mathbb{E}[(X - \mu_X)(Y - \mu_Y)]
$$

Stichprobenkovarianz:

$$
s_{XY} = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})
$$

Pearson-Korrelation:

$$
r = \frac{s_{XY}}{s_X s_Y}
$$

!!! tip Interpretation
    Werte nahe 1 zeigen einen starken positiven linearen Zusammenhang, Werte nahe -1 einen starken negativen und Werte nahe 0 einen schwachen linearen Zusammenhang.


---

## 2. Wahrscheinlichkeitsverteilungen

Statistische Inferenz baut auf Wahrscheinlichkeitsmodellen auf. Unterschiedliche Verteilungen beschreiben unterschiedliche Datentypen.

### 2.1 Diskrete Verteilungen

Bernoulli-Verteilung:

$$
P(X = x) = p^x (1-p)^{1-x}, \qquad x \in \{0, 1\}
$$

$$
\mathbb{E}[X] = p, \qquad \operatorname{Var}(X) = p(1-p)
$$

Binomialverteilung:

$$
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}
$$

$$
\mathbb{E}[X] = np, \qquad \operatorname{Var}(X) = np(1-p)
$$

Poisson-Verteilung:

$$
P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}
$$

$$
\mathbb{E}[X] = \lambda, \qquad \operatorname{Var}(X) = \lambda
$$

### 2.2 Stetige Verteilungen

Normalverteilung:

$$
f(x) = \frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

Standardisierung:

$$
Z = \frac{X - \mu}{\sigma}
$$

Exponentialverteilung:

$$
f(x) = \lambda e^{-\lambda x}, \qquad x \ge 0
$$

$$
\mathbb{E}[X] = \frac{1}{\lambda}, \qquad \operatorname{Var}(X) = \frac{1}{\lambda^2}
$$


---

## 3. Parameterschaetzung

Ziel der Parameterschaetzung ist es, unbekannte Populationsparameter mit Stichproben zu approximieren.

### 3.1 Punktschaetzung

Schaetzer fuer den Mittelwert:

$$
\hat{\mu} = \bar{x}
$$

Schaetzer fuer die Varianz:

$$
\hat{\sigma}^2 = s^2
$$

Fuer ein Bernoulli-Modell ist der Maximum-Likelihood-Schaetzer von $p$:

$$
\hat{p} = \frac{1}{n}\sum_{i=1}^{n} x_i
$$

### 3.2 Maximum-Likelihood

Likelihood:

$$
L(\theta) = \prod_{i=1}^{n} f(x_i \mid \theta)
$$

Log-Likelihood:

$$
\ell(\theta) = \sum_{i=1}^{n}\log f(x_i \mid \theta)
$$

MLE:

$$
\hat{\theta}_{\mathrm{MLE}} = \arg\max_{\theta} \ell(\theta)
$$

### 3.3 Konfidenzintervalle

Konfidenzintervall fuer den Mittelwert bei bekannter Varianz:

$$
\bar{x} \pm z_{\alpha/2}\frac{\sigma}{\sqrt{n}}
$$

Bei unbekannter Varianz:

$$
\bar{x} \pm t_{\alpha/2,\,n-1}\frac{s}{\sqrt{n}}
$$

!!! warning Bedeutung
    Ein 95-Prozent-Konfidenzintervall bedeutet nicht, dass der Parameter mit 95 Prozent Wahrscheinlichkeit in genau diesem Intervall liegt.


---

## 4. Hypothesentests

Ein Hypothesentest prueft, ob die Stichprobe genug Evidenz gegen die Nullhypothese liefert.

Ein-Stichproben-$z$-Test:

$$
Z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}
$$

Ein-Stichproben-$t$-Test:

$$
T = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}
$$

Ablehnungsregel:

$$
p \le \alpha
$$

Chi-Quadrat-Statistik:

$$
\chi^2 = \sum_{i=1}^{k}\frac{(O_i - E_i)^2}{E_i}
$$


---

## 5. Regression

Einfache lineare Regression:

$$
y_i = \beta_0 + \beta_1 x_i + \varepsilon_i
$$

Methode der kleinsten Quadrate:

$$
S(\beta_0, \beta_1) = \sum_{i=1}^{n}(y_i - \beta_0 - \beta_1 x_i)^2
$$

Loesung:

$$
\hat{\beta}_1 = \frac{\sum_{i=1}^{n}(x_i-\bar{x})(y_i-\bar{y})}{\sum_{i=1}^{n}(x_i-\bar{x})^2}
$$

$$
\hat{\beta}_0 = \bar{y} - \hat{\beta}_1\bar{x}
$$

Bestimmtheitsmass:

$$
R^2 = 1 - \frac{\sum_{i=1}^{n}(y_i-\hat{y}_i)^2}{\sum_{i=1}^{n}(y_i-\bar{y})^2}
$$


---

## 6. Schnelluebersicht

|Kategorie |Formel |Zweck |
|---|---|---|
|Mittelwert |$\bar{x} = \frac{1}{n}\sum x_i$ |Lage |
|Varianz |$s^2 = \frac{1}{n-1}\sum (x_i-\bar{x})^2$ |Streuung |
|Korrelation |$r = \frac{s_{XY}}{s_X s_Y}$ |Linearer Zusammenhang |
|Standardisierung |$z = \frac{x-\mu}{\sigma}$ |Vergleichbarkeit |
|Konfidenzintervall |Schaetzer $\pm$ kritischer Wert $\times$ Standardfehler |Unsicherheit |
|Teststatistik |Differenz / Standardfehler |Signifikanz |

Die Statistik ist mehr als das Einsetzen in Formeln. Gute Statistik macht Unsicherheit sichtbar und verbindet Modellannahmen, Rechenweg und Interpretation.
