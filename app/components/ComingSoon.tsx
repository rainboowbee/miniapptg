'use client'

export function ComingSoon() {
  return (
    <div className="min-h-screen relative stars-bg flex items-center justify-center">
      <div className="text-center z-10 max-w-md mx-auto px-6">
        <div className="mb-8 animate-fade-in">
          {/* Стикер по центру */}
          <div className="w-32 h-32 mx-auto mb-6">
            <img 
              src="/sticker.svg" 
              alt="Coming Soon Sticker" 
              className="w-full h-full drop-shadow-2xl"
            />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-4 animate-slide-up">
          Coming Soon
        </h1>
        
        <p className="text-gray-300 text-lg mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Мы работаем над чем-то удивительным для вас!
        </p>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-200 text-sm">
            Приложение находится в разработке. Скоро здесь появится что-то интересное!
          </p>
        </div>
        
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex items-center space-x-2 text-telegram-400">
            <div className="w-2 h-2 bg-telegram-400 rounded-full animate-pulse"></div>
            <span className="text-sm">В разработке</span>
            <div className="w-2 h-2 bg-telegram-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
