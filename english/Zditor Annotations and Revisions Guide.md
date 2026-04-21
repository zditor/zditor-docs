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
[term](explanation goes here|mode=tip|style=teal)

[original text](why it should change|mode=revision|style=indigo|advice=replacement text)
```

Rendered examples:

- [Zditor](an editor that extends Markdown with structured features|mode=tip|style=teal can attach explanations directly to inline text.
- Please change [soon](too vague for a release document|mode=revision|style=red|advice=by April 30, 2026).

## Annotations with Tip

`Tip` is for explanatory markup. It keeps the original text and only adds context.

### Syntax

```md
[text](annotation text|mode=tip|style=color)
```

### Rendered examples

[vector database](useful for semantic retrieval, but not the same as a relational database|mode=tip|style=teal) is common in knowledge search systems.

Finish the [permission model](the relationship between roles, resources, and actions|mode=tip|style=yellow) before opening team collaboration.

If an API term stays in English, add a note for [DTO](Data Transfer Object|mode=tip|style=indigo) the first time it appears.

### Source examples

```md
[vector database](useful for semantic retrieval, but not the same as a relational database|mode=tip|style=teal) is common in knowledge search systems.

Finish the [permission model](the relationship between roles, resources, and actions|mode=tip|style=yellow) before opening team collaboration.

If an API term stays in English, add a note for [DTO](Data Transfer Object|mode=tip|style=indigo) the first time it appears.
```

## Revisions with Revision

`Revision` is for actionable edits. It keeps the original wording visible and adds a concrete replacement through `advice`.

### Syntax

```md
[original text](why it should change|mode=revision|style=color|advice=replacement text)
```

### Rendered examples

The release is expected [soon](too vague for planning|mode=revision|style=red|advice=by April 30, 2026).

It is better to change [used](too casual for this document|mode=revision|style=indigo|advice=adopted) to a more formal verb.

The document still contains [teh](spelling mistake|mode=revision|style=red|advice=the).

### Source examples

```md
The release is expected [soon](too vague for planning|mode=revision|style=red|advice=by April 30, 2026).

It is better to change [used](too casual for this document|mode=revision|style=indigo|advice=adopted) to a more formal verb.

The document still contains [teh](spelling mistake|mode=revision|style=red|advice=the).
```

## Using both in one paragraph

In real documents, annotations and revisions are often mixed. Some phrases need context, while others need direct replacement.

### Rendered example

This version starts from an [MVP](Minimum Viable Product|mode=tip|style=teal) to validate the core flow, and the first pilot users are expected [next month](too broad for planning|mode=revision|style=red|advice=in May 2026). In the current copy, changing [click](desktop wording is better as choose or open|mode=revision|style=indigo|advice=choose) makes the interaction language more consistent.

### Source example

```md
This version starts from an [MVP](Minimum Viable Product|mode=tip|style=teal) to validate the core flow, and the first pilot users are expected [next month](too broad for planning|mode=revision|style=red|advice=in May 2026). In the current copy, changing [click](desktop wording is better as choose or open|mode=revision|style=indigo|advice=choose) makes the interaction language more consistent.
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

- [cache warmup](run it before launch to avoid cold-start spikes|mode=tip|style=yellow) can reduce latency for the first requests.
- The phrase [is done](more specific wording is better|mode=revision|style=green|advice=has completed integration testing) can also use `green` for a positive revision.

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
This sentence includes a [term](explain the meaning here|mode=tip|style=teal).
```

### Revision template

```md
Please change [the original phrase](explain why it should change|mode=revision|style=indigo|advice=the revised phrase).
```

### Proofreading paragraph template

```md
This version uses an [API Gateway](the unified entry for auth and routing|mode=tip|style=teal) and is expected [soon](too vague|mode=revision|style=red|advice=in May 2026) to open partner testing.
```

## Recommended reading

- [Code Examples](./Code%20Examples.md)
- [SuperTag Guide](./SuperTag%20Guide.md)
- [Mermaid Guide](./Mermaid%20Guide.md)


