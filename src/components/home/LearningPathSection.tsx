/**
 * 首页推荐学习路线
 *
 * 一条 10 步的入门路线，像一本《SEM 入门教材》
 * 每步是一篇短文，适合零基础按顺序阅读
 */

import Link from "next/link";

/** 学习路线步骤 — href 统一指向 /guide（开始学习页），保持和导航栏一致 */
const STEPS = [
  {
    step: 1,
    title: "什么是 SEM",
    desc: "认识扫描电子显微镜，了解它与普通显微镜的区别。",
    emoji: "🔬",
    href: "/guide",
  },
  {
    step: 2,
    title: "SEM 能做什么",
    desc: "SEM 能看到什么？在实际科研和工业中有哪些应用。",
    emoji: "🔍",
    href: "/guide",
  },
  {
    step: 3,
    title: "SEM 与光学显微镜",
    desc: "两类显微镜的成像原理、分辨率与适用场景对比。",
    emoji: "🆚",
    href: "/guide",
  },
  {
    step: 4,
    title: "SEM 与 TEM",
    desc: "扫描电镜与透射电镜的核心区别与选择指南。",
    emoji: "⚡",
    href: "/guide",
  },
  {
    step: 5,
    title: "一台 SEM 长什么样",
    desc: "认识电子枪、样品室、探测器等核心部件。",
    emoji: "🏗",
    href: "/guide",
  },
  {
    step: 6,
    title: "SEM 是如何工作的",
    desc: "电子束扫描 → 信号产生 → 图像形成，整个过程。",
    emoji: "🎯",
    href: "/guide",
  },
  {
    step: 7,
    title: "一次完整的实验流程",
    desc: "从开机、放样、调参到拍摄，完整的操作步骤。",
    emoji: "📋",
    href: "/guide",
  },
  {
    step: 8,
    title: "如何看懂 SEM 图片",
    desc: "形貌衬度、成分衬度、荷电效应等常见特征的判读。",
    emoji: "🖼",
    href: "/guide",
  },
  {
    step: 9,
    title: "SEM 常见名词速查",
    desc: "加速电压、工作距离、SE、BSE…… 快速建立概念地图。",
    emoji: "📝",
    href: "/guide",
  },
  {
    step: 10,
    title: "下一步学什么",
    desc: "看完入门路线后，推荐继续深入的方向和资源。",
    emoji: "🧭",
    href: "/guide",
  },
];

export default function LearningPathSection() {
  return (
    <section className="w-full bg-stone-50/50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* 区域标题 */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            开始学习
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            一条 10 步的入门路线，像一本《SEM 入门教材》
          </p>
        </div>

        {/* 步骤列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map((step) => (
            <Link
              key={step.step}
              href={step.href}
              className="
                group relative
                flex items-start gap-4
                p-4 sm:p-5
                bg-white border border-stone-200
                rounded-2xl
                hover:border-blue-200 hover:shadow-sm
                transition-all duration-200
              "
            >
              {/* 步骤编号 */}
              <div
                className="
                  flex-shrink-0
                  w-10 h-10
                  flex items-center justify-center
                  bg-stone-100 rounded-xl
                  text-sm font-bold text-stone-500
                  group-hover:bg-blue-50 group-hover:text-blue-600
                  transition-colors duration-200
                "
              >
                {step.step}
              </div>

              {/* 步骤内容 */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base">{step.emoji}</span>
                  <h3 className="text-sm font-semibold text-stone-800 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-1 text-xs text-stone-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
