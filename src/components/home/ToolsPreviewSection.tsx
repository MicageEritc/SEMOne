/**
 * 首页推荐工具
 *
 * 自动扫描 articles/tools/ 目录
 */

import Link from "next/link";

export default function ToolsPreviewSection() {
  // TODO: 后续从 Content Engine 读取 tools 文章
  const tools = [
    { title: "放大倍率换算", desc: "多种放大倍率单位互转", href: "/tools" },
    { title: "景深计算", desc: "根据参数计算景深范围", href: "/tools" },
    { title: "加速电压推荐", desc: "根据样品类型推荐电压", href: "/tools" },
    { title: "像素长度换算", desc: "标尺与像素尺寸转换", href: "/tools" },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          推荐工具
        </h2>
        <p className="mt-2 text-sm text-stone-400">
          提高实验效率的实用工具
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="
              group flex flex-col
              p-5
              bg-white border border-stone-200
              rounded-2xl
              hover:border-blue-200 hover:shadow-sm
              transition-all duration-200
            "
          >
            <span className="text-2xl mb-3">🛠</span>
            <h3 className="text-sm font-semibold text-stone-800 group-hover:text-blue-600 transition-colors">
              {tool.title}
            </h3>
            <p className="mt-1 text-xs text-stone-400">{tool.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link href="/tools" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-500 transition-colors">
          查看全部工具
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
