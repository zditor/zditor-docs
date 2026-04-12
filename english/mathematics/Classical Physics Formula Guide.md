---
tags:
  type: text
  description:
  label: Tags
  value: "Physics · Formulas · Reference"
description:
  type: text
  description:
  label: Description
  value: "Mechanics · Electromagnetism · Thermodynamics · Waves · Relativity"
title:
  type: text
  description:
  label: Title
  value: "Classical Physics Formula Guide"
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
  label: Warm Tone
  value: false
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
  value: "Physics"
---
# Classical Physics Formula Guide

Physics studies matter, energy, and their interactions. This document collects widely used formulas from mechanics, energy, electromagnetism, waves, thermodynamics, and modern foundational topics that often appear in engineering and science education.


---

## 1. Classical Mechanics

### 1.1 Newton's Laws

Newton's second law:

$$
\mathbf{F} = m\mathbf{a} = \frac{d\mathbf{p}}{dt}
$$

with momentum:

$$
\mathbf{p} = m\mathbf{v}
$$

Newton's third law:

$$
\mathbf{F}_{12} = -\mathbf{F}_{21}
$$

### 1.2 Kinematics

For constant acceleration:

$$
x = x_0 + v_0 t + \frac{1}{2}at^2
$$

$$
v = v_0 + at
$$

$$
v^2 = v_0^2 + 2a(x-x_0)
$$

Projectile range:

$$
R = \frac{v_0^2\sin 2\theta}{g}
$$

Maximum height:

$$
H = \frac{v_0^2\sin^2\theta}{2g}
$$

### 1.3 Circular Motion

Linear and angular speed:

$$
v = \omega r
$$

Centripetal acceleration:

$$
a_c = \frac{v^2}{r} = \omega^2 r
$$

Centripetal force:

$$
F_c = \frac{mv^2}{r}
$$


---

## 2. Work, Energy, and Momentum

### 2.1 Work and Energy

Work by a force:

$$
W = \int \mathbf{F}\cdot d\mathbf{r}
$$

For constant force:

$$
W = F \Delta r \cos\theta
$$

Kinetic energy:

$$
E_k = \frac{1}{2}mv^2
$$

Gravitational potential energy:

$$
E_p = mgh
$$

Elastic potential energy:

$$
E_p = \frac{1}{2}kx^2
$$

Work-energy theorem:

$$
W_{\text{net}} = \Delta E_k
$$

### 2.2 Momentum and Impulse

Impulse:

$$
\mathbf{I} = \int \mathbf{F}\,dt = \Delta \mathbf{p}
$$

Momentum conservation in an isolated system:

$$
\sum_i \mathbf{p}_i = \text{constant}
$$

!!! tip Physical meaning
    Energy is often the most convenient language for motion under conservative forces, while momentum is often the most convenient language for collisions.


---

## 3. Oscillations and Waves

Simple harmonic motion:

$$
x(t) = A\cos(\omega t + \phi)
$$

Velocity and acceleration:

$$
v(t) = -A\omega \sin(\omega t + \phi)
$$

$$
a(t) = -\omega^2 x(t)
$$

Spring-mass angular frequency:

$$
\omega = \sqrt{\frac{k}{m}}
$$

Wave speed relation:

$$
v = f\lambda
$$

Standing wave frequencies on a string:

$$
f_n = \frac{nv}{2L}, \qquad n=1,2,3,\ldots
$$


---

## 4. Electricity and Magnetism

Coulomb's law:

$$
F = k\frac{|q_1 q_2|}{r^2}
$$

Electric field:

$$
\mathbf{E} = \frac{\mathbf{F}}{q}
$$

Electric potential energy:

$$
U = qV
$$

Ohm's law:

$$
V = IR
$$

Electric power:

$$
P = IV = I^2R = \frac{V^2}{R}
$$

Magnetic force on a moving charge:

$$
\mathbf{F} = q\mathbf{v}\times\mathbf{B}
$$

Faraday's law of induction:

$$
\mathcal{E} = -\frac{d\Phi_B}{dt}
$$


---

## 5. Thermodynamics

Ideal gas law:

$$
PV = nRT
$$

First law of thermodynamics:

$$
\Delta U = Q - W
$$

Thermal efficiency of a heat engine:

$$
\eta = \frac{W}{Q_H} = 1 - \frac{Q_C}{Q_H}
$$

For a Carnot engine:

$$
\eta_{\text{Carnot}} = 1 - \frac{T_C}{T_H}
$$


---

## 6. Relativity and Quantum Foundations

Mass-energy equivalence:

$$
E = mc^2
$$

Relativistic momentum:

$$
\mathbf{p} = \gamma m\mathbf{v}, \qquad \gamma = \frac{1}{\sqrt{1-v^2/c^2}}
$$

Photon energy:

$$
E = h\nu
$$

de Broglie wavelength:

$$
\lambda = \frac{h}{p}
$$

Heisenberg uncertainty relation:

$$
\Delta x \Delta p \ge \frac{\hbar}{2}
$$


---

## 7. Quick Reference

|Area |Formula |Use |
|---|---|---|
|Dynamics |$\mathbf{F}=m\mathbf{a}$ |Motion under force |
|Energy |$E_k=\frac{1}{2}mv^2$ |Mechanical energy |
|Circular motion |$a_c=\frac{v^2}{r}$ |Rotational motion |
|Electricity |$V=IR$ |Circuit analysis |
|Thermodynamics |$PV=nRT$ |Gas systems |
|Relativity |$E=mc^2$ |Mass-energy relation |

Physics formulas are most useful when tied back to conservation laws, geometry, and approximations. The same equation often becomes much clearer once its units and physical interpretation are made explicit.
