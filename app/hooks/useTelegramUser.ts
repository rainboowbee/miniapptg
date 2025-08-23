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

export function useTelegramUser() {
  const [telegramUser, setTelegramUser] = useState<TelegramUserData | null>(null)
  const [isCheckingAccess, setIsCheckingAccess] = useState(true)
  const queryClient = useQueryClient()
  const hasAttemptedCreate = useRef(false)
  const createTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const errorCountRef = useRef(0)
  const maxRetries = 3
  
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

  // Инициализируем Telegram Web App при загрузке
  useEffect(() => {
    console.log('🔧 Initializing Telegram Web App...')
    initTelegramWebApp()
    
    const user = getTelegramUser()
    console.log('👤 Telegram user data:', user)
    
    if (user) {
      const userData = {
        telegramId: user.id.toString(),
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.photo_url,
      }
      console.log('📝 Setting telegram user data:', userData)
      setTelegramUser(userData)
    } else {
      console.log('❌ No Telegram user data found')
    }
    
    // Завершаем проверку доступа
    setTimeout(() => {
      console.log('✅ Access check completed')
      setIsCheckingAccess(false)
    }, 1000)
  }, [])

  // Получаем пользователя из БД
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', telegramUser?.telegramId],
    queryFn: async (): Promise<User> => {
      if (!telegramUser?.telegramId) {
        console.log('❌ No telegramId for query')
        throw new Error('No Telegram user data')
      }
      
      console.log('🔍 Fetching user from DB with telegramId:', telegramUser.telegramId)
      const response = await fetch(`/api/user?telegramId=${telegramUser.telegramId}`)
      if (!response.ok) {
        console.log('❌ Failed to fetch user, status:', response.status)
        throw new Error('Failed to fetch user')
      }
      const userData = await response.json()
      console.log('✅ User found in DB:', userData)
      return userData
    },
    enabled: !!telegramUser?.telegramId,
    retry: 2,
    retryDelay: 1000,
    staleTime: 30000, // Кешируем на 30 секунд
  })

  // Создаем или обновляем пользователя
  const createOrUpdateUser = useMutation({
    mutationFn: async (userData: TelegramUserData): Promise<User> => {
      console.log('🚀 Creating/updating user:', userData)
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.log('❌ Error response:', response.status, errorData)
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      console.log('✅ User created/updated successfully:', result)
      return result
    },
    onSuccess: () => {
      console.log('🎉 Mutation successful, updating cache...')
      // Обновляем кеш после успешного создания/обновления
      if (telegramUser?.telegramId) {
        queryClient.setQueryData(['user', telegramUser.telegramId], (oldData: any) => ({
          ...oldData,
          updatedAt: new Date().toISOString()
        }))
      }
      // Сбрасываем счетчик ошибок при успехе
      errorCountRef.current = 0
    },
    onError: (error) => {
      console.error('💥 Error creating/updating user:', error)
      errorCountRef.current++
      
      // Если слишком много ошибок, не пытаемся больше
      if (errorCountRef.current >= maxRetries) {
        console.warn('⚠️ Max retries reached, stopping attempts to create user')
        hasAttemptedCreate.current = true
      } else {
        // Сбрасываем флаг при ошибке, чтобы можно было попробовать снова
        hasAttemptedCreate.current = false
      }
    }
  })

  // Автоматически создаем/обновляем пользователя при получении данных из Telegram
  useEffect(() => {
    console.log('🔄 Checking if should create user:', {
      telegramUser: !!telegramUser,
      user: !!user,
      isLoading,
      isPending: createOrUpdateUser.isPending,
      hasAttempted: hasAttemptedCreate.current,
      errorCount: errorCountRef.current
    })
    
    if (telegramUser && !user && !isLoading && !createOrUpdateUser.isPending && !hasAttemptedCreate.current && errorCountRef.current < maxRetries) {
      console.log('⏰ Scheduling user creation...')
      // Добавляем небольшую задержку для предотвращения слишком частых запросов
      createTimeoutRef.current = setTimeout(() => {
        console.log('🎯 Executing user creation...')
        hasAttemptedCreate.current = true
        createOrUpdateUser.mutate(telegramUser)
      }, 1000) // Увеличиваем задержку до 1 секунды
    }
  }, [telegramUser, user, isLoading, createOrUpdateUser.isPending])

  // Проверяем, имеет ли пользователь доступ к профилю (админ)
  const hasProfileAccess = telegramUser?.telegramId === '1171820656'

  console.log('📊 Hook state:', {
    telegramUser,
    user,
    isLoading,
    error,
    isTelegramAvailable: !!telegramUser,
    isCheckingAccess,
    hasProfileAccess,
    isWalletConnected,
    walletAccount,
    balance,
  })

  return {
    telegramUser,
    user,
    isLoading,
    error,
    createOrUpdateUser,
    isTelegramAvailable: !!telegramUser,
    isCheckingAccess,
    hasProfileAccess,
    isWalletConnected,
    walletAccount,
    balance,
  }
}
