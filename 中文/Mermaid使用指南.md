---
description:
  type: text
  description:
  label: Description
  value: "流程图 · 时序图 · 甘特图 · ER 图 · Mindmap"
author:
  type: text
  description:
  label: Author
  value: "SeeLey & Codex"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../assets/guides/mermaid-guide-cover-nanobanana.jpg"
col:
  type: array
  description:
  label: Col
  value: ["subject","title","description"]
subject:
  type: text
  description:
  label: Subject
  value: "Mermaid"
avatar:
  type: asset
  description:
  label: Avatar
  value: "../assets/nanobanana-avatar.svg"
tags:
  type: text
  description:
  label: Tags
  value: "Mermaid · 图表 · 指南"
title:
  type: text
  description:
  label: Title
  value: "Mermaid使用指南"
display:
  type: checkbox
  description: display
  label: 显示属性
  value: false
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-11"
warm:
  type: checkbox
  description: warm
  label: 暖色调
  value: true
row:
  type: array
  description:
  label: Row
  value: ["avatar","author","updated","tags"]
---
# Mermaid使用指南

Mermaid 是一种用文本描述图表的语法。你只需要在 Markdown 中写一个 `mermaid` 代码块，就可以生成流程图、时序图、甘特图、ER 图、Git 图等常见图表。

这份指南的目标不是覆盖全部语法，而是帮助你在 Zditor 中快速写出可用、清晰、易维护的 Mermaid 图。

## 快速开始

最小可用示例：

```mermaid
flowchart TD
    A[开始] --> B[填写信息]
    B --> C{校验通过?}
    C -->|是| D[提交成功]
    C -->|否| E[提示错误]
```

使用时只要记住两点：

- 代码块语言标记必须是 `mermaid`
- 先选对图表类型，再写内容

## 什么时候用哪种图

|场景 |推荐图表 |
|---|---|
|业务流程、审批流、判断分支 |Flowchart |
|前后端、服务、数据库调用顺序 |Sequence Diagram |
|项目排期、里程碑、任务依赖 |Gantt Chart |
|类关系、接口设计、模块结构 |Class Diagram |
|状态切换、生命周期、状态机 |State Diagram |
|数据库表结构、实体关系 |ER Diagram |
|用户体验流程、服务接触点 |User Journey |
|比例分布、占比展示 |Pie Chart |
|分支合并、版本演进 |Git Graph |
|头脑风暴、知识结构 |Mindmap |

## 通用书写建议

- 节点文本尽量短，长句放到正文，不要塞进图里。
- 一张图只表达一个主题，不要把流程、数据结构、排期混在一起。
- 优先使用中文业务词，不要混杂过多内部缩写。
- 节点数量过多时，先拆成两张图，再考虑子图。
- 从上到下 `TD` 和从左到右 `LR` 是最稳妥的默认方向。

## 流程图 Flowchart

适合表达步骤、判断、跳转和模块关系，是最常用的 Mermaid 图。

### 最小示例

```mermaid
flowchart TD
    A[用户打开页面] --> B[输入账号密码]
    B --> C{校验通过?}
    C -->|是| D[进入首页]
    C -->|否| E[展示错误信息]
```

### 常见节点形状

```mermaid
flowchart LR
    A[普通节点]
    B(圆角节点)
    C{判断节点}
    D[(数据库)]
    E[[子流程]]
```

### 常见连接方式

```mermaid
flowchart LR
    A --> B
    B -.-> C
    C ==> D
    D --说明文字--> E
```

### 子图

```mermaid
flowchart TB
    subgraph 前端
        A[页面] --> B[API 请求]
    end

    subgraph 后端
        C[服务] --> D[(数据库)]
    end

    B --> C
```

### 适用建议

- 业务流程图优先用 `TD`
- 系统架构图优先用 `LR`
- 判断分支尽量写成 `是 / 否` 或 `成功 / 失败`

### 实战示例：订单提交流程

```mermaid
flowchart TD
    A[用户提交订单] --> B[创建待支付订单]
    B --> C{库存是否充足?}
    C -->|否| D[提示库存不足]
    C -->|是| E[锁定库存]
    E --> F[拉起支付]
    F --> G{支付结果}
    G -->|成功| H[生成发货任务]
    G -->|失败| I[释放库存]
    H --> J[通知仓库]
    I --> K[订单关闭]
```

### 实战示例：带泳道的系统协作流程

```mermaid
flowchart LR
    subgraph 用户侧
        A[用户点击发布]
        B[查看发布结果]
    end

    subgraph Web应用
        C[提交内容]
        D[校验参数]
        E[写入任务表]
    end

    subgraph 发布服务
        F[消费发布任务]
        G[渲染页面]
        H[上传静态资源]
    end

    A --> C
    C --> D
    D -->|通过| E
    D -->|失败| B
    E --> F
    F --> G
    G --> H
    H --> B
```

## 时序图 Sequence Diagram

适合表达多个参与方之间“谁先调用谁、谁返回什么”。

### 最小示例

```mermaid
sequenceDiagram
    participant U as 用户
    participant FE as 前端
    participant BE as 后端
    participant DB as 数据库

    U->>FE: 提交登录表单
    FE->>BE: 发送账号密码
    BE->>DB: 查询用户
    DB-->>BE: 返回用户记录
    BE-->>FE: 返回登录结果
    FE-->>U: 显示结果
```

### 条件、可选和循环

```mermaid
sequenceDiagram
    participant Client as 客户端
    participant Server as 服务端

    Client->>Server: 请求资源

    alt 已登录
        Server-->>Client: 返回数据
    else 未登录
        Server-->>Client: 返回 401
    end

    opt 触发埋点
        Client->>Server: 上报日志
    end

    loop 重试 3 次
        Client->>Server: 重试请求
    end
```

### 适用建议

- 参与者不要超过 6 个，否则可读性会明显下降
- 一条消息写一个动作，不要把“鉴权 + 查询 + 转换 + 返回”塞在同一行

### 实战示例：文件保存时序

```mermaid
sequenceDiagram
    participant U as 用户
    participant E as 编辑器
    participant S as 同步服务
    participant G as Git服务

    U->>E: 点击保存
    E->>E: 本地写入文件
    E->>S: 上报变更摘要
    alt 开启自动同步
        S->>G: 创建提交
        G-->>S: 返回提交结果
        S-->>E: 同步成功
    else 仅本地保存
        S-->>E: 跳过远端同步
    end
    E-->>U: 显示保存状态
```

### 实战示例：带重试的 API 调用

```mermaid
sequenceDiagram
    participant FE as 前端
    participant API as API网关
    participant SVC as 业务服务

    FE->>API: POST /publish
    API->>SVC: 转发请求
    alt 服务成功
        SVC-->>API: 200 OK
        API-->>FE: 发布成功
    else 服务超时
        loop 最多重试 2 次
            API->>SVC: 重试请求
        end
        SVC-->>API: 504 Timeout
        API-->>FE: 请稍后重试
    end
```

## 甘特图 Gantt Chart

适合项目计划、里程碑、阶段性任务展示。

### 最小示例

```mermaid
gantt
    title 文档发布计划
    dateFormat YYYY-MM-DD

    section 准备阶段
    需求梳理 :done, a1, 2026-04-01, 3d
    内容整理 :active, a2, after a1, 4d

    section 发布阶段
    校对     :a3, after a2, 2d
    正式发布 :milestone, a4, 2026-04-10, 0d
```

### 常见状态

- `done`：已完成
- `active`：进行中
- `crit`：关键任务
- `milestone`：里程碑

### 实战示例：版本发布计划

```mermaid
gantt
    title 版本发布计划
    dateFormat YYYY-MM-DD

    section 需求阶段
    需求收集      :done, r1, 2026-04-01, 3d
    方案评审      :done, r2, after r1, 2d

    section 开发阶段
    核心功能开发  :active, d1, 2026-04-06, 6d
    回归修复      :crit, d2, after d1, 3d

    section 发布阶段
    灰度发布      :g1, 2026-04-16, 2d
    正式上线      :milestone, g2, 2026-04-18, 0d
```

## 类图 Class Diagram

适合表达类、接口、属性、方法以及它们之间的关系。

```mermaid
classDiagram
    class User {
        +String id
        +String name
        +login()
    }

    class Order {
        +String orderId
        +create()
    }

    User --> Order : places
```

### 实战示例：编辑器与文档模型

```mermaid
classDiagram
    class Editor {
        +String filePath
        +open()
        +save()
        +render()
    }

    class Document {
        +String title
        +String body
        +parse()
    }

    class SuperTag {
        +Map fields
        +validate()
    }

    class Renderer {
        +renderMarkdown()
        +renderMermaid()
    }

    Editor --> Document : edits
    Document --> SuperTag : contains
    Editor --> Renderer : uses
```

## 状态图 State Diagram

适合表达对象或流程的状态切换。

```mermaid
stateDiagram-v2
    [*] --> 待支付
    待支付 --> 已支付: 支付成功
    待支付 --> 已取消: 超时关闭
    已支付 --> 已发货: 仓库出库
    已发货 --> 已完成: 用户签收
```

### 实战示例：内容发布状态机

```mermaid
stateDiagram-v2
    [*] --> 草稿
    草稿 --> 待审核: 提交审核
    待审核 --> 已发布: 审核通过
    待审核 --> 草稿: 驳回修改
    已发布 --> 已下线: 主动下线
    已发布 --> 待审核: 重新提交更新
    已下线 --> [*]
```

## ER 图 ER Diagram

适合数据库表关系和实体建模。

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : referenced_by

    USER {
        string id
        string name
    }
    ORDER {
        string id
        date created_at
    }
```

### 实战示例：权限与文档关系

```mermaid
erDiagram
    USER ||--o{ DOCUMENT : creates
    DOCUMENT ||--o{ DOCUMENT_TAG : tagged_with
    TAG ||--o{ DOCUMENT_TAG : maps
    USER ||--o{ ROLE_BINDING : has
    ROLE ||--o{ ROLE_BINDING : assigned_to

    USER {
        string id
        string name
        string email
    }

    DOCUMENT {
        string id
        string title
        string status
    }

    TAG {
        string id
        string name
    }

    DOCUMENT_TAG {
        string document_id
        string tag_id
    }

    ROLE {
        string id
        string code
    }

    ROLE_BINDING {
        string user_id
        string role_id
    }
```

## 饼图 Pie Chart

适合展示简单占比，不适合表达复杂趋势。

```mermaid
pie title 渠道占比
    "自然流量" : 42
    "广告投放" : 28
    "社交传播" : 18
    "其他" : 12
```

### 实战示例：文档来源分布

```mermaid
pie title 文档来源分布
    "产品文档" : 35
    "技术设计" : 25
    "教程指南" : 20
    "运营内容" : 12
    "其他" : 8
```

## Git 图 Git Graph

适合表达分支、提交和合并关系。

```mermaid
gitGraph
    commit
    branch feature/login
    checkout feature/login
    commit
    commit
    checkout main
    merge feature/login
    commit
```

### 实战示例：功能分支开发

```mermaid
gitGraph
    commit id: "init"
    branch feature/editor
    checkout feature/editor
    commit id: "editor-ui"
    commit id: "autosave"
    checkout main
    branch feature/mermaid
    checkout feature/mermaid
    commit id: "mermaid-preview"
    checkout main
    merge feature/editor
    merge feature/mermaid
    commit id: "release"
```

## Mindmap

适合脑暴、知识结构梳理和主题拆解。

```mermaid
mindmap
  root((Zditor))
    文档
      Markdown
      SuperTag
      双链
    图表
      Mermaid
      Excalidraw
    媒体
      图片
      音频
      视频
```

### 实战示例：功能规划脑图

```mermaid
mindmap
  root((编辑器规划))
    写作体验
      自动保存
      双栏预览
      快捷键
    图表能力
      Mermaid
      Excalidraw
      表格
    AI能力
      摘要
      改写
      问答
    协作能力
      评论
      历史版本
      导出分享
```

## 用户旅程图 User Journey

适合展示用户在一个完整流程中的动作、感受和接触点。

```mermaid
journey
    title 新用户首次发布文档
    section 注册阶段
      打开官网: 4: 用户
      注册账号: 3: 用户
      完成邮箱验证: 3: 用户
    section 上手阶段
      创建第一篇文档: 5: 用户
      插入 Mermaid 图: 4: 用户
      预览效果: 5: 用户
    section 发布阶段
      点击发布: 4: 用户
      获得分享链接: 5: 用户
```

## 组合示例

实际写文档时，经常不是只用一种图，而是组合使用。

### 产品需求文档的常见组合

- 用 Flowchart 讲主流程
- 用 Sequence Diagram 讲接口调用
- 用 ER Diagram 讲数据结构
- 用 Gantt Chart 讲排期

### 系统设计文档的常见组合

- 用 Class Diagram 讲模块关系
- 用 State Diagram 讲状态流转
- 用 Git Graph 讲分支策略
- 用 Mindmap 做方案拆解

## 常见问题

### 图不显示

- 确认代码块语言标记是不是 `mermaid`
- 确认图类型关键字是否正确，例如 `flowchart`、`sequenceDiagram`
- 先用最小示例确认渲染链路正常，再逐步加内容

### 图太大或太乱

- 减少节点数量
- 缩短节点文字
- 改成 `LR` 或 `TD` 试一下布局
- 拆成两张图，不要强行塞进一张

### 中文内容太长

- 节点内只保留关键词
- 详细说明放正文
- 避免一个节点里写整句业务规则

## 参考示例

仓库里已经有可直接打开的 Mermaid 示例：

- [examples/mermaid-examples/mermaid-examples.md](../examples/mermaid-examples/mermaid-examples.md)
- [guides/mermaid-guide.md](../guides/mermaid-guide.md)

!!! tip 建议用法
    先从最小示例开始，确认图表类型和结构正确，再逐步增加节点、注释和分组。Mermaid 图最怕一次写太满。

