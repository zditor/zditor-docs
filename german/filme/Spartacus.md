---
title:
  type: text
  description:
  label: Titel
  value: "Spartacus"
original_title:
  type: text
  description:
  label: Originaltitel
  value: "Spartacus"
year:
  type: number
  description:
  label: Jahr
  value: 1960
director:
  type: text
  description:
  label: Regie
  value: "Stanley Kubrick"
cast:
  type: array
  description:
  label: Besetzung
  value: ["Kirk Douglas", "Laurence Olivier", "Jean Simmons"]
country:
  type: text
  description:
  label: Land
  value: "USA"
genre:
  type: multiselect
  description:
  label: Genre
  value: ["Action", "Historie", "Drama"]
  options: ["Drama", "Mystery", "Krimi", "Romanze", "Komoedie", "Action", "Krieg", "Science-Fiction", "Horror", "Thriller", "Western", "Musical", "Animation", "Historie", "Biografie", "Abenteuer", "Fantasy"]
afi_rank:
  type: number
  description:
  label: AFI-Rang
  value: 81
douban_score:
  type: number
  description:
  label: Douban-Wertung
  value: 8.3
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
  value: "../../assets/movies/covers/斯巴达克斯.jpg"
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

## Ein klarer Einstieg in Spartacus

*Spartacus* ist ein Film aus dem Jahr 1960, inszeniert von Stanley Kubrick, und laesst sich gut als Beispiel fuer Action und Historie lesen. Neben der eigentlichen Handlung zeigt der Film auch, wie klassisches Kino ueber Bildaufbau, Rhythmus und Figurenkonstellationen seine Wirkung entfaltet.

Als Film aus USA verbindet das Werk formale Klarheit mit einer starken Konzentration auf Beziehungen, Entscheidungen und innere Spannungen. Kirk Douglas, Laurence Olivier, Jean Simmons tragen die Praesenz des Films, waehrend AFI-Rang 81 und eine Douban-Wertung von 8.3 den Stellenwert im Kanon noch einmal sichtbar machen.

## Warum diese Seite als strukturierte Vorlage funktioniert

Diese Datei verbindet Fliesstext mit klaren Frontmatter-Feldern und eignet sich dadurch gut als Grundlage fuer eigene Notizen. Sichtungsdatum, persoenliche Bewertung und freie Kommentare lassen sich spaeter direkt ergaenzen, ohne dass die Seite ihre Funktion als geordnetes Filmdokument verliert. Fuer Zditor ist das eine praktische Vorlage fuer eine mehrsprachige Filmsammlung.
