import { motion } from 'framer-motion'
import CrystalBallBackground from './CrystalBallBackground'

const PersonalityResult = ({ result, onRestart }) => {
  if (!result) {
    return null
  }

  return (
    <div className="relative min-h-screen overflow-hidden py-6 sm:py-8">
      <CrystalBallBackground />
      
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-light mb-2 sm:mb-3 text-gradient tracking-wide" style={{ letterSpacing: '0.08em' }}>
            性格心理分析报告
          </h1>
        </motion.div>

        {/* 主要内容卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 sm:p-8 md:p-10 mb-6"
          style={{
            boxShadow: '0 0 50px rgba(59, 130, 246, 0.2), inset 0 0 30px rgba(139, 92, 246, 0.1)'
          }}
        >
          {/* 性格特点 */}
          {result.personalityTraits && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-light text-blue-300 mb-4 tracking-wide" style={{ letterSpacing: '0.05em' }}>
                性格特点
              </h2>
              <div className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10">
                <p className="text-blue-100 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>
                  {result.personalityTraits}
                </p>
              </div>
            </div>
          )}

          {/* 心理状态 */}
          {result.mentalState && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-light text-blue-300 mb-4 tracking-wide" style={{ letterSpacing: '0.05em' }}>
                心理状态
              </h2>
              <div className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10">
                <p className="text-blue-100 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>
                  {result.mentalState}
                </p>
              </div>
            </div>
          )}

          {/* 建议 */}
          {result.suggestions && (
            <div className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-light text-blue-300 mb-4 tracking-wide" style={{ letterSpacing: '0.05em' }}>
                建议与指导
              </h2>
              <div className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10">
                <p className="text-blue-100 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>
                  {result.suggestions}
                </p>
              </div>
            </div>
          )}

          {/* 总结 */}
          {result.summary && (
            <div>
              <h2 className="text-xl sm:text-2xl font-light text-blue-300 mb-4 tracking-wide" style={{ letterSpacing: '0.05em' }}>
                总结
              </h2>
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 sm:p-5 border border-blue-500/30">
                <p className="text-blue-100 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>
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
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/10 text-blue-200 hover:bg-white/20 transition-all border border-white/20 text-sm sm:text-base font-light"
            style={{ letterSpacing: '0.1em' }}
          >
            重新分析
          </motion.button>
        </motion.div>

        {/* 免责声明 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-6 sm:mt-8 text-xs sm:text-sm text-blue-300/60 px-4 font-light"
        >
          ⚠️ 本分析结果仅供参考，不构成专业心理诊断
        </motion.p>
      </motion.div>
    </div>
  )
}

export default PersonalityResult

