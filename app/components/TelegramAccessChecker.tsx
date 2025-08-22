'use client'

import { useTelegramUser } from '@/app/hooks/useTelegramUser'
import { LoadingScreen } from './LoadingScreen'
import { UserProfile } from './UserProfile'
import { ComingSoon } from './ComingSoon'

export function TelegramAccessChecker() {
  const { 
    isTelegramAvailable, 
    isCheckingAccess, 
    hasProfileAccess, 
    isLoading, 
    error 
  } = useTelegramUser()

  // Показываем экран загрузки во время проверки доступа
  if (isCheckingAccess) {
    return <LoadingScreen />
  }

  // Если приложение не запущено в Telegram
  if (!isTelegramAvailable) {
    return (
      <div className="min-h-screen relative stars-bg flex items-center justify-center">
        <div className="text-center relative z-20 p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Приложение недоступно
          </h2>
          <p className="text-gray-300">
            Это приложение должно быть открыто через Telegram
          </p>
        </div>
      </div>
    )
  }

  // Если пользователь имеет ID 1171820656 - показываем профиль
  if (hasProfileAccess) {
    return <UserProfile />
  }

  // Для всех остальных пользователей - показываем Coming Soon
  return <ComingSoon />
}
