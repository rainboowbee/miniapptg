import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Простой in-memory rate limiter
const requestCounts = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60000 // 1 минута
const MAX_REQUESTS_PER_WINDOW = 10 // максимум 10 запросов в минуту

function checkRateLimit(identifier: string): boolean {
  const now = Date.now()
  const userData = requestCounts.get(identifier)
  
  if (!userData || now > userData.resetTime) {
    // Создаем новое окно для rate limiting
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    })
    return true
  }
  
  if (userData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }
  
  userData.count++
  return true
}

// GET /api/user - получение пользователя по Telegram ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const telegramId = searchParams.get('telegramId')
    
    if (!telegramId) {
      return NextResponse.json(
        { error: 'Telegram ID is required' },
        { status: 400 }
      )
    }

    // Проверяем rate limit
    if (!checkRateLimit(`get_${telegramId}`)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { telegramId }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

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

    // Проверяем rate limit
    if (!checkRateLimit(`post_${telegramId}`)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
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

// PUT /api/user - обновление пользователя
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { telegramId, username, firstName, lastName, avatar } = body

    if (!telegramId) {
      return NextResponse.json(
        { error: 'Telegram ID is required' },
        { status: 400 }
      )
    }

    // Проверяем rate limit
    if (!checkRateLimit(`put_${telegramId}`)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      )
    }

    // Валидация данных
    if (typeof telegramId !== 'string' || telegramId.trim() === '') {
      return NextResponse.json(
        { error: 'Invalid Telegram ID format' },
        { status: 400 }
      )
    }

    const user = await prisma.user.update({
      where: { telegramId: telegramId.trim() },
      data: {
        username: username?.trim() || null,
        firstName: firstName?.trim() || null,
        lastName: lastName?.trim() || null,
        avatar: avatar?.trim() || null,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error updating user:', error)
    
    // Проверяем тип ошибки Prisma
    if (error instanceof Error) {
      if (error.message.includes('Record to update not found')) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
