/**
 * SEM One 知识树（Knowledge Tree）
 *
 * 仅保存栏目结构，不保存具体文章数据。
 * 各栏目下的文章由 Content Engine 自动扫描 articles/ 目录生成。
 *
 * 维护方式：只在此添加/修改栏目，无需维护文章数据。
 */

import type { SectionNode } from "@/types/article";

/**
 * 知识库子分类定义
 * 这些分类由 Content Engine 自动填充文章数量
 */
const KNOWLEDGE_CHILDREN: SectionNode[] = [
  { id: "basics",            title: "基础知识",   description: "SEM 核心概念、术语与基本工作原理。",               slug: "knowledge/basics",              color: "#22c55e" },
  { id: "instrument",        title: "仪器结构",   description: "电子枪、透镜、样品台、真空系统等组件。",               slug: "knowledge/instrument",          color: "#22c55e" },
  { id: "principles",        title: "成像原理",   description: "电子束-样品相互作用、信号产生与衬度形成。",             slug: "knowledge/principles",          color: "#f59e0b" },
  { id: "parameters",        title: "参数设置",   description: "加速电压、束流、工作距离等关键参数优化。",              slug: "knowledge/parameters",          color: "#f59e0b" },
  { id: "sample-preparation",title: "样品制备",   description: "导电处理、截面制备、镀膜技术等前处理方法。",             slug: "knowledge/sample-preparation",   color: "#f59e0b" },
  { id: "detectors",         title: "探测器",     description: "SE、BSE、EDS、EBSD 等探测器原理与选型。",             slug: "knowledge/detectors",           color: "#ef4444" },
  { id: "image-analysis",    title: "图像分析",   description: "SEM 图像解读、定量分析与图像处理。",                  slug: "knowledge/image-analysis",      color: "#ef4444" },
  { id: "troubleshooting",   title: "故障排查",   description: "常见成像问题诊断、像散校正、污染处理。",                slug: "knowledge/troubleshooting",     color: "#ef4444" },
  { id: "applications",      title: "应用领域",   description: "材料、生物、半导体、地质等领域的 SEM 应用。",          slug: "knowledge/applications",        color: "#8b5cf6" },
  { id: "brands",            title: "仪器品牌",   description: "全球主流 SEM 厂商介绍、产品线对比与选购指南。",             slug: "knowledge/brands",              color: "#8b5cf6" },
];

/**
 * 知识树顶层分区
 */
export const KNOWLEDGE_TREE: SectionNode = {
  id: "root",
  title: "SEM One",
  description: "Explore Beyond the Surface. 探索微观，洞见本质",
  slug: "",
  children: [
    {
      id: "guide",
      title: "开始学习",
      description: "从零开始，系统掌握扫描电子显微镜。",
      icon: "book-open",
      slug: "guide",
      color: "#3b82f6",
    },
    {
      id: "knowledge",
      title: "知识库",
      description: "从基础概念到高级应用，系统学习 SEM。",
      icon: "database",
      slug: "knowledge",
      color: "#6366f1",
      children: KNOWLEDGE_CHILDREN,
    },
    {
      id: "gallery",
      title: "图像案例",
      description: "通过真实样品学习 SEM 图像判读。",
      icon: "image",
      slug: "gallery",
      color: "#ec4899",
    },
    {
      id: "tools",
      title: "工具箱",
      description: "SEM 参数计算器与分析辅助工具。",
      icon: "wrench",
      slug: "tools",
      color: "#f97316",
    },
    {
      id: "glossary",
      title: "术语表",
      description: "SEM 领域专业术语简明解释。",
      icon: "list",
      slug: "glossary",
      color: "#14b8a6",
    },
    {
      id: "news",
      title: "最新资讯",
      description: "SEM 行业动态与技术趋势。",
      icon: "newspaper",
      slug: "news",
      color: "#64748b",
    },
  ],
};

// ==================== 辅助函数 ====================

/** 获取顶层分区 */
export function getSections(): SectionNode[] {
  return KNOWLEDGE_TREE.children || [];
}

/** 根据 id 查找节点 */
export function findNodeById(tree: SectionNode, id: string): SectionNode | null {
  if (tree.id === id) return tree;
  if (tree.children) {
    for (const child of tree.children) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
  }
  return null;
}

/** 获取某个分区下的子节点 */
export function getSectionChildren(sectionId: string): SectionNode[] {
  const section = findNodeById(KNOWLEDGE_TREE, sectionId);
  return section?.children || [];
}
