/**
 * 全局顶部导航栏
 *
 * 固定 7 项 + 移动端抽屉菜单
 */

"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "首页",     href: "/" },
  { label: "开始学习", href: "/guide" },
  { label: "知识库",   href: "/knowledge" },
  { label: "图像案例", href: "/gallery" },
  { label: "工具箱",   href: "/tools" },
  { label: "术语表",   href: "/glossary" },
  { label: "最新资讯", href: "/news" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-50
        w-full relative
        bg-white/80 backdrop-blur-lg
        border-b border-stone-200/40
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-5 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-stone-900 hover:text-blue-600 transition-colors duration-200"
        >
          SEM One
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-sm text-stone-600 rounded-lg hover:text-stone-900 hover:bg-stone-100 transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 移动端汉堡按钮 */}
        <button
          className="md:hidden p-2 -mr-2 text-stone-600 hover:text-stone-900 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label={open ? "关闭菜单" : "打开菜单"}
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 移动端下拉菜单 — absolute 覆盖，不推动页面 */}
      <div
        className={`
          md:hidden absolute top-14 left-0 right-0 
          bg-white/95 backdrop-blur-lg border-b border-stone-200/40
          transition-all duration-200
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        <nav className="flex flex-col px-5 py-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm text-stone-600 border-b border-stone-50 last:border-b-0 hover:text-stone-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
