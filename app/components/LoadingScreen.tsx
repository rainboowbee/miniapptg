'use client'

export function LoadingScreen() {
  return (
    <div className="min-h-screen relative stars-bg flex items-center justify-center">
      <div className="text-center relative z-20">
        <div className="animate-pulse mb-6">
          <div className="w-20 h-20 mx-auto bg-telegram-500 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4 animate-fade-in">
          Проверка доступа...
        </h2>
        
        <div className="flex space-x-2 justify-center">
          <div className="w-3 h-3 bg-telegram-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-telegram-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-3 h-3 bg-telegram-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
        
        <p className="text-gray-300 mt-6 text-sm animate-fade-in">
          Определяем способ входа в приложение
        </p>
      </div>
    </div>
  )
}
