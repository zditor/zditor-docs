---
name: import-excel
description: Use when users want to convert an Excel workbook into a Zditor SuperTag project with one markdown file per row, inferred field types, frontmatter, row and col layout, and cover metadata. Read references/import-excel.md for the conversion rules.
---

# Import Excel

Use this skill when the task is to transform `.xlsx` or `.xls` data into Zditor SuperTag markdown files.

## Workflow

1. Parse the Excel path plus any `--project` or `--output` options from the user request.
2. Read `references/import-excel.md` and follow its conversion rules.
3. Load the workbook with Python and `openpyxl`.
4. Validate that the sheet includes at least one data row.
5. Infer field types, options, row and col layout, cover, warm, and filenames exactly as documented.
6. Write the generated markdown files to the requested output directory.

## Guardrails

- Preserve original column headers in field labels.
- Sanitize filenames while keeping them readable.
- If `openpyxl` is unavailable, install it or clearly state the missing requirement.
