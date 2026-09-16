import styles from './BeginningSection.module.css'
import PhotoCard from './PhotoCard'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function BeginningSection({ date, photo }) {
  const headerRef = useScrollReveal(0.3)
  const dateRef   = useScrollReveal(0.3)
  const photoRef  = useScrollReveal(0.2)

  return (
    <section className={styles.section} aria-label="The moment everything changed">
      <div className={styles.inner}>
        {/* Header */}
        <div ref={headerRef} className={styles.header} data-visible="false">
          <h2 className={styles.title}>The Moment Everything Changed</h2>
          <p className={styles.subtitle}>Our relationship beginning on August 29.</p>
          <div className={styles.rule} />
        </div>

        {/* Date */}
        <div ref={dateRef} className={styles.dateWrap} data-visible="false" style={{ '--delay': '0.25s' }}>
          <div className={styles.glow} />
          <time className={styles.date} dateTime="2026-08-29">{date.compact}</time>
        </div>

        {/* Beginning photo */}
        <div ref={photoRef} className={styles.photoWrap} data-visible="false" style={{ '--delay': '0.45s' }}>
          <PhotoCard src={photo.src} caption={photo.caption} />
        </div>
      </div>
    </section>
  )
}
