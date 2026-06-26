/**
 * 入口卡片组件
 *
 * 首页五个入口卡片的统一组件。
 * 每个卡片包含图标、标题、描述和跳转链接。
 */

import Link from "next/link";

/** 入口卡片属性 */
interface EntryCardProps {
  /** 卡片标题 */
  title: string;
  /** 卡片描述 */
  description: string;
  /** 跳转链接 */
  href: string;
  /** SVG 图标路径数据 */
  iconPath: string;
}

export default function EntryCard({
  title,
  description,
  href,
  iconPath,
}: EntryCardProps) {
  return (
    <Link
      href={href}
      className="
        group
        flex flex-col items-center gap-5
        p-8 sm:p-10
        bg-white
        rounded-2xl
        border border-stone-200/60
        shadow-[0_0_0_0_rgba(0,0,0,0)]
        transition-all duration-300 ease-out
        hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)]
        hover:border-stone-300/80
        hover:-translate-y-1
      "
    >
      {/* 图标区域 */}
      <div
        className="
          w-12 h-12
          flex items-center justify-center
          rounded-xl
          bg-stone-50
          text-stone-600
          transition-colors duration-300
          group-hover:bg-blue-50
          group-hover:text-blue-600
        "
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={iconPath} />
        </svg>
      </div>

      {/* 文字区域 */}
      <div className="text-center">
        <h3
          className="
            text-lg font-semibold
            text-stone-800
            transition-colors duration-300
            group-hover:text-blue-600
          "
        >
          {title}
        </h3>
        <p className="mt-2 text-sm text-stone-500 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
