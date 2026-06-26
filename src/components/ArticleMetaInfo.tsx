/**
 * 文章元信息组件
 *
 * 显示：
 * - 阅读时间
 * - 更新时间
 * - 难度标签
 * - 文章标签
 */

import { DIFFICULTY_LABELS } from "@/types/article";
import type { ArticleDifficulty } from "@/types/article";

interface ArticleMetaInfoProps {
  /** 阅读时间（分钟） */
  readingTime: number;
  /** 最后更新时间 */
  updatedAt?: string;
  /** 发布日期 */
  date: string;
  /** 难度等级 */
  difficulty?: ArticleDifficulty;
  /** 文章标签 */
  tags?: string[];
  /** 作者 */
  author?: string;
}

export default function ArticleMetaInfo({
  readingTime,
  updatedAt,
  date,
  difficulty,
  tags,
  author,
}: ArticleMetaInfoProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm text-stone-400 mb-6">
      {/* 发布时间或更新时间 */}
      {updatedAt ? (
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          更新于 {updatedAt}
        </span>
      ) : (
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </span>
      )}

      {/* 分隔 */}
      <span className="text-stone-200 select-none">·</span>

      {/* 阅读时间 */}
      <span className="flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        约 {readingTime} 分钟
      </span>

      {/* 难度 */}
      {difficulty && (
        <>
          <span className="text-stone-200 select-none">·</span>
          <span
            className={`
              inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium
              ${
                difficulty === "beginner"
                  ? "bg-green-50 text-green-700"
                  : difficulty === "intermediate"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-red-50 text-red-700"
              }
            `}
          >
            {DIFFICULTY_LABELS[difficulty]}
          </span>
        </>
      )}

      {/* 标签 */}
      {tags && tags.length > 0 && (
        <>
          <span className="text-stone-200 select-none">·</span>
          <div className="flex items-center gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex px-2 py-0.5 rounded-md text-xs bg-stone-100 text-stone-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
