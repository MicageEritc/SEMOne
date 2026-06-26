# SEMHub 贡献指南

## 核心理念

**维护者只需要维护 `articles/` 文件夹。**

新增、修改或删除文章，只需操作 Markdown 文件。
整个网站会自动更新，不需要修改任何 TypeScript 代码。

## 贡献方式

### 新增文章

1. 在 `articles/` 对应分区下创建 `.md` 文件
2. 填写 Front Matter（参考 `docs/WRITING_GUIDE.md`）
3. 编写正文
4. 提交 PR

### 修改文章

直接编辑对应的 `.md` 文件，更新 `updatedAt` 字段。

### 删除文章

删除对应的 `.md` 文件，或设置 `draft: true`。

## 项目结构

```
SEMHub/
├── articles/          ← **唯一需要维护的目录**
│   ├── guide/         ← 开始学习
│   ├── knowledge/     ← 知识库（各子目录对应不同分类）
│   ├── cases/         ← 案例中心
│   ├── tools/         ← 工具
│   ├── glossary/      ← 术语表
│   └── news/          ← 资讯
├── docs/              ← 写作与维护文档
├── public/images/     ← 图片资源
├── src/               ← 程序源码（一般情况下不需修改）
│   ├── app/           ← 页面路由
│   ├── components/    ← React 组件
│   ├── lib/           ← Content Engine
│   ├── types/         ← TypeScript 类型
│   └── data/          ← 栏目配置（knowledge-tree.ts）
└── ...
```

## 技术栈

- Next.js 16 + React 19
- TypeScript
- Tailwind CSS 4
- Content Engine（gray-matter + unified/remark）

## 文档索引

- [写作指南](./WRITING_GUIDE.md) — 如何新建文章
- [图片规范](./IMAGE_GUIDE.md) — 图片管理
- [风格指南](./STYLE_GUIDE.md) — 内容与格式规范
- [SEO 指南](./SEO_GUIDE.md) — 搜索优化
