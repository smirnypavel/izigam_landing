'use client'

import { useState, useEffect } from 'react'
import styles from './Preview.module.css'

const texts = [
  "Everything is under your control",
  "Buddies mode, dating nearby", 
  "AI helps you express your thought",
  "Convenient crypto wallet",
  "Earn money from your art",
  "Sell the product without commitment"
]

const Preview = () => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    // Имитируем загрузку страницы
    const loadTimer = setTimeout(() => {
      const activeTimer = setTimeout(() => setIsActive(true), 500)
      return () => clearTimeout(activeTimer)
    }, 300)
    
    return () => clearTimeout(loadTimer)
  }, [])

  useEffect(() => {
    if (!isActive) return

    const text = texts[currentIndex]
    let charIndex = 0

    const typeText = () => {
      if (charIndex < text.length) {
        setCurrentText(text.slice(0, charIndex + 1))
        charIndex++
        setTimeout(typeText, 50)
      } else {
        setIsTyping(false)
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % texts.length)
          setCurrentText('')
          setIsTyping(true)
          charIndex = 0
        }, 2000)
      }
    }

    typeText()
  }, [currentIndex, isActive])

  // Определяем состояние для гексагона
  const getObjectClass = () => {
    let classes = styles.previewObject
    if (currentIndex === 1) classes += ` ${styles.activeState2}`
    else if (currentIndex === 2) classes += ` ${styles.activeState3}`
    else if (currentIndex === 3) classes += ` ${styles.activeState4}`
    else if (currentIndex === 4) classes += ` ${styles.activeState5}`
    else if (currentIndex === 5) classes += ` ${styles.activeState6}`
    if (currentIndex === texts.length - 1) classes += ` ${styles.lastState}`
    return classes
  }

  return (
    <section>
      <div className={styles.container}>
        <div className={`${styles.preview} ${isActive ? styles.active : ''}`}>
          <div className={styles.previewContent}>
            <div 
              className={`${styles.previewText} ${isTyping ? styles.textActive : ''}`}
            >
              {currentText}
            </div>
            <div className={styles.previewTitleWrp}>
              <h1 className={styles.previewTitle}>with izigram</h1>
            </div>
            <div className={styles.previewButtons}>
              <a
                href="#timer-modal"
                className={styles.storeButton}
                target="_blank"
              >
                App Store
                <svg viewBox="0 0 20 20">
                  <path d="M18.1603 15.5861C17.8578 16.2848 17.4998 16.928 17.085 17.5194C16.5196 18.3255 16.0567 18.8835 15.6999 19.1934C15.1468 19.702 14.5542 19.9625 13.9197 19.9773C13.4641 19.9773 12.9148 19.8477 12.2753 19.5847C11.6337 19.323 11.0441 19.1934 10.505 19.1934C9.93957 19.1934 9.33317 19.323 8.68455 19.5847C8.03494 19.8477 7.51162 19.9847 7.11151 19.9983C6.50301 20.0242 5.89649 19.7563 5.29107 19.1934C4.90467 18.8563 4.42135 18.2786 3.84235 17.4601C3.22114 16.586 2.71042 15.5725 2.3103 14.417C1.8818 13.1689 1.66699 11.9603 1.66699 10.7902C1.66699 9.44984 1.95661 8.29383 2.53672 7.32509C2.99263 6.54697 3.59915 5.93316 4.35826 5.48255C5.11738 5.03195 5.9376 4.80233 6.8209 4.78764C7.30422 4.78764 7.93803 4.93714 8.72566 5.23096C9.51106 5.52576 10.0154 5.67526 10.2365 5.67526C10.4018 5.67526 10.962 5.50045 11.9117 5.15195C12.8098 4.82875 13.5678 4.69492 14.1888 4.74764C15.8715 4.88344 17.1356 5.54675 17.9763 6.74177C16.4715 7.6536 15.727 8.93072 15.7419 10.5691C15.7554 11.8452 16.2184 12.9071 17.1282 13.7503C17.5406 14.1417 18.001 14.4441 18.5134 14.6589C18.4023 14.9812 18.285 15.2898 18.1603 15.5861ZM14.3012 0.400114C14.3012 1.40034 13.9357 2.33425 13.2074 3.19867C12.3284 4.22629 11.2652 4.8201 10.1123 4.7264C10.0976 4.60641 10.0891 4.48011 10.0891 4.3474C10.0891 3.38718 10.5071 2.35956 11.2494 1.51934C11.62 1.09392 12.0914 0.74019 12.6629 0.458013C13.2333 0.180046 13.7728 0.0263242 14.2802 0C14.295 0.133715 14.3012 0.267451 14.3012 0.400114Z" />
                </svg>
              </a>
              <a
                href="#timer-modal"
                className={styles.storeButton}
                target="_blank"
              >
                Google play
                <svg viewBox="0 0 20 20">
                  <path d="M12.707 9.15234L4.08594 0.507812L15.0547 6.80469L12.707 9.15234ZM1.83594 0C1.32813 0.265625 0.988281 0.75 0.988281 1.37891V18.6172C0.988281 19.2461 1.32813 19.7305 1.83594 19.9961L11.8594 9.99609L1.83594 0ZM18.4453 8.8125L16.1445 7.48047L13.5781 10L16.1445 12.5195L18.4922 11.1875C19.1953 10.6289 19.1953 9.37109 18.4453 8.8125ZM4.08594 19.4922L15.0547 13.1953L12.707 10.8477L4.08594 19.4922Z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className={styles.previewNav}>
            <ul>
              <li>
                <a href="#">We're up and running</a>
              </li>
              <li>
                <a href="#">A new opportunity in the wallet</a>
              </li>
              <li>
                <a href="#" className={styles.navWithIcon}>
                  Our latest update
                  <svg viewBox="0 0 20 20">
                    <path
                      d="M5.15625 2.73438L16.4583 10L5.15625 17.2656V2.73438Z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <div className={getObjectClass()}>
            <div className={styles.previewObjectContent}>
              {[1, 2, 3, 4, 5, 6].map((num, index) => (
                <div 
                  key={num} 
                  className={`${styles.previewObjectIcon} ${currentIndex === index ? styles.iconActive : ''}`}
                >
                  <img
                    src={`/img/preview/objects/0${num}.svg`}
                    alt={`Preview icon ${num}`}
                    width="52"
                    height="52"
                  />
                </div>
              ))}
            </div>
            <div className={styles.previewObjectBackground}>
              <svg viewBox="0 0 400 400" fill="none">
                {/* Секция 1 - левая */}
                <path
                  className={currentIndex === 0 ? styles.pathActive : ''}
                  d="M38.7949 112.241L38.7949 112.241L132.358 166.259C133.981 167.196 134.982 168.93 134.983 170.806C134.983 170.806 134.983 170.806 134.983 170.807L134.982 230.293C134.982 232.169 133.982 233.902 132.357 234.839L132.357 234.839L38.7949 288.858L39.2949 289.724L38.7949 288.858C35.295 290.879 30.9199 288.354 30.9199 284.311V116.787C30.9199 112.746 35.2949 110.22 38.7949 112.241Z"
                  fill="url(#fillGradient)"
                  fillOpacity="0.15"
                  stroke="#FA99FF"
                  strokeWidth="2"
                  strokeOpacity="0.1"
                />
                {/* Секция 2 - левая нижняя */}
                <path
                  className={currentIndex === 1 ? styles.pathActive : ''}
                  d="M42.9198 296.003L42.92 296.003L136.482 241.984C136.482 241.984 136.482 241.984 136.482 241.984C138.107 241.047 140.109 241.047 141.732 241.984L193.25 271.728L193.25 271.728C194.875 272.666 195.875 274.398 195.875 276.274V384.311C195.875 388.352 191.5 390.878 188 388.858L42.92 305.096C42.92 305.096 42.92 305.096 42.9199 305.096C39.4198 303.075 39.4201 298.023 42.9198 296.003Z"
                  fill="url(#fillGradient)"
                  fillOpacity="0.15"
                  stroke="#FA99FF"
                  strokeWidth="2"
                  strokeOpacity="0.1"
                />
                {/* Секция 3 - правая нижняя */}
                <path
                  className={currentIndex === 2 ? styles.pathActive : ''}
                  d="M206.75 271.728L206.75 271.728L258.267 241.984C259.892 241.047 261.893 241.047 263.517 241.984L357.08 296.003L357.08 296.003C360.58 298.023 360.58 303.075 357.08 305.096L212 388.858C208.5 390.878 204.125 388.352 204.125 384.311V276.274C204.125 274.398 205.125 272.666 206.75 271.728Z"
                  fill="url(#fillGradient)"
                  fillOpacity="0.15"
                  stroke="#FA99FF"
                  strokeWidth="2"
                  strokeOpacity="0.1"
                />
                {/* Секция 4 - правая */}
                <path
                  className={currentIndex === 3 ? styles.pathActive : ''}
                  d="M267.642 234.84L267.142 235.706L267.642 234.84C266.018 233.902 265.017 232.169 265.017 230.294V170.807C265.017 168.931 266.018 167.197 267.642 166.26L361.205 112.241C361.205 112.241 361.205 112.241 361.205 112.241C364.705 110.221 369.08 112.747 369.08 116.788V284.312C369.08 288.353 364.705 290.879 361.205 288.859L267.642 234.84Z"
                  fill="url(#fillGradient)"
                  fillOpacity="0.15"
                  stroke="#FA99FF"
                  strokeWidth="2"
                  strokeOpacity="0.1"
                />
                {/* Секция 5 - правая верхняя */}
                <path
                  className={currentIndex === 4 ? styles.pathActive : ''}
                  d="M263.517 159.114L263.517 159.115C261.893 160.053 259.892 160.053 258.267 159.115L258.267 159.114L206.75 129.372C206.75 129.372 206.75 129.371 206.75 129.371C205.125 128.433 204.125 126.7 204.125 124.824V16.7877C204.125 12.7462 208.5 10.2203 212 12.241C212 12.241 212 12.241 212 12.241L357.08 96.0031L357.58 95.1371L357.08 96.0031C360.58 98.0238 360.58 103.075 357.08 105.096L263.517 159.114Z"
                  fill="url(#fillGradient)"
                  fillOpacity="0.15"
                  stroke="#FA99FF"
                  strokeWidth="2"
                  strokeOpacity="0.1"
                />
                {/* Секция 6 - левая верхняя */}
                <path
                  className={currentIndex === 5 ? styles.pathActive : ''}
                  d="M136.483 159.115L136.483 159.114L42.92 105.096C42.92 105.096 42.92 105.096 42.9199 105.096C39.4199 103.075 39.42 98.0238 42.9199 96.003L188 12.241C191.5 10.2203 195.875 12.7462 195.875 16.7877V124.824C195.875 126.7 194.875 128.433 193.25 129.371C193.25 129.371 193.25 129.371 193.25 129.371L141.733 159.114L141.733 159.114C140.108 160.053 138.107 160.053 136.483 159.115Z"
                  fill="url(#fillGradient)"
                  fillOpacity="0.15"
                  stroke="#FA99FF"
                  strokeWidth="2"
                  strokeOpacity="0.1"
                />
                <defs>
                  <linearGradient
                    id="fillGradient"
                    x1="140.223"
                    y1="425.138"
                    x2="260.727"
                    y2="-24.5882"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#FF9999" />
                    <stop offset="0.499082" stopColor="#FA99FF" />
                    <stop offset="1" stopColor="#A399FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Preview