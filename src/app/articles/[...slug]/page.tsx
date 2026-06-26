/**
 * 文章详情页（通用）
 *
 * 路由：/articles/[...slug]
 * 支持嵌套路径，例如 /articles/knowledge/basics/accelerating-voltage
 *
 * 页面布局：
 * ┌──────────────────────────────────────────────────┐
 * │  面包屑导航                                        │
 * ├──────────────┬───────────────────┬────────────────┤
 * │              │                   │                │
 * │  (空白)      │  文章正文          │  TOC 目录      │
 * │              │  - 元信息          │  (桌面端吸附)   │
 * │              │  - 文章内容        │                │
 * │              │  - 上一篇/下一篇    │                │
 * │              │  - 相关文章        │                │
 * └──────────────┴───────────────────┴────────────────┘
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleFull, getAllArticleSlugs } from "@/lib/articles";
import ArticleBreadcrumb from "@/components/ArticleBreadcrumb";
import ArticleMetaInfo from "@/components/ArticleMetaInfo";
import ArticleToc from "@/components/ArticleToc";
import ArticleNav from "@/components/ArticleNav";
import RelatedArticles from "@/components/RelatedArticles";

// ==================== SEO ====================

/**
 * 动态生成每篇文章的 SEO 元数据
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugStr = slug.join("/");
  const article = await getArticleFull(slugStr);

  if (!article) {
    return { title: "文章未找到 | SEM One" };
  }

  const { title, description, tags } = article.meta;
  const url = `/articles/${slugStr}`;

  return {
    title,
    description,
    // Open Graph
    openGraph: {
      title,
      description,
      type: "article",
      url,
      siteName: "SEM One",
      locale: "zh_CN",
      publishedTime: article.meta.date,
      modifiedTime: article.meta.updatedAt,
      tags,
    },
    // Twitter Card
    twitter: {
      card: "summary",
      title,
      description,
    },
    // Canonical URL
    alternates: {
      canonical: url,
    },
  };
}

// ==================== 静态生成 ====================

/**
 * 预生成所有文章页面的 slug
 */
export function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.split("/"),
  }));
}

// ==================== 页面组件 ====================

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugStr = slug.join("/");

  // 加载完整文章数据
  const article = await getArticleFull(slugStr);

  if (!article) {
    notFound();
  }

  const { title, description, date, updatedAt, difficulty, tags, author } =
    article.meta;

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
      {/* ===== 面包屑导航 ===== */}
      <ArticleBreadcrumb section={article.section} slug={slugStr} title={title} />

      {/* ===== 三栏布局：空白 | 正文 | TOC ===== */}
      <div className="flex gap-0 xl:gap-8">
        {/* 左侧空白占位（平衡视觉） */}
        <div className="hidden xl:block w-[260px] flex-shrink-0" />

        {/* 中间：文章正文 */}
        <article className="flex-1 min-w-0 max-w-3xl">
          {/* 文章标题 */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-stone-900 leading-tight">
            {title}
          </h1>

          {/* 文章描述 */}
          {description && (
            <p className="mt-3 text-base sm:text-lg text-stone-500 leading-relaxed">
              {description}
            </p>
          )}

          {/* 元信息：阅读时间、日期、难度、标签 */}
          <div className="mt-5">
            <ArticleMetaInfo
              readingTime={article.readingTime}
              updatedAt={updatedAt}
              date={date}
              difficulty={difficulty}
              tags={tags}
              author={author}
            />
          </div>

          {/* 分隔线 */}
          <hr className="border-stone-100 mb-8" />

          {/* 文章正文（Markdown 渲染后的 HTML） */}
          <div
            className="
              prose
              prose-stone
              prose-lg
              max-w-none
              /* 标题样式 */
              prose-headings:text-stone-900 prose-headings:font-semibold
              prose-headings:tracking-tight
              prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              /* 段落样式 */
              prose-p:text-stone-600 prose-p:leading-relaxed
              /* 链接样式 */
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              /* 代码样式 */
              prose-code:bg-stone-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-normal
              prose-code:before:content-none prose-code:after:content-none
              /* 图片样式 */
              prose-img:rounded-xl prose-img:border prose-img:border-stone-200
              /* 引用样式 */
              prose-blockquote:border-l-blue-400 prose-blockquote:bg-blue-50/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
              /* 列表样式 */
              prose-li:text-stone-600
              /* 表格样式 */
              prose-table:border-separate prose-table:border-spacing-0 prose-table:rounded-xl prose-table:overflow-hidden prose-table:border prose-table:border-stone-200
              prose-th:bg-stone-50 prose-th:px-4 prose-th:py-2 prose-th:text-sm prose-th:font-medium prose-th:text-stone-700
              prose-td:px-4 prose-td:py-2 prose-td:text-sm prose-td:text-stone-600 prose-td:border-t prose-td:border-stone-100
            "
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* 上一篇 / 下一篇 */}
          <ArticleNav
            prev={article.prevArticle}
            next={article.nextArticle}
          />

          {/* 相关文章推荐 */}
          <RelatedArticles articles={article.relatedArticles} />
        </article>

        {/* 右侧：TOC 目录（仅桌面端显示） */}
        <ArticleToc items={article.toc} />
      </div>
    </div>
  );
}
