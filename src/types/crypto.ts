// types/crypto.ts

export interface CryptoData {
    id: string
    symbol: string
    name: string
    image: string
    current_price: number
    price_change_percentage_24h: number
    market_cap_rank: number
    market_cap?: number
    total_volume?: number
    high_24h?: number
    low_24h?: number
    circulating_supply?: number
    total_supply?: number
    max_supply?: number
    ath?: number
    ath_change_percentage?: number
    ath_date?: string
    atl?: number
    atl_change_percentage?: number
    atl_date?: string
    last_updated?: string
  }
  
  export interface CryptoApiResponse {
    data: CryptoData[]
    error?: string
    timestamp?: number
  }
  
  export interface CryptoPriceChange {
    symbol: string
    priceChange: number
    percentChange: number
    isPositive: boolean
  }
  
  // Конфигурация для различных API
  export interface ApiConfig {
    baseUrl: string
    endpoints: {
      markets: string
      price: string
      history: string
    }
    rateLimit: {
      requestsPerMinute: number
      requestsPerHour: number
    }
  }
  
  export const API_CONFIGS: Record<string, ApiConfig> = {
    coingecko: {
      baseUrl: 'https://api.coingecko.com/api/v3',
      endpoints: {
        markets: '/coins/markets',
        price: '/simple/price',
        history: '/coins/{id}/history'
      },
      rateLimit: {
        requestsPerMinute: 10,
        requestsPerHour: 100
      }
    },
    coincap: {
      baseUrl: 'https://api.coincap.io/v2',
      endpoints: {
        markets: '/assets',
        price: '/assets/{id}',
        history: '/assets/{id}/history'
      },
      rateLimit: {
        requestsPerMinute: 100,
        requestsPerHour: 1000
      }
    }
  }
  
  // Популярные криптовалюты с их ID для разных API
  export const POPULAR_CRYPTO_IDS = {
    coingecko: [
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
      'near',
      'algorand',
      'fantom',
      'tron',
      'vechain',
      'theta-token'
    ],
    coincap: [
      'bitcoin',
      'ethereum',
      'binance-coin',
      'cardano',
      'solana',
      'avalanche',
      'polygon',
      'chainlink',
      'litecoin',
      'polkadot',
      'uniswap',
      'dogecoin',
      'shiba-inu',
      'cosmos',
      'near-protocol',
      'algorand',
      'fantom',
      'tron',
      'vechain',
      'theta-network'
    ]
  }
  
  export interface CryptoDisplayConfig {
    maxItems: number
    updateInterval: number
    showLoadingState: boolean
    showErrorState: boolean
    fallbackToCache: boolean
    retryAttempts: number
    retryDelay: number
  }