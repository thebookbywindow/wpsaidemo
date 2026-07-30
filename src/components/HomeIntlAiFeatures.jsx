import { useMemo, useState, useSyncExternalStore } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { HOME_AI_CORE_PILLAR_IDS } from '../data/homeAiCapabilities'
import { useHomeAiCapabilities } from '../hooks/useHomeAiCapabilities'
import {
  HOME_TABS_SCROLL_PIN_DISABLE_MQ,
  useHomeTabsScrollPin,
} from '../hooks/useHomeTabsScrollPin'
import HomeAiSpotlightFeatureList from './HomeAiSpotlightFeatureList'
import { faqAnswerLinkLabels } from '../utils/homeFaq'

const subscribeDeckScrollPinMobile = (onStoreChange) => {
  const mediaQuery = window.matchMedia(HOME_TABS_SCROLL_PIN_DISABLE_MQ)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}
const getDeckScrollPinMobileSnapshot = () =>
  window.matchMedia(HOME_TABS_SCROLL_PIN_DISABLE_MQ).matches
const getDeckScrollPinMobileServerSnapshot = () => false

/** Depth in the visible stack: 0 front → 3 back. Always 4 layers. */
function getStackOffset(cardIndex, activeIndex, length) {
  if (length < 1) return 0
  return (cardIndex - activeIndex + length) % length
}

function HomeAiDeckCard({ pillar, stackOffset, isActive, learnMoreLabel = 'Learn More' }) {
  const productUrl = pillar.productPageUrl
  const productLabel = pillar.label ?? pillar.id

  return (
    <article
      className={`home-ai-deck-card${isActive ? ' is-active' : ''}`}
      data-stack-offset={stackOffset}
      style={{
        '--deck-accent': pillar.color,
        '--deck-offset': stackOffset,
        zIndex: 10 + (4 - stackOffset),
      }}
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
            <h3 className="home-ai-deck-brand-name">{pillar.label}</h3>
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
 * Homepage AI overview — sticky deck driven by whole-page scroll.
 */
export default function HomeIntlAiFeatures({ copy, title, summary }) {
  const { pillars } = useHomeAiCapabilities(copy)
  const [activePillarId, setActivePillarId] = useState(HOME_AI_CORE_PILLAR_IDS[0])
  const isMobile = useSyncExternalStore(
    subscribeDeckScrollPinMobile,
    getDeckScrollPinMobileSnapshot,
    getDeckScrollPinMobileServerSnapshot,
  )

  const corePillars = useMemo(() => {
    const byId = Object.fromEntries(pillars.map((pillar) => [pillar.id, pillar]))
    return HOME_AI_CORE_PILLAR_IDS.map((id) => byId[id]).filter(Boolean)
  }, [pillars])

  const deckTabs = useMemo(
    () => corePillars.map((pillar) => ({ id: pillar.id })),
    [corePillars],
  )

  const resolvedActiveId = useMemo(() => {
    if (corePillars.some((pillar) => pillar.id === activePillarId)) return activePillarId
    return corePillars[0]?.id ?? HOME_AI_CORE_PILLAR_IDS[0]
  }, [corePillars, activePillarId])

  const activeIndex = useMemo(() => {
    const index = corePillars.findIndex((pillar) => pillar.id === resolvedActiveId)
    return index >= 0 ? index : 0
  }, [corePillars, resolvedActiveId])

  const { trackRef, panelRef, selectTab } = useHomeTabsScrollPin({
    tabs: deckTabs,
    activeId: resolvedActiveId,
    setActiveId: setActivePillarId,
    cssPrefix: 'home-ai-deck',
    tabsSelector: '.home-ai-deck-tabs',
    activeTabSelector: '.home-ai-deck-tab.is-active',
    stickyGapPx: 20,
    // Mobile: click to switch; page scroll continues downward (no pin scrub).
    enabled: !isMobile,
  })

  const coreTabsLabel = copy?.coreTabsAriaLabel ?? title
  const learnMoreLabel = copy?.learnMoreLabel ?? 'Learn More'

  if (!corePillars.length) return null

  return (
    <section
      id="home-intl-ai"
      className="home-ai-capabilities-section home-ai-deck-section"
      aria-labelledby="home-intl-ai-title"
    >
      <div className="home-section-inner mx-auto w-full max-w-[1160px]">
        <header className="home-ai-deck-head">
          <h2 id="home-intl-ai-title" className="home-ai-deck-title">
            <span>{title}</span>
          </h2>
          {summary ? <p className="home-ai-deck-summary">{summary}</p> : null}
        </header>

        <div ref={trackRef} className="home-ai-deck-pin-track">
          <div ref={panelRef} className="home-ai-deck-pin-panel">
            <div className="home-ai-deck-tabs-wrap">
              <nav className="home-ai-deck-tabs" aria-label={coreTabsLabel}>
                {corePillars.map((pillar) => {
                  const selected = pillar.id === resolvedActiveId
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      id={`home-intl-ai-tab-${pillar.id}`}
                      aria-current={selected ? 'true' : undefined}
                      className={`home-ai-deck-tab${selected ? ' is-active' : ''}`}
                      onClick={() => selectTab(pillar.id)}
                    >
                      <span className="home-ai-deck-tab-name">{pillar.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            <div className="home-ai-deck" aria-live="polite">
              <div className="home-ai-deck-stack" data-card-count={corePillars.length}>
                {corePillars.map((pillar, cardIndex) => {
                  const stackOffset = getStackOffset(cardIndex, activeIndex, corePillars.length)
                  return (
                    <HomeAiDeckCard
                      key={pillar.id}
                      pillar={pillar}
                      stackOffset={stackOffset}
                      isActive={stackOffset === 0}
                      learnMoreLabel={learnMoreLabel}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
