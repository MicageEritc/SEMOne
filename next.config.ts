import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * 本地开发时不启用 export 模式（避免 dev 模式下 generateStaticParams 校验失败）。
   * 可通过 NEXT_PUBLIC_EXPORT=true 环境变量启用，或在 Cloudflare Pages 构建时自动启用。
   */
  ...(process.env.NEXT_PUBLIC_EXPORT === "true" ? { output: "export" as const } : {}),

  // 静态导出时关闭图片优化（Cloudflare Pages 不支持）
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
