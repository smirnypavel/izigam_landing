// hooks/useCryptoData.ts
import { useState, useEffect, useCallback } from 'react'

interface CryptoData {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  market_cap_rank: number
}

interface UseCryptoDataReturn {
  data: CryptoData[]
  loading: boolean
  error: string | null
  refetch: () => void
}

const defaultCryptoIds = [
  'bitcoin',
  'ethereum',
  'binancecoin',
  'cardano',
  'solana',
  'avalanche-2',
  'polygon',
  'chainlink',
  'litecoin',
  'polkadot',
  'uniswap',
  'dogecoin',
  'shiba-inu',
  'cosmos',
  'near'
]

// Маппинг символов к CoinCap ID (если нужно использовать CoinCap API)
const COINCAP_ID_MAP: Record<string, string> = {
  'bitcoin': 'bitcoin',
  'ethereum': 'ethereum',
  'binancecoin': 'binance-coin',
  'cardano': 'cardano',
  'solana': 'solana',
  'avalanche-2': 'avalanche',
  'polygon': 'polygon',
  'chainlink': 'chainlink',
  'litecoin': 'litecoin',
  'polkadot': 'polkadot',
  'uniswap': 'uniswap',
  'dogecoin': 'dogecoin',
  'shiba-inu': 'shiba-inu',
  'cosmos': 'cosmos',
  'near': 'near-protocol'
}

// Функции для получения иконок из разных источников
const getIconUrl = {
  // CoinGecko API (уже включает иконки в ответе)
  coingecko: (imageUrl: string) => imageUrl,
  
  // CoinCap API
  coincap: (symbol: string) => 
    `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`,
  
  // CryptoCurrency Icons (бесплатный CDN)
  cryptoicons: (symbol: string) => 
    `https://cryptoicons.org/api/icon/${symbol.toLowerCase()}/200`,
  
  // Alternative CDN
  coinicon: (symbol: string) => 
    `https://coinicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
  
  // Fallback to a reliable icon service
  fallback: (symbol: string) => 
    `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/${symbol.toLowerCase()}.png`
}

// Функция для проверки доступности изображения
const checkImageAvailability = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(3000) })
    return response.ok
  } catch {
    return false
  }
}

// Функция для получения лучшей доступной иконки
const getBestAvailableIcon = async (crypto: CryptoData): Promise<string> => {
  const symbol = crypto.symbol.toLowerCase()
  
  // Сначала пробуем оригинальную иконку из API (если есть)
  if (crypto.image && crypto.image.includes('http')) {
    const isAvailable = await checkImageAvailability(crypto.image)
    if (isAvailable) return crypto.image
  }
  
  // Пробуем разные источники иконок по приоритету
  const iconSources = [
    getIconUrl.coincap(symbol),
    getIconUrl.cryptoicons(symbol),
    getIconUrl.coinicon(symbol),
    getIconUrl.fallback(symbol)
  ]
  
  for (const iconUrl of iconSources) {
    const isAvailable = await checkImageAvailability(iconUrl)
    if (isAvailable) return iconUrl
  }
  
  // Если ничего не найдено, возвращаем дефолтную иконку
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#374151"/>
      <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial" font-size="10" font-weight="bold">
        ${symbol.toUpperCase().slice(0, 3)}
      </text>
    </svg>
  `)}`
}

const fallbackData: CryptoData[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: getIconUrl.coincap('btc'),
    current_price: 106495,
    price_change_percentage_24h: 2.05,
    market_cap_rank: 1
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: getIconUrl.coincap('eth'),
    current_price: 3245.67,
    price_change_percentage_24h: -1.2,
    market_cap_rank: 2
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: getIconUrl.coincap('bnb'),
    current_price: 692.45,
    price_change_percentage_24h: 1.42,
    market_cap_rank: 3
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: getIconUrl.coincap('sol'),
    current_price: 234.56,
    price_change_percentage_24h: -2.8,
    market_cap_rank: 4
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: getIconUrl.coincap('ada'),
    current_price: 1.23,
    price_change_percentage_24h: 5.67,
    market_cap_rank: 5
  }
]

export const useCryptoData = (
  cryptoIds: string[] = defaultCryptoIds,
  updateInterval: number = 30000
): UseCryptoDataReturn => {
  const [data, setData] = useState<CryptoData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCryptoData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Основной запрос к CoinGecko
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${cryptoIds.join(',')}&order=market_cap_desc&per_page=${cryptoIds.length}&page=1&sparkline=false&price_change_percentage=24h`,
        {
          headers: {
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(10000)
        }
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result: CryptoData[] = await response.json()
      
      if (result && result.length > 0) {
        // Обновляем иконки для надёжности
        const updatedData = await Promise.all(
          result.map(async (crypto) => ({
            ...crypto,
            image: await getBestAvailableIcon(crypto)
          }))
        )
        
        setData(updatedData)
      } else {
        throw new Error('No data received from API')
      }
    } catch (err) {
      console.error('Error fetching crypto data:', err)
      
      // Пробуем альтернативный API
      try {
        const alternativeData = await alternativeAPIFetch(cryptoIds)
        setData(alternativeData)
        setError('Using alternative data source')
      } catch (altErr) {
        console.error('Alternative API also failed:', altErr)
        setError('Failed to load crypto data')
        setData(fallbackData)
      }
    } finally {
      setLoading(false)
    }
  }, [cryptoIds])

  useEffect(() => {
    fetchCryptoData()
    
    const interval = setInterval(fetchCryptoData, updateInterval)
    
    return () => clearInterval(interval)
  }, [fetchCryptoData, updateInterval])

  return {
    data,
    loading,
    error,
    refetch: fetchCryptoData
  }
}

// Альтернативные API источники
export const alternativeAPIFetch = async (cryptoIds: string[]): Promise<CryptoData[]> => {
  try {
    // CoinCap API как альтернатива
    const response = await fetch(
      'https://api.coincap.io/v2/assets?limit=20',
      { signal: AbortSignal.timeout(8000) }
    )
    
    if (!response.ok) {
      throw new Error('CoinCap API error')
    }
    
    const result = await response.json()
    
    // Преобразуем данные CoinCap в формат CoinGecko
    const mappedData = await Promise.all(
      result.data.slice(0, 15).map(async (coin: any) => {
        const cryptoData: CryptoData = {
          id: coin.id.toLowerCase(),
          symbol: coin.symbol.toLowerCase(),
          name: coin.name,
          image: getIconUrl.coincap(coin.symbol.toLowerCase()),
          current_price: parseFloat(coin.priceUsd),
          price_change_percentage_24h: parseFloat(coin.changePercent24Hr),
          market_cap_rank: parseInt(coin.rank)
        }
        
        // Получаем лучшую доступную иконку
        cryptoData.image = await getBestAvailableIcon(cryptoData)
        return cryptoData
      })
    )
    
    return mappedData
  } catch (error) {
    console.error('Alternative API fetch failed:', error)
    return fallbackData
  }
}

// Утилитарные функции для форматирования
export const formatPrice = (price: number): string => {
  if (price < 0.000001) {
    return price.toFixed(8)
  } else if (price < 0.01) {
    return price.toFixed(6)
  } else if (price < 1) {
    return price.toFixed(4)
  } else if (price < 100) {
    return price.toFixed(2)
  } else {
    return price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }
}

export const formatPercentage = (percentage: number): string => {
  const sign = percentage >= 0 ? '+' : ''
  return `${sign}${percentage.toFixed(2)}%`
}