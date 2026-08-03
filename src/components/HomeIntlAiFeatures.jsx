import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { HOME_AI_CORE_PILLAR_IDS } from '../data/homeAiCapabilities'
import { useHomeAiCapabilities } from '../hooks/useHomeAiCapabilities'
import HomeAiSpotlightFeatureList from './HomeAiSpotlightFeatureList'
import { faqAnswerLinkLabels } from '../utils/homeFaq'

const SWIPE_RATIO = 0.18
const SWIPE_MIN_PX = 56

function HomeAiDeckCard({ pillar, isActive, learnMoreLabel = 'Learn More', cardWidthPx }) {
  const productUrl = pillar.productPageUrl
  const productLabel = pillar.label ?? pillar.id
  const widthStyle = cardWidthPx
    ? { width: `${cardWidthPx}px`, minWidth: `${cardWidthPx}px`, maxWidth: `${cardWidthPx}px`, flex: `0 0 ${cardWidthPx}px` }
    : undefined

  return (
    <article
      className={`home-ai-deck-card${isActive ? ' is-active' : ''}`}
      data-pillar={pillar.id}
      aria-hidden={!isActive}
      style={widthStyle}
    >
      <div className="home-ai-deck-card-inner">
        <div className="home-ai-deck-col home-ai-deck-col--lead">
          <header className="home-ai-deck-brand">
            {pillar.iconSrc ? (
              <img
                className="home-ai-deck-brand-icon"
                src={pillar.iconSrc}
                alt=""
                draggable={false}
                decoding="async"
              />
            ) : null}
            <h3 className="home-ai-deck-brand-name">
              {pillar.label?.startsWith('WPS') ? pillar.label : `WPS ${pillar.label}`}
            </h3>
          </header>

          {pillar.spotlightLead ? (
            <p className="home-ai-deck-lead">{faqAnswerLinkLabels(pillar.spotlightLead)}</p>
          ) : null}

          {productUrl ? (
            <a
              className="home-ai-deck-cta"
              href={productUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? 0 : -1}
              aria-label={`${learnMoreLabel}: ${productLabel}`}
            >
              <span className="home-ai-deck-cta-label">{learnMoreLabel}</span>
              <ArrowUpRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </a>
          ) : null}
        </div>

        <div className="home-ai-deck-col home-ai-deck-col--features">
          <HomeAiSpotlightFeatureList features={pillar.features} variant="deck" />
        </div>
      </div>
    </article>
  )
}

/**
 * Homepage AI overview — full-bleed horizontal translate carousel (Figma).
 */
export default function HomeIntlAiFeatures({ copy, title, summary }) {
  const { pillars } = useHomeAiCapabilities(copy)
  const [activeIndex, setActiveIndex] = useState(0)
  const [stepPx, setStepPx] = useState(0)
  const [inlineStartPx, setInlineStartPx] = useState(null)
  const [cardWidthPx, setCardWidthPx] = useState(null)
  const [dragOffsetPx, setDragOffsetPx] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const stepPxRef = useRef(0)
  const dragRef = useRef({
    active: false,
    startX: 0,
    deltaX: 0,
  })

  const corePillars = useMemo(() => {
    const byId = Object.fromEntries(pillars.map((pillar) => [pillar.id, pillar]))
    return HOME_AI_CORE_PILLAR_IDS.map((id) => byId[id]).filter(Boolean)
  }, [pillars])

  const cardCount = corePillars.length
  const safeIndex = cardCount ? Math.min(activeIndex, cardCount - 1) : 0

  useLayoutEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || !cardCount) return undefined

    const measure = () => {
      const cards = track.querySelectorAll('.home-ai-deck-card')
      const first = cards[0]
      if (!first) return

      // Match active card to the visible content column (tabs above / cases grid below).
      const tabsEl = section.querySelector('.home-ai-deck-tabs-wrap')
      const casesGrid = document.querySelector('.home-v2-main .hv2-cases__grid')
      const alignShell = section.querySelector('.home-ai-deck-align')
      const carousel = section.querySelector('.home-ai-deck-carousel')
      const columnEl = tabsEl || casesGrid
      if (columnEl && carousel) {
        const col = columnEl.getBoundingClientRect()
        const cases = casesGrid?.getBoundingClientRect()
        // Prefer the narrower of tabs/cases so the card never overruns either edge.
        const contentW = Math.max(
          280,
          Math.round(cases ? Math.min(col.width, cases.width) : col.width),
        )
        const contentLeft = Math.round(cases ? Math.max(col.left, cases.left) : col.left)
        const carouselLeft = carousel.getBoundingClientRect().left
        const start = Math.max(16, contentLeft - Math.round(carouselLeft))
        setInlineStartPx(start)
        setCardWidthPx(contentW)
        section.style.setProperty('--deck-inline-start', `${start}px`)
        section.style.setProperty('--deck-card-w', `${contentW}px`)
        carousel.style.setProperty('--deck-card-w', `${contentW}px`)
      } else if (alignShell && carousel) {
        const cs = getComputedStyle(alignShell)
        const rect = alignShell.getBoundingClientRect()
        const padL = Number.parseFloat(cs.paddingLeft) || 0
        const padR = Number.parseFloat(cs.paddingRight) || 0
        const contentW = Math.max(280, Math.round(rect.width - padL - padR))
        const start = Math.max(16, Math.round(rect.left + padL - carousel.getBoundingClientRect().left))
        setInlineStartPx(start)
        setCardWidthPx(contentW)
        section.style.setProperty('--deck-inline-start', `${start}px`)
        section.style.setProperty('--deck-card-w', `${contentW}px`)
        carousel.style.setProperty('--deck-card-w', `${contentW}px`)
      }

      // Force layout after card-width update so step uses the new width.
      void first.offsetWidth

      const second = cards[1]
      const nextStep = second
        ? second.offsetLeft - first.offsetLeft
        : first.getBoundingClientRect().width + 34

      if (nextStep > 0) {
        stepPxRef.current = nextStep
        setStepPx(nextStep)
      }
    }

    measure()
    const rafId = window.requestAnimationFrame(measure)
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    const firstCard = track.querySelector('.home-ai-deck-card')
    if (firstCard) observer.observe(firstCard)
    const alignEl = section.querySelector('.home-ai-deck-align')
    if (alignEl) observer.observe(alignEl)
    const casesGrid = document.querySelector('.home-v2-main .hv2-cases__grid')
    if (casesGrid) observer.observe(casesGrid)
    window.addEventListener('resize', measure)
    return () => {
      window.cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [cardCount])

  const selectIndex = (index) => {
    if (!cardCount) return
    setActiveIndex(Math.max(0, Math.min(cardCount - 1, index)))
    setDragOffsetPx(0)
  }

  const selectById = (id) => {
    const index = corePillars.findIndex((pillar) => pillar.id === id)
    if (index >= 0) selectIndex(index)
  }

  const goNext = () => selectIndex(safeIndex + 1)
  const goPrev = () => selectIndex(safeIndex - 1)

  const onPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    if (event.target.closest('a, button, input, textarea, select')) return

    dragRef.current = {
      active: true,
      startX: event.clientX,
      deltaX: 0,
    }
    setIsDragging(true)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const onPointerMove = (event) => {
    if (!dragRef.current.active) return
    const deltaX = event.clientX - dragRef.current.startX
    dragRef.current.deltaX = deltaX
    setDragOffsetPx(deltaX)
  }

  const endDrag = () => {
    if (!dragRef.current.active) return
    const { deltaX } = dragRef.current
    dragRef.current.active = false
    setIsDragging(false)

    const step = stepPxRef.current || stepPx
    const threshold = Math.max(SWIPE_MIN_PX, step * SWIPE_RATIO)
    if (deltaX <= -threshold) {
      goNext()
      return
    }
    if (deltaX >= threshold) {
      goPrev()
      return
    }
    setDragOffsetPx(0)
  }

  const coreTabsLabel = copy?.coreTabsAriaLabel ?? title
  const learnMoreLabel = copy?.learnMoreLabel ?? 'Learn More'
  const nextLabel = copy?.nextSlideLabel ?? 'Next product'
  const prevLabel = copy?.prevSlideLabel ?? 'Previous product'

  if (!cardCount) return null

  const step = stepPx || stepPxRef.current
  const translateX = -safeIndex * step + dragOffsetPx

  return (
    <section
      ref={sectionRef}
      id="home-intl-ai"
      className="home-ai-capabilities-section home-ai-deck-section"
      aria-labelledby="home-intl-ai-title"
    >
      <div className="hv2-container home-section-inner home-ai-deck-align">
        <header className="home-ai-deck-head">
          <h2 id="home-intl-ai-title" className="home-ai-deck-title">
            <span>{title}</span>
          </h2>
          {summary ? <p className="home-ai-deck-summary">{summary}</p> : null}
        </header>

        <div className="home-ai-deck-tabs-wrap">
          <nav className="home-ai-deck-tabs" aria-label={coreTabsLabel}>
            {corePillars.map((pillar, index) => {
              const selected = index === safeIndex
              return (
                <button
                  key={pillar.id}
                  type="button"
                  id={`home-intl-ai-tab-${pillar.id}`}
                  aria-current={selected ? 'true' : undefined}
                  className={`home-ai-deck-tab${selected ? ' is-active' : ''}`}
                  onClick={() => selectById(pillar.id)}
                >
                  <span className="home-ai-deck-tab-name">{pillar.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="home-ai-deck-carousel" data-step={step}>
        <div
          className={`home-ai-deck-viewport${isDragging ? ' is-dragging' : ''}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <div
            ref={trackRef}
            className="home-ai-deck-track"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              ...(inlineStartPx != null ? { paddingLeft: `${inlineStartPx}px` } : null),
            }}
            aria-live="polite"
          >
            {corePillars.map((pillar, index) => (
              <HomeAiDeckCard
                key={pillar.id}
                pillar={pillar}
                isActive={index === safeIndex}
                learnMoreLabel={learnMoreLabel}
                cardWidthPx={cardWidthPx}
              />
            ))}
          </div>
        </div>

        {safeIndex > 0 ? (
          <button
            type="button"
            className="home-ai-deck-nav home-ai-deck-nav--prev"
            aria-label={prevLabel}
            onClick={goPrev}
          >
            <ArrowRight size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        ) : null}

        {safeIndex < cardCount - 1 ? (
          <button
            type="button"
            className="home-ai-deck-nav home-ai-deck-nav--next"
            aria-label={nextLabel}
            onClick={goNext}
          >
            <ArrowRight size={22} strokeWidth={2} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </section>
  )
}
