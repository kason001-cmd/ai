import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

/**
 * 超现实主义背景组件
 * 包含：悬浮的巨型水晶球、星云流转、未来城市缩影
 */
const CrystalBallBackground = () => {
  const canvasRef = useRef(null)
  const crystalRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 星云粒子
    const nebulaParticles = []
    const particleCount = 150

    class NebulaParticle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.4 + 0.2
        this.color = Math.random() > 0.5 
          ? `rgba(59, 130, 246, ${this.opacity})` // 蓝色
          : `rgba(139, 92, 246, ${this.opacity})` // 紫色
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx.fillStyle = this.color
        ctx.shadowBlur = 15
        ctx.shadowColor = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    for (let i = 0; i < particleCount; i++) {
      nebulaParticles.push(new NebulaParticle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 绘制星云流转效果
      nebulaParticles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // 连接附近的粒子形成星云
      nebulaParticles.forEach((particle, i) => {
        nebulaParticles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            const opacity = 0.1 * (1 - distance / 150)
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            )
            gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
            gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`)
            
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" style={{ zIndex: 0 }}>
      {/* 星云流转画布 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      
      {/* 悬浮的巨型水晶球 */}
      <motion.div
        ref={crystalRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 'min(600px, 50vw)',
          height: 'min(600px, 50vw)',
          zIndex: 2,
          filter: 'blur(0.5px)',
        }}
        initial={{ opacity: 0, scale: 0.8, y: -50 }}
        animate={{ 
          opacity: 0.3,
          scale: [1, 1.05, 1],
          y: [-50, -60, -50],
          rotate: [0, 5, 0]
        }}
        transition={{
          opacity: { duration: 2 },
          scale: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 10, repeat: Infinity, ease: 'easeInOut' }
        }}
      >
        {/* 水晶球外层光晕 */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.4), rgba(139, 92, 246, 0.2), transparent 70%)',
            boxShadow: '0 0 100px rgba(59, 130, 246, 0.5), 0 0 200px rgba(139, 92, 246, 0.3)',
            filter: 'blur(20px)',
          }}
        />
        
        {/* 水晶球主体 */}
        <div
          className="absolute inset-0 rounded-full crystal-reflect"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1))',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 0 50px rgba(59, 130, 246, 0.3), 0 0 80px rgba(139, 92, 246, 0.4)',
          }}
        >
          {/* 水晶球内部 - 未来城市缩影 */}
          <div
            className="absolute inset-4 rounded-full overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(30, 58, 138, 0.4) 0%, rgba(55, 48, 163, 0.3) 50%, rgba(79, 70, 229, 0.2) 100%)',
            }}
          >
            {/* 简化的未来城市轮廓 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4">
              {/* 建筑物轮廓 */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="absolute bottom-0"
                  style={{
                    left: `${i * 18}%`,
                    width: '8%',
                    height: `${20 + Math.random() * 30}%`,
                    background: `linear-gradient(180deg, rgba(59, 130, 246, 0.6) 0%, rgba(139, 92, 246, 0.4) 100%)`,
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                    borderRadius: '2px 2px 0 0',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* 设计标注 - 右上角 */}
      <div className="absolute top-6 right-6 text-white font-light z-10" style={{ zIndex: 10 }}>
        <div className="text-right space-y-1">
          <div className="text-2xl sm:text-3xl font-light tracking-wider" style={{ letterSpacing: '0.15em' }}>
            ECLIPSE 22
          </div>
          <div className="text-xs sm:text-sm font-light opacity-80">
            RATED PG
          </div>
          <div className="text-lg sm:text-xl font-light mt-2">
            Galaxy .AI
          </div>
          <div className="text-xs sm:text-sm font-light opacity-70 mt-1 max-w-xs">
            For sequences of cosmic wonder and brief intense visuals
          </div>
        </div>
      </div>
      
      {/* 设计标注 - 左下角 */}
      <div className="absolute bottom-6 left-6 text-silver font-light z-10" style={{ zIndex: 10 }}>
        <div className="text-3xl sm:text-4xl md:text-5xl font-light tracking-widest" style={{ 
          letterSpacing: '0.2em',
          textShadow: '0 0 20px rgba(192, 192, 192, 0.5), 0 2px 4px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 200,
        }}>
          蓝色星迹
        </div>
      </div>
      
      {/* 设计标注 - 右下角 */}
      <div className="absolute bottom-6 right-6 text-white font-light z-10" style={{ zIndex: 10 }}>
        <div className="text-right space-y-2">
          <div className="text-2xl sm:text-3xl text-silver font-light tracking-wider" style={{ 
            letterSpacing: '0.15em',
            textShadow: '0 0 20px rgba(192, 192, 192, 0.5)',
          }}>
            COSMIC JOURNEY
          </div>
          <div className="text-xs sm:text-sm font-light opacity-80">
            Exploring worlds beyond imagination
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrystalBallBackground

