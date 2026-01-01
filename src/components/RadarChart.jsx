import { useEffect, useRef } from 'react'

const RadarChart = ({ data }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const size = Math.min(300, window.innerWidth - 64)
    canvas.width = size
    canvas.height = size

    const centerX = size / 2
    const centerY = size / 2
    const radius = size * 0.35
    const labels = Object.keys(data)
    const values = Object.values(data)
    const maxValue = 100

    // 清空画布
    ctx.clearRect(0, 0, size, size)

    // 绘制网格线
    ctx.strokeStyle = 'rgba(167, 139, 250, 0.2)'
    ctx.lineWidth = 1
    
    // 绘制同心圆
    for (let i = 1; i <= 5; i++) {
      ctx.beginPath()
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, Math.PI * 2)
      ctx.stroke()
    }

    // 绘制轴线
    labels.forEach((_, index) => {
      const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    })

    // 绘制数据区域
    ctx.fillStyle = 'rgba(139, 92, 246, 0.3)'
    ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)'
    ctx.lineWidth = 2
    ctx.beginPath()

    labels.forEach((_, index) => {
      const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2
      const value = values[index]
      const distance = (value / maxValue) * radius
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // 绘制数据点
    ctx.fillStyle = 'rgba(236, 72, 153, 0.8)'
    labels.forEach((_, index) => {
      const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2
      const value = values[index]
      const distance = (value / maxValue) * radius
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + Math.sin(angle) * distance

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
    })

    // 绘制标签
    ctx.fillStyle = 'rgba(196, 181, 253, 0.9)'
    ctx.font = '14px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    labels.forEach((label, index) => {
      const angle = (Math.PI * 2 * index) / labels.length - Math.PI / 2
      const labelDistance = radius + 30
      const x = centerX + Math.cos(angle) * labelDistance
      const y = centerY + Math.sin(angle) * labelDistance

      ctx.fillText(label, x, y)
    })
  }, [data])

  return (
    <div className="flex justify-center">
      <canvas ref={canvasRef} className="max-w-full" />
    </div>
  )
}

export default RadarChart

