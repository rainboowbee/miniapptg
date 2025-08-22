# Telegram Mini App

Telegram Mini App с интеграцией TON Connect, админ-панелью и космическим дизайном.

## 🚀 Возможности

- **Telegram Mini App интеграция** - автоматическое получение данных пользователя
- **Условный доступ** - проверка ID пользователя для доступа к админ-панели
- **Админ-панель** - управление пользователями, аналитика, профиль
- **TON Connect** - подключение TON кошелька (симуляция)
- **Космический дизайн** - анимированный фон со звездами
- **База данных** - Prisma + PostgreSQL для хранения данных пользователей

## 🛠 Технологии

- **Frontend**: Next.js 14 (App Router), TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **База данных**: PostgreSQL
- **Стейт менеджмент**: React Query, Zustand
- **Стилизация**: TailwindCSS с кастомными анимациями

## 📁 Структура проекта

```
miniapptelegram/
├── app/
│   ├── api/
│   │   ├── user/route.ts
│   │   ├── admin/users/route.ts
│   │   ├── admin/analytics/route.ts
│   │   └── tonconnect-manifest/route.ts
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AdminPanel.tsx
│   │   │   ├── UserList.tsx
│   │   │   ├── Analytics.tsx
│   │   │   ├── AdminProfile.tsx
│   │   │   └── TonConnect.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── ComingSoon.tsx
│   │   ├── UserProfile.tsx
│   │   └── TelegramAccessChecker.tsx
│   ├── hooks/
│   │   ├── useTelegramUser.ts
│   │   └── useDidMount.ts
│   ├── (pages)/
│   │   ├── terms/page.tsx
│   │   └── privacy/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── prisma/
│   └── schema.prisma
├── public/
│   ├── sticker.svg
│   └── tonconnect-manifest.json
├── lib/
│   ├── prisma.ts
│   └── telegram.ts
├── types/
│   └── telegram.d.ts
├── middleware.ts
├── next.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

## 🚀 Установка и запуск

### 1. Клонирование и установка зависимостей

```bash
git clone <repository-url>
cd miniapptelegram
npm install
```

### 2. Настройка базы данных

1. Создайте PostgreSQL базу данных
2. Скопируйте `.env.example` в `.env`
3. Заполните `DATABASE_URL` в `.env`

```bash
cp .env.example .env
# Отредактируйте .env файл
```

### 3. Настройка базы данных

```bash
npx prisma generate
npx prisma db push
```

### 4. Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

## 🔧 Конфигурация

### Переменные окружения (.env)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
TELEGRAM_BOT_TOKEN="your-bot-token"
```

### Telegram Mini App

- Скрипт `telegram-web-app.js` автоматически загружается из CDN
- Пользователи автоматически регистрируются в базе данных
- Проверка доступа по Telegram ID

### Админ-панель

- Доступ для пользователя с ID `1171820656`
- Управление пользователями
- Аналитика роста
- Профиль администратора
- TON Connect (симуляция)

## 🎨 Дизайн

### Космический стиль
- Черный фон с анимированными звездами
- Градиентные кнопки и элементы
- Стеклянные эффекты (backdrop-blur)
- Плавные анимации и переходы

### Анимации
- `stars1`, `stars2`, `stars3` - слои звезд с разной скоростью
- `twinkle` - мерцание звезд
- `fade-in`, `slide-up` - появление элементов

## 🚨 Решение проблем

### Ошибка сборки на Windows

Если возникает ошибка `EPERM: operation not permitted` при сборке:

```bash
# Очистите кэш Next.js
Remove-Item -Recurse -Force .next

# Или используйте dev режим
npm run dev
```

### TON Connect ошибки

В текущей версии TON Connect работает в режиме симуляции. Для реальной интеграции:

1. Настройте правильный манифест
2. Восстановите `TonConnectUIProvider` в `providers.tsx`
3. Используйте реальные TON Connect компоненты

### Проблемы с базой данных

```bash
# Сброс базы данных
npx prisma migrate reset

# Генерация клиента
npx prisma generate

# Просмотр данных
npx prisma studio
```

## 📱 Telegram Mini App

### Интеграция
- Автоматическое получение данных пользователя
- Сохранение в базу данных
- Проверка доступа по ID

### Компоненты
- `TelegramAccessChecker` - основной контроллер доступа
- `LoadingScreen` - экран загрузки
- `UserProfile` - профиль пользователя
- `ComingSoon` - страница "скоро будет"

## 🔐 Безопасность

- Все пользователи автоматически регистрируются
- Проверка доступа по Telegram ID
- Защищенные API endpoints
- Валидация данных на сервере

## 🚀 Деплой

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Настройте PostgreSQL базу данных
4. Деплой автоматический при push в main

### Другие платформы

1. Соберите проект: `npm run build`
2. Настройте переменные окружения
3. Запустите: `npm start`

## 📝 Лицензия

MIT License

## 🤝 Поддержка

При возникновении проблем:
1. Проверьте логи в консоли
2. Убедитесь в правильности переменных окружения
3. Проверьте подключение к базе данных
4. Очистите кэш Next.js

## 🔄 Обновления

### Prisma
```bash
npm i --save-dev prisma@latest
npm i @prisma/client@latest
npx prisma generate
```

### Next.js
```bash
npm i next@latest react@latest react-dom@latest
```

### Остальные зависимости
```bash
npm update
```
