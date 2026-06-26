import { useEffect, useMemo, useRef, useState } from 'react'
import { createDocsPathKey } from '../data/docsCenterMeta'

function includesKeyword(text, keyword) {
  return `${text ?? ''}`.toLowerCase().includes(keyword)
}

function resolveCatalogSearchScope(showLeafNodes, searchScope) {
  if (searchScope) {
    return searchScope
  }
  return showLeafNodes ? 'leaf' : 'catalog'
}

export function buildCatalogSearchResults(
  sectionModels,
  staticMetaMap,
  keyword,
  searchScope = 'leaf',
) {
  const normalizedKeyword = `${keyword ?? ''}`.trim().toLowerCase()
  if (!normalizedKeyword) {
    return []
  }

  const results = []
  const sectionResults = []
  const blockResults = []

  sectionModels.forEach((section) => {
    if (searchScope === 'catalog' && includesKeyword(section.title, normalizedKeyword)) {
      sectionResults.push({
        key: `section-${section.title}`,
        type: 'section',
        label: section.title,
        sectionTitle: section.title,
      })
    }

    section.blocks.forEach((block) => {
      if (
        searchScope === 'catalog'
        && block.title
        && includesKeyword(block.title, normalizedKeyword)
      ) {
        blockResults.push({
          key: `block-${section.title}::${block.title}`,
          type: 'block',
          label: block.title,
          sectionTitle: section.title,
          blockTitle: block.title,
        })
      }

      if (searchScope !== 'leaf') {
        return
      }

      block.items.forEach((item) => {
        const sourcePathParts = block.sourceTitle
          ? [section.sourceTitle, block.sourceTitle, item.sourceLabel]
          : [section.sourceTitle, item.sourceLabel]
        const pathKey = createDocsPathKey(sourcePathParts)
        const meta = staticMetaMap[pathKey]
        const isClickable = Boolean(meta?.helpContent && meta?.routeSlug)

        if (!isClickable) {
          return
        }

        if (!includesKeyword(item.label, normalizedKeyword)) {
          return
        }

        results.push({
          key: pathKey,
          type: 'leaf',
          label: item.label,
          pathKey,
          sourcePathParts,
          section,
          block,
          item,
        })
      })
    })
  })

  if (searchScope === 'catalog') {
    return [...sectionResults, ...blockResults]
  }

  return results
}

export function useDocsCatalogSidebarSearch({
  sectionModels,
  staticMetaMap,
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
    () => buildCatalogSearchResults(sectionModels, staticMetaMap, keyword, resolvedSearchScope),
    [keyword, resolvedSearchScope, sectionModels, staticMetaMap],
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
