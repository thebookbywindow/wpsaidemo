import DocDetailTocSidebar from './DocDetailTocSidebar'

export default function DocDetailTocPanel({
  sidebarTitle,
  isZhContent,
  expandedPlatformId,
  activePlatformId,
  activeSectionId,
  contentViewMode,
  onPlatformClick,
  onSectionClick,
}) {
  return (
    <DocDetailTocSidebar
      sidebarTitle={sidebarTitle}
      isZhContent={isZhContent}
      expandedPlatformId={expandedPlatformId}
      activePlatformId={activePlatformId}
      activeSectionId={activeSectionId}
      contentViewMode={contentViewMode}
      onPlatformClick={onPlatformClick}
      onSectionClick={onSectionClick}
    />
  )
}
