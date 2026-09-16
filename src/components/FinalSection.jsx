import styles from './FinalSection.module.css'
import StarField from './StarField'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Part 1: The Promise & The Date (until 29.08.2026)
 */
export function FinalPromiseSection({ date }) {
  const line1 = useScrollReveal(0.2)
  const line2 = useScrollReveal(0.2)
  const line3 = useScrollReveal(0.2)
  const dateR = useScrollReveal(0.2)

  return (
    <section className={styles.section} aria-label="The Promise">
      <StarField count={150} opacity={0.85} />
      <div className={styles.glow} />

      <div className={styles.inner}>
        {/* Prayer resolved */}
        <div ref={line1} className={styles.fade} data-visible="false">
          <p className={styles.prayerLine}>I asked God for you.</p>
        </div>

        <div ref={line2} className={styles.fade} data-visible="false" style={{ '--delay': '0.15s' }}>
          <p className={styles.prayerLine}>And somehow, I got you.</p>
        </div>

        <div ref={line3} className={styles.fade} data-visible="false" style={{ '--delay': '0.3s' }}>
          <p className={styles.wish}>
            Now I just want to spend my time making sure you know
            how much you mean to me.
          </p>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* The date */}
        <div ref={dateR} className={styles.fade} data-visible="false" style={{ '--delay': '0.45s' }}>
          <time className={styles.bigDate} dateTime="2026-08-29">
            {date.compact}
          </time>
          <p className={styles.beginning}>The beginning of us.</p>
        </div>
      </div>
    </section>
  )
}

/**
 * Part 2: The Final Love Declaration & Forever
 */
export function FinalDeclarationSection({ herName, yourName = "Purvansh", onRestart }) {
  const love    = useScrollReveal(0.2)
  const name    = useScrollReveal(0.2)
  const tag     = useScrollReveal(0.2)
  const signOff = useScrollReveal(0.2)

  return (
    <section className={styles.section} aria-label="Forever and Always">
      <StarField count={160} opacity={0.9} />
      <div className={styles.glow} />

      <div className={`${styles.inner} ${styles.declarationInner}`}>
        {/* Love declaration */}
        <div ref={love} className={styles.fade} data-visible="false">
          <p className={styles.iLoveYou}>I love you. ❤️</p>
        </div>

        {/* Her name */}
        <div ref={name} className={styles.fade} data-visible="false" style={{ '--delay': '0.15s' }}>
          <p className={styles.herName}>{herName}</p>
        </div>

        {/* Tagline */}
        <div ref={tag} className={styles.fade} data-visible="false" style={{ '--delay': '0.3s' }}>
          <p className={styles.tagline}>Forever starts with a beginning.</p>
        </div>

        {/* Special Signature */}
        <div ref={signOff} className={`${styles.fade} ${styles.signatureWrap}`} data-visible="false" style={{ '--delay': '0.45s' }}>
          <p className={styles.signatureLine1}>From your cute little boy,</p>
          <p className={styles.signatureLine2}>
            <span>Purvansh</span>
            <span className={styles.signatureHeart}>❤️</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default FinalPromiseSection
