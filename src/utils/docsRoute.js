import {
  DOC_DETAIL_TOC_PLATFORMS,
  getDocDetailSectionUrlSlug,
  isDocDetailCommonScopeId,
  isValidDocDetailSectionUrlSlug,
  normalizeDocDetailRoutePlatformId,
  resolveDocDetailSectionIdFromUrlSlug,
} from '../data/docDetailTocData'
import { toUrlLocale } from './localeUrl'
import { joinPath } from './pathUrl'

const DOC_DETAIL_PLATFORM_IDS = new Set(DOC_DETAIL_TOC_PLATFORMS.map((platform) => platform.id))

export const LEGACY_FLAT_DOC_ROUTE_MAP = {
  'wps-writer': { sectionSlug: 'getting-started', itemSlug: 'wps-writer' },
}

/** Dispatched when header/nav asks Docs Center to scroll to an L1 section. */
export const DOCS_CENTER_SCROLL_TO_SECTION_EVENT = 'docs-center:scroll-to-section'

export function requestDocsCenterScrollToSection(sectionSlug = '') {
  const slug = `${sectionSlug ?? ''}`.trim()
  if (!slug || typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(
    new CustomEvent(DOCS_CENTER_SCROLL_TO_SECTION_EVENT, {
      detail: { sectionSlug: slug },
    }),
  )
}

function createEmptyDocsRoute() {
  return {
    sectionSlug: '',
    blockSlug: '',
    itemSlug: '',
    docRouteSlug: '',
    platformId: '',
    detailSectionId: '',
    isLegacyFlatRoute: false,
    isLegacyMissingBlock: false,
  }
}

export function isValidDocDetailPlatformId(platformId) {
  return DOC_DETAIL_PLATFORM_IDS.has(platformId)
}

function isDocDetailRoutePlatformSegment(platformId) {
  return isValidDocDetailPlatformId(platformId) || isDocDetailCommonScopeId(platformId)
}

export function isLegacyFlatDocRouteSlug(slug) {
  return Boolean(LEGACY_FLAT_DOC_ROUTE_MAP[slug])
}

export function resolveLegacyFlatDocRoute(slug) {
  return LEGACY_FLAT_DOC_ROUTE_MAP[slug] ?? null
}

function splitDocSlug(slug) {
  return `${slug ?? ''}`.split('/').filter(Boolean)
}

function buildDocSlug({ sectionSlug = '', blockSlug = '', itemSlug = '' } = {}) {
  return [sectionSlug, blockSlug, itemSlug].filter(Boolean).join('/')
}

export function parseDocsRoute(pathname) {
  const segments = `${pathname ?? ''}`.split('/').filter(Boolean)
  const docsIndex = segments.indexOf('docs')
  if (docsIndex < 0) {
    return createEmptyDocsRoute()
  }

  let routeSegments = segments.slice(docsIndex + 1)
  if (!routeSegments.length) {
    return createEmptyDocsRoute()
  }

  let platformId = ''
  let detailSectionId = ''
  let contentSegments = [...routeSegments]

  if (
    contentSegments.length > 0
    && isValidDocDetailSectionUrlSlug(contentSegments[contentSegments.length - 1])
  ) {
    detailSectionId = resolveDocDetailSectionIdFromUrlSlug(contentSegments[contentSegments.length - 1])
    contentSegments = contentSegments.slice(0, -1)
  }

  if (
    contentSegments.length > 0
    && isDocDetailRoutePlatformSegment(contentSegments[contentSegments.length - 1])
  ) {
    platformId = normalizeDocDetailRoutePlatformId(contentSegments[contentSegments.length - 1])
    contentSegments = contentSegments.slice(0, -1)
  }

  const [first = '', second = '', third = ''] = contentSegments

  if (contentSegments.length >= 3) {
    return {
      sectionSlug: first,
      blockSlug: second,
      itemSlug: third,
      docRouteSlug: '',
      platformId,
      detailSectionId,
      isLegacyFlatRoute: false,
      isLegacyMissingBlock: false,
    }
  }

  if (contentSegments.length === 2) {
    if (isLegacyFlatDocRouteSlug(first)) {
      return {
        sectionSlug: '',
        blockSlug: '',
        itemSlug: '',
        docRouteSlug: first,
        platformId,
        detailSectionId,
        isLegacyFlatRoute: true,
        isLegacyMissingBlock: false,
      }
    }

    return {
      sectionSlug: first,
      blockSlug: '',
      itemSlug: second,
      docRouteSlug: '',
      platformId,
      detailSectionId,
      isLegacyFlatRoute: false,
      isLegacyMissingBlock: true,
    }
  }

  if (contentSegments.length === 1) {
    if (isLegacyFlatDocRouteSlug(first)) {
      return {
        sectionSlug: '',
        blockSlug: '',
        itemSlug: '',
        docRouteSlug: first,
        platformId,
        detailSectionId,
        isLegacyFlatRoute: true,
        isLegacyMissingBlock: false,
      }
    }

    return {
      sectionSlug: first,
      blockSlug: '',
      itemSlug: '',
      docRouteSlug: '',
      platformId,
      detailSectionId,
      isLegacyFlatRoute: false,
      isLegacyMissingBlock: false,
    }
  }

  return createEmptyDocsRoute()
}

export function normalizeDocsRoute(parsed) {
  if (!parsed?.isLegacyFlatRoute) {
    return parsed
  }

  const legacy = resolveLegacyFlatDocRoute(parsed.docRouteSlug)
  if (!legacy) {
    return parsed
  }

  return {
    ...parsed,
    sectionSlug: legacy.sectionSlug,
    blockSlug: '',
    itemSlug: legacy.itemSlug,
    docRouteSlug: '',
    isLegacyFlatRoute: true,
    isLegacyMissingBlock: true,
  }
}

export function getLocaleDocsPath(
  locale,
  slug = '',
  platformOrItemSlug = '',
  detailSectionId = '',
) {
  const urlLocale = toUrlLocale(locale)
  const slugParts = splitDocSlug(slug)

  if (!slugParts.length) {
    return joinPath(urlLocale, 'docs')
  }

  const detailSectionUrlSlug = detailSectionId
    ? getDocDetailSectionUrlSlug(detailSectionId)
    : ''

  const normalizedPlatformId = normalizeDocDetailRoutePlatformId(platformOrItemSlug)

  if (isDocDetailRoutePlatformSegment(normalizedPlatformId)) {
    if (detailSectionUrlSlug && isValidDocDetailSectionUrlSlug(detailSectionUrlSlug)) {
      return joinPath(urlLocale, 'docs', ...slugParts, normalizedPlatformId, detailSectionUrlSlug)
    }
    return joinPath(urlLocale, 'docs', ...slugParts, normalizedPlatformId)
  }

  if (detailSectionUrlSlug && isValidDocDetailSectionUrlSlug(detailSectionUrlSlug)) {
    return joinPath(urlLocale, 'docs', ...slugParts, detailSectionUrlSlug)
  }

  if (platformOrItemSlug) {
    return joinPath(urlLocale, 'docs', ...slugParts, platformOrItemSlug)
  }

  return joinPath(urlLocale, 'docs', ...slugParts)
}

export function buildCanonicalDocPath(
  locale,
  { sectionSlug = '', blockSlug = '', itemSlug = '', platformId = '', detailSectionId = '' } = {},
) {
  const docSlug = buildDocSlug({ sectionSlug, blockSlug, itemSlug })
  return getLocaleDocsPath(locale, docSlug, platformId, detailSectionId)
}

export function resolveDocSectionSlug(meta, sectionSlugMap, displayParts, fallbackSlugFn) {
  if (meta?.sectionRouteSlug) {
    return meta.sectionRouteSlug
  }

  const sectionLabel = displayParts?.[0] ?? meta?.pathParts?.[0] ?? ''
  if (sectionSlugMap[sectionLabel]) {
    return sectionSlugMap[sectionLabel]
  }

  return fallbackSlugFn?.(sectionLabel, sectionSlugMap) ?? sectionLabel
}

export function resolveDocBlockSlug(meta, blockSlugMap, fallbackSlugFn) {
  if (meta?.blockRouteSlug) {
    return meta.blockRouteSlug
  }

  if ((meta?.pathParts?.length ?? 0) < 3) {
    return ''
  }

  const blockLabel = meta.pathParts[1] ?? ''
  if (blockSlugMap?.[blockLabel]) {
    return blockSlugMap[blockLabel]
  }

  return fallbackSlugFn?.(blockLabel, blockSlugMap) ?? blockLabel
}

export function resolveDocRouteSlug(meta, sectionSlugMap, displayParts, fallbackSlugFn, blockSlugMap) {
  const sectionSlug = resolveDocSectionSlug(meta, sectionSlugMap, displayParts, fallbackSlugFn)
  const blockSlug = resolveDocBlockSlug(meta, blockSlugMap, fallbackSlugFn)
  const featureSlug = meta?.routeSlug ?? ''

  if (blockSlug) {
    return `${sectionSlug}/${blockSlug}/${featureSlug}`.replace(/\/$/, '')
  }

  return `${sectionSlug}/${featureSlug}`.replace(/\/$/, '')
}

export function buildHelpDocRouteLookupKey(sectionSlug, blockSlug, itemSlug) {
  if (sectionSlug && blockSlug && itemSlug) {
    return `${sectionSlug}/${blockSlug}/${itemSlug}`
  }

  if (sectionSlug && itemSlug) {
    return `${sectionSlug}/${itemSlug}`
  }

  return ''
}
