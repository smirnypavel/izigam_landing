'use client'
import { useState, useEffect } from 'react'
import styles from './Modal.module.css'

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
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
    const calculateTimeLeft = () => {
      // Target date: October 1, 2025 00:00:00
      const targetDate = new Date('2025-10-01T00:00:00').getTime()
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        return { days, hours, minutes, seconds }
      } else {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }
    }

    // Set initial time
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`${styles.modal} ${isOpen ? styles.active : ''}`} id="timer-modal">
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.content}>
            <h3 className={`${styles.title} fw-500 text-center`}>Countdown to Q4 2025</h3>
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