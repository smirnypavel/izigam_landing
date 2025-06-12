'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Calculate scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when route changes
  useEffect(() => {
    setIsNavOpen(false)
    setActiveSubmenu(null)
  }, [pathname])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (isNavOpen && !target.closest(`.${styles.nav}`) && !target.closest(`.${styles.navButton}`)) {
        setIsNavOpen(false)
        setActiveSubmenu(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isNavOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isNavOpen])

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
    setActiveSubmenu(null)
  }

  const toggleSubmenu = (menu: string, event?: React.MouseEvent) => {
    event?.preventDefault()
    setActiveSubmenu(activeSubmenu === menu ? null : menu)
  }

  const closeMenu = () => {
    setIsNavOpen(false)
    setActiveSubmenu(null)
  }

  const navigationItems = [
    { href: '#about', label: 'What is IZIGRAM' },
    { href: '#messenger', label: 'Messenger' },
    { href: '#social', label: 'Social network' },
    { href: '#wallet', label: 'Wallet' },
  ]

  const moreMenuItems = [
    { href: '#ambassadors', label: 'Ambassadors' },
    { href: '#partners', label: 'Partners' },
    { href: '#blog', label: 'Blog' },
    { href: '#support', label: 'Support' },
  ]

  const languages = [
    { code: 'en', label: 'English', active: true },
    { code: 'es', label: 'Español' },
    { code: 'ru', label: 'Русский' },
    { code: 'uk', label: 'Українська' },
  ]

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <Link href="/" className={styles.logo} onClick={closeMenu}>
            IZIGRAM
          </Link>
          
          <button 
            className={`${styles.navButton} ${isNavOpen ? styles.active : ''}`}
            onClick={toggleNav}
            aria-label="Toggle navigation"
            aria-expanded={isNavOpen}
          >
            <div></div>
          </button>

          <nav className={`${styles.nav} ${isNavOpen ? styles.active : ''}`}>
            {/* Main Navigation Items */}
            <ul className={styles.menu}>
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
              
              <li className={`${styles.menuItemHasChildren} ${activeSubmenu === 'more' ? styles.active : ''}`}>
                <a 
                  href="#" 
                  onClick={(e) => toggleSubmenu('more', e)}
                  aria-expanded={activeSubmenu === 'more'}
                >
                  More
                  <svg viewBox="0 0 20 20">
                    <path
                      d="M1.25 5.625L9.52885 14.1646C9.58928 14.231 9.66226 14.284 9.7433 14.3201C9.82433 14.3563 9.9117 14.375  10 14.375C10.0883 14.375 10.1757 14.3563 10.2567 14.3201C10.3377 14.284 10.4107 14.231 10.4712 14.1646L18.75 5.625"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <ul className={activeSubmenu === 'more' ? styles.submenuOpen : ''}>
                  {moreMenuItems.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} onClick={closeMenu}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            {/* Right Side Items */}
            <div className={styles.rightSection}>
              <Link href="#access" className={styles.link} onClick={closeMenu}>
                Gain access
                <svg viewBox="0 0 20 20">
                  <path
                    d="M12.5 2.5H17.5V7.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.33301 11.6667L17.4997 2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 10.8333V15.8333C15 16.2754 14.8244 16.6993 14.5118 17.0118C14.1993 17.3244 13.7754 17.5 13.3333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V6.66667C2.5 6.22464 2.67559 5.80072 2.98816 5.48816C3.30072 5.17559 3.72464 5 4.16667 5H9.16667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <ul className={styles.languageSwitcher}>
                <li className={activeSubmenu === 'language' ? styles.active : ''}>
                  <a 
                    href="#" 
                    onClick={(e) => toggleSubmenu('language', e)}
                    aria-expanded={activeSubmenu === 'language'}
                  >
                    {languages.find(lang => lang.active)?.label || 'English'}
                    <svg viewBox="0 0 20 20">
                      <path
                        d="M1.25 5.625L9.52885 14.1646C9.58928 14.231 9.66226 14.284 9.7433 14.3201C9.82433 14.3563 9.9117 14.375 10 14.375C10.0883 14.375 10.1757 14.3563 10.2567 14.3201C10.3377 14.284 10.4107 14.231 10.4712 14.1646L18.75 5.625"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <ul className={activeSubmenu === 'language' ? styles.submenuOpen : ''}>
                    {languages.map((lang) => (
                      <li key={lang.code}>
                        <a 
                          href="#" 
                          className={lang.active ? styles.activeLang : ''}
                          onClick={(e) => {
                            e.preventDefault()
                            closeMenu()
                            // Here you would implement language switching logic
                            console.log(`Switching to ${lang.label}`)
                          }}
                        >
                          {lang.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
          </nav>

          {/* Mobile overlay */}
          {isNavOpen && <div className={styles.overlay} onClick={closeMenu} />}
        </div>
      </header>
    </>
  )
}

export default Header