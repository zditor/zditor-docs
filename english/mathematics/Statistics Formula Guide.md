---
tags:
  type: text
  description:
  label: Tags
  value: "Statistics · Formulas · Probability · Inference"
description:
  type: text
  description:
  label: Description
  value: "Descriptive Statistics · Probability Distributions · Estimation · Hypothesis Testing · Regression"
title:
  type: text
  description:
  label: Title
  value: "Statistics Formula Guide"
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
  value: "Statistics"
---
# Statistics Formula Guide

Statistics studies how to extract information from data, describe patterns, and make inferences under uncertainty. It connects probability, data analysis, and decision-making, and forms a core foundation for experiments, machine learning, finance, and social science research. This document collects common statistical formulas and explains how they are used in practical analysis.


---

## 1. Descriptive Statistics

Descriptive statistics summarize central tendency, dispersion, and distribution shape. They are the starting point of almost every data analysis workflow.

### 1.1 Mean, Median, and Mode

The sample mean is defined as:

$$
\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i
$$

where $x_i$ is the $i$th observation and $n$ is the sample size.

The weighted mean is:

$$
\bar{x}_w = \frac{\sum_{i=1}^{n} w_i x_i}{\sum_{i=1}^{n} w_i}
$$

The median is the middle value after sorting, and the mode is the most frequent value. For skewed distributions, the median is often more stable than the mean.

!!! tip Choosing a measure of center
    When the data contain large outliers, the mean can be pulled away from the typical level, while the median often remains more representative.

### 1.2 Variance and Standard Deviation

Population variance is defined as:

$$
\sigma^2 = \frac{1}{N}\sum_{i=1}^{N}(x_i - \mu)^2
$$

Sample variance is:

$$
s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2
$$

Standard deviation is the square root of variance:

$$
\sigma = \sqrt{\sigma^2}, \qquad s = \sqrt{s^2}
$$

The denominator uses $n-1$ rather than $n$ so that sample variance becomes an unbiased estimator of population variance.

### 1.3 Covariance and Correlation

The covariance between two random variables $X$ and $Y$ is:

$$
\operatorname{Cov}(X, Y) = \mathbb{E}[(X - \mu_X)(Y - \mu_Y)]
$$

The sample covariance is:

$$
s_{XY} = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})
$$

The Pearson correlation coefficient is:

$$
r = \frac{s_{XY}}{s_X s_Y}
$$

where $r \in [-1, 1]$. Values close to 1 indicate strong positive linear association, values close to -1 indicate strong negative linear association, and values near 0 indicate weak linear association.


---

## 2. Probability Distributions

Statistical inference depends on probability models. Different distributions describe different kinds of data-generating behavior.

### 2.1 Discrete Distributions

#### Bernoulli Distribution

If $X \in \{0, 1\}$ with success probability $p$, then:

$$
P(X = x) = p^x (1-p)^{1-x}, \qquad x \in \{0, 1\}
$$

Its mean and variance are:

$$
\mathbb{E}[X] = p, \qquad \operatorname{Var}(X) = p(1-p)
$$

#### Binomial Distribution

If $X \sim \operatorname{Bin}(n, p)$, then:

$$
P(X = k) = \binom{n}{k} p^k (1-p)^{n-k}, \qquad k = 0, 1, \ldots, n
$$

Its mean and variance are:

$$
\mathbb{E}[X] = np, \qquad \operatorname{Var}(X) = np(1-p)
$$

#### Poisson Distribution

If the average number of events per interval is $\lambda$, then:

$$
P(X = k) = \frac{\lambda^k e^{-\lambda}}{k!}, \qquad k = 0, 1, 2, \ldots
$$

and:

$$
\mathbb{E}[X] = \lambda, \qquad \operatorname{Var}(X) = \lambda
$$

### 2.2 Continuous Distributions

#### Normal Distribution

If $X \sim \mathcal{N}(\mu, \sigma^2)$, its density is:

$$
f(x) = \frac{1}{\sqrt{2\pi}\sigma}\exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

The standard normal variable is written as $Z \sim \mathcal{N}(0, 1)$, with standardization:

$$
Z = \frac{X - \mu}{\sigma}
$$

#### Exponential Distribution

If events arrive at rate $\lambda$, then the waiting time $X$ can be modeled as exponential:

$$
f(x) = \lambda e^{-\lambda x}, \qquad x \ge 0
$$

Its mean and variance are:

$$
\mathbb{E}[X] = \frac{1}{\lambda}, \qquad \operatorname{Var}(X) = \frac{1}{\lambda^2}
$$

!!! info Normal approximation
    When the sample size is large enough, many statistics become approximately normal because of the central limit theorem. This is why $z$ tests and confidence intervals appear so often.


---

## 3. Parameter Estimation

Parameter estimation uses sample data to approximate unknown population parameters and quantify the uncertainty of that approximation.

### 3.1 Point Estimation

A natural point estimator for the population mean $\mu$ is the sample mean:

$$
\hat{\mu} = \bar{x}
$$

A common estimator for population variance $\sigma^2$ is:

$$
\hat{\sigma}^2 = s^2 = \frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2
$$

For a Bernoulli model, the maximum likelihood estimator of success probability $p$ is:

$$
\hat{p} = \frac{1}{n}\sum_{i=1}^{n} x_i
$$

### 3.2 Maximum Likelihood Estimation

Given samples $x_1, x_2, \ldots, x_n$ and parameter $\theta$, the likelihood is:

$$
L(\theta) = \prod_{i=1}^{n} f(x_i \mid \theta)
$$

The log-likelihood is:

$$
\ell(\theta) = \log L(\theta) = \sum_{i=1}^{n} \log f(x_i \mid \theta)
$$

The maximum likelihood estimator satisfies:

$$
\hat{\theta}_{\mathrm{MLE}} = \arg\max_{\theta} L(\theta) = \arg\max_{\theta} \ell(\theta)
$$

Using the log-likelihood turns products into sums and usually makes differentiation easier.

### 3.3 Confidence Intervals

When population variance is known, a $100(1-\alpha)\%$ confidence interval for the population mean is:

$$
\bar{x} \pm z_{\alpha/2}\frac{\sigma}{\sqrt{n}}
$$

When population variance is unknown and the population is approximately normal, use the $t$ distribution:

$$
\bar{x} \pm t_{\alpha/2,\,n-1}\frac{s}{\sqrt{n}}
$$

An approximate confidence interval for a proportion $p$ is:

$$
\hat{p} \pm z_{\alpha/2}\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}
$$

!!! warning What confidence intervals mean
    A 95% confidence interval does not mean the parameter has a 95% probability of lying inside this specific interval. It means that, across repeated sampling, about 95% of such constructed intervals would contain the true parameter.


---

## 4. Hypothesis Testing

Hypothesis testing evaluates whether sample evidence is strong enough to reject a null hypothesis.

### 4.1 Test Statistics

For a one-sample mean test with known variance, the $z$ statistic is:

$$
Z = \frac{\bar{x} - \mu_0}{\sigma / \sqrt{n}}
$$

When variance is unknown, use the $t$ statistic:

$$
T = \frac{\bar{x} - \mu_0}{s / \sqrt{n}}
$$

For a one-sample proportion test:

$$
Z = \frac{\hat{p} - p_0}{\sqrt{p_0(1-p_0)/n}}
$$

### 4.2 p-Values and Significance Level

A $p$-value is the probability, assuming the null hypothesis is true, of observing the current result or one even more extreme. If:

$$
p \le \alpha
$$

we usually reject the null hypothesis $H_0$.

Where:

- $\alpha$ is the significance level, often 0.05 or 0.01
- the probability of Type I error is $\alpha$
- the probability of Type II error is denoted by $\beta$
- the power of the test is $1 - \beta$

### 4.3 Chi-Square Test

The chi-square statistic is commonly used for goodness-of-fit tests and contingency table independence tests:

$$
\chi^2 = \sum_{i=1}^{k}\frac{(O_i - E_i)^2}{E_i}
$$

where $O_i$ is the observed frequency and $E_i$ is the expected frequency.


---

## 5. Regression Analysis

Regression analysis studies quantitative relationships between variables and is a core tool for prediction and interpretation.

### 5.1 Simple Linear Regression

The simple linear regression model is:

$$
y_i = \beta_0 + \beta_1 x_i + \varepsilon_i
$$

Least squares minimizes the residual sum of squares:

$$
S(\beta_0, \beta_1) = \sum_{i=1}^{n}(y_i - \beta_0 - \beta_1 x_i)^2
$$

The closed-form solution is:

$$
\hat{\beta}_1 = \frac{\sum_{i=1}^{n}(x_i - \bar{x})(y_i - \bar{y})}{\sum_{i=1}^{n}(x_i - \bar{x})^2}
$$

$$
\hat{\beta}_0 = \bar{y} - \hat{\beta}_1 \bar{x}
$$

### 5.2 Coefficient of Determination

The coefficient of determination $R^2$ measures the proportion of variance explained by the model:

$$
R^2 = 1 - \frac{\sum_{i=1}^{n}(y_i - \hat{y}_i)^2}{\sum_{i=1}^{n}(y_i - \bar{y})^2}
$$

Values closer to 1 indicate stronger fit on the sample data, but a high $R^2$ does not by itself establish causality.

### 5.3 Matrix Form

Multiple linear regression can be written as:

$$
\mathbf{y} = \mathbf{X}\boldsymbol{\beta} + \boldsymbol{\varepsilon}
$$

The least-squares estimator is:

$$
\hat{\boldsymbol{\beta}} = (\mathbf{X}^T \mathbf{X})^{-1}\mathbf{X}^T \mathbf{y}
$$

This formula connects statistical modeling directly to linear algebra and shows why linear algebra is so central to data science.


---

## 6. Quick Reference

|Category |Formula |Use |
|---|---|---|
|Sample mean |$\bar{x} = \frac{1}{n}\sum x_i$ |Central tendency |
|Sample variance |$s^2 = \frac{1}{n-1}\sum (x_i-\bar{x})^2$ |Dispersion |
|Correlation |$r = \frac{s_{XY}}{s_X s_Y}$ |Linear association |
|Standardization |$z = \frac{x-\mu}{\sigma}$ |Remove scale effects |
|Confidence interval |estimate $\pm$ critical value $\times$ standard error |Quantify uncertainty |
|Test statistic |difference / standard error |Significance decisions |

The value of statistics is not just plugging numbers into formulas. These formulas make uncertainty explicit. A strong statistical document should present the model assumptions, the formula structure, and the interpretation context together.
