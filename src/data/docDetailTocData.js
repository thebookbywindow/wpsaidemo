export const DOC_DETAIL_TOC_PLATFORMS = [
  { id: 'windows', label: 'Windows' },
  { id: 'mac', label: 'Mac' },
  { id: 'linux', label: 'Linux' },
  { id: 'web', label: 'Web' },
  { id: 'android', label: 'Android' },
  { id: 'ios', label: 'IOS' },
]

export const DOC_DETAIL_PLATFORM_IDS_BY_ROUTE_SLUG = {
  'install-sign-in': ['windows', 'mac'],
  'create-document': ['windows', 'mac', 'ios', 'android'],
  'ai-read-aloud': ['ios', 'android'],
  'share-after-compression': [],
}

export function isDocDetailPlatformLess(routeSlug = '') {
  const allowedIds = DOC_DETAIL_PLATFORM_IDS_BY_ROUTE_SLUG[routeSlug]
  return Array.isArray(allowedIds) && allowedIds.length === 0
}

export function getDocDetailPlatforms(routeSlug = '') {
  if (!Object.prototype.hasOwnProperty.call(DOC_DETAIL_PLATFORM_IDS_BY_ROUTE_SLUG, routeSlug)) {
    return DOC_DETAIL_TOC_PLATFORMS
  }

  const allowedIds = DOC_DETAIL_PLATFORM_IDS_BY_ROUTE_SLUG[routeSlug]
  if (!allowedIds.length) {
    return []
  }

  const allowedSet = new Set(allowedIds)
  return DOC_DETAIL_TOC_PLATFORMS.filter((platform) => allowedSet.has(platform.id))
}

export function isDocDetailPlatformAllowed(routeSlug, platformId) {
  if (!platformId) {
    return true
  }

  if (isDocDetailPlatformLess(routeSlug)) {
    return false
  }

  const allowedIds = DOC_DETAIL_PLATFORM_IDS_BY_ROUTE_SLUG[routeSlug]
  if (!allowedIds?.length) {
    return true
  }

  return allowedIds.includes(platformId)
}

export const DOC_DETAIL_TOC_SECTIONS_ZH = [
  { id: 'summary', label: '功能摘要', urlSlug: 'feature-summary' },
  { id: 'description', label: '功能说明', urlSlug: 'feature-description' },
  { id: 'steps', label: '操作步骤', urlSlug: 'steps' },
  { id: 'faq', label: '常见问题', urlSlug: 'faq' },
  { id: 'related', label: '关联问题', urlSlug: 'related-questions' },
  { id: 'notes', label: '注意事项', urlSlug: 'notes' },
]

export const DOC_DETAIL_TOC_SECTIONS_EN = [
  { id: 'summary', label: 'Feature Summary', urlSlug: 'feature-summary' },
  { id: 'description', label: 'Feature Description', urlSlug: 'feature-description' },
  { id: 'steps', label: 'Steps', urlSlug: 'steps' },
  { id: 'faq', label: 'FAQ', urlSlug: 'faq' },
  { id: 'related', label: 'Related Questions', urlSlug: 'related-questions' },
  { id: 'notes', label: 'Notes', urlSlug: 'notes' },
]

const DOC_DETAIL_SECTION_URL_SLUG_TO_ID = Object.fromEntries(
  DOC_DETAIL_TOC_SECTIONS_EN.map((section) => [section.urlSlug, section.id]),
)

export const DOC_DETAIL_SECTION_IDS = new Set(DOC_DETAIL_TOC_SECTIONS_EN.map((section) => section.id))

export function isValidDocDetailSectionId(sectionId) {
  return DOC_DETAIL_SECTION_IDS.has(sectionId)
}

export function getDocDetailSectionUrlSlug(sectionId) {
  const section = DOC_DETAIL_TOC_SECTIONS_EN.find((item) => item.id === sectionId)
  return section?.urlSlug ?? sectionId
}

export function resolveDocDetailSectionIdFromUrlSlug(urlSlug) {
  return DOC_DETAIL_SECTION_URL_SLUG_TO_ID[urlSlug] ?? ''
}

export function isValidDocDetailSectionUrlSlug(urlSlug) {
  return Boolean(DOC_DETAIL_SECTION_URL_SLUG_TO_ID[urlSlug])
}

export function getDocDetailTocSections(isZhContent) {
  return isZhContent ? DOC_DETAIL_TOC_SECTIONS_ZH : DOC_DETAIL_TOC_SECTIONS_EN
}
