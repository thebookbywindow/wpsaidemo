import { useMemo } from 'react'

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
 * Category directory groups for the Free AI Tools catalog page.
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

  return { groups }
}
