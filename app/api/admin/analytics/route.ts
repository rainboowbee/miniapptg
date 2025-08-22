import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '7d'

    // Определяем период
    let days: number
    switch (range) {
      case '30d':
        days = 30
        break
      case '90d':
        days = 90
        break
      default:
        days = 7
    }

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Получаем общую статистику
    const totalUsers = await prisma.user.count()
    
    const newUsersToday = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      }
    })

    const newUsersWeek = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    })

    const newUsersMonth = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    })

    // Вычисляем рост
    const previousPeriodUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - (days * 2) * 24 * 60 * 60 * 1000),
          lt: startDate
        }
      }
    })

    const currentPeriodUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    const growthRate = previousPeriodUsers > 0 
      ? ((currentPeriodUsers - previousPeriodUsers) / previousPeriodUsers) * 100
      : 100

    // Получаем ежедневную статистику
    const dailyStats = []
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0)

      const nextDate = new Date(date)
      nextDate.setDate(nextDate.getDate() + 1)

      const newUsers = await prisma.user.count({
        where: {
          createdAt: {
            gte: date,
            lt: nextDate
          }
        }
      })

      const totalUsersOnDate = await prisma.user.count({
        where: {
          createdAt: {
            lt: nextDate
          }
        }
      })

      dailyStats.push({
        date: date.toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' }),
        newUsers,
        totalUsers: totalUsersOnDate
      })
    }

    const analytics = {
      totalUsers,
      newUsersToday,
      newUsersWeek,
      newUsersMonth,
      growthRate: Math.round(growthRate * 10) / 10,
      dailyStats
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
