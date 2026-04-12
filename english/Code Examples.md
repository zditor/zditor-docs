---
description:
  type: text
  description:
  label: Description
  value: "Inline Code · JavaScript · TypeScript · Python · Bash · JSON · YAML"
author:
  type: text
  description:
  label: Author
  value: "SeeLey & Codex"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../assets/guides/code-examples-cover-nanobanana.jpg"
col:
  type: array
  description:
  label: Col
  value: ["subject","title","description"]
subject:
  type: text
  description:
  label: Subject
  value: "Code Examples"
avatar:
  type: asset
  description:
  label: Avatar
  value: "../assets/nanobanana-avatar.svg"
tags:
  type: text
  description:
  label: Tags
  value: "Code · Inline Code · Code Block · Examples"
title:
  type: text
  description:
  label: Title
  value: "Code Examples"
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
# Code Examples

This document shows common ways to write code examples in Zditor documents, including inline code, common language blocks, configuration files, API requests, and diff snippets.

## Inline Code

You can insert inline code directly in a paragraph, such as `const app = "zditor"`, `npm run dev`, `docs.zditor.com`, or `POST /api/documents`.

Good candidates for inline code include:

- commands: `git status`
- variable names: `userId`
- function names: `renderMarkdown()`
- config keys: `enableCache`
- file paths: `english/Code Examples.md`

## JavaScript

```js
function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Zditor"));
```

## TypeScript

```ts
type User = {
  id: number;
  name: string;
  active: boolean;
};

const user: User = {
  id: 1,
  name: "Alice",
  active: true,
};

console.log(user);
```

## TSX / React

```tsx
import { useState } from "react";

type CounterProps = {
  initial?: number;
};

export function Counter({ initial = 0 }: CounterProps) {
  const [count, setCount] = useState(initial);

  return (
    <button onClick={() => setCount((value) => value + 1)}>
      Count: {count}
    </button>
  );
}
```

## Python

```py
def fibonacci(n: int) -> list[int]:
    values = [0, 1]
    while len(values) < n:
        values.append(values[-1] + values[-2])
    return values[:n]


print(fibonacci(8))
```

## Bash

```bash
mkdir -p docs/examples
cd docs/examples
echo "hello zditor"
```

## JSON

```json
{
  "name": "zditor-docs",
  "category": "examples",
  "codeBlock": true
}
```

## YAML

```yaml
name: docs-check

on:
  push:
    branches: [main]
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run markdown lint
        run: npm run lint:md
```

## SQL

```sql
SELECT
  author_id,
  COUNT(*) AS post_count,
  MAX(published_at) AS latest_post_at
FROM posts
WHERE status = 'published'
GROUP BY author_id
ORDER BY latest_post_at DESC;
```
