/**
 * 搜索框组件（仅 UI，暂不实现搜索功能）
 *
 * 样式参考 Apple 官网搜索框：简洁圆角 + 放大镜图标
 */
export default function SearchBox() {
  return (
    <div className="w-full max-w-xl mx-auto">
      {/* 搜索输入框容器 */}
      <div className="relative">
        {/* 搜索图标 */}
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* 输入框 */}
        <input
          type="text"
          placeholder="搜索 SEM 知识、教程、案例…"
          disabled
          className="
            w-full h-12 pl-12 pr-4
            text-base text-stone-800 placeholder:text-stone-400
            bg-stone-100/80 rounded-xl
            border border-stone-200/60
            outline-none
            transition-colors duration-200
            cursor-not-allowed
            /* 当搜索功能启用时改为 pointer-events-auto */
          "
          aria-label="搜索 SEM 知识"
        />
      </div>
    </div>
  );
}
