'use client'

import { useEffect, useState } from 'react'

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
}

interface User {
  id: number
  telegramId: string
  username?: string
  firstName?: string
  lastName?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}

export function TelegramUserManager() {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Инициализация Telegram Web App
  useEffect(() => {
    const initTelegram = () => {
      try {
        // Проверяем, запущено ли приложение в Telegram
        if (typeof window !== 'undefined' && 'Telegram' in window && 'WebApp' in (window as any).Telegram) {
          const webApp = (window as any).Telegram.WebApp
          
          // Инициализируем Web App
          webApp.ready()
          webApp.expand()
          
          // Получаем данные пользователя
          const userData = webApp.initDataUnsafe?.user
          if (userData) {
            setTelegramUser(userData)
            console.log('Telegram user data:', userData)
          }
        }
      } catch (err) {
        console.error('Error initializing Telegram:', err)
        setError('Failed to initialize Telegram')
      } finally {
        setIsLoading(false)
      }
    }

    initTelegram()
  }, [])

  // Сохранение пользователя в БД
  useEffect(() => {
    if (!telegramUser) return

    const saveUser = async () => {
      try {
        const userData = {
          telegramId: telegramUser.id.toString(),
          username: telegramUser.username,
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          avatar: telegramUser.photo_url,
        }

        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })

        if (response.ok) {
          const savedUser = await response.json()
          setUser(savedUser)
          console.log('User saved successfully:', savedUser)
        } else {
          throw new Error('Failed to save user')
        }
      } catch (err) {
        console.error('Error saving user:', err)
        setError('Failed to save user to database')
      }
    }

    saveUser()
  }, [telegramUser])

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
