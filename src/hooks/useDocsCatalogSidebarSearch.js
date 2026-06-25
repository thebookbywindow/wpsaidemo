import { useEffect, useMemo, useRef, useState } from 'react'
import { createDocsPathKey } from '../data/docsCenterMeta'

function includesKeyword(text, keyword) {
  return `${text ?? ''}`.toLowerCase().includes(keyword)
}

export function buildCatalogSearchResults(
  sectionModels,
  staticMetaMap,
  keyword,
  showLeafNodes = true,
) {
  const normalizedKeyword = `${keyword ?? ''}`.trim().toLowerCase()
  if (!normalizedKeyword) {
    return []
  }

  const results = []

  sectionModels.forEach((section) => {
    section.blocks.forEach((block) => {
      if (!showLeafNodes && block.title && includesKeyword(block.title, normalizedKeyword)) {
        results.push({
          key: `block-${section.title}::${block.title}`,
          type: 'block',
          label: block.title,
          sectionTitle: section.title,
          blockTitle: block.title,
        })
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

  return results
}

export function useDocsCatalogSidebarSearch({
  sectionModels,
  staticMetaMap,
  showLeafNodes,
  onLeafSelect,
  onBlockSelect,
}) {
  const comboboxRef = useRef(null)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const keyword = searchKeyword.trim().toLowerCase()

  const results = useMemo(
    () => buildCatalogSearchResults(sectionModels, staticMetaMap, keyword, showLeafNodes),
    [keyword, sectionModels, showLeafNodes, staticMetaMap],
  )

  useEffect(() => {
    function handlePointerDown(event) {
      if (!comboboxRef.current?.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const handleSelectResult = (result) => {
    if (result.type === 'block') {
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
