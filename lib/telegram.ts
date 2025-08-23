// Типы для Telegram Web App
export interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

export interface TelegramWebApp {
  initData: string
  initDataUnsafe: {
    user?: TelegramUser
    query_id?: string
  }
  ready: () => void
  expand: () => void
  close: () => void
  MainButton: {
    text: string
    color: string
    textColor: string
    isVisible: boolean
    isActive: boolean
    isProgressVisible: boolean
    setText: (text: string) => void
    onClick: (callback: () => void) => void
    show: () => void
    hide: () => void
    enable: () => void
    disable: () => void
    showProgress: (leaveActive?: boolean) => void
    hideProgress: () => void
  }
  BackButton: {
    isVisible: boolean
    onClick: (callback: () => void) => void
    show: () => void
    hide: () => void
  }
}

// Проверяем, запущено ли приложение в Telegram
export const isTelegramWebApp = (): boolean => {
  if (typeof window === 'undefined') return false
  return 'Telegram' in window && 'WebApp' in (window as any).Telegram
}

// Получаем экземпляр Telegram Web App
export const getTelegramWebApp = (): TelegramWebApp | null => {
  if (typeof window === 'undefined') return null
  if (!isTelegramWebApp()) return null
  
  return (window as any).Telegram.WebApp
}

// Получаем данные пользователя из Telegram
export const getTelegramUser = (): TelegramUser | null => {
  const webApp = getTelegramWebApp()
  if (!webApp) return null
  
  return webApp.initDataUnsafe.user || null
}

// Инициализируем Telegram Web App
export const initTelegramWebApp = (): void => {
  const webApp = getTelegramWebApp()
  if (!webApp) return
  
  try {
    webApp.ready()
    webApp.expand()
  } catch (error) {
    console.error('Error initializing Telegram Web App:', error)
  }
}
