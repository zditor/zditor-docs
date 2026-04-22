---
description:
  type: text
  description:
  label: Description
  value: "SuperTag · structured fields · data table · movie example"
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
  value: "SuperTag"
avatar:
  type: asset
  description:
  label: Avatar
  value: "../assets/nanobanana-avatar.svg"
tags:
  type: text
  description:
  label: Tags
  value: "SuperTag · data table · frontmatter · movies"
title:
  type: text
  description:
  label: Title
  value: "SuperTag Guide"
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
# SuperTag Guide

SuperTag is the way Zditor turns Markdown documents into structured records. You still write normal `.md` files, but frontmatter fields can define types, labels, display rules, and grouping, so one set of documents can work both as readable articles and as filterable table data.

This guide uses the English movie class as the concrete example. See [english/movies/](./movies/).

## What SuperTag Is Good For

- Managing a set of similar objects in Markdown, such as movies, books, papers, customers, projects, or recipes
- Keeping stable fields for each record while still leaving the body free for long-form writing
- Reading the same documents as articles and aggregating them as table data

The movie class is a good example: each movie is its own Markdown file, but all of them share the same structure for title, director, year, genre, ratings, watch status, and cover.

## A Minimal SuperTag Record

```yaml
---
title:
  type: text
  label: Title
  value: "The Godfather"
director:
  type: text
  label: Director
  value: "Francis Ford Coppola"
year:
  type: number
  label: Year
  value: 1972
genre:
  type: multiselect
  label: Genre
  value: ["Crime", "Drama"]
  options: ["Drama", "Mystery", "Crime", "Romance", "Comedy"]
class:
  type: text
  label: class
  value: "ClassicMovieEnglish"
---
```

Two ideas matter most:

- A field is not just a value. It also carries metadata such as `type` and `label`.
- Records are grouped through the shared `class` field.

## Which Fields the Movie Class Uses

See [The Godfather](./movies/The%20Godfather.md).

This class already includes a fairly complete structure:

- Basic information: `title`, `original_title`, `director`, `cast`
- Classification: `year`, `country`, `genre`
- Ratings and status: `douban_score`, `afi_rank`, `my_score`, `watched`
- Personal notes: `watch_date`, `notes`
- Display-related fields: `cover`, `warm`, `col`, `row`
- Grouping field: `class`

That is one practical advantage of SuperTag: the same fields can support both data views and document presentation.

## Common Field Types

The movie class already uses several common types:

- `text`: plain text, such as title, director, or country
- `number`: numeric values, such as year, score, or rank
- `date`: dates, such as watch date
- `checkbox`: booleans, such as watched or warm tone
- `multiselect`: multi-select enums, such as genre
- `array`: arrays, such as cast or layout field lists
- `progress`: progress-like numeric values, such as personal score
- `asset`: resource paths, such as cover images

If you are designing your own class, these types already cover most knowledge-base and document-database use cases.

## How `class` Works

`class` decides which SuperTag group a document belongs to.

For example, the English movie docs all use:

```yaml
class:
  type: text
  label: class
  value: "ClassicMovieEnglish"
```

With that shared value, Zditor can treat all `ClassicMovieEnglish` records as one table. If you add another file such as [Chinatown](./movies/Chinatown.md) and keep the same `class`, it will join the same group automatically.

## How `col` and `row` Shape Cover Layout

SuperTag does not only store fields. It can also drive the document cover card layout directly.

These two fields are especially important:

```yaml
col:
  type: array
  label: Col
  value: [year, title, director]
row:
  type: array
  label: Row
  value: [genre, afi_rank, douban_score, watched]
```

They mean:

- `col`: fields shown in the main vertical information area
- `row`: fields shown in the lower or supporting information bar

Together with `cover` and `warm`, they let one record render as a document entry that feels like both a database row and a visual card.

## The Body Is Still Free Markdown

SuperTag does not restrict how you write the body. That is one of its strongest characteristics: frontmatter handles structure, while the body handles review writing, cross-links, and topic analysis.

For example, [The Godfather](./movies/The%20Godfather.md) contains:

- long-form commentary
- links to other movie documents
- genre and theme comparisons

So SuperTag does not turn Markdown into a rigid spreadsheet. It keeps structured fields and free writing in the same file.

## How to Reference a SuperTag Record

Use a normal link with `mode=supertag`:

```md
[ClassicMovieEnglish](/english/movies/The%20Godfather.md|mode=supertag)
```

Rendered example: [ClassicMovieEnglish](/english/movies/The%20Godfather.md|mode=supertag)

The key part is not the link text. It is `mode=supertag`, which tells Zditor to render the target as a SuperTag node instead of a plain link.

## How to Add Another Record

The safest workflow is to copy an existing movie file and then edit values instead of writing every field from scratch.

Suggested steps:

1. Copy a similar file, such as [The Godfather](./movies/The%20Godfather.md)
2. Keep the field structure and `class`
3. Replace the values: title, director, year, cover, and body
4. If you add a new field that the whole class should share, backfill it across the class later

This keeps the class stable and reduces field drift, type mismatches, and diverging option lists.

## Design Suggestions for a SuperTag Class

- Decide the most stable fields first, then add more
- Keep field names stable over time
- Maintain one shared `options` list for multi-select fields
- Reuse an existing template whenever possible
- Once a `class` name is in use, do not rename it casually

The movie class works well because it combines a useful shared schema with a clear display convention.

## Recommended Reading

- [english/movies/](./movies/)
- [The Godfather](./movies/The%20Godfather.md)
- [English Docs Entry](./README.md)

If you want to build your own structured library, the most direct starting point is to copy the movie class pattern and replace the fields with your own domain.
