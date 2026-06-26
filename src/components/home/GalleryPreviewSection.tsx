/**
 * 首页精选图像案例
 *
 * 自动扫描 articles/gallery/ 目录
 */

import Link from "next/link";

export default function GalleryPreviewSection() {
  // TODO: 后续从 Content Engine 读取 gallery 文章
  return (
    <section className="w-full bg-stone-50/50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
            精选图像案例
          </h2>
          <p className="mt-2 text-sm text-stone-400">
            通过真实 SEM 图像学习判读技巧
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Link
              key={i}
              href="/gallery"
              className="
                group flex flex-col items-center
                p-5
                bg-white border border-stone-200 border-dashed
                rounded-2xl
                hover:border-blue-200 hover:border-solid hover:shadow-sm
                transition-all duration-200
              "
            >
              <div className="w-full aspect-[4/3] bg-stone-50 rounded-xl flex items-center justify-center mb-3">
                <span className="text-2xl text-stone-200">🖼</span>
              </div>
              <span className="text-xs text-stone-400">案例即将上线</span>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link href="/gallery" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-500 transition-colors">
            查看全部图像案例
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
