/**
 * 首页知识库分类预览
 *
 * 从 Content Engine 获取所有分类及文章统计
 */

import Link from "next/link";
import { getKnowledgeCategories } from "@/lib/articles";
import { DIFFICULTY_LABELS } from "@/types/article";

const DIFFICULTY_STYLES: Record<string, string> = {
  beginner: "bg-green-50 text-green-600",
  intermediate: "bg-amber-50 text-amber-600",
  advanced: "bg-red-50 text-red-600",
};

export default function KnowledgePreviewSection() {
  const categories = getKnowledgeCategories();

  return (
    <section className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          知识库
        </h2>
        <p className="mt-2 text-sm text-stone-400">
          系统学习 SEM，从基础到高级
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/knowledge/${cat.slug}`}
            className="
              group flex items-center gap-4
              p-4 sm:p-5
              bg-white border border-stone-200
              rounded-2xl
              hover:border-blue-200 hover:shadow-sm
              transition-all duration-200
            "
          >
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-stone-800 group-hover:text-blue-600 transition-colors">
                {cat.name}
              </h3>
              <p className="mt-0.5 text-xs text-stone-400 line-clamp-2">
                {cat.description}
              </p>
              <div className="mt-1.5">
                <span className="text-xs text-stone-300">
                  {cat.articleCount > 0
                    ? `${cat.articleCount} 篇文章`
                    : "即将上线"}
                </span>
              </div>
            </div>
            <svg
              className="w-4 h-4 text-stone-300 group-hover:text-blue-400 transition-colors flex-shrink-0"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/knowledge"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-500 transition-colors"
        >
          查看全部知识库分类
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
