// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Разрешённые домены для загрузки изображений
    domains: [
      // CoinGecko
      'coin-images.coingecko.com',
      'assets.coingecko.com',
      
      // CoinCap
      'assets.coincap.io',
      
      // Cryptocurrency Icons
      'cryptoicons.org',
      
      // GitHub (для fallback иконок)
      'raw.githubusercontent.com',
      
      // Alternative services
      'coinicon-api.vercel.app'
    ],
    
    // Современный подход с remotePatterns (рекомендуется)
    remotePatterns: [
      // CoinGecko API
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
        port: '',
        pathname: '/coins/images/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
        port: '',
        pathname: '/coins/images/**',
      },
      
      // CoinCap API
      {
        protocol: 'https',
        hostname: 'assets.coincap.io',
        port: '',
        pathname: '/assets/icons/**',
      },
      
      // CryptoIcons.org
      {
        protocol: 'https',
        hostname: 'cryptoicons.org',
        port: '',
        pathname: '/api/icon/**',
      },
      
      // GitHub raw content (fallback)
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/spothq/cryptocurrency-icons/**',
      },
      
      // Alternative API
      {
        protocol: 'https',
        hostname: 'coinicon-api.vercel.app',
        port: '',
        pathname: '/api/icon/**',
      }
    ],
    
    // Форматы изображений
    formats: ['image/webp', 'image/avif'],
    
    // Размеры для оптимизации
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Настройки безопасности
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Минимизация запросов
    minimumCacheTTL: 86400, // 24 часа
  },
  
  // Дополнительные настройки для работы с API
  async rewrites() {
    return [
      // Проксирование API запросов для избежания CORS (опционально)
      {
        source: '/api/crypto/:path*',
        destination: 'https://api.coingecko.com/api/v3/:path*',
      },
      {
        source: '/api/coincap/:path*',
        destination: 'https://api.coincap.io/v2/:path*',
      }
    ]
  },
  
  // Заголовки для работы с внешними API
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig