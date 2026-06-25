import DocDetailTocSidebar from './DocDetailTocSidebar'

export default function DocDetailTocPanel({
  sidebarTitle,
  isZhContent,
  expandedPlatformId,
  activePlatformId,
  activeSectionId,
  contentViewMode,
  onPlatformNavigate,
  onSectionAnchorClick,
  onFeatureTitleClick,
  platforms,
  embedded = false,
}) {
  return (
    <DocDetailTocSidebar
      sidebarTitle={sidebarTitle}
      isZhContent={isZhContent}
      expandedPlatformId={expandedPlatformId}
      activePlatformId={activePlatformId}
      activeSectionId={activeSectionId}
      contentViewMode={contentViewMode}
      onPlatformNavigate={onPlatformNavigate}
      onSectionAnchorClick={onSectionAnchorClick}
      onFeatureTitleClick={onFeatureTitleClick}
      platforms={platforms}
      embedded={embedded}
    />
  )
}
