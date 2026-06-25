import { useCallback, useEffect, useMemo, useState } from 'react'
import { getDefaultDocDetailSectionId } from '../data/docDetailTocData'

function deriveContentViewMode(
  platformId,
  detailSectionId,
  hasPlatforms = true,
  usesStructuredSections = false,
) {
  if (!hasPlatforms) {
    if (usesStructuredSections) {
      return 'section-detail'
    }

    return detailSectionId ? 'section-detail' : 'article-detail'
  }

  if (!platformId || !detailSectionId) {
    return 'doc-catalog-index'
  }

  return 'section-detail'
}

export function useDocDetailToc({
  routePlatformId = '',
  routeDetailSectionId = '',
  onRouteChange,
  hasPlatforms = true,
  usesStructuredSections = false,
} = {}) {
  const defaultSectionId = getDefaultDocDetailSectionId()
  const [expandedPlatformId, setExpandedPlatformId] = useState(routePlatformId)

  useEffect(() => {
    setExpandedPlatformId(routePlatformId)
  }, [routePlatformId])

  const contentViewMode = useMemo(
    () =>
      deriveContentViewMode(
        routePlatformId,
        routeDetailSectionId,
        hasPlatforms,
        usesStructuredSections,
      ),
    [hasPlatforms, routeDetailSectionId, routePlatformId, usesStructuredSections],
  )

  const activePlatformId = routePlatformId
  const activeSectionId =
    routeDetailSectionId
    || (!hasPlatforms && usesStructuredSections ? defaultSectionId : '')

  const handleSidebarPlatformToggle = useCallback((platformId) => {
    setExpandedPlatformId((currentPlatformId) =>
      currentPlatformId === platformId ? '' : platformId,
    )
  }, [])

  const handleSectionClick = useCallback((platformId, sectionId) => {
    if (hasPlatforms) {
      setExpandedPlatformId(platformId)
    }
    onRouteChange?.({
      platformId: hasPlatforms ? platformId : '',
      detailSectionId: sectionId,
    })
  }, [hasPlatforms, onRouteChange])

  const handleBreadcrumbDocClick = useCallback(() => {
    setExpandedPlatformId('')

    if (!hasPlatforms && usesStructuredSections) {
      onRouteChange?.({ platformId: '', detailSectionId: defaultSectionId })
      return
    }

    onRouteChange?.({ platformId: '', detailSectionId: '' })
  }, [defaultSectionId, hasPlatforms, onRouteChange, usesStructuredSections])

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
