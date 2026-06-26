/**
 * 首页推荐学习路线
 *
 * 展示部分精选章节，引导用户进入完整 Learning Path
 */

import Link from "next/link";

const STEPS = [
  {
    title: "初识 SEM",
    desc: "什么是扫描电子显微镜？发明背景、基本原理与普通显微镜的核心区别。",
    emoji: "🔬",
    href: "/articles/guide/01什么是扫描电子显微镜（SEM）",
  },
  {
    title: "工作原理",
    desc: "电子束 → 真空 → 扫描 → 探测器 → 成像，一张流程图讲完整个过程。",
    emoji: "🎯",
    href: "/articles/guide/05一台SEM是如何工作的",
  },
  {
    title: "实验流程",
    desc: "从样品准备到获取图片，完整走一遍 SEM 标准操作步骤。",
    emoji: "📋",
    href: "/articles/guide/08一次完整的SEM实验流程",
  },
  {
    title: "分析能力",
    desc: "形貌、尺寸、元素、缺陷、断口……SEM 到底能告诉我们什么。",
    emoji: "🔍",
    href: "/articles/guide/11SEM能分析哪些信息",
  },
  {
    title: "常见错误",
    desc: "初学者最常犯的错误：误判图片、倍率陷阱、忽略样品制备。",
    emoji: "⚠️",
    href: "/articles/guide/13SEM初学者最容易犯的错误",
  },
  {
    title: "下一步学什么",
    desc: "入门课结束，正式进入 SEM One 的完整知识体系。",
    emoji: "🧭",
    href: "/articles/guide/14下一步应该学什么",
  },
];

export default function LearningPathSection() {
  return (
    <section className="w-full bg-stone-50/50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* 区域标题 */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            开始学习
          </h2>
          <p className="mt-1.5 text-sm text-stone-400">
            循序渐进认识 SEM，14 节课 · 约 2 小时
          </p>
        </div>

        {/* 课程卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STEPS.map((step) => (
            <Link
              key={step.href}
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
              {/* 图标 */}
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-stone-100 rounded-xl text-lg group-hover:bg-blue-50 transition-colors duration-200">
                {step.emoji}
              </div>

              {/* 内容 */}
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-stone-800 group-hover:text-blue-600 transition-colors">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs text-stone-400 leading-relaxed line-clamp-2">
                  {step.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* 底部更多按钮 */}
        <div className="mt-8 text-center">
          <Link
            href="/guide"
            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            查看全部 14 节课
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
