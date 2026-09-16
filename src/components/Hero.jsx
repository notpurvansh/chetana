import styles from './Hero.module.css'
import StarField from './StarField'

export default function Hero({ herName, onNext }) {
  return (
    <section className={styles.hero} aria-label="Opening">
      <StarField count={140} />

      {/* Subtle gradient vignette */}
      <div className={styles.vignette} />

      <div className={styles.content}>
        <p className={styles.opening}>There was someone I loved…</p>

        <button
          type="button"
          className={styles.hint}
          onClick={onNext}
          aria-label="Scroll or tap to begin"
        >
          Scroll or tap to begin…
        </button>
      </div>

      {/* Scroll cue chevron */}
      <button
        type="button"
        className={styles.scrollCue}
        onClick={onNext}
        aria-label="Begin reading"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </section>
  )
}
