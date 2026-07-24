import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import HomeHeroProductIcon from './HomeHeroProductIcon'

/**
 * Inline vertical product roller — icon + colored name (no pill).
 * Width eases to the active item’s real content width so it won’t cover nearby title text.
 */
export default function HomeHeroProductRoller({ items, index, prefersReducedMotion = false }) {
  const measureRef = useRef(null)
  const trackRef = useRef(null)
  const rollerRef = useRef(null)
  const prevIndexRef = useRef(index)
  const widthRef = useRef(null)
  const skipWidthTransitionRef = useRef(true)
  const [widthPx, setWidthPx] = useState(null)
  /** 0..items.length — length is a clone of the first item for seamless wrap. */
  const [slideIndex, setSlideIndex] = useState(index)
  const [instant, setInstant] = useState(false)

  const stripItems = useMemo(() => {
    if (!items?.length) return []
    return [...items, items[0]]
  }, [items])

  const activeItem =
    items?.[slideIndex >= items.length ? 0 : slideIndex] ?? items?.[0] ?? null

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
    const measure = measureRef.current
    const roller = rollerRef.current
    if (!measure || !roller || !activeItem) return undefined

    const targetWidth = Math.ceil(measure.getBoundingClientRect().width)
    const fromWidth = widthRef.current
    const shouldAnimate =
      !skipWidthTransitionRef.current &&
      !prefersReducedMotion &&
      !instant &&
      fromWidth != null &&
      Math.abs(fromWidth - targetWidth) >= 1

    const applyWidth = (width, animate) => {
      widthRef.current = width
      setWidthPx(width)
      if (animate) {
        roller.classList.add('is-width-animating')
      } else {
        roller.classList.remove('is-width-animating')
      }
    }

    if (!shouldAnimate) {
      applyWidth(targetWidth, false)
      skipWidthTransitionRef.current = false
      return undefined
    }

    roller.classList.add('is-width-animating')
    roller.offsetWidth

    const frame = window.requestAnimationFrame(() => {
      applyWidth(targetWidth, true)
    })

    skipWidthTransitionRef.current = false
    return () => window.cancelAnimationFrame(frame)
  }, [activeItem?.id, activeItem?.name, prefersReducedMotion, instant, activeItem])

  if (!items?.length) return null

  const slideTransition =
    prefersReducedMotion || instant
      ? 'none'
      : 'transform 0.68s cubic-bezier(0.22, 1, 0.36, 1)'

  return (
    <span
      ref={rollerRef}
      className={`home-hero-product-roller${prefersReducedMotion ? ' is-static' : ''}`}
      style={widthPx != null ? { width: `${widthPx}px` } : undefined}
    >
      {activeItem ? (
        <span
          ref={measureRef}
          className="home-hero-product-roller-item home-hero-product-roller-item--measure"
          style={{ color: activeItem.color }}
          aria-hidden="true"
        >
          <HomeHeroProductIcon item={activeItem} className="home-hero-product-roller-icon" />
          <span className="home-hero-product-roller-label">{activeItem.name}</span>
        </span>
      ) : null}

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
