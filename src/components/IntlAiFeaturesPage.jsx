import { useHomeIntlAiFeatures } from '../hooks/useHomeIntlAiFeatures'
import { useIntlAiFeaturesSearch } from '../hooks/useIntlAiFeaturesSearch'
import { useIntlAiFeaturesPageSeo } from '../hooks/useIntlAiFeaturesPageSeo'
import { splitIntlAiLabelByQuery } from '../utils/intlAiFeaturesSearch'

const INTL_AI_GROUP_ID_PREFIX = 'intl-ai-group-'

function IntlAiFeatureLinkLabel({ label, query }) {
  const parts = splitIntlAiLabelByQuery(label, query)
  return parts.map((part, index) =>
    part.match ? (
      <mark key={`m-${index}`} className="locale-page-link-mark">
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
      className="locale-page-link"
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IntlAiFeatureLinkLabel label={item.label} query={query} />
    </a>
  )
}

function IntlAiFeatureGroup({ group, query }) {
  if (!group?.items?.length) return null

  return (
    <article
      id={`${INTL_AI_GROUP_ID_PREFIX}${group.id}`}
      data-pillar-id={group.id}
      className="locale-page-group"
    >
      <h2>
        {group.iconSrc ? (
          <img
            className="locale-page-group-icon intl-ai-dir-group-icon"
            src={group.iconSrc}
            alt=""
            draggable={false}
            decoding="async"
          />
        ) : null}
        <span>{group.title}</span>
      </h2>
      <div className="locale-page-links">
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
    <div className="locale-page intl-ai-features-page">
      <section className="locale-page-hero">
        <h1>{copy?.pageTitle}</h1>
        <form
          className="locale-page-search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label={searchAriaLabel}
          />
          <button
            type="button"
            className="locale-page-search-clear"
            onClick={clearQuery}
            aria-label={searchClearLabel}
            hidden={!query}
          />
          <button type="submit" aria-label={searchAriaLabel}>
            <img
              src="/images/locale-search.svg"
              width={24}
              height={24}
              alt=""
              draggable={false}
            />
          </button>
        </form>
      </section>

      <div className="locale-page-library" aria-label={copy?.pageTitle ?? 'WPS AI features'}>
        {isEmpty ? (
          <p className="locale-page-empty" role="status">
            {searchEmpty}
          </p>
        ) : (
          filteredGroups.map((group) => (
            <IntlAiFeatureGroup
              key={group.id}
              group={group}
              query={query}
            />
          ))
        )}
      </div>
    </div>
  )
}
