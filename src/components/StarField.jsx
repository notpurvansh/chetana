import styles from './StarField.module.css'
import { useEffect, useRef } from 'react'

export default function StarField({ count = 120, opacity = 1 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let stars = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initStars()
    }

    const initStars = () => {
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.2,
        alpha: Math.random() * 0.7 + 0.1,
        speed: Math.random() * 0.003 + 0.001,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        const a = s.alpha * (0.7 + 0.3 * Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(245, 232, 210, ${a * opacity})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [count, opacity])

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
}
