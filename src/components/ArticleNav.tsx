/**
 * 上一篇/下一篇导航组件
 *
 * 文章底部的导航，帮助读者按顺序浏览
 * - 首篇：只显示下一篇
 * - 末篇：只显示上一篇
 * - 中间：左右并排
 */

import Link from "next/link";
import type { ArticleNavItem } from "@/types/article";

interface ArticleNavProps {
  prev: ArticleNavItem | null;
  next: ArticleNavItem | null;
}

export default function ArticleNav({ prev, next }: ArticleNavProps) {
  if (!prev && !next) return null;

  const sharedClass = `
    group flex flex-col
    p-4 rounded-xl border border-stone-200
    hover:border-blue-200 hover:bg-blue-50/30
    transition-all duration-200
  `;

  return (
    <nav className="mt-10 pt-8 border-t border-stone-200" aria-label="文章导航">
      {prev && next ? (
        /* 两篇都有：左右并排 */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href={`/articles/${prev.slug}`} className={sharedClass}>
            <span className="text-xs text-stone-400 mb-1">← 上一篇</span>
            <span className="text-sm text-stone-700 group-hover:text-blue-600 transition-colors line-clamp-1">
              {prev.title}
            </span>
          </Link>
          <Link href={`/articles/${next.slug}`} className={`${sharedClass} items-end text-right`}>
            <span className="text-xs text-stone-400 mb-1">下一篇 →</span>
            <span className="text-sm text-stone-700 group-hover:text-blue-600 transition-colors line-clamp-1">
              {next.title}
            </span>
          </Link>
        </div>
      ) : prev ? (
        /* 仅有上一篇（末篇） */
        <Link href={`/articles/${prev.slug}`} className={sharedClass}>
          <span className="text-xs text-stone-400 mb-1">← 上一篇</span>
          <span className="text-sm text-stone-700 group-hover:text-blue-600 transition-colors line-clamp-1">
            {prev.title}
          </span>
        </Link>
      ) : (
        /* 仅有下一篇（首篇） */
        <Link href={`/articles/${next!.slug}`} className={`${sharedClass} items-end text-right`}>
          <span className="text-xs text-stone-400 mb-1">下一篇 →</span>
          <span className="text-sm text-stone-700 group-hover:text-blue-600 transition-colors line-clamp-1">
            {next!.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
