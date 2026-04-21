---
description:
  type: text
  description:
  label: Description
  value: "Zditor Syntax · Annotationen · Revisionen · Tip · Revision"
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
  value: "Zditor · Annotation · Revision · Tip"
title:
  type: text
  description:
  label: Title
  value: "Zditor Leitfaden fuer Annotationen und Revisionen"
display:
  type: checkbox
  description: display
  label: Eigenschaften anzeigen
  value: false
updated:
  type: date
  description:
  label: Updated
  value: "2026-04-21"
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
# Zditor Leitfaden fuer Annotationen und Revisionen

Dieser Leitfaden zeigt zwei Inline-Markierungen in Zditor:

- `Annotationen`: erklaeren eine Formulierung, ohne den Originaltext zu aendern
- `Revisionen`: schlagen einen Ersatz vor, der uebernommen werden kann

Das eignet sich fuer Korrekturen, kollaboratives Schreiben, Terminologie-Hinweise und Stilvereinheitlichung.

## Worin liegt der Unterschied

|Funktion |Zweck |Aenderung uebernehmbar |Geeignet fuer |
|---|---|---|---|
|`mode=tip` |Text erklaeren oder kommentieren |Nein |Begriffserklaerungen, Lesehinweise, Kontext |
|`mode=revision` |Ersatz vorschlagen |Ja |Tippfehler, bessere Formulierungen, genauere Datumsangaben |

!!! info Faustregel
    Nutze eine Annotation, wenn du etwas erklaeren willst.
    Nutze eine Revision, wenn du den Text ersetzen willst.

## Minimale Beispiele

```md
[Begriff](hier steht die Erklaerung|mode=tip|style=teal)

[Originaltext](warum er geaendert werden sollte|mode=revision|style=indigo|advice=Ersatztext)
```

Direkte Beispiele:

- [Zditor](ein Editor mit erweiterter Markdown-Syntax und strukturierten Funktionen|mode=tip|style=teal) kann Erklaerungen direkt an Inline-Text haengen.
- Bitte ersetze [bald](zu ungenau fuer eine Release-Planung|mode=revision|style=red|advice=bis zum 30. April 2026).

## Annotationen mit Tip

`Tip` ist fuer erklaerende Markierungen gedacht. Der Originaltext bleibt stehen, die Annotation fuegt nur Kontext hinzu.

### Syntax

```md
[Text](Annotationstext|mode=tip|style=Farbe)
```

### Direkte Beispiele

[Vektordatenbank](gut fuer semantische Suche, aber nicht dasselbe wie eine relationale Datenbank|mode=tip|style=teal) ist in Wissenssystemen haeufig.

Das [Berechtigungsmodell](gemeint ist die Beziehung zwischen Rollen, Ressourcen und Aktionen|mode=tip|style=yellow) sollte vor der Teamfreigabe fertig sein.

Wenn ein API-Begriff Englisch bleibt, erklaere [DTO](Data Transfer Object|mode=tip|style=indigo) beim ersten Auftreten.

### Beispielcode

```md
[Vektordatenbank](gut fuer semantische Suche, aber nicht dasselbe wie eine relationale Datenbank|mode=tip|style=teal) ist in Wissenssystemen haeufig.

Das [Berechtigungsmodell](gemeint ist die Beziehung zwischen Rollen, Ressourcen und Aktionen|mode=tip|style=yellow) sollte vor der Teamfreigabe fertig sein.

Wenn ein API-Begriff Englisch bleibt, erklaere [DTO](Data Transfer Object|mode=tip|style=indigo) beim ersten Auftreten.
```

## Revisionen mit Revision

`Revision` ist fuer konkrete Aenderungsvorschlaege gedacht. Der Originaltext bleibt sichtbar und `advice` enthaelt den Ersatz.

### Syntax

```md
[Originaltext](warum er geaendert werden sollte|mode=revision|style=Farbe|advice=Ersatztext)
```

### Direkte Beispiele

Der Release wird [bald](zu ungenau fuer die Planung|mode=revision|style=red|advice=bis zum 30. April 2026) erwartet.

Hier sollte [genutzt](zu umgangssprachlich fuer dieses Dokument|mode=revision|style=indigo|advice=verwendet) durch ein formelleres Verb ersetzt werden.

Im Dokument steht noch [teh](Tippfehler|mode=revision|style=red|advice=the).

### Beispielcode

```md
Der Release wird [bald](zu ungenau fuer die Planung|mode=revision|style=red|advice=bis zum 30. April 2026) erwartet.

Hier sollte [genutzt](zu umgangssprachlich fuer dieses Dokument|mode=revision|style=indigo|advice=verwendet) durch ein formelleres Verb ersetzt werden.

Im Dokument steht noch [teh](Tippfehler|mode=revision|style=red|advice=the).
```

## Beides in einem Absatz

In echten Dokumenten werden Annotationen und Revisionen oft gemischt. Manche Begriffe brauchen Erklaerung, andere eine direkte Korrektur.

### Direktes Beispiel

Diese Version startet mit einem [MVP](Minimum Viable Product|mode=tip|style=teal), um den Kernablauf zu pruefen. Die ersten Pilotnutzer sollen [naechsten Monat](zu breit fuer einen Plan|mode=revision|style=red|advice=im Mai 2026) eingeladen werden. In der aktuellen Formulierung sollte [klicken](fuer Desktop-Texte ist waehlen oft passender|mode=revision|style=indigo|advice=waehlen) vereinheitlicht werden.

### Beispielcode

```md
Diese Version startet mit einem [MVP](Minimum Viable Product|mode=tip|style=teal), um den Kernablauf zu pruefen. Die ersten Pilotnutzer sollen [naechsten Monat](zu breit fuer einen Plan|mode=revision|style=red|advice=im Mai 2026) eingeladen werden. In der aktuellen Formulierung sollte [klicken](fuer Desktop-Texte ist waehlen oft passender|mode=revision|style=indigo|advice=waehlen) vereinheitlicht werden.
```

## Farben sinnvoll waehlen

Die Referenz `zditor-syntax` empfiehlt in der Praxis diese Zuordnung:

|Farbe |Typischer Einsatz |
|---|---|
|`red` |Fehler, Loeschungen, unklare Datumsangaben, Tippfehler |
|`indigo` |Formulierungsverbesserung, Stilangleichung, Tonkorrektur |
|`teal` |neutrale Erklaerungen und allgemeine Hinweise |
|`yellow` |Warnungen und Dinge mit zusaetzlichem Aufmerksamkeitsbedarf |
|`green` |positive Bestaetigung oder bewusstes Beibehalten |

Direkte Beispiele:

- [Cache-Warmup](vor dem Launch einmal ausfuehren, damit kein Cold Start bremst|mode=tip|style=yellow) kann die ersten Anfragen stabilisieren.
- Die Formulierung [ist fertig](eine genauere Formulierung waere besser|mode=revision|style=green|advice=hat den Integrationstest abgeschlossen) kann ebenfalls `green` verwenden.

## Wo sich das gut einsetzen laesst

- PR-Review-Dokumente
- Produktspezifikationen
- technische Notizen und Paper-Lesedokumente
- interne Kollaborationsdokumente mit Kommentaren bei erhaltenem Originaltext

## Haeufige Fehler

!!! warning Typische Stolperstellen
    `revision` braucht immer `advice`, sonst fehlt der eigentliche Ersatz.
    `tip` braucht kein `advice`.
    Am sichersten sind `teal`, `indigo`, `red`, `green` und `yellow`.
    Beide Syntaxformen sind inline gedacht. Markiere kurze Phrasen, keine ganzen Absaetze.

## Vorlagen zum Kopieren

### Annotationsvorlage

```md
Dieser Satz enthaelt einen [Begriff](hier steht die Erklaerung|mode=tip|style=teal).
```

### Revisionsvorlage

```md
Bitte ersetze [die alte Formulierung](hier steht der Grund|mode=revision|style=indigo|advice=die neue Formulierung).
```

### Vorlage fuer einen Korrekturabsatz

```md
Diese Version nutzt ein [API Gateway](der gemeinsame Einstieg fuer Authentifizierung und Routing|mode=tip|style=teal) und soll [bald](zu ungenau|mode=revision|style=red|advice=im Mai 2026) fuer Partnertests geoeffnet werden.
```

## Empfohlene Anschlusslektuere

- [Code Beispiele](./Code%20Beispiele.md)
- [SuperTag Leitfaden](./SuperTag%20Leitfaden.md)
- [Mermaid Leitfaden](./Mermaid%20Leitfaden.md)
