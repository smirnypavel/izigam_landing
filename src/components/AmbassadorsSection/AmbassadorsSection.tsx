'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import styles from './AmbassadorsSection.module.css'

const ambassadors = [
  {
    id: 1,
    name: "Maria",
    username: "Maverick",
    followers: "150K subs",
    image: "/img/ambassadors/portrait-woman.jpeg",
    instagram: "https://instagram.com",
  },
  {
    id: 2,
    name: "James",
    username: "James",
    followers: "420K subs",
    image: "/img/ambassadors/portrait-man.jpeg",
    instagram: "https://instagram.com",
  },
  {
    id: 3,
    name: "Sophia",
    username: "Sophia",
    followers: "1.2M subs",
    image: "/img/ambassadors/portrait-woman1.jpeg",
    instagram: "https://instagram.com",
  },
  {
    id: 4,
    name: "Michael",
    username: "Michael",
    followers: "650K subs",
    image: "/img/ambassadors/portrait-man2.jpeg",
    instagram: "https://instagram.com",
  },
  {
    id: 5,
    name: "Emma",
    username: "Emma",
    followers: "980K subs",
    image: "/img/ambassadors/portrait-woman3.jpeg",
    instagram: "https://instagram.com",
  },
  {
    id: 6,
    name: "Daniel",
    username: "Daniel",
    followers: "830K subs",
    image: "/img/ambassadors/portrait-woman4.jpeg",
    instagram: "https://instagram.com",
  },
  {
    id: 7,
    name: "Olivia",
    username: "Olivia",
    followers: "1.5M subs",
    image: "/img/ambassadors/portrait-woman5.jpeg",
    instagram: "https://instagram.com",
  },
  {
    id: 8,
    name: "Noah",
    username: "Noah",
    followers: "1.7M subs",
    image: "/img/ambassadors/portrait-woman6.jpeg",
    instagram: "https://instagram.com",
  },
  {
    id: 9,
    name: "Isabella",
    username: "Isabella",
    followers: "2.1M subs",
    image: "/img/ambassadors/portrait-woman7.jpeg",
    instagram: "https://instagram.com",
  },
  {
    id: 10,
    name: "Lucas",
    username: "Lucas",
    followers: "750K subs",
    image: "/img/ambassadors/portrait-woman.jpeg",
    instagram: "https://instagram.com",
  },
  {
    id: 11,
    name: "Ethan",
    username: "Ethan",
    followers: "3.2M subs",
    image: "/img/ambassadors/portrait-man3.jpeg",
    instagram: "https://instagram.com",
  },
  {
    id: 12,
    name: "Charlotte",
    username: "Charlotte",
    followers: "1.9M subs",
    image: "/img/ambassadors/portrait-man2.jpeg",
    instagram: "https://instagram.com",
  }
]

const AmbassadorsSection = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed)
  }

  const renderAmbassadorCard = (ambassador: any, index: number) => (
    <div key={`${ambassador.id}-${index}`} className={styles.ambassadorCard}>
      <div className={styles.hexagonBorder}>
        <div className={styles.hexagonContent}>
          <Image
            src={ambassador.image}
            alt={ambassador.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      <div className={styles.ambassadorInfo}>
        <div className={styles.ambassadorUsername}>{ambassador.username}</div>
        <div className={styles.ambassadorFollowers}>{ambassador.followers}</div>
      </div>
      <a 
        href={ambassador.instagram} 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.linkIcon}
        aria-label={`Visit ${ambassador.username}'s Instagram`}
      >
        <ExternalLink size={16} />
      </a>
    </div>
  )

  // Создаем бесконечные ряды без пустых мест
  const createInfiniteRow = (ambassadorsList: any[]) => {
    // Дублируем массив достаточное количество раз для бесшовной анимации
    const repeatedArray = []
    for (let i = 0; i < 4; i++) {
      repeatedArray.push(...ambassadorsList)
    }
    return repeatedArray
  }

  const row1 = createInfiniteRow(ambassadors.slice(0, 6))
  const row2 = createInfiniteRow(ambassadors.slice(6, 12))

  return (
    <section className={`${styles.section} ${styles.bottomSpacing}`} data-aos="fade-up">
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2 className={`${styles.title} ${styles.titleAnimation} fw-700`}>
            Our Ambassadors
          </h2>
          <h2 className={`${styles.title} ${styles.titleAnimation} fw-700`}>
            Audience of 3,000,000 people
          </h2>
        </div>

        <div className={`${styles.ambassadorsSection} ${isCollapsed ? styles.collapsed : ''}`}>
          <div className={styles.ambassadorsExpanded}>
            <div className={styles.ambassadorsScrollContainer}>
              <div className={styles.ambassadorsRows}>
                <div className={`${styles.ambassadorRow} ${styles.row1}`}>
                  {row1.map((ambassador, index) => 
                    renderAmbassadorCard(ambassador, index)
                  )}
                </div>
                <div className={`${styles.ambassadorRow} ${styles.row2}`}>
                  {row2.map((ambassador, index) => 
                    renderAmbassadorCard(ambassador, index)
                  )}
                </div>
              </div>
            </div>
            <div className={styles.ambassadorsFadeLeft}></div>
            <div className={styles.ambassadorsFadeRight}></div>
          </div>
          
          <button 
            className={styles.ambassadorsToggleBtn}
            onClick={toggleCollapsed}
            aria-label={isCollapsed ? 'Show all ambassadors' : 'Show fewer ambassadors'}
          >
            {isCollapsed ? 'Show All' : 'Show Less'}
            {isCollapsed ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

export default AmbassadorsSection