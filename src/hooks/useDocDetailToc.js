import { useCallback, useEffect, useMemo, useState } from 'react'

const DEFAULT_SECTION_ID = 'summary'

function deriveContentViewMode(platformId, detailSectionId) {
  if (!platformId) {
    return 'doc-catalog-index'
  }
  if (!detailSectionId) {
    return 'platform-index'
  }
  return 'section-detail'
}

export function useDocDetailToc({
  routePlatformId = '',
  routeDetailSectionId = '',
  onRouteChange,
} = {}) {
  const [expandedPlatformId, setExpandedPlatformId] = useState(routePlatformId)

  useEffect(() => {
    setExpandedPlatformId(routePlatformId)
  }, [routePlatformId])

  const contentViewMode = useMemo(
    () => deriveContentViewMode(routePlatformId, routeDetailSectionId),
    [routePlatformId, routeDetailSectionId],
  )

  const activePlatformId = routePlatformId
  const activeSectionId = routeDetailSectionId || DEFAULT_SECTION_ID

  const handleSidebarPlatformToggle = useCallback((platformId) => {
    setExpandedPlatformId((currentPlatformId) =>
      currentPlatformId === platformId ? '' : platformId,
    )
  }, [])

  const handleSectionClick = useCallback((platformId, sectionId) => {
    setExpandedPlatformId(platformId)
    onRouteChange?.({ platformId, detailSectionId: sectionId })
  }, [onRouteChange])

  const handleBreadcrumbPlatformClick = useCallback((platformId) => {
    setExpandedPlatformId(platformId)
    onRouteChange?.({ platformId, detailSectionId: '' })
  }, [onRouteChange])

  const handleBreadcrumbDocClick = useCallback(() => {
    setExpandedPlatformId('')
    onRouteChange?.({ platformId: '', detailSectionId: '' })
  }, [onRouteChange])

  return {
    expandedPlatformId,
    activePlatformId,
    activeSectionId,
    contentViewMode,
    handleSidebarPlatformToggle,
    handleSectionClick,
    handleBreadcrumbPlatformClick,
    handleBreadcrumbDocClick,
  }
}
