# Mermaid Examples

这个文档用于展示在 Zditor 文档中编写 Mermaid 图表的基本方式。

## Flowchart

```mermaid
flowchart TD
    A[开始] --> B{是否登录?}
    B -->|是| C[进入首页]
    B -->|否| D[跳转登录页]
    C --> E[结束]
    D --> E
```

## Sequence Diagram

```mermaid
sequenceDiagram
    participant U as 用户
    participant F as 前端
    participant B as 后端
    participant D as 数据库

    U->>F: 点击登录
    F->>B: 提交账号密码
    B->>D: 查询用户
    D-->>B: 返回结果
    B-->>F: 登录成功
    F-->>U: 显示首页
```

## Gantt Chart

```mermaid
gantt
    title 项目开发计划
    dateFormat  YYYY-MM-DD
    section 设计
    需求分析 :a1, 2026-04-01, 5d
    UI设计 :after a1, 4d
    section 开发
    前端开发 :2026-04-08, 7d
    后端开发 :2026-04-08, 9d
    section 测试
    集成测试 :2026-04-17, 4d
```

## Class Diagram

```mermaid
classDiagram
    class Editor {
        +String filePath
        +open()
        +save()
    }

    class Document {
        +String title
        +render()
    }

    Editor --> Document : edits
```

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Editing : 打开文档
    Editing --> Saving : 保存
    Saving --> Editing : 完成
    Editing --> Closed : 关闭
    Closed --> [*]
```

## ER Diagram

```mermaid
erDiagram
    USER ||--o{ DOCUMENT : owns
    DOCUMENT ||--o{ TAG : has

    USER {
        string id
        string name
    }

    DOCUMENT {
        string id
        string title
    }

    TAG {
        string name
    }
```

## Mindmap

```mermaid
mindmap
  root((Zditor))
    Writing
      Markdown
      Notes
      Docs
    Diagram
      Mermaid
      Flowchart
      Mindmap
    AI
      Agent
      Workflow
```

## Tips

- 使用 fenced code block，并将语言标记为 `mermaid`
- 图表适合和正文混排，用于设计说明、需求文档和知识库
- 若图表较复杂，建议拆成多个小图，便于阅读

## Use Cases

- 编写系统设计文档
- 编写产品流程文档
- 编写项目排期文档
- 编写数据库建模文档
