---
description:
  type: text
  description:
  label: Description
  value: "Flowchart · Sequence Diagram · Gantt Chart · ER Diagram · Mindmap"
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
  value: "Mermaid · Diagram · Guide"
title:
  type: text
  description:
  label: Title
  value: "Mermaid Guide"
display:
  type: checkbox
  description: display
  label: Display Properties
  value: false
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-11"
warm:
  type: checkbox
  description: warm
  label: Warm Tone
  value: true
row:
  type: array
  description:
  label: Row
  value: ["avatar","author","updated","tags"]
---
# Mermaid Guide

Mermaid is a text-based diagram syntax. Write a fenced code block with `mermaid`, and you can render flowcharts, sequence diagrams, gantt charts, ER diagrams, git graphs, and more.

This guide is not trying to cover every keyword. The goal is practical: help you write diagrams in Zditor that are clear, useful, and maintainable.

## Quick Start

Minimal example:

```mermaid
flowchart TD
    A[Start] --> B[Fill the form]
    B --> C{Validation passed?}
    C -->|Yes| D[Submit successfully]
    C -->|No| E[Show error]
```

Two things matter most:

- The fenced code block language must be `mermaid`
- Pick the right diagram type before adding details

## Which Diagram to Use

|Scenario |Recommended diagram |
|---|---|
|Business workflow, approval flow, branching logic |Flowchart |
|Frontend/backend/service/database call order |Sequence Diagram |
|Schedule, milestones, task dependencies |Gantt Chart |
|Classes, interfaces, module structure |Class Diagram |
|State changes, lifecycle, state machines |State Diagram |
|Database schema and entity relations |ER Diagram |
|User experience and service touchpoints |User Journey |
|Share or percentage breakdown |Pie Chart |
|Branching and merge history |Git Graph |
|Brainstorming and knowledge structure |Mindmap |

## General Writing Tips

- Keep node text short; put long explanations in the main body.
- One diagram should explain one topic.
- Prefer business terms over internal abbreviations.
- If the diagram gets crowded, split it before adding more.
- `TD` and `LR` are the safest default directions.

## Flowchart

Flowcharts are best for steps, decisions, transitions, and component relationships.

### Minimal example

```mermaid
flowchart TD
    A[User opens page] --> B[Enter account and password]
    B --> C{Validation passed?}
    C -->|Yes| D[Enter homepage]
    C -->|No| E[Show error message]
```

### Common node shapes

```mermaid
flowchart LR
    A[Normal node]
    B(Rounded node)
    C{Decision}
    D[(Database)]
    E[[Subprocess]]
```

### Common edges

```mermaid
flowchart LR
    A --> B
    B -.-> C
    C ==> D
    D --note--> E
```

### Subgraphs

```mermaid
flowchart TB
    subgraph Frontend
        A[Page] --> B[API Request]
    end

    subgraph Backend
        C[Service] --> D[(Database)]
    end

    B --> C
```

### Practical example: order submission

```mermaid
flowchart TD
    A[User submits order] --> B[Create unpaid order]
    B --> C{Stock available?}
    C -->|No| D[Show out-of-stock message]
    C -->|Yes| E[Lock inventory]
    E --> F[Start payment]
    F --> G{Payment result}
    G -->|Success| H[Create shipping task]
    G -->|Failure| I[Release inventory]
    H --> J[Notify warehouse]
    I --> K[Close order]
```

### Practical example: swimlane-style collaboration

```mermaid
flowchart LR
    subgraph User Side
        A[Click publish]
        B[View publishing result]
    end

    subgraph Web App
        C[Submit content]
        D[Validate parameters]
        E[Write task record]
    end

    subgraph Publishing Service
        F[Consume publishing task]
        G[Render page]
        H[Upload static assets]
    end

    A --> C
    C --> D
    D -->|Pass| E
    D -->|Fail| B
    E --> F
    F --> G
    G --> H
    H --> B
```

## Sequence Diagram

Sequence diagrams show who calls whom, in what order, and what comes back.

### Minimal example

```mermaid
sequenceDiagram
    participant U as User
    participant FE as Frontend
    participant BE as Backend
    participant DB as Database

    U->>FE: Submit login form
    FE->>BE: Send credentials
    BE->>DB: Query user
    DB-->>BE: Return user record
    BE-->>FE: Return login result
    FE-->>U: Show result
```

### Conditions, optional blocks, loops

```mermaid
sequenceDiagram
    participant Client
    participant Server

    Client->>Server: Request resource

    alt Logged in
        Server-->>Client: Return data
    else Not logged in
        Server-->>Client: Return 401
    end

    opt Track analytics
        Client->>Server: Report event
    end

    loop Retry 3 times
        Client->>Server: Retry request
    end
```

### Practical example: file save flow

```mermaid
sequenceDiagram
    participant U as User
    participant E as Editor
    participant S as Sync Service
    participant G as Git Service

    U->>E: Click save
    E->>E: Write file locally
    E->>S: Send change summary
    alt Auto sync enabled
        S->>G: Create commit
        G-->>S: Return commit result
        S-->>E: Sync success
    else Local save only
        S-->>E: Skip remote sync
    end
    E-->>U: Show save status
```

## Gantt Chart

Use gantt charts for schedules, milestones, and phase-based planning.

```mermaid
gantt
    title Release Plan
    dateFormat YYYY-MM-DD

    section Requirements
    Requirement collection :done, r1, 2026-04-01, 3d
    Solution review        :done, r2, after r1, 2d

    section Development
    Core feature build     :active, d1, 2026-04-06, 6d
    Regression fixes       :crit, d2, after d1, 3d

    section Release
    Canary rollout         :g1, 2026-04-16, 2d
    Production release     :milestone, g2, 2026-04-18, 0d
```

## Class Diagram

Use class diagrams for module relationships, classes, interfaces, fields, and methods.

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

## State Diagram

Use state diagrams to show how an object or process moves across states.

```mermaid
stateDiagram-v2
    [*] --> Draft
    Draft --> InReview: Submit for review
    InReview --> Published: Approved
    InReview --> Draft: Rejected
    Published --> Offline: Manually taken down
    Published --> InReview: Submit update
    Offline --> [*]
```

## ER Diagram

Use ER diagrams for data modeling and table relationships.

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
```

## Pie Chart

Pie charts are good for simple composition, not complex trends.

```mermaid
pie title Document Source Breakdown
    "Product Docs" : 35
    "Technical Design" : 25
    "Tutorials" : 20
    "Operations Content" : 12
    "Other" : 8
```

## Git Graph

Use git graphs to show branches, commits, and merges.

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

Mindmaps work well for brainstorming and capability breakdowns.

```mermaid
mindmap
  root((Editor Roadmap))
    Writing Experience
      Auto Save
      Split Preview
      Shortcuts
    Diagram Support
      Mermaid
      Excalidraw
      Tables
    AI Features
      Summarize
      Rewrite
      Q&A
    Collaboration
      Comments
      History
      Export
```

## User Journey

User journey diagrams show actions and touchpoints across a full experience.

```mermaid
journey
    title First-time user publishes a document
    section Registration
      Open website: 4: User
      Register account: 3: User
      Verify email: 3: User
    section Onboarding
      Create first document: 5: User
      Insert Mermaid chart: 4: User
      Preview result: 5: User
    section Publishing
      Click publish: 4: User
      Get share link: 5: User
```

## Common Problems

### Diagram does not render

- Check that the code fence language is `mermaid`
- Check the diagram keyword such as `flowchart` or `sequenceDiagram`
- Start from a minimal example, then add complexity gradually

### Diagram is too large or messy

- Reduce node count
- Shorten node text
- Try `LR` or `TD`
- Split the content into multiple diagrams

## References

- [examples/mermaid-examples/mermaid-examples.md](../examples/mermaid-examples/mermaid-examples.md)
- [guides/mermaid-guide.md](../guides/mermaid-guide.md)

!!! tip Recommended workflow
    Start with the smallest working example. Once the structure is correct, expand it step by step.
