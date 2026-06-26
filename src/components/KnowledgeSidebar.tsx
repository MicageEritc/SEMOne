"use client";

/**
 * 知识库左侧导航组件
 *
 * 功能：
 * - 桌面端：固定 260px 宽度的垂直导航
 * - 移动端：折叠为顶部下拉菜单
 * - 高亮当前选中分类
 */

import { useState, useCallback } from "react";
import Link from "next/link";
import type { KnowledgeCategory } from "@/types/article";

interface KnowledgeSidebarProps {
  /** 分类列表 */
  categories: KnowledgeCategory[];
  /** 当前选中分类的 slug（undefined = 概览页） */
  currentSlug?: string;
}

export default function KnowledgeSidebar({
  categories,
  currentSlug,
}: KnowledgeSidebarProps) {
  // 移动端下拉菜单展开状态
  const [mobileOpen, setMobileOpen] = useState(false);

  /** 切换移动端菜单 */
  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  /** 选中后关闭移动端菜单 */
  const handleSelect = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // 当前高亮的分类（概览页为 null）
  const activeSlug = currentSlug || null;

  return (
    <>
      {/* ========== 移动端下拉菜单 ========== */}
      <div className="lg:hidden w-full px-5 pt-4 pb-2">
        <button
          onClick={toggleMobile}
          className="
            w-full flex items-center justify-between
            px-4 py-2.5
            bg-white border border-stone-200
            rounded-2xl
            text-sm text-stone-700
            transition-colors duration-200
            hover:border-stone-300
          "
        >
          <span>
            {activeSlug
              ? categories.find((c) => c.slug === activeSlug)?.name || "分类"
              : "知识库分类"}
          </span>
          {/* 下拉箭头图标 */}
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              mobileOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* 下拉菜单内容 */}
        {mobileOpen && (
          <nav
            className="
              mt-2
              bg-white border border-stone-200
              rounded-2xl
              overflow-hidden
              shadow-sm
            "
          >
            {/* 概览入口 */}
            <Link
              href="/knowledge"
              onClick={handleSelect}
              className={`
                block px-4 py-2.5 text-sm
                border-b border-stone-100
                transition-colors duration-150
                ${
                  activeSlug === null
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-stone-600 hover:bg-stone-50"
                }
              `}
            >
              知识库概览
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/knowledge/${cat.slug}`}
                onClick={handleSelect}
                className={`
                  block px-4 py-2.5 text-sm
                  border-b border-stone-100 last:border-b-0
                  transition-colors duration-150
                  ${
                    activeSlug === cat.slug
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-stone-600 hover:bg-stone-50"
                  }
                `}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* ========== 桌面端左侧导航 ========== */}
      <aside className="hidden lg:block w-[260px] flex-shrink-0">
        <nav
          className="
            sticky top-20
            bg-white border border-stone-200
            rounded-2xl
            overflow-hidden
          "
        >
          {/* 概览入口 */}
          <Link
            href="/knowledge"
            className={`
              block px-5 py-3 text-sm
              border-b border-stone-100
              transition-colors duration-150
              ${
                activeSlug === null
                  ? "bg-blue-50 text-blue-600 font-medium border-l-[3px] border-l-blue-500"
                  : "text-stone-600 hover:bg-stone-50 border-l-[3px] border-l-transparent"
              }
            `}
          >
            知识库概览
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/knowledge/${cat.slug}`}
              className={`
                block px-5 py-3 text-sm
                border-b border-stone-100 last:border-b-0
                transition-colors duration-150
                ${
                  activeSlug === cat.slug
                    ? "bg-blue-50 text-blue-600 font-medium border-l-[3px] border-l-blue-500"
                    : "text-stone-600 hover:bg-stone-50 border-l-[3px] border-l-transparent"
                }
              `}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
