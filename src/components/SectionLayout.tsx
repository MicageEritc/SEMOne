/**
 * 通用 Section 页面布局
 *
 * 左侧导航 + 右侧内容，带面包屑
 * 用于 /guide /gallery /tools /glossary /news
 */

import Link from "next/link";
import { getSections } from "@/data/knowledge-tree";
import { SECTION_LABELS } from "@/types/article";
import type { ArticleSection } from "@/types/article";

interface SectionLayoutProps {
  /** 当前分区 */
  section: ArticleSection;
  /** 右侧内容 */
  children: React.ReactNode;
}

export default function SectionLayout({ section, children }: SectionLayoutProps) {
  const sections = getSections();
  const label = SECTION_LABELS[section] || section;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
      {/* 面包屑 */}
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <a href="/" className="hover:text-stone-600 transition-colors">首页</a>
          <span>/</span>
          <span className="text-stone-700">{label}</span>
        </nav>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧导航 — 六大模块 */}
        <aside className="hidden lg:block w-[220px] flex-shrink-0">
          <nav className="sticky top-20 bg-white border border-stone-200 rounded-2xl overflow-hidden">
            {sections.map((s) => (
              <Link
                key={s.id}
                href={`/${s.slug}`}
                className={`
                  block px-5 py-3 text-sm border-b border-stone-100 last:border-b-0
                  transition-colors duration-150
                  ${s.id === section
                    ? "bg-blue-50 text-blue-600 font-medium border-l-[3px] border-l-blue-500"
                    : "text-stone-600 hover:bg-stone-50 border-l-[3px] border-l-transparent"
                  }
                `}
              >
                {s.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* 右侧内容 */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
