'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import styles from './CustomPlayer.module.css'

interface CustomPlayerProps {
  videoSrc?: string
  posterSrc: string
  posterAlt: string
  note?: string
  className?: string
}

const CustomPlayer = ({ 
  videoSrc, 
  posterSrc, 
  posterAlt, 
  note,
  className = '' 
}: CustomPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (!videoRef.current || !videoSrc) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className={`${styles.customPlayer} ${isPlaying ? styles.active : ''} ${className}`}>
      <div className={styles.body}>
        <div className={styles.content}>
          {videoSrc && (
            <video 
              ref={videoRef}
              src={videoSrc}
              muted
              loop
              playsInline
            />
          )}
          <Image
            src={posterSrc}
            alt={posterAlt}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
          />
        </div>
        <div className={styles.volumeButtons}></div>
        <div className={styles.powerButton}></div>
        {note && <div className={styles.note}>{note}</div>}
      </div>
      {videoSrc && (
        <button className={styles.button} onClick={togglePlay}></button>
      )}
    </div>
  )
}

export default CustomPlayer