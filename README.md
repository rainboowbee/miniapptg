# Telegram Mini App - Simplified

Простое Telegram Mini App для автоматической регистрации пользователей в базе данных.

## 🚀 Возможности

- **Автоматическая регистрация** пользователей Telegram в базе данных
- **Простой и чистый интерфейс** без лишних функций
- **База данных PostgreSQL** для хранения данных пользователей

## 🛠 Технологии

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Prisma ORM
- **База данных**: PostgreSQL

## 📁 Структура проекта

```
miniapptelegram/
├── app/
│   ├── api/
│   │   └── user/route.ts          # API для создания пользователей
│   ├── components/
│   │   └── TelegramUserManager.tsx # Главный компонент
│   ├── globals.css                 # Базовые стили
│   ├── layout.tsx                  # Основной layout
│   ├── page.tsx                    # Главная страница
│   └── providers.tsx               # Провайдеры
├── prisma/
│   └── schema.prisma               # Схема базы данных
├── lib/
│   └── prisma.ts                   # Prisma клиент
├── middleware.ts                    # Простой middleware
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

### 3. Инициализация базы данных

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
```

## 🎯 Как это работает

1. **Пользователь заходит** в приложение из Telegram
2. **Автоматически получаются** данные пользователя (ID, имя, username, аватар)
3. **Пользователь сохраняется** в базу данных PostgreSQL
4. **Отображается статус** успешного сохранения

## 📱 Telegram Mini App

- Приложение должно быть запущено из Telegram
- Автоматическое получение данных пользователя
- Сохранение в базу данных при первом входе

## 🚀 Деплой

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения
3. Настройте PostgreSQL базу данных
4. Деплой автоматический при push в main

## 📝 Лицензия

MIT License
