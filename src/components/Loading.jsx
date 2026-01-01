import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Loading = () => {
  const [currentMessage, setCurrentMessage] = useState(0)

  const messages = [
    '🔮 正在连接星辰之力...',
    '⭐ 解读星座密码...',
    '✨ 绘制命运画像...',
    '🌟 分析灵魂频率...',
    '💫 计算命中注定...',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center w-full max-w-md">
        <motion.div
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mx-auto mb-8 sm:mb-10 md:mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 环形进度条 */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="rgba(255, 215, 0, 0.2)"
              strokeWidth="6"
              fill="none"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="40%"
              stroke="url(#gradient)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 5, ease: 'linear' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="50%" stopColor="#ffed4e" />
                <stop offset="100%" stopColor="#8a2be2" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* 中心内容 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-2/3 h-2/3 rounded-full bg-gradient-to-br from-yellow-500 via-amber-400 to-yellow-600 flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{
                boxShadow: '0 0 40px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)'
              }}
            >
              <div className="w-3/4 h-3/4 rounded-full bg-gray-900 flex items-center justify-center">
                <motion.div
                  className="text-3xl sm:text-4xl md:text-5xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔮
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gradient font-semibold px-2"
          >
            {messages[currentMessage]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Loading

