'use client'

import Image from 'next/image'
import styles from './PartnersSection.module.css'

const topRowPartners = [
  {
    name: "",
    logo: "",
    url: "",
    backgroundColor: "#ff8c001a", 
    isEmpty: true,
  },
  {
    name: "Icorna",
    logo: "/img/partners/icorn.svg",
    url: "https://icorna.com",
    backgroundColor: "#ff8c001a", 
    isEmpty: false,
  },
  {
    name: "",
    logo: "",
    url: "",
    backgroundColor: "#1ed7601a",
    isEmpty: true,
  },
]

const bottomRowPartners = [
  {
    name: "",
    logo: "",
    url: "",
    backgroundColor: "#fa0c001a",
    isEmpty: true,
  },
  {
    name: "",
    logo: "",
    url: "",
    backgroundColor: "#ff45001a",
    isEmpty: true,
  },
  {
    name: "",
    logo: "",
    url: "",
    backgroundColor: "#60cdff1a",
    isEmpty: true,
  },
  {
    name: "",
    logo: "",
    url: "",
    backgroundColor: "#fffc001a",
    isEmpty: true,
  },
]

const PartnersSection = () => {
  return (
    <section className={`${styles.section} ${styles.bottomSpacing}`} data-aos="fade-up">
      <div className={styles.container}>
        <div className={styles.partnersWrapper}>
          {/* Top row partners */}
          <div className={styles.partnersTopRow}>
            {topRowPartners.map((partner, index) => (
              partner.isEmpty ? (
                <div
                  key={`empty-top-${index}`}
                  className={styles.partnerCard}
                  style={{ backgroundColor: partner.backgroundColor }}
                >
                  <div className={styles.imageWrapper}>
                    <div className={styles.partnerPlaceholder}>
                      Company name
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={partner.name || `partner-${index}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.partnerCard}
                  style={{ backgroundColor: partner.backgroundColor }}
                >
                  <div className={styles.imageWrapper}>
                    {partner.logo && (
                      <Image
                        src={partner.logo}
                        alt={partner.name || 'Partner logo'}
                        fill
                        sizes="(max-width: 480px) 60vw, (max-width: 767px) 70vw, (max-width: 991px) 25vw, 20vw"
                        style={{ 
                          objectFit: 'contain',
                        }}
                        priority={false}
                      />
                    )}
                  </div>
                </a>
              )
            ))}
          </div>
          
          {/* Bottom row partners with title */}
          <div className={styles.partnersBottomRow}>
            {bottomRowPartners.slice(0, 2).map((partner, index) => (
              partner.isEmpty ? (
                <div
                  key={`empty-bottom-${index}`}
                  className={styles.partnerCard}
                  style={{ backgroundColor: partner.backgroundColor }}
                >
                  <div className={styles.imageWrapper}>
                    <div className={styles.partnerPlaceholder}>
                      Company name
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={partner.name || `partner-bottom-${index}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.partnerCard}
                  style={{ backgroundColor: partner.backgroundColor }}
                >
                  <div className={styles.imageWrapper}>
                    {partner.logo && (
                      <Image
                        src={partner.logo}
                        alt={partner.name || 'Partner logo'}
                        fill
                        sizes="(max-width: 480px) 60vw, (max-width: 767px) 45vw, (max-width: 991px) 20vw, 15vw"
                        style={{ 
                          objectFit: 'contain',
                        }}
                        priority={false}
                      />
                    )}
                  </div>
                </a>
              )
            ))}
            
            <div className={styles.partnersTitle}>
              <h3>Partners</h3>
            </div>
            
            {bottomRowPartners.slice(2).map((partner, index) => (
              partner.isEmpty ? (
                <div
                  key={`empty-bottom-${index + 2}`}
                  className={styles.partnerCard}
                  style={{ backgroundColor: partner.backgroundColor }}
                >
                  <div className={styles.imageWrapper}>
                    <div className={styles.partnerPlaceholder}>
                      Company name
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={partner.name || `partner-bottom-${index + 2}`}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.partnerCard}
                  style={{ backgroundColor: partner.backgroundColor }}
                >
                  <div className={styles.imageWrapper}>
                    {partner.logo && (
                      <Image
                        src={partner.logo}
                        alt={partner.name || 'Partner logo'}
                        fill
                        sizes="(max-width: 480px) 60vw, (max-width: 767px) 45vw, (max-width: 991px) 20vw, 15vw"
                        style={{ 
                          objectFit: 'contain',
                        }}
                        priority={false}
                      />
                    )}
                  </div>
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PartnersSection