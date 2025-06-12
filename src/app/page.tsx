'use client'

import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import Header from '@/components/Header/Header'
import Preview from '@/components/Preview/Preview'
import BenefitsSection from '@/components/BenefitsSection/BenefitsSection'
import AboutCards from '@/components/AboutCards/AboutCards'
import MediaContent from '@/components/MediaContent/MediaContent'
import PricesSection from '@/components/PricesSection/PricesSection'
import FaqSection from '@/components/FaqSection/FaqSection'
import AmbassadorsSection from '@/components/AmbassadorsSection/AmbassadorsSection'
import PartnersSection from '@/components/PartnersSection/PartnersSection'
import Footer from '@/components/Footer/Footer'
import Modal from '@/components/Modal/Modal'
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen'

import styles from './page.module.css'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    // Initialize AOS after loading
    const timer = setTimeout(() => {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic',
      })

      // Add loaded class after component mounts
      document.body.classList.add('loaded')
      
      // Cleanup loading
      setIsLoading(false)
      clearInterval(interval)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
      AOS.refresh()
    }
  }, [])

  if (isLoading) {
    return <LoadingScreen progress={loadingProgress} />
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section id="home">
          <Preview />
        </section>

        {/* About Section */}
        <section id="about">
          <BenefitsSection />
        </section>

        {/* Features Section */}
        <section id="features">
          <AboutCards />
        </section>

        {/* Social Network Demo */}
        <section id="social">
          <MediaContent 
            
          />
        </section>

        {/* Crypto Wallet Section */}
        <section id="wallet">
          <PricesSection />
        </section>

        {/* Dating App Demo */}
        <section id="dating">
          <MediaContent 
            variant="buddies"
          />
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <FaqSection />
        </section>

        {/* Ambassadors Section */}
        <section id="ambassadors">
          <AmbassadorsSection />
        </section>

        {/* Partners Section */}
        <section id="partners">
          <PartnersSection />
        </section>
      </main>

      <Footer />
      <Modal />
      
      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  )
}

// Back to Top Button Component
const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      className={`${styles.backToTop} ${isVisible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}