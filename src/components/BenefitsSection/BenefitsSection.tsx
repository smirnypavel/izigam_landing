'use client'

import { useState } from 'react'
import styles from './BenefitsSection.module.css'

const BenefitsSection = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <section className={`${styles.section} ${styles.topSpacing}`}>
      <div className={styles.container}>
        <h2 className={`${styles.title} ${styles.titleAnimation} fw-700 text-center`}>
          Freedom of communication<br />and possibilities in one app
        </h2>
        
        <div className={`${styles.semiHiddenContent} ${isExpanded ? styles.active : ''}`}>
          <p className="fw-500 text-color-gray-300 text-center">
            is not just an app, but an ecosystem where WEB3.0 technologies
            open up a world of uncompromising freedom of speech and
            opportunities. Here you can socialise, get inspired, find
            like-minded people and make money. Every feature of IZIGRAM is
            designed to bring people together and give them more control
            over their content, connections, and finances IZIGRAM combines
            the best of everything: messenger, social network,
            cryptocurrency wallet and dating service. Create, communicate,
            earn and manage your digital world without limits.
          </p>
          <button 
            className={`${styles.moreButton} ${styles.semiHiddenButton}`}
            onClick={toggleExpanded}
          >
            Read more
            <svg viewBox="0 0 20 20">
              <path
                d="M1.25 5.625L9.52885 14.1646C9.58928 14.231 9.66226 14.284 9.7433 14.3201C9.82433 14.3563 9.9117 14.375 10 14.375C10.0883 14.375 10.1757 14.3563 10.2567 14.3201C10.3377 14.284 10.4107 14.231 10.4712 14.1646L18.75 5.625"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className={styles.benefitsCards}>
          <div className={styles.benefitsCard} data-aos="fade-up">
            <p className={`fw-500 ${styles.benefitsCardText}`}>
              Everything you need in one place
            </p>
            <h3 className={`fw-500 ${styles.benefitsCardTitle}`}>Versatility</h3>
          </div>
          <div className={styles.benefitsCard} data-aos="fade-up">
            <p className={`fw-500 ${styles.benefitsCardText}`}>
              Earn from subscriptions
            </p>
            <h3 className={`fw-500 ${styles.benefitsCardTitle}`}>Opportunities</h3>
          </div>
          <div className={styles.benefitsCard} data-aos="fade-up">
            <p className={`fw-500 ${styles.benefitsCardText}`}>
              Artificial intelligence and WEB3.0 technologies
            </p>
            <h3 className={`fw-500 ${styles.benefitsCardTitle}`}>Innovations</h3>
          </div>
          <div className={styles.benefitsCard} data-aos="fade-up">
            <p className={`fw-500 ${styles.benefitsCardText}`}>
              Complete data protection
            </p>
            <h3 className={`fw-500 ${styles.benefitsCardTitle}`}>Freedom</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection