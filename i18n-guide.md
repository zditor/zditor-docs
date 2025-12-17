# Mintlify 国际化实现指南

本指南说明如何为 Mintlify 文档网站添加多语言支持。

## 项目结构

```
zditor-docs/
├── docs.json              # 主配置文件（语言选择页）
├── index.mdx              # 语言选择页面
├── en/                    # 英文文档
│   ├── docs.json          # 英文配置
│   ├── index.mdx
│   ├── quickstart.mdx
│   ├── ai-tools/
│   ├── api-reference/
│   └── ...
├── zh/                    # 中文文档
│   ├── docs.json          # 中文配置
│   ├── index.mdx
│   ├── quickstart.mdx
│   ├── ai-tools/
│   ├── api-reference/
│   └── ...
└── common/                # 共享资源
    ├── logo/
    ├── favicon.svg
    └── images/
```

## 实现方案

### 1. 语言选择页面

根目录的 `docs.json` 和 `index.mdx` 作为语言选择入口：

```json
{
  "navigation": {
    "tabs": [
      {
        "tab": "选择语言 / Choose Language",
        "groups": [
          {
            "group": "文档语言",
            "pages": ["index"]
          }
        ]
      }
    ]
  }
}
```

### 2. 独立的语言文档

每个语言目录都有独立的 `docs.json` 配置：

#### 英文配置 (en/docs.json)
```json
{
  "name": "Zditor Documentation",
  "navigation": {
    // 英文导航结构
  },
  "navbar": {
    "links": [
      {
        "label": "中文",
        "href": "/zh"
      }
    ]
  }
}
```

#### 中文配置 (zh/docs.json)
```json
{
  "name": "Zditor 文档",
  "navigation": {
    // 中文导航结构
  },
  "navbar": {
    "links": [
      {
        "label": "English",
        "href": "/en"
      }
    ]
  }
}
```

## 部署配置

### Mintlify 部署

1. **主站点部署**：
   ```bash
   # 根目录部署到主域名
   mintlify deploy
   ```

2. **子站点部署**：
   ```bash
   # 英文文档部署
   cd en && mintlify deploy --subdomain en

   # 中文文档部署
   cd zh && mintlify deploy --subdomain zh
   ```

3. **或者使用目录结构**：
   如果 Mintlify 支持子目录部署，可以直接部署整个项目，通过路径访问：
   - 主站点：`https://docs.yourdomain.com/`
   - 英文：`https://docs.yourdomain.com/en/`
   - 中文：`https://docs.yourdomain.com/zh/`

## 添加新语言

1. **创建新语言目录**：
   ```bash
   mkdir ja
   cp -r en/* ja/
   ```

2. **创建语言配置**：
   ```bash
   # 创建 ja/docs.json
   cp en/docs.json ja/docs.json
   # 修改配置为日语
   ```

3. **翻译内容**：
   - 翻译所有 MDX 文件
   - 更新导航标签
   - 修改界面文本

4. **更新语言选择页**：
   在 `index.mdx` 中添加新语言选项：

   ```mdx
   <Card
     title="日本語ドキュメント"
     description="日本語でZditorのドキュメントを閲覧"
     icon="globe"
     href="/ja"
   >
   ```

## 维护建议

1. **内容一致性**：确保所有语言版本的文档结构保持一致
2. **版本同步**：更新功能时同步更新所有语言版本
3. **导航链接**：在每个语言版本中提供返回语言选择页的链接
4. **SEO优化**：为每个语言版本设置适当的语言标签和元数据

## URL 访问方式

- 语言选择页：`https://docs.yourdomain.com/`
- 英文文档：`https://docs.yourdomain.com/en/`
- 中文文档：`https://docs.yourdomain.com/zh/`
- 日语文档：`https://docs.yourdomain.com/ja/`

## 注意事项

1. **Mintlify 限制**：Mintlify 不直接支持多语言，需要使用子目录或子域名
2. **部署配置**：需要为每个语言版本单独配置部署
3. **导航一致性**：确保语言间的导航可以相互切换
4. **内容管理**：建立翻译工作流程保持内容同步