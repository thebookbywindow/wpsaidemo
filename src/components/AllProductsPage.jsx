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
import { withPublicAssetPath } from '../utils/publicAssetPath'

function AllProductsLinkLabel({ label, query }) {
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

function AllProductsLink({ item, query, currentUrlLocale, navigateTo }) {
  const targetPath = joinPath(currentUrlLocale, item.path)
  const label = getDirectoryItemLabel(item)

  return (
    <a
      className="locale-page-link"
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

function AllProductsGroup({ group, query, currentUrlLocale, navigateTo }) {
  if (!group?.items?.length) return null

  return (
    <article
      id={`${ALL_PRODUCTS_GROUP_ID_PREFIX}${group.id}`}
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
 * PDF Tools / all-tools catalog — searchable directory of PDF utilities.
 */
export default function AllProductsPage({
  copy,
  sections,
  currentUrlLocale,
  navigateTo,
}) {
  const { groups } = useAllProductsDirectory(sections)
  const pdfGroups = groups.filter((group) => group.id === 'pdf-tools')
  const { query, setQuery, clearQuery, filteredGroups, isEmpty } =
    useIntlAiFeaturesSearch(pdfGroups)

  if (!pdfGroups.length) return null

  const searchPlaceholder = copy?.searchPlaceholder ?? 'Search tools...'
  const searchAriaLabel = copy?.searchAriaLabel ?? searchPlaceholder
  const searchEmpty = copy?.searchEmpty ?? 'No matching tools.'
  const searchClearLabel = copy?.searchClearLabel ?? 'Clear search'

  return (
    <div className="locale-page all-products-page">
      <section className="locale-page-hero">
        <h1>{copy?.title}</h1>
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
              src={withPublicAssetPath('/images/locale-search.svg')}
              width={24}
              height={24}
              alt=""
              draggable={false}
            />
          </button>
        </form>
      </section>

      <div className="locale-page-library" aria-label={copy?.title ?? 'PDF Tools'}>
        {isEmpty ? (
          <p className="locale-page-empty" role="status">
            {searchEmpty}
          </p>
        ) : (
          filteredGroups.map((group) => (
            <AllProductsGroup
              key={group.id}
              group={group}
              query={query}
              currentUrlLocale={currentUrlLocale}
              navigateTo={navigateTo}
            />
          ))
        )}
      </div>
    </div>
  )
}
