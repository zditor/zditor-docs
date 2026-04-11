---
description:
  type: text
  description:
  label: Description
  value: "SuperTag · strukturierte Felder · Datentabelle · Filmbeispiel"
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
  value: "SuperTag · Datentabelle · Frontmatter · Filme"
title:
  type: text
  description:
  label: Title
  value: "SuperTag Leitfaden"
display:
  type: checkbox
  description: display
  label: Eigenschaften anzeigen
  value: false
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-11"
warm:
  type: checkbox
  description: warm
  label: Warmer Ton
  value: true
row:
  type: array
  description:
  label: Row
  value: ["avatar","author","updated","tags"]
---
# SuperTag Leitfaden

SuperTag ist die Zditor-Art, Markdown-Dokumente als strukturierte Eintraege zu organisieren. Du schreibst weiterhin normale `.md`-Dateien, kannst aber im Frontmatter Feldtypen, Anzeigenamen, Layoutregeln und Gruppierung definieren. Dadurch funktionieren dieselben Dateien zugleich als lesbare Dokumente und als filterbare Datentabelle.

Als praktisches Beispiel nutzt dieser Leitfaden die englische Filmklasse in [english/movies/](../english/movies/).

## Wofuer SuperTag geeignet ist

- Gleichartige Objekte in Markdown verwalten, etwa Filme, Buecher, Papers, Kunden, Projekte oder Rezepte
- Pro Eintrag feste Felder haben und den Haupttext trotzdem frei schreiben
- Dokumente sowohl lesen als auch nach Feldern aggregieren, filtern und darstellen

Die Filmklasse ist ein gutes Beispiel: Jeder Film ist eine eigene Markdown-Datei, aber alle Dateien teilen dieselbe Struktur fuer Titel, Regie, Jahr, Genre, Bewertungen, Sichtungsstatus und Cover.

## Ein minimales SuperTag-Beispiel

```yaml
---
title:
  type: text
  label: Titel
  value: "The Godfather"
director:
  type: text
  label: Regie
  value: "Francis Ford Coppola"
year:
  type: number
  label: Jahr
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

Zwei Punkte sind zentral:

- Ein Feld besteht nicht nur aus einem Wert, sondern auch aus Metadaten wie `type` und `label`
- Eintraege werden ueber das gemeinsame Feld `class` zu einer Tabelle zusammengefasst

## Welche Felder die Filmklasse benutzt

Siehe [The Godfather](../english/movies/The%20Godfather.md).

Die Klasse deckt bereits eine recht vollstaendige Struktur ab:

- Basisdaten: `title`, `original_title`, `director`, `cast`
- Einordnung: `year`, `country`, `genre`
- Bewertung und Status: `douban_score`, `afi_rank`, `my_score`, `watched`
- Persoenliche Angaben: `watch_date`, `notes`
- Anzeige-Felder: `cover`, `warm`, `col`, `row`
- Gruppierungsfeld: `class`

Genau darin liegt ein praktischer Vorteil von SuperTag: Dieselben Felder koennen sowohl die Datenansicht als auch die Dokumentdarstellung tragen.

## Hauefige Feldtypen

Die Filmklasse nutzt bereits mehrere typische Typen:

- `text`: Text, etwa Titel, Regie oder Land
- `number`: Zahlen, etwa Jahr, Wertung oder Rang
- `date`: Datumswerte, etwa Sichtungsdatum
- `checkbox`: Boolesche Werte, etwa gesehen oder warmer Ton
- `multiselect`: Mehrfachauswahl, etwa Genre
- `array`: Listen, etwa Besetzung oder Layout-Felder
- `progress`: Fortschrittswert, etwa persoenliche Bewertung
- `asset`: Pfade zu Ressourcen, etwa Coverbilder

Wenn du eine eigene Klasse aufbaust, reichen diese Typen fuer die meisten Dokument- und Wissensdatenbanken bereits aus.

## Wie `class` funktioniert

`class` bestimmt, zu welcher SuperTag-Gruppe ein Dokument gehoert.

Die englischen Filmdokumente verwenden zum Beispiel:

```yaml
class:
  type: text
  label: class
  value: "ClassicMovieEnglish"
```

Mit diesem gemeinsamen Wert kann Zditor alle `ClassicMovieEnglish`-Dateien als eine Tabelle verstehen. Eine neue Datei wie [Chinatown](../english/movies/Chinatown.md) landet automatisch in derselben Gruppe, solange `class` gleich bleibt.

## Wie `col` und `row` das Cover steuern

SuperTag speichert nicht nur Felder, sondern kann auch direkt die Cover-Karte eines Dokuments ansteuern.

Besonders wichtig sind diese beiden Felder:

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

Sie bedeuten:

- `col`: Felder fuer den zentralen vertikalen Informationsbereich
- `row`: Felder fuer die untere oder unterstuetzende Informationsleiste

Zusammen mit `cover` und `warm` entsteht daraus ein Einstieg, der sich gleichzeitig wie Datenkarte und Dokumentkarte anfuehlt.

## Der Haupttext bleibt freies Markdown

SuperTag schraenkt den Dokumenttext nicht ein. Das ist eine der staerksten Eigenschaften: Frontmatter liefert die Struktur, der Haupttext liefert Analyse, Querverweise und laengere Erklaerungen.

Zum Beispiel enthaelt [The Godfather](../english/movies/The%20Godfather.md):

- laengere Filmkommentare
- Links zu anderen Filmdokumenten
- Vergleiche von Genre und Themen

SuperTag macht Markdown also nicht zu einer starren Tabelle. Es bringt strukturierte Daten und freies Schreiben in dieselbe Datei.

## Wie man einen SuperTag-Eintrag referenziert

Verwende einen normalen Link mit `mode=supertag`:

```md
[ClassicMovieEnglish](/english/movies/The%20Godfather.md|mode=supertag)
```

Darstellung direkt im Dokument: [ClassicMovieEnglish](/english/movies/The%20Godfather.md|mode=supertag)

Entscheidend ist `mode=supertag`. Dadurch rendert Zditor das Ziel als SuperTag-Knoten und nicht als einfachen Link.

## Wie man einen weiteren Eintrag anlegt

Am sichersten ist es, eine bestehende Datei zu kopieren und danach nur Werte anzupassen.

Empfohlene Schritte:

1. Eine aehnliche Datei kopieren, zum Beispiel [The Godfather](../english/movies/The%20Godfather.md)
2. Feldstruktur und `class` beibehalten
3. Werte ersetzen: Titel, Regie, Jahr, Cover und Haupttext
4. Wenn ein neues Feld fuer die ganze Klasse noetig wird, spaeter die ganze Klasse angleichen

So bleibt die Klasse stabil und Feldnamen, Typen oder Optionslisten driften nicht auseinander.

## Empfehlungen fuer das Design einer SuperTag-Klasse

- Zuerst die stabilsten Felder definieren
- Feldnamen moeglichst konstant halten
- Bei Mehrfachauswahl ein gemeinsames `options`-Set pflegen
- Vorhandene Vorlagen bevorzugt wiederverwenden
- Einen genutzten `class`-Namen nicht leichtfertig aendern

Die Filmklasse funktioniert gut, weil sie ein nuetzliches gemeinsames Schema mit einer klaren Darstellungslogik verbindet.

## Empfohlene Weiterlektuere

- [english/movies/](../english/movies/)
- [The Godfather](../english/movies/The%20Godfather.md)
- [English Docs Entry](../english/README.md)

Wenn du deine eigene strukturierte Sammlung bauen willst, ist das Filmbeispiel ein direkter Ausgangspunkt.
