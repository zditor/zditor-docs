# Code Examples

这个文档用于展示在 Zditor 文档中编写代码示例的基本方式。

## Inline Code

可以在段落中直接使用行内代码，例如 `const app = "zditor"`。

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

## Shell Script

```sh
#!/usr/bin/env bash
set -euo pipefail

project_name="${1:-demo-app}"

mkdir -p "$project_name"/{src,tests}
touch "$project_name"/README.md

printf "Created project: %s\n" "$project_name"
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

## HTML

```html
<section class="hero">
  <h1>Zditor Docs</h1>
  <p>Write, diagram, and organize knowledge in one place.</p>
  <a href="/guides/getting-started">Get Started</a>
</section>
```

## CSS

```css
:root {
  --bg: #0f172a;
  --fg: #e2e8f0;
  --accent: #22c55e;
}

.hero {
  padding: 48px 24px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--bg), #1e293b);
  color: var(--fg);
}
```

## HTTP Request

```text
POST /api/documents HTTP/1.1
Host: docs.zditor.com
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "API Example",
  "published": true
}
```

## Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["npm", "run", "start"]
```

## Go

```go
package main

import "fmt"

func main() {
    names := []string{"Zditor", "Docs", "Examples"}
    for _, name := range names {
        fmt.Println("Hello,", name)
    }
}
```

## Rust

```rs
fn sum(values: &[i32]) -> i32 {
    values.iter().sum()
}

fn main() {
    let numbers = [1, 2, 3, 4];
    println!("sum = {}", sum(&numbers));
}
```

## Diff

```text
- const mode = "draft";
+ const mode = "published";

- console.log("old content");
+ console.log("new content");
```

## Large TypeScript File

下面这段 TypeScript 示例故意写得更长，用来测试超大代码块的展示、滚动和选中体验。

```ts
type LogLevel = "debug" | "info" | "warn" | "error";

type RequestContext = {
  requestId: string;
  userId?: string;
  traceId?: string;
};

type FeatureFlags = {
  enableCache: boolean;
  enableAuditLog: boolean;
  enableRetry: boolean;
};

type ArticleRecord = {
  id: string;
  slug: string;
  title: string;
  body: string;
  tags: string[];
  published: boolean;
  updatedAt: string;
};

type SearchParams = {
  query: string;
  tags?: string[];
  includeDraft?: boolean;
  limit?: number;
};

type SearchResult = {
  total: number;
  items: ArticleRecord[];
};

class Logger {
  constructor(private readonly serviceName: string) {}

  log(level: LogLevel, message: string, meta: Record<string, unknown> = {}) {
    const payload = {
      service: this.serviceName,
      level,
      message,
      meta,
      timestamp: new Date().toISOString(),
    };

    console.log(JSON.stringify(payload));
  }

  debug(message: string, meta?: Record<string, unknown>) {
    this.log("debug", message, meta);
  }

  info(message: string, meta?: Record<string, unknown>) {
    this.log("info", message, meta);
  }

  warn(message: string, meta?: Record<string, unknown>) {
    this.log("warn", message, meta);
  }

  error(message: string, meta?: Record<string, unknown>) {
    this.log("error", message, meta);
  }
}

class InMemoryArticleRepository {
  private readonly records = new Map<string, ArticleRecord>();

  seed(records: ArticleRecord[]) {
    for (const record of records) {
      this.records.set(record.id, record);
    }
  }

  list(): ArticleRecord[] {
    return Array.from(this.records.values()).sort((a, b) =>
      a.updatedAt < b.updatedAt ? 1 : -1,
    );
  }

  findById(id: string): ArticleRecord | undefined {
    return this.records.get(id);
  }

  findBySlug(slug: string): ArticleRecord | undefined {
    return this.list().find((item) => item.slug === slug);
  }

  save(record: ArticleRecord): ArticleRecord {
    this.records.set(record.id, record);
    return record;
  }

  remove(id: string): boolean {
    return this.records.delete(id);
  }
}

class SearchIndex {
  search(records: ArticleRecord[], params: SearchParams): SearchResult {
    const normalizedQuery = params.query.trim().toLowerCase();
    const requestedTags = new Set((params.tags ?? []).map((tag) => tag.toLowerCase()));
    const limit = params.limit ?? 20;

    const filtered = records.filter((record) => {
      if (!params.includeDraft && !record.published) {
        return false;
      }

      if (requestedTags.size > 0) {
        const lowerTags = record.tags.map((tag) => tag.toLowerCase());
        for (const requestedTag of requestedTags) {
          if (!lowerTags.includes(requestedTag)) {
            return false;
          }
        }
      }

      if (!normalizedQuery) {
        return true;
      }

      return [
        record.title,
        record.slug,
        record.body,
        record.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });

    return {
      total: filtered.length,
      items: filtered.slice(0, limit),
    };
  }
}

class ArticleService {
  constructor(
    private readonly repo: InMemoryArticleRepository,
    private readonly index: SearchIndex,
    private readonly logger: Logger,
    private readonly flags: FeatureFlags,
  ) {}

  listArticles(ctx: RequestContext): ArticleRecord[] {
    this.logger.info("list_articles", {
      requestId: ctx.requestId,
      userId: ctx.userId,
    });

    return this.repo.list();
  }

  getArticleBySlug(ctx: RequestContext, slug: string): ArticleRecord | undefined {
    this.logger.debug("get_article_by_slug", {
      requestId: ctx.requestId,
      slug,
    });

    return this.repo.findBySlug(slug);
  }

  searchArticles(ctx: RequestContext, params: SearchParams): SearchResult {
    this.logger.info("search_articles", {
      requestId: ctx.requestId,
      query: params.query,
      tags: params.tags,
      includeDraft: params.includeDraft,
    });

    const records = this.repo.list();
    return this.index.search(records, params);
  }

  updateArticle(
    ctx: RequestContext,
    input: Pick<ArticleRecord, "id" | "title" | "body" | "tags" | "published">,
  ): ArticleRecord {
    const existing = this.repo.findById(input.id);

    const next: ArticleRecord = {
      id: input.id,
      slug: existing?.slug ?? slugify(input.title),
      title: input.title,
      body: input.body,
      tags: input.tags,
      published: input.published,
      updatedAt: new Date().toISOString(),
    };

    this.logger.info("update_article", {
      requestId: ctx.requestId,
      articleId: input.id,
      changedTitle: existing?.title !== input.title,
      changedPublished: existing?.published !== input.published,
    });

    if (this.flags.enableAuditLog) {
      this.logger.debug("audit_article_update", {
        traceId: ctx.traceId,
        before: existing,
        after: next,
      });
    }

    return this.repo.save(next);
  }

  deleteArticle(ctx: RequestContext, id: string): boolean {
    this.logger.warn("delete_article", {
      requestId: ctx.requestId,
      articleId: id,
    });

    return this.repo.remove(id);
  }
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const repo = new InMemoryArticleRepository();
repo.seed([
  {
    id: "art_001",
    slug: "welcome-to-zditor",
    title: "Welcome to Zditor",
    body: "Zditor is a local-first editor for writing, drawing, and organizing knowledge.",
    tags: ["intro", "editor"],
    published: true,
    updatedAt: "2026-04-10T08:00:00.000Z",
  },
  {
    id: "art_002",
    slug: "draft-notes-about-rendering",
    title: "Draft Notes About Rendering",
    body: "This draft document is useful when testing search, filters, and draft visibility.",
    tags: ["draft", "rendering"],
    published: false,
    updatedAt: "2026-04-10T08:10:00.000Z",
  },
]);

const service = new ArticleService(
  repo,
  new SearchIndex(),
  new Logger("docs-service"),
  {
    enableCache: true,
    enableAuditLog: true,
    enableRetry: false,
  },
);

const context: RequestContext = {
  requestId: "req_1001",
  userId: "user_77",
  traceId: "trace_demo_001",
};

const result = service.searchArticles(context, {
  query: "zditor",
  tags: ["intro"],
  includeDraft: false,
  limit: 10,
});

console.log(result.total);
console.log(result.items.map((item) => item.slug));
```

## Large Python File

下面这段 Python 示例也故意拉长，适合测试长代码块、多函数、类和注释混合时的渲染效果。

```py
from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Iterable
import json


@dataclass
class Task:
    id: str
    title: str
    done: bool = False
    tags: list[str] = field(default_factory=list)
    updated_at: str = field(default_factory=lambda: datetime.utcnow().isoformat())

    def mark_done(self) -> None:
        self.done = True
        self.updated_at = datetime.utcnow().isoformat()

    def rename(self, new_title: str) -> None:
        self.title = new_title.strip()
        self.updated_at = datetime.utcnow().isoformat()

    def add_tag(self, tag: str) -> None:
        normalized = tag.strip().lower()
        if normalized and normalized not in self.tags:
            self.tags.append(normalized)
            self.updated_at = datetime.utcnow().isoformat()


class TaskStore:
    def __init__(self, path: Path) -> None:
        self.path = path
        self.tasks: dict[str, Task] = {}

    def load(self) -> None:
        if not self.path.exists():
            self.tasks = {}
            return

        raw = json.loads(self.path.read_text(encoding="utf-8"))
        self.tasks = {
            item["id"]: Task(
                id=item["id"],
                title=item["title"],
                done=item.get("done", False),
                tags=item.get("tags", []),
                updated_at=item.get("updated_at", datetime.utcnow().isoformat()),
            )
            for item in raw
        }

    def save(self) -> None:
        payload = [
            {
                "id": task.id,
                "title": task.title,
                "done": task.done,
                "tags": task.tags,
                "updated_at": task.updated_at,
            }
            for task in self.list_all()
        ]
        self.path.write_text(
            json.dumps(payload, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )

    def list_all(self) -> list[Task]:
        return sorted(self.tasks.values(), key=lambda task: task.updated_at, reverse=True)

    def add(self, task: Task) -> Task:
        self.tasks[task.id] = task
        return task

    def get(self, task_id: str) -> Task | None:
        return self.tasks.get(task_id)

    def delete(self, task_id: str) -> bool:
        if task_id not in self.tasks:
            return False
        del self.tasks[task_id]
        return True


class TaskService:
    def __init__(self, store: TaskStore) -> None:
        self.store = store

    def bootstrap(self) -> None:
        self.store.load()

    def create_task(self, task_id: str, title: str, tags: Iterable[str] = ()) -> Task:
        task = Task(id=task_id, title=title.strip())
        for tag in tags:
            task.add_tag(tag)
        self.store.add(task)
        return task

    def complete_task(self, task_id: str) -> Task:
        task = self.store.get(task_id)
        if task is None:
            raise ValueError(f"Task not found: {task_id}")
        task.mark_done()
        return task

    def rename_task(self, task_id: str, new_title: str) -> Task:
        task = self.store.get(task_id)
        if task is None:
            raise ValueError(f"Task not found: {task_id}")
        task.rename(new_title)
        return task

    def search(self, keyword: str = "", *, tag: str | None = None, done: bool | None = None) -> list[Task]:
        normalized_keyword = keyword.strip().lower()
        normalized_tag = tag.strip().lower() if tag else None
        results: list[Task] = []

        for task in self.store.list_all():
            haystack = f"{task.title} {' '.join(task.tags)}".lower()

            if normalized_keyword and normalized_keyword not in haystack:
                continue

            if normalized_tag and normalized_tag not in task.tags:
                continue

            if done is not None and task.done is not done:
                continue

            results.append(task)

        return results

    def export_markdown(self) -> str:
        lines = ["# Task Export", ""]

        for task in self.store.list_all():
            status = "x" if task.done else " "
            tag_text = ", ".join(task.tags) if task.tags else "no-tags"
            lines.append(f"- [{status}] {task.title} ({task.id})")
            lines.append(f"  - tags: {tag_text}")
            lines.append(f"  - updated_at: {task.updated_at}")

        return "\n".join(lines)


def build_demo_dataset(service: TaskService) -> None:
    service.create_task("task_001", "Write editor onboarding guide", ["docs", "writing"])
    service.create_task("task_002", "Review rendering edge cases for long code lines", ["editor", "rendering", "qa"])
    service.create_task("task_003", "Prepare release notes draft", ["release", "docs"])
    service.create_task("task_004", "Collect user feedback about table performance", ["research", "feedback"])
    service.create_task("task_005", "Document markdown export behavior", ["docs", "markdown"])
    service.complete_task("task_003")
    service.rename_task("task_004", "Collect user feedback about large document performance")


def print_section(title: str) -> None:
    print("=" * 72)
    print(title)
    print("=" * 72)


def main() -> None:
    store = TaskStore(Path("tasks.demo.json"))
    service = TaskService(store)
    service.bootstrap()

    if not store.list_all():
        build_demo_dataset(service)

    print_section("All Tasks")
    for task in store.list_all():
        print(task)

    print_section("Search: docs")
    for task in service.search("docs"):
        print(f"{task.id}: {task.title}")

    print_section("Search: tag=rendering done=False")
    for task in service.search(tag="rendering", done=False):
        print(f"{task.id}: {task.title}")

    print_section("Markdown Export")
    print(service.export_markdown())

    store.save()


if __name__ == "__main__":
    main()
```

## Very Long JSON Lines

下面这些行故意非常长，用来测试横向滚动、换行策略和选中复制体验。

```json
{"id":"doc_super_long_0001","title":"A very long JSON line used for rendering verification in Zditor","description":"This single line intentionally contains many nested fields, repeated labels, and verbose text so that the editor can verify horizontal scrolling behavior, minimap layout, selection fidelity, copy-and-paste integrity, and code block overflow rendering under stress conditions.","tags":["rendering","long-line","stress-test","json","examples","zditor","docs","ui","editor","overflow"],"meta":{"author":"demo-bot","environment":"local-first","version":"2026.04.10","flags":{"showLineNumbers":true,"preserveIndentation":true,"allowOverflowScroll":true,"enableSyntaxHighlight":true},"links":{"homepage":"https://zditor.com","docs":"https://docs.zditor.com","repo":"https://github.com/zditor/zditor-docs"}}}
{"id":"doc_super_long_0002","title":"Another extremely long JSON line","description":"The goal of this line is not semantic beauty but practical abuse of the rendering engine with a payload that stays on one line and keeps going far beyond a typical viewport width while remaining valid JSON for syntax highlighting tests.","content":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
{"id":"doc_super_long_0003","path":"/workspace/examples/code-examples/fixtures/very/deeply/nested/and/highly/descriptive/path/that/keeps/going/to/test/how/the/editor/renders/a/really/really/really/long/unbroken/value/inside/a/code/block/example.json","status":"published","checksum":"sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef","note":"This is useful when testing long filesystem paths, opaque hashes, and unwrapped values in the same visible line."}
```

## Very Long SQL Lines

```sql
SELECT article_id, article_title, author_name, author_email, organization_name, organization_plan, article_status, article_visibility, article_updated_at, article_created_at, review_state, reviewer_name, reviewer_comment_count, reviewer_last_action_at FROM article_search_index WHERE article_status IN ('draft', 'published', 'archived') AND organization_plan IN ('free', 'pro', 'enterprise') AND article_visibility IN ('private', 'workspace', 'public') AND lower(article_title) LIKE '%rendering%' ORDER BY article_updated_at DESC, article_created_at DESC, article_id ASC LIMIT 200;
SELECT session_id, request_id, trace_id, user_id, workspace_id, feature_flags_json, timing_breakdown_json, experimental_render_strategy, fallback_render_strategy, rendering_surface_name, horizontal_scroll_width, longest_visible_line_length, viewport_width, viewport_height, client_platform, client_version FROM render_diagnostics WHERE request_day = '2026-04-10' AND render_status = 'success' AND longest_visible_line_length > 400 ORDER BY longest_visible_line_length DESC, horizontal_scroll_width DESC, viewport_width ASC;
```

## Very Long Bash Lines

```bash
curl -X POST "https://docs.zditor.com/api/v1/render/preview?workspace=demo-workspace&documentId=doc_very_long_001&includeDiagnostics=true&includeTokens=true&includeFormattingStats=true&includeBlockMeasurements=true" -H "Authorization: Bearer example_token_for_render_preview_requests" -H "Content-Type: application/json" -d '{"title":"Long Line Stress Test","body":"This payload is intentionally verbose and is kept on one shell line so the editor can test command readability, horizontal scrolling, and shell syntax highlighting in a realistically messy example.","options":{"preserveWhitespace":true,"renderCodeFences":true,"captureMetrics":true,"experimentalMode":"long-line-preview"}}'
NODE_ENV=production LOG_LEVEL=debug FEATURE_RENDER_METRICS=1 FEATURE_LARGE_BLOCK_PREVIEW=1 FEATURE_EDITOR_LONG_LINES=1 node ./scripts/run-render-preview.js --workspace demo-workspace --document-id doc_very_long_001 --mode benchmark --repeat 5 --collect-metrics --collect-memory --collect-layout --collect-highlight --collect-scroll-width
```

## Very Long JSX Lines

```tsx
export function UltraWideBanner() { return <div className="rounded-3xl border border-slate-700 bg-[linear-gradient(90deg,#0f172a_0%,#111827_25%,#1e293b_50%,#0f766e_75%,#164e63_100%)] px-8 py-6 text-slate-100 shadow-[0_20px_80px_rgba(15,23,42,0.45)]">This intentionally oversized single JSX line is useful when testing syntax highlighting, bracket matching, selection behavior, and horizontal scrolling for very long component markup inside a fenced code block.</div>; }
export function DenseActionRow() { return <div className="flex flex-row items-center gap-3 overflow-x-auto whitespace-nowrap rounded-2xl bg-slate-950/80 px-4 py-3 text-sm text-slate-200"><button className="rounded-xl bg-emerald-500 px-4 py-2 font-medium text-slate-950">Publish</button><button className="rounded-xl bg-sky-500 px-4 py-2 font-medium text-slate-950">Preview</button><button className="rounded-xl bg-amber-400 px-4 py-2 font-medium text-slate-950">Export Markdown</button><button className="rounded-xl bg-fuchsia-500 px-4 py-2 font-medium text-slate-950">Share Snapshot</button><span className="pl-4 text-slate-400">This is a deliberately long row to verify overflow behavior and selection stability.</span></div>; }
```

## Markdown Inside Docs

你可以在技术文档、教程、设计说明、接口说明中混合使用文字与代码块。例如：

```md
## API Example

调用接口后，返回一个 JSON 对象：

```json
{
  "ok": true
}
```

```text

## Mixed Example

下面是一个更接近真实文档的片段，包含接口、请求示例和返回结果：

```md
## Create Document

调用 `POST /api/documents` 创建新文档。

```bash
curl -X POST https://docs.zditor.com/api/documents \
  -H "Content-Type: application/json" \
  -d '{"title":"Weekly Notes"}'
```

返回结果：

```json
{
  "id": "doc_001",
  "title": "Weekly Notes",
  "ok": true
}
```

```text

## Use Cases

- 编写 API 文档
- 编写 SDK 使用说明
- 编写脚本教程
- 编写前后端联调示例
- 编写数据库查询示例
- 编写 CI/CD 配置说明
- 编写 React 组件与样式片段
- 测试上百行代码块展示
- 测试超长单行代码的横向滚动
```


