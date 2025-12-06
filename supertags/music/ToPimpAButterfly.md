---
created:
  type: datetime
  description: 创建日期时间
  label: 创建时间
  value: "2025-12-06T10:00:00"
  default: "2025-12-06T10:00:00"
class:
  type: text
  description: 音乐分类
  label: 分类
  value: "music"
  default: ""
language:
  type: select
  description: 音乐语言
  label: 语言
  value: "英文"
  default: "英文"
  options: ["英文","中文","日文","其他","纯音乐"]
price:
  type: number
  description: 价格（元）
  label: 价格
  value: 0
  default: 0
rating:
  type: number
  description: 评分(1-5)
  label: 评分
  value: 5
  default: 0
display:
  type: checkbox
  description: display
  label: 显示属性
  value: true
  default: false
category:
  type: multiselect
  description: 音乐分类
  label: 分类
  value: ["音乐"]
  default: []
  options: ["音乐","技术","文学","历史","哲学","科学","艺术","商业","心理学","教育","其他"]
difficulty:
  type: select
  description: 收听难度
  label: 难度
  value: "中级"
  default: "初级"
  options: ["初级","中级","高级"]
recommendation:
  type: select
  description: 推荐程度
  label: 推荐度
  value: "强烈推荐"
  default: "一般"
  options: ["不推荐","一般","推荐","强烈推荐"]
review:
  type: text
  description: 个人评价
  label: 评价
  value: ""
  default: ""
warm:
  type: checkbox
  description: warm
  label: 暖色调
  value: false
  default: false
cover:
  type: asset
  description: 封面图片
  label: 封面
  value: ""
  default: ""
play_end_date:
  type: date
  description: 完成收听日期
  label: 完成收听
  value: ""
  default: ""
isbn:
  type: text
  description: 编号
  label: 编号
  value: ""
  default: ""
original_title:
  type: text
  description: 原版标题
  label: 原版标题
  value: ""
  default: ""
format:
  type: select
  description: 音乐格式
  label: 格式
  value: "专辑"
  default: "专辑"
  options: ["专辑","单曲","现场录音","合辑","原声带"]
pages:
  type: number
  description: 曲目数量
  label: 曲目数
  value: 16
  default: 0
authors:
  type: array
  description: 艺术家列表
  label: 艺术家
  value: ["Kendrick Lamar"]
  default: []
release_date:
  type: date
  description: 发行日期
  label: 发行日期
  value: "2015-03-15"
  default: ""
print_date:
  type: date
  description: 印刷日期
  label: 印刷日期
  value: ""
  default: ""
read:
  type: checkbox
  description: 是否已听
  label: 已听
  value: true
  default: false
playing_status:
  type: select
  description: 收听状态
  label: 收听状态
  value: "已完成"
  default: "未开始"
  options: ["未开始","正在收听","已暂停","已完成","放弃"]
subject:
  type: multiselect
  description: 主题标签
  label: 主题
  value: ["嘻哈","爵士融合"," conscious hip-hop"]
  default: []
  options: ["流行音乐","古典音乐","摇滚音乐","电子音乐","爵士音乐","民谣","嘻哈","R&B","乡村音乐","其他"]
title:
  type: text
  description: 专辑标题
  label: 标题
  value: "To Pimp a Butterfly"
  default: ""
translators:
  type: array
  description: 制作人列表
  label: 制作人
  value: ["Dr. Dre", "Thundercat", "Flying Lotus"]
  default: []
updated:
  type: datetime
  description: 最后更新日期时间
  label: 更新时间
  value: "2025-12-06T01:00:00.000Z"
  default: "2025-12-06T02:00:00.000Z"
row:
  type: array
  description: List of rows
  label: Row
  value: ["icon"]
  default: []
tags:
  type: array
  description: 标签
  label: 标签
  value: ["Kendrick Lamar","嘻哈","爵士融合","社会意识"]
  default: []
playing_progress:
  type: progress
  description: 收听进度（0-100）
  label: 收听进度
  value: 100
  default: 0
subtitle:
  type: text
  description: 专辑副标题
  label: 副标题
  value: ""
  default: ""
publisher:
  type: text
  description: 唱片公司
  label: 唱片公司
  value: "Top Dawg Entertainment"
  default: ""
volume:
  type: text
  description: 卷数
  label: 卷数
  value: ""
  default: ""
series:
  type: text
  description: 丛书系列
  label: 系列
  value: ""
  default: ""
location:
  type: text
  description: 存放位置
  label: 存放位置
  value: ""
  default: ""
notes:
  type: array
  description: 收听笔记
  label: 笔记
  value: []
  default: []
quotes:
  type: array
  description: 歌词摘录
  label: 歌词
  value: []
  default: []
favorites:
  type: checkbox
  description: 是否收藏
  label: 收藏
  value: true
  default: false
icon:
  type: asset
  description: Description
  label: New Property
  value: ""
  default: ""
genre:
  type: text
  description: 音乐风格
  label: 风格
  value: "嘻哈、爵士融合、放克、灵魂乐"
  default: ""
duration:
  type: text
  description: 专辑时长
  label: 时长
  value: "78:47"
  default: ""
play_count:
  type: number
  description: 播放次数
  label: 播放次数
  value: 0
  default: 0
---

