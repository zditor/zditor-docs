---
tags:
  type: text
  description:
  label: Tags
  value: "Chemie · Formeln · Reaktionen · Thermodynamik · Elektrochemie"
description:
  type: text
  description:
  label: Description
  value: "Stoechiometrie · Gleichgewicht · Thermochemie · Kinetik · Elektrochemie"
title:
  type: text
  description:
  label: Title
  value: "Chemie Formeln und Reaktionen"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../../assets/math/chemistry-formulas-cover.svg"
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
  value: "Chemie"
---
# Chemie Formeln und Reaktionen

Die Chemie untersucht Stoffe, Zusammensetzung, Reaktionen, Energieaenderungen und Reaktionsgeschwindigkeiten. Dieses Dokument fasst haeufige Formeln aus Stoechiometrie, Gleichgewicht, Thermochemie, Kinetik, Saeure-Base-Systemen und Elektrochemie zusammen.


---

## 1. Stoffmenge und Konzentration

Stoffmenge:

$$
n = \frac{m}{M}
$$

Mit Teilchenzahl:

$$
n = \frac{N}{N_A}
$$

Avogadro-Konstante:

$$
N_A = 6.022 \times 10^{23}\ \text{mol}^{-1}
$$

Stoffmengenkonzentration:

$$
c = \frac{n}{V}
$$

Verduennung:

$$
c_1 V_1 = c_2 V_2
$$

Ideales Gas:

$$
PV = nRT
$$


---

## 2. Reaktionsgleichungen und Gleichgewicht

Allgemeine Reaktion:

$$
\alpha A + \beta B \rightarrow \gamma C + \delta D
$$

Reaktionsfortschritt:

$$
dn_i = \nu_i\,d\xi
$$

Gleichgewichtskonstante:

$$
K_c = \frac{[C]^c[D]^d}{[A]^a[B]^b}
$$

Druckform:

$$
K_p = \frac{(P_C)^c(P_D)^d}{(P_A)^a(P_B)^b}
$$


---

## 3. Thermochemie und Kinetik

Enthalpieaenderung:

$$
\Delta H = H_{\text{Produkte}} - H_{\text{Edukte}}
$$

Entropieaenderung:

$$
\Delta S = S_{\text{Produkte}} - S_{\text{Edukte}}
$$

Freie Gibbs-Energie:

$$
\Delta G = \Delta H - T\Delta S
$$

Beziehung zu Gleichgewicht:

$$
\Delta G^\circ = -RT\ln K
$$

Geschwindigkeitsgesetz:

$$
v = k[A]^m[B]^n
$$

Arrhenius-Gleichung:

$$
k = A e^{-E_a/(RT)}
$$


---

## 4. Saeure-Base und Elektrochemie

Wasserionenprodukt:

$$
K_w = [\mathrm{H^+}][\mathrm{OH^-}]
$$

pH-Definition:

$$
\mathrm{pH} = -\log_{10}[\mathrm{H^+}]
$$

Saeurekonstante:

$$
K_a = \frac{[\mathrm{H^+}][\mathrm{A^-}]}{[\mathrm{HA}]}
$$

Henderson-Hasselbalch:

$$
\mathrm{pH} = \mathrm{p}K_a + \log\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}
$$

Nernst-Gleichung:

$$
E = E^\circ - \frac{RT}{nF}\ln Q
$$


---

## 5. Schnelluebersicht

|Kategorie |Formel |Zweck |
|---|---|---|
|Stoffmenge |$n = \frac{m}{M}$ |Masse in mol |
|Konzentration |$c=\frac{n}{V}$ |Loesungen |
|Gasgesetz |$PV=nRT$ |Gase |
|Gleichgewicht |$K_c=\frac{[C]^c[D]^d}{[A]^a[B]^b}$ |Reaktionslage |
|Freie Energie |$\Delta G=\Delta H-T\Delta S$ |Spontanitaet |
|Nernst |$E=E^\circ-\frac{RT}{nF}\ln Q$ |Elektrochemie |
