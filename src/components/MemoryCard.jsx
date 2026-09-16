import styles from './MemoryCard.module.css'
import PhotoCard from './PhotoCard'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function MemoryCard({ id, src, caption }) {
  const ref = useScrollReveal(0.2)

  return (
    <article
      ref={ref}
      className={styles.card}
      data-visible="false"
      aria-label={id ? `Memory ${id}` : 'Personal memory'}
    >
      {id && <span className={styles.number}>Memory {id}</span>}
      <div className={styles.photo}>
        <PhotoCard src={src} caption={null} aspectRatio="9 / 16" />
      </div>
      {caption && <p className={styles.caption}>{caption}</p>}
    </article>
  )
}
