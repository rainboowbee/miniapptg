'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTelegramUser, initTelegramWebApp } from '@/lib/telegram'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useTonWallet } from './useTonWallet'

interface TelegramUserData {
  telegramId: string
  username?: string
  firstName?: string
  lastName?: string
  avatar?: string
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

// Функция дебаунсинга
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useTelegramUser() {
  const [telegramUser, setTelegramUser] = useState<TelegramUserData | null>(null)
  const [isCheckingAccess, setIsCheckingAccess] = useState(true)
  const queryClient = useQueryClient()
  const hasAttemptedCreate = useRef(false)
  const createTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const errorCountRef = useRef(0)
  const maxRetries = 3
  const initializedRef = useRef(false)
  
  // Дебаунсим telegramUser для предотвращения частых API вызовов
  const debouncedTelegramUser = useDebounce(telegramUser, 500)
  
  // Инициализируем TON кошелек только на клиенте
  const tonWallet = typeof window !== 'undefined' ? useTonWallet() : null
  const { account: walletAccount, isConnected: isWalletConnected, balance } = tonWallet || { account: null, isConnected: false, balance: null }

  // Очищаем таймаут при размонтировании
  useEffect(() => {
    return () => {
      if (createTimeoutRef.current) {
        clearTimeout(createTimeoutRef.current)
      }
    }
  }, [])

  // Инициализируем Telegram Web App при загрузке (только один раз)
  useEffect(() => {
    if (initializedRef.current) return
    
    initTelegramWebApp()
    
    const user = getTelegramUser()
    if (user) {
      const userData = {
        telegramId: user.id.toString(),
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.photo_url,
      }
      setTelegramUser(userData)
    }
    
    // Завершаем проверку доступа
    setTimeout(() => {
      setIsCheckingAccess(false)
      initializedRef.current = true
    }, 1000)
  }, [])

  // Получаем пользователя из БД (только когда есть telegramUser)
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', debouncedTelegramUser?.telegramId],
    queryFn: async (): Promise<User> => {
      if (!debouncedTelegramUser?.telegramId) {
        throw new Error('No Telegram user data')
      }
      
      const response = await fetch(`/api/user?telegramId=${debouncedTelegramUser.telegramId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      return response.json()
    },
    enabled: !!debouncedTelegramUser?.telegramId && !hasAttemptedCreate.current,
    retry: 1,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // Кешируем на 5 минут
    gcTime: 10 * 60 * 1000, // Храним в памяти 10 минут
  })

  // Создаем или обновляем пользователя
  const createOrUpdateUser = useMutation({
    mutationFn: async (userData: TelegramUserData): Promise<User> => {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      return response.json()
    },
    onSuccess: (newUser) => {
      // Обновляем кеш после успешного создания/обновления
      if (debouncedTelegramUser?.telegramId) {
        queryClient.setQueryData(['user', debouncedTelegramUser.telegramId], newUser)
      }
      // Сбрасываем счетчик ошибок при успехе
      errorCountRef.current = 0
      hasAttemptedCreate.current = true
    },
    onError: (error) => {
      console.error('Error creating/updating user:', error)
      errorCountRef.current++
      
      // Если слишком много ошибок, не пытаемся больше
      if (errorCountRef.current >= maxRetries) {
        hasAttemptedCreate.current = true
      }
    }
  })

  // Автоматически создаем пользователя только один раз при первом получении данных
  useEffect(() => {
    if (
      debouncedTelegramUser && 
      !user && 
      !isLoading && 
      !createOrUpdateUser.isPending && 
      !hasAttemptedCreate.current && 
      errorCountRef.current < maxRetries &&
      initializedRef.current
    ) {
      // Добавляем небольшую задержку для предотвращения слишком частых запросов
      createTimeoutRef.current = setTimeout(() => {
        hasAttemptedCreate.current = true
        createOrUpdateUser.mutate(debouncedTelegramUser)
      }, 2000) // Увеличиваем задержку до 2 секунд
    }
  }, [debouncedTelegramUser, user, isLoading, createOrUpdateUser.isPending])

  // Проверяем, имеет ли пользователь доступ к профилю (админ)
  const hasProfileAccess = debouncedTelegramUser?.telegramId === '1171820656'

  return {
    telegramUser: debouncedTelegramUser,
    user,
    isLoading,
    error,
    createOrUpdateUser,
    isTelegramAvailable: !!debouncedTelegramUser,
    isCheckingAccess,
    hasProfileAccess,
    isWalletConnected,
    walletAccount,
    balance,
  }
}
