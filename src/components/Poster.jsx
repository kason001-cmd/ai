import { forwardRef } from 'react'
import RadarChart from './RadarChart'

/**
 * 海报组件 - 用于生成分享海报
 * 这个组件会被隐藏，只在生成海报时使用
 */
const Poster = forwardRef(({ result }, ref) => {
  if (!result) return null

  // 海报尺寸：适合分享的比例（竖版，适合朋友圈等）
  // 手机端使用较小尺寸，桌面端使用完整尺寸
  const posterWidth = 1080
  const posterHeight = 1920

  return (
    <div
      ref={ref}
      className="fixed -left-[9999px] top-0"
      style={{
        width: `${posterWidth}px`,
        height: `${posterHeight}px`,
        backgroundColor: '#0a0a1a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 渐变背景 */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a0a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #1a0a2e 100%)',
        }}
      />

      {/* 背景装饰光效 - 金色和紫色星光 */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, transparent 70%)',
            top: '-200px',
            left: '-100px',
          }}
        />
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.6) 0%, transparent 70%)',
            bottom: '-150px',
            right: '-50px',
          }}
        />
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255, 223, 0, 0.4) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* 网格背景 */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      {/* 主要内容容器 */}
      <div className="relative z-10 h-full flex flex-col text-white" style={{ padding: '60px 40px' }}>
        {/* 顶部区域 */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="text-6xl mb-3">🔮</div>
            <div
              className="text-5xl font-black mb-2"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffa500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(255, 215, 0, 0.5)',
                letterSpacing: '2px',
              }}
            >
              星际占卜
            </div>
            <div
              className="text-4xl font-black mb-2"
              style={{
                background: 'linear-gradient(135deg, #e9d5ff 0%, #c084fc 50%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(138, 43, 226, 0.5)',
              }}
            >
              灵魂伴侣预言
            </div>
            <div
              className="h-1 mx-auto"
              style={{
                width: '120px',
                background: 'linear-gradient(90deg, transparent, #ffd700, #ffed4e, #ffd700, transparent)',
                borderRadius: '2px',
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
              }}
            />
          </div>
        </div>

          {/* 画像区域 - 更突出 */}
          {result.imageUrl && (
            <div className="mb-8 flex justify-center">
              <div
                className="relative"
                style={{
                  width: '400px',
                  height: '400px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 215, 0, 0.3)',
                  border: '4px solid rgba(255, 255, 255, 0.2)',
                }}
              >
              <img
                src={result.imageUrl}
                alt="AI生成的灵魂伴侣画像"
                crossOrigin="anonymous"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              {/* 图片装饰边框 */}
              <div
                className="absolute inset-0"
                style={{
                  border: '3px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '26px',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>
        )}

          {/* 称号 - 更醒目 */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-2">⭐</div>
            <div
              className="text-4xl font-bold mb-3 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffa500 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 30px rgba(255, 215, 0, 0.4)',
                padding: '0 20px',
              }}
            >
              {result.title}
            </div>
            <p className="text-yellow-300 text-lg">星辰预言</p>
          </div>

        {/* 内容卡片区域 - 两列布局 */}
        <div className="flex-1 grid grid-cols-2 gap-4 mb-6" style={{ minHeight: '500px' }}>
          {/* 左列：匹配度雷达图 */}
          <div
            className="rounded-3xl p-8"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 215, 0, 0.2)',
              boxShadow: '0 8px 32px rgba(255, 215, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
          >
            <h3
              className="text-xl font-bold mb-4 text-center"
              style={{
                color: '#ffd700',
                textShadow: '0 2px 10px rgba(255, 215, 0, 0.5)',
              }}
            >
              🔮 能量匹配度
            </h3>
            <div className="flex justify-center" style={{ minHeight: '240px' }}>
              <div style={{ width: '220px', height: '220px' }}>
                <RadarChart data={result.radar} />
              </div>
            </div>
          </div>

          {/* 右列：性格解析和相遇小贴士 */}
          <div className="flex flex-col gap-4">
            {/* 性格解析 */}
            <div
              className="flex-1 rounded-3xl p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 215, 0, 0.2)',
                boxShadow: '0 8px 32px rgba(255, 215, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  color: '#ffd700',
                  textShadow: '0 2px 10px rgba(255, 215, 0, 0.5)',
                }}
              >
                ✨ 灵魂解析
              </h3>
              <p
                className="leading-relaxed"
                style={{
                  color: '#f3e8ff',
                  fontSize: '16px',
                  lineHeight: '1.7',
                }}
              >
                {result.description}
              </p>
            </div>

            {/* 相遇小贴士 */}
            <div
              className="rounded-3xl p-6"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 193, 7, 0.2) 100%)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 215, 0, 0.3)',
                boxShadow: '0 8px 32px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <h3
                className="text-xl font-bold mb-3"
                style={{
                  color: '#ffd700',
                  textShadow: '0 2px 10px rgba(255, 215, 0, 0.5)',
                }}
              >
                🌟 命运指引
              </h3>
              <p
                className="leading-relaxed"
                style={{
                  color: '#fce7f3',
                  fontSize: '18px',
                  lineHeight: '1.7',
                  fontWeight: '500',
                }}
              >
                {result.tip}
              </p>
            </div>
          </div>
        </div>

        {/* 底部信息 */}
        <div
          className="text-center pt-4 border-t"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <p
            className="mb-2"
            style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '14px',
            }}
          >
            结果仅供娱乐，不构成任何科学依据
          </p>
          <p
            style={{
              color: 'rgba(255, 255, 255, 0.4)',
              fontSize: '12px',
            }}
          >
            ✨ AI 灵魂伴侣预测 ✨
          </p>
        </div>
      </div>
    </div>
  )
})

Poster.displayName = 'Poster'

export default Poster

