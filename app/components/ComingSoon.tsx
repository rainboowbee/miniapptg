'use client'

import { useState, useEffect } from 'react'
import Lottie from 'lottie-react'

// Динамический импорт анимации с fallback
let animationData: any = null

export function ComingSoon() {
  const [animationError, setAnimationError] = useState(false)
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false)

  useEffect(() => {
    // Динамически загружаем анимацию
    import('@/src/assets/AnimatedSticker.json')
      .then((data) => {
        animationData = data.default
        setIsAnimationLoaded(true)
      })
      .catch(() => {
        setAnimationError(true)
      })
  }, [])

  return (
    <div className="min-h-screen relative stars-bg flex flex-col items-center justify-center">
      {/* Стикер по центру */}
      <div className="mb-8">
        {!animationError && isAnimationLoaded && animationData ? (
          <Lottie 
            animationData={animationData} 
            loop={true} 
            autoplay={true} 
            style={{ width: 160, height: 160 }}
            onError={() => setAnimationError(true)}
          />
        ) : (
          <img 
            src="/sticker.svg" 
            alt="Coming Soon" 
            className="w-32 h-40 md:w-40 md:h-40"
          />
        )}
      </div>
      
      {/* Текст Coming Soon */}
      <h1 className="text-4xl md:text-6xl font-bold text-white font-doto" style={{ fontFamily: 'Doto, system-ui, sans-serif' }}>
        Coming Soon
      </h1>
    </div>
  )
}
