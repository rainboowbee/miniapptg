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
  if (typeof window === 'undefined') {
    console.log('🌐 isTelegramWebApp: window is undefined (SSR)')
    return false
  }
  
  const hasTelegram = 'Telegram' in window
  const hasWebApp = hasTelegram && 'WebApp' in (window as any).Telegram
  
  console.log('🔍 isTelegramWebApp check:', {
    hasTelegram,
    hasWebApp,
    windowKeys: Object.keys(window).filter(key => key.toLowerCase().includes('telegram'))
  })
  
  return hasTelegram && hasWebApp
}

// Получаем экземпляр Telegram Web App
export const getTelegramWebApp = (): TelegramWebApp | null => {
  if (typeof window === 'undefined') {
    console.log('🌐 getTelegramWebApp: window is undefined (SSR)')
    return null
  }
  
  if (!isTelegramWebApp()) {
    console.log('❌ getTelegramWebApp: Telegram Web App not available')
    return null
  }
  
  const webApp = (window as any).Telegram.WebApp
  console.log('✅ getTelegramWebApp: Web App instance found:', {
    hasInitData: !!webApp.initData,
    hasInitDataUnsafe: !!webApp.initDataUnsafe,
    initDataLength: webApp.initData?.length || 0,
    user: webApp.initDataUnsafe?.user
  })
  
  return webApp
}

// Получаем данные пользователя из Telegram
export const getTelegramUser = (): TelegramUser | null => {
  const webApp = getTelegramWebApp()
  if (!webApp) {
    console.log('❌ getTelegramUser: No Web App instance')
    return null
  }
  
  const user = webApp.initDataUnsafe.user
  console.log('👤 getTelegramUser: User data:', user)
  
  if (!user) {
    console.log('❌ getTelegramUser: No user data in initDataUnsafe')
    // Попробуем альтернативный способ получения данных
    console.log('🔍 getTelegramUser: Checking alternative data sources...')
    console.log('📊 Web App state:', {
      initData: webApp.initData,
      initDataUnsafe: webApp.initDataUnsafe,
      ready: typeof webApp.ready,
      expand: typeof webApp.expand
    })
  }
  
  return user || null
}

// Инициализируем Telegram Web App
export const initTelegramWebApp = (): void => {
  console.log('🔧 initTelegramWebApp: Starting initialization...')
  
  const webApp = getTelegramWebApp()
  if (!webApp) {
    console.log('❌ initTelegramWebApp: Cannot initialize - no Web App instance')
    return
  }
  
  try {
    console.log('🚀 initTelegramWebApp: Calling ready()...')
    webApp.ready()
    console.log('✅ initTelegramWebApp: ready() called successfully')
    
    console.log('🚀 initTelegramWebApp: Calling expand()...')
    webApp.expand()
    console.log('✅ initTelegramWebApp: expand() called successfully')
    
    console.log('🎉 initTelegramWebApp: Initialization completed successfully')
  } catch (error) {
    console.error('💥 initTelegramWebApp: Error during initialization:', error)
  }
}
