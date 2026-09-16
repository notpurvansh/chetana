import styles from './DateReveal.module.css'
import StarField from './StarField'
import { useScrollReveal } from '../hooks/useScrollReveal'

export default function DateReveal({ date }) {
  const answerRef = useScrollReveal(0.3)
  const dateRef   = useScrollReveal(0.3)
  const lineRef   = useScrollReveal(0.3)

  return (
    <section className={styles.section} aria-label="The answer">
      <StarField count={100} opacity={0.6} />
      <div className={styles.glowBg} />

      <div className={styles.wrapper}>
        {/* "And somehow…" */}
        <div
          ref={answerRef}
          className={styles.answer}
          data-visible="false"
        >
          And somehow… my prayer was answered.
        </div>

        {/* Date */}
        <div
          ref={dateRef}
          className={styles.dateWrap}
          data-visible="false"
          style={{ '--delay': '0.3s' }}
        >
          <time className={styles.date} dateTime="2026-08-29">
            {date.display}
          </time>
        </div>

        {/* Caption */}
        <div
          ref={lineRef}
          className={styles.caption}
          data-visible="false"
          style={{ '--delay': '0.6s' }}
        >
          The day <em>"I love her"</em> became <em>"She is mine."</em>
        </div>
      </div>
    </section>
  )
}
