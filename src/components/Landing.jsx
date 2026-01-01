import { motion } from 'framer-motion'
import CrystalBallBackground from './CrystalBallBackground'

const Landing = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <CrystalBallBackground />
      
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
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light mb-2 md:mb-4 text-gradient leading-tight tracking-wider" style={{ letterSpacing: '0.1em' }}>
            星际占卜
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-light text-gradient-purple leading-tight tracking-wide" style={{ letterSpacing: '0.08em' }}>
            灵魂伴侣预言
          </h2>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-200 mb-8 md:mb-12 font-light px-2 tracking-wide"
          style={{ 
            textShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
            letterSpacing: '0.05em'
          }}
        >
          通过星辰之力，窥探你的命中注定
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <motion.button
            onClick={() => onStart('soulmate')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-light rounded-full bg-white/10 backdrop-blur-xl text-white glow-effect overflow-hidden group border border-white/20 w-full sm:w-auto"
            style={{
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05)',
              letterSpacing: '0.1em'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <span>开启占卜</span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'linear'
              }}
            />
          </motion.button>

          <motion.button
            onClick={() => onStart('personality')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative px-8 sm:px-10 md:px-12 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-light rounded-full bg-white/10 backdrop-blur-xl text-white glow-effect-purple overflow-hidden group border border-white/20 w-full sm:w-auto"
            style={{
              boxShadow: '0 0 30px rgba(139, 92, 246, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05)',
              letterSpacing: '0.1em'
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
              <span>性格心理分析</span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                repeat: Infinity,
                duration: 3,
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

