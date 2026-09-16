import './styles/global.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { config } from './config'

import Hero from './components/Hero'
import StorySection from './components/StorySection'
import PrayerSection from './components/PrayerSection'
import DateReveal from './components/DateReveal'
import MemoryGallery from './components/MemoryGallery'
import BeginningSection from './components/BeginningSection'
import MemoryCard from './components/MemoryCard'
import { FinalPromiseSection, FinalDeclarationSection } from './components/FinalSection'
import MusicPlayer from './components/MusicPlayer'
import StarField from './components/StarField'

import styles from './App.module.css'
import { useScrollReveal } from './hooks/useScrollReveal'

/* ===================================================
   Inline section components
   =================================================== */

function RelationshipMessage({ herName }) {
  const r1 = useScrollReveal(0.1)
  const r2 = useScrollReveal(0.1)
  const r3 = useScrollReveal(0.1)

  return (
    <section className={styles.msgSection} aria-label="I got the girl">
      <div className={styles.msgInner}>
        <div ref={r1} className={styles.msgFade} data-visible="false">
          <p className={styles.msgLine}>
            After all the waiting, hoping, wishing and praying…
          </p>
        </div>
        <div ref={r2} className={styles.msgFade} data-visible="false" style={{ '--delay': '0.2s' }}>
          <p className={styles.msgLine}>
            I finally got the girl I had loved so much.
          </p>
        </div>
        <div ref={r3} className={styles.msgFade} data-visible="false" style={{ '--delay': '0.4s' }}>
          <p className={styles.msgName}>
            {herName} <span>❤️</span>
          </p>
        </div>
      </div>
    </section>
  )
}

function SectionLabel({ label }) {
  const ref = useScrollReveal(0.1)
  return (
    <div ref={ref} className={styles.sectionLabel} data-visible="false">
      <div className={styles.labelLine} />
      <span>{label}</span>
      <div className={styles.labelLine} />
    </div>
  )
}

function PersonalMemoriesSection({ memories }) {
  const headerRef = useScrollReveal(0.1)
  return (
    <section className={styles.personalSection}>
      <div ref={headerRef} className={styles.personalHeader} data-visible="false">
        <h2 className={styles.personalTitle}>Personal Memories</h2>
        <div className={styles.rule} />
      </div>
      <div className={styles.personalGrid}>
        {memories.map((m, i) => (
          <MemoryCard key={i} id={m.id} src={m.src} caption={m.caption} />
        ))}
      </div>
    </section>
  )
}

/* ===================================================
   Chapters Metadata
   =================================================== */
const CHAPTERS = [
  { id: 'hero', label: 'Opening' },
  { id: 'quietly', label: 'Quietly' },
  { id: 'waited', label: 'I Waited' },
  { id: 'hoped', label: 'I Hoped' },
  { id: 'and-then', label: 'And Then…' },
  { id: 'prayer', label: 'The Prayer' },
  { id: 'date', label: '29 August 2026' },
  { id: 'answered', label: 'She Is Mine' },
  { id: 'before-us', label: 'Before Us' },
  { id: 'the-moment', label: 'The Moment' },
  { id: 'us', label: 'Us' },
  { id: 'memories', label: 'Memories' },
  { id: 'promise', label: 'The Beginning' },
  { id: 'forever', label: 'Forever' },
]

/* ===================================================
   Main App: Full-Screen Page-by-Page Story Presentation
   =================================================== */
export default function App() {
  const { herName, yourName, date, music, beforePhotos, beginningPhoto, usPhotos, personalMemories } = config

  const [currentPage, setCurrentPage] = useState(0)
  const [fadeState, setFadeState] = useState('screenActive') // 'screenActive' | 'screenExiting' | 'screenEntering'

  const isLocked = useRef(false)
  const lastWheelTime = useRef(0)
  const slideContainerRef = useRef(null)

  const totalPages = CHAPTERS.length

  // Smooth cinematic page transition:
  // 1. Current screen fades out
  // 2. Switch page
  // 3. New page opens & text fades in
  const goToPage = useCallback((targetIndex) => {
    if (targetIndex < 0 || targetIndex >= totalPages) return
    if (isLocked.current) return

    isLocked.current = true
    lastWheelTime.current = Date.now()

    // 1. All screen goes to fade
    setFadeState('screenExiting')

    // 2. After screen fade-out, open like a new page
    setTimeout(() => {
      setCurrentPage(targetIndex)
      setFadeState('screenEntering')

      if (slideContainerRef.current) {
        slideContainerRef.current.scrollTop = 0
      }

      // 3. Fade in the screen and text
      requestAnimationFrame(() => {
        setTimeout(() => {
          setFadeState('screenActive')
        }, 40)
      })

      // 4. Release lock after transition completes
      setTimeout(() => {
        isLocked.current = false
      }, 750)
    }, 420)
  }, [totalPages])

  const nextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      goToPage(currentPage + 1)
    }
  }, [currentPage, totalPages, goToPage])

  const prevPage = useCallback(() => {
    if (currentPage > 0) {
      goToPage(currentPage - 1)
    }
  }, [currentPage, goToPage])

  // Wheel, Touch, and Keyboard listeners
  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()

      if (isLocked.current) return
      const now = Date.now()
      if (now - lastWheelTime.current < 750) return
      if (Math.abs(e.deltaY) < 20) return // Filter micro-scroll trackpad jitter

      const el = slideContainerRef.current
      const isDown = e.deltaY > 0

      // If active slide has internal overflow
      if (el) {
        const hasOverflow = el.scrollHeight > el.clientHeight + 15
        if (hasOverflow) {
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 15
          const atTop = el.scrollTop <= 10

          if (isDown && !atBottom) {
            el.scrollTop += e.deltaY
            return
          }
          if (!isDown && !atTop) {
            el.scrollTop += e.deltaY
            return
          }
        }
      }

      if (isDown) {
        nextPage()
      } else {
        prevPage()
      }
    }

    let touchStartY = 0
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (isLocked.current) return
      const now = Date.now()
      if (now - lastWheelTime.current < 750) return

      const touchEndY = e.changedTouches[0].clientY
      const deltaY = touchStartY - touchEndY

      if (Math.abs(deltaY) < 40) return

      const el = slideContainerRef.current
      if (el) {
        const hasOverflow = el.scrollHeight > el.clientHeight + 15
        if (hasOverflow) {
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 15
          const atTop = el.scrollTop <= 10

          if (deltaY > 0 && !atBottom) return
          if (deltaY < 0 && !atTop) return
        }
      }

      if (deltaY > 0) {
        nextPage()
      } else {
        prevPage()
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault()
        nextPage()
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        prevPage()
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [nextPage, prevPage])

  // Render content of current page
  const renderSlideContent = () => {
    switch (currentPage) {
      case 0:
        return <Hero herName={herName} onNext={() => goToPage(1)} />

      case 1:
        return <StorySection text="I loved her quietly." />

      case 2:
        return <StorySection text="I waited." />

      case 3:
        return <StorySection text="I hoped." />

      case 4:
        return (
          <StorySection
            text="And when I didn't know what else to do…"
            bg="radial-gradient(ellipse at 50% 50%, #16080b 0%, #080808 80%)"
          />
        )

      case 5:
        return <PrayerSection />

      case 6:
        return <DateReveal date={date} />

      case 7:
        return <RelationshipMessage herName={herName} />

      case 8:
        return (
          <div className={styles.gallerySlide}>
            <SectionLabel label="Before Us" />
            <MemoryGallery
              title="Before Us"
              subtitle="From when I loved her, but we weren't together."
              photos={beforePhotos}
            />
          </div>
        )

      case 9:
        return <BeginningSection date={date} photo={beginningPhoto} />

      case 10:
        return (
          <div className={styles.gallerySlide}>
            <SectionLabel label="Us" />
            <MemoryGallery
              title="Us"
              subtitle="Our best memories together."
              photos={usPhotos}
            />
          </div>
        )

      case 11:
        return <PersonalMemoriesSection memories={personalMemories} />

      case 12:
        return <FinalPromiseSection date={date} />

      case 13:
        return (
          <FinalDeclarationSection
            herName={herName}
            yourName={yourName}
            onRestart={() => goToPage(0)}
          />
        )

      default:
        return null
    }
  }

  const currentChapter = CHAPTERS[currentPage] || CHAPTERS[0]
  const isLastPage = currentPage === totalPages - 1

  return (
    <main className={styles.viewport} aria-label="A love story for Chetana Aishwarya">
      {/* Persistent starry ambient background */}
      <div className={styles.bgFixed}>
        <StarField count={130} opacity={0.7} />
      </div>
      <div className={styles.vignette} />

      {/* Fixed Music Player */}
      <MusicPlayer src={music.src} />

      {/* Page / Chapter Counter Badge */}
      <div className={styles.pageBadge} aria-hidden="true">
        <span className={styles.pageIndex}>{String(currentPage + 1).padStart(2, '0')}</span>
        <span className={styles.pageDivider}>/</span>
        <span className={styles.pageTotal}>{String(totalPages).padStart(2, '0')}</span>
        <span className={styles.chapterName}>{currentChapter.label}</span>
      </div>

      {/* Active Screen with fade-out / fade-in transition */}
      <div
        key={currentPage}
        ref={slideContainerRef}
        className={`${styles.screen} ${styles[fadeState]}`}
      >
        {renderSlideContent()}
      </div>

      {/* Side Arrow Navigation */}
      {currentPage > 0 && (
        <button
          type="button"
          className={`${styles.sideNavBtn} ${styles.prevBtn}`}
          onClick={prevPage}
          aria-label="Previous chapter"
          title="Previous chapter"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {currentPage < totalPages - 1 && (
        <button
          type="button"
          className={`${styles.sideNavBtn} ${styles.nextBtn}`}
          onClick={nextPage}
          aria-label="Next chapter"
          title="Next chapter"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Chapter Progress Rail (Right side) */}
      <nav className={styles.chapterDots} aria-label="Story chapters">
        {CHAPTERS.map((ch, idx) => (
          <button
            key={ch.id}
            type="button"
            className={`${styles.dot} ${idx === currentPage ? styles.dotActive : ''}`}
            onClick={() => goToPage(idx)}
            aria-label={`Jump to ${ch.label}`}
            aria-current={idx === currentPage ? 'step' : undefined}
          >
            <span className={styles.dotTooltip}>{ch.label}</span>
          </button>
        ))}
      </nav>

      {/* Floating Bottom Action Cue */}
      <button
        type="button"
        className={styles.bottomNavCue}
        onClick={() => (isLastPage ? goToPage(0) : nextPage())}
        aria-label={isLastPage ? 'Read from beginning' : 'Next chapter'}
      >
        <span>{isLastPage ? 'Read from beginning ↺' : 'Scroll or tap to continue'}</span>
        {!isLastPage && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        )}
      </button>
    </main>
  )
}
