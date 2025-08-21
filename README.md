# Telegram Mini App

Современное приложение для Telegram Mini App, построенное на Next.js 14 с использованием TypeScript, TailwindCSS, Prisma и PostgreSQL.

## 🚀 Технологии

- **Next.js 14** - React фреймворк с App Router и Server Actions
- **TypeScript** - типизированный JavaScript
- **TailwindCSS** - utility-first CSS фреймворк
- **Prisma** - ORM для работы с базой данных
- **PostgreSQL** - реляционная база данных
- **React Query** - управление состоянием и кешированием
- **Telegram Web App API** - интеграция с Telegram Mini App

## 📋 Требования

- Node.js 18+ 
- PostgreSQL 12+
- npm или yarn

## 🛠️ Установка

1. **Клонируйте репозиторий:**
   ```bash
   git clone <repository-url>
   cd telegram-mini-app
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   ```

3. **Настройте переменные окружения:**
   ```bash
   cp env.example .env.local
   ```
   
   Отредактируйте `.env.local` и укажите:
   - `DATABASE_URL` - строка подключения к PostgreSQL
   - `NEXTAUTH_SECRET` - секретный ключ для NextAuth
   - `NEXTAUTH_URL` - URL вашего приложения

4. **Настройте базу данных:**
   ```bash
   # Создайте базу данных PostgreSQL
   createdb telegram_mini_app
   
   # Примените миграции Prisma
   npm run db:push
   
   # Сгенерируйте Prisma Client
   npm run db:generate
   ```

## 🚀 Запуск

1. **Режим разработки:**
   ```bash
   npm run dev
   ```
   
   Приложение будет доступно по адресу: http://localhost:3000

2. **Сборка для продакшена:**
   ```bash
   npm run build
   npm start
   ```

## 📱 Интеграция с Telegram

### Telegram Web App

Приложение автоматически интегрируется с Telegram Web App API:

- **Автоматическое определение** - приложение проверяет, запущено ли оно в Telegram
- **Получение данных пользователя** - имя, фамилия, username, аватар, Telegram ID
- **Автоматическое сохранение** - данные пользователя сохраняются в БД при первом входе

### Структура данных пользователя

```typescript
interface User {
  id: number
  telegramId: string
  username?: string
  firstName?: string
  lastName?: string
  avatar?: string
  createdAt: string
  updatedAt: string
}
```

## 🗄️ База данных

### Prisma Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  telegramId String   @unique
  username   String?
  firstName  String?
  lastName   String?
  avatar     String?
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("users")
}
```

### API Endpoints

- `GET /api/user?telegramId=<id>` - получение пользователя
- `POST /api/user` - создание/обновление пользователя
- `PUT /api/user` - обновление пользователя

## 🎨 UI/UX

### Дизайн

- **Современный стиль** - использование TailwindCSS с кастомными цветами
- **Адаптивность** - оптимизировано для мобильных устройств
- **Анимации** - плавные переходы и эффекты
- **Telegram-стиль** - цветовая схема и элементы в стиле Telegram

### Компоненты

- `UserProfile` - основной компонент профиля пользователя
- `useTelegramUser` - кастомный хук для работы с данными Telegram
- Адаптивные состояния загрузки и ошибок

## 🔧 Разработка

### Структура проекта

```
telegram-mini-app/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   ├── components/        # React компоненты
│   ├── hooks/            # Кастомные хуки
│   ├── globals.css       # Глобальные стили
│   ├── layout.tsx        # Корневой layout
│   └── page.tsx          # Главная страница
├── lib/                   # Утилиты и конфигурации
│   ├── prisma.ts         # Prisma Client
│   └── telegram.ts       # Telegram Web App утилиты
├── prisma/                # Prisma схема и миграции
├── types/                 # TypeScript типы
└── public/                # Статические файлы
```

### Полезные команды

```bash
# Разработка
npm run dev

# Сборка
npm run build

# Запуск продакшена
npm start

# Prisma команды
npm run db:generate    # Генерация Prisma Client
npm run db:push        # Применение схемы к БД
npm run db:studio      # Открытие Prisma Studio

# Линтинг
npm run lint
```

## 🌐 Развертывание

### Vercel (рекомендуется)

1. Подключите репозиторий к Vercel
2. Настройте переменные окружения в Vercel Dashboard
3. Настройте PostgreSQL (например, через Vercel Postgres)
4. Деплой автоматически запустится при push в main ветку

### Другие платформы

- **Netlify** - поддерживает Next.js
- **Railway** - встроенная поддержка PostgreSQL
- **Heroku** - классический выбор для Node.js приложений

## 🔒 Безопасность

- **Валидация данных** - проверка входящих данных на API endpoints
- **Обработка ошибок** - graceful error handling
- **Типизация** - полная TypeScript типизация
- **Prisma** - защита от SQL инъекций

## 📚 Документация

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [Telegram Web App API](https://core.telegram.org/bots/webapps)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. См. файл `LICENSE` для деталей.

## 🆘 Поддержка

Если у вас есть вопросы или проблемы:

1. Проверьте [Issues](https://github.com/your-repo/issues)
2. Создайте новый Issue с описанием проблемы
3. Опишите шаги для воспроизведения
4. Укажите версии Node.js, npm и другие детали окружения

---

**Удачной разработки! 🚀**
