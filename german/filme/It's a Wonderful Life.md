---
title:
  type: text
  description:
  label: Titel
  value: "It's a Wonderful Life"
original_title:
  type: text
  description:
  label: Originaltitel
  value: "It's a Wonderful Life"
year:
  type: number
  description:
  label: Jahr
  value: 1946
director:
  type: text
  description:
  label: Regie
  value: "Frank Capra"
cast:
  type: array
  description:
  label: Besetzung
  value: ["James Stewart", "Donna Reed", "Lionel Barrymore"]
country:
  type: text
  description:
  label: Land
  value: "USA"
genre:
  type: multiselect
  description:
  label: Genre
  value: ["Drama", "Fantasy"]
  options: ["Drama", "Mystery", "Krimi", "Romanze", "Komoedie", "Action", "Krieg", "Science-Fiction", "Horror", "Thriller", "Western", "Musical", "Animation", "Historie", "Biografie", "Abenteuer", "Fantasy"]
afi_rank:
  type: number
  description:
  label: AFI-Rang
  value: 20
douban_score:
  type: number
  description:
  label: Douban-Wertung
  value: 8.6
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
  value: "../../assets/movies/covers/美好人生.jpg"
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
  value: true
---

## Ein klarer Einstieg in It's a Wonderful Life

*It's a Wonderful Life* ist ein Film aus dem Jahr 1946, inszeniert von Frank Capra, und laesst sich gut als Beispiel fuer Drama und Fantasy lesen. Neben der eigentlichen Handlung zeigt der Film auch, wie klassisches Kino ueber Bildaufbau, Rhythmus und Figurenkonstellationen seine Wirkung entfaltet.

Als Film aus USA verbindet das Werk formale Klarheit mit einer starken Konzentration auf Beziehungen, Entscheidungen und innere Spannungen. James Stewart, Donna Reed, Lionel Barrymore tragen die Praesenz des Films, waehrend AFI-Rang 20 und eine Douban-Wertung von 8.6 den Stellenwert im Kanon noch einmal sichtbar machen.

## Warum diese Seite als strukturierte Vorlage funktioniert

Diese Datei verbindet Fliesstext mit klaren Frontmatter-Feldern und eignet sich dadurch gut als Grundlage fuer eigene Notizen. Sichtungsdatum, persoenliche Bewertung und freie Kommentare lassen sich spaeter direkt ergaenzen, ohne dass die Seite ihre Funktion als geordnetes Filmdokument verliert. Fuer Zditor ist das eine praktische Vorlage fuer eine mehrsprachige Filmsammlung.
