import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { scrollDocDetailPanelToTop } from '../utils/docDetailSectionContent'

function deriveContentViewMode(platformId, hasPlatforms = true) {
  if (!hasPlatforms) {
    return 'article-detail'
  }

  if (!platformId) {
    return 'doc-catalog-index'
  }

  return 'platform-detail'
}

export function useDocDetailToc({
  routePlatformId = '',
  routeDetailSectionId = '',
  onRouteChange,
  hasPlatforms = true,
} = {}) {
  const [scrollLinkedSectionId, setScrollLinkedSectionId] = useState('')
  const pendingScrollSectionIdRef = useRef('')
  const shouldScrollToSectionRef = useRef('')

  useEffect(() => {
    if (routeDetailSectionId) {
      setScrollLinkedSectionId(routeDetailSectionId)
      return
    }

    setScrollLinkedSectionId('')
  }, [routePlatformId, routeDetailSectionId])

  const contentViewMode = useMemo(
    () => deriveContentViewMode(routePlatformId, hasPlatforms),
    [hasPlatforms, routePlatformId],
  )

  const expandedPlatformId = routePlatformId
  const activePlatformId = routePlatformId
  const activeSectionId = scrollLinkedSectionId

  const handlePlatformNavigate = useCallback((platformId) => {
    if (!hasPlatforms) {
      return
    }

    if (routePlatformId === platformId && deriveContentViewMode(routePlatformId, hasPlatforms) === 'platform-detail') {
      setScrollLinkedSectionId('')
      window.requestAnimationFrame(() => {
        scrollDocDetailPanelToTop()
      })
      return
    }

    setScrollLinkedSectionId('')
    onRouteChange?.({ platformId, detailSectionId: '' })
  }, [hasPlatforms, onRouteChange, routePlatformId])

  const handleSectionAnchorClick = useCallback((platformId, sectionId) => {
    setScrollLinkedSectionId(sectionId)

    if (!hasPlatforms) {
      shouldScrollToSectionRef.current = sectionId
      return
    }

    if (routePlatformId !== platformId) {
      pendingScrollSectionIdRef.current = sectionId
      onRouteChange?.({ platformId, detailSectionId: '' })
      return
    }

    shouldScrollToSectionRef.current = sectionId
  }, [hasPlatforms, onRouteChange, routePlatformId])

  const handleBreadcrumbDocClick = useCallback(() => {
    setScrollLinkedSectionId('')
    onRouteChange?.({ platformId: '', detailSectionId: '' })
  }, [onRouteChange])

  const consumePendingScrollSectionId = useCallback(() => {
    const sectionId = pendingScrollSectionIdRef.current
    pendingScrollSectionIdRef.current = ''
    return sectionId
  }, [])

  const consumeShouldScrollSectionId = useCallback(() => {
    const sectionId = shouldScrollToSectionRef.current
    shouldScrollToSectionRef.current = ''
    return sectionId
  }, [])

  return {
    expandedPlatformId,
    activePlatformId,
    activeSectionId,
    contentViewMode,
    handlePlatformNavigate,
    handleSectionAnchorClick,
    handleBreadcrumbDocClick,
    consumePendingScrollSectionId,
    consumeShouldScrollSectionId,
    setScrollLinkedSectionId,
  }
}
