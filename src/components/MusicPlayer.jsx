import styles from './MusicPlayer.module.css'
import { useEffect, useRef, useState } from 'react'

export default function MusicPlayer({ src }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const audio = new Audio(src)
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio

    audio.addEventListener('canplaythrough', () => setLoaded(true))
    audio.addEventListener('error', () => setError(true))

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [src])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio || error) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setError(true))
    }
  }

  return (
    <button
      className={`${styles.btn} ${playing ? styles.playing : ''} ${error ? styles.hidden : ''}`}
      onClick={toggle}
      aria-label={playing ? 'Pause music' : 'Play our song'}
      title={playing ? 'Pause' : 'Play our song'}
    >
      {playing ? (
        <PauseIcon />
      ) : (
        <MusicIcon />
      )}
      <span className={styles.ripple} />
    </button>
  )
}

function MusicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  )
}
