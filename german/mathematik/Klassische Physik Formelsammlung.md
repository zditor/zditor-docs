---
tags:
  type: text
  description:
  label: Tags
  value: "Physik · Formeln · Referenz"
description:
  type: text
  description:
  label: Description
  value: "Mechanik · Elektromagnetismus · Thermodynamik · Wellen · Relativitaet"
title:
  type: text
  description:
  label: Title
  value: "Klassische Physik Formelsammlung"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../../assets/math/physics-formulas-cover.jpg"
col:
  type: array
  description:
  label: Col
  value: ["subject","title","description"]
warm:
  type: checkbox
  description: warm
  label: Warmer Farbton
  value: false
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
  value: "Physik"
---
# Klassische Physik Formelsammlung

Die Physik untersucht Materie, Energie und ihre Wechselwirkungen. Dieses Dokument sammelt zentrale Formeln aus Mechanik, Energie, Schwingungen, Elektromagnetismus, Thermodynamik und grundlegenden modernen Themen.


---

## 1. Mechanik

Newtons zweites Gesetz:

$$
\mathbf{F} = m\mathbf{a} = \frac{d\mathbf{p}}{dt}
$$

Impuls:

$$
\mathbf{p} = m\mathbf{v}
$$

Gleichmaessig beschleunigte Bewegung:

$$
x = x_0 + v_0 t + \frac{1}{2}at^2
$$

$$
v = v_0 + at
$$

$$
v^2 = v_0^2 + 2a(x-x_0)
$$

Zentripetalbeschleunigung:

$$
a_c = \frac{v^2}{r} = \omega^2 r
$$


---

## 2. Arbeit, Energie und Impuls

Arbeit:

$$
W = \int \mathbf{F}\cdot d\mathbf{r}
$$

Kinetische Energie:

$$
E_k = \frac{1}{2}mv^2
$$

Lageenergie:

$$
E_p = mgh
$$

Federenergie:

$$
E_p = \frac{1}{2}kx^2
$$

Impulsstoss:

$$
\mathbf{I} = \int \mathbf{F}\,dt = \Delta \mathbf{p}
$$

Impulserhaltung:

$$
\sum_i \mathbf{p}_i = \text{konstant}
$$


---

## 3. Schwingungen und Wellen

Harmonische Schwingung:

$$
x(t) = A\cos(\omega t + \phi)
$$

$$
a(t) = -\omega^2 x(t)
$$

Feder-Masse-System:

$$
\omega = \sqrt{\frac{k}{m}}
$$

Wellengeschwindigkeit:

$$
v = f\lambda
$$


---

## 4. Elektrizitaet und Magnetismus

Coulomb-Gesetz:

$$
F = k\frac{|q_1 q_2|}{r^2}
$$

Elektrisches Feld:

$$
\mathbf{E} = \frac{\mathbf{F}}{q}
$$

Ohmsches Gesetz:

$$
V = IR
$$

Leistung:

$$
P = IV = I^2R = \frac{V^2}{R}
$$

Magnetische Kraft:

$$
\mathbf{F} = q\mathbf{v}\times\mathbf{B}
$$

Induktion:

$$
\mathcal{E} = -\frac{d\Phi_B}{dt}
$$


---

## 5. Thermodynamik und Grundlagen

Ideale Gasgleichung:

$$
PV = nRT
$$

Erster Hauptsatz:

$$
\Delta U = Q - W
$$

Carnot-Wirkungsgrad:

$$
\eta_{\text{Carnot}} = 1 - \frac{T_C}{T_H}
$$

Masse-Energie-Aequivalenz:

$$
E = mc^2
$$

Photonenenergie:

$$
E = h\nu
$$

Unschärferelation:

$$
\Delta x \Delta p \ge \frac{\hbar}{2}
$$


---

## 6. Schnelluebersicht

|Bereich |Formel |Zweck |
|---|---|---|
|Dynamik |$\mathbf{F}=m\mathbf{a}$ |Kraefte und Bewegung |
|Energie |$E_k=\frac{1}{2}mv^2$ |Mechanische Energie |
|Kreisbewegung |$a_c=\frac{v^2}{r}$ |Rotation |
|Schaltung |$V=IR$ |Elektrische Analyse |
|Gasgesetz |$PV=nRT$ |Thermodynamik |
|Relativitaet |$E=mc^2$ |Masse und Energie |
