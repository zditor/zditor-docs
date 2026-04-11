---
title:
  type: text
  description:
  label: Titel
  value: "Dr. Strangelove"
original_title:
  type: text
  description:
  label: Originaltitel
  value: "Dr. Strangelove"
year:
  type: number
  description:
  label: Jahr
  value: 1964
director:
  type: text
  description:
  label: Regie
  value: "Stanley Kubrick"
cast:
  type: array
  description:
  label: Besetzung
  value: ["Peter Sellers", "George C. Scott", "Sterling Hayden"]
country:
  type: text
  description:
  label: Land
  value: "Vereinigtes Koenigreich"
genre:
  type: multiselect
  description:
  label: Genre
  value: ["Komoedie", "Science-Fiction"]
  options: ["Drama", "Mystery", "Krimi", "Romanze", "Komoedie", "Action", "Krieg", "Science-Fiction", "Horror", "Thriller", "Western", "Musical", "Animation", "Historie", "Biografie", "Abenteuer", "Fantasy"]
afi_rank:
  type: number
  description:
  label: AFI-Rang
  value: 39
douban_score:
  type: number
  description:
  label: Douban-Wertung
  value: 8.8
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
  value: "../../assets/movies/covers/奇爱博士.jpg"
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

## Ein klarer Einstieg in Dr. Strangelove

*Dr. Strangelove* ist ein Film aus dem Jahr 1964, inszeniert von Stanley Kubrick, und laesst sich gut als Beispiel fuer Komoedie und Science-Fiction lesen. Neben der eigentlichen Handlung zeigt der Film auch, wie klassisches Kino ueber Bildaufbau, Rhythmus und Figurenkonstellationen seine Wirkung entfaltet.

Als Film aus Vereinigtes Koenigreich verbindet das Werk formale Klarheit mit einer starken Konzentration auf Beziehungen, Entscheidungen und innere Spannungen. Peter Sellers, George C. Scott, Sterling Hayden tragen die Praesenz des Films, waehrend AFI-Rang 39 und eine Douban-Wertung von 8.8 den Stellenwert im Kanon noch einmal sichtbar machen.

## Warum diese Seite als strukturierte Vorlage funktioniert

Diese Datei verbindet Fliesstext mit klaren Frontmatter-Feldern und eignet sich dadurch gut als Grundlage fuer eigene Notizen. Sichtungsdatum, persoenliche Bewertung und freie Kommentare lassen sich spaeter direkt ergaenzen, ohne dass die Seite ihre Funktion als geordnetes Filmdokument verliert. Fuer Zditor ist das eine praktische Vorlage fuer eine mehrsprachige Filmsammlung.
