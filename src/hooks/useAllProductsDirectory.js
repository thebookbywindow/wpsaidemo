import { useEffect, useMemo, useState } from 'react'

export const ALL_PRODUCTS_GROUP_ID_PREFIX = 'all-products-group-'

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
  const pillarIds = useMemo(() => groups.map((group) => group.id), [groups])

  useEffect(() => {
    if (!groups.some((group) => group.id === activeId)) {
      setActiveId(groups[0]?.id ?? '')
    }
  }, [groups, activeId])

  return {
    groups,
    pillarIds,
    activeId,
    setActiveId,
  }
}
