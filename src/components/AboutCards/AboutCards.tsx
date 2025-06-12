'use client'

import Image from 'next/image'
import styles from './AboutCards.module.css'

const AboutCards = () => {
  return (
    <section className={`${styles.section} ${styles.topSpacing}`}>
      <div className={styles.container}>
        <div className={styles.aboutCards}>
          <div className={`${styles.aboutCard} ${styles.aboutCardLg} ${styles.aboutCardPrimary}`} data-aos="fade-up">
            <h2 className={`${styles.aboutCardTitle} fw-700`}>
              Simple and intuitive interface with features
            </h2>
            <div className={styles.aboutCardImgWrp}>
              <div className={styles.aboutCardImg}>
                <Image
                  className={styles.aboutCardImgMobile}
                  src="/img/about-cards/01.webp"
                  alt="About card image 1"
                  width={350}
                  height={340}
                />
                <Image
                  className={styles.aboutCardImgTablet}
                  src="/img/about-cards/01-md.webp"
                  alt="About card tablet image 1"
                  width={350}
                  height={340}
                />
                <Image
                  className={styles.aboutCardImgDesktop}
                  src="/img/about-cards/01-lg.webp"
                  alt="About card desktop image 1"
                  width={350}
                  height={340}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.aboutCard} data-aos="fade-up">
            <div className={styles.aboutCardImg}>
              <Image
                className={styles.aboutCardImgMobile}
                src="/img/about-cards/02.webp"
                alt="About card image 2"
                width={350}
                height={340}
              />
              <Image
                className={styles.aboutCardImgTablet}
                src="/img/about-cards/02-md.webp"
                alt="About card tablet image 2"
                width={350}
                height={340}
              />
              <Image
                className={styles.aboutCardImgDesktop}
                src="/img/about-cards/02-lg.webp"
                alt="About card desktop image 2"
                width={350}
                height={340}
              />
            </div>
          </div>
          
          <div className={`${styles.aboutCard} ${styles.aboutCardBorder}`} data-aos="fade-up">
            <p className={`${styles.aboutCardText} text-color-gray-300 text-center`}>
              will answer for you in your time of need
            </p>
            <div className={styles.aboutCardImg}>
              <Image
                className={styles.aboutCardImgMobile}
                src="/img/about-cards/03.webp"
                alt="About card image 3"
                width={350}
                height={340}
              />
              <Image
                className={styles.aboutCardImgTablet}
                src="/img/about-cards/03-md.webp"
                alt="About card tablet image 3"
                width={350}
                height={340}
              />
              <Image
                className={styles.aboutCardImgDesktop}
                src="/img/about-cards/03-lg.webp"
                alt="About card desktop image 3"
                width={350}
                height={340}
              />
            </div>
          </div>
          
          <div className={`${styles.aboutCard} ${styles.aboutCardLg}`} data-aos="fade-up">
            <h3 className={`${styles.aboutCardTitle} fw-700`}>socialise infinitely</h3>
            <div className={styles.aboutCardImgWrp}>
              <div className={styles.aboutCardImg}>
                <Image
                  className={styles.aboutCardImgMobile}
                  src="/img/about-cards/04.webp"
                  alt="About card image 4"
                  width={350}
                  height={340}
                />
                <Image
                  className={styles.aboutCardImgTablet}
                  src="/img/about-cards/04-md.webp"
                  alt="About card tablet image 4"
                  width={350}
                  height={340}
                />
                <Image
                  className={styles.aboutCardImgDesktop}
                  src="/img/about-cards/04-lg.webp"
                  alt="About card desktop image 4"
                  width={350}
                  height={340}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutCards