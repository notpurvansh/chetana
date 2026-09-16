import styles from './StorySection.module.css'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * A full-viewport story section that reveals a single sentence on scroll.
 * Props:
 *   text        – the sentence to display
 *   sub         – optional small sub-text below
 *   delay       – CSS animation delay string e.g. "0.2s"
 *   variant     – 'normal' | 'large' | 'small'
 *   align       – 'center' | 'left'
 *   bg          – custom inline background style
 */
export default function StorySection({
  text,
  sub,
  delay = '0s',
  variant = 'normal',
  align = 'center',
  bg,
}) {
  const ref = useScrollReveal(0.3)

  return (
    <section
      className={`${styles.section} ${styles[variant]}`}
      style={bg ? { background: bg } : undefined}
      aria-label={text}
    >
      <div
        ref={ref}
        className={`${styles.inner} ${styles[align]}`}
        data-visible="false"
        style={{ '--delay': delay }}
      >
        <p className={styles.text}>{text}</p>
        {sub && <p className={styles.sub}>{sub}</p>}
      </div>
    </section>
  )
}
