/**
 * 文章 TOC（Table of Contents）目录导航组件
 *
 * 固定在文章右侧，显示当前页面标题层级结构
 * - 桌面端：吸附在右侧，滚动跟随
 * - 移动端：不显示（避免挤压阅读空间）
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import type { TocItem } from "@/types/article";

interface ArticleTocProps {
  /** TOC 条目列表 */
  items: TocItem[];
}

export default function ArticleToc({ items }: ArticleTocProps) {
  // 当前激活的标题 ID
  const [activeId, setActiveId] = useState<string>("");

  /** 监听滚动，高亮当前可见的标题 */
  const handleScroll = useCallback(() => {
    // 获取页面中所有带 id 的标题元素
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    // 找到第一个仍在视口上方或内的标题
    let current = headings[0].id;
    for (const heading of headings) {
      const rect = heading.getBoundingClientRect();
      // 标题顶部偏离视口顶部 100px 内视为"当前"
      if (rect.top <= 120) {
        current = heading.id;
      }
    }
    setActiveId(current);
  }, [items]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 无标题时不渲染
  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block w-[240px] flex-shrink-0">
      <nav className="sticky top-20">
        {/* TOC 标题 */}
        <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
          目录
        </h4>

        {/* 目录条目 */}
        <ul className="space-y-1 border-l border-stone-200">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`
                  block text-sm leading-relaxed
                  transition-all duration-150
                  border-l-[2px] -ml-px
                  ${
                    item.level === 2 ? "pl-3" : "pl-6"
                  }
                  ${
                    activeId === item.id
                      ? "border-blue-500 text-blue-600 font-medium"
                      : "border-transparent text-stone-500 hover:text-stone-700 hover:border-stone-300"
                  }
                `}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
