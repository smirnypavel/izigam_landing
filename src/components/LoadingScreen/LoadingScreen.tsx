'use client'

import { useEffect, useState } from 'react'
import styles from './LoadingScreen.module.css'

interface LoadingScreenProps {
  progress: number
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  const [displayText, setDisplayText] = useState('Loading')
  const [dots, setDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress < 30) {
      setDisplayText('Initializing')
    } else if (progress < 60) {
      setDisplayText('Loading Assets')
    } else if (progress < 90) {
      setDisplayText('Almost Ready')
    } else {
      setDisplayText('Welcome to IZIGRAM')
    }
  }, [progress])

  return (
    <div className={styles.loadingScreen}>
      <div className={styles.loadingContent}>
        {/* Logo Animation */}
        <div className={styles.logoContainer}>
          <div className={styles.logo}>
            <div className={styles.hexagon}>
              <div className={styles.hexagonInner}></div>
            </div>
            <h1 className={styles.brandName}>IZIGRAM</h1>
          </div>
        </div>

        {/* Progress Section */}
        <div className={styles.progressSection}>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          <div className={styles.loadingText}>
            {displayText}{dots}
          </div>
          
          <div className={styles.percentage}>
            {Math.round(Math.min(progress, 100))}%
          </div>
        </div>

        {/* Floating Elements */}
        <div className={styles.floatingElements}>
          <div className={styles.floatingElement} style={{ '--delay': '0s' } as any}></div>
          <div className={styles.floatingElement} style={{ '--delay': '0.5s' } as any}></div>
          <div className={styles.floatingElement} style={{ '--delay': '1s' } as any}></div>
          <div className={styles.floatingElement} style={{ '--delay': '1.5s' } as any}></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen