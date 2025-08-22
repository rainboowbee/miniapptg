'use client'

import { useState } from 'react'
import { useTelegramUser } from '@/app/hooks/useTelegramUser'
import { UserList } from './admin/UserList'
import { Analytics } from './admin/Analytics'
import { AdminProfile } from './admin/AdminProfile'
import { TonConnect } from './admin/TonConnect'

type AdminTab = 'users' | 'analytics' | 'profile'

export function AdminPanel() {
  const { user } = useTelegramUser()
  const [activeTab, setActiveTab] = useState<AdminTab>('users')
  const [showTonConnect, setShowTonConnect] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserList />
      case 'analytics':
        return <Analytics />
      case 'profile':
        return <AdminProfile />
      default:
        return <UserList />
    }
  }

  return (
    <div className="min-h-screen relative stars-bg">
      {/* Header */}
      <div className="relative z-20 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* User Info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} alt="Admin Avatar" className="w-10 h-10 rounded-full" />
                ) : (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-white font-medium">
                {user?.username ? `@${user.username}` : user?.firstName || 'Admin'}
              </span>
            </div>

            {/* Ton Connect Button */}
            <button
              onClick={() => setShowTonConnect(true)}
              className="px-4 py-2 border border-pink-400 text-white rounded-lg hover:bg-pink-400/20 transition-colors"
            >
              Ton connect
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-20 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 rounded-lg border transition-colors font-doto ${
                activeTab === 'users'
                  ? 'border-pink-400 bg-pink-400/20 text-white'
                  : 'border-white/20 text-gray-300 hover:border-pink-400/50'
              }`}
            >
              список пользователей
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-6 py-3 rounded-lg border transition-colors font-doto ${
                activeTab === 'analytics'
                  ? 'border-pink-400 bg-pink-400/20 text-white'
                  : 'border-white/20 text-gray-300 hover:border-pink-400/50'
              }`}
            >
              Аналитика
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-lg border transition-colors font-doto ${
                activeTab === 'profile'
                  ? 'border-pink-400 bg-pink-400/20 text-white'
                  : 'border-white/20 text-gray-300 hover:border-pink-400/50'
              }`}
            >
              Профиль
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 py-8">
        {renderContent()}
      </div>

      {/* Ton Connect Modal */}
      {showTonConnect && (
        <TonConnect onClose={() => setShowTonConnect(false)} />
      )}
    </div>
  )
}
