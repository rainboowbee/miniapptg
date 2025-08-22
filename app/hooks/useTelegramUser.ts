'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getTelegramUser, initTelegramWebApp } from '@/lib/telegram'
import { useEffect, useState } from 'react'
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
  const { account: walletAccount, isConnected: isWalletConnected, balance } = useTonWallet()

  // Инициализируем Telegram Web App при загрузке
  useEffect(() => {
    initTelegramWebApp()
    
    const user = getTelegramUser()
    if (user) {
      setTelegramUser({
        telegramId: user.id.toString(),
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        avatar: user.photo_url,
      })
    }
    
    // Завершаем проверку доступа
    setTimeout(() => setIsCheckingAccess(false), 1000)
  }, [])

  // Получаем пользователя из БД
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', telegramUser?.telegramId],
    queryFn: async (): Promise<User> => {
      if (!telegramUser?.telegramId) {
        throw new Error('No Telegram user data')
      }
      
      const response = await fetch(`/api/user?telegramId=${telegramUser.telegramId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      return response.json()
    },
    enabled: !!telegramUser?.telegramId,
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
        throw new Error('Failed to create/update user')
      }
      
      return response.json()
    },
    onSuccess: () => {
      // Обновляем кеш после успешного создания/обновления
      queryClient.invalidateQueries({ queryKey: ['user', telegramUser?.telegramId] })
    },
  })

  // Автоматически создаем/обновляем пользователя при получении данных из Telegram
  useEffect(() => {
    if (telegramUser && !user && !isLoading) {
      createOrUpdateUser.mutate(telegramUser)
    }
  }, [telegramUser, user, isLoading, createOrUpdateUser])

  // Проверяем, имеет ли пользователь доступ к профилю (админ)
  const hasProfileAccess = telegramUser?.telegramId === '1171820656'

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
