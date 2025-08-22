'use client'

import { useState, useEffect } from 'react'

export function ComingSoon() {
  const [useTgs, setUseTgs] = useState(true)
  const [imageError, setImageError] = useState(false)

  // Проверяем поддержку TGS формата
  useEffect(() => {
    // Простая проверка поддержки TGS
    const testTgsSupport = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        // Пытаемся загрузить TGS
        const img = new Image()
        img.onload = () => setUseTgs(true)
        img.onerror = () => setUseTgs(false)
        img.src = '/AnimatedSticker.tgs'
      }
    }
    
    testTgsSupport()
  }, [])

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className="min-h-screen relative stars-bg flex flex-col items-center justify-center">
      {/* Стикер по центру */}
      <div className="mb-8">
        <img 
          src={useTgs && !imageError ? "/AnimatedSticker.tgs" : "/sticker.svg"}
          alt="Coming Soon" 
          className="w-32 h-32 md:w-40 md:h-40"
          onError={handleImageError}
        />
      </div>
      
      {/* Текст Coming Soon */}
      <h1 className="text-4xl md:text-6xl font-bold text-white font-doto" style={{ fontFamily: 'Doto, system-ui, sans-serif' }}>
        Coming Soon
      </h1>
    </div>
  )
}
