import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/user - создание или обновление пользователя
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { telegramId, username, firstName, lastName, avatar } = body

    if (!telegramId) {
      return NextResponse.json(
        { error: 'Telegram ID is required' },
        { status: 400 }
      )
    }

    // Валидация данных
    if (typeof telegramId !== 'string' || telegramId.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid Telegram ID format' },
        { status: 400 }
      )
    }

    // Создаем или обновляем пользователя
    const user = await prisma.user.upsert({
      where: { telegramId: telegramId.trim() },
      update: {
        username: username?.trim() || null,
        firstName: firstName?.trim() || null,
        lastName: lastName?.trim() || null,
        avatar: avatar?.trim() || null,
        updatedAt: new Date(),
      },
      create: {
        telegramId: telegramId.trim(),
        username: username?.trim() || null,
        firstName: firstName?.trim() || null,
        lastName: lastName?.trim() || null,
        avatar: avatar?.trim() || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating/updating user:', error)
    
    // Проверяем тип ошибки Prisma
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: 'User with this Telegram ID already exists' },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
