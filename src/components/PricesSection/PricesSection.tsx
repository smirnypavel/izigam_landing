'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import CustomPlayer from '../CustomPlayer/CustomPlayer'
import styles from './PricesSection.module.css'

// Import Swiper styles
import 'swiper/css'

interface CryptoData {
  icon: string
  title: string
  price: string
  percent: string
  type: 'green' | 'red'
}

const cryptoData: CryptoData[] = [
  {
    icon: "/img/cryptocurrencies/btc.svg",
    title: "BTC",
    price: "106 495 $",
    percent: "+2,05%",
    type: "green"
  },
  {
    icon: "/img/cryptocurrencies/bnb.svg",
    title: "BNB",
    price: "106 495 $",
    percent: "-1,2%",
    type: "red"
  },
  {
    icon: "/img/cryptocurrencies/dct.svg",
    title: "DCT",
    price: "51 $",
    percent: "+1,42%",
    type: "green"
  },
  {
    icon: "/img/cryptocurrencies/bay.svg",
    title: "BAY",
    price: "0,5 $",
    percent: "+22%",
    type: "green"
  },
  {
    icon: "/img/cryptocurrencies/chat.svg",
    title: "CHAT",
    price: "100 $",
    percent: "-8,5%",
    type: "red"
  }
]

interface CryptoTagProps {
  crypto: CryptoData
}

const CryptoTag: React.FC<CryptoTagProps> = ({ crypto }) => (
  <div className={`${styles.cryptoTag} ${crypto.type === 'green' ? styles.cryptoTagGreen : styles.cryptoTagRed}`}>
    <Image
      className={styles.cryptoTagIcon}
      src={crypto.icon}
      alt={crypto.title}
      width={32}
      height={32}
    />
    <h3 className={styles.cryptoTagTitle}>{crypto.title}</h3>
    <div className={styles.cryptoTagPrice}>{crypto.price}</div>
    <div className={styles.cryptoTagPercent}>{crypto.percent}</div>
  </div>
)

const PricesSection: React.FC = () => {
  const swiperRef = useRef<any>(null)

  // Triple the crypto data for seamless looping
  const extendedCryptoData = [...cryptoData, ...cryptoData, ...cryptoData]

  return (
    <section className={`${styles.pricesSection} ${styles.pricesSectionTopSpacing}`}>
      {/* Crypto Ticker */}
      <div className={styles.pricesSectionCryptoTicker} data-aos="fade-up">
        <Swiper
          ref={swiperRef}
          className={styles.ticker}
          spaceBetween={12}
          slidesPerView="auto"
          loop={true}
          speed={8000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            reverseDirection: false,
          }}
          modules={[Autoplay]}
          allowTouchMove={false}
          onSwiper={(swiper) => {
            swiperRef.current = swiper
          }}
        >
          {[...extendedCryptoData, ...extendedCryptoData].map((crypto, index) => (
            <SwiperSlide key={`${crypto.title}-${index}`} className={styles.swiperSlide}>
              <CryptoTag crypto={crypto} />
            </SwiperSlide>
          ))}
        </Swiper>
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
            <CustomPlayer
              videoSrc="/video/01.mp4"
              posterSrc="/img/prices-section/01.webp"
              posterAlt="Crypto wallet preview"
            />
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
          {[...Array(8)].map((_, index) => (
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