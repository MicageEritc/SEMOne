/**
 * 首页入口卡片区
 *
 * 6 个入口覆盖用户完整需求：学习 → 查阅 → 实战 → 计算 → 查词 → 资讯
 * 每个入口职责独立，互不重叠
 */

import Link from "next/link";

/** 入口卡片数据 */
const ENTRIES = [
  {
    title: "从零开始",
    desc: "按顺序学习，适合第一次接触 SEM。",
    emoji: "📖",
    href: "/knowledge",
  },
  {
    title: "知识库",
    desc: "按主题查阅，深入理解每一个知识点。",
    emoji: "📚",
    href: "/knowledge",
  },
  {
    title: "图像案例",
    desc: "通过真实样品学习 SEM 图像判读。",
    emoji: "🖼",
    href: "/knowledge",
  },
  {
    title: "工具箱",
    desc: "提高实验效率，快速完成计算与换算。",
    emoji: "🛠",
    href: "/knowledge",
  },
  {
    title: "术语表",
    desc: "快速查询专业术语与英文缩写。",
    emoji: "📑",
    href: "/knowledge",
  },
  {
    title: "最新资讯",
    desc: "关注 SEM 技术、仪器和行业动态。",
    emoji: "📰",
    href: "/knowledge",
  },
];

export default function EntrySection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      {/* 区域标题 */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          学习入口
        </h2>
        <p className="mt-2 text-sm text-stone-400">
          学习、查阅、实战、计算、查词、资讯 — 覆盖 SEM 完整需求
        </p>
      </div>

      {/* 卡片网格 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ENTRIES.map((entry) => (
          <Link
            key={entry.title}
            href={entry.href}
            className="
              group flex flex-col
              p-5 sm:p-6
              bg-white border border-stone-200
              rounded-2xl
              hover:border-blue-200 hover:shadow-sm
              transition-all duration-200
            "
          >
            {/* emoji 图标 */}
            <span className="text-2xl mb-3">{entry.emoji}</span>

            {/* 标题 */}
            <h3 className="text-sm font-semibold text-stone-800 group-hover:text-blue-600 transition-colors">
              {entry.title}
            </h3>

            {/* 一句话定位 */}
            <p className="mt-1 text-xs text-stone-400 leading-relaxed">
              {entry.desc}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
