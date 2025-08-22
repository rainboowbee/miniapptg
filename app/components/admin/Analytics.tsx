'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface AnalyticsData {
  totalUsers: number
  newUsersToday: number
  newUsersWeek: number
  newUsersMonth: number
  growthRate: number
  dailyStats: Array<{
    date: string
    newUsers: number
    totalUsers: number
  }>
}

export function Analytics() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')

  // Получаем данные аналитики
  const { data: analytics, isLoading, error } = useQuery({
    queryKey: ['admin-analytics', timeRange],
    queryFn: async (): Promise<AnalyticsData> => {
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`)
      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }
      return response.json()
    },
  })

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mx-auto mb-4"></div>
        <p className="text-gray-300">Загрузка аналитики...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/30">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <p className="text-red-400">Ошибка загрузки аналитики</p>
      </div>
    )
  }

  // Генерируем тестовые данные для демонстрации
  const mockData = {
    totalUsers: 1250,
    newUsersToday: 23,
    newUsersWeek: 156,
    newUsersMonth: 589,
    growthRate: 12.5,
    dailyStats: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }),
      newUsers: Math.floor(Math.random() * 50) + 10,
      totalUsers: 1000 + i * 35
    }))
  }

  const data = analytics || mockData

  return (
    <div className="space-y-6">
      {/* Заголовок и фильтры */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-white">Аналитика</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              timeRange === '7d'
                ? 'border-pink-400 bg-pink-400/20 text-white'
                : 'border-white/20 text-gray-300 hover:border-pink-400/50'
            }`}
          >
            7 дней
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              timeRange === '30d'
                ? 'border-pink-400 bg-pink-400/20 text-white'
                : 'border-white/20 text-gray-300 hover:border-pink-400/50'
            }`}
          >
            30 дней
          </button>
          <button
            onClick={() => setTimeRange('90d')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              timeRange === '90d'
                ? 'border-pink-400 bg-pink-400/20 text-white'
                : 'border-white/20 text-gray-300 hover:border-pink-400/50'
            }`}
          >
            90 дней
          </button>
        </div>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Всего пользователей</p>
              <p className="text-2xl font-bold text-white">{data.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-gray-300 text-sm">За сегодня</p>
              <p className="text-2xl font-bold text-white">+{data.newUsersToday}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-gray-300 text-sm">За неделю</p>
              <p className="text-2xl font-bold text-white">+{data.newUsersWeek}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-gray-300 text-sm">Рост</p>
              <p className="text-2xl font-bold text-green-400">+{data.growthRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* График роста пользователей */}
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
        <h3 className="text-xl font-semibold text-white mb-6">Рост пользователей за {timeRange === '7d' ? '7 дней' : timeRange === '30d' ? '30 дней' : '90 дней'}</h3>
        
        {/* Простой график */}
        <div className="space-y-4">
          {data.dailyStats.map((stat, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-20 text-sm text-gray-300">{stat.date}</div>
              <div className="flex-1 bg-white/5 rounded-full h-8 relative">
                <div 
                  className="bg-gradient-to-r from-pink-400 to-purple-500 h-8 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                  style={{ width: `${(stat.newUsers / 50) * 100}%` }}
                >
                  <span className="text-white text-xs font-medium">{stat.newUsers}</span>
                </div>
              </div>
              <div className="w-20 text-right text-sm text-gray-300">
                {stat.totalUsers.toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        {/* Легенда */}
        <div className="mt-6 flex items-center justify-center space-x-6 text-sm text-gray-300">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-pink-400 to-purple-500 rounded"></div>
            <span>Новые пользователи</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white/5 rounded"></div>
            <span>Общее количество</span>
          </div>
        </div>
      </div>

      {/* Дополнительная статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Топ по активности</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Понедельник</span>
              <span className="text-white font-medium">+45 пользователей</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Вторник</span>
              <span className="text-white font-medium">+38 пользователей</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Среда</span>
              <span className="text-white font-medium">+52 пользователя</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Четверг</span>
              <span className="text-white font-medium">+41 пользователь</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Пятница</span>
              <span className="text-white font-medium">+67 пользователей</span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">Прогноз роста</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Следующая неделя</span>
                <span>+{Math.floor(data.newUsersWeek * 1.1)}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-green-400 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Следующий месяц</span>
                <span>+{Math.floor(data.newUsersMonth * 1.15)}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-blue-400 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm text-gray-300 mb-1">
                <span>Следующий квартал</span>
                <span>+{Math.floor(data.totalUsers * 0.25)}</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2">
                <div className="bg-purple-400 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
