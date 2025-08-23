import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности - Telegram Mini App',
  description: 'Политика конфиденциальности Telegram Mini App',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen relative stars-bg p-4">
      <div className="max-w-4xl mx-auto pt-8 relative z-20">
        <h1 className="text-3xl font-bold text-white mb-8 animate-fade-in font-doto">
          Политика конфиденциальности
        </h1>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Сбор информации</h2>
            <p className="text-gray-300 mb-4">
              Мы собираем только ту информацию, которую вы предоставляете через Telegram, 
              включая ваш Telegram ID, имя пользователя и аватар.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">2. Использование информации</h2>
            <p className="text-gray-300 mb-4">
              Собранная информация используется исключительно для предоставления 
              функциональности приложения и улучшения пользовательского опыта.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">3. Защита данных</h2>
            <p className="text-gray-300 mb-4">
              Мы используем современные методы шифрования и безопасности для защиты ваших данных.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">4. Передача данных</h2>
            <p className="text-gray-300 mb-4">
              Мы не передаем ваши персональные данные третьим лицам без вашего согласия.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">5. Права пользователей</h2>
            <p className="text-gray-300 mb-4">
              Вы имеете право на доступ, исправление и удаление ваших персональных данных.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">6. Контакты</h2>
            <p className="text-gray-300 mb-4">
              По вопросам конфиденциальности обращайтесь к администратору приложения.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
