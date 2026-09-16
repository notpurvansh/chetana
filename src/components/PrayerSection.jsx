import styles from './PrayerSection.module.css'
import StarField from './StarField'
import { useScrollReveal } from '../hooks/useScrollReveal'

const lines = [
  { text: 'I prayed.', delay: '0s' },
  { text: 'Not for something perfect.', delay: '0.25s' },
  { text: 'Just for a chance…', delay: '0.5s' },
  { text: 'to call her mine.', delay: '0.75s' },
]

export default function PrayerSection() {
  return (
    <section className={styles.section} aria-label="The prayer">
      <StarField count={180} opacity={0.85} />
      <div className={styles.nebula} />

      <div className={styles.stack}>
        {lines.map((l, i) => (
          <PrayerLine key={i} text={l.text} delay={l.delay} />
        ))}
      </div>
    </section>
  )
}

function PrayerLine({ text, delay }) {
  const ref = useScrollReveal(0.2)
  return (
    <div
      ref={ref}
      className={styles.line}
      data-visible="false"
      style={{ '--delay': delay }}
    >
      {text}
    </div>
  )
}
