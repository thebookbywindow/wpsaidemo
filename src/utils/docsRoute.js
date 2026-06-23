import {
  DOC_DETAIL_TOC_PLATFORMS,
  getDocDetailSectionUrlSlug,
  isValidDocDetailSectionUrlSlug,
  resolveDocDetailSectionIdFromUrlSlug,
} from '../data/docDetailTocData'
import { toUrlLocale } from './localeUrl'
import { joinPath } from './pathUrl'

const DOC_DETAIL_PLATFORM_IDS = new Set(DOC_DETAIL_TOC_PLATFORMS.map((platform) => platform.id))

export function isValidDocDetailPlatformId(platformId) {
  return DOC_DETAIL_PLATFORM_IDS.has(platformId)
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
    }
  }

  const first = segments[docsIndex + 1] ?? ''
  const second = segments[docsIndex + 2] ?? ''
  const third = segments[docsIndex + 3] ?? ''

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
    }
  }

  return {
    sectionSlug: first,
    itemSlug: second,
    docRouteSlug: '',
    platformId: '',
    detailSectionId: '',
  }
}

export function getLocaleDocsPath(
  locale,
  slug = '',
  platformOrItemSlug = '',
  detailSectionId = '',
) {
  const urlLocale = toUrlLocale(locale)

  if (!slug) {
    return joinPath(urlLocale, 'docs')
  }

  if (isValidDocDetailPlatformId(platformOrItemSlug)) {
    const detailSectionUrlSlug = detailSectionId
      ? getDocDetailSectionUrlSlug(detailSectionId)
      : ''
    if (detailSectionUrlSlug && isValidDocDetailSectionUrlSlug(detailSectionUrlSlug)) {
      return joinPath(urlLocale, 'docs', slug, platformOrItemSlug, detailSectionUrlSlug)
    }
    return joinPath(urlLocale, 'docs', slug, platformOrItemSlug)
  }

  if (platformOrItemSlug) {
    return joinPath(urlLocale, 'docs', slug, platformOrItemSlug)
  }

  return joinPath(urlLocale, 'docs', slug)
}

export function resolveDocRouteSlug(meta, sectionSlugMap, displayParts, fallbackSlugFn) {
  if (meta?.docRouteSlug) {
    return meta.docRouteSlug
  }

  const sectionLabel = displayParts?.[0] ?? meta?.pathParts?.[0] ?? ''
  const sectionSlug = sectionSlugMap[sectionLabel]
    ?? fallbackSlugFn?.(sectionLabel, sectionSlugMap)
    ?? sectionLabel

  return `${sectionSlug}/${meta?.routeSlug ?? ''}`.replace(/\/$/, '')
}

export function resolveDocSectionSlug(meta, sectionSlugMap, displayParts, fallbackSlugFn) {
  if (meta?.docRouteSlug) {
    return meta.docRouteSlug
  }

  if (meta?.sectionRouteSlug) {
    return meta.sectionRouteSlug
  }

  const sectionLabel = displayParts?.[0] ?? meta?.pathParts?.[0] ?? ''
  if (sectionSlugMap[sectionLabel]) {
    return sectionSlugMap[sectionLabel]
  }

  return fallbackSlugFn?.(sectionLabel, sectionSlugMap) ?? sectionLabel
}
