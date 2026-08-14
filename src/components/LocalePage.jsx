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
      <mark key={`m-${index}`} className="locale-page-link-mark">
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

function LocaleLanguageGroup({ group, query, navigateTo }) {
  if (!group?.items?.length) return null

  return (
    <section
      id={`${LOCALE_GROUP_ID_PREFIX}${group.id}`}
      className="locale-page-group"
    >
      {group.title ? (
        <h2>
          <span>{group.title}</span>
        </h2>
      ) : null}
      <div className="locale-page-links">
        {group.items.map((item) => (
          <LocaleLink key={item.id} item={item} query={query} navigateTo={navigateTo} />
        ))}
      </div>
    </section>
  )
}

/**
 * Locale picker — visual parity with Figma AI-Web 4800:2926
 * (screenshot via WPS-AI-Demo-Share.html #ai-features export).
 */
export default function LocalePage({ contentLanguage, navigateTo }) {
  const copy = resolveLocalePageText(contentLanguage)
  const groups = useMemo(() => buildLocalePageGroups(), [])
  const { query, setQuery, clearQuery, filteredGroups, isEmpty } =
    useIntlAiFeaturesSearch(groups)

  useEffect(() => {
    document.title = copy.documentTitle
  }, [copy.documentTitle])

  return (
    <div className="locale-page">
      <section className="locale-page-hero">
        <h1>{copy.pageTitle}</h1>
        <form
          className="locale-page-search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label={copy.searchAriaLabel}
          />
          <button
            type="button"
            className="locale-page-search-clear"
            onClick={clearQuery}
            aria-label={copy.searchClearLabel}
            hidden={!query}
          />
          <button type="submit" aria-label={copy.searchAriaLabel}>
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

      <div className="locale-page-library" aria-label={copy.pageTitle}>
        {isEmpty ? (
          <p className="locale-page-empty" role="status">
            {copy.searchEmpty}
          </p>
        ) : (
          filteredGroups.map((group) => (
            <LocaleLanguageGroup
              key={group.id}
              group={group}
              query={query}
              navigateTo={navigateTo}
            />
          ))
        )}
      </div>
    </div>
  )
}
