/**
 * 图像案例（Image Gallery）
 *
 * 不是知识，而是实战 — 通过真实 SEM 图像学习判读
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "图像案例",
  description: "通过真实 SEM 图像学习判读技巧、参数解读与失效分析。",
};

const CASES = [
  { title: "金属断口分析", desc: "典型的延性断口与脆性断口 SEM 图像判读。", href: "/gallery" },
  { title: "电池材料", desc: "锂电正负极材料的微观形貌与颗粒分布。", href: "/gallery" },
  { title: "粉末颗粒", desc: "粉末样品的粒径、形貌与分散性分析。", href: "/gallery" },
  { title: "陶瓷", desc: "陶瓷材料的晶粒大小、气孔与断裂面特征。", href: "/gallery" },
  { title: "半导体", desc: "芯片结构、蚀刻剖面与缺陷分析。", href: "/gallery" },
  { title: "生物样品", desc: "生物组织的固定、脱水与 SEM 成像技巧。", href: "/gallery" },
  { title: "涂层", desc: "涂层厚度测量、界面结合情况与缺陷检测。", href: "/gallery" },
  { title: "腐蚀", desc: "腐蚀产物的微观形貌与腐蚀类型判断。", href: "/gallery" },
  { title: "纤维", desc: "天然与合成纤维的直径、表面纹理与断裂模式。", href: "/gallery" },
  { title: "失效分析", desc: "从 SEM 图像回溯失效原因的系统方法。", href: "/gallery" },
];

export default function GalleryPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <a href="/" className="hover:text-stone-600 transition-colors">首页</a>
          <span>/</span>
          <span className="text-stone-700">图像案例</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          图像案例
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-500 leading-relaxed">
          通过真实 SEM 图像学习判读。每篇案例包含原始图像、拍摄参数、
          图中关键结构的标注以及为什么这样判断。
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CASES.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="
              group flex items-center gap-4
              p-4 border border-stone-200 rounded-xl
              hover:border-blue-200 hover:bg-blue-50/20
              transition-all duration-200
            "
          >
            <span className="text-xl flex-shrink-0">🖼</span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-stone-800 group-hover:text-blue-600 transition-colors">
                {c.title}
              </h3>
              <p className="mt-0.5 text-xs text-stone-400 line-clamp-1">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
