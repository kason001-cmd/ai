import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RadarChart from './RadarChart'
import Poster from './Poster'
import { generatePoster } from '../utils/posterGenerator'

const Result = ({ result, onRestart }) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const posterRef = useRef(null)

  if (!result) return null

  const handleShare = async () => {
    if (!posterRef.current) {
      alert('无法生成海报，请刷新页面重试')
      return
    }

    setIsGenerating(true)
    try {
      // 等待图片加载完成（如果有图片）
      if (result.imageUrl) {
        await new Promise((resolve) => {
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.onload = () => resolve()
          img.onerror = () => resolve() // 即使加载失败也继续
          img.src = result.imageUrl
          // 设置超时，避免无限等待
          setTimeout(() => resolve(), 3000)
        })
      }

      const filename = `灵魂伴侣预测-${Date.now()}.png`
      await generatePoster(posterRef.current, filename)
      
      // 成功提示
      setTimeout(() => {
        setIsGenerating(false)
      }, 500)
    } catch (error) {
      console.error('生成海报失败:', error)
      let errorMessage = '生成海报失败'
      
      if (error.message && error.message.includes('html2canvas')) {
        errorMessage = '生成海报失败，请确保已安装html2canvas库：\nnpm install html2canvas'
      } else if (error.message) {
        errorMessage = `生成海报失败：${error.message}`
      }
      
      alert(errorMessage)
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen pt-2 sm:pt-4 pb-4 sm:pb-6 md:pb-8 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6"
        >
          {/* 左侧：AI 预测的长相图片 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="w-full md:aspect-[3/4] rounded-2xl bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-purple-500/20 border border-white/20 backdrop-blur-lg overflow-hidden flex flex-col" style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)', minHeight: '400px' }}>
              <div className="p-3 sm:p-4 border-b border-white/20">
                <h3 className="text-lg sm:text-xl font-light text-blue-200 mb-2 flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">🔮</span>
                  <span className="text-gradient">星辰画像</span>
                </h3>
              </div>
              <div className="flex-1 overflow-hidden">
                {result.imageUrl ? (
                  // 显示生成的图片
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="h-full relative"
                  >
                    <img
                      src={result.imageUrl}
                      alt="AI生成的灵魂伴侣画像"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('图片加载失败');
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <p className="text-blue-200 text-sm text-center font-light" style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}>
                        ✨ 命中注定 ✨
                      </p>
                    </div>
                  </motion.div>
                ) : result.imageDescription ? (
                  // 显示文本描述（降级方案）
                  <div className="h-full p-4 sm:p-6 overflow-y-auto">
                    <div className="space-y-3 sm:space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                      >
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-amber-400/20 rounded-full blur-2xl"></div>
                        <div className="relative bg-white/5 rounded-xl p-4 sm:p-6 border border-white-500/20">
                          <p className="text-blue-100 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                            {result.imageDescription}
                          </p>
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center pt-4"
                      >
                        <p className="text-blue-300 text-sm">
                          💭 根据星辰描述，在脑海中描绘 Ta 的模样
                        </p>
                      </motion.div>
                    </div>
                  </div>
                ) : (
                  // 无内容时的占位符
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                      >
                        <span className="text-6xl">🔮</span>
                      </motion.div>
                      <p className="text-blue-200 text-lg">星辰画像</p>
                      <p className="text-blue-300 text-sm mt-2">（等待占卜结果）</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* 右侧：分析面板 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* 称号卡片 */}
            <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 backdrop-blur-lg rounded-2xl p-3 sm:p-4 border border-white/20" style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' }}>
              <div className="text-center mb-1">
                <span className="text-xl sm:text-2xl">⭐</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-light text-gradient text-center mb-1 leading-tight tracking-wide" style={{ letterSpacing: '0.05em' }}>{result.title}</h2>
              <p className="text-blue-200 text-xs sm:text-sm text-center font-light">星辰预言</p>
            </div>

            {/* 匹配雷达图 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 sm:p-4 border border-white/20">
              <h3 className="text-base sm:text-lg font-light mb-3 sm:mb-4 text-blue-200 text-center tracking-wide" style={{ letterSpacing: '0.05em' }}>
                <span className="text-lg sm:text-xl mr-2">🔮</span>
                能量匹配度
              </h3>
              <div className="flex justify-center">
                <RadarChart data={result.radar} />
              </div>
            </div>

            {/* 性格解析 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 sm:p-4 border border-white/20">
              <h3 className="text-base sm:text-lg font-light mb-2 sm:mb-3 text-blue-200 tracking-wide" style={{ letterSpacing: '0.05em' }}>
                <span className="text-lg sm:text-xl mr-2">✨</span>
                灵魂解析
              </h3>
              <p className="text-blue-100 leading-relaxed text-xs sm:text-sm font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>{result.description}</p>
            </div>

            {/* 相遇小贴士 */}
            <div className="bg-gradient-to-r from-blue-500/30 to-indigo-500/30 backdrop-blur-lg rounded-2xl p-3 sm:p-4 border border-white/20" style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}>
              <h3 className="text-base sm:text-lg font-light mb-2 text-blue-200 tracking-wide" style={{ letterSpacing: '0.05em' }}>
                <span className="text-lg sm:text-xl mr-2">🌟</span>
                命运指引
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>{result.tip}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* 底部操作按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6"
        >
          <motion.button
            onClick={handleShare}
            disabled={isGenerating}
            whileHover={{ scale: isGenerating ? 1 : 1.05 }}
            whileTap={{ scale: isGenerating ? 1 : 0.95 }}
            className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white font-light transition-opacity glow-effect border border-white/30 text-sm sm:text-base tracking-wide ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {isGenerating ? '生成中...' : '保存分享海报'}
          </motion.button>
          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-white/10 text-blue-200 hover:bg-white/20 transition-all border border-white/20 text-sm sm:text-base font-light tracking-wide"
            style={{ letterSpacing: '0.05em' }}
          >
            重新测试
          </motion.button>
        </motion.div>

        {/* 免责声明 */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
            className="text-center text-blue-300 text-xs sm:text-sm font-light"
        >
          结果仅供娱乐，不构成任何科学依据
        </motion.p>
      </div>
    </div>
  )
}

export default Result

