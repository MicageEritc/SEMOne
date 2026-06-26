import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // 静态导出时关闭图片优化（Cloudflare Pages 不支持）
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
