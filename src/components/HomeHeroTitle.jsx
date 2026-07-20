import { useLayoutEffect, useRef, useState } from 'react'
import { HOME_HERO_TYPEWRITER_NAMES } from '../data/homeHeroComponents'
import { resolveHeroTitleParts } from '../data/homeHeroTitle'
import { useHomeHeroComponentCycle } from '../hooks/useHomeHeroComponentCycle'
import HomeHeroProductIcon from './HomeHeroProductIcon'

const HERO_TITLE_BRAND = 'WPS AI'

function renderHeroTitleTail(text) {
  const index = text.indexOf(HERO_TITLE_BRAND)
  if (index === -1) return text

  return (
    <>
      {text.slice(0, index)}
      <span className="home-hero-title-tail-brand">{HERO_TITLE_BRAND}</span>
      {text.slice(index + HERO_TITLE_BRAND.length)}
    </>
  )
}

/**
 * Hero H1: lead + (join + rotating product pill) + tail.
 * On mobile, join + pill wrap together as the second line.
 */
export default function HomeHeroTitle({ lead, join, tail, prefix, title }) {
  const { main: titleLead, join: titleJoin } = resolveHeroTitleParts({
    lead,
    join,
    prefix,
  })
  const titleTail = tail ?? ''
  const { active, prefersReducedMotion } = useHomeHeroComponentCycle()
  const pillRef = useRef(null)
  const measureRef = useRef(null)
  const [pillWidthPx, setPillWidthPx] = useState(null)
  const pillWidthRef = useRef(null)
  const skipWidthTransitionRef = useRef(true)

  const seoLabel =
    title ??
    `${titleLead}${titleJoin ? `${titleJoin} ` : ''}${HOME_HERO_TYPEWRITER_NAMES.join(', ')}${titleTail}`
  const displayName = active?.name ?? ''

  const pillAccentStyle = active
    ? {
        '--pill-accent': active.color,
        '--pill-accent-soft': `${active.color}1f`,
      }
    : undefined

  useLayoutEffect(() => {
    const measure = measureRef.current
    const pill = pillRef.current
    if (!measure || !pill || !active) return undefined

    const targetWidth = Math.ceil(measure.getBoundingClientRect().width)
    const fromWidth = pillWidthRef.current

    const applyWidth = (width, animate) => {
      pillWidthRef.current = width
      setPillWidthPx(width)
      if (animate) {
        pill.classList.add('is-width-animating')
      } else {
        pill.classList.remove('is-width-animating')
      }
    }

    if (
      skipWidthTransitionRef.current ||
      prefersReducedMotion ||
      fromWidth == null ||
      Math.abs(fromWidth - targetWidth) < 1
    ) {
      applyWidth(targetWidth, false)
      skipWidthTransitionRef.current = false
      return undefined
    }

    pill.classList.add('is-width-animating')
    pill.offsetWidth

    const frame = window.requestAnimationFrame(() => {
      applyWidth(targetWidth, true)
    })

    skipWidthTransitionRef.current = false
    return () => window.cancelAnimationFrame(frame)
  }, [active?.id, displayName, prefersReducedMotion, active])

  return (
    <h1 className="home-hero-title mx-auto max-w-4xl">
      <span className="sr-only">{seoLabel}</span>
      <span className="home-hero-title-visual" aria-hidden="true">
        <span className="home-hero-title-line1">
          {titleLead ? <span className="home-hero-title-lead">{titleLead}</span> : null}

          <span className="home-hero-title-join-group">
            {titleJoin ? (
              <span className="home-hero-title-join">{titleJoin}</span>
            ) : null}
            {active ? (
              <span
                ref={measureRef}
                className="home-hero-product-pill home-hero-product-pill--measure"
                style={pillAccentStyle}
                aria-hidden="true"
              >
                <span className="home-hero-product-pill-inner">
                  <HomeHeroProductIcon item={active} />
                  <span className="home-hero-product-pill-label">{displayName}</span>
                </span>
              </span>
            ) : null}
            <span
              ref={pillRef}
              className={`home-hero-product-pill${prefersReducedMotion ? ' is-static' : ''}`}
              style={{
                ...pillAccentStyle,
                ...(pillWidthPx != null ? { width: `${pillWidthPx}px` } : undefined),
              }}
            >
              <span className="home-hero-product-pill-inner">
                {active ? (
                  <>
                    <HomeHeroProductIcon item={active} />
                    <span className="home-hero-product-pill-label">{displayName}</span>
                  </>
                ) : null}
              </span>
            </span>
          </span>
        </span>
        {titleTail ? (
          <span className="home-hero-title-tail">{renderHeroTitleTail(titleTail)}</span>
        ) : null}
      </span>
    </h1>
  )
}
