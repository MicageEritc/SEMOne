/**
 * 文章 TOC（Table of Contents）目录导航组件
 *
 * 固定在文章右侧，显示当前页面标题层级结构
 * - 桌面端：吸附在右侧，滚动跟随
 * - 移动端：不显示（避免挤压阅读空间）
 * - 点击滚动由 JS 控制，确保静态导出（Cloudflare Pages）行为一致
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import type { TocItem } from "@/types/article";

interface ArticleTocProps {
  items: TocItem[];
}

/** sticky header 高度 + 呼吸空间 */
const SCROLL_OFFSET = 80;

export default function ArticleToc({ items }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  /** 手动滚动到目标锚点（替代浏览器默认锚点行为） */
  const scrollToHeading = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
      // 更新 URL hash（不触发跳转）
      history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    },
    []
  );

  /** 监听滚动，高亮当前可见的标题 */
  const handleScroll = useCallback(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    // 从下往上找第一个顶部位于 SCROLL_OFFSET 上方的标题
    let current = headings[0].id;
    for (let i = headings.length - 1; i >= 0; i--) {
      if (headings[i].getBoundingClientRect().top <= SCROLL_OFFSET + 8) {
        current = headings[i].id;
        break;
      }
    }
    setActiveId(current);
  }, [items]);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (items.length === 0) return null;

  return (
    <aside className="hidden xl:block w-[240px] flex-shrink-0">
      <nav className="sticky top-20">
        <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
          目录
        </h4>

        <ul className="space-y-1 border-l border-stone-200">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToHeading(e, item.id)}
                className={`
                  block text-sm leading-relaxed
                  transition-all duration-150
                  border-l-[2px] -ml-px
                  ${item.level === 2 ? "pl-3" : "pl-6"}
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
