import styles from './MemoryGallery.module.css'
import PhotoCard from './PhotoCard'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function MemoryGallery({ title, subtitle, photos }) {
  const headerRef = useScrollReveal(0.3)

  return (
    <section className={styles.section}>
      {/* Section header */}
      <div
        ref={headerRef}
        className={styles.header}
        data-visible="false"
      >
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div className={styles.rule} />
      </div>

      {/* Clean square photo grid */}
      <div className={styles.grid}>
        {photos.map((photo, i) => {
          const delay = `${i * 0.08}s`
          return (
            <PhotoCard
              key={i}
              src={photo.src}
              caption={photo.caption}
              style={{ transitionDelay: delay }}
            />
          )
        })}
      </div>
    </section>
  )
}
