/**
 * 全局顶部导航栏
 *
 * 固定 7 项：首页 + 6 大模块
 * Apple 风格：半透明毛玻璃效果背景，极简文字链接
 */

import Link from "next/link";

/** 导航链接 — 最终版固定 7 项，不再增减 */
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
  return (
    <header
      className="
        sticky top-0 z-50
        w-full
        bg-white/80 backdrop-blur-lg
        border-b border-stone-200/40
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-5 sm:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="
            text-lg font-bold tracking-tight
            text-stone-900
            hover:text-blue-600 transition-colors duration-200
          "
        >
          SEM One
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden md:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                px-3 py-1.5
                text-sm text-stone-600
                rounded-lg
                hover:text-stone-900
                hover:bg-stone-100
                transition-colors duration-200
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 移动端菜单占位 */}
        <div className="md:hidden">
          <button
            className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
            aria-label="打开菜单"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
