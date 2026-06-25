import DocDetailTocSidebar from './DocDetailTocSidebar'

export default function DocDetailTocPanel({
  sidebarTitle,
  isZhContent,
  expandedPlatformId,
  activePlatformId,
  activeSectionId,
  contentViewMode,
  onPlatformToggle,
  onSectionClick,
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
      onPlatformToggle={onPlatformToggle}
      onSectionClick={onSectionClick}
      platforms={platforms}
      embedded={embedded}
    />
  )
}
