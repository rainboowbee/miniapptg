'use client'

import { useTelegramUser } from '@/app/hooks/useTelegramUser'

import { UserProfile } from './UserProfile'
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
