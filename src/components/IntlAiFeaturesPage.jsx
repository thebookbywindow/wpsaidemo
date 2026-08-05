import { Search, X } from 'lucide-react'
import { useHomeIntlAiFeatures } from '../hooks/useHomeIntlAiFeatures'
import { useIntlAiFeaturesSearch } from '../hooks/useIntlAiFeaturesSearch'
import { useIntlAiFeaturesPageSeo } from '../hooks/useIntlAiFeaturesPageSeo'
import { splitIntlAiLabelByQuery } from '../utils/intlAiFeaturesSearch'

const INTL_AI_GROUP_ID_PREFIX = 'intl-ai-group-'

function IntlAiFeatureLinkLabel({ label, query }) {
  const parts = splitIntlAiLabelByQuery(label, query)
  return parts.map((part, index) =>
    part.match ? (
      <mark key={`m-${index}`} className="intl-ai-dir-link-mark">
        {part.text}
      </mark>
    ) : (
      <span key={`t-${index}`}>{part.text}</span>
    ),
  )
}

function IntlAiFeatureLink({ item, query }) {
  return (
    <a
      className="intl-ai-dir-link"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IntlAiFeatureLinkLabel label={item.label} query={query} />
    </a>
  )
}

function IntlAiFeatureGroup({ group, isFirst, query }) {
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
          <IntlAiFeatureLink key={item.id} item={item} query={query} />
        ))}
      </div>
    </article>
  )
}

/**
 * Dedicated directory of official WPS International AI feature landing pages.
 */
export default function IntlAiFeaturesPage({ copy, locale }) {
  const { groups } = useHomeIntlAiFeatures(copy)
  const { query, setQuery, clearQuery, filteredGroups, isEmpty } =
    useIntlAiFeaturesSearch(groups)

  useIntlAiFeaturesPageSeo({
    enabled: true,
    title: copy?.seoTitle ?? copy?.pageTitle ?? 'WPS AI Features',
    description: copy?.seoDescription ?? copy?.pageDesc ?? '',
    locale,
  })

  if (!groups.length) return null

  const searchPlaceholder = copy?.searchPlaceholder ?? 'Search AI features...'
  const searchAriaLabel = copy?.searchAriaLabel ?? searchPlaceholder
  const searchEmpty = copy?.searchEmpty ?? 'No matching AI features.'
  const searchClearLabel = copy?.searchClearLabel ?? 'Clear search'

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
          <div className="intl-ai-dir-search">
            <label className="intl-ai-dir-search-field" aria-label={searchAriaLabel}>
              <Search className="intl-ai-dir-search-icon" size={16} strokeWidth={1.75} aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={searchPlaceholder}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {query ? (
                <button
                  type="button"
                  className="intl-ai-dir-search-clear"
                  onClick={clearQuery}
                  aria-label={searchClearLabel}
                >
                  <X size={14} strokeWidth={2} aria-hidden />
                </button>
              ) : null}
            </label>
          </div>

          <div className="intl-ai-dir-panel">
            {isEmpty ? (
              <p className="intl-ai-dir-search-empty" role="status">
                {searchEmpty}
              </p>
            ) : (
              filteredGroups.map((group, index) => (
                <IntlAiFeatureGroup
                  key={group.id}
                  group={group}
                  isFirst={index === 0}
                  query={query}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
