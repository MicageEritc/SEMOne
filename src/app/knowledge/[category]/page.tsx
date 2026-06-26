/**
 * 知识库分类详情页
 *
 * 路由：/knowledge/[category]
 * 左侧导航 + 右侧文章列表，所有数据由 Content Engine 自动生成
 */

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getKnowledgeCategories, getArticlesByKnowledgeCategory } from "@/lib/articles";
import { DIFFICULTY_LABELS } from "@/types/article";
import KnowledgeSidebar from "@/components/KnowledgeSidebar";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cats = getKnowledgeCategories();
  const current = cats.find((c) => c.slug === category);
  const name = current?.name || category;
  return {
    title: `${name} — 知识库`,
    description: `SEM One 知识库 ${name} 分类，系统学习扫描电子显微镜相关知识与技术。`,
  };
}

export async function generateStaticParams() {
  return getKnowledgeCategories().map((cat) => ({ category: cat.slug }));
}

export default async function KnowledgeCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const categories = getKnowledgeCategories();
  const current = categories.find((c) => c.slug === category);
  if (!current) notFound();

  const articles = await getArticlesByKnowledgeCategory(category);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <a href="/knowledge" className="hover:text-stone-600 transition-colors">知识库</a>
          <span>/</span>
          <span className="text-stone-700">{current.name}</span>
        </nav>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <KnowledgeSidebar categories={categories} currentSlug={category} />

        <div className="flex-1 min-w-0">
          <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              {current.name}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-stone-500 leading-relaxed">
              {current.description}
            </p>
            <hr className="mt-6 border-stone-100" />

            {articles.length > 0 ? (
              <div className="mt-6 space-y-3">
                {articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="
                      block p-4 border border-stone-100 rounded-xl
                      hover:border-blue-200 hover:bg-blue-50/30
                      transition-all duration-200
                    "
                  >
                    <h3 className="text-base font-medium text-stone-800 group-hover:text-blue-600 transition-colors">
                      {article.meta.title}
                    </h3>
                    {article.meta.description && (
                      <p className="mt-1 text-sm text-stone-500 line-clamp-2">
                        {article.meta.description}
                      </p>
                    )}
                    <div className="mt-2 flex items-center gap-3 text-xs text-stone-400">
                      <span>{article.meta.date}</span>
                      <span className="text-stone-200">·</span>
                      {article.meta.difficulty && (
                        <>
                          <span className={`px-1.5 py-0.5 rounded text-xs ${
                            article.meta.difficulty === "beginner" ? "bg-green-50 text-green-600"
                            : article.meta.difficulty === "intermediate" ? "bg-amber-50 text-amber-600"
                            : "bg-red-50 text-red-600"}`}>
                            {DIFFICULTY_LABELS[article.meta.difficulty]}
                          </span>
                          <span className="text-stone-200">·</span>
                        </>
                      )}
                      {article.meta.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-stone-400">#{tag}</span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="mt-6 py-16 text-center">
                <p className="text-sm text-stone-400">该分类暂无文章。</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
