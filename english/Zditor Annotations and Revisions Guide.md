---
description:
  type: text
  description:
  label: Description
  value: "Zditor syntax · annotations · revisions · tip · revision"
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
  value: "Zditor Syntax"
avatar:
  type: asset
  description:
  label: Avatar
  value: "../assets/nanobanana-avatar.svg"
tags:
  type: text
  description:
  label: Tags
  value: "Zditor · annotation · revision · tip"
title:
  type: text
  description:
  label: Title
  value: "Zditor Annotations and Revisions Guide"
display:
  type: checkbox
  description: display
  label: Display Properties
  value: false
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-21"
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
# Zditor Annotations and Revisions Guide

This guide focuses on two inline review tools in Zditor:

- `annotations`: explain a phrase without changing the original text
- `revisions`: suggest a replacement that can be accepted

They are useful for proofreading, collaborative editing, terminology notes, and style cleanup.

## What is the difference

|Feature |Purpose |Can accept changes |Good for |
|---|---|---|---|
|`mode=tip` |Explain or annotate text |No |term notes, reading hints, context |
|`mode=revision` |Suggest a replacement |Yes |typo fixes, wording changes, clearer dates |

!!! info Quick rule
    Use an annotation when you want to explain the text.
    Use a revision when you want to replace the text.

## Minimal examples

```md
[term](explanation%20goes%20here|mode=tip|style=teal)

[original text](why%20it%20should%20change|mode=revision|style=indigo|advice=replacement%20text)
```

Rendered examples:

- [Zditor](an%20editor%20that%20extends%20Markdown%20with%20structured%20features|mode=tip|style=teal) can attach explanations directly to inline text.
- Please change [soon](too%20vague%20for%20a%20release%20document|mode=revision|style=red|advice=by%20April%2030,%202026).

!!! tip Encode spaces as `%20` when writing raw Markdown
    If you edit the Markdown source directly, spaces inside `tip` and `revision` parentheses should be written as `%20`.
    This includes annotation text, file paths, URLs, and `advice` values.
    Toolbar editing is the exception: in the editor UI you can type normal spaces, and they will be encoded automatically when the document is saved.
    For example, raw Markdown can be written as `[term](explanation%20goes%20here|mode=tip|style=teal)`.

## Annotations with Tip

`Tip` is for explanatory markup. It keeps the original text and only adds context.

### Syntax

```md
[text](annotation%20text|mode=tip|style=color)
```

### Rendered examples

[vector database](useful%20for%20semantic%20retrieval,%20but%20not%20the%20same%20as%20a%20relational%20database|mode=tip|style=teal) is common in knowledge search systems.

Finish the [permission model](the%20relationship%20between%20roles,%20resources,%20and%20actions|mode=tip|style=yellow) before opening team collaboration.

If an API term stays in English, add a note for [DTO](Data%20Transfer%20Object|mode=tip|style=indigo) the first time it appears.

### Source examples

```md
[vector database](useful%20for%20semantic%20retrieval,%20but%20not%20the%20same%20as%20a%20relational%20database|mode=tip|style=teal) is common in knowledge search systems.

Finish the [permission model](the%20relationship%20between%20roles,%20resources,%20and%20actions|mode=tip|style=yellow) before opening team collaboration.

If an API term stays in English, add a note for [DTO](Data%20Transfer%20Object|mode=tip|style=indigo) the first time it appears.
```

## Revisions with Revision

`Revision` is for actionable edits. It keeps the original wording visible and adds a concrete replacement through `advice`.

### Syntax

```md
[original text](why%20it%20should%20change|mode=revision|style=color|advice=replacement%20text)
```

### Rendered examples

The release is expected [soon](too%20vague%20for%20planning|mode=revision|style=red|advice=by%20April%2030,%202026).

It is better to change [used](too%20casual%20for%20this%20document|mode=revision|style=indigo|advice=adopted) to a more formal verb.

The document still contains [teh](spelling%20mistake|mode=revision|style=red|advice=the).

### Source examples

```md
The release is expected [soon](too%20vague%20for%20planning|mode=revision|style=red|advice=by%20April%2030,%202026).

It is better to change [used](too%20casual%20for%20this%20document|mode=revision|style=indigo|advice=adopted) to a more formal verb.

The document still contains [teh](spelling%20mistake|mode=revision|style=red|advice=the).
```

## Using both in one paragraph

In real documents, annotations and revisions are often mixed. Some phrases need context, while others need direct replacement.

### Rendered example

This version starts from an [MVP](Minimum%20Viable%20Product|mode=tip|style=teal) to validate the core flow, and the first pilot users are expected [next month](too%20broad%20for%20planning|mode=revision|style=red|advice=in%20May%202026). In the current copy, changing [click](desktop%20wording%20is%20better%20as%20choose%20or%20open|mode=revision|style=indigo|advice=choose) makes the interaction language more consistent.

### Source example

```md
This version starts from an [MVP](Minimum%20Viable%20Product|mode=tip|style=teal) to validate the core flow, and the first pilot users are expected [next month](too%20broad%20for%20planning|mode=revision|style=red|advice=in%20May%202026). In the current copy, changing [click](desktop%20wording%20is%20better%20as%20choose%20or%20open|mode=revision|style=indigo|advice=choose) makes the interaction language more consistent.
```

## Choosing colors

The `zditor-syntax` reference suggests this practical mapping:

|Color |Typical use |
|---|---|
|`red` |errors, removals, vague dates, spelling problems |
|`indigo` |wording improvements, tone cleanup, style alignment |
|`teal` |neutral explanations and general suggestions |
|`yellow` |warnings and extra attention |
|`green` |positive confirmation or keep-as-is guidance |

Rendered examples:

- [cache warmup](run%20it%20before%20launch%20to%20avoid%20cold-start%20spikes|mode=tip|style=yellow) can reduce latency for the first requests.
- The phrase [is done](more%20specific%20wording%20is%20better|mode=revision|style=green|advice=has%20completed%20integration%20testing) can also use `green` for a positive revision.

## Good places to use them

- PR review documents
- product specs
- technical notes and paper reading notes
- internal collaboration docs that need comments without losing the original text

## Common mistakes

!!! warning Easy mistakes
    `revision` must include `advice`, otherwise you only point out a problem without a replacement.
    `tip` does not need `advice`.
    The safest colors are `teal`, `indigo`, `red`, `green`, and `yellow`.
    Both syntaxes are inline. Mark a short phrase, not a whole paragraph.

## Copy-ready templates

### Annotation template

```md
This sentence includes a [term](explain%20the%20meaning%20here|mode=tip|style=teal).
```

### Revision template

```md
Please change [the original phrase](explain%20why%20it%20should%20change|mode=revision|style=indigo|advice=the%20revised%20phrase).
```

### Proofreading paragraph template

```md
This version uses an [API Gateway](the%20unified%20entry%20for%20auth%20and%20routing|mode=tip|style=teal) and is expected [soon](too%20vague|mode=revision|style=red|advice=in%20May%202026) to open partner testing.
```

## Recommended reading

- [Code Examples](./Code%20Examples.md)
- [SuperTag Guide](./SuperTag%20Guide.md)
- [Mermaid Guide](./Mermaid%20Guide.md)


