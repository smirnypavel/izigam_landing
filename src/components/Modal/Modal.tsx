'use client'

import { useState, useEffect } from 'react'
import styles from './Modal.module.css'

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  useEffect(() => {
    const handleOpenModal = (e: Event) => {
      e.preventDefault()
      const target = e.target as HTMLElement
      if (target.closest('[href="#timer-modal"]') || target.closest('.open-modal')) {
        setIsOpen(true)
      }
    }

    const handleCloseModal = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest('.close-modal')) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleOpenModal)
    document.addEventListener('click', handleCloseModal)

    return () => {
      document.removeEventListener('click', handleOpenModal)
      document.removeEventListener('click', handleCloseModal)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        } else if (days > 0) {
          days--
          hours = 23
          minutes = 59
          seconds = 59
        }
        
        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`${styles.modal} ${isOpen ? styles.active : ''}`} id="timer-modal">
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h3 className={`${styles.title} fw-500 text-center`}>Step by step</h3>
            <div className={styles.timer}>
              <div className={styles.timerSection}>
                <span>{timeLeft.days.toString().padStart(2, '0')}</span>
                days
              </div>
              <div className={styles.timerSection}>
                <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
                hours
              </div>
              <div className={styles.timerSection}>
                <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
                minutes
              </div>
              <div className={styles.timerSection}>
                <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
                seconds
              </div>
            </div>
            <button className={`${styles.button} ${styles.buttonClose} close-modal`}>
              <svg viewBox="0 0 16 16">
                <path
                  d="M15 1L1 15"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 1L15 15"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Close
            </button>
          </div>
        </div>
        <div className={`${styles.area} close-modal`}></div>
      </div>
    </div>
  )
}

export default Modal