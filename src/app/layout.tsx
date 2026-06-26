/**
 * SEM One 根布局
 *
 * 全局包裹所有页面：
 * - 设置 SEO 元数据
 * - 引入 Header / Footer
 * - 配置字体和语言
 */

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * 全局 SEO 元数据
 */
export const metadata: Metadata = {
  title: {
    default: "SEM One — 探索微观，洞见本质",
    template: "%s | SEM One",
  },
  description:
    "SEM One 是面向 SEM 初学者、材料专业学生、科研人员和企业工程师的扫描电子显微镜知识平台。提供从入门到精通的 SEM 教程、知识库、案例分析和实用工具。",
  keywords: [
    "SEM",
    "扫描电子显微镜",
    "电子显微镜",
    "材料科学",
    "SEM 教程",
    "SEM 知识库",
  ],
  authors: [{ name: "SEM One" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "SEM One",
    title: "SEM One — 探索微观，洞见本质",
    description:
      "面向 SEM 初学者、材料专业学生、科研人员和企业工程师的扫描电子显微镜知识平台。",
  },
};

/**
 * 视口配置
 * 禁用暗色模式
 */
export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col bg-white text-stone-900 antialiased">
        {/* 顶部导航 */}
        <Header />

        {/* 页面主体 */}
        <main className="flex-1">{children}</main>

        {/* 底部信息 */}
        <Footer />
      </body>
    </html>
  );
}
