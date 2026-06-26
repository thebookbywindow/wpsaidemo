import { Search } from 'lucide-react'

export default function DocsCatalogSidebarFilterSearch({
  searchKeyword,
  onSearchKeywordChange,
  searchPlaceholder,
  searchSrOnly = '',
}) {
  return (
    <div className="docs-center-sidebar-search-combobox">
      <label className="docs-center-sidebar-search" aria-label={searchSrOnly || searchPlaceholder}>
        <Search size={14} strokeWidth={2} aria-hidden="true" />
        <input
          type="search"
          placeholder={searchPlaceholder}
          value={searchKeyword}
          onChange={(event) => onSearchKeywordChange(event.target.value)}
        />
      </label>
    </div>
  )
}
