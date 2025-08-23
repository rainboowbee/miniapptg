import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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

    // Создаем или обновляем пользователя
    const user = await prisma.user.upsert({
      where: { telegramId },
      update: {
        username,
        firstName,
        lastName,
        avatar,
        updatedAt: new Date(),
      },
      create: {
        telegramId,
        username,
        firstName,
        lastName,
        avatar,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating/updating user:', error)
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

    const user = await prisma.user.update({
      where: { telegramId },
      data: {
        username,
        firstName,
        lastName,
        avatar,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error updating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
