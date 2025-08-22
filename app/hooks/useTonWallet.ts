'use client'

import { useTonConnectUI } from '@tonconnect/ui-react'
import { useEffect, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface WalletData {
  address: string
  publicKey: string
  balance: string
}

export function useTonWallet() {
  const [tonConnectUI] = useTonConnectUI()
  const queryClient = useQueryClient()
  const [walletData, setWalletData] = useState<WalletData | null>(null)

  // Получение баланса кошелька
  const { data: balance, refetch: refetchBalance } = useQuery({
    queryKey: ['wallet-balance', tonConnectUI.account?.address],
    queryFn: async () => {
      if (!tonConnectUI.account?.address) return '0'
      
      try {
        // Здесь будет API вызов для получения баланса
        const response = await fetch(`/api/ton/balance?address=${tonConnectUI.account.address}`)
        const data = await response.json()
        return data.balance || '0'
      } catch (error) {
        console.error('Ошибка получения баланса:', error)
        return '0'
      }
    },
    enabled: !!tonConnectUI.account?.address,
    refetchInterval: 30000, // Обновляем каждые 30 секунд
  })

  // Мутация для сохранения данных кошелька
  const saveWalletMutation = useMutation({
    mutationFn: async (walletData: { address: string; publicKey: string }) => {
      // Получаем telegramId из Telegram Web App
      const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user
      const telegramId = telegramUser?.id.toString()
      
      if (!telegramId) {
        throw new Error('Telegram ID not found for saving wallet data.')
      }
      
      const response = await fetch('/api/user/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...walletData, telegramId }),
      })
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  // Обработка подключения кошелька
  const handleConnect = async () => {
    try {
      await tonConnectUI.connectWallet()
    } catch (error) {
      console.error('Ошибка подключения:', error)
    }
  }

  // Обработка отключения кошелька
  const handleDisconnect = async () => {
    try {
      await tonConnectUI.disconnect()
      setWalletData(null)
    } catch (error) {
      console.error('Ошибка отключения:', error)
    }
  }

  // Автоматическое сохранение данных кошелька при подключении
  useEffect(() => {
    if (tonConnectUI.account?.address && tonConnectUI.account?.publicKey && !saveWalletMutation.isPending) {
      const newWalletData = {
        address: tonConnectUI.account.address,
        publicKey: tonConnectUI.account.publicKey,
        balance: balance || '0',
      }
      
      setWalletData(newWalletData)
      
      // Сохраняем в базу данных только если еще не сохраняли
      if (!walletData || walletData.address !== newWalletData.address) {
        saveWalletMutation.mutate({
          address: newWalletData.address,
          publicKey: newWalletData.publicKey,
        })
      }
    }
  }, [tonConnectUI.account, balance, saveWalletMutation.isPending, walletData])

  return {
    account: tonConnectUI.account,
    isConnected: !!tonConnectUI.account,
    balance,
    walletData,
    connect: handleConnect,
    disconnect: handleDisconnect,
    refetchBalance,
    isLoading: saveWalletMutation.isPending,
  }
}
