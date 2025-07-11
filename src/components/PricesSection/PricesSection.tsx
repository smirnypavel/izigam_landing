// components/PricesSection/PricesSection.tsx
import React, { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

import { useCryptoData} from '@/hooks/useCryptoData'
import { SLIDER_CONFIG } from '@/config/cryptoConfig'
import type { CryptoData } from '@/types/crypto'
import styles from './PricesSection.module.css'

// Компонент для отображения криптовалютного тега
interface CryptoTagProps {
  crypto: CryptoData
}

// Fallback иконки для разных символов
const getFallbackIcon = (symbol: string): string => {
  const upperSymbol = symbol.toUpperCase()
  
  // SVG fallback с первыми буквами символа
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="16" fill="#374151"/>
      <text x="16" y="20" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="10" font-weight="bold">
        ${upperSymbol.slice(0, 3)}
      </text>
    </svg>
  `)}`
}

// Альтернативные источники иконок
const getAlternativeIconSources = (symbol: string) => [
  `https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`,
  `https://cryptoicons.org/api/icon/${symbol.toLowerCase()}/200`,
  `https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/32/color/${symbol.toLowerCase()}.png`,
  `https://coinicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
  getFallbackIcon(symbol)
]

const CryptoTag: React.FC<CryptoTagProps> = ({ crypto }) => {
  const [currentImageSrc, setCurrentImageSrc] = useState(crypto.image)
  const [imageError, setImageError] = useState(false)
  const [fallbackIndex, setFallbackIndex] = useState(0)
  
  const priceChangeClass = crypto.price_change_percentage_24h >= 0 
    ? styles.cryptoTagGreen 
    : styles.cryptoTagRed

  const handleImageError = useCallback(() => {
    const alternatives = getAlternativeIconSources(crypto.symbol)
    
    if (fallbackIndex < alternatives.length - 1) {
      const nextIndex = fallbackIndex + 1
      setFallbackIndex(nextIndex)
      setCurrentImageSrc(alternatives[nextIndex])
    } else {
      setImageError(true)
      setCurrentImageSrc(getFallbackIcon(crypto.symbol))
    }
  }, [crypto.symbol, fallbackIndex])

  const handleImageLoad = useCallback(() => {
    setImageError(false)
  }, [])

  return (
    <div className={`${styles.cryptoTag} ${priceChangeClass}`}>
      <div className={styles.cryptoTagIconWrapper}>
        <Image
          className={`${styles.cryptoTagIcon} ${imageError ? styles.cryptoTagIconFallback : ''}`}
          src={currentImageSrc}
          alt={`${crypto.name} logo`}
          width={32}
          height={32}
          onError={handleImageError}
          onLoad={handleImageLoad}
          priority={false}
          loading="lazy"
          unoptimized={currentImageSrc.startsWith('data:')}
        />
      </div>
      
      <h3 className={styles.cryptoTagTitle}>
        {crypto.symbol.toUpperCase()}
      </h3>
      
      <div className={styles.cryptoTagPrice}>
        ${formatPrice(crypto.current_price)}
      </div>
      
      <div className={styles.cryptoTagPercent}>
        {formatPercentage(crypto.price_change_percentage_24h)}
      </div>
    </div>
  )
}

// Утилитарные функции (можно вынести в отдельный файл)
const formatPrice = (price: number): string => {
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

const formatPercentage = (percentage: number): string => {
  const sign = percentage >= 0 ? '+' : ''
  return `${sign}${percentage.toFixed(2)}%`
}


// Компонент загрузки
const LoadingSpinner: React.FC = () => (
  <div className={styles.loadingContainer}>
    <div className={styles.loadingSpinner} />
    <div className={styles.loadingText}>Loading real-time crypto prices...</div>
  </div>
)

// Компонент ошибки
interface ErrorDisplayProps {
  error: string
  onRetry: () => void
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => (
  <div className={styles.errorContainer}>
    <div className={styles.errorText}>
      {error} • 
      <button 
        onClick={onRetry} 
        className={styles.retryButton}
        aria-label="Retry loading crypto data"
      >
        Retry
      </button>
    </div>
  </div>
)

// Основной компонент
const PricesSection: React.FC = () => {
  const swiperRef = useRef<any>(null)
  const { data: cryptoData, loading, error, refetch } = useCryptoData()

  // Расширяем данные для бесшовного зацикливания
  const extendedCryptoData = cryptoData.length > 0 
    ? [...cryptoData, ...cryptoData, ...cryptoData]
    : []

  // Дублируем данные для более плавной анимации
  const tickerData = extendedCryptoData.length > 0
    ? [...extendedCryptoData, ...extendedCryptoData]
    : []

  return (
    <section className={`${styles.pricesSection} ${styles.pricesSectionTopSpacing}`}>
      {/* Crypto Ticker */}
      <div className={styles.pricesSectionCryptoTicker} data-aos="fade-up">
        {loading && <LoadingSpinner />}
        
        {error && !loading && (
          <ErrorDisplay error="Using cached data" onRetry={refetch} />
        )}
        
        {tickerData.length > 0 && (
          <Swiper
            ref={swiperRef}
            className={styles.ticker}
            spaceBetween={SLIDER_CONFIG.spaceBetween}
            slidesPerView="auto"
            loop={SLIDER_CONFIG.loop}
            speed={SLIDER_CONFIG.speed}
            autoplay={SLIDER_CONFIG.autoplay}
            modules={[Autoplay]}
            allowTouchMove={SLIDER_CONFIG.allowTouchMove}
            breakpoints={SLIDER_CONFIG.breakpoints}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
          >
            {tickerData.map((crypto, index) => (
              <SwiperSlide key={`${crypto.id}-${index}`} className={styles.swiperSlide}>
                <CryptoTag crypto={crypto} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      
      {/* Main Content */}
      <div className={styles.container}>
        <div className={styles.pricesSectionRow}>
          <div className={styles.pricesSectionCol} data-aos="fade-left">
            <h2 className={`${styles.title} ${styles.pricesSectionTitle}`}>
              A simple way to manage<br />cryptocurrency <br />around the world
            </h2>
            <p className={`${styles.pricesSectionText} ${styles.textColorGray350}`}>
              The freedom to manage your finances without the hassle.
              Minimalistic design, convenient{' '}
              <span className={styles.textColorLight}>P2P marketplace</span> and all
              key features in one place. Deposit, store, send and exchange
              cryptocurrency in a couple of clicks.{' '}
              <span className={styles.textColorLight}>Open a card</span> to instantly
              convert crypto to fiat and pay for your purchase anywhere in
              the world.
            </p>
          </div>
          <div className={styles.pricesSectionCol} data-aos="fade-right">
            <div className={styles.imageContainer}>
              <Image
                src="/img/prices-section/01.png"
                alt="Crypto wallet preview"
                width={600}
                height={800}
                className={styles.mainImage}
                priority={true}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Slogan Ticker - Desktop Only */}
      <div className={styles.pricesSectionSloganTicker} data-aos="fade-up">
        <Swiper
          className={`${styles.ticker} ${styles.sloganTicker}`}
          spaceBetween={0}
          slidesPerView="auto"
          loop={true}
          speed={15000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          modules={[Autoplay]}
          allowTouchMove={false}
        >
          {Array.from({ length: 8 }, (_, index) => (
            <SwiperSlide key={index} className={styles.sloganSlide}>
              <Image
                className={styles.pricesSectionSlogan}
                src="/img/prices-section/sand-swap-buy.svg"
                alt={`Sand swap buy slogan ${index + 1}`}
                width={1225}
                height={145}
                priority={false}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default PricesSection

/* 
  ТАКЖЕ НУЖНО ДОБАВИТЬ В next.config.js:

  const nextConfig = {
    images: {
      remotePatterns: [
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
        {
          protocol: 'https',
          hostname: 'assets.coincap.io',
          port: '',
          pathname: '/assets/icons/**',
        }
      ],
      domains: ['coin-images.coingecko.com', 'assets.coingecko.com', 'assets.coincap.io'],
    },
  }

  module.exports = nextConfig

  ИЛИ ДОБАВИТЬ В public/img/cryptocurrencies/ ЛОКАЛЬНЫЕ SVG ФАЙЛЫ:
  - btc.svg
  - eth.svg
  - bnb.svg
  - sol.svg
  - ada.svg
  - avax.svg
  - matic.svg
  - link.svg
  - ltc.svg
  - dot.svg
  - uni.svg
  - doge.svg
  - shib.svg
  - atom.svg
  - default.svg (fallback)
*/