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

  'create-document': [

    'product-updates',

    'features-overview',

    'plans-pricing',

    'getting-started',

    'how-to-guide',

    'faq',

    'notes',

    'glossary',

    'related-resources',

  ],

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

  { id: 'product-updates', label: '产品更新 / 发行说明', urlSlug: 'product-updates' },

  { id: 'features-overview', label: '功能概述', urlSlug: 'features-overview' },

  { id: 'plans-pricing', label: '套餐与定价', urlSlug: 'plans-pricing' },

  { id: 'getting-started', label: '快速入门', urlSlug: 'getting-started' },

  { id: 'how-to-guide', label: '操作指南', urlSlug: 'how-to-guide' },

  { id: 'faq', label: '常见问题', urlSlug: 'faq' },

  { id: 'notes', label: '注意事项', urlSlug: 'notes' },

  { id: 'glossary', label: '术语表', urlSlug: 'glossary' },

  { id: 'related-resources', label: '相关资源', urlSlug: 'related-resources' },

]



export const DOC_DETAIL_TOC_SECTIONS_EN = [

  { id: 'product-updates', label: 'Release Notes', urlSlug: 'product-updates' },

  { id: 'features-overview', label: 'Features Overview', urlSlug: 'features-overview' },

  { id: 'plans-pricing', label: 'Plans & Pricing', urlSlug: 'plans-pricing' },

  { id: 'getting-started', label: 'Getting Started', urlSlug: 'getting-started' },

  { id: 'how-to-guide', label: 'How-to Guide', urlSlug: 'how-to-guide' },

  { id: 'faq', label: 'FAQ', urlSlug: 'faq' },

  { id: 'notes', label: 'Notes', urlSlug: 'notes' },

  { id: 'glossary', label: 'Glossary', urlSlug: 'glossary' },

  { id: 'related-resources', label: 'Related Resources', urlSlug: 'related-resources' },

]



const DOC_DETAIL_LEGACY_SECTION_URL_SLUG_ALIASES = {

  'feature-summary': 'features-overview',

  'feature-description': 'plans-pricing',

  steps: 'getting-started',

  'related-questions': 'related-resources',

}



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

  const normalizedSlug = DOC_DETAIL_LEGACY_SECTION_URL_SLUG_ALIASES[urlSlug] ?? urlSlug

  return DOC_DETAIL_SECTION_URL_SLUG_TO_ID[normalizedSlug] ?? ''

}



export function isValidDocDetailSectionUrlSlug(urlSlug) {

  const normalizedSlug = DOC_DETAIL_LEGACY_SECTION_URL_SLUG_ALIASES[urlSlug] ?? urlSlug

  return Boolean(DOC_DETAIL_SECTION_URL_SLUG_TO_ID[normalizedSlug])

}



export const DEFAULT_DOC_DETAIL_SECTION_ID = 'product-updates'



export function getDocDetailTocSections(isZhContent) {

  return isZhContent ? DOC_DETAIL_TOC_SECTIONS_ZH : DOC_DETAIL_TOC_SECTIONS_EN

}



export function getDefaultDocDetailSectionId() {

  return DEFAULT_DOC_DETAIL_SECTION_ID

}



const DOC_DETAIL_CATALOG_SECTION_COLUMN_IDS = [

  ['product-updates', 'plans-pricing', 'faq'],

  ['features-overview', 'getting-started', 'notes'],

  ['how-to-guide', 'glossary', 'related-resources'],

]



export function flattenDocDetailCatalogSectionColumns(sectionColumns = []) {

  const sections = []

  const seenIds = new Set()



  sectionColumns.forEach((column) => {

    column.forEach((section) => {

      if (!section || seenIds.has(section.id)) {

        return

      }

      seenIds.add(section.id)

      sections.push(section)

    })

  })



  return sections

}



export function distributeDocDetailCatalogSectionsToColumns(

  sections = [],

  columnCount = DOC_DETAIL_CATALOG_SECTION_COLUMN_IDS.length,

) {

  if (!sections.length) {

    return []

  }



  const columns = Array.from({ length: columnCount }, () => [])

  sections.forEach((section, index) => {

    columns[index % columnCount].push(section)

  })



  return columns.filter((column) => column.length > 0)

}



export function getDocDetailCatalogSectionColumns(isZhContent) {

  const sections = getDocDetailTocSections(isZhContent)

  const sectionById = Object.fromEntries(sections.map((section) => [section.id, section]))



  return DOC_DETAIL_CATALOG_SECTION_COLUMN_IDS.map((columnIds) =>

    columnIds.map((sectionId) => sectionById[sectionId]).filter(Boolean),

  )

}



const DOC_DETAIL_PLATFORM_CATALOG_GROUPS = [

  {

    id: 'desktop',

    labels: { en: 'Desktop', zh: '桌面端' },

    entries: [

      { routeId: 'windows' },

      { routeId: 'mac' },

      { routeId: 'linux' },

    ],

  },

  {

    id: 'mobile-phone',

    labels: { en: 'Mobile Phone', zh: '手机' },

    entries: [

      {

        routeId: 'android',

        catalogId: 'android-phone',

        labels: { en: 'Android Phone', zh: 'Android 手机' },

      },

      {

        routeId: 'ios',

        catalogId: 'iphone',

        labels: { en: 'iPhone', zh: 'iPhone' },

      },

    ],

  },

  {

    id: 'web',

    labels: { en: 'Web', zh: '网页端' },

    entries: [{ routeId: 'web' }],

  },

]



export function groupDocDetailPlatformsForCatalog(platforms = [], isZhContent) {

  const allowedRouteIds = new Set(platforms.map((platform) => platform.id))

  const platformLabelByRouteId = Object.fromEntries(

    platforms.map((platform) => [platform.id, platform.label]),

  )



  return DOC_DETAIL_PLATFORM_CATALOG_GROUPS.map((groupDef) => {

    const catalogPlatforms = groupDef.entries

      .filter((entry) => allowedRouteIds.has(entry.routeId))

      .map((entry) => ({

        catalogId: entry.catalogId ?? entry.routeId,

        routeId: entry.routeId,

        label: entry.labels

          ? (isZhContent ? entry.labels.zh : entry.labels.en)

          : platformLabelByRouteId[entry.routeId],

      }))



    if (!catalogPlatforms.length) {

      return null

    }



    return {

      id: groupDef.id,

      label: isZhContent ? groupDef.labels.zh : groupDef.labels.en,

      platforms: catalogPlatforms,

    }

  }).filter(Boolean)

}



export function flattenDocDetailPlatformsForCatalog(platforms = [], isZhContent) {

  return groupDocDetailPlatformsForCatalog(platforms, isZhContent).flatMap(

    (group) => group.platforms,

  )

}


