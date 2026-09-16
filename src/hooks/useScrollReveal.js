import { useEffect, useRef } from 'react'

/**
 * Scroll-reveal hook using IntersectionObserver.
 * Triggers slightly BEFORE the element fully enters the viewport
 * (rootMargin pushes the trigger point up by 60px) so the fade
 * is already in motion when the user's eye lands on the element.
 *
 * Returns a ref to attach to any element.
 * When visible, sets data-visible="true" on the element (one-shot).
 */
export function useScrollReveal(threshold = 0.05) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Immediately schedule reveal shortly after mount so it fades in with the page
    const timer = setTimeout(() => {
      if (el) el.dataset.visible = 'true'
    }, 70)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = 'true'
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px -20px 0px',
      }
    )

    observer.observe(el)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [threshold])

  return ref
}
