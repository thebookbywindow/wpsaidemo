import { useEffect, useMemo, useState } from 'react'

const ALL_PRODUCTS_GROUP_HASH_PREFIX = '#all-products-group-'

const SECTION_ICON_BY_TITLE = Object.freeze({
  'AI Tools': '/icons/wps/copilot.svg',
  'AI Writing': '/icons/wps/docs.svg',
  'AI Sheets': '/icons/wps/sheets.svg',
  'AI Slides': '/icons/wps/slides.svg',
  'PDF Tools': '/icons/wps/pdf.svg',
})

export function toAllProductsGroupId(title) {
  return String(title ?? '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function readAllProductsGroupHash() {
  if (typeof window === 'undefined') return ''
  const hash = window.location.hash
  if (!hash.startsWith(ALL_PRODUCTS_GROUP_HASH_PREFIX)) return ''
  return hash.slice(ALL_PRODUCTS_GROUP_HASH_PREFIX.length)
}

export function getAllProductsSectionIconSrc(title) {
  return SECTION_ICON_BY_TITLE[title] ?? null
}

/**
 * Category directory state for the Free AI Tools catalog page.
 */
export function useAllProductsDirectory(sections) {
  const groups = useMemo(
    () =>
      (sections ?? []).map((section) => ({
        id: toAllProductsGroupId(section.title),
        title: section.displayTitle ?? section.title,
        iconSrc: getAllProductsSectionIconSrc(section.title),
        items: section.items ?? [],
      })),
    [sections],
  )

  const defaultId = groups[0]?.id ?? ''
  const [activeId, setActiveId] = useState(defaultId)

  useEffect(() => {
    if (!groups.some((group) => group.id === activeId)) {
      setActiveId(groups[0]?.id ?? '')
    }
  }, [groups, activeId])

  const jumpToGroup = (groupId, { behavior = 'smooth' } = {}) => {
    if (!groupId) return
    setActiveId(groupId)
    window.requestAnimationFrame(() => {
      document.getElementById(`all-products-group-${groupId}`)?.scrollIntoView({
        behavior,
        block: 'start',
      })
    })
  }

  useEffect(() => {
    if (!groups.length) return undefined

    const syncHash = () => {
      const groupId = readAllProductsGroupHash()
      if (!groupId || !groups.some((group) => group.id === groupId)) return
      jumpToGroup(groupId, { behavior: 'auto' })
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [groups])

  return {
    groups,
    activeId,
    setActiveId,
    jumpToGroup,
  }
}
