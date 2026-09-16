import styles from './PhotoCard.module.css'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useState } from 'react'

export default function PhotoCard({ src, caption, aspectRatio, className = '', style = {} }) {
  const ref = useScrollReveal(0.15)
  const [errored, setErrored] = useState(false)

  // Ensure src resolves reliably with leading slash for Vite static assets
  const resolvedSrc = src && !src.startsWith('http') && !src.startsWith('/')
    ? `/${src}`
    : src

  return (
    <div
      ref={ref}
      className={`${styles.card} ${className}`}
      data-visible="false"
      style={style}
    >
      <div
        className={styles.imageWrap}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        {errored ? (
          <div className={styles.placeholder}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span>Add your photo here</span>
          </div>
        ) : (
          <>
            {/* Ambient blurred backdrop so any aspect-ratio photo fits elegantly in the square box */}
            <img
              src={resolvedSrc}
              alt=""
              aria-hidden="true"
              className={styles.ambientBlur}
            />
            {/* Sharp photo fitting into the box */}
            <img
              src={resolvedSrc}
              alt={caption || 'A cherished memory'}
              className={styles.img}
              loading="lazy"
              onError={() => setErrored(true)}
            />
          </>
        )}
      </div>
      {caption && (
        <p className={styles.caption}>{caption}</p>
      )}
    </div>
  )
}
