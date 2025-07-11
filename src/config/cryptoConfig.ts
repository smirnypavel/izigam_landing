// config/cryptoConfig.ts
import type { CryptoDisplayConfig } from '@/types/crypto'

export const CRYPTO_CONFIG: CryptoDisplayConfig = {
  maxItems: 15,
  updateInterval: 30000, // 30 секунд
  showLoadingState: true,
  showErrorState: true,
  fallbackToCache: true,
  retryAttempts: 3,
  retryDelay: 5000
}

// Настройка для разных окружений
export const ENV_CONFIGS = {
  development: {
    ...CRYPTO_CONFIG,
    updateInterval: 60000, // 1 минута в разработке
  },
  production: {
    ...CRYPTO_CONFIG,
    updateInterval: 30000, // 30 секунд в продакшене
  },
  testing: {
    ...CRYPTO_CONFIG,
    updateInterval: 0, // Без автообновления в тестах
    showLoadingState: false,
  }
}

// Настройки анимации слайдера
export const SLIDER_CONFIG = {
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: false,
  },
  speed: 8000,
  spaceBetween: 12,
  loop: true,
  allowTouchMove: false,
  breakpoints: {
    320: {
      slidesPerView: 'auto' as const,
      spaceBetween: 8,
    },
    768: {
      slidesPerView: 'auto' as const,
      spaceBetween: 12,
    },
    1024: {
      slidesPerView: 'auto' as const,
      spaceBetween: 16,
    }
  }
}

// Настройки форматирования валют
export const CURRENCY_FORMAT = {
  currency: 'USD',
  locale: 'en-US',
  notation: 'standard' as const,
  minimumFractionDigits: 2,
  maximumFractionDigits: 6
}

// Пороговые значения для разного форматирования цен
export const PRICE_THRESHOLDS = {
  micro: 0.01,      // Меньше $0.01 - показываем 6 знаков
  small: 1,         // Меньше $1 - показываем 4 знака
  medium: 100,      // Меньше $100 - показываем 2 знака
  large: 1000       // Больше $1000 - форматируем с разделителями
}

// Список приоритетных криптовалют (будут показаны первыми)
export const PRIORITY_CRYPTOS = [
  'bitcoin',
  'ethereum',
  'binancecoin',
  'solana',
  'cardano'
]

// Резервные данные для офлайн режима
export const OFFLINE_CRYPTO_DATA = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: '/img/cryptocurrencies/btc.svg',
    current_price: 100000,
    price_change_percentage_24h: 2.5,
    market_cap_rank: 1
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: '/img/cryptocurrencies/eth.svg',
    current_price: 3500,
    price_change_percentage_24h: -1.8,
    market_cap_rank: 2
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: '/img/cryptocurrencies/bnb.svg',
    current_price: 650,
    price_change_percentage_24h: 0.9,
    market_cap_rank: 3
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: '/img/cryptocurrencies/sol.svg',
    current_price: 220,
    price_change_percentage_24h: 4.2,
    market_cap_rank: 4
  },
  {
    id: 'cardano',
    symbol: 'ada',
    name: 'Cardano',
    image: '/img/cryptocurrencies/ada.svg',
    current_price: 1.1,
    price_change_percentage_24h: -2.1,
    market_cap_rank: 5
  }
]