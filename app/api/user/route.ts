import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/user - создание или обновление пользователя
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/user called')
    
    // Проверяем подключение к базе данных
    try {
      await prisma.$connect()
      console.log('Database connection successful')
    } catch (dbError) {
      console.error('Database connection failed:', dbError)
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const { telegramId, username, firstName, lastName, avatar } = body
    console.log('Extracted data:', { telegramId, username, firstName, lastName, avatar })

    if (!telegramId) {
      console.log('Error: Telegram ID is required')
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

    console.log('Attempting to upsert user with telegramId:', telegramId.trim())
    
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
    
    console.log('User upserted successfully:', user)

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating/updating user:', error)
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    })
    
    // Проверяем тип ошибки Prisma
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        console.log('Unique constraint error detected')
        return NextResponse.json(
          { error: 'User with this Telegram ID already exists' },
          { status: 409 }
        )
      }
    }
    
    console.log('Returning internal server error')
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
