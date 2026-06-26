/**
 * 开始学习（Learning Path）
 *
 * 5 章 14 节，循序渐进认识 SEM。
 * 每节短文，建议按顺序阅读。
 * 实际内容存放在 articles/guide/ 下，格式为 .md。
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "开始学习",
  description: "SEM One Learning Path · 14 节课 · 约 2 小时完成",
};

/** 章节 & 课程数据 */
interface Lesson {
  num: string;        // "01"
  title: string;      // 显示标题
  slug: string;       // 对应的 md 文件名（不含扩展名）
  duration: string;   // "8 min"
}

interface Chapter {
  chapter: number;
  title: string;
  lessons: Lesson[];
}

const CHAPTERS: Chapter[] = [
  {
    chapter: 1,
    title: "初识 SEM",
    lessons: [
      { num: "01", title: "什么是扫描电子显微镜（SEM）", slug: "01什么是扫描电子显微镜（SEM）", duration: "8 min" },
      { num: "02", title: "SEM 能做什么？", slug: "02SEM能做什么", duration: "6 min" },
      { num: "03", title: "SEM 与光学显微镜有什么区别？", slug: "03SEM与光学显微镜有什么区别", duration: "10 min" },
      { num: "04", title: "SEM 与 TEM 有什么区别？", slug: "04SEM与TEM有什么区别", duration: "12 min" },
    ],
  },
  {
    chapter: 2,
    title: "工作原理",
    lessons: [
      { num: "05", title: "一台 SEM 是如何工作的？", slug: "05一台SEM是如何工作的", duration: "10 min" },
      { num: "06", title: "一台 SEM 由哪些部分组成？", slug: "06一台SEM由哪些部分组成", duration: "8 min" },
      { num: "07", title: "SEM 为什么能够成像？", slug: "07SEM为什么能够成像", duration: "10 min" },
    ],
  },
  {
    chapter: 3,
    title: "实际使用",
    lessons: [
      { num: "08", title: "一次完整的 SEM 实验流程", slug: "08一次完整的SEM实验流程", duration: "8 min" },
      { num: "09", title: "SEM 图片应该怎么看？", slug: "09SEM图片应该怎么看", duration: "10 min" },
      { num: "10", title: "SEM 常见参数有哪些？", slug: "10SEM常见参数有哪些", duration: "10 min" },
    ],
  },
  {
    chapter: 4,
    title: "认识能力边界",
    lessons: [
      { num: "11", title: "SEM 能分析哪些信息？", slug: "11SEM能分析哪些信息", duration: "8 min" },
      { num: "12", title: "SEM 有哪些局限？", slug: "12SEM有哪些局限", duration: "8 min" },
    ],
  },
  {
    chapter: 5,
    title: "下一步学习",
    lessons: [
      { num: "13", title: "SEM 初学者最容易犯的错误", slug: "13SEM初学者最容易犯的错误", duration: "8 min" },
      { num: "14", title: "下一步应该学什么？", slug: "14下一步应该学什么", duration: "6 min" },
    ],
  },
];

const TOTAL_LESSONS = 14;
const TOTAL_TIME = "约 2 小时";
const ALL_LESSONS = CHAPTERS.flatMap((ch) => ch.lessons);

export default function GuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
      {/* 面包屑 */}
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <Link href="/" className="hover:text-stone-600 transition-colors">首页</Link>
          <span>/</span>
          <span className="text-stone-700">开始学习</span>
        </nav>
      </div>

      {/* 标题区 */}
      <div className="mb-10">
        {/* 主标题 + 装饰线 */}
        <div className="flex items-baseline gap-4">
          <div className="w-1 h-8 sm:h-10 rounded-full bg-blue-500 flex-shrink-0 self-center" />
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
            开始学习
          </h1>
        </div>

        {/* 导语 — 与标题用较大gap拉开 */}
        <p className="mt-5 text-lg sm:text-xl text-stone-400 leading-relaxed max-w-xl">
          第一次接触扫描电子显微镜，不知道从哪里开始？
        </p>

        {/* 正文描述 */}
        <p className="mt-3 text-sm sm:text-base text-stone-400/70 leading-relaxed max-w-2xl">
          Learning Path 将带你按照循序渐进的方式认识 SEM。
          从基本概念、工作原理到实际应用，帮助建立完整的知识框架。
        </p>
      </div>

      {/* 课程信息卡片 */}
      <div className="mb-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-stone-200 text-stone-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-stone-400">学习路线</p>
            <p className="text-sm font-semibold text-stone-700">Learning Path</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-stone-200 text-stone-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-stone-400">课程数量</p>
            <p className="text-sm font-semibold text-stone-700">{TOTAL_LESSONS} Lessons</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-stone-50 rounded-xl border border-stone-100">
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-stone-200 text-stone-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-stone-400">预计时长</p>
            <p className="text-sm font-semibold text-stone-700">{TOTAL_TIME} 完成</p>
          </div>
        </div>
      </div>

      {/* 阅读提示 — 淡色小字 */}
      <p className="mb-10 text-xs text-stone-300">
        建议按照章节顺序阅读。完成本学习路线后，再进入知识库深入学习每一个知识点。
      </p>

      {/* 分割线 */}
      <hr className="border-stone-200/60 mb-10" />

      {/* 章节列表 */}
      <div className="space-y-10">
        {CHAPTERS.map((chapter) => (
          <section key={chapter.chapter}>
            {/* 章节标题 */}
            <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-widest mb-4">
              Chapter {chapter.chapter} · {chapter.title}
            </h2>

            {/* 课程列表 */}
            <div className="space-y-0">
              {chapter.lessons.map((lesson, idx) => (
                <Link
                  key={lesson.num}
                  href={`/articles/guide/${lesson.slug}`}
                  className="
                    group flex items-center gap-4 sm:gap-5
                    py-4
                    border-b border-stone-100 last:border-b-0
                    hover:bg-stone-50
                    -mx-3 px-3 rounded-xl
                    transition-colors duration-150
                  "
                >
                  {/* 编号 */}
                  <span className="
                    flex-shrink-0
                    w-11 h-11
                    flex items-center justify-center
                    bg-stone-100 rounded-xl
                    text-sm font-bold text-stone-500
                    group-hover:bg-blue-50 group-hover:text-blue-600
                    transition-colors duration-200
                  ">
                    {lesson.num}
                  </span>

                  {/* 标题 */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-stone-800 group-hover:text-blue-600 transition-colors">
                      {lesson.title}
                    </h3>
                  </div>

                  {/* 阅读时长 */}
                  <span className="flex-shrink-0 text-xs text-stone-400 group-hover:text-blue-500 transition-colors">
                    {lesson.duration}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
