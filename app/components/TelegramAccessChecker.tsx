'use client'

import { useTelegramUser } from '@/app/hooks/useTelegramUser'
import { useEffect, useState, useMemo, useCallback, memo } from 'react'

import { ComingSoon } from './ComingSoon'
import { AdminPanel } from './AdminPanel'

// Компонент для отладки Telegram данных
const TelegramDebugInfo = memo(({ telegramUser, user, isLoading, error, createOrUpdateUser }: any) => {
  const [testDbResult, setTestDbResult] = useState<any>(null)
  const [isTestingDb, setIsTestingDb] = useState(false)

  const testDatabase = useCallback(async () => {
    setIsTestingDb(true)
    try {
      const response = await fetch('/api/test-db')
      const result = await response.json()
      setTestDbResult(result)
    } catch (error) {
      setTestDbResult({ error: 'Failed to test database' })
    } finally {
      setIsTestingDb(false)
    }
  }, [])

  const forceCreateUser = useCallback(() => {
    if (telegramUser && createOrUpdateUser) {
      createOrUpdateUser.mutate(telegramUser)
    }
  }, [telegramUser, createOrUpdateUser])

  // Мемоизируем состояние для предотвращения лишних рендеров
  const debugState = useMemo(() => ({
    hasTelegramUser: !!telegramUser,
    hasDbUser: !!user,
    isLoading,
    hasError: !!error,
    telegramId: telegramUser?.telegramId,
    username: telegramUser?.username,
    firstName: telegramUser?.firstName,
    lastName: telegramUser?.lastName
  }), [telegramUser, user, isLoading, error])

  return (
    <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg p-4 text-xs text-white max-w-sm z-50 max-h-96 overflow-y-auto">
      <h3 className="font-bold mb-2">🔍 Telegram Debug Info</h3>
      <div className="space-y-1">
        <div><strong>Telegram User:</strong> {debugState.hasTelegramUser ? '✅' : '❌'}</div>
        <div><strong>DB User:</strong> {debugState.hasDbUser ? '✅' : '❌'}</div>
        <div><strong>Loading:</strong> {debugState.isLoading ? '⏳' : '✅'}</div>
        <div><strong>Error:</strong> {debugState.hasError ? '❌' : '✅'}</div>
        
        {debugState.hasTelegramUser && (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <div><strong>ID:</strong> {debugState.telegramId}</div>
            <div><strong>Username:</strong> {debugState.username || 'N/A'}</div>
            <div><strong>Name:</strong> {debugState.firstName} {debugState.lastName}</div>
          </div>
        )}
        
        {debugState.hasError && (
          <div className="mt-2 p-2 bg-red-900/50 rounded text-red-300">
            <strong>Error:</strong> {error.message}
          </div>
        )}

        {/* Кнопки действий */}
        <div className="mt-3 space-y-2">
          <button
            onClick={testDatabase}
            disabled={isTestingDb}
            className="w-full px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 rounded text-xs"
          >
            {isTestingDb ? 'Testing...' : 'Test Database'}
          </button>
          
          {debugState.hasTelegramUser && (
            <button
              onClick={forceCreateUser}
              disabled={createOrUpdateUser?.isPending}
              className="w-full px-2 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded text-xs"
            >
              {createOrUpdateUser?.isPending ? 'Creating...' : 'Force Create User'}
            </button>
          )}
        </div>

        {/* Результат теста базы данных */}
        {testDbResult && (
          <div className="mt-2 p-2 bg-gray-800 rounded">
            <div><strong>DB Test:</strong> {testDbResult.status}</div>
            {testDbResult.userCount !== undefined && (
              <div><strong>Users:</strong> {testDbResult.userCount}</div>
            )}
            {testDbResult.error && (
              <div className="text-red-300"><strong>Error:</strong> {testDbResult.error}</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
})

TelegramDebugInfo.displayName = 'TelegramDebugInfo'

export function TelegramAccessChecker() {
  const { 
    telegramUser,
    user,
    isTelegramAvailable, 
    isCheckingAccess, 
    hasProfileAccess, 
    isLoading, 
    error,
    createOrUpdateUser
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

  // Показываем отладочную информацию в режиме разработки
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <>
      {/* Отладочная информация */}
      {isDevelopment && (
        <TelegramDebugInfo 
          telegramUser={telegramUser}
          user={user}
          isLoading={isLoading}
          error={error}
          createOrUpdateUser={createOrUpdateUser}
        />
      )}

      {/* Основной контент */}
      {(() => {
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
      })()}
    </>
  )
}
