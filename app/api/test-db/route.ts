import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('🧪 Testing database connection...')
    
    // Проверяем подключение к базе данных
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    // Пробуем выполнить простой запрос
    const userCount = await prisma.user.count()
    console.log('📊 User count in database:', userCount)
    
    // Получаем список всех пользователей
    const users = await prisma.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful',
      userCount,
      recentUsers: users,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('💥 Database test failed:', error)
    
    return NextResponse.json({
      status: 'error',
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
