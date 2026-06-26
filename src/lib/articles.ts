/**
 * SEM One Content Engine（内容引擎）
 *
 * 自动递归扫描 articles/ 下所有 Markdown 文件。
 * 一切文章数据均由程序自动生成，无需手动维护数据文件。
 *
 * 自动生成：
 * - Article Index（文章索引）
 * - 分类列表
 * - 最近更新
 * - 阅读时间
 * - TOC
 * - 上一篇/下一篇
 * - 同分类相关文章
 * - SEO Metadata
 */

import { cache } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import { visit } from "unist-util-visit";
import type {
  Article,
  ArticleMeta,
  ArticleFull,
  ArticleNavItem,
  ArticleSection,
  TocItem,
  KnowledgeCategory,
} from "@/types/article";
import { getSectionChildren } from "@/data/knowledge-tree";

// ==================== 常量 ====================

const ARTICLES_DIR = path.join(process.cwd(), "articles");

/** 有效分区名 */
const VALID_SECTIONS = new Set(["guide", "knowledge", "gallery", "tools", "glossary", "news"]);

// ==================== 内部缓存 ====================

/** 已解析的文章缓存（slug → Article） */
let _articleCache: Map<string, Article> | null = null;

/** 已发布的 slug 列表（按日期+order 排序） */
let _publishedSlugs: string[] | null = null;

/** 清除缓存（开发时热更新用） */
function clearCache() {
  _articleCache = null;
  _publishedSlugs = null;
}

// ==================== 文件扫描 ====================

/**
 * 递归扫描 articles/ 目录，返回所有 .md 文件路径信息
 */
function scanArticlesDir(): { slug: string; filePath: string; section: string; category: string }[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const results: { slug: string; filePath: string; section: string; category: string }[] = [];

  // 读取 articles/ 下的一级目录（即分区）
  const sectionDirs = fs.readdirSync(ARTICLES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory());

  for (const sectionDir of sectionDirs) {
    const section = sectionDir.name;
    if (!VALID_SECTIONS.has(section)) continue;

    const sectionPath = path.join(ARTICLES_DIR, section);

    // 递归扫描分区下的所有 .md 文件
    function walk(dir: string, relativePath: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath, relativePath ? `${relativePath}/${entry.name}` : entry.name);
        } else if (entry.name.endsWith(".md") && entry.name !== "README.md") {
          const slugBase = entry.name.replace(/\.md$/, "");
          const slug = relativePath
            ? `${section}/${relativePath}/${slugBase}`
            : `${section}/${slugBase}`;
          // 分类 = 直接父目录名（不含分区前缀）
          const category = relativePath || section;
          results.push({
            slug,
            filePath: fullPath,
            section,
            category,
          });
        }
      }
    }

    walk(sectionPath, "");
  }

  return results;
}

// ==================== Markdown 处理 ====================

/** 将标题文本转为安全的 anchor ID */
function slugifyHeading(text: string): string {
  return text.trim().toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\u4e00-\u9fff-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** 估算阅读时间（中文 300 字/分钟） */
function estimateReadingTime(text: string): number {
  const chinese = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const english = (text.match(/[a-zA-Z]+/g) || []).length;
  return Math.max(1, Math.round((chinese + english * 2) / 300));
}

/** 预处理脚注：[^n] → <sup> + [^n]: ... → 脚注区块 */
function preprocessFootnotes(md: string): string {
  const footnotes: { id: string; text: string }[] = [];
  let result = md;

  // 1. 收集 [^n]: text 定义
  result = result.replace(/^\[(\^[^\]]+)\]:\s*(.+)$/gm, (_m, id: string, text: string) => {
    footnotes.push({ id, text: text.trim() });
    return ""; // 从正文中移除
  });

  // 2. 将 [^n] 替换为 HTML sup 标签
  result = result.replace(/\[(\^[^\]]+)\]/g, (_m, id: string) => {
    const idx = footnotes.findIndex((f) => f.id === id);
    const n = idx >= 0 ? idx + 1 : id.replace("^", "");
    return `<sup id="fnref:${n}"><a href="#fn:${n}">${n}</a></sup>`;
  });

  // 3. 在末尾追加脚注区块
  if (footnotes.length > 0) {
    const items = footnotes
      .map((f, i) => {
        const n = i + 1;
        return `<li id="fn:${n}">${f.text} <a href="#fnref:${n}" aria-label="返回正文">↩</a></li>`;
      })
      .join("\n");
    result += `\n<div class="footnotes"><ol>${items}</ol></div>`;
  }

  return result;
}

/** Markdown → HTML（含标题 ID + 脚注） */
async function mdToHtml(md: string): Promise<string> {
  const processed = preprocessFootnotes(md);
  const result = await unified()
    .use(remarkParse)
    .use(() => (tree: any) => {
      visit(tree, "heading", (node: any) => {
        const text = node.children
          .filter((c: any) => c.type === "text" || c.type === "inlineCode")
          .map((c: any) => c.value).join("");
        if (!node.data) node.data = {};
        if (!node.data.hProperties) node.data.hProperties = {};
        node.data.hProperties.id = slugifyHeading(text);
      });
    })
    .use(remarkHtml, { sanitize: false })
    .process(processed);
  return result.toString();
}

/** 提取 TOC */
function extractToc(md: string): TocItem[] {
  const re = /^(#{1,4})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    const level = m[1].length;
    if (level < 2 || level > 3) continue;
    const text = m[2].trim().replace(/`/g, "");
    items.push({ id: slugifyHeading(text), text, level });
  }
  return items;
}

// ==================== 文章加载 ====================

/** 根据 slug 加载单篇文章 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // 保证缓存中的 slug 列表是最新的（用于 navigate 等）
  ensureCache();

  // slug 可能来自 URL params，中文可能仍处于编码状态，安全解码
  const decodedSlug = (() => { try { return decodeURIComponent(slug); } catch { return slug; } })();
  const filePath = path.join(ARTICLES_DIR, `${decodedSlug}.md`);
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`[getArticleBySlug] file not found: ${filePath}`);
      return null;
    }
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, content: mdBody } = matter(raw);
    const html = await mdToHtml(mdBody);

    // 用 slug 的第一段作为 section
    const slugParts = slug.split("/");
    const section = slugParts[0] as ArticleSection;
    const category = slugParts.length >= 2 ? slugParts[slugParts.length - 2] : section;

    const article: Article = {
      slug,
      meta: data as ArticleMeta,
      content: html,
      rawContent: mdBody,
      category,
      section,
    };

    return article;
  } catch {
    return null;
  }
}

/** 获取完整文章（含 TOC + 导航）
 *
 * 使用 React cache() 确保同一请求内 generateMetadata 和 ArticlePage
 * 两次调用返回同一份数据，避免 Next.js 16 竞态导致的 404。
 */
export const getArticleFull = cache(async (slug: string): Promise<ArticleFull | null> => {
  const article = await getArticleBySlug(slug);
  if (!article?.rawContent) return null;

  const published = getPublishedSlugs();
  // 上下篇仅限同分区（guide 文章不跳转到 knowledge）
  const sameSection = published.filter((s) => s.startsWith(article.section + "/"));

  return {
    ...article,
    toc: extractToc(article.rawContent),
    readingTime: article.meta.readingTime ?? estimateReadingTime(article.rawContent),
    prevArticle: getPrevArticle(slug, sameSection),
    nextArticle: getNextArticle(slug, sameSection),
    relatedArticles: getRelatedArticles(slug, published),
  };
});

// ==================== 全局文章列表 ====================

/** 初始化缓存 */
function ensureCache() {
  if (_articleCache && _publishedSlugs) return;

  const files = scanArticlesDir();
  _articleCache = new Map();

  const published: { slug: string; date: string; order: number }[] = [];

  for (const { slug, filePath, section, category } of files) {
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(raw);
      const meta = data as ArticleMeta;

      // 跳过草稿
      if (meta.draft) continue;

      // order 值：优先 frontmatter，其次从文件名提取（01xxx → 1），最后放末尾
      const slugNum = parseInt(
        slug.split("/").pop()?.match(/^(\d+)/)?.[1] || "0",
        10
      );
      const order = meta.order ?? (slugNum > 0 ? slugNum : 99999);

      _articleCache.set(slug, { slug, meta, content: "", category, section } as Article);
      published.push({
        slug,
        date: meta.date || "1970-01-01",
        order,
      });
    } catch {
      // 解析失败，跳过
    }
  }

  // 排序：同分类内按 order 升序，不同分类按日期降序
  _publishedSlugs = published
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      return b.date.localeCompare(a.date);
    })
    .map((p) => p.slug);
}

/** 获取所有已发布文章 slug */
export function getPublishedSlugs(): string[] {
  ensureCache();
  return _publishedSlugs || [];
}

/** 获取所有已发布文章 */
export async function getAllArticles(): Promise<Article[]> {
  ensureCache();
  const slugs = getPublishedSlugs();
  const articles: Article[] = [];
  for (const slug of slugs) {
    const article = await getArticleBySlug(slug);
    if (article) articles.push(article);
  }
  return articles;
}

/** 获取最近 N 篇 */
export async function getRecentArticles(n: number = 6): Promise<Article[]> {
  const all = await getAllArticles();
  return all
    .sort((a, b) => (b.meta.date || "").localeCompare(a.meta.date || ""))
    .slice(0, n);
}

/** 获取所有文章 slug（generateStaticParams 用）
 *
 * 直接扫描 filesystem，不使用模块缓存。
 * 这样 dev 模式下文件增删会自动生效，build 时也不依赖缓存顺序。
 */
export function getAllArticleSlugs(): string[] {
  clearCache();
  return getPublishedSlugs();
}

// ==================== 分类筛选 ====================

/** 获取知识库所有子分类（含文章数，从目录自动统计） */
export function getKnowledgeCategories(): KnowledgeCategory[] {
  const treeNodes = getSectionChildren("knowledge");
  const knowledgeDir = path.join(ARTICLES_DIR, "knowledge");

  return treeNodes.map((node) => {
    const subDir = path.join(knowledgeDir, node.id);
    let articleCount = 0;
    let description = node.description;

    // 尝试读取 README 描述
    try {
      const readmePath = path.join(subDir, "README.md");
      const content = fs.readFileSync(readmePath, "utf8");
      const lines = content.split("\n");
      for (const line of lines) {
        const t = line.trim();
        if (t && !t.startsWith("#") && !t.startsWith("---")) {
          description = t;
          break;
        }
      }
    } catch {}

    // 统计 .md 文件数（不含 README）
    if (fs.existsSync(subDir)) {
      articleCount = fs.readdirSync(subDir)
        .filter((f) => f.endsWith(".md") && f !== "README.md")
        .length;
    }

    return {
      slug: node.id,
      name: node.title,
      description,
      articleCount,
      difficulty: undefined,
    };
  });
}

/** 获取知识库某子分类下的文章 */
export async function getArticlesByKnowledgeCategory(
  subCategory: string
): Promise<Article[]> {
  const all = await getAllArticles();
  const prefix = `knowledge/${subCategory}/`;
  return all
    .filter((a) => a.slug.startsWith(prefix))
    .sort((a, b) => (a.meta.order ?? 999) - (b.meta.order ?? 999));
}

// ==================== 导航 ====================

/** 上一篇 */
function getPrevArticle(slug: string, sorted: string[]): ArticleNavItem | null {
  const idx = sorted.indexOf(slug);
  if (idx <= 0) return null;
  return makeNavItem(sorted[idx - 1]);
}

/** 下一篇 */
function getNextArticle(slug: string, sorted: string[]): ArticleNavItem | null {
  const idx = sorted.indexOf(slug);
  if (idx === -1 || idx >= sorted.length - 1) return null;
  return makeNavItem(sorted[idx + 1]);
}

/** 同分类相关文章（排除自身，最多 4 篇） */
function getRelatedArticles(slug: string, sorted: string[]): ArticleNavItem[] {
  const slugParts = slug.split("/");
  const prefix = slugParts.slice(0, -1).join("/"); // 同目录前缀
  return sorted
    .filter((s) => s !== slug && s.startsWith(prefix))
    .slice(0, 4)
    .map(makeNavItem);
}

/** 从 slug 创建导航条目 */
function makeNavItem(slug: string): ArticleNavItem {
  try {
    const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
    const raw = fs.readFileSync(filePath, "utf8");
    const { data } = matter(raw);
    return { slug, title: (data as ArticleMeta).title || slug };
  } catch {
    return { slug, title: slug };
  }
}

// ==================== 统计 ====================

/** 获取文章总数 */
export function getArticleCount(): number {
  return getPublishedSlugs().length;
}

/** 获取分类数量 */
export function getCategoryCount(): number {
  return getKnowledgeCategories().filter((c) => c.articleCount > 0).length;
}
