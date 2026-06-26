/**
 * 知识库页面
 *
 * 布局：左侧导航（自动生成） + 右侧内容区
 * 桌面端并排，移动端导航折叠为下拉菜单
 */

import type { Metadata } from "next";
import { getKnowledgeCategories } from "@/lib/articles";
import KnowledgeSidebar from "@/components/KnowledgeSidebar";

/** 页面 SEO 元数据 */
export const metadata: Metadata = {
  title: "知识库",
  description: "从基础概念到高级应用，系统学习扫描电子显微镜。",
};

export default function KnowledgePage() {
  // 自动从 articles/knowledge/ 目录获取所有分类
  const categories = getKnowledgeCategories();

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
      {/* ===== 页面标题 ===== */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          知识库
        </h1>
        <p className="mt-2 text-sm sm:text-base text-stone-500">
          从基础概念到高级应用，系统学习扫描电子显微镜。
        </p>
      </div>

      {/* ===== 左右布局 ===== */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧导航（自动根据 articles/knowledge 目录生成） */}
        <KnowledgeSidebar categories={categories} />

        {/* 右侧内容区 */}
        <div className="flex-1 min-w-0">
          {/* 内容卡片 */}
          <div
            className="
              bg-white border border-stone-200
              rounded-2xl
              p-6 sm:p-8
            "
          >
            {/* 当前分类标题 */}
            <h2 className="text-lg font-semibold text-stone-800 mb-4">
              当前包含
            </h2>

            {/* 分类网格列表 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={`/knowledge/${cat.slug}`}
                  className="
                    flex items-center gap-3
                    px-4 py-3
                    bg-stone-50 border border-stone-100
                    rounded-xl
                    text-sm text-stone-700
                    hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600
                    transition-colors duration-200
                  "
                >
                  {/* 小圆点指示器 */}
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {cat.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
