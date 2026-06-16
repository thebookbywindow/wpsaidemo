import { useCallback, useState } from 'react'

const DEFAULT_SECTION_ID = 'summary'

export function useDocDetailToc() {
  const [expandedPlatformId, setExpandedPlatformId] = useState('')
  const [activePlatformId, setActivePlatformId] = useState('')
  const [activeSectionId, setActiveSectionId] = useState(DEFAULT_SECTION_ID)
  const [contentViewMode, setContentViewMode] = useState('doc-catalog-index')

  const handleSidebarPlatformToggle = useCallback((platformId) => {
    setExpandedPlatformId((currentPlatformId) =>
      currentPlatformId === platformId ? '' : platformId,
    )
  }, [])

  const handleSectionClick = useCallback((platformId, sectionId) => {
    setExpandedPlatformId(platformId)
    setActivePlatformId(platformId)
    setActiveSectionId(sectionId)
    setContentViewMode('section-detail')
  }, [])

  const handleBreadcrumbPlatformClick = useCallback((platformId) => {
    setExpandedPlatformId(platformId)
    setActivePlatformId(platformId)
    setContentViewMode('platform-index')
  }, [])

  const handleBreadcrumbDocClick = useCallback(() => {
    setExpandedPlatformId('')
    setActivePlatformId('')
    setContentViewMode('doc-catalog-index')
  }, [])

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
