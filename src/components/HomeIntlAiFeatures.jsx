import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
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
      className={`hv2-deck__card home-ai-deck-card${isActive ? ' is-active' : ''}`}
      data-pillar={pillar.id}
      aria-hidden={!isActive}
      role="tabpanel"
    >
      <div className="hv2-deck__card-inner home-ai-deck-card-inner">
        <div className="hv2-deck__lead-col home-ai-deck-col home-ai-deck-col--lead">
          <header className="hv2-deck__brand home-ai-deck-brand">
            {pillar.iconSrc ? (
              <img
                className="home-ai-deck-brand-icon"
                src={pillar.iconSrc}
                alt=""
                draggable={false}
                decoding="async"
              />
            ) : null}
            <span className="home-ai-deck-brand-name">
              {pillar.label?.startsWith('WPS') ? pillar.label : `WPS ${pillar.label}`}
            </span>
          </header>

          {pillar.spotlightLead ? (
            <div className="hv2-deck__lead-body">
              <h3 className="hv2-deck__lead home-ai-deck-lead">
                {faqAnswerLinkLabels(pillar.spotlightLead)}
              </h3>
            </div>
          ) : null}

          {productUrl ? (
            <a
              className="hv2-deck__more home-ai-deck-cta"
              href={productUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isActive ? 0 : -1}
              aria-label={`${learnMoreLabel}: ${productLabel}`}
            >
              <span className="home-ai-deck-cta-label">{learnMoreLabel}</span>
              <ArrowUpRight className="hv2-deck__more-arrow" size={24} strokeWidth={2.25} aria-hidden="true" />
            </a>
          ) : null}
        </div>

        <HomeAiSpotlightFeatureList
          features={pillar.features}
          variant="deck"
          className="home-ai-deck-col--features"
        />
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

  const trackTransform = `translate3d(calc(-${safeIndex} * (100% + var(--hv2-deck-gap)) + ${dragOffsetPx}px), 0, 0)`

  return (
    <>
      <div className="hv2-container home-section-inner">
        <h2 id="home-intl-ai-title" className="hv2-section-title home-ai-deck-title">
          {copy?.titleLine1 && copy?.titleLine2 ? (
            <>
              <span>{copy.titleLine1}</span>
              <br className="hv2-deck__title-break home-ai-deck-title-break" aria-hidden="true" />
              <span>{copy.titleLine2}</span>
            </>
          ) : (
            <span>{title}</span>
          )}
        </h2>
        {summary ? (
          <p className="hv2-section-sub hv2-section-sub--sm home-ai-deck-summary">{summary}</p>
        ) : null}
      </div>

      <div className="hv2-deck__panel home-ai-deck-panel">
        <div className="hv2-container hv2-deck__panel-inner home-ai-deck-align">
          <div className="hv2-tabs hv2-tabs--shell hv2-deck__tabs home-ai-deck-tabs" role="tablist" aria-label={coreTabsLabel}>
            {corePillars.map((pillar, index) => {
              const selected = index === safeIndex
              return (
                <button
                  key={pillar.id}
                  type="button"
                  role="tab"
                  id={`home-intl-ai-tab-${pillar.id}`}
                  aria-selected={selected}
                  aria-current={selected ? 'true' : undefined}
                  className={`hv2-tab home-ai-deck-tab${selected ? ' is-active' : ''}`}
                  data-pillar={pillar.id}
                  onClick={() => selectById(pillar.id)}
                >
                  <span className="home-ai-deck-tab-name">{pillar.label}</span>
                </button>
              )
            })}
          </div>

          <div className="hv2-deck__carousel home-ai-deck-carousel">
            <div
              ref={viewportRef}
              className={`hv2-deck__viewport home-ai-deck-viewport${isDragging ? ' is-dragging' : ''}`}
              role="region"
              aria-roledescription="carousel"
              aria-label="WPS AI product cards"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <div
                className="hv2-deck__rail home-ai-deck-track"
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

            <button
              type="button"
              className="hv2-deck__arrow hv2-deck__arrow--prev home-ai-deck-prev"
              aria-label="Previous product"
              disabled={safeIndex === 0}
              onClick={goPrev}
            >
              <ArrowLeft size={24} strokeWidth={2} aria-hidden="true" />
            </button>
            {safeIndex < cardCount - 1 ? (
              <button
                type="button"
                className="hv2-deck__arrow hv2-deck__arrow--next home-ai-deck-next"
                aria-label={nextLabel}
                onClick={goNext}
              >
                <span className="home-ai-deck-next-shadow" aria-hidden="true" />
                <ArrowRight size={24} strokeWidth={2} aria-hidden="true" />
              </button>
            ) : null}
          </div>
          <p className="hv2-sr-only" aria-live="polite">
            {corePillars[safeIndex]?.label}
          </p>
        </div>
      </div>
    </>
  )
}
