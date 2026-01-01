import { useState } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from './ParticleBackground'

const PersonalityAnalysis = ({ onSubmit }) => {
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) {
      return
    }
    setIsSubmitting(true)
    await onSubmit(text.trim())
    setIsSubmitting(false)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-purple-900/40 backdrop-blur-xl rounded-3xl border-2 border-yellow-500/30 shadow-2xl p-6 sm:p-8 md:p-10"
          style={{
            boxShadow: '0 0 50px rgba(255, 215, 0, 0.3), inset 0 0 30px rgba(139, 69, 19, 0.1)'
          }}
        >
          {/* 标题 */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🧠</div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-gradient">
              性格心理分析
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-yellow-200/80">
              ✨ 写下关于自己的话，让AI为你深度解析 ✨
            </p>
          </div>

          {/* 输入表单 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="personality-text" 
                className="block text-sm sm:text-base font-semibold text-yellow-200 mb-3"
              >
                <span className="text-yellow-400">💭</span> 请描述一下你自己
              </label>
              <textarea
                id="personality-text"
                value={text}
                onChange={(e) => {
                  const newText = e.target.value
                  if (newText.length <= 1000) {
                    setText(newText)
                  }
                }}
                placeholder="例如：我是一个比较内向的人，喜欢安静的环境，但有时候也会想要和朋友一起出去玩。最近工作压力比较大，感觉有点焦虑，但也在努力调整自己的心态..."
                rows={8}
                className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-black/40 border-2 border-yellow-500/30 rounded-xl text-yellow-100 placeholder-yellow-500/50 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all resize-none text-sm sm:text-base"
                style={{
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.3)'
                }}
              />
              <div className="mt-2 text-xs sm:text-sm text-yellow-300/60 text-right">
                {text.length} / 1000
              </div>
            </div>

            {/* 提示信息 */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-yellow-200/80 leading-relaxed">
                <span className="text-yellow-400">💡</span> 提示：你可以描述你的性格特点、情绪状态、生活状态、兴趣爱好、工作学习情况、人际关系等任何关于自己的内容。描述越详细，分析结果越准确。
              </p>
            </div>

            {/* 提交按钮 */}
            <motion.button
              type="submit"
              disabled={!text.trim() || isSubmitting}
              whileHover={{ scale: text.trim() && !isSubmitting ? 1.02 : 1 }}
              whileTap={{ scale: text.trim() && !isSubmitting ? 0.98 : 1 }}
              className={`w-full px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all ${
                text.trim() && !isSubmitting
                  ? 'bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 text-gray-900 glow-effect border-2 border-yellow-300 cursor-pointer'
                  : 'bg-gray-700/50 text-gray-400 border-2 border-gray-600/50 cursor-not-allowed'
              }`}
              style={
                text.trim() && !isSubmitting
                  ? {
                      boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)'
                    }
                  : {}
              }
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⏳</span>
                  <span>分析中...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span>🔮</span>
                  <span>开始分析</span>
                  <span>✨</span>
                </span>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default PersonalityAnalysis

