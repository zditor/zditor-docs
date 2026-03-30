# 经典物理学公式详解

物理学是研究物质、能量及其相互作用的自然科学。本文档系统整理了经典物理学中的核心公式，涵盖力学、电磁学、热力学、光学、相对论和量子力学等主要领域。

---

## 1. 经典力学

### 1.1 牛顿运动定律

#### 牛顿第二定律

$$
\mathbf{F} = m\mathbf{a} = \frac{d\mathbf{p}}{dt}
$$

其中 $\mathbf{F}$ 是合外力，$m$ 是质量，$\mathbf{a}$ 是加速度，$\mathbf{p} = m\mathbf{v}$ 是动量。

对于变质量系统（如火箭）：

$$
\mathbf{F} = \frac{d(m\mathbf{v})}{dt} = m\frac{d\mathbf{v}}{dt} + \mathbf{v}\frac{dm}{dt}
$$

#### 牛顿第三定律

$$
\mathbf{F}_{12} = -\mathbf{F}_{21}
$$

作用力与反作用力大小相等、方向相反。

### 1.2 运动学方程

#### 匀加速直线运动

位移-时间关系：

$$
x = x_0 + v_0 t + \frac{1}{2}at^2
$$

速度-时间关系：

$$
v = v_0 + at
$$

速度-位移关系：

$$
v^2 = v_0^2 + 2a(x - x_0)
$$

#### 抛体运动

水平方向：

$$
x = v_0 \cos\theta \cdot t
$$

竖直方向：

$$
y = v_0 \sin\theta \cdot t - \frac{1}{2}gt^2
$$

轨迹方程：

$$
y = x\tan\theta - \frac{gx^2}{2v_0^2\cos^2\theta}
$$

射程：

$$
R = \frac{v_0^2 \sin 2\theta}{g}
$$

最大高度：

$$
H = \frac{v_0^2 \sin^2\theta}{2g}
$$

### 1.3 圆周运动

#### 角速度与线速度

$$
v = \omega r = 2\pi r f = \frac{2\pi r}{T}
$$

其中 $\omega$ 是角速度，$r$ 是半径，$f$ 是频率，$T$ 是周期。

#### 向心加速度

$$
a_c = \frac{v^2}{r} = \omega^2 r = 4\pi^2 f^2 r
$$

#### 向心力

$$
F_c = m a_c = \frac{mv^2}{r} = m\omega^2 r
$$

### 1.4 功与能量

#### 功的定义

$$
W = \int_{\mathbf{r}_1}^{\mathbf{r}_2} \mathbf{F} \cdot d\mathbf{r} = \int_{s_1}^{s_2} F \cos\theta \, ds
$$

对于恒力：

$$
W = \mathbf{F} \cdot \Delta\mathbf{r} = F \Delta r \cos\theta
$$

#### 动能

$$
E_k = \frac{1}{2}mv^2
$$

#### 动能定理

$$
W_{\text{net}} = \Delta E_k = \frac{1}{2}mv_2^2 - \frac{1}{2}mv_1^2
$$

#### 重力势能

$$
E_p = mgh
$$

#### 弹性势能

$$
E_p = \frac{1}{2}kx^2
$$

其中 $k$ 是弹簧劲度系数，$x$ 是形变量。

#### 机械能守恒

$$
E_1 = E_2 \quad \Rightarrow \quad \frac{1}{2}mv_1^2 + mgh_1 = \frac{1}{2}mv_2^2 + mgh_2
$$

### 1.5 动量与冲量

#### 动量

$$
\mathbf{p} = m\mathbf{v}
$$

#### 冲量

$$
\mathbf{I} = \int_{t_1}^{t_2} \mathbf{F} \, dt = \Delta\mathbf{p}
$$

#### 动量守恒定律

对于孤立系统：

$$
\sum_{i} \mathbf{p}_i = \text{const} \quad \Rightarrow \quad \sum_{i} m_i \mathbf{v}_i = \sum_{i} m_i \mathbf{v}_i'
$$

#### 完全弹性碰撞

一维情况下，两物体碰撞后的速度：

$$
v_1' = \frac{(m_1 - m_2)v_1 + 2m_2 v_2}{m_1 + m_2}
$$

$$
v_2' = \frac{(m_2 - m_1)v_2 + 2m_1 v_1}{m_1 + m_2}
$$

#### 完全非弹性碰撞

$$
v' = \frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}
$$

### 1.6 转动力学

#### 角动量

$$
\mathbf{L} = \mathbf{r} \times \mathbf{p} = I\boldsymbol{\omega}
$$

其中 $I$ 是转动惯量。

#### 力矩

$$
\boldsymbol{\tau} = \mathbf{r} \times \mathbf{F} = \frac{d\mathbf{L}}{dt}
$$

标量形式：

$$
\tau = rF\sin\theta = Fd
$$

其中 $d$ 是力臂。

#### 转动惯量

对于质点系：

$$
I = \sum_{i} m_i r_i^2
$$

对于连续体：

$$
I = \int r^2 \, dm
$$

常见形状的转动惯量矩阵：

$$
\begin{bmatrix}
\text{细棒（绕中心）} & I = \frac{1}{12}ML^2 \\
\text{细棒（绕端点）} & I = \frac{1}{3}ML^2 \\
\text{圆盘（绕中心轴）} & I = \frac{1}{2}MR^2 \\
\text{球体（绕直径）} & I = \frac{2}{5}MR^2 \\
\text{球壳（绕直径）} & I = \frac{2}{3}MR^2
\end{bmatrix}
$$

#### 平行轴定理

$$
I = I_{\text{cm}} + Md^2
$$

其中 $I_{\text{cm}}$ 是绕质心的转动惯量，$d$ 是两轴间距。

#### 转动动能

$$
E_k = \frac{1}{2}I\omega^2
$$

#### 角动量守恒

$$
\mathbf{L} = I\boldsymbol{\omega} = \text{const}
$$

### 1.7 万有引力

#### 万有引力定律

$$
F = G\frac{m_1 m_2}{r^2}
$$

其中 $G = 6.674 \times 10^{-11} \, \text{N·m}^2/\text{kg}^2$ 是引力常数。

向量形式：

$$
\mathbf{F}_{12} = -G\frac{m_1 m_2}{r^3}\mathbf{r}_{12}
$$

#### 引力势能

$$
E_p = -G\frac{m_1 m_2}{r}
$$

#### 开普勒第三定律

$$
\frac{T^2}{a^3} = \frac{4\pi^2}{GM}
$$

其中 $T$ 是轨道周期，$a$ 是半长轴，$M$ 是中心天体质量。

#### 宇宙速度

第一宇宙速度（环绕速度）：

$$
v_1 = \sqrt{\frac{GM}{R}} = \sqrt{gR} \approx 7.9 \, \text{km/s}
$$

第二宇宙速度（脱离速度）：

$$
v_2 = \sqrt{\frac{2GM}{R}} = \sqrt{2gR} \approx 11.2 \, \text{km/s}
$$

第三宇宙速度（逃逸太阳系）：

$$
v_3 \approx 16.7 \, \text{km/s}
$$

### 1.8 简谐振动

#### 简谐振动方程

$$
x = A\cos(\omega t + \varphi)
$$

其中 $A$ 是振幅，$\omega$ 是角频率，$\varphi$ 是初相位。

速度：

$$
v = \frac{dx}{dt} = -A\omega\sin(\omega t + \varphi)
$$

加速度：

$$
a = \frac{d^2x}{dt^2} = -A\omega^2\cos(\omega t + \varphi) = -\omega^2 x
$$

#### 弹簧振子

$$
\omega = \sqrt{\frac{k}{m}}, \quad T = 2\pi\sqrt{\frac{m}{k}}, \quad f = \frac{1}{2\pi}\sqrt{\frac{k}{m}}
$$

#### 单摆

$$
\omega = \sqrt{\frac{g}{L}}, \quad T = 2\pi\sqrt{\frac{L}{g}}
$$

#### 简谐振动能量

$$
E = \frac{1}{2}kA^2 = \frac{1}{2}m\omega^2 A^2 = \text{const}
$$

动能：

$$
E_k = \frac{1}{2}mv^2 = \frac{1}{2}m\omega^2 A^2 \sin^2(\omega t + \varphi)
$$

势能：

$$
E_p = \frac{1}{2}kx^2 = \frac{1}{2}kA^2 \cos^2(\omega t + \varphi)
$$

---

## 2. 电磁学

### 2.1 静电学

#### 库仑定律

$$
F = k\frac{|q_1 q_2|}{r^2} = \frac{1}{4\pi\epsilon_0}\frac{|q_1 q_2|}{r^2}
$$

其中 $k = 8.99 \times 10^9 \, \text{N·m}^2/\text{C}^2$，$\epsilon_0 = 8.85 \times 10^{-12} \, \text{C}^2/(\text{N·m}^2)$ 是真空介电常数。

向量形式：

$$
\mathbf{F}_{12} = \frac{1}{4\pi\epsilon_0}\frac{q_1 q_2}{r^3}\mathbf{r}_{12}
$$

#### 电场强度

$$
\mathbf{E} = \frac{\mathbf{F}}{q_0} = \frac{1}{4\pi\epsilon_0}\frac{Q}{r^2}\hat{\mathbf{r}}
$$

#### 电场叠加原理

$$
\mathbf{E} = \sum_{i} \mathbf{E}_i = \frac{1}{4\pi\epsilon_0}\sum_{i} \frac{q_i}{r_i^2}\hat{\mathbf{r}}_i
$$

连续分布：

$$
\mathbf{E} = \frac{1}{4\pi\epsilon_0}\int \frac{dq}{r^2}\hat{\mathbf{r}}
$$

#### 电势

$$
V = \frac{W}{q_0} = \frac{1}{4\pi\epsilon_0}\frac{Q}{r}
$$

电势差：

$$
U_{AB} = V_A - V_B = -\int_A^B \mathbf{E} \cdot d\mathbf{l}
$$

#### 电场与电势的关系

$$
\mathbf{E} = -\nabla V = -\left(\frac{\partial V}{\partial x}\hat{\mathbf{i}} + \frac{\partial V}{\partial y}\hat{\mathbf{j}} + \frac{\partial V}{\partial z}\hat{\mathbf{k}}\right)
$$

#### 高斯定律

$$
\oint_S \mathbf{E} \cdot d\mathbf{A} = \frac{Q_{\text{enc}}}{\epsilon_0}
$$

微分形式：

$$
\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0}
$$

#### 电容

$$
C = \frac{Q}{U}
$$

平行板电容器：

$$
C = \frac{\epsilon_0 \epsilon_r A}{d}
$$

球形电容器：

$$
C = 4\pi\epsilon_0 \frac{R_1 R_2}{R_2 - R_1}
$$

圆柱形电容器：

$$
C = \frac{2\pi\epsilon_0 L}{\ln(R_2/R_1)}
$$

#### 电容器储能

$$
W = \frac{1}{2}QU = \frac{1}{2}CU^2 = \frac{Q^2}{2C}
$$

电场能量密度：

$$
u = \frac{1}{2}\epsilon_0 E^2
$$

### 2.2 电流与电路

#### 欧姆定律

$$
U = IR
$$

微观形式：

$$
\mathbf{J} = \sigma \mathbf{E}
$$

其中 $\mathbf{J}$ 是电流密度，$\sigma$ 是电导率。

#### 电阻

$$
R = \rho \frac{L}{A}
$$

其中 $\rho$ 是电阻率。

电阻温度系数：

$$
R(T) = R_0[1 + \alpha(T - T_0)]
$$

#### 电功率

$$
P = UI = I^2 R = \frac{U^2}{R}
$$

#### 基尔霍夫定律

电流定律（KCL）：

$$
\sum_{i} I_i = 0
$$

电压定律（KVL）：

$$
\sum_{i} U_i = 0
$$

#### 串联电路

$$
R_{\text{total}} = \sum_{i} R_i
$$

$$
\frac{1}{C_{\text{total}}} = \sum_{i} \frac{1}{C_i}
$$

#### 并联电路

$$
\frac{1}{R_{\text{total}}} = \sum_{i} \frac{1}{R_i}
$$

$$
C_{\text{total}} = \sum_{i} C_i
$$

### 2.3 磁学

#### 洛伦兹力

$$
\mathbf{F} = q(\mathbf{E} + \mathbf{v} \times \mathbf{B})
$$

纯磁场中：

$$
\mathbf{F} = q\mathbf{v} \times \mathbf{B}
$$

标量形式：

$$
F = qvB\sin\theta
$$

#### 安培力

$$
\mathbf{F} = I\mathbf{L} \times \mathbf{B}
$$

标量形式：

$$
F = BIL\sin\theta
$$

#### 毕奥-萨伐尔定律

$$
d\mathbf{B} = \frac{\mu_0}{4\pi}\frac{Id\mathbf{l} \times \hat{\mathbf{r}}}{r^2}
$$

其中 $\mu_0 = 4\pi \times 10^{-7} \, \text{T·m/A}$ 是真空磁导率。

#### 无限长直导线磁场

$$
B = \frac{\mu_0 I}{2\pi r}
$$

#### 圆形线圈中心磁场

$$
B = \frac{\mu_0 I}{2R}
$$

#### 螺线管磁场

$$
B = \mu_0 n I
$$

其中 $n$ 是单位长度匝数。

#### 安培环路定理

$$
\oint_C \mathbf{B} \cdot d\mathbf{l} = \mu_0 I_{\text{enc}}
$$

微分形式：

$$
\nabla \times \mathbf{B} = \mu_0 \mathbf{J}
$$

#### 磁通量

$$
\Phi_B = \int_S \mathbf{B} \cdot d\mathbf{A}
$$

#### 高斯磁定律

$$
\oint_S \mathbf{B} \cdot d\mathbf{A} = 0
$$

微分形式：

$$
\nabla \cdot \mathbf{B} = 0
$$

### 2.4 电磁感应

#### 法拉第电磁感应定律

$$
\mathcal{E} = -\frac{d\Phi_B}{dt} = -\frac{d}{dt}\int_S \mathbf{B} \cdot d\mathbf{A}
$$

#### 动生电动势

$$
\mathcal{E} = \int (\mathbf{v} \times \mathbf{B}) \cdot d\mathbf{l} = BLv
$$

#### 感生电动势

$$
\mathcal{E} = -\int_C \mathbf{E}_{\text{induced}} \cdot d\mathbf{l}
$$

#### 自感

$$
\mathcal{E}_L = -L\frac{dI}{dt}
$$

其中 $L$ 是自感系数。

螺线管自感：

$$
L = \mu_0 n^2 V = \mu_0 n^2 Al
$$

#### 互感

$$
\mathcal{E}_2 = -M\frac{dI_1}{dt}
$$

#### 磁场能量

$$
W = \frac{1}{2}LI^2
$$

磁场能量密度：

$$
u = \frac{B^2}{2\mu_0}
$$

### 2.5 麦克斯韦方程组

#### 积分形式

高斯电定律：

$$
\oint_S \mathbf{E} \cdot d\mathbf{A} = \frac{Q_{\text{enc}}}{\epsilon_0}
$$

高斯磁定律：

$$
\oint_S \mathbf{B} \cdot d\mathbf{A} = 0
$$

法拉第电磁感应定律：

$$
\oint_C \mathbf{E} \cdot d\mathbf{l} = -\frac{d\Phi_B}{dt}
$$

安培-麦克斯韦定律：

$$
\oint_C \mathbf{B} \cdot d\mathbf{l} = \mu_0 I_{\text{enc}} + \mu_0\epsilon_0\frac{d\Phi_E}{dt}
$$

#### 微分形式

$$
\begin{cases}
\nabla \cdot \mathbf{E} = \frac{\rho}{\epsilon_0} \\
\nabla \cdot \mathbf{B} = 0 \\
\nabla \times \mathbf{E} = -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} = \mu_0 \mathbf{J} + \mu_0\epsilon_0\frac{\partial \mathbf{E}}{\partial t}
\end{cases}
$$

#### 电磁波方程

$$
\nabla^2 \mathbf{E} = \mu_0\epsilon_0\frac{\partial^2 \mathbf{E}}{\partial t^2}
$$

$$
\nabla^2 \mathbf{B} = \mu_0\epsilon_0\frac{\partial^2 \mathbf{B}}{\partial t^2}
$$

#### 电磁波速度

$$
c = \frac{1}{\sqrt{\mu_0\epsilon_0}} \approx 3 \times 10^8 \, \text{m/s}
$$

---

## 3. 热力学

### 3.1 理想气体定律

$$
PV = nRT = Nk_B T
$$

其中 $R = 8.314 \, \text{J/(mol·K)}$ 是气体常数，$k_B = 1.38 \times 10^{-23} \, \text{J/K}$ 是玻尔兹曼常数。

### 3.2 气体分子动理论

#### 压强公式

$$
P = \frac{1}{3}nm\overline{v^2} = \frac{2}{3}n\overline{E_k}
$$

#### 分子平均动能

$$
\overline{E_k} = \frac{3}{2}k_B T
$$

#### 方均根速率

$$
v_{\text{rms}} = \sqrt{\overline{v^2}} = \sqrt{\frac{3k_B T}{m}} = \sqrt{\frac{3RT}{M}}
$$

#### 麦克斯韦速率分布

$$
f(v) = 4\pi n \left(\frac{m}{2\pi k_B T}\right)^{3/2} v^2 e^{-\frac{mv^2}{2k_B T}}
$$

最概然速率：

$$
v_p = \sqrt{\frac{2k_B T}{m}}
$$

平均速率：

$$
\bar{v} = \sqrt{\frac{8k_B T}{\pi m}}
$$

### 3.3 热力学第一定律

$$
\Delta U = Q - W
$$

其中 $\Delta U$ 是内能变化，$Q$ 是吸收的热量，$W$ 是对外做功。

微分形式：

$$
dU = \delta Q - \delta W = \delta Q - PdV
$$

#### 定容过程

$$
W = 0, \quad Q = \Delta U = nC_V \Delta T
$$

#### 定压过程

$$
W = P\Delta V = nR\Delta T, \quad Q = nC_P \Delta T
$$

$$
\Delta U = Q - W = nC_V \Delta T
$$

#### 等温过程

$$
\Delta U = 0, \quad Q = W = nRT\ln\frac{V_2}{V_1}
$$

#### 绝热过程

$$
Q = 0, \quad \Delta U = -W
$$

绝热方程：

$$
PV^\gamma = \text{const}, \quad TV^{\gamma-1} = \text{const}, \quad TP^{(\gamma-1)/\gamma} = \text{const}
$$

其中 $\gamma = C_P/C_V$ 是比热容比。

### 3.4 热力学第二定律

#### 克劳修斯表述

热量不能自发地从低温物体传到高温物体。

#### 开尔文表述

不可能从单一热源吸热使之完全转化为功而不产生其他影响。

#### 熵的定义

$$
dS = \frac{\delta Q_{\text{rev}}}{T}
$$

熵增原理：

$$
\Delta S_{\text{universe}} \geq 0
$$

#### 卡诺循环效率

$$
\eta = 1 - \frac{T_C}{T_H} = \frac{W}{Q_H}
$$

其中 $T_H$ 是高温热源温度，$T_C$ 是低温热源温度。

#### 制冷系数

$$
\text{COP} = \frac{Q_C}{W} = \frac{T_C}{T_H - T_C}
$$

### 3.5 热传导

#### 傅里叶定律

$$
\frac{dQ}{dt} = -kA\frac{dT}{dx}
$$

其中 $k$ 是热导率。

三维形式：

$$
\mathbf{q} = -k\nabla T
$$

#### 热扩散方程

$$
\frac{\partial T}{\partial t} = \alpha \nabla^2 T
$$

其中 $\alpha = k/(\rho c)$ 是热扩散系数。

---

## 4. 波动与光学

### 4.1 波动方程

#### 一维波动方程

$$
\frac{\partial^2 y}{\partial t^2} = v^2 \frac{\partial^2 y}{\partial x^2}
$$

通解：

$$
y(x,t) = f(x - vt) + g(x + vt)
$$

#### 简谐波

$$
y(x,t) = A\sin(kx - \omega t + \varphi)
$$

其中 $k = 2\pi/\lambda$ 是波数，$\omega = 2\pi f$ 是角频率。

波速：

$$
v = \frac{\omega}{k} = \lambda f
$$

### 4.2 波的干涉

#### 双缝干涉

光程差：

$$
\delta = d\sin\theta \approx \frac{dx}{L}
$$

明纹条件：

$$
\delta = n\lambda, \quad n = 0, \pm 1, \pm 2, \ldots
$$

暗纹条件：

$$
\delta = (n + \frac{1}{2})\lambda
$$

条纹间距：

$$
\Delta x = \frac{\lambda L}{d}
$$

#### 薄膜干涉

光程差：

$$
\delta = 2nt\cos\theta_r + \frac{\lambda}{2}
$$

其中 $n$ 是薄膜折射率，$t$ 是厚度，$\theta_r$ 是折射角。

### 4.3 波的衍射

#### 单缝衍射

暗纹条件：

$$
a\sin\theta = n\lambda, \quad n = \pm 1, \pm 2, \ldots
$$

其中 $a$ 是缝宽。

中央明纹宽度：

$$
\Delta x = \frac{2\lambda L}{a}
$$

#### 圆孔衍射（艾里斑）

第一暗环角半径：

$$
\sin\theta = 1.22\frac{\lambda}{D}
$$

其中 $D$ 是圆孔直径。

瑞利判据（分辨极限）：

$$
\theta_{\min} = 1.22\frac{\lambda}{D}
$$

#### 光栅衍射

主极大条件：

$$
d\sin\theta = n\lambda, \quad n = 0, \pm 1, \pm 2, \ldots
$$

其中 $d$ 是光栅常数。

### 4.4 几何光学

#### 折射定律（斯涅尔定律）

$$
n_1 \sin\theta_1 = n_2 \sin\theta_2
$$

#### 全反射临界角

$$
\sin\theta_c = \frac{n_2}{n_1}
$$

#### 薄透镜公式

$$
\frac{1}{f} = \frac{1}{s_o} + \frac{1}{s_i}
$$

其中 $f$ 是焦距，$s_o$ 是物距，$s_i$ 是像距。

放大率：

$$
m = -\frac{s_i}{s_o} = \frac{h_i}{h_o}
$$

#### 透镜制造者公式

$$
\frac{1}{f} = (n - 1)\left(\frac{1}{R_1} - \frac{1}{R_2}\right)
$$

### 4.5 偏振

#### 马吕斯定律

$$
I = I_0 \cos^2\theta
$$

#### 布儒斯特角

$$
\tan\theta_B = \frac{n_2}{n_1}
$$

此时反射光完全偏振。

---

## 5. 狭义相对论

### 5.1 洛伦兹变换

#### 坐标变换

$$
\begin{cases}
x' = \gamma(x - vt) \\
y' = y \\
z' = z \\
t' = \gamma\left(t - \frac{vx}{c^2}\right)
\end{cases}
$$

其中洛伦兹因子：

$$
\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}
$$

#### 速度变换

$$
u_x' = \frac{u_x - v}{1 - u_x v/c^2}
$$

$$
u_y' = \frac{u_y}{\gamma(1 - u_x v/c^2)}
$$

### 5.2 时间膨胀

$$
\Delta t = \gamma \Delta t_0 = \frac{\Delta t_0}{\sqrt{1 - v^2/c^2}}
$$

其中 $\Delta t_0$ 是固有时间。

### 5.3 长度收缩

$$
L = \frac{L_0}{\gamma} = L_0\sqrt{1 - v^2/c^2}
$$

其中 $L_0$ 是固有长度。

### 5.4 相对论动力学

#### 相对论动量

$$
\mathbf{p} = \gamma m \mathbf{v} = \frac{m\mathbf{v}}{\sqrt{1 - v^2/c^2}}
$$

#### 相对论能量

$$
E = \gamma mc^2 = \frac{mc^2}{\sqrt{1 - v^2/c^2}}
$$

静止能量：

$$
E_0 = mc^2
$$

动能：

$$
E_k = E - E_0 = (\gamma - 1)mc^2
$$

#### 能量-动量关系

$$
E^2 = (pc)^2 + (mc^2)^2
$$

对于光子（$m = 0$）：

$$
E = pc = h\nu = \frac{hc}{\lambda}
$$

---

## 6. 量子力学基础

### 6.1 光的量子性

#### 普朗克公式

$$
E = h\nu = \hbar\omega
$$

其中 $h = 6.626 \times 10^{-34} \, \text{J·s}$ 是普朗克常数，$\hbar = h/(2\pi)$ 是约化普朗克常数。

#### 光电效应

$$
E_k = h\nu - W = h\nu - h\nu_0
$$

其中 $W$ 是逸出功，$\nu_0$ 是截止频率。

#### 康普顿散射

$$
\lambda' - \lambda = \frac{h}{m_e c}(1 - \cos\theta)
$$

其中 $\lambda_C = h/(m_e c) = 2.43 \times 10^{-12} \, \text{m}$ 是康普顿波长。

### 6.2 物质的波动性

#### 德布罗意波长

$$
\lambda = \frac{h}{p} = \frac{h}{mv}
$$

#### 德布罗意关系

$$
E = \hbar\omega, \quad \mathbf{p} = \hbar\mathbf{k}
$$

### 6.3 薛定谔方程

#### 含时薛定谔方程

$$
i\hbar\frac{\partial\Psi}{\partial t} = \hat{H}\Psi = -\frac{\hbar^2}{2m}\nabla^2\Psi + V\Psi
$$

#### 定态薛定谔方程

$$
\hat{H}\psi = E\psi
$$

$$
-\frac{\hbar^2}{2m}\frac{d^2\psi}{dx^2} + V(x)\psi = E\psi
$$

#### 波函数归一化

$$
\int_{-\infty}^{\infty} |\Psi(x,t)|^2 dx = 1
$$

#### 概率密度

$$
\rho(x,t) = |\Psi(x,t)|^2 = \Psi^*\Psi
$$

### 6.4 不确定性原理

#### 海森堡不确定性原理

位置-动量不确定性：

$$
\Delta x \cdot \Delta p \geq \frac{\hbar}{2}
$$

能量-时间不确定性：

$$
\Delta E \cdot \Delta t \geq \frac{\hbar}{2}
$$

### 6.5 一维势阱

#### 无限深势阱

能量本征值：

$$
E_n = \frac{n^2\pi^2\hbar^2}{2mL^2}, \quad n = 1, 2, 3, \ldots
$$

波函数：

$$
\psi_n(x) = \sqrt{\frac{2}{L}}\sin\left(\frac{n\pi x}{L}\right)
$$

#### 谐振子

能量本征值：

$$
E_n = \hbar\omega\left(n + \frac{1}{2}\right), \quad n = 0, 1, 2, \ldots
$$

基态波函数：

$$
\psi_0(x) = \left(\frac{m\omega}{\pi\hbar}\right)^{1/4} e^{-\frac{m\omega x^2}{2\hbar}}
$$

### 6.6 氢原子

#### 能级公式

$$
E_n = -\frac{13.6 \, \text{eV}}{n^2} = -\frac{m_e e^4}{32\pi^2\epsilon_0^2\hbar^2 n^2}
$$

#### 玻尔半径

$$
a_0 = \frac{4\pi\epsilon_0\hbar^2}{m_e e^2} \approx 0.529 \, \text{Å}
$$

#### 里德伯公式

$$
\frac{1}{\lambda} = R_\infty\left(\frac{1}{n_1^2} - \frac{1}{n_2^2}\right)
$$

其中 $R_\infty = 1.097 \times 10^7 \, \text{m}^{-1}$ 是里德伯常数。

---

## 7. 流体力学

### 7.1 连续性方程

$$
\frac{\partial\rho}{\partial t} + \nabla \cdot (\rho\mathbf{v}) = 0
$$

对于不可压缩流体：

$$
\nabla \cdot \mathbf{v} = 0
$$

一维稳定流：

$$
A_1 v_1 = A_2 v_2
$$

### 7.2 伯努利方程

$$
P + \frac{1}{2}\rho v^2 + \rho gh = \text{const}
$$

### 7.3 泊肃叶定律

圆管中的流量：

$$
Q = \frac{\pi R^4 \Delta P}{8\eta L}
$$

其中 $\eta$ 是动力粘度。

### 7.4 斯托克斯定律

球体在粘性流体中的阻力：

$$
F = 6\pi\eta Rv
$$

---

## 8. 原子核物理

### 8.1 质能方程

$$
E = mc^2
$$

### 8.2 结合能

$$
E_B = [Zm_p + Nm_n - M(A,Z)]c^2
$$

其中 $Z$ 是质子数，$N$ 是中子数，$A = Z + N$ 是质量数。

### 8.3 放射性衰变

$$
N(t) = N_0 e^{-\lambda t}
$$

半衰期：

$$
T_{1/2} = \frac{\ln 2}{\lambda}
$$

活度：

$$
A = \lambda N = \frac{dN}{dt}
$$

---

## 附录：物理常数表

| 常数 | 符号 | 数值 |
|------|------|------|
| 光速 | $c$ | $2.998 \times 10^8 \, \text{m/s}$ |
| 引力常数 | $G$ | $6.674 \times 10^{-11} \, \text{N·m}^2/\text{kg}^2$ |
| 普朗克常数 | $h$ | $6.626 \times 10^{-34} \, \text{J·s}$ |
| 约化普朗克常数 | $\hbar$ | $1.055 \times 10^{-34} \, \text{J·s}$ |
| 玻尔兹曼常数 | $k_B$ | $1.381 \times 10^{-23} \, \text{J/K}$ |
| 气体常数 | $R$ | $8.314 \, \text{J/(mol·K)}$ |
| 阿伏伽德罗常数 | $N_A$ | $6.022 \times 10^{23} \, \text{mol}^{-1}$ |
| 真空介电常数 | $\epsilon_0$ | $8.854 \times 10^{-12} \, \text{F/m}$ |
| 真空磁导率 | $\mu_0$ | $4\pi \times 10^{-7} \, \text{H/m}$ |
| 电子质量 | $m_e$ | $9.109 \times 10^{-31} \, \text{kg}$ |
| 质子质量 | $m_p$ | $1.673 \times 10^{-27} \, \text{kg}$ |
| 中子质量 | $m_n$ | $1.675 \times 10^{-27} \, \text{kg}$ |
| 元电荷 | $e$ | $1.602 \times 10^{-19} \, \text{C}$ |
| 玻尔半径 | $a_0$ | $5.292 \times 10^{-11} \, \text{m}$ |
| 里德伯常数 | $R_\infty$ | $1.097 \times 10^7 \, \text{m}^{-1}$ |

---

本文档涵盖了经典物理学的核心公式，包括力学、电磁学、热力学、光学、相对论、量子力学等主要领域。所有公式使用 LaTeX 格式编写，支持 Zditor 的数学公式渲染。
