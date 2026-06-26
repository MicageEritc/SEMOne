import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 指定 Turbopack 项目根目录，避免多 lockfile 警告
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
