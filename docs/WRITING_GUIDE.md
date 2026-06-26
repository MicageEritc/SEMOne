# SEMHub 写作指南

## 新增文章流程

1. 在 `articles/` 对应分区目录下创建 `.md` 文件
2. 填写 Front Matter（见下方模板）
3. 编写正文
4. `npm run build` — 网站自动更新

## Front Matter 模板

```yaml
---
title: "文章标题"
description: "文章描述，用于 SEO 和列表展示"
difficulty: "beginner"  # beginner | intermediate | advanced
tags:
  - 标签1
  - 标签2
date: "2026-06-26"
updatedAt: "2026-06-26"  # 最后更新时间（可选）
author: "SEMHub"
order: 1  # 同级目录内排序（可选）
draft: false  # true = 草稿不发布
---
```

## 无需手写的字段

以下字段由 Content Engine 自动推导，**不要**写在 frontmatter 中：

- `category` — 由文件夹路径自动推导
- `slug` — 由文件名和路径自动生成
- `published` — 改用 `draft: false`

## 文件路径与 URL 对应

```
articles/guide/welcome.md
  → /articles/guide/welcome

articles/knowledge/basics/accelerating-voltage.md
  → /articles/knowledge/basics/accelerating-voltage
```

## 正文规范

- 使用 Markdown 标准语法
- h2（`##`）和 h3（`###`）自动进入右侧 TOC 目录
- 代码块使用三个反引号包裹
- 图片使用绝对路径：`![描述](/images/xxx/xxx.webp)`
- 表格、列表、引用等标准 Markdown 均支持

## 分类放置规则

| 分区 | 目录 | 内容类型 |
|------|------|---------|
| 开始学习 | `articles/guide/` | 入门引导文章 |
| 知识库 | `articles/knowledge/{子分类}/` | 系统知识文章 |
| 案例中心 | `articles/cases/` | 应用案例 |
| 工具 | `articles/tools/` | 工具说明文档 |
| 术语表 | `articles/glossary/` | 术语解释 |
| 资讯 | `articles/news/` | 行业动态 |
