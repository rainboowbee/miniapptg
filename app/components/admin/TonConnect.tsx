'use client'

import { useState } from 'react'

interface TonConnectProps {
  onClose: () => void
}

export function TonConnect({ onClose }: TonConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')

  const handleConnect = async () => {
    setIsConnecting(true)
    
    // Имитация подключения к TON кошельку
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
      setWalletAddress('EQD...' + Math.random().toString(36).substr(2, 8))
    }, 2000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWalletAddress('')
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4">
        {/* Заголовок */}
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

        {/* TON Логотип */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Подключение TON кошелька</h3>
          <p className="text-gray-300 text-sm">
            Подключите свой TON кошелек для управления приложением
          </p>
        </div>

        {/* Статус подключения */}
        {!isConnected ? (
          <div className="space-y-4">
            {/* Информация о TON */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-white font-medium">Преимущества подключения</span>
              </div>
              <ul className="text-gray-300 text-sm space-y-2">
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Безопасные транзакции</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Управление токенами</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Децентрализованное управление</span>
                </li>
              </ul>
            </div>

            {/* Кнопка подключения */}
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Подключение...</span>
                </div>
              ) : (
                'Подключить TON кошелек'
              )}
            </button>

            {/* Альтернативные варианты */}
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">Или используйте</p>
              <div className="flex space-x-3 justify-center">
                <button className="p-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </button>
                <button className="p-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </button>
                <button className="p-3 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Успешное подключение */}
            <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-green-400 font-semibold mb-1">Кошелек подключен!</h4>
              <p className="text-green-300 text-sm">TON кошелек успешно подключен к вашему профилю</p>
            </div>

            {/* Информация о кошельке */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 text-sm">Адрес кошелька:</span>
                <span className="text-white font-mono text-sm">{walletAddress}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Статус:</span>
                <span className="text-green-400 text-sm font-medium">Активен</span>
              </div>
            </div>

            {/* Действия */}
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
                <div className="text-center">
                  <svg className="w-5 h-5 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">История</span>
                </div>
              </button>
              <button className="p-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors">
                <div className="text-center">
                  <svg className="w-5 h-5 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.372-.836 2.942-2.106 2.106-2.106a1.533 1.533 0 01.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs">Настройки</span>
                </div>
              </button>
            </div>

            {/* Кнопка отключения */}
            <button
              onClick={handleDisconnect}
              className="w-full bg-red-500/20 border border-red-400/30 text-red-400 py-3 px-6 rounded-lg font-medium hover:bg-red-500/30 transition-colors"
            >
              Отключить кошелек
            </button>
          </div>
        )}

        {/* Информация о безопасности */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-xs">
            Ваши данные защищены криптографически. Приватные ключи никогда не покидают ваш кошелек.
          </p>
        </div>
      </div>
    </div>
  )
}
