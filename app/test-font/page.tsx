import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Тест шрифта - Telegram Mini App',
  description: 'Тестовая страница для проверки шрифта Doto',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function TestFontPage() {
  return (
    <div className="min-h-screen relative stars-bg p-8">
      <div className="max-w-4xl mx-auto relative z-20">
        <h1 className="text-4xl font-bold text-white mb-8 font-doto">
          Тест шрифта Doto
        </h1>
        
        <div className="space-y-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4 font-doto">Шрифт Doto (font-doto)</h2>
            <p className="text-lg text-gray-300 font-doto">
              Этот текст должен отображаться шрифтом Doto. Если вы видите стандартный системный шрифт, 
              значит шрифт Doto не загрузился.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4">Системный шрифт (без font-doto)</h2>
            <p className="text-lg text-gray-300">
              Этот текст отображается системным шрифтом для сравнения.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4 font-doto">Разные веса шрифта</h2>
            <p className="text-lg text-gray-300 font-doto font-normal mb-2">Normal weight (400)</p>
            <p className="text-lg text-gray-300 font-doto font-medium mb-2">Medium weight (500)</p>
            <p className="text-lg text-gray-300 font-doto font-semibold mb-2">Semibold weight (600)</p>
            <p className="text-lg text-gray-300 font-doto font-bold">Bold weight (700)</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-semibold text-white mb-4 font-doto">Проверка CSS переменной</h2>
            <p className="text-lg text-gray-300" style={{ fontFamily: 'var(--font-doto)' }}>
              Этот текст использует CSS переменную --font-doto
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
