'use client'

export function ComingSoon() {
  return (
    <div className="min-h-screen relative stars-bg flex flex-col items-center justify-center">
      {/* Стикер по центру */}
      <div className="mb-8">
        <img 
          src="AnimatedSticker.tgs" 
          alt="Coming Soon" 
          className="w-32 h-32 md:w-40 md:h-40"
        />
      </div>
      
                   {/* Текст Coming Soon */}
             <h1 className="text-4xl md:text-6xl font-bold text-white font-doto" style={{ fontFamily: 'Doto, system-ui, sans-serif' }}>
               Coming Soon
             </h1>
    </div>
  )
}
