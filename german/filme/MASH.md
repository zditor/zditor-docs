---
title:
  type: text
  description:
  label: Titel
  value: "MASH"
original_title:
  type: text
  description:
  label: Originaltitel
  value: "MASH"
year:
  type: number
  description:
  label: Jahr
  value: 1970
director:
  type: text
  description:
  label: Regie
  value: "Robert Altman"
cast:
  type: array
  description:
  label: Besetzung
  value: ["Donald Sutherland", "Elliott Gould", "Tom Skerritt"]
country:
  type: text
  description:
  label: Land
  value: "USA"
genre:
  type: multiselect
  description:
  label: Genre
  value: ["Krieg", "Komoedie"]
  options: ["Drama", "Mystery", "Krimi", "Romanze", "Komoedie", "Action", "Krieg", "Science-Fiction", "Horror", "Thriller", "Western", "Musical", "Animation", "Historie", "Biografie", "Abenteuer", "Fantasy"]
afi_rank:
  type: number
  description:
  label: AFI-Rang
  value: 54
douban_score:
  type: number
  description:
  label: Douban-Wertung
  value: 7.7
watched:
  type: checkbox
  description:
  label: Gesehen
  value: false
watch_date:
  type: date
  description:
  label: Sichtungsdatum
  value: ""
my_score:
  type: progress
  description: Wertung von 0 bis 100
  label: Eigene Wertung
  value: 0
notes:
  type: text
  description:
  label: Notizen
  value: ""
class:
  type: text
  description:
  label: class
  value: "ClassicMovieGerman"
cover:
  type: asset
  description:
  label: Cover Image
  value: "../../assets/movies/covers/陆军野战医院.jpg"
col:
  type: array
  description:
  label: Col
  value: ["year", "title", "director"]
row:
  type: array
  description:
  label: Row
  value: ["genre", "afi_rank", "douban_score", "watched"]
display:
  type: checkbox
  description: display
  label: Eigenschaften anzeigen
  value: false
warm:
  type: checkbox
  description: warm
  label: Warmer Ton
  value: false
---

## Ein klarer Einstieg in MASH

*MASH* ist ein Film aus dem Jahr 1970, inszeniert von Robert Altman, und laesst sich gut als Beispiel fuer Krieg und Komoedie lesen. Neben der eigentlichen Handlung zeigt der Film auch, wie klassisches Kino ueber Bildaufbau, Rhythmus und Figurenkonstellationen seine Wirkung entfaltet.

Als Film aus USA verbindet das Werk formale Klarheit mit einer starken Konzentration auf Beziehungen, Entscheidungen und innere Spannungen. Donald Sutherland, Elliott Gould, Tom Skerritt tragen die Praesenz des Films, waehrend AFI-Rang 54 und eine Douban-Wertung von 7.7 den Stellenwert im Kanon noch einmal sichtbar machen.

## Warum diese Seite als strukturierte Vorlage funktioniert

Diese Datei verbindet Fliesstext mit klaren Frontmatter-Feldern und eignet sich dadurch gut als Grundlage fuer eigene Notizen. Sichtungsdatum, persoenliche Bewertung und freie Kommentare lassen sich spaeter direkt ergaenzen, ohne dass die Seite ihre Funktion als geordnetes Filmdokument verliert. Fuer Zditor ist das eine praktische Vorlage fuer eine mehrsprachige Filmsammlung.
