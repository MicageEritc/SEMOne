# SEMHub 图片使用规范

## 图片存放位置

所有图片统一在 `public/images/` 下按分区组织：

```
public/images/
├── guide/       # 入门引导相关图片
├── knowledge/   # 知识库文章配图
├── glossary/    # 术语表配图
├── news/        # 资讯配图
└── brands/      # 品牌厂商配图
```

## 图片格式

- 优先使用 **WebP** 格式（体积小，质量高）
- 兼容格式：PNG、JPEG
- 推荐尺寸：宽度不超过 1200px
- 文件命名：小写英文，连字符分隔，如 `electron-gun-diagram.webp`

## 在 Markdown 中引用图片

```md
![电子枪结构示意图](/images/knowledge/instrument/electron-gun.webp)
```

使用根路径 `/images/...` 开头，不要使用相对路径。

## 禁止

- ❌ 图片不要散落在 `public/` 根目录
- ❌ 不要使用中文文件名
- ❌ 不要使用超大原图（超过 2MB 请先压缩）
