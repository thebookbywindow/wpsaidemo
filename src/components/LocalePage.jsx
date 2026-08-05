import { Search, X } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { buildLocalePageGroups } from '../data/localePageEntries'
import { resolveLocalePageText } from '../data/localePageText'
import { useIntlAiFeaturesSearch } from '../hooks/useIntlAiFeaturesSearch'
import { toUrlLocale } from '../utils/localeUrl'
import { joinPath } from '../utils/pathUrl'
import { splitIntlAiLabelByQuery } from '../utils/intlAiFeaturesSearch'

const LOCALE_GROUP_ID_PREFIX = 'locale-group-'

function LocaleLinkLabel({ label, query }) {
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

function LocaleLink({ item, query, navigateTo }) {
  const targetPath = joinPath(toUrlLocale(item.code))

  return (
    <a
      className="intl-ai-dir-link"
      href={targetPath}
      draggable={false}
      onClick={(event) => {
        event.preventDefault()
        navigateTo(targetPath)
      }}
    >
      <LocaleLinkLabel label={item.label} query={query} />
    </a>
  )
}

function LocaleRegionGroup({ group, isFirst, query, navigateTo }) {
  if (!group?.items?.length) return null

  return (
    <article
      id={`${LOCALE_GROUP_ID_PREFIX}${group.id}`}
      className={`intl-ai-dir-group${isFirst ? '' : ' is-divided'}`}
    >
      <h2 className="intl-ai-dir-group-title">
        <span>{group.title}</span>
      </h2>
      <div className="intl-ai-dir-list">
        {group.items.map((item) => (
          <LocaleLink key={item.id} item={item} query={query} navigateTo={navigateTo} />
        ))}
      </div>
    </article>
  )
}

/**
 * Locale picker — layout aligned with WPS AI features directory; grouped by region.
 */
export default function LocalePage({ contentLanguage, navigateTo }) {
  const copy = resolveLocalePageText(contentLanguage)
  const groups = useMemo(
    () => buildLocalePageGroups(copy.groupTitles),
    [copy.groupTitles],
  )
  const { query, setQuery, clearQuery, filteredGroups, isEmpty } =
    useIntlAiFeaturesSearch(groups)

  useEffect(() => {
    document.title = copy.documentTitle
  }, [copy.documentTitle])

  return (
    <div className="intl-ai-features-page bg-transparent">
      <section className="site-page-hero site-page-hero--aurora px-6 pt-12 pb-4">
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="text-center">
            <h1 className="text-[clamp(30px,4.5vw,48px)] font-extrabold tracking-[-0.03em] text-[#1a202c]">
              {copy.pageTitle}
            </h1>
          </div>
        </div>
      </section>

      <section
        className="site-page-transition-section site-page-transition-section--aurora px-6 pt-2 pb-8"
        aria-label={copy.pageTitle}
      >
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="intl-ai-dir-search">
            <label className="intl-ai-dir-search-field" aria-label={copy.searchAriaLabel}>
              <Search className="intl-ai-dir-search-icon" size={16} strokeWidth={1.75} aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.searchPlaceholder}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
              />
              {query ? (
                <button
                  type="button"
                  className="intl-ai-dir-search-clear"
                  onClick={clearQuery}
                  aria-label={copy.searchClearLabel}
                >
                  <X size={14} strokeWidth={2} aria-hidden />
                </button>
              ) : null}
            </label>
          </div>

          <div className="intl-ai-dir-panel">
            {isEmpty ? (
              <p className="intl-ai-dir-search-empty" role="status">
                {copy.searchEmpty}
              </p>
            ) : (
              filteredGroups.map((group, index) => (
                <LocaleRegionGroup
                  key={group.id}
                  group={group}
                  isFirst={index === 0}
                  query={query}
                  navigateTo={navigateTo}
                />
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
