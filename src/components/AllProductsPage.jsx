import { Search, X } from 'lucide-react'
import {
  ALL_PRODUCTS_GROUP_ID_PREFIX,
  useAllProductsDirectory,
} from '../hooks/useAllProductsDirectory'
import { useIntlAiFeaturesSearch } from '../hooks/useIntlAiFeaturesSearch'
import { joinPath } from '../utils/pathUrl'
import {
  getDirectoryItemLabel,
  splitIntlAiLabelByQuery,
} from '../utils/intlAiFeaturesSearch'

function AllProductsLinkLabel({ label, query }) {
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

function AllProductsLink({ item, query, currentUrlLocale, navigateTo }) {
  const targetPath = joinPath(currentUrlLocale, item.path)
  const label = getDirectoryItemLabel(item)

  return (
    <a
      className="intl-ai-dir-link"
      href={targetPath}
      onClick={(event) => {
        event.preventDefault()
        navigateTo(targetPath)
      }}
    >
      <AllProductsLinkLabel label={label} query={query} />
    </a>
  )
}

function AllProductsGroup({ group, isFirst, query, currentUrlLocale, navigateTo }) {
  if (!group?.items?.length) return null

  return (
    <article
      id={`${ALL_PRODUCTS_GROUP_ID_PREFIX}${group.id}`}
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
          <AllProductsLink
            key={item.path ?? item.name}
            item={item}
            query={query}
            currentUrlLocale={currentUrlLocale}
            navigateTo={navigateTo}
          />
        ))}
      </div>
    </article>
  )
}

/**
 * Free AI Tools / all-products catalog — category sitemap with search filter.
 */
export default function AllProductsPage({
  copy,
  sections,
  currentUrlLocale,
  navigateTo,
}) {
  const { groups } = useAllProductsDirectory(sections)
  const { query, setQuery, clearQuery, filteredGroups, isEmpty } =
    useIntlAiFeaturesSearch(groups)

  if (!groups.length) return null

  const searchPlaceholder = copy?.searchPlaceholder ?? 'Search tools...'
  const searchAriaLabel = copy?.searchAriaLabel ?? searchPlaceholder
  const searchEmpty = copy?.searchEmpty ?? 'No matching tools.'
  const searchClearLabel = copy?.searchClearLabel ?? 'Clear search'

  return (
    <div className="all-products-page bg-transparent">
      <section className="site-page-hero site-page-hero--aurora px-6 pt-12 pb-4">
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="text-center">
            <h1 className="text-[clamp(30px,4.5vw,48px)] font-extrabold tracking-[-0.03em] text-[#1a202c]">
              {copy?.title}
            </h1>
          </div>
        </div>
      </section>

      <section
        className="site-page-transition-section site-page-transition-section--aurora px-6 pt-2 pb-8"
        aria-label={copy?.title ?? 'Free AI Tools'}
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
                <AllProductsGroup
                  key={group.id}
                  group={group}
                  isFirst={index === 0}
                  query={query}
                  currentUrlLocale={currentUrlLocale}
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
