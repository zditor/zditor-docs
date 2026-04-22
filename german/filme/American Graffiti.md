---
title:
  type: text
  description:
  label: Titel
  value: "American Graffiti"
original_title:
  type: text
  description:
  label: Originaltitel
  value: "American Graffiti"
year:
  type: number
  description:
  label: Jahr
  value: 1973
director:
  type: text
  description:
  label: Regie
  value: "George Lucas"
cast:
  type: array
  description:
  label: Besetzung
  value: ["Richard Dreyfuss", "Ron Howard", "Paul Le Mat"]
country:
  type: text
  description:
  label: Land
  value: "USA"
genre:
  type: multiselect
  description:
  label: Genre
  value: ["Drama", "Komoedie"]
  options: ["Drama", "Mystery", "Krimi", "Romanze", "Komoedie", "Action", "Krieg", "Science-Fiction", "Horror", "Thriller", "Western", "Musical", "Animation", "Historie", "Biografie", "Abenteuer", "Fantasy"]
afi_rank:
  type: number
  description:
  label: AFI-Rang
  value: 62
douban_score:
  type: number
  description:
  label: Douban-Wertung
  value: 7.5
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
  value: "../../assets/movies/covers/美国风情画.jpg"
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

## Ein klarer Einstieg in American Graffiti

*American Graffiti* ist ein Film aus dem Jahr 1973, inszeniert von George Lucas, und laesst sich gut als Beispiel fuer Drama und Komoedie lesen. Neben der eigentlichen Handlung zeigt der Film auch, wie klassisches Kino ueber Bildaufbau, Rhythmus und Figurenkonstellationen seine Wirkung entfaltet.

Als Film aus USA verbindet das Werk formale Klarheit mit einer starken Konzentration auf Beziehungen, Entscheidungen und innere Spannungen. Richard Dreyfuss, Ron Howard, Paul Le Mat tragen die Praesenz des Films, waehrend AFI-Rang 62 und eine Douban-Wertung von 7.5 den Stellenwert im Kanon noch einmal sichtbar machen.

## Warum diese Seite als strukturierte Vorlage funktioniert

Diese Datei verbindet Fliesstext mit klaren Frontmatter-Feldern und eignet sich dadurch gut als Grundlage fuer eigene Notizen. Sichtungsdatum, persoenliche Bewertung und freie Kommentare lassen sich spaeter direkt ergaenzen, ohne dass die Seite ihre Funktion als geordnetes Filmdokument verliert. Fuer Zditor ist das eine praktische Vorlage fuer eine mehrsprachige Filmsammlung.
