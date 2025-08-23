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

export function useTelegramUser() {
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

  return {
    telegramUser,
    user,
    isLoading,
    error
  }
}
