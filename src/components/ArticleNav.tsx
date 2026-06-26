/**
 * 上一篇/下一篇导航组件
 *
 * 文章底部的上下文切换，帮助读者在文章中顺畅浏览
 */

import Link from "next/link";
import type { ArticleNavItem } from "@/types/article";

interface ArticleNavProps {
  /** 上一篇文章 */
  prev: ArticleNavItem | null;
  /** 下一篇文章 */
  next: ArticleNavItem | null;
}

export default function ArticleNav({ prev, next }: ArticleNavProps) {
  if (!prev && !next) return null;

  return (
    <nav
      className="mt-10 pt-8 border-t border-stone-200"
      aria-label="文章导航"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 上一篇 */}
        {prev ? (
          <Link
            href={`/articles/${prev.slug}`}
            className="
              group flex flex-col
              p-4 rounded-xl border border-stone-200
              hover:border-blue-200 hover:bg-blue-50/30
              transition-all duration-200
            "
          >
            <span className="text-xs text-stone-400 mb-1">← 上一篇</span>
            <span className="text-sm text-stone-700 group-hover:text-blue-600 transition-colors line-clamp-1">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {/* 下一篇 */}
        {next ? (
          <Link
            href={`/articles/${next.slug}`}
            className="
              group flex flex-col items-end text-right
              p-4 rounded-xl border border-stone-200
              hover:border-blue-200 hover:bg-blue-50/30
              transition-all duration-200
            "
          >
            <span className="text-xs text-stone-400 mb-1">下一篇 →</span>
            <span className="text-sm text-stone-700 group-hover:text-blue-600 transition-colors line-clamp-1">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </nav>
  );
}
