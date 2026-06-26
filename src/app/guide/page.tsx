/**
 * 开始学习（Learning Path）
 *
 * 一本《SEM 入门教材》，按顺序阅读。
 * 10~20 篇短文，不讲太深，看完知道去知识库查细节。
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "开始学习",
  description: "一条从零开始的 SEM 学习路线，按顺序阅读效果最佳。",
};

/** 学习路线步骤 — 《SEM 入门教材》 */
const STEPS = [
  { step: 1,  title: "什么是扫描电子显微镜（SEM）", desc: "认识 SEM，了解它与光学显微镜的根本区别。", href: "/articles/guide/what-is-sem" },
  { step: 2,  title: "SEM 能做什么？", desc: "SEM 在科研和生产中的典型应用场景。", href: "/articles/guide/sem-capabilities" },
  { step: 3,  title: "SEM 与光学显微镜有什么区别？", desc: "两类显微镜的成像原理、放大能力和适用样品对比。", href: "/articles/guide/sem-vs-optical" },
  { step: 4,  title: "SEM 与 TEM 有什么区别？", desc: "扫描电镜与透射电镜的核心差异与选择指南。", href: "/articles/guide/sem-vs-tem" },
  { step: 5,  title: "一台 SEM 长什么样？", desc: "认识电子枪、样品室、探测器等核心部件。", href: "/knowledge/instrument" },
  { step: 6,  title: "SEM 是如何工作的？", desc: "从电子束扫描到图像形成的完整过程。", href: "/knowledge/principles" },
  { step: 7,  title: "一次完整的 SEM 实验流程", desc: "开机、放样、调参、拍摄的标准操作步骤。", href: "/articles/guide/experiment-workflow" },
  { step: 8,  title: "如何看懂一张 SEM 图片？", desc: "形貌衬度、成分衬度、荷电效应的判读方法。", href: "/knowledge/image-analysis" },
  { step: 9,  title: "SEM 常见名词快速认识", desc: "加速电压、工作距离、SE、BSE…… 快速建立概念地图。", href: "/articles/guide/glossary-quick" },
  { step: 10, title: "下一步应该学习什么？", desc: "学习路线后续方向推荐与资源指引。", href: "/knowledge" },
];

export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
      {/* 面包屑 */}
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <a href="/" className="hover:text-stone-600 transition-colors">首页</a>
          <span>/</span>
          <span className="text-stone-700">开始学习</span>
        </nav>
      </div>

      {/* 标题区 */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          开始学习
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-500 leading-relaxed">
          一本《SEM 入门教材》。建议按顺序阅读，每篇比较短，不讲太深。
          看完之后你就能独立操作 SEM，并知道遇到问题该去知识库查哪一部分。
        </p>
      </div>

      {/* 学习路线 — 垂直时间线 */}
      <div className="space-y-0">
        {STEPS.map((item, idx) => (
          <Link
            key={item.step}
            href={item.href}
            className="
              group flex items-start gap-4 sm:gap-5
              py-4 sm:py-5
              border-b border-stone-100 last:border-b-0
              hover:bg-stone-50
              -mx-3 px-3 rounded-xl
              transition-colors duration-150
            "
          >
            {/* 步骤编号 */}
            <span className="
              flex-shrink-0
              w-10 h-10 sm:w-11 sm:h-11
              flex items-center justify-center
              bg-stone-100 rounded-xl
              text-sm font-bold text-stone-500
              group-hover:bg-blue-50 group-hover:text-blue-600
              transition-colors duration-200
            ">
              {String(item.step).padStart(2, "0")}
            </span>

            {/* 步骤内容 */}
            <div className="min-w-0 pt-1">
              <h3 className="text-base sm:text-lg font-semibold text-stone-800 group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="mt-0.5 text-sm text-stone-400 leading-relaxed">
                {item.desc}
              </p>
            </div>

            {/* 箭头 */}
            {idx < STEPS.length - 1 && (
              <span className="flex-shrink-0 pt-1.5 text-stone-300 group-hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
