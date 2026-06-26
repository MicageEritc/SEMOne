/**
 * SEM One 首页
 *
 * 8 屏内容推荐结构（不是导航复制）：
 * 1. Hero               — 平台名称、介绍、搜索框、CTA 按钮
 * 2. 推荐学习路线          — Step 1-6 入门教材序列
 * 3. 知识库分类            — Knowledge Tree 所有子分类
 * 4. 热门文章             — 推荐阅读精华内容
 * 5. 最近更新             — Article Index 最新 6 篇
 * 6. 精选图像案例          — gallery 预览
 * 7. 推荐工具             — tools 预览
 * 8. 关于 SEM One        — 网站定位
 *
 * 设计风格：Apple 极简，大量留白，宽屏布局
 */

import HeroSection from "@/components/home/HeroSection";
import LearningPathSection from "@/components/home/LearningPathSection";
import KnowledgePreviewSection from "@/components/home/KnowledgePreviewSection";
import HotArticlesSection from "@/components/home/HotArticlesSection";
import RecentUpdatesSection from "@/components/home/RecentUpdatesSection";
import GalleryPreviewSection from "@/components/home/GalleryPreviewSection";
import ToolsPreviewSection from "@/components/home/ToolsPreviewSection";
import AboutSection from "@/components/home/AboutSection";

export default function Home() {
  return (
    <>
      {/* 第一屏：Hero */}
      <HeroSection />

      {/* 第二屏：推荐学习路线 */}
      <LearningPathSection />

      {/* 第三屏：知识库分类 */}
      <KnowledgePreviewSection />

      {/* 第四屏：热门文章（浅灰背景） */}
      <div className="bg-stone-50/50">
        <HotArticlesSection />
      </div>

      {/* 第五屏：最近更新 */}
      <RecentUpdatesSection />

      {/* 第六屏：精选图像案例（浅灰背景） */}
      <GalleryPreviewSection />

      {/* 第七屏：推荐工具 */}
      <ToolsPreviewSection />

      {/* 第八屏：关于 SEM One */}
      <AboutSection />
    </>
  );
}
