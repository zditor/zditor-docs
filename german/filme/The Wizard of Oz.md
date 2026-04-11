---
title:
  type: text
  description:
  label: Titel
  value: "The Wizard of Oz"
original_title:
  type: text
  description:
  label: Originaltitel
  value: "The Wizard of Oz"
year:
  type: number
  description:
  label: Jahr
  value: 1939
director:
  type: text
  description:
  label: Regie
  value: "Victor Fleming"
cast:
  type: array
  description:
  label: Besetzung
  value: ["Judy Garland", "Frank Morgan", "Ray Bolger"]
country:
  type: text
  description:
  label: Land
  value: "USA"
genre:
  type: multiselect
  description:
  label: Genre
  value: ["Fantasy", "Musical"]
  options: ["Drama", "Mystery", "Krimi", "Romanze", "Komoedie", "Action", "Krieg", "Science-Fiction", "Horror", "Thriller", "Western", "Musical", "Animation", "Historie", "Biografie", "Abenteuer", "Fantasy"]
afi_rank:
  type: number
  description:
  label: AFI-Rang
  value: 10
douban_score:
  type: number
  description:
  label: Douban-Wertung
  value: 8.1
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
  value: "../../assets/movies/covers/绿野仙踪.jpg"
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

## Ein klarer Einstieg in The Wizard of Oz

*The Wizard of Oz* ist ein Film aus dem Jahr 1939, inszeniert von Victor Fleming, und laesst sich gut als Beispiel fuer Fantasy und Musical lesen. Neben der eigentlichen Handlung zeigt der Film auch, wie klassisches Kino ueber Bildaufbau, Rhythmus und Figurenkonstellationen seine Wirkung entfaltet.

Als Film aus USA verbindet das Werk formale Klarheit mit einer starken Konzentration auf Beziehungen, Entscheidungen und innere Spannungen. Judy Garland, Frank Morgan, Ray Bolger tragen die Praesenz des Films, waehrend AFI-Rang 10 und eine Douban-Wertung von 8.1 den Stellenwert im Kanon noch einmal sichtbar machen.

## Warum diese Seite als strukturierte Vorlage funktioniert

Diese Datei verbindet Fliesstext mit klaren Frontmatter-Feldern und eignet sich dadurch gut als Grundlage fuer eigene Notizen. Sichtungsdatum, persoenliche Bewertung und freie Kommentare lassen sich spaeter direkt ergaenzen, ohne dass die Seite ihre Funktion als geordnetes Filmdokument verliert. Fuer Zditor ist das eine praktische Vorlage fuer eine mehrsprachige Filmsammlung.
