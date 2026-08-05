import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { HOME_AI_CORE_PILLAR_IDS } from '../data/homeAiCapabilities'
import { useHomeAiCapabilities } from '../hooks/useHomeAiCapabilities'
import HomeAiSpotlightFeatureList from './HomeAiSpotlightFeatureList'
import { faqAnswerLinkLabels } from '../utils/homeFaq'

const SWIPE_RATIO = 0.18
const SWIPE_MIN_PX = 56

function HomeAiDeckCard({ pillar, isActive, learnMoreLabel = 'Learn More' }) {
  const productUrl = pillar.productPageUrl
  const productLabel = pillar.label ?? pillar.id

  return (
    <article
      className={`home-ai-deck-card${isActive ? ' is-active' : ''}`}
      data-pillar={pillar.id}
      aria-hidden={!isActive}
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
 * Homepage AI overview — container-width rail carousel (wps.ai parity).
 */
export default function HomeIntlAiFeatures({ copy, title, summary }) {
  const { pillars } = useHomeAiCapabilities(copy)
  const [activeIndex, setActiveIndex] = useState(0)
  const [viewportWidth, setViewportWidth] = useState(0)
  const [dragOffsetPx, setDragOffsetPx] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const viewportRef = useRef(null)
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
    const viewport = viewportRef.current
    if (!viewport) return undefined

    const measure = () => {
      setViewportWidth(viewport.getBoundingClientRect().width)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    window.addEventListener('resize', measure)
    return () => {
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

    const threshold = Math.max(SWIPE_MIN_PX, viewportWidth * SWIPE_RATIO)
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
  if (!cardCount) return null

  const trackTransform = `translate3d(calc(-${safeIndex * 100}% + ${dragOffsetPx}px), 0, 0)`

  return (
    <section
      id="home-intl-ai"
      className="home-ai-capabilities-section home-ai-deck-section"
      aria-labelledby="home-intl-ai-title"
    >
      <div className="hv2-container home-section-inner home-ai-deck-align">
        <header className="home-ai-deck-head">
          <h2 id="home-intl-ai-title" className="home-ai-deck-title">
            {copy?.titleLine1 && copy?.titleLine2 ? (
              <>
                <span>{copy.titleLine1}</span>
                <br className="home-ai-deck-title-break" aria-hidden="true" />
                <span>{copy.titleLine2}</span>
              </>
            ) : (
              <span>{title}</span>
            )}
          </h2>
          {summary ? <p className="home-ai-deck-summary">{summary}</p> : null}
        </header>

        <div className="home-ai-deck-panel">
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

          <div className="home-ai-deck-carousel">
            <div
              ref={viewportRef}
              className={`home-ai-deck-viewport${isDragging ? ' is-dragging' : ''}`}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <div
                className="home-ai-deck-track"
                style={{ transform: trackTransform }}
                aria-live="polite"
              >
                {corePillars.map((pillar, index) => (
                  <HomeAiDeckCard
                    key={pillar.id}
                    pillar={pillar}
                    isActive={index === safeIndex}
                    learnMoreLabel={learnMoreLabel}
                  />
                ))}
              </div>
            </div>

            {safeIndex < cardCount - 1 ? (
              <button
                type="button"
                className="home-ai-deck-next"
                aria-label={nextLabel}
                onClick={goNext}
              >
                <span className="home-ai-deck-next-shadow" aria-hidden="true" />
                <ArrowRight size={24} strokeWidth={2} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
