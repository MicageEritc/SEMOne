/**
 * 术语表（Glossary）
 *
 * 不是教程，也不是知识库 — 就是查词典
 * 用户一分钟查完就走
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "术语表",
  description: "SEM 领域专业术语与英文缩写的中英文对照速查。",
};

/** 示例术语（后续从 articles/glossary/ 自动读取） */
const TERMS = [
  { abbr: "SE",   full: "Secondary Electron",      cn: "二次电子" },
  { abbr: "BSE",  full: "Backscattered Electron",   cn: "背散射电子" },
  { abbr: "EDS",  full: "Energy Dispersive Spectroscopy", cn: "能谱分析" },
  { abbr: "WD",   full: "Working Distance",         cn: "工作距离" },
  { abbr: "SEM",  full: "Scanning Electron Microscope", cn: "扫描电子显微镜" },
  { abbr: "TEM",  full: "Transmission Electron Microscope", cn: "透射电子显微镜" },
  { abbr: "FEG",  full: "Field Emission Gun",       cn: "场发射电子枪" },
  { abbr: "ETD",  full: "Everhart-Thornley Detector", cn: "二次电子探测器" },
];

export default function GlossaryPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8">
      <div className="mb-6">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <a href="/" className="hover:text-stone-600 transition-colors">首页</a>
          <span>/</span>
          <span className="text-stone-700">术语表</span>
        </nav>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
          术语表
        </h1>
        <p className="mt-3 text-sm sm:text-base text-stone-500 leading-relaxed">
          遇到不认识的术语和英文缩写，一分钟查完就走。
        </p>
      </div>

      {/* 术语表 */}
      <div className="border border-stone-200 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">缩写</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">英文全称</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-stone-500 uppercase tracking-wider">中文</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {TERMS.map((term) => (
              <tr key={term.abbr} className="hover:bg-stone-50 transition-colors">
                <td className="px-4 sm:px-6 py-3 text-sm font-mono font-semibold text-blue-600">{term.abbr}</td>
                <td className="px-4 sm:px-6 py-3 text-sm text-stone-600">{term.full}</td>
                <td className="px-4 sm:px-6 py-3 text-sm text-stone-800">{term.cn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-center text-xs text-stone-300">
        更多术语将陆续添加。
      </p>
    </div>
  );
}
