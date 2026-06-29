import { useEffect, useMemo, useRef, useState } from 'react'
import { buildCatalogSearchResults as buildCatalogSearchResultsFromModels } from '../utils/docsCenterSearch'

function resolveCatalogSearchScope(showLeafNodes, searchScope) {
  if (searchScope) {
    return searchScope
  }
  return showLeafNodes ? 'leaf' : 'catalog'
}

export { buildCatalogSearchResultsFromModels as buildCatalogSearchResults }

export function useDocsCatalogSidebarSearch({
  sectionModels,
  showLeafNodes,
  searchScope,
  onLeafSelect,
  onBlockSelect,
  onSectionSelect,
}) {
  const comboboxRef = useRef(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const keyword = searchKeyword.trim().toLowerCase()
  const resolvedSearchScope = resolveCatalogSearchScope(showLeafNodes, searchScope)

  const results = useMemo(
    () => buildCatalogSearchResultsFromModels(sectionModels, keyword, resolvedSearchScope),
    [keyword, resolvedSearchScope, sectionModels],
  )

  useEffect(() => {
    function handlePointerDown(event) {
      if (comboboxRef.current?.contains(event.target)) {
        return
      }

      if (
        event.target instanceof Element
        && event.target.closest('[data-docs-search-dropdown]')
      ) {
        return
      }

      setIsDropdownOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [comboboxRef])

  const handleSelectResult = (result) => {
    if (result.type === 'section') {
      onSectionSelect?.(result.sectionTitle)
    } else if (result.type === 'block') {
      onBlockSelect?.(result.sectionTitle, result.blockTitle)
    } else {
      onLeafSelect?.(result.section, result.block, result.sourcePathParts)
    }

    setSearchKeyword('')
    setIsDropdownOpen(false)
  }

  return {
    comboboxRef,
    searchKeyword,
    setSearchKeyword,
    isDropdownOpen,
    setIsDropdownOpen,
    keyword,
    results,
    handleSelectResult,
  }
}
