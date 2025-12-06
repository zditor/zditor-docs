---
created:
  type: datetime
  description: 创建日期时间
  label: 创建时间
  value: "2025-12-06T10:00:00"
  default: "2025-12-06T10:00:00"
class:
  type: text
  description: 电影分类
  label: 分类
  value: "movie"
  default: ""
language:
  type: select
  description: 电影语言
  label: 语言
  value: "英文"
  default: "英文"
  options: ["英文","中文","日文","其他","无声"]
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
  description: 电影分类
  label: 分类
  value: ["电影"]
  default: []
  options: ["电影","技术","文学","历史","哲学","科学","艺术","商业","心理学","教育","其他"]
difficulty:
  type: select
  description: 观看难度
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
  value: true
  default: false
cover:
  type: asset
  description: 海报图片
  label: 海报
  value: ""
  default: ""
watch_end_date:
  type: date
  description: 完成观看日期
  label: 完成观看
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
  description: 电影格式
  label: 格式
  value: "电影"
  default: "电影"
  options: ["电影","短片","纪录片","动画片","系列电影"]
pages:
  type: number
  description: 电影时长（分钟）
  label: 时长
  value: 148
  default: 0
authors:
  type: array
  description: 导演列表
  label: 导演
  value: ["Christopher Nolan"]
  default: []
release_date:
  type: date
  description: 上映日期
  label: 上映日期
  value: "2010-07-16"
  default: ""
print_date:
  type: date
  description: 印刷日期
  label: 印刷日期
  value: ""
  default: ""
read:
  type: checkbox
  description: 是否已看
  label: 已看
  value: true
  default: false
watching_status:
  type: select
  description: 观看状态
  label: 观看状态
  value: "已完成"
  default: "未开始"
  options: ["未开始","正在观看","已暂停","已完成","放弃"]
subject:
  type: multiselect
  description: 主题标签
  label: 主题
  value: ["科幻","悬疑","动作"]
  default: []
  options: ["科幻","悬疑","动作","喜剧","爱情","恐怖","剧情","纪录片","动画片","其他"]
title:
  type: text
  description: 电影标题
  label: 标题
  value: "盗梦空间"
  default: ""
translators:
  type: array
  description: 编剧列表
  label: 编剧
  value: ["Christopher Nolan"]
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
  value: ["科幻","悬疑","Christopher Nolan","梦境"]
  default: []
watching_progress:
  type: progress
  description: 观看进度（0-100）
  label: 观看进度
  value: 100
  default: 0
subtitle:
  type: text
  description: 电影副标题
  label: 副标题
  value: "Inception"
  default: ""
publisher:
  type: text
  description: 制片公司
  label: 制片公司
  value: "Warner Bros. Pictures"
  default: ""
volume:
  type: text
  description: 部数
  label: 部数
  value: ""
  default: ""
series:
  type: text
  description: 系列电影
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
  description: 观影笔记
  label: 笔记
  value: []
  default: []
quotes:
  type: array
  description: 经典台词
  label: 台词
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
  description: 电影类型
  label: 类型
  value: "科幻、悬疑、动作"
  default: ""
duration:
  type: text
  description: 电影时长
  label: 时长
  value: "148分钟"
  default: ""
box_office:
  type: number
  description: 票房（美元）
  label: 票房
  value: 0
  default: 0
actors:
  type: array
  description: 主要演员
  label: 主演
  value: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"]
  default: []
country:
  type: text
  description: 制片国家
  label: 制片国家
  value: "美国、英国"
  default: ""
awards:
  type: array
  description: 获奖情况
  label: 奖项
  value: []
  default: []
imdb_rating:
  type: number
  description: IMDB评分
  label: IMDB评分
  value: 0
  default: 0
douban_rating:
  type: number
  description: 豆瓣评分
  label: 豆瓣评分
  value: 0
  default: 0
---