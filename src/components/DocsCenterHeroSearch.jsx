import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { RotateCcw, Search } from 'lucide-react'
import { useFloatingListboxPosition } from '../hooks/useFloatingListboxPosition'
import { getCatalogSearchResultMetaLabel, shouldHeroSearchClearFilter } from '../utils/docsCenterSearch'

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
  onSearchClear,
  isResetMode = false,
  leadingAction = null,
}) {
  const showDropdown = isDropdownOpen && Boolean(keyword)
  const canSubmitSearch = isResetMode || !keyword || results.length > 0
  const isManualDeleteKeyRef = useRef(false)
  const dropdownStyle = useFloatingListboxPosition({
    anchorRef: comboboxRef,
    isOpen: showDropdown,
    maxHeight: 320,
    gap: 6,
  })

  const handleKeywordBecomesEmpty = (event) => {
    const shouldClearFilter = shouldHeroSearchClearFilter({
      inputType: event.nativeEvent?.inputType,
      isManualDeleteKey: isManualDeleteKeyRef.current,
    })
    isManualDeleteKeyRef.current = false
    if (shouldClearFilter) {
      onSearchClear?.()
    }
  }

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
    <div
      className={`docs-center-search-wrap${
        leadingAction ? ' docs-center-search-wrap--with-leading-action' : ''
      }`}
    >
      <div className="docs-center-search-combobox" ref={comboboxRef}>
        <label className="docs-center-search-input-wrap" aria-label={searchSrOnly}>
          {leadingAction ? (
            <span className="docs-center-search-leading-action">{leadingAction}</span>
          ) : null}
          <input
            type="search"
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls="docs-center-hero-search-listbox"
            aria-autocomplete="list"
            placeholder={searchPlaceholder}
            value={searchKeyword}
            onChange={(event) => {
              const value = event.target.value
              onSearchKeywordChange(value)
              onDropdownOpenChange(true)
              if (!value) {
                handleKeywordBecomesEmpty(event)
              } else {
                isManualDeleteKeyRef.current = false
              }
            }}
            onSearch={(event) => {
              if (!event.currentTarget.value) {
                onSearchClear?.()
              }
            }}
            onFocus={() => onDropdownOpenChange(true)}
            onKeyDown={(event) => {
              isManualDeleteKeyRef.current =
                event.key === 'Backspace' || event.key === 'Delete'
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
        className={`docs-center-search-btn${isResetMode ? ' docs-center-search-btn--reset' : ''}`}
        disabled={!canSubmitSearch}
        aria-disabled={!canSubmitSearch}
        aria-label={searchButtonLabel}
        title={searchButtonLabel}
        onClick={onSubmitSearch}
      >
        {isResetMode ? (
          <RotateCcw size={18} strokeWidth={2.25} aria-hidden="true" />
        ) : (
          <Search size={18} strokeWidth={2.25} aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
