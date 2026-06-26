import { useMemo } from 'react'
import {
  filterDocDetailSectionsByIds,
  getDocDetailTocSections,
  isDocDetailCommonScopeId,
} from '../data/docDetailTocData'
import {
  buildDocDetailPlatformNavItems,
  getDocDetailArticleNavNeighbors,
} from '../utils/docDetailArticleNav'

export function useDocDetailArticleNav({
  platforms = [],
  isZhContent,
  activePlatformId = '',
  activeSectionId = '',
  contentViewMode = '',
  universalSectionIds = [],
  platformSectionIds = [],
  hasUniversalSections = false,
}) {
  const sections = useMemo(() => getDocDetailTocSections(isZhContent), [isZhContent])

  const activePlatform = useMemo(() => {
    if (isDocDetailCommonScopeId(activePlatformId) || (!activePlatformId && hasUniversalSections)) {
      return { id: '', label: '' }
    }

    const matchedPlatform = platforms.find((platform) => platform.id === activePlatformId)
    if (matchedPlatform) {
      return matchedPlatform
    }

    if (!platforms.length) {
      return { id: '', label: '' }
    }

    return null
  }, [activePlatformId, hasUniversalSections, platforms])

  const navSections = useMemo(() => {
    if (!hasUniversalSections) {
      return sections
    }

    if (!activePlatformId || isDocDetailCommonScopeId(activePlatformId)) {
      return filterDocDetailSectionsByIds(sections, universalSectionIds)
    }

    return filterDocDetailSectionsByIds(
      sections,
      platformSectionIds.length > 0 ? platformSectionIds : sections.map((section) => section.id),
    )
  }, [
    activePlatformId,
    hasUniversalSections,
    platformSectionIds,
    sections,
    universalSectionIds,
  ])

  const platformNavItems = useMemo(
    () => buildDocDetailPlatformNavItems(activePlatform, navSections),
    [activePlatform, navSections],
  )

  const neighbors = useMemo(() => {
    if (contentViewMode !== 'section-detail') {
      return { prev: null, next: null, currentIndex: -1 }
    }

    if (!activePlatform) {
      return { prev: null, next: null, currentIndex: -1 }
    }

    return getDocDetailArticleNavNeighbors(platformNavItems, activeSectionId)
  }, [activePlatform, activeSectionId, contentViewMode, platformNavItems])

  return {
    navItems: platformNavItems,
    ...neighbors,
  }
}
