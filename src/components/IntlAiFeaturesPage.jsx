import { ExternalLink } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useHomeIntlAiFeatures } from '../hooks/useHomeIntlAiFeatures'
import { useHomeIntlAiGroupTabs } from '../hooks/useHomeIntlAiGroupTabs'
import { useIntlAiFeaturesPageSeo } from '../hooks/useIntlAiFeaturesPageSeo'

const INTL_AI_GROUP_HASH_PREFIX = '#intl-ai-group-'

function readIntlAiGroupHash() {
  if (typeof window === 'undefined') return ''
  const hash = window.location.hash
  if (!hash.startsWith(INTL_AI_GROUP_HASH_PREFIX)) return ''
  return hash.slice(INTL_AI_GROUP_HASH_PREFIX.length)
}

function IntlAiFeatureLink({ item }) {
  return (
    <li>
      <a
        className="intl-ai-dir-link"
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="intl-ai-dir-link-label">{item.label}</span>
        <ExternalLink className="intl-ai-dir-link-icon" size={14} aria-hidden="true" />
      </a>
    </li>
  )
}

function IntlAiFeatureGroup({ group }) {
  if (!group?.items?.length) return null

  return (
    <article
      id={`intl-ai-group-${group.id}`}
      className="intl-ai-dir-group scroll-mt-[calc(var(--nav-height)+96px)]"
    >
      <h2 className="intl-ai-dir-group-title">{group.title}</h2>
      {group.note ? <p className="intl-ai-dir-group-note">{group.note}</p> : null}
      <ul className="intl-ai-dir-list">
        {group.items.map((item) => (
          <IntlAiFeatureLink key={item.id} item={item} />
        ))}
      </ul>
    </article>
  )
}

/**
 * Dedicated directory of official WPS International AI feature landing pages.
 */
export default function IntlAiFeaturesPage({
  copy,
  localeHomePath,
  navigateTo,
}) {
  const { groups, tabLabels } = useHomeIntlAiFeatures(copy)
  const { tabs, activeId, setActiveId } = useHomeIntlAiGroupTabs(groups, tabLabels)

  const itemCount = useMemo(
    () => groups.reduce((total, group) => total + (group.items?.length ?? 0), 0),
    [groups],
  )

  useIntlAiFeaturesPageSeo({
    enabled: true,
    title: copy?.seoTitle ?? copy?.pageTitle ?? 'WPS AI Features',
    description: copy?.seoDescription ?? copy?.pageDesc ?? '',
  })

  const jumpToGroup = (groupId, { behavior = 'smooth' } = {}) => {
    if (!groupId) return
    setActiveId(groupId)
    window.requestAnimationFrame(() => {
      document.getElementById(`intl-ai-group-${groupId}`)?.scrollIntoView({
        behavior,
        block: 'start',
      })
    })
  }

  useEffect(() => {
    if (!groups.length) return undefined

    const syncHash = () => {
      const groupId = readIntlAiGroupHash()
      if (!groupId || !groups.some((group) => group.id === groupId)) return
      jumpToGroup(groupId, { behavior: 'auto' })
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [groups])

  if (!groups.length) return null

  return (
    <div className="intl-ai-features-page bg-transparent">
      <section className="site-page-hero site-page-hero--aurora px-6 py-14">
        <div className="mx-auto w-full max-w-[1160px]">
          <nav className="mb-5 text-[13px] text-[#718096]" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a
                  href={localeHomePath}
                  className="font-medium text-[#534ab7] transition hover:text-[#3c3489]"
                  onClick={(event) => {
                    event.preventDefault()
                    navigateTo(localeHomePath)
                  }}
                >
                  {copy?.homeCrumb ?? 'Home'}
                </a>
              </li>
              <li aria-hidden="true" className="text-[#cbd5e0]">
                /
              </li>
              <li className="text-[#4a5568]">{copy?.pageCrumb ?? copy?.pageTitle}</li>
            </ol>
          </nav>

          <div className="text-center">
            <p className="mx-auto inline-flex rounded-[20px] bg-[#cecbf6] px-3 py-1 text-[12px] font-semibold text-[#3c3489]">
              {copy?.pageBadge}
            </p>
            <h1 className="mt-4 text-[clamp(30px,4.5vw,48px)] font-extrabold tracking-[-0.03em] text-[#1a202c]">
              {copy?.pageTitle}
            </h1>
            <p className="mx-auto mt-3 max-w-[860px] text-[15px] leading-7 text-[#4a5568]">
              {copy?.pageDesc}
            </p>
            {itemCount ? (
              <p className="mx-auto mt-3 text-[13px] font-medium text-[#718096]">
                {(copy?.itemCountLabel ?? '{count} official links').replace(
                  '{count}',
                  String(itemCount),
                )}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section
        className="site-page-transition-section site-page-transition-section--aurora px-6 pb-14"
        aria-labelledby="intl-ai-features-directory-title"
      >
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="intl-ai-dir-tabs-wrap">
            <div
              className="intl-ai-dir-tabs"
              role="tablist"
              aria-label={copy?.tabsAriaLabel ?? 'AI feature categories'}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={`intl-ai-tab-${tab.id}`}
                  aria-selected={tab.id === activeId}
                  aria-controls={`intl-ai-group-${tab.id}`}
                  className={`intl-ai-dir-tab${tab.id === activeId ? ' is-active' : ''}`}
                  onClick={() => jumpToGroup(tab.id)}
                >
                  {tab.iconSrc ? (
                    <img
                      className="intl-ai-dir-tab-icon"
                      src={tab.iconSrc}
                      alt=""
                      draggable={false}
                      decoding="async"
                    />
                  ) : null}
                  <span className="intl-ai-dir-tab-name">{tab.label}</span>
                </button>
              ))}
            </div>
            <p id="intl-ai-features-directory-title" className="intl-ai-dir-tabs-hint">
              {copy?.externalHint}
            </p>
          </div>

          <div className="intl-ai-dir-grid mt-6">
            {groups.map((group) => (
              <IntlAiFeatureGroup key={group.id} group={group} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
