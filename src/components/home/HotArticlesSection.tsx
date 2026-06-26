/**
 * 首页热门文章
 *
 * 从 Content Engine 获取推荐阅读的文章
 * 当前按 order 排序，预留阅读量字段
 */

import Link from "next/link";
import { getRecentArticles } from "@/lib/articles";
import { DIFFICULTY_LABELS } from "@/types/article";

export default async function HotArticlesSection() {
  // 热门文章先取最近发布的前 6 篇（后续可改为阅读量排序）
  const articles = await getRecentArticles(6);

  return (
    <section className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          热门文章
        </h2>
        <p className="mt-2 text-sm text-stone-400">
          推荐阅读的精华内容
        </p>
      </div>

      {articles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="
                group flex flex-col
                p-4 sm:p-5
                bg-white border border-stone-200
                rounded-2xl
                hover:border-blue-200 hover:shadow-sm
                transition-all duration-200
              "
            >
              <h3 className="text-sm font-semibold text-stone-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                {article.meta.title}
              </h3>
              {article.meta.description && (
                <p className="mt-1.5 text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {article.meta.description}
                </p>
              )}
              <div className="mt-auto pt-3 flex items-center gap-2 text-xs">
                <span className="text-stone-300">{article.meta.date}</span>
                {article.meta.difficulty && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    article.meta.difficulty === "beginner" ? "bg-green-50 text-green-600"
                    : article.meta.difficulty === "intermediate" ? "bg-amber-50 text-amber-600"
                    : "bg-red-50 text-red-600"
                  }`}>
                    {DIFFICULTY_LABELS[article.meta.difficulty]}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-sm text-stone-400">暂无文章，内容即将上线。</p>
        </div>
      )}
    </section>
  );
}
