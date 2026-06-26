/**
 * 文章面包屑导航
 *
 * 根据 slug 自动推导路径，不依赖手写 category 字段
 * 例如：knowledge/basics/accelerating-voltage
 *   → 首页 > 知识库 > 基础知识 > 文章标题
 */

import { SECTION_LABELS } from "@/types/article";
import { getKnowledgeCategories } from "@/lib/articles";
import type { ArticleSection } from "@/types/article";

interface BreadcrumbItem {
  label: string;
  href: string | null;
}

interface ArticleBreadcrumbProps {
  section: ArticleSection;
  slug: string;
  title: string;
}

export default function ArticleBreadcrumb({
  section,
  slug,
  title,
}: ArticleBreadcrumbProps) {
  const items: BreadcrumbItem[] = [{ label: "首页", href: "/" }];

  // 分区标签
  const sectionLabel = SECTION_LABELS[section] || section;
  if (section === "knowledge") {
    items.push({ label: "知识库", href: "/knowledge" });

    // 解析知识库子分类
    const parts = slug.split("/");
    if (parts.length >= 3) {
      const subSlug = parts[1]; // knowledge/{subSlug}/article
      const cats = getKnowledgeCategories();
      const cat = cats.find((c) => c.slug === subSlug);
      if (cat) {
        items.push({ label: cat.name, href: `/knowledge/${subSlug}` });
      }
    }
  } else {
    items.push({ label: sectionLabel, href: `/${section}` });
  }

  items.push({ label: title, href: null });

  return (
    <nav aria-label="面包屑导航" className="mb-6">
      <ol className="flex items-center flex-wrap gap-1 text-sm">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1">
            {idx > 0 && <span className="text-stone-300 mx-1 select-none">/</span>}
            {item.href ? (
              <a href={item.href} className="text-stone-400 hover:text-stone-600 transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-stone-600">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
