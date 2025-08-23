'use client'

import { useState, useEffect } from 'react'

interface TonConnectProps {
  onClose: () => void
}

export function TonConnect({ onClose }: TonConnectProps) {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)

  useEffect(() => {
    // Имитация подключения к TON Connect
    const timer = setTimeout(() => {
      setIsConnected(true)
      setAccount('EQD...abc123')
      setBalance('1.5 TON')
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

        {/* Content */}
        <div className="space-y-6">
          {/* Connection Status */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Статус подключения</span>
              <div className={`flex items-center space-x-2 ${isConnected ? 'text-green-400' : 'text-yellow-400'}`}>
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                <span className="text-sm font-medium">
                  {isConnected ? 'Подключено' : 'Подключение...'}
                </span>
              </div>
            </div>
          </div>

          {/* Account Info */}
          {isConnected && account && (
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Информация о кошельке</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Адрес:</span>
                  <span className="text-white font-mono text-sm">{account}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Баланс:</span>
                  <span className="text-white font-semibold">{balance}</span>
                </div>
              </div>
            </div>
          )}

          {/* TON Features */}
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h3 className="text-white font-medium mb-2">Преимущества TON:</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Быстрые транзакции
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Низкие комиссии
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Безопасность
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Масштабируемость
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex space-x-4">
            {!isConnected ? (
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                Подключить кошелек
              </button>
            ) : (
              <>
                <button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300">
                  Отправить TON
                </button>
                <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                  Получить TON
                </button>
              </>
            )}
          </div>

          {/* Disconnect */}
          {isConnected && (
            <button
              onClick={() => {
                setIsConnected(false)
                setAccount(null)
                setBalance(null)
              }}
              className="w-full bg-red-500/20 border border-red-400 text-red-400 py-3 px-6 rounded-lg font-semibold hover:bg-red-500/30 transition-all duration-300"
            >
              Отключить кошелек
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
