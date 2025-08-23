'use client'

import { useState, useEffect, useRef } from 'react'
import Lottie from 'lottie-react'

// Динамический импорт анимации с fallback
let animationData: any = null

export function ComingSoon() {
  const [animationError, setAnimationError] = useState(false)
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false)
  const hasLoadedAnimation = useRef(false)

  useEffect(() => {
    // Загружаем анимацию только один раз
    if (!hasLoadedAnimation.current) {
      hasLoadedAnimation.current = true
      
      import('@/src/assets/AnimatedSticker.json')
        .then((data) => {
          animationData = data.default
          setIsAnimationLoaded(true)
        })
        .catch(() => {
          setAnimationError(true)
        })
    }
  }, [])

  return (
    <div className="min-h-screen relative stars-bg flex flex-col items-center justify-center">
      {/* Стикер по центру */}
      <div className="mb-8">
        {!animationError && isAnimationLoaded && animationData ? (
          <div className="w-32 h-32">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ) : (
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Описание */}
      <div className="text-center mb-12 relative z-20 max-w-2xl mx-auto px-4">
        <p className="text-lg text-gray-400 animate-fade-in font-doto" style={{ animationDelay: '0.2s' }}>
          Coming soon...
        </p>
      </div>

    </div>
  )
}
