import { motion } from 'framer-motion'
import ParticleBackground from './ParticleBackground'

const Landing = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <div className="text-5xl md:text-6xl mb-3 md:mb-4">🔮</div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-2 md:mb-4 text-gradient leading-tight">
            星际占卜
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-gradient-purple leading-tight">
            灵魂伴侣预言
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-yellow-200 mb-8 md:mb-12 font-light px-2"
          style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.5)' }}
        >
          ✨ 通过星辰之力，窥探你的命中注定 ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <motion.button
            onClick={() => onStart('soulmate')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold rounded-full bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 text-gray-900 glow-effect overflow-hidden group border-2 border-yellow-300 w-full sm:w-auto"
            style={{
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">🌟</span>
              <span>开启占卜</span>
              <span className="text-xl sm:text-2xl">✨</span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'linear'
              }}
            />
          </motion.button>

          <motion.button
            onClick={() => onStart('personality')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 text-white glow-effect overflow-hidden group border-2 border-purple-300 w-full sm:w-auto"
            style={{
              boxShadow: '0 0 30px rgba(139, 69, 19, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.2)'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <span className="text-xl sm:text-2xl">🧠</span>
              <span>性格心理分析</span>
              <span className="text-xl sm:text-2xl">💭</span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-400 via-indigo-300 to-purple-500"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'linear'
              }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Landing

