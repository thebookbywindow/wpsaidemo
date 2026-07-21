import { useMemo } from 'react'
import { useHomeIntlAiFeatures } from '../hooks/useHomeIntlAiFeatures'
import { useHomeIntlAiGroupTabs } from '../hooks/useHomeIntlAiGroupTabs'
import { useHomeIntlAiStickyAnchorTabs } from '../hooks/useHomeIntlAiStickyAnchorTabs'
import { useIntlAiFeaturesPageSeo } from '../hooks/useIntlAiFeaturesPageSeo'

const INTL_AI_GROUP_ID_PREFIX = 'intl-ai-group-'

function IntlAiFeatureLink({ item }) {
  return (
    <a
      className="intl-ai-dir-link"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {item.label}
    </a>
  )
}

function IntlAiFeatureGroup({ group, isFirst }) {
  if (!group?.items?.length) return null

  return (
    <article
      id={`${INTL_AI_GROUP_ID_PREFIX}${group.id}`}
      data-pillar-id={group.id}
      className={`intl-ai-dir-group${isFirst ? '' : ' is-divided'}`}
    >
      <h2 className="intl-ai-dir-group-title">
        {group.iconSrc ? (
          <img
            className="intl-ai-dir-group-icon"
            src={group.iconSrc}
            alt=""
            draggable={false}
            decoding="async"
          />
        ) : null}
        <span>{group.title}</span>
      </h2>
      <div className="intl-ai-dir-list">
        {group.items.map((item) => (
          <IntlAiFeatureLink key={item.id} item={item} />
        ))}
      </div>
    </article>
  )
}

/**
 * Dedicated directory of official WPS International AI feature landing pages.
 */
export default function IntlAiFeaturesPage({ copy }) {
  const { groups, tabLabels } = useHomeIntlAiFeatures(copy)
  const { tabs, activeId, setActiveId } = useHomeIntlAiGroupTabs(groups, tabLabels)
  const pillarIds = useMemo(() => groups.map((group) => group.id), [groups])
  const { tabsDockRef, scrollToPillar } = useHomeIntlAiStickyAnchorTabs({
    pillarIds,
    activeId,
    setActiveId,
    blockIdPrefix: INTL_AI_GROUP_ID_PREFIX,
  })

  useIntlAiFeaturesPageSeo({
    enabled: true,
    title: copy?.seoTitle ?? copy?.pageTitle ?? 'WPS AI Features',
    description: copy?.seoDescription ?? copy?.pageDesc ?? '',
  })

  if (!groups.length) return null

  return (
    <div className="intl-ai-features-page bg-transparent">
      <section className="site-page-hero site-page-hero--aurora px-6 pt-12 pb-4">
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="text-center">
            <h1 className="text-[clamp(30px,4.5vw,48px)] font-extrabold tracking-[-0.03em] text-[#1a202c]">
              {copy?.pageTitle}
            </h1>
          </div>
        </div>
      </section>

      <section
        className="site-page-transition-section site-page-transition-section--aurora px-6 pt-2 pb-8"
        aria-label={copy?.pageTitle ?? 'WPS AI features'}
      >
        <div className="mx-auto w-full max-w-[1160px]">
          <div ref={tabsDockRef} className="home-intl-ai-tabs-dock intl-ai-dir-tabs-dock">
            <div className="home-intl-ai-tabs-wrap">
              <nav
                className="home-intl-ai-tabs"
                aria-label={copy?.tabsAriaLabel ?? 'AI feature categories'}
              >
                {tabs.map((tab) => {
                  const selected = tab.id === activeId
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      id={`intl-ai-tab-${tab.id}`}
                      aria-current={selected ? 'true' : undefined}
                      className={`home-intl-ai-tab${selected ? ' is-active' : ''}`}
                      onClick={() => scrollToPillar(tab.id)}
                    >
                      {tab.iconSrc ? (
                        <img
                          className="home-intl-ai-tab-icon"
                          src={tab.iconSrc}
                          alt=""
                          draggable={false}
                          decoding="async"
                        />
                      ) : null}
                      <span className="home-intl-ai-tab-name">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          <div className="intl-ai-dir-panel">
            {groups.map((group, index) => (
              <IntlAiFeatureGroup
                key={group.id}
                group={group}
                isFirst={index === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
