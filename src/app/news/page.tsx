/**
 * 最新资讯（News）
 *
 * 只放时效内容：新仪器发布、论文、会议、新技术、厂商动态
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "最新资讯",
  description: "SEM 行业动态、新仪器发布、学术会议与技术趋势。",
};

const NEWS_CATEGORIES = [
  { title: "新仪器发布", desc: "各大厂商最新 SEM 产品与技术参数。", emoji: "🔬" },
  { title: "新论文", desc: "SEM 相关的高影响力学术论文速览。", emoji: "📄" },
  { title: "行业会议", desc: "国内外 SEM 学术会议与展览信息。", emoji: "🎙" },
  { title: "新技术", desc: "SEM 领域的创新技术与方法突破。", emoji: "💡" },
  { title: "厂商动态", desc: "SEM 厂商的并购、合作与战略更新。", emoji: "🏢" },
  { title: "软件更新", desc: "SEM 图像处理与分析软件的新版本发布。", emoji: "💻" },
];

export default function NewsPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <a href="/" className="hover:text-stone-600 transition-colors">首页</a>
          <span>/</span>
          <span className="text-stone-700">最新资讯</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          最新资讯
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-500 leading-relaxed">
          关注 SEM 技术、仪器和行业最新动态。这些内容会定期更新。
        </p>
      </div>

      {/* 资讯分类 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {NEWS_CATEGORIES.map((cat) => (
          <div
            key={cat.title}
            className="
              flex items-center gap-4
              p-4 border border-stone-200 rounded-xl
            "
          >
            <span className="text-xl flex-shrink-0">{cat.emoji}</span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-stone-800">{cat.title}</h3>
              <p className="mt-0.5 text-xs text-stone-400 line-clamp-1">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-stone-300">
        资讯内容即将上线。
      </p>
    </div>
  );
}
