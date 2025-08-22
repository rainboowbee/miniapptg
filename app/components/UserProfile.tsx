'use client'

import { useTelegramUser } from '@/app/hooks/useTelegramUser'
import Image from 'next/image'

export function UserProfile() {
  const { user, isLoading, error, isTelegramAvailable } = useTelegramUser()

  if (!isTelegramAvailable) {
    return (
      <div className="min-h-screen relative stars-bg flex items-center justify-center">
        <div className="text-center z-10 p-8">
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

  if (isLoading) {
    return (
      <div className="min-h-screen relative stars-bg flex items-center justify-center">
        <div className="text-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-telegram-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Загрузка профиля...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen relative stars-bg flex items-center justify-center">
        <div className="text-center z-10 p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">
            Ошибка загрузки
          </h2>
          <p className="text-gray-300">
            Не удалось загрузить профиль пользователя
          </p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen relative stars-bg flex items-center justify-center">
        <div className="text-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-telegram-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Создание профиля...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative stars-bg p-4">
      <div className="max-w-md mx-auto pt-8 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in">
            Профиль пользователя
          </h1>
          <p className="text-gray-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Данные из Telegram Mini App
          </p>
        </div>

        {/* Карточка профиля */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {/* Аватар */}
          <div className="telegram-gradient p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt="Avatar"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            {/* Имя и фамилия */}
            <h2 className="text-xl font-semibold text-white mb-1">
              {user.firstName} {user.lastName}
            </h2>
            
            {/* Username */}
            {user.username && (
              <p className="text-white/90 text-sm">
                @{user.username}
              </p>
            )}
          </div>

          {/* Детали профиля */}
          <div className="p-6 space-y-4">
            {/* Telegram ID */}
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-telegram-500/20 rounded-lg flex items-center justify-center mr-3 border border-telegram-500/30">
                  <svg className="w-4 h-4 text-telegram-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-gray-200 font-medium">Telegram ID</span>
              </div>
              <span className="text-white font-mono text-sm">
                {user.telegramId}
              </span>
            </div>

            {/* Дата создания */}
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3 border border-green-500/30">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-200 font-medium">Дата регистрации</span>
              </div>
              <span className="text-white text-sm">
                {new Date(user.createdAt).toLocaleDateString('ru-RU')}
              </span>
            </div>

            {/* Последнее обновление */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 border border-blue-500/30">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gray-200 font-medium">Обновлен</span>
              </div>
              <span className="text-white text-sm">
                {new Date(user.updatedAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>
        </div>

        {/* Информация о приложении */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Это приложение работает как Telegram Mini App
          </p>
        </div>
      </div>
    </div>
  )
}
