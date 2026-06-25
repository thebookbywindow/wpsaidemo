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

  const activePlatform = useMemo(() => {
    const matchedPlatform = platforms.find((platform) => platform.id === activePlatformId)
    if (matchedPlatform) {
      return matchedPlatform
    }

    if (!platforms.length) {
      return { id: '', label: '' }
    }

    return null
  }, [platforms, activePlatformId])

  const platformNavItems = useMemo(
    () => buildDocDetailPlatformNavItems(activePlatform, sections),
    [activePlatform, sections],
  )

  const neighbors = useMemo(() => {
    if (contentViewMode !== 'section-detail') {
      return { prev: null, next: null, currentIndex: -1 }
    }

    if (platforms.length > 0 && !activePlatformId) {
      return { prev: null, next: null, currentIndex: -1 }
    }

    return getDocDetailArticleNavNeighbors(platformNavItems, activeSectionId)
  }, [activePlatformId, activeSectionId, contentViewMode, platformNavItems, platforms.length])

  return {
    navItems: platformNavItems,
    ...neighbors,
  }
}
