import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // 指定 Turbopack 项目根目录，避免多 lockfile 警告
  turbopack: {
    root: __dirname,
  },
  // 静态导出时关闭图片优化（Cloudflare Pages 不支持）
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
