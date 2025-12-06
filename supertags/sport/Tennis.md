---
created:
  type: datetime
  description: 创建日期时间
  label: 创建时间
  value: "2025-12-06T10:00:00"
  default: "2025-12-06T10:00:00"
class:
  type: text
  description: 运动分类
  label: 分类
  value: "sport"
  default: ""
language:
  type: select
  description: 语言
  label: 语言
  value: "中文"
  default: "中文"
  options: ["中文","英文","日文","其他"]
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
  value: 4
  default: 0
display:
  type: checkbox
  description: display
  label: 显示属性
  value: true
  default: false
category:
  type: multiselect
  description: 运动分类
  label: 分类
  value: ["运动"]
  default: []
  options: ["运动","技术","文学","历史","哲学","科学","艺术","商业","心理学","教育","其他"]
difficulty:
  type: select
  description: 运动难度
  label: 难度
  value: "中级"
  default: "初级"
  options: ["初级","中级","高级","专业"]
recommendation:
  type: select
  description: 推荐程度
  label: 推荐度
  value: "推荐"
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
  description: 运动图片
  label: 图片
  value: ""
  default: ""
participation_end_date:
  type: date
  description: 完成参与日期
  label: 完成参与
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
  description: 运动形式
  label: 形式
  value: "个人运动"
  default: "个人运动"
  options: ["个人运动","团队运动","水上运动","冰雪运动","极限运动","传统运动"]
pages:
  type: number
  description: 参与人数
  label: 人数
  value: 2
  default: 1
authors:
  type: array
  description: 发明者/推广者
  label: 发明者
  value: ["英国","法国"]
  default: []
release_date:
  type: date
  description: 创立日期
  label: 创立日期
  value: "1873-02-23"
  default: ""
print_date:
  type: date
  description: 印刷日期
  label: 印刷日期
  value: ""
  default: ""
read:
  type: checkbox
  description: 是否已参与
  label: 已参与
  value: false
  default: false
participation_status:
  type: select
  description: 参与状态
  label: 参与状态
  value: "未开始"
  default: "未开始"
  options: ["未开始","偶尔参与","定期参与","专业训练","已停止"]
subject:
  type: multiselect
  description: 主题标签
  label: 主题
  value: ["球类运动","技巧性","贵族运动"]
  default: []
  options: ["球类运动","田径运动","水上运动","冰雪运动","武术运动","健身运动","户外运动","极限运动","传统体育","其他"]
title:
  type: text
  description: 运动名称
  label: 标题
  value: "网球"
  default: ""
translators:
  type: array
  description: 相关规则制定者
  label: 规则制定
  value: ["ITF", "ATP", "WTA"]
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
  value: ["网球","网球拍","发球","接球"]
  default: []
participation_progress:
  type: progress
  description: 参与度（0-100）
  label: 参与度
  value: 0
  default: 0
subtitle:
  type: text
  description: 运动副标题
  label: 副标题
  value: "Tennis"
  default: ""
publisher:
  type: text
  description: 相关组织
  label: 组织
  value: "ITF, ATP, WTA, 各国网球协会"
  default: ""
volume:
  type: text
  description: 卷数
  label: 卷数
  value: ""
  default: ""
series:
  type: text
  description: 系列运动
  label: 系列
  value: "球类运动"
  default: ""
location:
  type: text
  description: 常见场地
  label: 场地
  value: "网球场"
  default: ""
notes:
  type: array
  description: 运动笔记
  label: 笔记
  value: []
  default: []
quotes:
  type: array
  description: 名言摘录
  label: 名言
  value: []
  default: []
favorites:
  type: checkbox
  description: 是否收藏
  label: 收藏
  value: false
  default: false
icon:
  type: asset
  description: Description
  label: New Property
  value: ""
  default: ""
genre:
  type: text
  description: 运动类型
  label: 类型
  value: "个人球类运动"
  default: ""
duration:
  type: text
  description: 单场时长
  label: 时长
  value: "60-180分钟"
  default: ""
equipment_cost:
  type: number
  description: 装备费用（元）
  label: 装备费用
  value: 800
  default: 0
rules_complexity:
  type: select
  description: 规则复杂度
  label: 规则复杂度
  value: "复杂"
  default: "简单"
  options: ["简单","中等","复杂","非常复杂"]
intensity_level:
  type: select
  description: 运动强度
  label: 强度
  value: "高强度"
  default: "中等强度"
  options: ["低强度","中等强度","高强度","极高强度"]
fitness_benefits:
  type: multiselect
  description: 健身益处
  label: 健身益处
  value: ["心肺功能","反应速度","协调性","爆发力"]
  default: []
  options: ["心肺功能","力量训练","柔韧性","协调性","反应速度","耐力","团队协作","其他"]
age_group:
  type: multiselect
  description: 适合年龄
  label: 适合年龄
  value: ["青少年","青年","中年"]
  default: []
  options: ["儿童","青少年","青年","中年","老年","全年龄"]
competition_level:
  type: multiselect
  description: 竞技水平
  label: 竞技水平
  value: ["娱乐","业余","专业","国际赛事"]
  default: []
  options: ["娱乐","业余","半专业","专业","国际赛事"]
---