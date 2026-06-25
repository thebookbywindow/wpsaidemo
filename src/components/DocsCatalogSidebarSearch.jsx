import { Search } from 'lucide-react'

function renderHighlightedText(text, keyword) {
  if (!keyword) {
    return text
  }

  const source = `${text ?? ''}`
  const lowerSource = source.toLowerCase()
  const lowerKeyword = keyword.toLowerCase()
  const parts = []
  let cursor = 0
  let matchIndex = lowerSource.indexOf(lowerKeyword)

  while (matchIndex !== -1) {
    if (matchIndex > cursor) {
      parts.push(source.slice(cursor, matchIndex))
    }
    const match = source.slice(matchIndex, matchIndex + lowerKeyword.length)
    parts.push(
      <span key={`${match}-${matchIndex}`} className="docs-center-sidebar-search-highlight">
        {match}
      </span>,
    )
    cursor = matchIndex + lowerKeyword.length
    matchIndex = lowerSource.indexOf(lowerKeyword, cursor)
  }

  if (cursor < source.length) {
    parts.push(source.slice(cursor))
  }

  return parts
}

export default function DocsCatalogSidebarSearch({
  comboboxRef,
  searchKeyword,
  onSearchKeywordChange,
  isDropdownOpen,
  onDropdownOpenChange,
  searchPlaceholder,
  emptyResultsText,
  keyword,
  results,
  onSelectResult,
}) {
  const showDropdown = isDropdownOpen && Boolean(keyword)

  return (
    <div className="docs-center-sidebar-search-combobox" ref={comboboxRef}>
      <label className="docs-center-sidebar-search">
        <Search size={14} strokeWidth={2} aria-hidden="true" />
        <input
          type="search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls="docs-catalog-sidebar-search-listbox"
          aria-autocomplete="list"
          placeholder={searchPlaceholder}
          value={searchKeyword}
          onChange={(event) => {
            onSearchKeywordChange(event.target.value)
            onDropdownOpenChange(true)
          }}
          onFocus={() => onDropdownOpenChange(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              onDropdownOpenChange(false)
            }
          }}
        />
      </label>
      {showDropdown ? (
        <div
          id="docs-catalog-sidebar-search-listbox"
          className="docs-center-sidebar-search-dropdown"
          role="listbox"
        >
          {results.length ? (
            results.map((result) => (
              <button
                key={result.key}
                type="button"
                role="option"
                className="docs-center-sidebar-search-option"
                onClick={() => onSelectResult(result)}
              >
                <span className="docs-center-sidebar-search-option-label">
                  {renderHighlightedText(result.label, keyword)}
                </span>
              </button>
            ))
          ) : (
            <p className="docs-center-sidebar-search-empty">{emptyResultsText}</p>
          )}
        </div>
      ) : null}
    </div>
  )
}
