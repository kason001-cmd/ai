import { useState } from 'react'
import Landing from './components/Landing'
import InputForm from './components/InputForm'
import Loading from './components/Loading'
import Result from './components/Result'
import PersonalityAnalysis from './components/PersonalityAnalysis'
import PersonalityResult from './components/PersonalityResult'
import { generateAIResult, analyzePersonality } from './services/aiService'

function App() {
  const [currentStep, setCurrentStep] = useState('landing')
  const [formData, setFormData] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [analysisMode, setAnalysisMode] = useState(null) // 'soulmate' 或 'personality'

  const handleStart = (mode = 'soulmate') => {
    setAnalysisMode(mode)
    if (mode === 'personality') {
      setCurrentStep('personality-input')
    } else {
      setCurrentStep('input')
    }
    setError(null)
  }

  const handleSubmit = async (data) => {
    setFormData(data)
    setCurrentStep('loading')
    setError(null)
    
    try {
      // 调用AI API生成分析结果
      const aiResult = await generateAIResult(data)
      setResult(aiResult)
      setCurrentStep('result')
    } catch (err) {
      console.error('分析失败:', err)
      // generateAIResult 内部已有降级处理，应该总是返回结果
      // 但如果真的出现异常，使用模拟数据作为最后保障
      try {
        const fallbackResult = await generateAIResult(data)
        setResult(fallbackResult)
        setCurrentStep('result')
        setError('使用备用方案生成结果')
      } catch (fallbackErr) {
        console.error('备用方案也失败:', fallbackErr)
        setError('分析过程中出现错误，请稍后重试')
        setCurrentStep('input')
      }
    }
  }

  const handlePersonalitySubmit = async (userText) => {
    setCurrentStep('loading')
    setError(null)
    
    try {
      // 调用AI API分析性格心理
      const analysisResult = await analyzePersonality(userText)
      setResult(analysisResult)
      setCurrentStep('personality-result')
    } catch (err) {
      console.error('分析失败:', err)
      // analyzePersonality 内部已有降级处理，应该总是返回结果
      try {
        const fallbackResult = await analyzePersonality(userText)
        setResult(fallbackResult)
        setCurrentStep('personality-result')
        setError('使用备用方案生成结果')
      } catch (fallbackErr) {
        console.error('备用方案也失败:', fallbackErr)
        setError('分析过程中出现错误，请稍后重试')
        setCurrentStep('personality-input')
      }
    }
  }

  const handleRestart = () => {
    setCurrentStep('landing')
    setFormData(null)
    setResult(null)
    setError(null)
    setAnalysisMode(null)
  }

  return (
    <div className="min-h-screen">
      {currentStep === 'landing' && <Landing onStart={handleStart} />}
      {currentStep === 'input' && (
        <>
          <InputForm onSubmit={handleSubmit} />
          {error && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg">
                {error}
              </div>
            </div>
          )}
        </>
      )}
      {currentStep === 'personality-input' && (
        <>
          <PersonalityAnalysis onSubmit={handlePersonalitySubmit} />
          {error && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-red-500/90 text-white px-6 py-3 rounded-lg shadow-lg">
                {error}
              </div>
            </div>
          )}
        </>
      )}
      {currentStep === 'loading' && <Loading />}
      {currentStep === 'result' && <Result result={result} onRestart={handleRestart} />}
      {currentStep === 'personality-result' && (
        <PersonalityResult result={result} onRestart={handleRestart} />
      )}
    </div>
  )
}

export default App

