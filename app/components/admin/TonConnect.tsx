'use client'

import { useTonConnectUI } from '@tonconnect/ui-react'

interface TonConnectProps {
  onClose: () => void
}

export function TonConnect({ onClose }: TonConnectProps) {
  const [tonConnectUI] = useTonConnectUI()

  const handleConnect = async () => {
    try {
      await tonConnectUI.connectWallet()
    } catch (error) {
      console.error('Ошибка подключения TON кошелька:', error)
      // Можно добавить уведомление пользователю об ошибке
    }
  }

  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect()
    } catch (error) {
      console.error('Ошибка отключения TON кошелька:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">TON Connect</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* TON Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-2xl font-bold">TON</span>
          </div>
        </div>

        {/* Connection Status */}
        <div className="mb-6">
          <button
            onClick={handleConnect}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            Подключить TON кошелек
          </button>
        </div>

        {/* Information about connection */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-6">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-white font-medium">Статус подключения</span>
          </div>
          <p className="text-gray-300 text-sm">
            Нажмите кнопку выше для подключения TON кошелька. После подключения вы сможете управлять своими токенами и выполнять транзакции.
          </p>
        </div>

        {/* Information about TON */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-6">
          <h3 className="text-white font-medium mb-2">Преимущества TON:</h3>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Быстрые и дешевые транзакции</li>
            <li>• Высокая безопасность</li>
            <li>• Интеграция с Telegram</li>
            <li>• Поддержка смарт-контрактов</li>
          </ul>
        </div>

        {/* Information about security */}
        <div className="text-center">
          <p className="text-gray-400 text-xs">
            Ваши данные защищены криптографически. Приватные ключи никогда не покидают ваш кошелек.
          </p>
        </div>
      </div>
    </div>
  )
}
