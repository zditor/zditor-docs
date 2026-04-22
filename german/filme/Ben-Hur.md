---
title:
  type: text
  description:
  label: Titel
  value: "Ben-Hur"
original_title:
  type: text
  description:
  label: Originaltitel
  value: "Ben-Hur"
year:
  type: number
  description:
  label: Jahr
  value: 1959
director:
  type: text
  description:
  label: Regie
  value: "William Wyler"
cast:
  type: array
  description:
  label: Besetzung
  value: ["Charlton Heston", "Jack Hawkins", "Stephen Boyd"]
country:
  type: text
  description:
  label: Land
  value: "USA"
genre:
  type: multiselect
  description:
  label: Genre
  value: ["Drama", "Action", "Historie"]
  options: ["Drama", "Mystery", "Krimi", "Romanze", "Komoedie", "Action", "Krieg", "Science-Fiction", "Horror", "Thriller", "Western", "Musical", "Animation", "Historie", "Biografie", "Abenteuer", "Fantasy"]
afi_rank:
  type: number
  description:
  label: AFI-Rang
  value: 100
douban_score:
  type: number
  description:
  label: Douban-Wertung
  value: 8.7
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
  value: "../../assets/movies/covers/宾虚.jpg"
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

## Ein klarer Einstieg in Ben-Hur

*Ben-Hur* ist ein Film aus dem Jahr 1959, inszeniert von William Wyler, und laesst sich gut als Beispiel fuer Drama und Action lesen. Neben der eigentlichen Handlung zeigt der Film auch, wie klassisches Kino ueber Bildaufbau, Rhythmus und Figurenkonstellationen seine Wirkung entfaltet.

Als Film aus USA verbindet das Werk formale Klarheit mit einer starken Konzentration auf Beziehungen, Entscheidungen und innere Spannungen. Charlton Heston, Jack Hawkins, Stephen Boyd tragen die Praesenz des Films, waehrend AFI-Rang 100 und eine Douban-Wertung von 8.7 den Stellenwert im Kanon noch einmal sichtbar machen.

## Warum diese Seite als strukturierte Vorlage funktioniert

Diese Datei verbindet Fliesstext mit klaren Frontmatter-Feldern und eignet sich dadurch gut als Grundlage fuer eigene Notizen. Sichtungsdatum, persoenliche Bewertung und freie Kommentare lassen sich spaeter direkt ergaenzen, ohne dass die Seite ihre Funktion als geordnetes Filmdokument verliert. Fuer Zditor ist das eine praktische Vorlage fuer eine mehrsprachige Filmsammlung.
