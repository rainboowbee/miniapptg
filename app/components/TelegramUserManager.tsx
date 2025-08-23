'use client'

import { useTelegramUser } from '@/app/hooks/useTelegramUser'

export function TelegramUserManager() {
  const { telegramUser, user, isLoading, error } = useTelegramUser()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Initializing...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-2">Error</h1>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    )
  }

  if (!telegramUser) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-500 text-6xl mb-4">📱</div>
          <h1 className="text-2xl font-bold text-white mb-2">Telegram Required</h1>
          <p className="text-gray-300">This app must be opened from Telegram</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2">Welcome!</h1>
            <p className="text-gray-400">Your Telegram account has been connected</p>
          </div>

          {/* Информация о пользователе */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {telegramUser.photo_url && (
                <img 
                  src={telegramUser.photo_url} 
                  alt="Avatar" 
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h2 className="font-semibold">
                  {telegramUser.first_name} {telegramUser.last_name}
                </h2>
                {telegramUser.username && (
                  <p className="text-gray-400">@{telegramUser.username}</p>
                )}
              </div>
            </div>

            {/* Статус сохранения в БД */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Database Status</h3>
              {user ? (
                <div className="text-green-400">
                  ✅ User saved successfully
                  <div className="text-sm text-gray-400 mt-1">
                    ID: {user.id} | Created: {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ) : (
                <div className="text-yellow-400">
                  ⏳ Saving user to database...
                </div>
              )}
            </div>

            {/* Telegram ID */}
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Telegram ID</h3>
              <p className="font-mono text-blue-400">{telegramUser.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
