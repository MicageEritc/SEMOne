# SEMHub SEO 指南

## 自动 SEO

SEMHub 的 SEO 元数据由 Content Engine 自动生成，无需手动配置。

每篇文章自动生成：

- `<title>` — 文章标题 | SEMHub
- `<meta name="description">` — 文章描述
- Open Graph（og:title, og:description, og:type, og:url）
- Twitter Card（twitter:card, twitter:title, twitter:description）
- Canonical URL

## 文章级别的 SEO 优化

在 Front Matter 中写好几样东西即可：

1. **title** — 清晰、包含核心关键词（如 "SEM 加速电压"）
2. **description** — 150 字以内的概述，包含 1-2 个关键词
3. **tags** — 精确的标签，用于语义关联

## 全局 SEO

全局设置位于 `src/app/layout.tsx`：

- `colorScheme: light`
- `lang="zh-CN"`
- 全局 Open Graph 默认值

## 内容 SEO 建议

- h1 使用文章标题（自动）
- h2/h3 包含长尾关键词
- 图片使用描述性 alt 文本
- 文章间通过标签和分类形成内部链接网络

## Sitemap 与 RSS（预留）

未来将通过 Content Engine 自动生成：
- `sitemap.xml`
- `rss.xml`
