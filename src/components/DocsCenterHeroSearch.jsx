import { createPortal } from 'react-dom'
import { useFloatingListboxPosition } from '../hooks/useFloatingListboxPosition'
import { getCatalogSearchResultMetaLabel } from '../utils/docsCenterSearch'

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
  const canSubmitSearch = !keyword || results.length > 0
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
        results.map((result) => {
          const metaLabel = getCatalogSearchResultMetaLabel(result)

          return (
            <button
              key={result.key}
              type="button"
              role="option"
              className={`docs-center-sidebar-search-option docs-center-sidebar-search-option--${result.type}`}
              onClick={() => onSelectResult(result)}
            >
              <span className="docs-center-sidebar-search-option-body">
                <span className="docs-center-sidebar-search-option-label">
                  {result.label}
                </span>
                {metaLabel ? (
                  <span className="docs-center-sidebar-search-option-meta">
                    {metaLabel}
                  </span>
                ) : null}
              </span>
            </button>
          )
        })
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
              if (event.key === 'Enter' && canSubmitSearch) {
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
      <button
        type="button"
        className="docs-center-search-btn"
        disabled={!canSubmitSearch}
        aria-disabled={!canSubmitSearch}
        onClick={onSubmitSearch}
      >
        {searchButtonLabel}
      </button>
    </div>
  )
}
