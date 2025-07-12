'use client'

import Image from 'next/image'
import styles from './MediaContent.module.css'

interface MediaContentProps {
  variant?: 'default' | 'buddies'
}

const MediaContent = ({ variant = 'default' }: MediaContentProps) => {
  const content = variant === 'buddies' ? {
    title: 'Buddies mode for\nfalling in love',
    text: 'Meet IZI Buddies, the revolutionary dating app designed to connect you with like-minded individuals! With a sleek interface and personalized matching algorithms, you can discover potential partners who share your interests and values',
    imageSrc: '/img/media-content/03.png',
    imageAlt: 'IZI Buddies app interface',
    // hasHearts: true
  } : {
    title: 'The hexamer of your ideas',
    text: 'IZIGRAM is changing the idea of social networks! Your profile is a dynamic space where photos and videos are stacked in a unique hexagonal grid. Share content, find like-minded people, earn money and manage your digital world the way you want.',
    imageSrc: '/img/media-content/01.png',
    imageAlt: 'IZIGRAM hexagonal interface',
    note: 'Your content',
    hasHearts: false
  }

  return (
    <section className={`${styles.section} ${styles.topSpacing}`}>
      <div className={styles.container}>
        <div className={styles.mediaContent}>
          <div className={styles.col} data-aos="fade-right">
            <h2 className={`${styles.title} ${styles.titleAnimation} fw-700`}>
              {content.title.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < content.title.split('\n').length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p className={`${styles.text} fw-500 text-color-gray-300`}>
              {content.text}
            </p>
          </div>
          <div className={styles.col} data-aos="fade-left">
            <div className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <Image
                  src={content.imageSrc}
                  alt={content.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  style={{ 
                    objectFit: 'cover', 
                    objectPosition: 'center center'
                  }}
                  priority
                />
              </div>
              {content.note && (
                <div className={styles.note}>{content.note}</div>
              )}
            </div>
            {content.hasHearts && (
              <>
                <div className={`${styles.heart} ${styles.heart1}`}></div>
                <div className={`${styles.heart} ${styles.heart2}`}></div>
                <div className={`${styles.heart} ${styles.heart3}`}></div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaContent