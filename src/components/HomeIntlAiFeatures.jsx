import { useEffect, useMemo, useState } from 'react'
import { HOME_AI_CORE_PILLAR_IDS } from '../data/homeAiCapabilities'
import { HOME_HERO_COPILOT } from '../data/homeHeroComponents'
import { useHomeAiCapabilities } from '../hooks/useHomeAiCapabilities'
import { useHomeTabsScrollPin } from '../hooks/useHomeTabsScrollPin'
import HomeAiSpotlightFeatureList from './HomeAiSpotlightFeatureList'
import { renderFaqAnswer } from '../utils/renderFaqAnswer'

function HomeAiSpotlightPanel({ pillar, imageOnRight = false }) {
  const productUrl = pillar.productPageUrl
  const productLabel = pillar.label ?? pillar.id

  return (
    <article
      className={`home-ai-spotlight${imageOnRight ? ' home-ai-spotlight--image-right' : ''}`}
    >
      <div className="home-ai-spotlight-media">
        {pillar.spotlightImageSrc ? (
          productUrl ? (
            <a
              className="home-ai-spotlight-media-link"
              href={productUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${productLabel} — WPS Office`}
            >
              <img
                className="home-ai-spotlight-image"
                src={pillar.spotlightImageSrc}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </a>
          ) : (
            <img
              className="home-ai-spotlight-image"
              src={pillar.spotlightImageSrc}
              alt=""
              loading="lazy"
              decoding="async"
            />
          )
        ) : (
          <div className="home-ai-spotlight-image home-ai-spotlight-image--empty" aria-hidden="true" />
        )}
      </div>

      <div className="home-ai-spotlight-copy">
        <header className="home-ai-spotlight-head">
          {productUrl ? (
            <a
              className="home-ai-spotlight-head-link"
              href={productUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${productLabel} — WPS Office`}
            >
              {pillar.iconSrc ? (
                <img
                  className="home-ai-spotlight-icon"
                  src={pillar.iconSrc}
                  alt=""
                  draggable={false}
                  decoding="async"
                />
              ) : null}
              <div className="home-ai-spotlight-head-copy">
                <h3 className="home-ai-spotlight-title">{pillar.label}</h3>
                {pillar.tagline ? (
                  <p className="home-ai-spotlight-tagline">{pillar.tagline}</p>
                ) : null}
              </div>
            </a>
          ) : (
            <>
              {pillar.iconSrc ? (
                <img
                  className="home-ai-spotlight-icon"
                  src={pillar.iconSrc}
                  alt=""
                  draggable={false}
                  decoding="async"
                />
              ) : null}
              <div className="home-ai-spotlight-head-copy">
                <h3 className="home-ai-spotlight-title">{pillar.label}</h3>
                {pillar.tagline ? (
                  <p className="home-ai-spotlight-tagline">{pillar.tagline}</p>
                ) : null}
              </div>
            </>
          )}
        </header>

        {pillar.spotlightLead ? (
          <p className="home-ai-spotlight-lead">{renderFaqAnswer(pillar.spotlightLead)}</p>
        ) : null}

        <HomeAiSpotlightFeatureList features={pillar.features} />
      </div>
    </article>
  )
}

/**
 * Homepage AI overview — Copilot header + Docs / PDF / Slides / Sheets tabs.
 */
export default function HomeIntlAiFeatures({ copy, title, summary }) {
  const { pillars } = useHomeAiCapabilities(copy)
  const [activePillarId, setActivePillarId] = useState(HOME_AI_CORE_PILLAR_IDS[0])

  const corePillars = useMemo(() => {
    const byId = Object.fromEntries(pillars.map((pillar) => [pillar.id, pillar]))
    return HOME_AI_CORE_PILLAR_IDS.map((id) => byId[id]).filter(Boolean)
  }, [pillars])

  const scrollTabs = useMemo(
    () => corePillars.map((pillar) => ({ id: pillar.id })),
    [corePillars],
  )

  const { trackRef, panelRef, selectTab } = useHomeTabsScrollPin({
    tabs: scrollTabs,
    activeId: activePillarId,
    setActiveId: setActivePillarId,
    cssPrefix: 'home-intl-ai',
    tabsSelector: '.home-intl-ai-tabs',
    activeTabSelector: '.home-intl-ai-tab.is-active',
  })

  const activePillar = useMemo(() => {
    return (
      corePillars.find((pillar) => pillar.id === activePillarId) ??
      corePillars[0] ??
      null
    )
  }, [corePillars, activePillarId])

  const activePillarIndex = useMemo(
    () => corePillars.findIndex((pillar) => pillar.id === activePillarId),
    [corePillars, activePillarId],
  )

  useEffect(() => {
    if (!corePillars.some((pillar) => pillar.id === activePillarId)) {
      setActivePillarId(corePillars[0]?.id ?? HOME_AI_CORE_PILLAR_IDS[0])
    }
  }, [corePillars, activePillarId])

  if (!corePillars.length || !activePillar) return null

  return (
    <section
      id="home-intl-ai"
      className="home-ai-capabilities-section px-6 py-12"
      aria-labelledby="home-intl-ai-title"
    >
      <div className="home-section-inner mx-auto w-full max-w-[1160px]">
        <header className="home-intl-ai-copilot-head">
          <div className="home-intl-ai-copilot-head-title-row">
            {HOME_HERO_COPILOT?.iconSrc ? (
              <img
                className="home-intl-ai-copilot-head-icon"
                src={HOME_HERO_COPILOT.iconSrc}
                alt=""
                width={52}
                height={52}
                draggable={false}
                decoding="async"
              />
            ) : null}
            <div className="home-intl-ai-copilot-head-copy">
              <h2
                id="home-intl-ai-title"
                className="home-section-title text-[clamp(20px,2.5vw,26px)] font-semibold text-[#1a202c]"
              >
                {title}
              </h2>
              {summary ? (
                <p className="home-ai-spotlight-tagline">{summary}</p>
              ) : null}
            </div>
          </div>
        </header>

        <div
          ref={trackRef}
          className="home-intl-ai-pin-track"
          style={{ '--home-intl-ai-tab-count': String(scrollTabs.length) }}
        >
          <div ref={panelRef} className="home-intl-ai-pin-panel">
            <div className="home-intl-ai-tabs-wrap">
              <div
                className="home-intl-ai-tabs"
                role="tablist"
                aria-label={copy?.coreTabsAriaLabel ?? title}
              >
                {corePillars.map((pillar) => {
                  const selected = pillar.id === activePillarId
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      role="tab"
                      id={`home-intl-ai-tab-${pillar.id}`}
                      aria-selected={selected}
                      className={`home-intl-ai-tab${selected ? ' is-active' : ''}`}
                      onClick={() => selectTab(pillar.id)}
                    >
                      {pillar.iconSrc ? (
                        <img
                          className="home-intl-ai-tab-icon"
                          src={pillar.iconSrc}
                          alt=""
                          draggable={false}
                          decoding="async"
                        />
                      ) : null}
                      <span className="home-intl-ai-tab-name">{pillar.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div
              className="home-ai-capabilities-stage"
              role="tabpanel"
              aria-labelledby={`home-intl-ai-tab-${activePillarId}`}
            >
              <HomeAiSpotlightPanel
                key={activePillarId}
                pillar={activePillar}
                imageOnRight={activePillarIndex % 2 === 1}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
