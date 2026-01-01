import { motion } from 'framer-motion'
import ParticleBackground from './ParticleBackground'

const PersonalityResult = ({ result, onRestart }) => {
  if (!result) {
    return null
  }

  return (
    <div className="relative min-h-screen overflow-hidden py-6 sm:py-8">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6"
      >
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔮</div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-gradient">
            性格心理分析报告
          </h1>
        </motion.div>

        {/* 主要内容卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl border-2 border-yellow-500/30 shadow-2xl p-6 sm:p-8 md:p-10 mb-6"
          style={{
            boxShadow: '0 0 50px rgba(255, 215, 0, 0.3), inset 0 0 30px rgba(139, 69, 19, 0.1)'
          }}
        >
          {/* 性格特点 */}
          {result.personalityTraits && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                <span>🌟</span>
                <span>性格特点</span>
              </h2>
              <div className="bg-black/30 rounded-xl p-4 sm:p-5 border border-yellow-500/20">
                <p className="text-yellow-100 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                  {result.personalityTraits}
                </p>
              </div>
            </div>
          )}

          {/* 心理状态 */}
          {result.mentalState && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                <span>💭</span>
                <span>心理状态</span>
              </h2>
              <div className="bg-black/30 rounded-xl p-4 sm:p-5 border border-yellow-500/20">
                <p className="text-yellow-100 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                  {result.mentalState}
                </p>
              </div>
            </div>
          )}

          {/* 建议 */}
          {result.suggestions && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                <span>💡</span>
                <span>建议与指导</span>
              </h2>
              <div className="bg-black/30 rounded-xl p-4 sm:p-5 border border-yellow-500/20">
                <p className="text-yellow-100 leading-relaxed text-sm sm:text-base whitespace-pre-wrap">
                  {result.suggestions}
                </p>
              </div>
            </div>
          )}

          {/* 总结 */}
          {result.summary && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-4 flex items-center gap-2">
                <span>✨</span>
                <span>总结</span>
              </h2>
              <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-xl p-4 sm:p-5 border border-yellow-500/30">
                <p className="text-yellow-100 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-medium">
                  {result.summary}
                </p>
              </div>
            </div>
          )}
        </motion.div>

        {/* 操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/10 text-yellow-200 hover:bg-white/20 transition-all border border-yellow-500/30 text-sm sm:text-base"
          >
            重新分析
          </motion.button>
        </motion.div>

        {/* 免责声明 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-yellow-300/60 px-4"
        >
          ⚠️ 本分析结果仅供参考，不构成专业心理诊断
        </motion.p>
      </motion.div>
    </div>
  )
}

export default PersonalityResult

