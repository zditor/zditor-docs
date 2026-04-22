---
tags:
  type: text
  description:
  label: Tags
  value: "Chemistry · Formulas · Reactions · Thermodynamics · Electrochemistry"
description:
  type: text
  description:
  label: Description
  value: "Stoichiometry · Equilibrium · Thermochemistry · Kinetics · Electrochemistry · Common Reactions"
title:
  type: text
  description:
  label: Title
  value: "Chemistry Formulas and Reactions Guide"
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
  value: "Chemistry"
---
# Chemistry Formulas and Reactions Guide

Chemistry studies matter, composition, reactions, energy change, and transformation rates. Like physics and mathematics, many chemical laws can be written in compact formulas. This document summarizes commonly used formulas for stoichiometry, equilibrium, thermochemistry, kinetics, acid-base systems, and electrochemistry.


---

## 1. Stoichiometry and Basic Quantities

Amount of substance:

$$
n = \frac{m}{M}
$$

Using particle count:

$$
n = \frac{N}{N_A}
$$

Avogadro's constant:

$$
N_A = 6.022 \times 10^{23}\ \text{mol}^{-1}
$$

Molar concentration:

$$
c = \frac{n}{V}
$$

Mass fraction:

$$
w = \frac{m_{\text{solute}}}{m_{\text{solution}}}
$$

Dilution relation:

$$
c_1 V_1 = c_2 V_2
$$

Ideal gas law:

$$
PV = nRT
$$


---

## 2. Chemical Equations and Reaction Progress

A general reaction can be written as:

$$
\alpha A + \beta B \rightarrow \gamma C + \delta D
$$

If the reaction extent is $\xi$, the amount change of species $i$ satisfies:

$$
dn_i = \nu_i\,d\xi
$$

so:

$$
n_i = n_{i,0} + \nu_i \xi
$$

Here $\nu_i$ is negative for reactants and positive for products.

Example combustion:

$$
\mathrm{CH_4 + 2O_2 \rightarrow CO_2 + 2H_2O}
$$

Neutralization:

$$
\mathrm{HCl + NaOH \rightarrow NaCl + H_2O}
$$

At equivalence:

$$
n(\mathrm{H^+}) = n(\mathrm{OH^-})
$$


---

## 3. Chemical Equilibrium

For:

$$
aA + bB \rightleftharpoons cC + dD
$$

the equilibrium constant is:

$$
K_c = \frac{[C]^c[D]^d}{[A]^a[B]^b}
$$

For gases, a pressure form is often used:

$$
K_p = \frac{(P_C)^c(P_D)^d}{(P_A)^a(P_B)^b}
$$

The reaction quotient has the same form but uses current concentrations or pressures. Comparing $Q$ with $K$ indicates the spontaneous direction of change.

!!! info Le Chatelier's principle
    If a system at equilibrium is disturbed, it tends to shift in the direction that partially counteracts the disturbance.


---

## 4. Thermochemistry

The enthalpy change of a reaction is:

$$
\Delta H = H_{\text{products}} - H_{\text{reactants}}
$$

The entropy change is:

$$
\Delta S = S_{\text{products}} - S_{\text{reactants}}
$$

The Gibbs free energy relation is:

$$
\Delta G = \Delta H - T\Delta S
$$

A negative $\Delta G$ indicates a spontaneous process under the stated conditions.

Standard free energy and equilibrium are connected through:

$$
\Delta G^\circ = -RT\ln K
$$


---

## 5. Chemical Kinetics

A general rate law can be written as:

$$
v = k[A]^m[B]^n
$$

For a first-order reaction:

$$
\frac{d[A]}{dt} = -k[A]
$$

Integrated form:

$$
[A]_t = [A]_0 e^{-kt}
$$

Half-life for a first-order reaction:

$$
t_{1/2} = \frac{\ln 2}{k}
$$

Arrhenius equation:

$$
k = A e^{-E_a/(RT)}
$$


---

## 6. Acid-Base and Solubility

For water:

$$
K_w = [\mathrm{H^+}][\mathrm{OH^-}]
$$

The pH definition is:

$$
\mathrm{pH} = -\log_{10}[\mathrm{H^+}]
$$

For a weak acid:

$$
K_a = \frac{[\mathrm{H^+}][\mathrm{A^-}]}{[\mathrm{HA}]}
$$

Henderson-Hasselbalch equation:

$$
\mathrm{pH} = \mathrm{p}K_a + \log\frac{[\mathrm{A^-}]}{[\mathrm{HA}]}
$$

Solubility product:

$$
K_{sp} = [\mathrm{M^{n+}}]^a[\mathrm{X^{m-}}]^b
$$


---

## 7. Electrochemistry

Cell potential under standard conditions:

$$
E^\circ_{\text{cell}} = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}}
$$

Gibbs free energy relation:

$$
\Delta G = -nFE
$$

Nernst equation:

$$
E = E^\circ - \frac{RT}{nF}\ln Q
$$

At 25 degrees Celsius, a common form is:

$$
E = E^\circ - \frac{0.0592}{n}\log_{10}Q
$$


---

## 8. Quick Reference

|Category |Formula |Use |
|---|---|---|
|Amount |$n = \frac{m}{M}$ |Mass to moles |
|Concentration |$c=\frac{n}{V}$ |Solution calculations |
|Gas law |$PV=nRT$ |Gas systems |
|Equilibrium |$K_c=\frac{[C]^c[D]^d}{[A]^a[B]^b}$ |Reaction balance |
|Free energy |$\Delta G=\Delta H-T\Delta S$ |Spontaneity |
|Nernst |$E=E^\circ-\frac{RT}{nF}\ln Q$ |Electrochemistry |

Chemical formulas are most useful when they preserve the underlying conservation logic: atoms, charge, energy, and reaction direction. If those balances are clear, the equations become easier to remember and apply.
