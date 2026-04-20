---
name: zditor-syntax
description: Use when users ask to learn Zditor extended Markdown syntax, fix invalid Zditor markdown, or generate content that must follow Zditor syntax rules. Read references/zditor-syntax.md for the syntax catalog and examples.
---

# Zditor Syntax

Use this skill for Zditor-specific markdown tasks rather than generic Markdown help.

## Workflow

1. Read `references/zditor-syntax.md` before answering or generating content.
2. If the user wants an explanation, answer briefly and include a minimal valid example.
3. If the user wants content generation, return valid Zditor markdown directly.
4. Prefer the smallest syntax that satisfies the request.
5. If the user provides broken syntax, fix it and briefly note the key correction.

## Guardrails

- Keep indentation, fences, and delimiters exact.
- Do not invent unsupported syntax. Check the reference when unsure.
