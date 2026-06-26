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

export const DOC_DETAIL_UNIVERSAL_SECTION_IDS_BY_ROUTE_SLUG = {
  'create-document': ['summary', 'description', 'faq', 'related', 'notes'],
}

export const DOC_DETAIL_COMMON_SCOPE_SLUG = 'common'

/** @deprecated Use DOC_DETAIL_COMMON_SCOPE_SLUG */
export const DOC_DETAIL_FEATURE_SCOPE_ID = DOC_DETAIL_COMMON_SCOPE_SLUG

export function isDocDetailCommonScopeId(platformId) {
  return platformId === DOC_DETAIL_COMMON_SCOPE_SLUG || platformId === 'feature'
}

export function normalizeDocDetailRoutePlatformId(platformId = '') {
  if (platformId === 'feature') {
    return DOC_DETAIL_COMMON_SCOPE_SLUG
  }
  return platformId
}

export function shouldDocDetailSectionUseCommonScope(routeSlug = '', sectionId = '') {
  if (isDocDetailPlatformLess(routeSlug)) {
    return Boolean(sectionId)
  }

  return getDocDetailUniversalSectionIds(routeSlug).includes(sectionId)
}

export function resolveDocDetailSectionRoutePlatformId({
  platformId = '',
  sectionId = '',
  routeSlug = '',
  hasPlatforms = true,
  hasFeatureScopeGroup = false,
} = {}) {
  if (platformId && !isDocDetailCommonScopeId(platformId)) {
    return hasPlatforms ? platformId : ''
  }

  if (
    sectionId
    && (hasFeatureScopeGroup || !hasPlatforms)
    && shouldDocDetailSectionUseCommonScope(routeSlug, sectionId)
  ) {
    return DOC_DETAIL_COMMON_SCOPE_SLUG
  }

  return ''
}

export function getDocDetailUniversalSectionGroupLabel(isZhContent, variant = 'catalog') {
  if (variant === 'sidebar') {
    return isZhContent ? '通用' : 'Common'
  }

  return isZhContent ? '通用指南' : 'Common Guides'
}

export function getDocDetailUniversalSectionIds(routeSlug = '') {
  return DOC_DETAIL_UNIVERSAL_SECTION_IDS_BY_ROUTE_SLUG[routeSlug] ?? []
}

export function hasDocDetailUniversalSections(routeSlug = '') {
  return (
    getDocDetailUniversalSectionIds(routeSlug).length > 0
    && getDocDetailPlatforms(routeSlug).length > 0
  )
}

export function getDocDetailPlatformSectionIds(routeSlug = '', isZhContent) {
  void routeSlug
  return getDocDetailTocSections(isZhContent).map((section) => section.id)
}

export function filterDocDetailSectionsByIds(sections = [], sectionIds = []) {
  const allowedIds = new Set(sectionIds)
  return sections.filter((section) => allowedIds.has(section.id))
}

export function getDocDetailCatalogSectionColumnsForIds(isZhContent, sectionIds) {
  if (!sectionIds?.length) {
    return getDocDetailCatalogSectionColumns(isZhContent)
  }

  const allowedIds = new Set(sectionIds)

  return getDocDetailCatalogSectionColumns(isZhContent)
    .map((columnSections) => columnSections.filter((section) => allowedIds.has(section.id)))
    .filter((columnSections) => columnSections.length > 0)
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
  const normalizedPlatformId = normalizeDocDetailRoutePlatformId(platformId)
  if (!normalizedPlatformId) {
    return true
  }

  if (isDocDetailCommonScopeId(normalizedPlatformId)) {
    return hasDocDetailUniversalSections(routeSlug) || isDocDetailPlatformLess(routeSlug)
  }

  if (isDocDetailPlatformLess(routeSlug)) {
    return false
  }

  const allowedIds = DOC_DETAIL_PLATFORM_IDS_BY_ROUTE_SLUG[routeSlug]
  if (!allowedIds?.length) {
    return true
  }

  return allowedIds.includes(normalizedPlatformId)
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

export const DEFAULT_DOC_DETAIL_SECTION_ID = 'summary'

export function getDocDetailTocSections(isZhContent) {
  return isZhContent ? DOC_DETAIL_TOC_SECTIONS_ZH : DOC_DETAIL_TOC_SECTIONS_EN
}

export function getDefaultDocDetailSectionId() {
  return DEFAULT_DOC_DETAIL_SECTION_ID
}

const DOC_DETAIL_CATALOG_SECTION_COLUMN_IDS = [
  ['summary', 'related'],
  ['description', 'notes'],
  ['steps'],
  ['faq'],
]

export function getDocDetailCatalogSectionColumns(isZhContent) {
  const sections = getDocDetailTocSections(isZhContent)
  const sectionById = Object.fromEntries(sections.map((section) => [section.id, section]))

  return DOC_DETAIL_CATALOG_SECTION_COLUMN_IDS.map((columnIds) =>
    columnIds.map((sectionId) => sectionById[sectionId]).filter(Boolean),
  )
}
