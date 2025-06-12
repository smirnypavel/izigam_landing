'use client'

import Image from 'next/image'
import styles from './PartnersSection.module.css'

const topRowPartners = [
  {
    name: "Icorna",
    logo: "/img/partners/icorn.svg",
    url: "https://icorna.com",
    backgroundColor: "#ff8c001a", 
  },
  {
    name: "Airbnb",
    logo: "/img/partners/airbnb.svg",
    url: "https://airbnb.com",
    backgroundColor: "#ff385c1a",
  },
  {
    name: "Spotify",
    logo: "/img/partners/spotify.svg",
    url: "https://spotify.com",
    backgroundColor: "#1ed7601a",
  },
]

const bottomRowPartners = [
  {
    name: "Adobe",
    logo: "/img/partners/adobe.svg",
    url: "https://adobe.com",
    backgroundColor: "#fa0c001a",
  },
  {
    name: "Reddit",
    logo: "/img/partners/reddit.svg",
    url: "https://reddit.com",
    backgroundColor: "#ff45001a",
  },
  {
    name: "PayPal",
    logo: "/img/partners/paypal.svg",
    url: "https://paypal.com",
    backgroundColor: "#60cdff1a",
  },
  {
    name: "Snapchat",
    logo: "/img/partners/snapchat.svg",
    url: "https://snapchat.com",
    backgroundColor: "#fffc001a",
  },
]

const PartnersSection = () => {
  return (
    <section className={`${styles.section} ${styles.bottomSpacing}`} data-aos="fade-up">
      <div className={styles.container}>
        <div className={styles.partnersWrapper}>
          {/* Top row partners */}
          <div className={styles.partnersTopRow}>
            {topRowPartners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerCard}
                style={{ backgroundColor: partner.backgroundColor }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 480px) 60vw, (max-width: 767px) 70vw, (max-width: 991px) 25vw, 20vw"
                    style={{ 
                      objectFit: 'contain',
                    }}
                    priority={false}
                  />
                </div>
              </a>
            ))}
          </div>
          
          {/* Bottom row partners with title */}
          <div className={styles.partnersBottomRow}>
            {bottomRowPartners.slice(0, 2).map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerCard}
                style={{ backgroundColor: partner.backgroundColor }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 480px) 60vw, (max-width: 767px) 45vw, (max-width: 991px) 20vw, 15vw"
                    style={{ 
                      objectFit: 'contain',
                    }}
                    priority={false}
                  />
                </div>
              </a>
            ))}
            
            <div className={styles.partnersTitle}>
              <h3>Partners</h3>
            </div>
            
            {bottomRowPartners.slice(2).map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.partnerCard}
                style={{ backgroundColor: partner.backgroundColor }}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 480px) 60vw, (max-width: 767px) 45vw, (max-width: 991px) 20vw, 15vw"
                    style={{ 
                      objectFit: 'contain',
                    }}
                    priority={false}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersSection