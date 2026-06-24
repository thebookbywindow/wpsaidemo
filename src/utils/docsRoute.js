import {
  DOC_DETAIL_TOC_PLATFORMS,
  getDocDetailSectionUrlSlug,
  isValidDocDetailSectionUrlSlug,
  resolveDocDetailSectionIdFromUrlSlug,
} from '../data/docDetailTocData'
import { toUrlLocale } from './localeUrl'
import { joinPath } from './pathUrl'

const DOC_DETAIL_PLATFORM_IDS = new Set(DOC_DETAIL_TOC_PLATFORMS.map((platform) => platform.id))

export const LEGACY_FLAT_DOC_ROUTE_MAP = {
  'wps-writer': { sectionSlug: 'getting-started', itemSlug: 'wps-writer' },
}

export function isValidDocDetailPlatformId(platformId) {
  return DOC_DETAIL_PLATFORM_IDS.has(platformId)
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

export function parseDocsRoute(pathname) {
  const segments = `${pathname ?? ''}`.split('/').filter(Boolean)
  const docsIndex = segments.indexOf('docs')
  if (docsIndex < 0) {
    return {
      sectionSlug: '',
      itemSlug: '',
      docRouteSlug: '',
      platformId: '',
      detailSectionId: '',
      isLegacyFlatRoute: false,
    }
  }

  const routeSegments = segments.slice(docsIndex + 1)
  const [first = '', second = '', third = '', fourth = ''] = routeSegments

  if (isValidDocDetailPlatformId(third)) {
    const detailSectionId = isValidDocDetailSectionUrlSlug(fourth)
      ? resolveDocDetailSectionIdFromUrlSlug(fourth)
      : ''

    return {
      sectionSlug: first,
      itemSlug: second,
      docRouteSlug: '',
      platformId: third,
      detailSectionId,
      isLegacyFlatRoute: false,
    }
  }

  if (isValidDocDetailPlatformId(second)) {
    const detailSectionId = isValidDocDetailSectionUrlSlug(third)
      ? resolveDocDetailSectionIdFromUrlSlug(third)
      : ''

    return {
      sectionSlug: '',
      itemSlug: '',
      docRouteSlug: first,
      platformId: second,
      detailSectionId,
      isLegacyFlatRoute: isLegacyFlatDocRouteSlug(first),
    }
  }

  if (!second && isLegacyFlatDocRouteSlug(first)) {
    return {
      sectionSlug: '',
      itemSlug: '',
      docRouteSlug: first,
      platformId: '',
      detailSectionId: '',
      isLegacyFlatRoute: true,
    }
  }

  return {
    sectionSlug: first,
    itemSlug: second,
    docRouteSlug: '',
    platformId: '',
    detailSectionId: '',
    isLegacyFlatRoute: false,
  }
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
    sectionSlug: legacy.sectionSlug,
    itemSlug: legacy.itemSlug,
    docRouteSlug: '',
    platformId: parsed.platformId,
    detailSectionId: parsed.detailSectionId,
    isLegacyFlatRoute: true,
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

  if (isValidDocDetailPlatformId(platformOrItemSlug)) {
    const detailSectionUrlSlug = detailSectionId
      ? getDocDetailSectionUrlSlug(detailSectionId)
      : ''
    if (detailSectionUrlSlug && isValidDocDetailSectionUrlSlug(detailSectionUrlSlug)) {
      return joinPath(urlLocale, 'docs', ...slugParts, platformOrItemSlug, detailSectionUrlSlug)
    }
    return joinPath(urlLocale, 'docs', ...slugParts, platformOrItemSlug)
  }

  if (platformOrItemSlug) {
    return joinPath(urlLocale, 'docs', ...slugParts, platformOrItemSlug)
  }

  return joinPath(urlLocale, 'docs', ...slugParts)
}

export function buildCanonicalDocPath(
  locale,
  { sectionSlug = '', itemSlug = '', platformId = '', detailSectionId = '' } = {},
) {
  const docSlug = sectionSlug && itemSlug ? `${sectionSlug}/${itemSlug}` : sectionSlug
  return getLocaleDocsPath(locale, docSlug, platformId, detailSectionId)
}

export function resolveDocRouteSlug(meta, sectionSlugMap, displayParts, fallbackSlugFn) {
  const sectionLabel = displayParts?.[0] ?? meta?.pathParts?.[0] ?? ''
  const sectionSlug = sectionSlugMap[sectionLabel]
    ?? fallbackSlugFn?.(sectionLabel, sectionSlugMap)
    ?? sectionLabel

  return `${sectionSlug}/${meta?.routeSlug ?? ''}`.replace(/\/$/, '')
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
