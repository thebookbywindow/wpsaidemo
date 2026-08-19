import { useCallback, useMemo, useState } from 'react'
import {
  DOC_DETAIL_COMMON_SCOPE_SLUG,
  isDocDetailCommonScopeId,
  normalizeDocDetailRoutePlatformId,
  resolveDocDetailSectionRoutePlatformId,
} from '../data/docDetailTocData'

function deriveContentViewMode(
  platformId,
  detailSectionId,
  hasPlatforms = true,
  usesStructuredSections = false,
) {
  if (!hasPlatforms) {
    if (usesStructuredSections) {
      return detailSectionId ? 'section-detail' : 'doc-catalog-index'
    }

    return detailSectionId ? 'section-detail' : 'article-detail'
  }

  if (!detailSectionId) {
    return 'doc-catalog-index'
  }

  return 'section-detail'
}

function toSidebarScopeId(platformId, hasFeatureScopeGroup) {
  const normalizedPlatformId = normalizeDocDetailRoutePlatformId(platformId)
  if (isDocDetailCommonScopeId(normalizedPlatformId)) {
    return DOC_DETAIL_COMMON_SCOPE_SLUG
  }
  if (normalizedPlatformId) {
    return normalizedPlatformId
  }
  return hasFeatureScopeGroup ? DOC_DETAIL_COMMON_SCOPE_SLUG : ''
}

export function useDocDetailToc({
  routePlatformId = '',
  routeDetailSectionId = '',
  onRouteChange,
  routeSlug = '',
  hasPlatforms = true,
  hasFeatureScopeGroup = false,
  usesStructuredSections = false,
} = {}) {
  const normalizedRoutePlatformId = normalizeDocDetailRoutePlatformId(routePlatformId)
  const routeSyncKey = `${normalizedRoutePlatformId}|${routeDetailSectionId}|${hasFeatureScopeGroup}`
  const derivedExpandedPlatformId = normalizedRoutePlatformId
    ? toSidebarScopeId(normalizedRoutePlatformId, hasFeatureScopeGroup)
    : routeDetailSectionId && hasFeatureScopeGroup
      ? DOC_DETAIL_COMMON_SCOPE_SLUG
      : ''
  const [expandedPlatformId, setExpandedPlatformId] = useState(derivedExpandedPlatformId)
  const [syncedRouteKey, setSyncedRouteKey] = useState(routeSyncKey)
  if (syncedRouteKey !== routeSyncKey) {
    setSyncedRouteKey(routeSyncKey)
    if (normalizedRoutePlatformId) {
      setExpandedPlatformId(toSidebarScopeId(normalizedRoutePlatformId, hasFeatureScopeGroup))
    } else if (routeDetailSectionId && hasFeatureScopeGroup) {
      setExpandedPlatformId(DOC_DETAIL_COMMON_SCOPE_SLUG)
    } else if (!routeDetailSectionId) {
      setExpandedPlatformId('')
    }
  }

  const contentViewMode = useMemo(
    () =>
      deriveContentViewMode(
        normalizedRoutePlatformId,
        routeDetailSectionId,
        hasPlatforms,
        usesStructuredSections,
      ),
    [hasPlatforms, normalizedRoutePlatformId, routeDetailSectionId, usesStructuredSections],
  )

  const activePlatformId = normalizedRoutePlatformId
  const activeSectionId = routeDetailSectionId

  const handleSectionClick = useCallback((platformId, sectionId) => {
    const nextRoutePlatformId = resolveDocDetailSectionRoutePlatformId({
      platformId,
      sectionId,
      routeSlug,
      hasPlatforms,
      hasFeatureScopeGroup,
    })

    if (hasPlatforms) {
      setExpandedPlatformId(
        isDocDetailCommonScopeId(nextRoutePlatformId)
          ? DOC_DETAIL_COMMON_SCOPE_SLUG
          : nextRoutePlatformId,
      )
    }

    onRouteChange?.({
      platformId: nextRoutePlatformId,
      detailSectionId: sectionId,
    })
  }, [hasFeatureScopeGroup, hasPlatforms, onRouteChange, routeSlug, setExpandedPlatformId])

  const handleSidebarPlatformToggle = useCallback((platformId) => {
    setExpandedPlatformId((currentPlatformId) =>
      currentPlatformId === platformId ? '' : platformId,
    )
  }, [setExpandedPlatformId])

  const handleBreadcrumbDocClick = useCallback(() => {
    setExpandedPlatformId('')
    onRouteChange?.({ platformId: '', detailSectionId: '' })
  }, [onRouteChange, setExpandedPlatformId])

  return {
    expandedPlatformId,
    activePlatformId,
    activeSectionId,
    contentViewMode,
    handleSidebarPlatformToggle,
    handleSectionClick,
    handleBreadcrumbDocClick,
  }
}
