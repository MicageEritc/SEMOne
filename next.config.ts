import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /**
   * 仅在生产构建时启用静态导出（npm run build → out/）。
   * 本地开发（npm run dev）不启用，避免 Next.js 16 dev 模式下
   * output: "export" 与 generateStaticParams 的兼容性问题。
   */
  ...(isProd ? { output: "export" as const } : {}),

  // 静态导出时关闭图片优化
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
