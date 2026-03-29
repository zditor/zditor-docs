---
class:
  type: text
  label: "class"
  description: ""
  value: "ClassicMovie"
  default: ""
title:
  type: text
  label: "片名"
  description: ""
  value: "外星人ET"
  default: ""
original_title:
  type: text
  label: "原片名"
  description: ""
  value: "E.T. the Extra-Terrestrial"
  default: ""
year:
  type: number
  label: "年份"
  description: ""
  value: 1982
  default: 0
director:
  type: text
  label: "导演"
  description: ""
  value: "史蒂文·斯皮尔伯格"
  default: ""
cast:
  type: array
  label: "主演"
  description: ""
  value: ["亨利·托马斯", "德鲁·巴里摩尔", "迪·华莱士"]
  default: []
country:
  type: text
  label: "国家"
  description: ""
  value: "美国"
  default: ""
genre:
  type: multiselect
  label: "类型"
  description: ""
  value: ["科幻", "冒险"]
  default: []
  options: ["剧情", "悬疑", "犯罪", "爱情", "喜剧", "动作", "战争", "科幻", "恐怖", "惊悚", "西部", "音乐歌舞", "动画", "历史", "传记", "冒险", "奇幻"]
afi_rank:
  type: number
  label: "AFI排名"
  description: ""
  value: 24
  default: 0
douban_score:
  type: number
  label: "豆瓣评分"
  description: ""
  value: 8.4
  default: 0
watched:
  type: checkbox
  label: "已看"
  description: ""
  value: false
  default: false
watch_date:
  type: date
  label: "观看日期"
  description: ""
  value: ""
  default: ""
my_score:
  type: progress
  label: "我的评分"
  description: "满分100"
  value: 0
  default: 0
notes:
  type: text
  label: "观后感"
  description: ""
  value: ""
  default: ""
cover:
  type: asset
  description: 
  label: Cover Image
  value: ""
  default: ""
display:
  type: checkbox
  description: display
  label: 显示属性
  value: false
  default: false
warm:
  type: checkbox
  description: warm
  label: 暖色调
  value: false
  default: false
col:
  type: array
  description: ''
  label: Col
  value:
  - year
  - title
  - director
  default: []
row:
  type: array
  description: ''
  label: Row
  value:
  - genre
  - afi_rank
  - douban_score
  - watched
  default: []
---

> 孩子与外星人的纯真友情，斯皮尔伯格献给童年的礼物。
