---
title:
  type: text
  description:
  label: Titel
  value: "Sunrise"
original_title:
  type: text
  description:
  label: Originaltitel
  value: "Sunrise"
year:
  type: number
  description:
  label: Jahr
  value: 1927
director:
  type: text
  description:
  label: Regie
  value: "F. W. Murnau"
cast:
  type: array
  description:
  label: Besetzung
  value: ["George O'Brien", "Janet Gaynor", "Margaret Livingston"]
country:
  type: text
  description:
  label: Land
  value: "USA"
genre:
  type: multiselect
  description:
  label: Genre
  value: ["Drama", "Romanze"]
  options: ["Drama", "Mystery", "Krimi", "Romanze", "Komoedie", "Action", "Krieg", "Science-Fiction", "Horror", "Thriller", "Western", "Musical", "Animation", "Historie", "Biografie", "Abenteuer", "Fantasy"]
afi_rank:
  type: number
  description:
  label: AFI-Rang
  value: 82
douban_score:
  type: number
  description:
  label: Douban-Wertung
  value: 8.2
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
field:
  type: array
  description:
  label: field
  value: ["title", "original_title", "year", "director", "cast", "country", "genre", "afi_rank", "douban_score", "watched", "watch_date", "my_score", "notes"]
cover:
  type: asset
  description:
  label: Cover Image
  value: "../../assets/movies/covers/日出.jpg"
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

## Ein klarer Einstieg in Sunrise

*Sunrise* ist ein Film aus dem Jahr 1927, inszeniert von F. W. Murnau, und laesst sich gut als Beispiel fuer Drama und Romanze lesen. Neben der eigentlichen Handlung zeigt der Film auch, wie klassisches Kino ueber Bildaufbau, Rhythmus und Figurenkonstellationen seine Wirkung entfaltet.

Als Film aus USA verbindet das Werk formale Klarheit mit einer starken Konzentration auf Beziehungen, Entscheidungen und innere Spannungen. George O'Brien, Janet Gaynor, Margaret Livingston tragen die Praesenz des Films, waehrend AFI-Rang 82 und eine Douban-Wertung von 8.2 den Stellenwert im Kanon noch einmal sichtbar machen.

## Warum diese Seite als strukturierte Vorlage funktioniert

Diese Datei verbindet Fliesstext mit klaren Frontmatter-Feldern und eignet sich dadurch gut als Grundlage fuer eigene Notizen. Sichtungsdatum, persoenliche Bewertung und freie Kommentare lassen sich spaeter direkt ergaenzen, ohne dass die Seite ihre Funktion als geordnetes Filmdokument verliert. Fuer Zditor ist das eine praktische Vorlage fuer eine mehrsprachige Filmsammlung.
