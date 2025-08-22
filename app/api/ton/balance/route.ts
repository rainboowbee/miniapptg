import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    // Здесь будет вызов TON API для получения баланса
    // Пока используем заглушку
    const mockBalance = (Math.random() * 100).toFixed(4)
    
    // В реальном проекте здесь будет:
    // const response = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${address}`)
    // const data = await response.json()
    // const balance = data.result / 1000000000 // Конвертируем из nanoTON в TON

    return NextResponse.json({ balance: mockBalance })
  } catch (error) {
    console.error('Error fetching balance:', error)
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 }
    )
  }
}
