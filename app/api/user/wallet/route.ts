import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { address, publicKey, telegramId } = await request.json()

    if (!address || !publicKey) {
      return NextResponse.json(
        { error: 'Address and publicKey are required' },
        { status: 400 }
      )
    }

    // Обновляем пользователя с данными кошелька
    const updatedUser = await prisma.user.update({
      where: { telegramId },
      data: {
        walletAddress: address,
        publicKey,
        isConnected: true,
        lastConnected: new Date(),
      },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Error updating wallet data:', error)
    return NextResponse.json(
      { error: 'Failed to update wallet data' },
      { status: 500 }
    )
  }
}

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
      where: { telegramId },
      select: {
        walletAddress: true,
        publicKey: true,
        isConnected: true,
        lastConnected: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching wallet data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wallet data' },
      { status: 500 }
    )
  }
}
