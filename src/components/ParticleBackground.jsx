import { useEffect, useRef } from 'react'

const ParticleBackground = () => {
  const canvasRef = useRef(null)

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

    const particles = []
    const particleCount = 80 // 增加星星数量

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.3 - 0.15
        this.speedY = Math.random() * 0.3 - 0.15
        this.opacity = Math.random() * 0.6 + 0.3
        this.twinkleSpeed = Math.random() * 0.02 + 0.01
        this.twinklePhase = Math.random() * Math.PI * 2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.twinklePhase += this.twinkleSpeed

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw() {
        // 闪烁效果
        const twinkle = (Math.sin(this.twinklePhase) + 1) / 2
        const currentOpacity = this.opacity * (0.5 + twinkle * 0.5)
        
        // 星星效果 - 使用金色和紫色
        const colors = [
          `rgba(255, 215, 0, ${currentOpacity})`, // 金色
          `rgba(255, 223, 0, ${currentOpacity})`, // 亮金色
          `rgba(138, 43, 226, ${currentOpacity})`, // 紫色
          `rgba(147, 51, 234, ${currentOpacity})`, // 亮紫色
        ]
        const color = colors[Math.floor(Math.random() * colors.length)]
        
        ctx.fillStyle = color
        ctx.shadowBlur = 10
        ctx.shadowColor = color
        
        // 绘制星星形状
        this.drawStar(this.x, this.y, this.size, this.size * 0.5, 5)
        
        ctx.shadowBlur = 0
      }
      
      drawStar(x, y, outerRadius, innerRadius, points) {
        ctx.beginPath()
        for (let i = 0; i < points * 2; i++) {
          const radius = i % 2 === 0 ? outerRadius : innerRadius
          const angle = (i * Math.PI) / points - Math.PI / 2
          const px = x + radius * Math.cos(angle)
          const py = y + radius * Math.sin(angle)
          if (i === 0) {
            ctx.moveTo(px, py)
          } else {
            ctx.lineTo(px, py)
          }
        }
        ctx.closePath()
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // 连接附近的粒子
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = 0.15 * (1 - distance / 120)
            ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.shadowBlur = 5
            ctx.shadowColor = 'rgba(255, 215, 0, 0.3)'
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.shadowBlur = 0
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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
}

export default ParticleBackground

