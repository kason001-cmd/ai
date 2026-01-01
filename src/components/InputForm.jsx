import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getZodiacSign } from '../utils/zodiac'

const InputForm = ({ onSubmit }) => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    gender: '',
    birthDate: '',
    zodiac: '',
    personality: {
      introvert: 50,
      emotional: 50,
    },
    keywords: [],
  })

  const zodiacSigns = [
    '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
    '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
  ]

  const keywordOptions = [
    '阳光', '知性', '幽默', '高冷', '温柔', '活泼',
    '成熟', '可爱', '优雅', '率真', '神秘', '开朗'
  ]

  const handleNext = () => {
    if (step === 1) {
      // 如果选择了生日但还没有星座，自动识别
      if (formData.birthDate && !formData.zodiac) {
        const zodiac = getZodiacSign(formData.birthDate);
        setFormData(prev => ({ ...prev, zodiac }));
      }
      if (formData.gender && formData.birthDate && formData.zodiac) {
        setStep(2)
      }
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handleSubmit = () => {
    if (formData.keywords.length > 0) {
      onSubmit(formData)
    }
  }

  const toggleKeyword = (keyword) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.includes(keyword)
        ? prev.keywords.filter(k => k !== keyword)
        : [...prev.keywords, keyword]
    }))
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-3 sm:px-4 py-6 sm:py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between mb-3 sm:mb-4 gap-1 sm:gap-0">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex-1 h-1.5 sm:h-2 mx-0.5 sm:mx-1 rounded-full transition-all ${
                  s <= step ? 'bg-yellow-500' : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
          <p className="text-center text-yellow-300 text-sm sm:text-base">
            {step === 1 && '🔮 占卜信息'}
            {step === 2 && '⭐ 性格能量'}
            {step === 3 && '✨ 理想特质'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-yellow-500/30"
            >
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🔮</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gradient">占卜信息收集</h2>
                <p className="text-yellow-200 text-xs sm:text-sm mt-2">请提供你的基本信息，让星辰指引方向</p>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <label className="block mb-2 sm:mb-3 text-yellow-200 text-sm sm:text-base">性别</label>
                  <div className="flex gap-2 sm:gap-4">
                    {['男', '女'].map((g) => (
                      <button
                        key={g}
                        onClick={() => setFormData(prev => ({ ...prev, gender: g }))}
                        className={`flex-1 py-3 sm:py-4 rounded-xl transition-all text-base sm:text-lg ${
                          formData.gender === g
                            ? 'bg-gradient-to-r from-yellow-600 to-amber-500 text-gray-900 font-bold glow-effect'
                            : 'bg-white/10 text-yellow-200 hover:bg-white/20 border border-yellow-500/30'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 sm:mb-3 text-yellow-200 text-sm sm:text-base">出生日期</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => {
                      const birthDate = e.target.value;
                      const zodiac = getZodiacSign(birthDate);
                      setFormData(prev => ({ ...prev, birthDate, zodiac }));
                    }}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-white/10 border border-yellow-500/30 text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 sm:mb-3 text-yellow-200 text-sm sm:text-base">星座</label>
                  <div className="w-full px-3 sm:px-4 py-3 sm:py-4 rounded-xl bg-white/10 border border-yellow-500/30 text-white flex items-center text-sm sm:text-base">
                    {formData.zodiac ? (
                      <span className="text-yellow-200 font-semibold">{formData.zodiac}</span>
                    ) : (
                      <span className="text-yellow-400">请先选择出生日期</span>
                    )}
                  </div>
                  {formData.zodiac && (
                    <p className="mt-2 text-xs sm:text-sm text-yellow-300">✨ 星辰已识别你的星座</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="w-full mt-6 sm:mt-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 text-gray-900 font-semibold hover:opacity-90 transition-opacity glow-effect border-2 border-yellow-300 text-base sm:text-lg"
              >
                下一步
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-yellow-500/30"
            >
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">⭐</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gradient">性格能量</h2>
                <p className="text-yellow-200 text-xs sm:text-sm mt-2">调整你的性格倾向，匹配星辰频率</p>
              </div>
              
              <div className="space-y-6 sm:space-y-8">
                <div>
                  <div className="flex justify-between mb-4">
                    <span className="text-yellow-200">内向</span>
                    <span className="text-yellow-200">外向</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.personality.introvert}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personality: { ...prev.personality, introvert: parseInt(e.target.value) }
                    }))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                  <div className="text-center mt-2 text-yellow-300 text-sm sm:text-base">
                    {formData.personality.introvert < 50 ? '内向' : '外向'} ({formData.personality.introvert}%)
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-4">
                    <span className="text-yellow-200">感性</span>
                    <span className="text-yellow-200">理性</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.personality.emotional}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personality: { ...prev.personality, emotional: parseInt(e.target.value) }
                    }))}
                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                  />
                  <div className="text-center mt-2 text-yellow-300 text-sm sm:text-base">
                    {formData.personality.emotional < 50 ? '感性' : '理性'} ({formData.personality.emotional}%)
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 rounded-xl bg-white/10 text-yellow-200 hover:bg-white/20 transition-all border border-yellow-500/30"
                >
                  上一步
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity"
                >
                  下一步
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-yellow-500/30"
            >
              <div className="text-center mb-8">
                <div className="text-4xl mb-3">✨</div>
                <h2 className="text-3xl font-bold text-gradient">理想特质</h2>
                <p className="text-yellow-200 text-sm mt-2">选择你理想中的 Ta 的特质（可多选）</p>
              </div>
              
                  <p className="text-center text-yellow-200 mb-6">选择你理想中的 Ta 的特质（可多选）</p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {keywordOptions.map(keyword => (
                  <button
                    key={keyword}
                    onClick={() => toggleKeyword(keyword)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full transition-all text-sm sm:text-base ${
                      formData.keywords.includes(keyword)
                        ? 'bg-gradient-to-r from-yellow-600 to-amber-500 text-gray-900 font-semibold glow-effect border-2 border-yellow-300'
                        : 'bg-white/10 text-yellow-200 hover:bg-white/20 border border-yellow-500/30'
                    }`}
                  >
                    {keyword}
                  </button>
                ))}
              </div>

              <div className="flex gap-3 sm:gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 sm:py-4 rounded-xl bg-white/10 text-yellow-200 hover:bg-white/20 transition-all border border-yellow-500/30 text-sm sm:text-base"
                >
                  上一步
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={formData.keywords.length === 0}
                  className={`flex-1 py-3 sm:py-4 rounded-xl font-semibold transition-opacity text-sm sm:text-base ${
                    formData.keywords.length === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-400 text-gray-900 hover:opacity-90 glow-effect border-2 border-yellow-300'
                  }`}
                >
                  🔮 开始占卜
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default InputForm

