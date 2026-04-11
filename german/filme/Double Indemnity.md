---
title:
  type: text
  description:
  label: Titel
  value: "Double Indemnity"
original_title:
  type: text
  description:
  label: Originaltitel
  value: "Double Indemnity"
year:
  type: number
  description:
  label: Jahr
  value: 1944
director:
  type: text
  description:
  label: Regie
  value: "Billy Wilder"
cast:
  type: array
  description:
  label: Besetzung
  value: ["Fred MacMurray", "Barbara Stanwyck", "Edward G. Robinson"]
country:
  type: text
  description:
  label: Land
  value: "USA"
genre:
  type: multiselect
  description:
  label: Genre
  value: ["Mystery", "Krimi", "Drama"]
  options: ["Drama", "Mystery", "Krimi", "Romanze", "Komoedie", "Action", "Krieg", "Science-Fiction", "Horror", "Thriller", "Western", "Musical", "Animation", "Historie", "Biografie", "Abenteuer", "Fantasy"]
afi_rank:
  type: number
  description:
  label: AFI-Rang
  value: 29
douban_score:
  type: number
  description:
  label: Douban-Wertung
  value: 8.5
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
  value: "../../assets/movies/covers/双重赔偿.jpg"
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

## Ein klarer Einstieg in Double Indemnity

*Double Indemnity* ist ein Film aus dem Jahr 1944, inszeniert von Billy Wilder, und laesst sich gut als Beispiel fuer Mystery und Krimi lesen. Neben der eigentlichen Handlung zeigt der Film auch, wie klassisches Kino ueber Bildaufbau, Rhythmus und Figurenkonstellationen seine Wirkung entfaltet.

Als Film aus USA verbindet das Werk formale Klarheit mit einer starken Konzentration auf Beziehungen, Entscheidungen und innere Spannungen. Fred MacMurray, Barbara Stanwyck, Edward G. Robinson tragen die Praesenz des Films, waehrend AFI-Rang 29 und eine Douban-Wertung von 8.5 den Stellenwert im Kanon noch einmal sichtbar machen.

## Warum diese Seite als strukturierte Vorlage funktioniert

Diese Datei verbindet Fliesstext mit klaren Frontmatter-Feldern und eignet sich dadurch gut als Grundlage fuer eigene Notizen. Sichtungsdatum, persoenliche Bewertung und freie Kommentare lassen sich spaeter direkt ergaenzen, ohne dass die Seite ihre Funktion als geordnetes Filmdokument verliert. Fuer Zditor ist das eine praktische Vorlage fuer eine mehrsprachige Filmsammlung.
