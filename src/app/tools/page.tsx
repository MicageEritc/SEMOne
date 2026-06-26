/**
 * 工具箱（Tools）
 *
 * 不是文章 — 这里都是实用在线小工具
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "工具箱",
  description: "SEM 参数计算器、单位换算、能量计算等实用工具。",
};

const TOOLS = [
  { title: "放大倍率换算", desc: "多种放大倍率单位之间的快速换算。", emoji: "🔢", href: "/tools" },
  { title: "景深计算", desc: "根据加速电压和工作距离估算景深范围。", emoji: "📐", href: "/tools" },
  { title: "加速电压推荐", desc: "根据样品类型和观察目的推荐电压值。", emoji: "⚡", href: "/tools" },
  { title: "WD 推荐", desc: "根据放大倍率和样品类型推荐工作距离。", emoji: "📏", href: "/tools" },
  { title: "像素长度换算", desc: "标尺像素值与实际物理尺寸的转换。", emoji: "📊", href: "/tools" },
  { title: "尺度尺生成", desc: "为 SEM 图片自动叠加微米/纳米标尺。", emoji: "🎯", href: "/tools" },
  { title: "EDS 元素查询", desc: "EDS 能谱分析中常见元素的 X 射线能量查询。", emoji: "⚛", href: "/tools" },
  { title: "真空单位换算", desc: "Pa、Torr、mbar、atm 等真空度单位转换。", emoji: "🌀", href: "/tools" },
  { title: "常用材料数据库", desc: "常见材料的基本物理性质与 SEM 观察建议。", emoji: "🗄", href: "/tools" },
];

export default function ToolsPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <a href="/" className="hover:text-stone-600 transition-colors">首页</a>
          <span>/</span>
          <span className="text-stone-700">工具箱</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          工具箱
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-500 leading-relaxed">
          提高实验效率的实用工具集。不写文章，只做工具。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="
              group flex items-center gap-4
              p-4 border border-stone-200 rounded-xl
              hover:border-blue-200 hover:bg-blue-50/20
              transition-all duration-200
            "
          >
            <span className="text-xl flex-shrink-0">{tool.emoji}</span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-stone-800 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              <p className="mt-0.5 text-xs text-stone-400 line-clamp-1">{tool.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
