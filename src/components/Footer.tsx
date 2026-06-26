/**
 * 全局页脚
 *
 * 极简页脚：版权信息 + 平台名称
 */
export default function Footer() {
  return (
    <footer className="w-full border-t border-stone-200/40 bg-white/50">
      <div className="max-w-6xl mx-auto flex items-center justify-center py-6 px-5 sm:px-8">
        <p className="text-sm text-stone-400">
          &copy; {new Date().getFullYear()} SEM One. 扫描电子显微镜知识平台。
        </p>
      </div>
    </footer>
  );
}
