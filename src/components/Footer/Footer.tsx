'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown, ExternalLink } from 'lucide-react'
import styles from './Footer.module.css'

const Footer = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const pathname = usePathname()

  // Close submenus when route changes
  useEffect(() => {
    setActiveSubmenu(null)
  }, [pathname])

  // Close submenu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (activeSubmenu && !target.closest(`.${styles.menuItemHasChildren}`)) {
        setActiveSubmenu(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [activeSubmenu])

  const toggleSubmenu = (menu: string, event?: React.MouseEvent) => {
    event?.preventDefault()
    setActiveSubmenu(activeSubmenu === menu ? null : menu)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Newsletter subscription:', email)
      setEmail('')
      alert('Thank you for subscribing!')
    } catch (error) {
      console.error('Subscription error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
    { href: '#privacy', label: 'Privacy Policy' },
    { href: '#terms', label: 'Terms of Service' },
  ]

  const socialLinks = [
    {
      name: 'Telegram',
      url: 'https://web.telegram.org/',
      icon: (
        <svg viewBox="0 0 42 42">
          <path d="M29.4002 13.2319L26.2445 29.7065C26.2445 29.7065 25.803 30.8487 24.59 30.3009L17.309 24.5198L17.2752 24.5028C18.2587 23.5883 25.8852 16.4874 26.2185 16.1655C26.7345 15.667 26.4142 15.3703 25.8151 15.7468L14.5498 23.1552L10.2037 21.6409C10.2037 21.6409 9.51977 21.389 9.45397 20.8412C9.3873 20.2925 10.2262 19.9957 10.2262 19.9957L27.944 12.798C27.944 12.798 29.4002 12.1354 29.4002 13.2319V13.2319Z" />
        </svg>
      )
    },
    {
      name: 'TikTok',
      url: 'http://tiktok.com/',
      icon: (
        <svg viewBox="0 0 42 42">
          <path d="M31.475 14.9654C30.7506 14.9654 30.0333 14.8227 29.3641 14.5455C28.6948 14.2683 28.0867 13.862 27.5745 13.3498C27.0622 12.8376 26.6559 12.2294 26.3787 11.5602C26.1015 10.8909 25.9588 10.1736 25.9588 9.44922H22.0178V24.8815C22.017 25.5851 21.7949 26.2706 21.3827 26.8409C20.9706 27.4111 20.3895 27.8372 19.7217 28.0588C19.0539 28.2803 18.3333 28.286 17.6621 28.0752C16.9908 27.8643 16.403 27.4475 15.9818 26.8839C15.5607 26.3202 15.3276 25.6383 15.3157 24.9349C15.3037 24.2314 15.5135 23.542 15.9152 22.9643C16.317 22.3867 16.8903 21.9502 17.554 21.7166C18.2177 21.4831 18.9381 21.4643 19.613 21.6631V17.8321C18.1786 17.6387 16.7194 17.8875 15.4301 18.5453C14.1408 19.203 13.0829 20.2385 12.3976 21.5133C11.7123 22.7881 11.4323 24.2417 11.5948 25.6799C11.7574 27.1181 12.3548 28.4725 13.3074 29.5622C14.26 30.6519 15.5223 31.4251 16.9259 31.7785C18.3294 32.1319 19.8074 32.0487 21.1624 31.5399C22.5175 31.0312 23.685 30.1213 24.5093 28.9315C25.3335 27.7417 25.7751 26.3289 25.7752 24.8815L25.8896 17.0809C27.5088 18.2696 29.4658 18.9092 31.4746 18.9063L31.475 14.9654Z" />
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      url: 'https://x.com/',
      icon: (
        <svg viewBox="0 0 42 42">
          <path d="M25.8436 13.2695H28.4264L22.7837 19.7188L29.4219 28.4947H24.2242L20.1532 23.1722L15.4951 28.4947H12.9107L18.9462 21.5965L12.5781 13.2695H17.9077L21.5875 18.1346L25.8436 13.2695ZM24.9371 26.9488H26.3682L17.1301 14.7343H15.5943L24.9371 26.9488Z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/',
      icon: (
        <svg viewBox="0 0 42 42">
          <path d="M21 13.467C23.4548 13.467 23.7455 13.4777 24.7109 13.5208C25.6081 13.5603 26.0926 13.711 26.4156 13.8366C26.8427 14.0017 27.1513 14.2027 27.4707 14.5221C27.7937 14.8451 27.9911 15.1501 28.1562 15.5772C28.2818 15.9002 28.4325 16.3883 28.472 17.2819C28.5151 18.2509 28.5259 18.5416 28.5259 20.9928C28.5259 23.4476 28.5151 23.7383 28.472 24.7037C28.4325 25.6009 28.2818 26.0854 28.1562 26.4084C27.9911 26.8355 27.7901 27.1441 27.4707 27.4636C27.1477 27.7865 26.8427 27.9839 26.4156 28.149C26.0926 28.2746 25.6045 28.4254 24.7109 28.4648C23.7419 28.5079 23.4512 28.5187 21 28.5187C18.5452 28.5187 18.2545 28.5079 17.2891 28.4648C16.3919 28.4254 15.9074 28.2746 15.5844 28.149C15.1573 27.9839 14.8487 27.783 14.5293 27.4636C14.2063 27.1406 14.0089 26.8355 13.8438 26.4084C13.7182 26.0854 13.5675 25.5973 13.528 24.7037C13.4849 23.7347 13.4741 23.444 13.4741 20.9928C13.4741 18.538 13.4849 18.2473 13.528 17.2819C13.5675 16.3847 13.7182 15.9002 13.8438 15.5772C14.0089 15.1501 14.2099 14.8415 14.5293 14.5221C14.8523 14.1991 15.1573 14.0017 15.5844 13.8366C15.9074 13.711 16.3955 13.5603 17.2891 13.5208C18.2545 13.4777 18.5452 13.467 21 13.467ZM21 11.8125C18.5057 11.8125 18.1935 11.8233 17.2137 11.8663C16.2376 11.9094 15.5665 12.0673 14.9851 12.2934C14.3785 12.5303 13.8653 12.8425 13.3557 13.3557C12.8425 13.8653 12.5303 14.3785 12.2934 14.9815C12.0673 15.5665 11.9094 16.234 11.8663 17.2102C11.8233 18.1935 11.8125 18.5057 11.8125 21C11.8125 23.4943 11.8233 23.8065 11.8663 24.7863C11.9094 25.7624 12.0673 26.4335 12.2934 27.0149C12.5303 27.6215 12.8425 28.1347 13.3557 28.6443C13.8653 29.1539 14.3785 29.4697 14.9815 29.703C15.5665 29.9291 16.234 30.087 17.2102 30.1301C18.1899 30.1731 18.5021 30.1839 20.9964 30.1839C23.4907 30.1839 23.8029 30.1731 24.7827 30.1301C25.7588 30.087 26.43 29.9291 27.0114 29.703C27.6143 29.4697 28.1275 29.1539 28.6371 28.6443C29.1467 28.1347 29.4625 27.6215 29.6958 27.0185C29.9219 26.4335 30.0798 25.766 30.1229 24.7898C30.166 23.8101 30.1767 23.4979 30.1767 21.0036C30.1767 18.5093 30.166 18.1971 30.1229 17.2173C30.0798 16.2412 29.9219 15.57 29.6958 14.9886C29.4697 14.3785 29.1575 13.8653 28.6443 13.3557C28.1347 12.8461 27.6215 12.5303 27.0185 12.297C26.4335 12.0709 25.766 11.913 24.7898 11.8699C23.8065 11.8233 23.4943 11.8125 21 11.8125Z" />
          <path d="M20.9996 16.2812C18.3941 16.2812 16.2803 18.3951 16.2803 21.0006C16.2803 23.6061 18.3941 25.72 20.9996 25.72C23.6052 25.72 25.719 23.6061 25.719 21.0006C25.719 18.3951 23.6052 16.2812 20.9996 16.2812ZM20.9996 24.0619C19.3093 24.0619 17.9383 22.691 17.9383 21.0006C17.9383 19.3103 19.3093 17.9393 20.9996 17.9393C22.69 17.9393 24.0609 19.3103 24.0609 21.0006C24.0609 22.691 22.69 24.0619 20.9996 24.0619Z" />
          <path d="M27.0083 16.094C27.0083 16.7041 26.513 17.1958 25.9065 17.1958C25.2964 17.1958 24.8047 16.7005 24.8047 16.094C24.8047 15.4839 25.3 14.9922 25.9065 14.9922C26.513 14.9922 27.0083 15.4875 27.0083 16.094Z" />
        </svg>
      )
    }
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/img/logo.svg"
              alt="IZIGRAM"
              width={42}
              height={42}
            />
          </Link>
          
          <ul className={`${styles.menu} fw-500 text-color-gray-300`}>
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
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
                <ChevronDown 
                  size={16} 
                  style={{ 
                    transform: activeSubmenu === 'more' ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }} 
                />
              </a>
              <ul className={activeSubmenu === 'more' ? styles.submenuOpen : ''}>
                {moreMenuItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          
          <div className={styles.links}>
            {socialLinks.map((social) => (
              <a 
                key={social.name}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name}`}
                title={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <div className={styles.download}>
            <h3 className={`${styles.smTitle} fw-700 text-color-gray-200`}>
              Download IZIGRAM
            </h3>
            <div className={styles.downloadButtons}>
              <Link 
                href="#timer-modal" 
                className={`${styles.storeButton} open-modal`}
                aria-label="Download from App Store"
              >
                App Store
                <svg viewBox="0 0 20 20">
                  <path d="M18.1603 15.5861C17.8578 16.2848 17.4998 16.928 17.085 17.5194C16.5196 18.3255 16.0567 18.8835 15.6999 19.1934C15.1468 19.702 14.5542 19.9625 13.9197 19.9773C13.4641 19.9773 12.9148 19.8477 12.2753 19.5847C11.6337 19.323 11.0441 19.1934 10.505 19.1934C9.93957 19.1934 9.33317 19.323 8.68455 19.5847C8.03494 19.8477 7.51162 19.9847 7.11151 19.9983C6.50301 20.0242 5.89649 19.7563 5.29107 19.1934C4.90467 18.8563 4.42135 18.2786 3.84235 17.4601C3.22114 16.586 2.71042 15.5725 2.3103 14.417C1.8818 13.1689 1.66699 11.9603 1.66699 10.7902C1.66699 9.44984 1.95661 8.29383 2.53672 7.32509C2.99263 6.54697 3.59915 5.93316 4.35826 5.48255C5.11738 5.03195 5.9376 4.80233 6.8209 4.78764C7.30422 4.78764 7.93803 4.93714 8.72566 5.23096C9.51106 5.52576 10.0154 5.67526 10.2365 5.67526C10.4018 5.67526 10.962 5.50045 11.9117 5.15195C12.8098 4.82875 13.5678 4.69492 14.1888 4.74764C15.8715 4.88344 17.1356 5.54675 17.9763 6.74177C16.4715 7.6536 15.727 8.93072 15.7419 10.5691C15.7554 11.8452 16.2184 12.9071 17.1282 13.7503C17.5406 14.1417 18.001 14.4441 18.5134 14.6589C18.4023 14.9812 18.285 15.2898 18.1603 15.5861ZM14.3012 0.400114C14.3012 1.40034 13.9357 2.33425 13.2074 3.19867C12.3284 4.22629 11.2652 4.8201 10.1123 4.7264C10.0976 4.60641 10.0891 4.48011 10.0891 4.3474C10.0891 3.38718 10.5071 2.35956 11.2494 1.51934C11.62 1.09392 12.0914 0.74019 12.6629 0.458013C13.2333 0.180046 13.7728 0.0263242 14.2802 0C14.295 0.133715 14.3012 0.267451 14.3012 0.400114Z" />
                </svg>
              </Link>
              <Link 
                href="#timer-modal" 
                className={`${styles.storeButton} open-modal`}
                aria-label="Download from Google Play"
              >
                Google play
                <svg viewBox="0 0 20 20">
                  <path d="M12.707 9.15234L4.08594 0.507812L15.0547 6.80469L12.707 9.15234ZM1.83594 0C1.32813 0.265625 0.988281 0.75 0.988281 1.37891V18.6172C0.988281 19.2461 1.32813 19.7305 1.83594 19.9961L11.8594 9.99609L1.83594 0ZM18.4453 8.8125L16.1445 7.48047L13.5781 10L16.1445 12.5195L18.4922 11.1875C19.1953 10.6289 19.1953 9.37109 18.4453 8.8125ZM4.08594 19.4922L15.0547 13.1953L12.707 10.8477L4.08594 19.4922Z" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className={styles.form}>
            <h3 className={`${styles.smTitle} fw-700 text-color-gray-200`}>
              Subscribe to our newsletter
            </h3>
            <form onSubmit={handleSubmit} className={styles.subscribeForm}>
              <input 
                type="email"
                className={styles.input}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                required
                aria-label="Email address"
              />
              <button 
                type="submit" 
                className={`${styles.button} ${isSubmitting ? styles.loading : ''}`}
                disabled={isSubmitting || !email}
                aria-label={isSubmitting ? 'Subscribing...' : 'Subscribe to newsletter'}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
        
        <div className={`${styles.info} fw-500 text-color-gray-350`}>
          <div className={styles.contacts}>
            <p>
              <a 
                href="mailto:sales@izigram.com" 
                className="text-color-gray-300"
                aria-label="Email sales team"
              >
                sales@izigram.com
              </a>
              {' '}(For partners and offers)
            </p>
            <p>
              <a 
                href="mailto:ceo@izigram.com" 
                className="text-color-gray-300"
                aria-label="Email CEO"
              >
                ceo@izigram.com
              </a>
              {' '}(CEO - creator)
            </p>
          </div>
          <p className={styles.copyright}>© 2025 IZIGRAM LIMITED · London</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer