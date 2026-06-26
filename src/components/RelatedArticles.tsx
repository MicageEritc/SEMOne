/**
 * 相关文章推荐组件
 *
 * 显示同分类下的其他文章，帮助读者进一步探索
 */

import Link from "next/link";
import type { ArticleNavItem } from "@/types/article";

interface RelatedArticlesProps {
  /** 相关文章列表 */
  articles: ArticleNavItem[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t border-stone-200" aria-label="相关文章">
      <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-wider mb-4">
        相关阅读
      </h3>
      <div className="grid gap-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="
              flex items-center gap-3
              px-4 py-3
              rounded-xl
              border border-stone-100
              hover:border-blue-200 hover:bg-blue-50/30
              transition-all duration-200
            "
          >
            {/* 文章图标 */}
            <svg
              className="w-4 h-4 text-stone-300 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-sm text-stone-600 hover:text-blue-600 transition-colors">
              {article.title}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
