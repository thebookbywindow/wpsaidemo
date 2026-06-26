import { createPortal } from 'react-dom'
import { useFloatingListboxPosition } from '../hooks/useFloatingListboxPosition'

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

export default function DocsCenterHeroSearch({
  comboboxRef,
  searchKeyword,
  onSearchKeywordChange,
  isDropdownOpen,
  onDropdownOpenChange,
  searchPlaceholder,
  searchButtonLabel,
  searchSrOnly,
  emptyResultsText,
  keyword,
  results,
  onSelectResult,
  onSubmitSearch,
}) {
  const showDropdown = isDropdownOpen && Boolean(keyword)
  const dropdownStyle = useFloatingListboxPosition({
    anchorRef: comboboxRef,
    isOpen: showDropdown,
    maxHeight: 320,
    gap: 6,
  })

  const dropdown = showDropdown && dropdownStyle ? (
    <div
      id="docs-center-hero-search-listbox"
      className="docs-center-hero-search-dropdown"
      role="listbox"
      data-docs-search-dropdown=""
      style={dropdownStyle}
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
  ) : null

  return (
    <div className="docs-center-search-wrap">
      <div className="docs-center-search-combobox" ref={comboboxRef}>
        <label className="docs-center-search-input-wrap" aria-label={searchSrOnly}>
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls="docs-center-hero-search-listbox"
            aria-autocomplete="list"
            placeholder={searchPlaceholder}
            value={searchKeyword}
            onChange={(event) => {
              onSearchKeywordChange(event.target.value)
              onDropdownOpenChange(true)
            }}
            onFocus={() => onDropdownOpenChange(true)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onSubmitSearch()
              }
              if (event.key === 'Escape') {
                onDropdownOpenChange(false)
              }
            }}
          />
        </label>
      </div>
      {dropdown ? createPortal(dropdown, document.body) : null}
      <button type="button" className="docs-center-search-btn" onClick={onSubmitSearch}>
        {searchButtonLabel}
      </button>
    </div>
  )
}
