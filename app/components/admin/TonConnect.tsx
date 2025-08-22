'use client'

import { useTonWallet } from '@/app/hooks/useTonWallet'

interface TonConnectProps {
  onClose: () => void
}

export function TonConnect({ onClose }: TonConnectProps) {
  const {
    account,
    isConnected,
    balance,
    walletData,
    connect,
    disconnect,
    refetchBalance,
    isLoading,
  } = useTonWallet()

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-doto">TON Connect</h2>
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
        {!isConnected ? (
          <div className="mb-6">
            <button
              onClick={connect}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Подключение...' : 'Подключить TON кошелек'}
            </button>
          </div>
        ) : (
          <div className="mb-6 space-y-4">
            {/* Информация о кошельке */}
            <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-400 font-medium">Подключено</span>
              </div>
              <p className="text-white text-sm break-all mb-2">
                {account?.address ? formatAddress(account.address) : 'Адрес кошелька'}
              </p>
              {account?.chain && (
                <p className="text-gray-400 text-xs">
                  Сеть: {account.chain}
                </p>
              )}
            </div>

            {/* Баланс кошелька */}
            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-400 font-medium">Баланс:</span>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-bold text-lg">{balance || '0'} TON</span>
                  <button
                    onClick={() => refetchBalance()}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={disconnect}
              className="w-full bg-red-500/20 border border-red-500/30 text-red-400 py-2 px-4 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Отключить
            </button>
          </div>
        )}

        {/* Information about TON */}
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-6">
          <h3 className="text-white font-medium mb-2 font-doto">Преимущества TON:</h3>
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
