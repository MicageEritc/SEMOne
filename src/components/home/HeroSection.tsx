/**
 * 首页 Hero Section
 *
 * 平台名称、介绍语、搜索框、两个 CTA 按钮
 */

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

      {/* 搜索框（仅 UI） */}
      <div className="mt-6 sm:mt-8 w-full max-w-md px-4">
        <SearchBox />
      </div>
    </section>
  );
}
