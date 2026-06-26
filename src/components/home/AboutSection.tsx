/**
 * 首页网站介绍
 *
 * 说明 SEM One 的定位、目标用户和未来规划
 */

export default function AboutSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
      {/* 区域标题 */}
      <div className="text-center mb-8 sm:mb-10">
        <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
          关于 SEM One
        </h2>
      </div>

      {/* 介绍内容 — 三列 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 为什么建立 */}
        <div
          className="
            p-6
            bg-white border border-stone-200
            rounded-2xl
            text-center
          "
        >
          <div className="text-2xl mb-3">💡</div>
          <h3 className="text-sm font-semibold text-stone-800 mb-2">
            为什么建立 SEM One
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            扫描电子显微镜的学习资料分散在教材、论文和技术手册中，缺乏系统化的中文知识平台。SEM One 希望填补这个空白，让 SEM 知识触手可及。
          </p>
        </div>

        {/* 适合谁 */}
        <div
          className="
            p-6
            bg-white border border-stone-200
            rounded-2xl
            text-center
          "
        >
          <div className="text-2xl mb-3">👥</div>
          <h3 className="text-sm font-semibold text-stone-800 mb-2">
            适合哪些人
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            材料专业学生、SEM 初学者、科研人员、企业工程师——无论你是刚接触 SEM 还是想深入某个专题，这里都有适合你的内容。
          </p>
        </div>

        {/* 未来规划 */}
        <div
          className="
            p-6
            bg-white border border-stone-200
            rounded-2xl
            text-center
          "
        >
          <div className="text-2xl mb-3">🚀</div>
          <h3 className="text-sm font-semibold text-stone-800 mb-2">
            未来规划
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed">
            持续扩充知识库文章，增加交互式工具（参数计算器、模拟器），引入真实 SEM 图像案例库，建设社区共建的知识生态。
          </p>
        </div>
      </div>
    </section>
  );
}
