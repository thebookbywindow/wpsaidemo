import { useMemo } from 'react'
import { getDocDetailTocSections } from '../data/docDetailTocData'
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
}) {
  const sections = useMemo(() => getDocDetailTocSections(isZhContent), [isZhContent])

  const activePlatform = useMemo(
    () => platforms.find((platform) => platform.id === activePlatformId) ?? null,
    [platforms, activePlatformId],
  )

  const platformNavItems = useMemo(
    () => buildDocDetailPlatformNavItems(activePlatform, sections),
    [activePlatform, sections],
  )

  const neighbors = useMemo(() => {
    if (contentViewMode !== 'section-detail' || !activePlatformId) {
      return { prev: null, next: null, currentIndex: -1 }
    }

    return getDocDetailArticleNavNeighbors(platformNavItems, activeSectionId)
  }, [activePlatformId, activeSectionId, contentViewMode, platformNavItems])

  return {
    navItems: platformNavItems,
    ...neighbors,
  }
}
