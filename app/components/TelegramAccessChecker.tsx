'use client'

import { useTelegramUser } from '@/app/hooks/useTelegramUser'
import { useEffect, useState } from 'react'

import { ComingSoon } from './ComingSoon'
import { AdminPanel } from './AdminPanel'

export function TelegramAccessChecker() {
  const { 
    isTelegramAvailable, 
    isCheckingAccess, 
    hasProfileAccess, 
    isLoading, 
    error 
  } = useTelegramUser()
  
  const [hasRendered, setHasRendered] = useState(false)

  // Предотвращаем множественные рендеры
  useEffect(() => {
    if (!hasRendered) {
      setHasRendered(true)
    }
  }, [hasRendered])

  // Если еще не рендерили, показываем загрузку
  if (!hasRendered) {
    return (
      <div className="min-h-screen relative stars-bg flex items-center justify-center">
        <div className="text-center relative z-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Инициализация...</p>
        </div>
      </div>
    )
  }

  // Если приложение не запущено в Telegram - показываем Coming Soon
  if (!isTelegramAvailable) {
    return <ComingSoon />
  }

  // Если пользователь имеет ID 1171820656 - показываем админ-панель
  if (hasProfileAccess) {
    return <AdminPanel />
  }

  // Для всех остальных пользователей - показываем Coming Soon
  return <ComingSoon />
}
