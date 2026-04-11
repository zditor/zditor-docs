---
description:
  type: text
  description:
  label: Description
  value: "Deutsches Filmverzeichnis · SuperTag-Filmklasse · Strukturierte Filmdaten"
title:
  type: text
  description:
  label: Title
  value: "Filmverzeichnis"
author:
  type: text
  description:
  label: Author
  value: "SeeLey & Codex"
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-11"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../../assets/movies/covers/教父.jpg"
tags:
  type: text
  description:
  label: Tags
  value: "Filme · SuperTag · Deutsch"
display:
  type: checkbox
  description: display
  label: Eigenschaften anzeigen
  value: false
warm:
  type: checkbox
  description: warm
  label: Warmer Ton
  value: true
col:
  type: array
  description:
  label: Col
  value: ["title","description","updated"]
row:
  type: array
  description:
  label: Row
  value: ["author","tags"]
---
# Filmverzeichnis

Dieses Verzeichnis sammelt deutschsprachige Filmbeispiele fuer SuperTag. Jeder Film ist eine eigene Markdown-Datei, teilt aber ein gemeinsames Frontmatter-Schema und laesst sich dadurch als zusammenhaengende Filmklasse anzeigen.

Inzwischen entspricht das Verzeichnis dem vollstaendigen englischen Filmbestand mit 100 Eintraegen. Neben den bereits vorhandenen deutsch benannten Beispielen wurden die restlichen Filme mit deutscher Frontmatter-Struktur und einem passenden Beschreibungstext ergaenzt.

## Beispiel-Filme

- [Der Pate](./Der%20Pate.md)
- [Citizen Kane](./Citizen%20Kane.md)
- [Das Fenster zum Hof](./Das%20Fenster%20zum%20Hof.md)
- [Psycho](./Psycho.md)
- [Chinatown](./Chinatown.md)
- [Casablanca](./Casablanca.md)
- [The Shawshank Redemption](./The%20Shawshank%20Redemption.md)
- [Star Wars](./Star%20Wars.md)

## Was dieses Verzeichnis zeigt

- ein gemeinsames Feldschema fuer Filme
- Gruppierung ueber `class`
- Kartenlayout mit `cover`, `col` und `row`
- freien Fliesstext fuer Kritik, Vergleiche und Verweise
- eine groessere mehrsprachige Filmsammlung mit 100 Eintraegen

Zusammen mit dem `SuperTag Leitfaden` ist dieses Verzeichnis ein direkter Ausgangspunkt fuer eigene strukturierte Sammlungen.
