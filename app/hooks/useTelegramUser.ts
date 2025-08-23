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
        console.log('Initializing Telegram WebApp...')
        console.log('Window object:', typeof window !== 'undefined' ? 'available' : 'not available')
        console.log('User agent:', typeof window !== 'undefined' ? window.navigator.userAgent : 'N/A')
        
        // Проверяем, запущено ли приложение в Telegram
        if (typeof window !== 'undefined') {
          // Проверяем различные способы доступа к Telegram Web App
          const telegram = (window as any).Telegram
          console.log('Telegram object:', telegram)
          console.log('Telegram.WebApp:', telegram?.WebApp)
          console.log('Telegram.webapp:', telegram?.webapp)
          
          const webApp = telegram?.WebApp || telegram?.webapp
          
          if (webApp) {
            console.log('Telegram WebApp found:', webApp)
            
            // Инициализируем Web App
            if (typeof webApp.ready === 'function') {
              webApp.ready()
            }
            if (typeof webApp.expand === 'function') {
              webApp.expand()
            }
            
            // Получаем данные пользователя различными способами
            let userData = null
            
            // Способ 1: через initDataUnsafe.user
            if (webApp.initDataUnsafe?.user) {
              userData = webApp.initDataUnsafe.user
              console.log('User data from initDataUnsafe:', userData)
            }
            // Способ 2: через initData (если есть)
            else if (webApp.initData) {
              try {
                const initData = new URLSearchParams(webApp.initData)
                const userParam = initData.get('user')
                if (userParam) {
                  userData = JSON.parse(decodeURIComponent(userParam))
                  console.log('User data from initData:', userData)
                }
              } catch (e) {
                console.log('Could not parse initData:', e)
              }
            }
            // Способ 3: через window.Telegram.WebApp.initDataUnsafe.user
            else if ((window as any).Telegram?.WebApp?.initDataUnsafe?.user) {
              userData = (window as any).Telegram.WebApp.initDataUnsafe.user
              console.log('User data from window.Telegram.WebApp:', userData)
            }
            
            if (userData) {
              setTelegramUser(userData)
              console.log('Telegram user data set:', userData)
            } else {
              console.log('No user data found, but WebApp is available')
              // Даже если нет данных пользователя, но WebApp доступен, считаем что мы в Telegram
              setTelegramUser({
                id: 0,
                first_name: 'Telegram User',
                last_name: '',
                username: '',
                photo_url: ''
              })
            }
          } else {
            // Проверяем URL параметры на наличие Telegram данных
            const urlParams = new URLSearchParams(window.location.search)
            const tgWebAppData = urlParams.get('tgWebAppData')
            const userParam = urlParams.get('user')
            
            // Также проверяем hash и полный URL
            const currentUrl = window.location.href
            const hasTelegramParams = currentUrl.includes('tgWebAppData') || 
                                    currentUrl.includes('tgWebApp') || 
                                    currentUrl.includes('telegram') ||
                                    tgWebAppData || 
                                    userParam
            
            console.log('Current URL:', currentUrl)
            console.log('URL params:', { tgWebAppData, userParam })
            console.log('Has Telegram params:', hasTelegramParams)
            
            if (hasTelegramParams) {
              console.log('Telegram data found in URL')
              // Если есть параметры Telegram в URL, считаем что мы в Telegram
              setTelegramUser({
                id: 0,
                first_name: 'Telegram User',
                last_name: '',
                username: '',
                photo_url: ''
              })
            } else {
              console.log('Telegram WebApp not found and no URL params')
              
              // В режиме разработки создаем тестового пользователя
              if (process.env.NODE_ENV === 'development') {
                console.log('Development mode: creating test user')
                setTelegramUser({
                  id: 123456789,
                  first_name: 'Test User',
                  last_name: 'Development',
                  username: 'testuser',
                  photo_url: ''
                })
              } else {
                setError('Telegram WebApp not available')
              }
            }
          }
        }
      } catch (err) {
        console.error('Error initializing Telegram:', err)
        setError('Failed to initialize Telegram')
      } finally {
        setIsLoading(false)
      }
    }

    // Добавляем небольшую задержку для инициализации
    const timer = setTimeout(initTelegram, 100)
    return () => clearTimeout(timer)
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
