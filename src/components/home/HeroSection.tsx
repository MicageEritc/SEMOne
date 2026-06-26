/**
 * 首页 Hero Section
 *
 * 平台名称、介绍语、搜索框、两个 CTA 按钮
 */

import Link from "next/link";
import SearchBox from "@/components/SearchBox";

export default function HeroSection() {
  return (
    <section className="w-full flex flex-col items-center pt-16 sm:pt-24 pb-10 sm:pb-14 px-5">
      {/* 平台名称 */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 text-center">
        SEM One
      </h1>

      {/* 副标题 — 英文 */}
      <p className="mt-3 text-base sm:text-lg text-stone-500 tracking-wide">
        Explore Beyond the Surface.
      </p>

      {/* 副标题 — 中文 */}
      <p className="mt-1 text-sm sm:text-base text-stone-400">
        探索微观，洞见本质
      </p>

      {/* 一句介绍 */}
      <p className="mt-6 text-sm text-stone-500 max-w-lg text-center leading-relaxed">
        系统学习扫描电子显微镜，从入门到科研实践。
      </p>

      {/* 搜索框（仅 UI） */}
      <div className="mt-8 sm:mt-10 w-full max-w-md px-4">
        <SearchBox />
      </div>

      {/* 两个 CTA 按钮 */}
      <div className="mt-8 flex items-center gap-4">
        <Link
          href="/guide"
          className="
            inline-flex items-center gap-2
            px-5 py-2.5
            bg-stone-900 text-white text-sm font-medium
            rounded-xl
            hover:bg-stone-800
            transition-colors duration-200
          "
        >
          开始学习
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        <Link
          href="/knowledge"
          className="
            inline-flex items-center gap-2
            px-5 py-2.5
            bg-white text-stone-700 text-sm font-medium
            border border-stone-200
            rounded-xl
            hover:border-stone-300 hover:bg-stone-50
            transition-colors duration-200
          "
        >
          进入知识库
        </Link>
      </div>
    </section>
  );
}
