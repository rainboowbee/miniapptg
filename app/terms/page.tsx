import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Условия использования - Telegram Mini App',
  description: 'Условия использования Telegram Mini App',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function TermsPage() {
  return (
    <div className="min-h-screen relative stars-bg p-4">
      <div className="max-w-4xl mx-auto pt-8 relative z-20">
        <h1 className="text-3xl font-bold text-white mb-8 animate-fade-in">
          Условия использования
        </h1>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Общие положения</h2>
            <p className="text-gray-300 mb-4">
              Настоящие условия использования регулируют использование Telegram Mini App, 
              разработанного с использованием Next.js 14 и TON Connect.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">2. Функциональность</h2>
            <p className="text-gray-300 mb-4">
              Приложение предоставляет доступ к функциям Telegram и интеграции с TON блокчейном.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">3. Безопасность</h2>
            <p className="text-gray-300 mb-4">
              Мы принимаем все необходимые меры для обеспечения безопасности ваших данных.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">4. Конфиденциальность</h2>
            <p className="text-gray-300 mb-4">
              Ваша конфиденциальность важна для нас. Подробности смотрите в политике конфиденциальности.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mb-4">5. Изменения</h2>
            <p className="text-gray-300 mb-4">
              Мы оставляем за собой право изменять эти условия в любое время.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
