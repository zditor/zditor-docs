---
description:
  type: text
  description:
  label: Description
  value: "Flowcharts · Sequenzdiagramme · Gantt-Diagramme · ER-Diagramme · Mindmap"
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
  value: "Mermaid"
avatar:
  type: asset
  description:
  label: Avatar
  value: "../assets/nanobanana-avatar.svg"
tags:
  type: text
  description:
  label: Tags
  value: "Mermaid · Diagramme · Leitfaden"
title:
  type: text
  description:
  label: Title
  value: "Mermaid Leitfaden"
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
# Mermaid Leitfaden

Mermaid ist eine textbasierte Syntax fuer Diagramme. Mit einem `mermaid`-Codeblock in Markdown lassen sich Flowcharts, Sequenzdiagramme, Gantt-Diagramme, ER-Diagramme, Git-Graphs und weitere Diagrammtypen erzeugen.

Dieser Leitfaden soll nicht jede Syntaxvariante erklaeren. Ziel ist ein praktischer Einstieg, damit du in Zditor schnell klare und wartbare Diagramme schreiben kannst.

## Schnellstart

Minimales Beispiel:

```mermaid
flowchart TD
    A[Start] --> B[Formular ausfuellen]
    B --> C{Validierung erfolgreich?}
    C -->|Ja| D[Erfolgreich absenden]
    C -->|Nein| E[Fehler anzeigen]
```

Wichtig sind vor allem zwei Punkte:

- Die Sprachkennung des Codeblocks muss `mermaid` sein
- Zuerst den passenden Diagrammtyp waehlen, dann Details ergaenzen

## Welches Diagramm fuer welchen Zweck

|Szenario |Empfohlenes Diagramm |
|---|---|
|Geschaeftsprozess, Freigabefluss, Verzweigungen |Flowchart |
|Aufrufreihenfolge zwischen Frontend, Backend, Service, Datenbank |Sequenzdiagramm |
|Zeitplan, Meilensteine, Abhaengigkeiten |Gantt-Diagramm |
|Klassen, Interfaces, Modulstruktur |Klassendiagramm |
|Zustandswechsel, Lebenszyklus, State Machine |Zustandsdiagramm |
|Tabellenstruktur und Entitaetsbeziehungen |ER-Diagramm |
|Nutzererlebnis und Touchpoints |User Journey |
|Anteile und einfache Verteilungen |Kreisdiagramm |
|Branches, Commits und Merges |Git Graph |
|Brainstorming und Wissensstruktur |Mindmap |

## Allgemeine Schreibregeln

- Knotentexte kurz halten; laengere Erklaerungen in den Fliesstext.
- Ein Diagramm sollte ein Thema erklaeren.
- Fachbegriffe aus dem Geschaeft bevorzugen, interne Abkuerzungen sparsam nutzen.
- Wenn das Diagramm zu voll wird, lieber aufteilen.
- `TD` und `LR` sind die stabilsten Standardrichtungen.

## Flowchart

Flowcharts eignen sich fuer Schritte, Entscheidungen, Uebergaenge und Modulbeziehungen.

```mermaid
flowchart TD
    A[Benutzer oeffnet Seite] --> B[Zugangsdaten eingeben]
    B --> C{Validierung erfolgreich?}
    C -->|Ja| D[Startseite anzeigen]
    C -->|Nein| E[Fehlermeldung anzeigen]
```

### Praxisbeispiel: Bestellprozess

```mermaid
flowchart TD
    A[Benutzer sendet Bestellung] --> B[Unbezahlte Bestellung anlegen]
    B --> C{Bestand verfuegbar?}
    C -->|Nein| D[Nicht verfuegbar anzeigen]
    C -->|Ja| E[Bestand reservieren]
    E --> F[Zahlung starten]
    F --> G{Zahlungsergebnis}
    G -->|Erfolg| H[Versandauftrag erzeugen]
    G -->|Fehler| I[Bestand freigeben]
    H --> J[Lager benachrichtigen]
    I --> K[Bestellung schliessen]
```

## Sequenzdiagramm

Sequenzdiagramme zeigen, wer wen in welcher Reihenfolge aufruft und was zurueckkommt.

```mermaid
sequenceDiagram
    participant U as Benutzer
    participant FE as Frontend
    participant BE as Backend
    participant DB as Datenbank

    U->>FE: Login-Formular absenden
    FE->>BE: Zugangsdaten senden
    BE->>DB: Benutzer abfragen
    DB-->>BE: Benutzerdaten zurueckgeben
    BE-->>FE: Login-Ergebnis senden
    FE-->>U: Ergebnis anzeigen
```

### Praxisbeispiel: Speichern einer Datei

```mermaid
sequenceDiagram
    participant U as Benutzer
    participant E as Editor
    participant S as Sync-Dienst
    participant G as Git-Dienst

    U->>E: Speichern klicken
    E->>E: Datei lokal schreiben
    E->>S: Aenderungszusammenfassung senden
    alt Auto-Sync aktiv
        S->>G: Commit erstellen
        G-->>S: Commit-Ergebnis zurueckgeben
        S-->>E: Sync erfolgreich
    else Nur lokal speichern
        S-->>E: Remote-Sync ueberspringen
    end
    E-->>U: Speicherstatus anzeigen
```

## Gantt-Diagramm

Gantt-Diagramme sind gut fuer Zeitplaene, Phasen und Meilensteine.

```mermaid
gantt
    title Release-Plan
    dateFormat YYYY-MM-DD

    section Anforderungen
    Anforderungen sammeln :done, r1, 2026-04-01, 3d
    Konzept reviewen      :done, r2, after r1, 2d

    section Entwicklung
    Kernfunktionen bauen  :active, d1, 2026-04-06, 6d
    Regression beheben    :crit, d2, after d1, 3d

    section Release
    Canary-Rollout        :g1, 2026-04-16, 2d
    Produktivgang         :milestone, g2, 2026-04-18, 0d
```

## Klassendiagramm

```mermaid
classDiagram
    class Editor {
        +String filePath
        +open()
        +save()
        +render()
    }

    class Document {
        +String title
        +String body
        +parse()
    }

    class Renderer {
        +renderMarkdown()
        +renderMermaid()
    }

    Editor --> Document : bearbeitet
    Editor --> Renderer : verwendet
```

## Zustandsdiagramm

```mermaid
stateDiagram-v2
    [*] --> Entwurf
    Entwurf --> InPruefung: Zur Pruefung senden
    InPruefung --> Veroeffentlicht: Freigegeben
    InPruefung --> Entwurf: Abgelehnt
    Veroeffentlicht --> Offline: Manuell deaktiviert
    Offline --> [*]
```

## ER-Diagramm

```mermaid
erDiagram
    USER ||--o{ DOCUMENT : creates
    DOCUMENT ||--o{ DOCUMENT_TAG : tagged_with
    TAG ||--o{ DOCUMENT_TAG : maps

    USER {
        string id
        string name
        string email
    }

    DOCUMENT {
        string id
        string title
        string status
    }
```

## Weitere nuetzliche Typen

### Kreisdiagramm

```mermaid
pie title Dokumentquellen
    "Produktdokumente" : 35
    "Technisches Design" : 25
    "Tutorials" : 20
    "Betriebsinhalte" : 12
    "Andere" : 8
```

### Git Graph

```mermaid
gitGraph
    commit id: "init"
    branch feature/editor
    checkout feature/editor
    commit id: "editor-ui"
    commit id: "autosave"
    checkout main
    merge feature/editor
    commit id: "release"
```

### Mindmap

```mermaid
mindmap
  root((Editor Planung))
    Schreiben
      Auto Save
      Split View
      Shortcuts
    Diagramme
      Mermaid
      Excalidraw
      Tabellen
    KI
      Zusammenfassen
      Umschreiben
      Q&A
```

## Haeufige Probleme

### Diagramm wird nicht gerendert

- Pruefen, ob der Codeblock wirklich `mermaid` als Sprachkennung hat
- Diagramm-Schluesselwort wie `flowchart` oder `sequenceDiagram` pruefen
- Erst mit einem Minimalbeispiel testen, dann schrittweise erweitern

### Diagramm ist zu gross oder unuebersichtlich

- Weniger Knoten verwenden
- Knotentexte verkuerzen
- `LR` oder `TD` ausprobieren
- Inhalt auf mehrere Diagramme aufteilen

## Referenzen
