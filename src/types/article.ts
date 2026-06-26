/**
 * 文章类型定义
 *
 * 核心设计：
 * - category 由文件夹路径自动推导，不在 frontmatter 中维护
 * - slug 由文件路径自动生成
 * - order 控制同分类下文章排序
 * - draft 控制是否发布
 */

// ==================== 基础枚举与映射 ====================

/**
 * 文章难度等级
 */
export type ArticleDifficulty = "beginner" | "intermediate" | "advanced";

/** 难度标签 */
export const DIFFICULTY_LABELS: Record<ArticleDifficulty, string> = {
  beginner: "入门",
  intermediate: "进阶",
  advanced: "高级",
};

/**
 * 文章顶层分区（section）
 * 由 articles/ 下的一级目录自动推导
 */
export type ArticleSection = "guide" | "knowledge" | "gallery" | "tools" | "glossary" | "news";

/** 分区标签 */
export const SECTION_LABELS: Record<string, string> = {
  guide: "开始学习",
  knowledge: "知识库",
  gallery: "图像案例",
  tools: "工具箱",
  glossary: "术语表",
  news: "最新资讯",
};

// ==================== 文章元数据 ====================

/**
 * 文章 Front Matter
 * category 和 slug 由路径自动推导，无需手写
 */
export interface ArticleMeta {
  /** 文章标题 */
  title: string;
  /** 文章描述 */
  description: string;
  /** 发布日期 YYYY-MM-DD */
  date: string;
  /** 最后更新 YYYY-MM-DD（可选） */
  updatedAt?: string;
  /** 阅读时间（分钟），不填则自动估算 */
  readingTime?: number;
  /** 难度 */
  difficulty?: ArticleDifficulty;
  /** 标签 */
  tags?: string[];
  /** 作者 */
  author?: string;
  /** 排序（同分类内从小到大排列） */
  order?: number;
  /** 是否为草稿（默认 false = 已发布） */
  draft?: boolean;
  /** 封面图（可选，相对于 public/） */
  cover?: string;
}

// ==================== TOC ====================

/** TOC 目录条目 */
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// ==================== 文章数据 ====================

/** 导航用精简条目 */
export interface ArticleNavItem {
  slug: string;
  title: string;
}

/** 基础文章 */
export interface Article {
  slug: string;
  meta: ArticleMeta;
  content: string;
  rawContent?: string;
  /** 由路径自动推导的分类（子目录名） */
  category: string;
  /** 由路径自动推导的分区 */
  section: ArticleSection;
}

/** 完整文章（含 TOC + 导航） */
export interface ArticleFull extends Article {
  toc: TocItem[];
  readingTime: number;
  prevArticle: ArticleNavItem | null;
  nextArticle: ArticleNavItem | null;
  relatedArticles: ArticleNavItem[];
}

// ==================== 知识库分类 ====================

/** 知识库子分类（由扫描目录自动生成） */
export interface KnowledgeCategory {
  slug: string;
  name: string;
  description: string;
  articleCount: number;
  difficulty?: ArticleDifficulty;
}

// ==================== 知识树节点 ====================

/** 知识树栏目节点（仅存结构，不含具体文章数据） */
export interface SectionNode {
  id: string;
  title: string;
  description: string;
  icon?: string;
  slug: string;
  color?: string;
  /** 知识库下才有子分类节点 */
  children?: SectionNode[];
}
