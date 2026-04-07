---
tags:
  type: text
  description: 
  label: Tags
  value: "数学 · 公式 · 参考"
description:
  type: text
  description: 
  label: Description
  value: "微积分 · 线性代数 · 概率论 · 统计学 · 优化理论"
title:
  type: text
  description: 
  label: Title
  value: "数学公式详解"
cover:
  type: asset
  description: 
  label: Cover Image
  value: "assets/math-formulas-cover.jpg"
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
display:
  type: checkbox
  description: display
  label: 显示属性
  value: false
avatar:
  type: asset
  description: 
  label: Avatar
  value: "assets/physics-author-avatar.jpg"
row:
  type: array
  description: 
  label: Row
  value: ["avatar","author","updated","tags"]
author:
  type: text
  description: 
  label: Author
  value: "SeeLey & ClaudeCode"
updated:
  type: date
  description: 
  label: Updated
  value: "2026-04-06"
subject:
  type: text
  description: 
  label: Subject
  value: "Mathematics"
---
# 数学公式详解

数学是自然科学的基础，也是工程技术和数据科学的支柱。从微积分到概率论，从线性代数到优化理论，数学为各个学科提供了严谨的分析框架和计算工具。本文档系统整理了常用数学分支的核心公式，每个公式都配有详细的解释、几何意义说明和应用场景介绍，帮助读者不仅记住公式，更能理解其背后的数学思想。


---

## 1. 微积分基础

微积分是研究函数变化规律的数学分支，由牛顿和莱布尼茨在17世纪独立创立。它包含两个核心概念：**微分**描述函数的局部变化率，**积分**描述函数在区间的累积效应。这两者通过微积分基本定理紧密联系，使得微分和积分成为互逆的运算。微积分是几乎所有工程和科学领域的基础，从物理学中的运动方程到经济学中的最优化问题，都离不开微积分的支持。

### 1.1 极限与连续

极限是微积分的基石。极限描述的是当变量趋近于某个值时，函数的趋势行为。理解极限的概念对于掌握导数和积分至关重要。在日常生活中，极限的思想无处不在：当我们说"随着时间无限推移，某事件必然发生"，这本质上就是一个极限陈述。

#### 基本极限公式

以下是微积分中最常用的几个极限，它们各自具有重要的数学意义和实际应用。

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

这个极限在推导导数公式时非常有用。当 $x$ 以弧度表示且趋近于 0 时，正弦函数和角度本身的比值趋近于 1。这一结果的几何证明基于单位圆中的面积比较：单位圆的内接三角形面积、外接三角形面积和扇形面积之间存在特定的比例关系，当 $x \to 0$ 时，三者趋于相等，从而得到这个极限值。这个极限也是推导三角函数导数的基础。

$$
\lim_{x \to 0} \frac{e^x - 1}{x} = 1
$$

自然常数 $e \approx 2.71828$ 是数学中最重要的常数之一。这个极限表明，在 $x = 0$ 附近，指数函数 $e^x$ 的增长速度与 $x$ 本身成正比，比例系数为 1。

$$
\lim_{x \to 0} \frac{\ln(1 + x)}{x} = 1
$$

对数函数 $\ln(1+x)$ 在 $x = 0$ 附近的斜率等于 1，这意味着 $\ln(1+x)$ 在原点附近近似等于 $x$。

$$
\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = e
$$

这是自然常数 $e$ 的经典定义之一。它描述了复利效应的极限行为：想象你有一笔存款，年利率为 100%，如果一年内计息无数次（连续复利），你的本金会增长到原来的 $e$ 倍。

!!! tip 重要极限的记忆技巧
    这四个极限都描述了"趋于零"或"趋于无穷"时的行为模式。第三个和第四个极限都涉及自然常数 $e$，事实上，第二个极限可以通过换元 $u = e^x - 1$ 转化为第四个极限的形式。

#### 洛必达法则

洛必达法则是计算不定型极限的强大工具，它能将难以直接计算的 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 型极限转化为更简单的形式。

若 $\lim_{x \to a} \frac{f(x)}{g(x)}$ 呈 $\frac{0}{0}$ 或 $\frac{\infty}{\infty}$ 不定型：

$$
\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}
$$

只要右侧极限存在或为无穷大。

例如，计算 $\lim_{x \to 0} \frac{\sin x}{x}$ 时，分子分母都趋于零，直接代入得到 $\frac{0}{0}$。应用洛必达法则：

$$
\lim_{x \to 0} \frac{\sin x}{x}
= \lim_{x \to 0} \frac{\cos x}{1}
= \frac{1}{1}
= 1
$$

这验证了之前的结论。但注意，这个极限实际上不需要洛必达法则就能通过几何方法证明，这里只是为了说明法则的使用。

再比如 $\lim_{x \to \infty} \frac{x}{e^x}$ 是 $\frac{\infty}{\infty}$ 型，连续使用洛必达法则三次：

$$
\lim_{x \to \infty} \frac{x}{e^x}
= \lim_{x \to \infty} \frac{1}{e^x}
= \lim_{x \to \infty} \frac{0}{e^x}
= 0
$$

这说明指数函数比任何多项式增长得都快。

### 1.2 导数

导数描述的是函数在某一点的瞬时变化率，即函数值随自变量变化的"速度"。几何上，导数等于函数曲线在该点切线的斜率；物理上，导数可以表示瞬时速度、加速度等物理量。

#### 基本求导法则

以下是最常用的基本函数求导公式：

|函数 |导数 |适用条件 |
|---|---|---|
|$c$（常数） |$0$ |常数不随自变量变化，所以变化率为零 |
|$x^n$ |$nx^{n-1}$ |幂函数的一般求导规则，$n$ 可以是任意实数 |
|$e^x$ |$e^x$ |指数函数的导数等于自身，这是一个非常特殊的性质 |
|$a^x$ |$a^x \ln a$ |底数为 $a$ 的指数函数导数，需要乘以 $\ln a$ |
|$\ln x$ |$\frac{1}{x}$ |自然对数的导数形式简洁 |
|$\sin x$ |$\cos x$ |三角函数的导数仍然是三角函数 |
|$\cos x$ |$-\sin x$ |余弦函数的导数是负的正弦函数 |
|$\tan x$ |$\sec^2 x$ |正切函数的导数 |

特别值得注意的是 $e^x$ 的导数等于自身这个性质。设 $y = e^x$，则 $\frac{dy}{dx} = e^x$。这意味着在点 $(0, 1)$ 处，指数函数的切线斜率恰好为 1。这不是巧合——正是因为这个性质，我们选择 $e$ 作为自然对数的底数。

#### 求导法则

对于由基本函数组合而成的复杂函数，我们需要使用特定的法则来计算其导数。

**乘积法则**（莱布尼茨法则）：

$$
\frac{d}{dx}[f(x) \cdot g(x)] = f'(x) \cdot g(x) + f(x) \cdot g'(x)
$$

记忆口诀是"前导后不导 + 前不导后导"。

**商的法则**：

$$
\frac{d}{dx}\left[\frac{f(x)}{g(x)}\right] = \frac{f'(x) \cdot g(x) - f(x) \cdot g'(x)}{[g(x)]^2}
$$

**链式法则**是处理复合函数的核心：

$$
\frac{d}{dx}f(g(x)) = f'(g(x)) \cdot g'(x)
$$

链式法则的核心思想是"逐层求导、层层相乘"。例如，求 $\frac{d}{dx} \sin(x^2)$：

$$
\frac{d}{dx}\sin(x^2)
= \cos(x^2) \cdot \frac{d}{dx}(x^2)
= \cos(x^2) \cdot 2x
= 2x\cos(x^2)
$$

!!! info 高阶导数
    $n$ 阶导数记作 $f^{(n)}(x)$ 或 $\frac{d^n y}{dx^n}$。二阶导数表示函数曲线的弯曲程度——二阶导数大于零表示曲线下凹，小于零表示曲线上凸。

### 1.3 积分

如果说微分描述的是局部变化率，那么积分描述的就是整体累积效应。积分可以理解为曲线下方的面积、速度对时间的累积（产生位移）、力对距离的累积（产生功）等。积分和微分看似不同，但微积分基本定理揭示了它们之间的深刻联系。

#### 基本积分公式

积分是求导的逆运算。如果 $\frac{d}{dx}F(x) = f(x)$，那么 $\int f(x) \, dx = F(x) + C$，其中 $C$ 是积分常数。

|函数 |不定积分 |说明 |
|---|---|---|
|$x^n$ |$\frac{x^{n+1}}{n+1} + C$（n\ eq -1） |幂函数的积分规则 |
|$\frac{1}{x}$ |$\ln |x |
|$e^x$ |$e^x + C$ |指数函数的导数等于自身 |
|$a^x$ |$\frac{a^x}{\ln a} + C$ |底数为 $a$ 的指数函数积分 |
|$\sin x$ |$-\cos x + C$ |   |
|$\cos x$ |$\sin x + C$ |   |

#### 分部积分

分部积分是积分学中的核心技术之一，它源于乘积求导法则的逆过程：

$$
\int u \, dv = uv - \int v \, du
$$

例如，计算 $\int x e^x \, dx$。设 $u = x$，$dv = e^x \, dx$，则 $du = dx$，$v = e^x$：

$$
\int x e^x \, dx
= x e^x - \int e^x \, dx
= x e^x - e^x + C
= e^x(x - 1) + C
$$

#### 换元积分

换元积分法基于链式法则的逆过程。

第一类换元法（凑微分法）：

$$
\int f(g(x)) \cdot g'(x) \, dx = \int f(u) \, du \quad \text{其中 } u = g(x)
$$

例如，$\int 2x e^{x^2} \, dx$，注意到 $2x \, dx = d(x^2)$：

$$
\int 2x e^{x^2} \, dx
= \int e^u \, du
= e^u + C
= e^{x^2} + C
$$

### 1.4 多元微积分

现实世界中的大多数现象都涉及多个变量之间的关系。多元微积分将一元微积分的概念推广到多元函数，研究多维空间中的变化率和累积问题。

#### 偏导数

对于多元函数 $f(x_1, x_2, \ldots, x_n)$：

$$
\frac{\partial f}{\partial x_i} = \lim_{h \to 0} \frac{f(x_1, \ldots, x_i + h, \ldots, x_n) - f(x_1, \ldots, x_n)}{h}
$$

偏导数的计算方法：在求关于 $x_i$ 的偏导时，将其他所有变量视为常数，然后按照一元函数的求导规则进行即可。

例如，对于函数 $f(x, y) = x^2y + e^{xy}$：

$$
\frac{\partial f}{\partial x} = 2xy + y e^{xy}, \quad
\frac{\partial f}{\partial y} = x^2 + x e^{xy}
$$

#### 梯度

梯度是偏导数的向量形式：

$$
\nabla f = \begin{pmatrix} \frac{\partial f}{\partial x_1} \\ \frac{\partial f}{\partial x_2} \\ \vdots \\ \frac{\partial f}{\partial x_n} \end{pmatrix}
$$

梯度的核心性质在于它指向函数增长最快的方向，其大小等于该方向上的最大变化率。

从几何角度理解：对于二元函数 $z = f(x, y)$，梯度 \
abla f(x_0, y_0) 是一个向量，它指向函数值增加最快的方向。如果你在山丘上的某一点，梯度向量指向最陡峭的上升方向；沿着梯度的反方向走，就是最陡峭的下降方向。梯度的大小表示山坡的陡峭程度。

#### Hessian 矩阵

Hessian 矩阵由二阶偏导数组成：

$$
\mathbf{H} = \begin{pmatrix}
\frac{\partial^2 f}{\partial x_1^2} & \frac{\partial^2 f}{\partial x_1 \partial x_2} & \cdots \\
\frac{\partial^2 f}{\partial x_2 \partial x_1} & \frac{\partial^2 f}{\partial x_2^2} & \cdots \\
\vdots & \vdots & \ddots
\end{pmatrix}
$$

Hessian 矩阵的特征值决定了函数的局部曲率结构：

- 正定 $\Rightarrow$ 局部极小值
- 负定 $\Rightarrow$ 局部极大值
- 不定 $\Rightarrow$ 鞍点

#### 多元函数的泰勒展开

在点 $\mathbf{x}_0$ 处的二阶泰勒展开为：

$$
f(\mathbf{x}) \approx f(\mathbf{x}_0) + \nabla f(\mathbf{x}_0)^T (\mathbf{x} - \mathbf{x}_0) + \frac{1}{2} (\mathbf{x} - \mathbf{x}_0)^T \mathbf{H}(\mathbf{x}_0) (\mathbf{x} - \mathbf{x}_0)
$$

这个公式表明，在局部范围内，函数可以近似为一个二次函数。


---

## 2. 线性代数

线性代数研究的是线性方程组和线性变换的数学分支。与非线性问题相比，线性问题具有很好的性质——线性系统的行为可以完全由其组成部分的叠加来描述。

### 2.1 矩阵运算

矩阵是线性代数的核心概念，它本质上是一个按照矩形排列的数表。

#### 矩阵乘法

设 $\mathbf{A} \in \mathbb{R}^{m \times p}$，$\mathbf{B} \in \mathbb{R}^{p \times n}$，则：

$$
(\mathbf{A}\mathbf{B})_{ij} = \sum_{k=1}^{p} a_{ik} b_{kj}
$$

理解这个公式的方法是：结果矩阵的第 $i$ 行第 $j$ 列元素，等于左矩阵第 $i$ 行与右矩阵第 $j$ 列的点积。

!!! warning 注意交换律
    矩阵乘法**不满足交换律**：一般情况下 \mathbf{A}\mathbf{B}\
    eq \mathbf{B}\mathbf{A}。这与我们熟悉的数的乘法不同。

矩阵乘法的几何意义在于它表示线性变换的复合。如果 $\mathbf{A}$ 代表一个旋转，$\mathbf{B}$ 代表一个缩放，那么 $\mathbf{A}\mathbf{B}$ 代表先缩放后旋转。

#### 矩阵的逆

$\mathbf{A}^{-1}$ 满足 $\mathbf{A}\mathbf{A}^{-1} = \mathbf{A}^{-1}\mathbf{A} = \mathbf{I}$

逆矩阵的显式公式为：

$$
\mathbf{A}^{-1} = \frac{1}{\det(\mathbf{A})} \text{adj}(\mathbf{A})
$$

其中 $\text{adj}(\mathbf{A})$ 是伴随矩阵。

### 2.2 行列式

行列式是一个与方阵密切相关的标量值，编码了矩阵的许多重要性质。

#### 行列式定义

对于 $2 \times 2$ 矩阵：

$$
\det\begin{pmatrix} a & b \\ c & d \end{pmatrix} = ad - bc
$$

对于 $n \times n$ 矩阵，按第 $i$ 行展开：

$$
\det(\mathbf{A}) = \sum_{j=1}^{n} (-1)^{i+j} a_{ij} \det(\mathbf{A}_{ij})
$$

#### 行列式性质

$$
\begin{aligned}
\det(\mathbf{A}^T) &= \det(\mathbf{A}) \\
\det(\mathbf{A}\mathbf{B}) &= \det(\mathbf{A}) \cdot \det(\mathbf{B}) \\
\det(c\mathbf{A}) &= c^n \det(\mathbf{A})
\end{aligned}
$$

!!! tip 计算技巧
    计算高阶行列式时，应首先利用初等行变换将矩阵化为上三角形或下三角形。三角矩阵的行列式等于对角线元素的乘积。

### 2.3 线性方程组

#### 高斯消元法

高斯消元法通过初等行变换将方程组的增广矩阵化为行阶梯形。设线性方程组为：

$$
\begin{aligned}
a_{11}x_1 + a_{12}x_2 + \cdots + a_{1n}x_n &= b_1 \\
a_{21}x_1 + a_{22}x_2 + \cdots + a_{2n}x_n &= b_2 \\
\vdots \\
a_{m1}x_1 + a_{m2}x_2 + \cdots + a_{mn}x_n &= b_m
\end{aligned}
$$

其矩阵形式为 $\mathbf{A}\mathbf{x} = \mathbf{b}$。

#### Cramer 法则

对于 $n \times n$ 线性方程组 $\mathbf{A}\mathbf{x} = \mathbf{b}$，若 \det(\mathbf{A})\
eq 0：

$$
x_i = \frac{\det(\mathbf{A}_i)}{\det(\mathbf{A})}
$$

其中 $\mathbf{A}_i$ 是将第 $i$ 列替换为 $\mathbf{b}$ 后的矩阵。

### 2.4 向量空间

#### 向量的范数

**L1 范数**（曼哈顿距离）：

$$
\|\mathbf{x}\|_1 = \sum_{i=1}^{n} |x_i|
$$

**L2 范数**（欧几里得距离）：

$$
\|\mathbf{x}\|_2 = \sqrt{\sum_{i=1}^{n} x_i^2}
$$

**Lp 范数**：

$$
\|\mathbf{x}\|_p = \left(\sum_{i=1}^{n} |x_i|^p\right)^{1/p}
$$

**无穷范数**：

$$
\|\mathbf{x}\|_\infty = \max_i |x_i|
$$

#### 内积与正交

内积的定义：

$$
\langle \mathbf{x}, \mathbf{y} \rangle = \mathbf{x}^T \mathbf{y} = \sum_{i=1}^{n} x_i y_i
$$

两个向量**正交**意味着 $\langle \mathbf{x}, \mathbf{y} \rangle = 0$。

**Gram-Schmidt 正交化过程**：

$$
\begin{aligned}
\mathbf{u}_1 &= \mathbf{v}_1 \\
\mathbf{u}_k &= \mathbf{v}_k - \sum_{i=1}^{k-1} \frac{\langle \mathbf{v}_k, \mathbf{u}_i \rangle}{\langle \mathbf{u}_i, \mathbf{u}_i \rangle} \mathbf{u}_i \quad (k = 2, 3, \ldots)
\end{aligned}
$$

### 2.5 特征值与特征向量

对于方阵 $\mathbf{A} \in \mathbb{R}^{n \times n}$，若存在标量 $\lambda$ 和非零向量 $\mathbf{v}$ 使得：

$$
\mathbf{A}\mathbf{v} = \lambda \mathbf{v}
$$

则 $\lambda$ 是特征值，$\mathbf{v}$ 是对应的特征向量。

特征多项式：

$$
\det(\mathbf{A} - \lambda \mathbf{I}) = 0
$$

特征值的性质：

$$
\begin{aligned}
\sum_{i=1}^{n} \lambda_i &= \text{tr}(\mathbf{A}) \\
\prod_{i=1}^{n} \lambda_i &= \det(\mathbf{A})
\end{aligned}
$$

!!! tip 几何意义
    特征向量指示矩阵 $\mathbf{A}$ 作用下的不变方向，特征值表示在该方向上的缩放因子。

#### 对角化

如果 $\mathbf{A}$ 有 $n$ 个线性无关的特征向量，则可对角化：

$$
\mathbf{A} = \mathbf{P}\mathbf{D}\mathbf{P}^{-1}
$$

其中 $\mathbf{P}$ 的列是特征向量，$\mathbf{D}$ 是对角矩阵，对角线元素是特征值。

### 2.6 矩阵分解

#### LU 分解

$$
\mathbf{A} = \mathbf{L}\mathbf{U}
$$

其中 $\mathbf{L}$ 是下三角矩阵，$\mathbf{U}$ 是上三角矩阵。

#### QR 分解

$$
\mathbf{A} = \mathbf{Q}\mathbf{R}
$$

其中 $\mathbf{Q}^T \mathbf{Q} = \mathbf{I}$，$\mathbf{R}$ 是上三角矩阵。

#### 奇异值分解 (SVD)

任意矩阵 $\mathbf{A} \in \mathbb{R}^{m \times n}$ 可分解为：

$$
\mathbf{A} = \mathbf{U}\mathbf{\Sigma}\mathbf{V}^T
$$

其中 $\mathbf{U} \in \mathbb{R}^{m \times m}$ 和 $\mathbf{V} \in \mathbb{R}^{n \times n}$ 是正交矩阵，$\mathbf{\Sigma} \in \mathbb{R}^{m \times n}$ 是对角矩阵，对角线元素是奇异值 $\sigma_1 \geq \sigma_2 \geq \cdots \geq 0$。

!!! info 应用
    SVD 的应用极其广泛：降维（PCA）、数据压缩、噪声过滤、推荐系统等。


---

## 3. 概率论

概率论是研究随机现象数量规律的数学分支。与确定性数学不同，概率论处理的是不确定性——我们不再问"会发生什么"，而是问"发生的可能性有多大"。

### 3.1 概率基础

#### 概率公理（Kolmogorov 公理）

1933年，柯尔莫哥洛夫提出了概率论的公理化体系：

$$
\begin{aligned}
&\text{1. 非负性： } P(A) \geq 0 \\
&\text{2. 规范性： } P(\Omega) = 1 \\
&\text{3. 可列可加性：若 } A_1, A_2, \ldots \text{互不相容，则 } P\left(\bigcup_i A_i\right) = \sum_i P(A_i)
\end{aligned}
$$

#### 条件概率

在事件 $B$ 已发生的条件下，事件 $A$ 的条件概率为：

$$
P(A|B) = \frac{P(A \cap B)}{P(B)} \quad \text{其中 } P(B) > 0
$$

#### 乘法公式

$$
P(A \cap B) = P(A) \cdot P(B|A) = P(B) \cdot P(A|B)
$$

对于多个事件：

$$
P(A_1 \cap A_2 \cap \cdots \cap A_n) = P(A_1) \cdot P(A_2|A_1) \cdot P(A_3|A_1 \cap A_2) \cdots
$$

#### 全概率公式

若 $B_1, B_2, \ldots, B_n$ 是样本空间的一个划分：

$$
P(A) = \sum_{i=1}^{n} P(B_i) \cdot P(A|B_i)
$$

#### 贝叶斯公式

$$
P(B_i|A) = \frac{P(B_i) \cdot P(A|B_i)}{\sum_{j=1}^{n} P(B_j) \cdot P(A|B_j)}
$$

公式中包含三个关键概念：

- **先验概率** $P(B_i)$：在获得新证据之前，我们对各种可能原因 $B_i$ 的信念程度。
- **似然** $P(A|B_i)$：如果原因 $B_i$ 成立，那么观察到证据 $A$ 的可能性有多大。
- **后验概率** $P(B_i|A)$：在观察到证据 $A$ 之后，我们更新后的对原因 $B_i$ 的信念程度。

!!! tip 贝叶斯思维
    贝叶斯公式体现了"先验知识 + 数据 → 后验知识"的更新过程。

### 3.2 随机变量

#### 离散随机变量

**伯努利分布** $X \sim \text{Bernoulli}(p)$：

$$
P(X = 1) = p, \quad P(X = 0) = 1 - p
$$

**二项分布** $X \sim \text{Binomial}(n, p)$：

$$
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \quad k = 0, 1, \ldots, n
$$

**泊松分布** $X \sim \text{Poisson}(\lambda)$：

$$
P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \quad k = 0, 1, 2, \ldots
$$

#### 连续随机变量

**均匀分布** $X \sim \text{Uniform}(a, b)$：

$$
f(x) = \begin{cases} \frac{1}{b-a} & a \leq x \leq b \\ 0 & \text{otherwise} \end{cases}
$$

**正态分布** $X \sim \mathcal{N}(\mu, \sigma^2)$：

$$
f(x) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

正态分布之所以如此重要，主要有三个原因：第一，许多物理现象都近似服从正态分布；第二，正态分布具有良好的数学性质；第三，中心极限定理表明，大量独立同分布随机变量的和近似正态分布。

**指数分布** $X \sim \text{Exp}(\lambda)$：

$$
f(x) = \begin{cases} \lambda e^{-\lambda x} & x \geq 0 \\ 0 & x < 0 \end{cases}
$$

!!! info 68-95-99.7 法则
    对于正态分布 $\mathcal{N}(\mu, \sigma^2)$：

    - 约 68% 的数据落在 $\mu \pm \sigma$ 内
    - 约 95% 的数据落在 $\mu \pm 2\sigma$ 内
    - 约 99.7% 的数据落在 $\mu \pm 3\sigma$ 内


### 3.3 数字特征

#### 数学期望

离散型：$\mathbb{E}[X] = \sum_{i} x_i \cdot P(X = x_i)$

连续型：$\mathbb{E}[X] = \int_{-\infty}^{+\infty} x \cdot f(x) \, dx$

期望的性质：

$$
\begin{aligned}
\mathbb{E}[c] &= c \\
\mathbb{E}[cX] &= c\mathbb{E}[X] \\
\mathbb{E}[X + Y] &= \mathbb{E}[X] + \mathbb{E}[Y] \\
\text{若 } X, Y \text{ 独立： } \mathbb{E}[XY] &= \mathbb{E}[X] \cdot \mathbb{E}[Y]
\end{aligned}
$$

#### 方差

$$
\text{Var}(X) = \mathbb{E}[(X - \mathbb{E}[X])^2] = \mathbb{E}[X^2] - (\mathbb{E}[X])^2
$$

标准差 $\sigma = \sqrt{\text{Var}(X)}$。

方差的性质：

$$
\begin{aligned}
\text{Var}(c) &= 0 \\
\text{Var}(cX) &= c^2 \text{Var}(X) \\
\text{若 } X, Y \text{ 独立： } \text{Var}(X + Y) &= \text{Var}(X) + \text{Var}(Y)
\end{aligned}
$$

#### 协方差与相关系数

协方差：

$$
\text{Cov}(X, Y) = \mathbb{E}[(X - \mathbb{E}[X])(Y - \mathbb{E}[Y])] = \mathbb{E}[XY] - \mathbb{E}[X]\mathbb{E}[Y]
$$

相关系数：

$$
\rho_{XY} = \frac{\text{Cov}(X, Y)}{\sqrt{\text{Var}(X)} \sqrt{\text{Var}(Y)}}
$$

相关系数的一个重要性质是：$-1 \leq \rho_{XY} \leq 1$。

### 3.4 大数定律与中心极限定理

#### 大数定律

弱大数定律：

$$
\lim_{n \to \infty} P\left(\left|\frac{1}{n}\sum_{i=1}^{n} X_i - \mu\right| < \epsilon\right) = 1
$$

大数定律的实际意义在于：它为蒙特卡洛方法提供了理论基础。

#### 中心极限定理 (CLT)

设 $X_1, X_2, \ldots, X_n$ 是独立同分布的随机变量，$\mathbb{E}[X_i] = \mu$，$\text{Var}(X_i) = \sigma^2$，则：

$$
\frac{\sum_{i=1}^{n} X_i - n\mu}{\sigma\sqrt{n}} \xrightarrow{d} \mathcal{N}(0, 1)
$$

即当 $n$ 足够大时，样本和的分布近似正态分布。

!!! tip 实际应用
    中心极限定理解释了为什么正态分布在自然界中如此常见——它是大量微小独立因素叠加的结果。


---

## 4. 统计学

统计学是研究数据收集、整理、分析和解释的数学分支。统计学是从样本推断总体——我们观察到的数据是"果"，我们想知道的是产生这些数据的"因"。

### 4.1 估计理论

#### 点估计

**矩估计法**：用样本矩替代总体矩。

**最大似然估计 (MLE)**：

$$
\hat{\theta}_{\text{MLE}} = \arg \max_\theta \prod_{i=1}^{n} f(x_i; \theta)
$$

等价于：

$$
\hat{\theta}_{\text{MLE}} = \arg \max_\theta \sum_{i=1}^{n} \ln f(x_i; \theta)
$$

#### 估计量的性质

**无偏性**：$\mathbb{E}[\hat{\theta}] = \theta$。无偏估计量在长期中平均来看等于真实参数值。

**一致性**：当 $n \to \infty$ 时，$\hat{\theta} \to \theta$。

**有效性**：在所有无偏估计量中，方差越小越有效。

### 4.2 区间估计

对于参数 $\theta$ 的置信水平 $1-\alpha$ 的置信区间：

$$
P(L \leq \theta \leq U) = 1 - \alpha
$$

**已知方差**时，使用 Z 统计量：

$$
\bar{X} \pm z_{\alpha/2} \cdot \frac{\sigma}{\sqrt{n}}
$$

**未知方差**时，用样本方差 $S^2$ 替代：

$$
\bar{X} \pm t_{\alpha/2, n-1} \cdot \frac{S}{\sqrt{n}}
$$

!!! tip 置信区间的正确理解
    "95%置信水平"不是说参数有95%的概率落在区间内——参数是未知的常数，它要么在区间内，要么不在。置信水平描述的是构造区间的方法的可靠性。

### 4.3 假设检验

#### 两类错误

- **第一类错误（Type I）**：$H_0$ 为真但被拒绝，犯错的概率正好是显著性水平 $\alpha$。这是"假阳性"。
- **第二类错误（Type II）**：$H_0$ 为假但被接受，犯错的概率记为 $\beta$。这是"假阴性"。

统计检验的功效（power）定义为 $1 - \beta$。

!!! tip p 值的正确理解
    p 值是"在 $H_0$ 成立的条件下，观察到当前或更极端结果"的概率。p 值越小，我们越有理由怀疑 $H_0$ 的正确性。

### 4.4 回归分析

#### 一元线性回归

模型：$Y = \beta_0 + \beta_1 X + \epsilon$，其中 $\epsilon \sim \mathcal{N}(0, \sigma^2)$

**最小二乘估计**：

$$
\begin{aligned}
\hat{\beta}_1 &= \frac{\sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})}{\sum_{i=1}^{n}(X_i - \bar{X})^2}
= \frac{\text{Cov}(X, Y)}{\text{Var}(X)} \\
\hat{\beta}_0 &= \bar{Y} - \hat{\beta}_1 \bar{X}
\end{aligned}
$$

#### 多元线性回归

模型：$\mathbf{Y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\epsilon}$

最小二乘估计：

$$
\hat{\boldsymbol{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1} \mathbf{X}^T \mathbf{Y}
$$

#### 决定系数 $R^2$

$$
R^2 = 1 - \frac{\text{SS}_{\text{res}}}{\text{SS}_{\text{tot}}} = \frac{\text{SS}_{\text{reg}}}{\text{SS}_{\text{tot}}}
$$

$R^2$ 的取值范围是 $[0, 1]$。$R^2$ 越接近 1，模型拟合效果越好。


---

## 5. 优化理论

优化理论研究的是如何在给定的约束条件下找到"最好"的解决方案。

### 5.1 无约束优化

#### 极值条件

一阶必要条件：\
abla f(\mathbf{x}^*) = 0

二阶条件：

$$
\begin{aligned}
&\text{极小值： } \mathbf{H}(\mathbf{x}^*) \text{ 正定} \\
&\text{极大值： } \mathbf{H}(\mathbf{x}^*) \text{ 负定} \\
&\text{鞍点： } \mathbf{H}(\mathbf{x}^*) \text{ 不定}
\end{aligned}
$$

#### 梯度下降法

$$
\mathbf{x}_{t+1} = \mathbf{x}_t - \eta \nabla f(\mathbf{x}_t)
$$

其中 $\eta > 0$ 是**学习率**或**步长**。

#### 牛顿法

$$
\mathbf{x}_{t+1} = \mathbf{x}_t - \mathbf{H}(\mathbf{x}_t)^{-1} \nabla f(\mathbf{x}_t)
$$

牛顿法利用二阶信息，收敛速度比梯度下降法快得多（二阶收敛）。

### 5.2 约束优化

#### 等式约束：拉格朗日乘数法

对于 $\min f(\mathbf{x})$ subject to $g_i(\mathbf{x}) = 0, i = 1, \ldots, m$

拉格朗日函数：

$$
\mathcal{L}(\mathbf{x}, \boldsymbol{\lambda}) = f(\mathbf{x}) + \sum_{i=1}^{m} \lambda_i g_i(\mathbf{x})
$$

KKT 条件（一阶必要条件）：

$$
\nabla f(\mathbf{x}^*) + \sum_{i=1}^{m} \lambda_i \nabla g_i(\mathbf{x}^*) = 0
$$

#### 不等式约束：KKT 条件

对于 $\min f(\mathbf{x})$ subject to $g_i(\mathbf{x}) \leq 0$

KKT 条件：

$$
\begin{aligned}
\nabla f(\mathbf{x}^*) + \sum_{i=1}^{m} \mu_i \nabla g_i(\mathbf{x}^*) &= 0 \\
\mu_i &\geq 0 \\
\mu_i g_i(\mathbf{x}^*) &= 0
\end{aligned}
$$

其中 $\mu_i$ 是 KKT 乘子。条件 $\mu_i g_i(\mathbf{x}^*) = 0$ 称为**互补松弛条件**。

### 5.3 凸优化

#### 凸集

集合 $\mathcal{C}$ 是凸的，若对于任意 $\mathbf{x}, \mathbf{y} \in \mathcal{C}$ 和 $\theta \in [0, 1]$：

$$
\theta \mathbf{x} + (1-\theta)\mathbf{y} \in \mathcal{C}
$$

凸集内任意两点的"中点"仍在集合内。直观上，凸集没有"凹陷"。

#### 凸函数

函数 $f$ 是凸的，若对于任意 $\mathbf{x}, \mathbf{y}$ 和 $\theta \in [0, 1]$：

$$
f(\theta \mathbf{x} + (1-\theta)\mathbf{y}) \leq \theta f(\mathbf{x}) + (1-\theta) f(\mathbf{y})
$$

凸函数的一个重要性质：任何局部极小点也是全局极小点。这意味着我们不用担心优化算法陷入"局部最优陷阱"。

!!! tip 凸优化的重要性
    凸优化在机器学习、信号处理、经济学、金融学等领域有广泛应用。著名的支持向量机（SVM）、Lasso 回归、Logistic 回归等问题都可以转化为凸优化问题求解。


---

## 6. 特殊函数

### 6.1 伽马函数

伽马函数是阶乘函数的推广：

$$
\Gamma(z) = \int_0^\infty t^{z-1} e^{-t} \, dt \quad \text{Re}(z) > 0
$$

性质：

$$
\begin{aligned}
\Gamma(n) &= (n-1)! \quad \text{（当 $n$ 为正整数时）}\\
\Gamma(z+1) &= z\Gamma(z) \\
\Gamma(1/2) &= \sqrt{\pi}
\end{aligned}
$$

### 6.2 贝塔函数

$$
B(a, b) = \int_0^1 t^{a-1} (1-t)^{b-1} \, dt = \frac{\Gamma(a)\Gamma(b)}{\Gamma(a+b)}
$$

### 6.3 误差函数

$$
\operatorname{erf}(x) = \frac{2}{\sqrt{\pi}} \int_0^x e^{-t^2} \, dt
$$

互补形式：

$$
\operatorname{erfc}(x) = 1 - \operatorname{erf}(x) = \frac{2}{\sqrt{\pi}} \int_x^\infty e^{-t^2} \, dt
$$


---

## 附录：常用符号表

|符号 |含义 |
|---|---|
|$\mathbb{R}$ |实数集 |
|$\mathbb{N}$ |自然数集 |
|$\mathbb{C}$ |复数集 |
|$\mathbb{Z}$ |整数集 |
|\ abla |梯度算子 |
|\ abla^2 或 $\Delta$ |拉普拉斯算子 |
|$\partial$ |偏导数符号 |
|$\sum$ |求和 |
|$\prod$ |连乘 |
|$\mathbb{E}$ |数学期望 |
|$\mathbb{V}$ 或 $\text{Var}$ |方差 |
|$\mathbb{P}$ |概率 |
|$\det$ |行列式 |
|$\text{tr}$ |矩阵的迹 |
|$\text{rank}$ |矩阵的秩 |
|$\perp$ |正交 |
|$\sim$ |服从某种分布 |
|$\approx$ |近似等于 |
|$\propto$ |成正比 |
|$\Rightarrow$ |蕴含/推出 |
|$\iff$ |当且仅当 |
|$\to$ 或 $\xrightarrow{}$ |收敛到/趋于 |


---

## 附录：常见分布速查表

|分布 |概率质量/密度函数 |期望 |方差 |
|---|---|---|---|
|伯努利 $\text{Bernoulli}(p)$ |$P(X=1)=p, P(X=0)=1-p$ |$p$ |$p(1-p)$ |
|二项 $\text{Binomial}(n,p)$ |$\binom{n}{k}p^k(1-p)^{n-k}$ |$np$ |$np(1-p)$ |
|泊松 $\text{Poisson}(\lambda)$ |$\frac{\lambda^k e^{-\lambda}}{k!}$ |$\lambda$ |$\lambda$ |
|均匀 $\text{Uniform}(a,b)$ |$\frac{1}{b-a}$ |$\frac{a+b}{2}$ |$\frac{(b-a)^2}{12}$ |
|正态 $\mathcal{N}(\mu,\sigma^2)$ |$\frac{1}{\sqrt{2\pi\sigma^2}}e^{-(x-\mu)^2/(2\sigma^2)}$ |$\mu$ |$\sigma^2$ |
|指数 $\text{Exp}(\lambda)$ |$\lambda e^{-\lambda x}$ |$\frac{1}{\lambda}$ |$\frac{1}{\lambda^2}$ |


---

本文档涵盖了数学中 150+ 核心公式，涵盖微积分、线性代数、概率论、统计学和优化理论等主要内容。文档使用 `$$...$$` 进行块级公式渲染，对于多行公式使用 `\begin{aligned}...\end{aligned}` 或 `\begin{align}...\end{align}` 环境实现对齐。

**多行公式用法说明：**

在 Zditor/MathJax 中，多行公式可以使用 `aligned` 或 `align` 环境：

```text
$$
\begin{aligned}
第一行 &= 内容 \\
第二行 &= 内容 \\
第三行 &= 内容
\end{aligned}
$$
```

`aligned` 环境会在 `&` 符号处对齐，适合展示推导步骤。`align` 环境还会自动添加行号。

本文档使用示例：

$$
\begin{aligned}
\int x e^x \, dx
&= x e^x - \int e^x \, dx \\
&= x e^x - e^x + C \\
&= e^x(x - 1) + C
\end{aligned}
$$

$$
\begin{aligned}
\hat{\beta}_1 &= \frac{\sum_{i=1}^{n}(X_i - \bar{X})(Y_i - \bar{Y})}{\sum_{i=1}^{n}(X_i - \bar{X})^2} \\
\hat{\beta}_0 &= \bar{Y} - \hat{\beta}_1 \bar{X}
\end{aligned}
$$