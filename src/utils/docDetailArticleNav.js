export function buildDocDetailPlatformNavItems(platform, sections = []) {
  if (!platform) {
    return []
  }

  return sections.map((section) => ({
    platformId: platform.id,
    platformLabel: platform.label,
    sectionId: section.id,
    sectionLabel: section.label,
  }))
}

export function getDocDetailArticleNavNeighbors(items, sectionId) {
  const currentIndex = items.findIndex((item) => item.sectionId === sectionId)

  if (currentIndex === -1) {
    return { prev: null, next: null, currentIndex: -1 }
  }

  return {
    prev: currentIndex > 0 ? items[currentIndex - 1] : null,
    next: currentIndex < items.length - 1 ? items[currentIndex + 1] : null,
    currentIndex,
  }
}

export function getDocDetailArticleNavTargetLabel(item) {
  return item?.sectionLabel ?? ''
}

export function getDocDetailArticlePagerLabels(isZhContent) {
  return {
    navAriaLabel: isZhContent ? '章节导航' : 'Section navigation',
    previous: isZhContent ? '上一篇' : 'Previous',
    next: isZhContent ? '下一篇' : 'Next',
    previousAriaLabel: isZhContent ? '前往上一篇' : 'Go to previous article',
    nextAriaLabel: isZhContent ? '前往下一篇' : 'Go to next article',
  }
}
