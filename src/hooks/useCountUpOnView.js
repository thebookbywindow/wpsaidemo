import { useEffect, useRef, useState } from 'react'

/**
 * Count-up when the element enters the viewport (marketing HTML stats pattern).
 * Respects prefers-reduced-motion.
 */
export function useCountUpOnView(count, { suffix = '', finalValue = '', duration = 1600 } = {}) {
  const ref = useRef(null)
  const hasCount = Number.isFinite(count)
  const resolvedFinal = finalValue || (hasCount ? `${count}${suffix}` : '')
  const [display, setDisplay] = useState(resolvedFinal)
  const startedRef = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || !hasCount) {
      setDisplay(resolvedFinal)
      return undefined
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      return undefined
    }

    startedRef.current = false

    const animate = () => {
      if (startedRef.current) return
      startedRef.current = true
      setDisplay(`0${suffix}`)

      const startedAt = performance.now()
      const target = count

      const tick = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration)
        const eased = 1 - (1 - progress) ** 4
        setDisplay(`${Math.round(target * eased)}${suffix}`)
        if (progress < 1) requestAnimationFrame(tick)
        else setDisplay(resolvedFinal)
      }

      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          animate()
          obs.unobserve(entry.target)
        })
      },
      { threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [count, duration, hasCount, resolvedFinal, suffix])

  return { ref, display, finalValue: resolvedFinal }
}
