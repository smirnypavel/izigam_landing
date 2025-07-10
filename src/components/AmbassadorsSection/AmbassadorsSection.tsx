'use client'

import { useState, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { ExternalLink, ChevronDown, ChevronUp, X } from 'lucide-react'
import styles from './AmbassadorsSection.module.css'

// TypeScript типы
interface Ambassador {
  id: number
  name: string
  username: string
  followers: string
  image: string
  instagram: string
  tiktok: string
}

interface SocialModalProps {
  isOpen: boolean
  onClose: () => void
  ambassador: Ambassador | null
}

interface AmbassadorCardProps {
  ambassador: Ambassador
  onSocialClick: (ambassador: Ambassador) => void
}

interface DragState {
  x: number
  scrollLeft: number
}

// Константы для лучшей читаемости
const SCROLL_MULTIPLIER: number = 2
const TRANSITION_DURATION: number = 0.8

// Данные амбассадоров
const AMBASSADORS_DATA: Ambassador[] = [
  {
    id: 1,
    name: "volkov_kx",
    username: "volkov_kx",
    followers: "20K subs",
    image: "/img/ambassadors/5.jpg",
    instagram: "https://www.instagram.com/volkov_kx?igsh=eTdod2dhNmhrdDc4",
    tiktok: "https://www.tiktok.com/@volkov.kx?_t=ZS-8xpxWEPjKS7&_r=1",
  },
 
  {
    id: 2,
    name: "this_is_barta",
    username: "this_is_barta",
    followers: "137K subs",
    image: "/img/ambassadors/2.jpg",
    instagram: "https://www.instagram.com/this_is_barta?igsh=MW8wYzMycms1eWFqOQ==",
    tiktok: "https://www.tiktok.com/@this_is_barta?_t=ZM-8vv5bQwCbi9&_r=1",
  },
  {
    id: 3,
    name: "rusvik",
    username: "rusvik",
    followers: "524K subs",
    image: "/img/ambassadors/3.jpg",
    instagram: "https://www.instagram.com/rusvik.official/?utm_source=ig_web_button_share_sheet",
    tiktok: "https://www.tiktok.com/@rusvik.official?_t=ZM-8vzMIh4uGwQ&_r=1",
  },
  {
    id: 4,
    name: "the.madaa",
    username: "the.madaa",
    followers: "410K subs",
    image: "/img/ambassadors/4.jpg",
    instagram: "https://www.instagram.com/the.madaa?igsh=MWJwcjV4MzA1Z2trbQ==",
    tiktok: "https://www.tiktok.com/@the.madaa?_t=ZM-8w1GijXFDXD&_r=1",
  },
  {
    id: 5,
    name: "pppelvetskiyyy",
    username: "pppelvetskiyyy",
    followers: "1.1M subs",
    image: "/img/ambassadors/1.jpg",
    instagram: "https://www.instagram.com/pppelvetskiyyy/?utm_source=ig_web_button_share_sheet",
    tiktok: "https://www.tiktok.com/@pppelvetskiyyy?_t=ZM-8vxzmh8MrLi&_r=1",
  },
  {
    id: 6,
    name: "_woodysmoke",
    username: "_woodysmoke",
    followers: "18K subs",
    image: "/img/ambassadors/6.jpg",
    instagram: "https://www.instagram.com/_woodysmoke?igsh=a28xdTh0b3BrcjY=",
    tiktok: "https://www.tiktok.com/@_woodysmoke?_t=ZM-8xr3XvZ0nED&_r=1",
  },
  {
    id: 7,
    name: "torlviv",
    username: "torlviv",
    followers: "102K subs",
    image: "/img/ambassadors/7.jpg",
    instagram: "https://www.instagram.com/torlviv?igsh=MXRuYXI2eHptY3YwZg==",
    tiktok: "https://www.tiktok.com/@pasha_tor?_t=ZM-8xr3Tv6KPkU&_r=1",
  },
  {
    id: 8,
    name: "maria",
    username: "maria.pankiv",
    followers: "970K subs",
    image: "/img/ambassadors/9.jpg",
    instagram: "https://www.instagram.com/maria.pankiv?igsh=MXd5NmZwc2dnY2tjdg==",
    tiktok: "https://www.tiktok.com/@mariia_pankiv?_t=ZM-8xrOghJYr82&_r=1",
  },
  {
    id: 9,
    name: "gavrilyuk",
    username: "gavrilyuk",
    followers: "102K subs",
    image: "/img/ambassadors/8.jpg",
    instagram: "https://www.instagram.com/gavrilyuk.danilo?igsh=MWY0ZzM0a2Jla2xiNw%3D%3D&utm_source=qr",
    tiktok: "https://www.tiktok.com/@danilo.gavrilyuk?_t=ZM-8xrNNCZyVhG&_r=1",
  },
  
]

// Модальное окно для выбора социальной сети
const SocialModal: React.FC<SocialModalProps> = ({ isOpen, onClose, ambassador }) => {
  if (!isOpen || !ambassador) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Choose Platform</h3>
          <button
            onClick={onClose}
            className={styles.modalCloseBtn}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className={styles.modalUserInfo}>
          <div className={styles.modalAvatar}>
            <Image
              src={ambassador.image}
              alt={ambassador.name}
              width={64}
              height={64}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h4 className={styles.modalUsername}>{ambassador.username}</h4>
          <p className={styles.modalFollowers}>{ambassador.followers}</p>
        </div>
        
        <div className={styles.modalButtons}>
          <a
            href={ambassador.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.modalBtn} ${styles.instagramBtn}`}
          >
            <svg className={styles.modalBtnIcon} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Instagram
          </a>
          
          <a
            href={ambassador.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.modalBtn} ${styles.tiktokBtn}`}
          >
            <svg className={styles.modalBtnIcon} fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-1.032-.17 6.395 6.395 0 0 0-5.398 10.692 6.397 6.397 0 0 0 10.923-4.618V8.054a8.23 8.23 0 0 0 4.741 1.492v-3.06a4.795 4.795 0 0 1-.001.2z"/>
            </svg>
            TikTok
          </a>
        </div>
      </div>
    </div>
  )
}

// Компонент для отдельной карточки амбассадора
const AmbassadorCard: React.FC<AmbassadorCardProps> = ({ ambassador, onSocialClick }) => {
  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onSocialClick(ambassador)
  }, [ambassador, onSocialClick])

  return (
    <div className={styles.ambassadorCard}>
      <div className={styles.hexagonBorder}>
        <div className={styles.hexagonContent}>
          <Image
            src={ambassador.image}
            alt={`${ambassador.name} - ${ambassador.username}`}
            fill
            sizes="(max-width: 480px) 120px, (max-width: 768px) 160px, (max-width: 1200px) 200px, 240px"
            style={{ objectFit: 'cover' }}
            priority={ambassador.id <= 6}
          />
        </div>
      </div>
      
      <div className={styles.ambassadorInfo}>
        <div className={styles.ambassadorUsername}>{ambassador.username}</div>
        <div className={styles.ambassadorFollowers}>{ambassador.followers}</div>
      </div>
      
      <button
        onClick={handleLinkClick}
        className={styles.linkIcon}
        aria-label={`Visit ${ambassador.username}'s social profiles`}
      >
        <ExternalLink size={16} />
      </button>
    </div>
  )
}

// Основной компонент
const AmbassadorsSection: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragStart, setDragStart] = useState<DragState>({ x: 0, scrollLeft: 0 })
  const [modalAmbassador, setModalAmbassador] = useState<Ambassador | null>(null)

  // Мемоизация для подсчета общей аудитории
  const totalAudience = useMemo((): number => {
    return AMBASSADORS_DATA.reduce((total: number, ambassador: Ambassador) => {
      const followers = ambassador.followers.replace(/[^\d.]/g, '')
      const multiplier = ambassador.followers.includes('M') ? 1000000 : 1000
      return total + (parseFloat(followers) * multiplier)
    }, 0)
  }, [])

  // Форматирование числа аудитории
  const formattedAudience = useMemo((): string => {
    return (totalAudience / 1000000).toFixed(1) + 'M'
  }, [totalAudience])

  // Обработчики событий с useCallback для оптимизации
  const toggleCollapsed = useCallback((): void => {
    setIsCollapsed(prev => !prev)
  }, [])

  const handleSocialClick = useCallback((ambassador: Ambassador): void => {
    setModalAmbassador(ambassador)
  }, [])

  const closeModal = useCallback((): void => {
    setModalAmbassador(null)
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    // Не перетягиваем если клик по кнопке
    if ((e.target as HTMLElement).closest('button')) return
    
    setIsDragging(true)
    const container = e.currentTarget
    setDragStart({
      x: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft
    })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return
    e.preventDefault()
    
    const container = e.currentTarget
    const x = e.pageX - container.offsetLeft
    const walk = (x - dragStart.x) * SCROLL_MULTIPLIER
    container.scrollLeft = dragStart.scrollLeft - walk
  }, [isDragging, dragStart])

  const handleMouseUp = useCallback((): void => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback((): void => {
    setIsDragging(false)
  }, [])

  // Touch события
  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLDivElement>): void => {
    const container = e.currentTarget
    const touch = e.touches[0]
    setDragStart({
      x: touch.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft
    })
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLDivElement>): void => {
    const container = e.currentTarget
    const touch = e.touches[0]
    const x = touch.pageX - container.offsetLeft
    const walk = (x - dragStart.x) * SCROLL_MULTIPLIER
    container.scrollLeft = dragStart.scrollLeft - walk
  }, [dragStart])

  // Добавляем обработчики для колесика мыши
  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>): void => {
    e.preventDefault()
    const container = e.currentTarget
    container.scrollLeft += e.deltaY
  }, [])

  // Группируем амбассадоров по рядам для honeycomb структуры
  const ambassadorRows = useMemo((): Ambassador[][] => {
    const rows: Ambassador[][] = []
    for (let i = 0; i < AMBASSADORS_DATA.length; i += 3) {
      rows.push(AMBASSADORS_DATA.slice(i, i + 3))
    }
    return rows
  }, [])

  return (
    <section className={`${styles.section} ${styles.bottomSpacing}`} data-aos="fade-up">
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <h2 className={`${styles.title} ${styles.titleAnimation} fw-700`}>
            Our Ambassadors
          </h2>
          <h2 className={`${styles.title} ${styles.titleAnimation} fw-700`}>
            Audience of {formattedAudience} people
          </h2>
        </div>

        <div className={`${styles.ambassadorsSection} ${isCollapsed ? styles.collapsed : ''}`}>
          <div 
            className={`${styles.ambassadorsExpanded} ${isDragging ? styles.dragging : ''}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onWheel={handleWheel}
            role="region"
            aria-label="Ambassadors gallery"
          >
            <div className={styles.hexagonGrid}>
              {ambassadorRows.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.honeycombRow}>
                  {row.map((ambassador) => (
                    <AmbassadorCard 
                      key={ambassador.id} 
                      ambassador={ambassador}
                      onSocialClick={handleSocialClick}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className={styles.ambassadorsToggleBtn}
            onClick={toggleCollapsed}
            aria-label={isCollapsed ? 'Show all ambassadors' : 'Show fewer ambassadors'}
            aria-expanded={!isCollapsed}
          >
            {isCollapsed ? 'Show All' : 'Show Less'}
            {isCollapsed ? (
              <ChevronDown size={20} aria-hidden="true" />
            ) : (
              <ChevronUp size={20} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <SocialModal 
        isOpen={!!modalAmbassador}
        onClose={closeModal}
        ambassador={modalAmbassador}
      />
    </section>
  )
}

export default AmbassadorsSection