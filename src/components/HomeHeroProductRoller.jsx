import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import HomeHeroProductIcon from './HomeHeroProductIcon'

/**
 * Inline vertical product roller — icon + colored name.
 * Fixed slot width (max of all items) so the title does not shift left/right;
 * only the four products poll vertically.
 */
export default function HomeHeroProductRoller({ items, index, prefersReducedMotion = false }) {
  const measureRef = useRef(null)
  const trackRef = useRef(null)
  const prevIndexRef = useRef(index)
  /** 0..items.length — length is a clone of the first item for seamless wrap. */
  const [slideIndex, setSlideIndex] = useState(index)
  const [instant, setInstant] = useState(false)
  const [slotWidthPx, setSlotWidthPx] = useState(null)

  const stripItems = useMemo(() => {
    if (!items?.length) return []
    return [...items, items[0]]
  }, [items])

  useEffect(() => {
    const prev = prevIndexRef.current
    const length = items?.length ?? 0
    if (length < 1) return

    if (prev === length - 1 && index === 0) {
      setInstant(false)
      setSlideIndex(length)
      prevIndexRef.current = index
      return
    }

    setInstant(false)
    setSlideIndex(index)
    prevIndexRef.current = index
  }, [index, items])

  useEffect(() => {
    if (slideIndex !== items.length || prefersReducedMotion) return undefined

    const track = trackRef.current
    if (!track) return undefined

    const onEnd = (event) => {
      if (event.target !== track) return
      setInstant(true)
      setSlideIndex(0)
    }

    track.addEventListener('transitionend', onEnd)
    return () => track.removeEventListener('transitionend', onEnd)
  }, [slideIndex, items.length, prefersReducedMotion])

  useLayoutEffect(() => {
    if (!instant) return
    const id = window.requestAnimationFrame(() => setInstant(false))
    return () => window.cancelAnimationFrame(id)
  }, [instant, slideIndex])

  useLayoutEffect(() => {
    const root = measureRef.current
    if (!root || !items?.length) return undefined

    const measure = () => {
      const nodes = root.querySelectorAll('[data-roller-measure]')
      let maxWidth = 0
      nodes.forEach((node) => {
        maxWidth = Math.max(maxWidth, Math.ceil(node.getBoundingClientRect().width))
      })
      if (maxWidth > 0) setSlotWidthPx(maxWidth)
    }

    measure()
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(root)
    window.addEventListener('resize', measure)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [items])

  if (!items?.length) return null

  const slideTransition =
    prefersReducedMotion || instant
      ? 'none'
      : 'transform 0.68s cubic-bezier(0.22, 1, 0.36, 1)'

  return (
    <span
      className={`home-hero-product-roller${prefersReducedMotion ? ' is-static' : ''}`}
      style={slotWidthPx != null ? { width: `${slotWidthPx}px` } : undefined}
    >
      <span ref={measureRef} className="home-hero-product-roller-measure-set" aria-hidden="true">
        {items.map((item) => (
          <span
            key={`measure-${item.id}`}
            data-roller-measure=""
            className="home-hero-product-roller-item home-hero-product-roller-item--measure"
            style={{ color: item.color }}
          >
            <HomeHeroProductIcon item={item} className="home-hero-product-roller-icon" />
            <span className="home-hero-product-roller-label">{item.name}</span>
          </span>
        ))}
      </span>

      <span className="home-hero-product-roller-viewport">
        <span
          ref={trackRef}
          className="home-hero-product-roller-track"
          style={{
            transform: `translate3d(0, calc(${-slideIndex} * var(--roller-h)), 0)`,
            transition: slideTransition,
          }}
        >
          {stripItems.map((item, itemIndex) => (
            <span
              key={`${item.id}-${itemIndex}`}
              className="home-hero-product-roller-item"
              style={{ color: item.color }}
            >
              <HomeHeroProductIcon item={item} className="home-hero-product-roller-icon" />
              <span className="home-hero-product-roller-label">{item.name}</span>
            </span>
          ))}
        </span>
      </span>
    </span>
  )
}
