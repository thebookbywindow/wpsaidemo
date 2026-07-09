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
  universalSectionIds = [],
  platformSectionIds = [],
  embedded = false,
  onDrawerClose,
  drawerCloseLabel = '',
  drawerHeadTitle = '',
  drawerCloseSide = 'left',
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
      universalSectionIds={universalSectionIds}
      platformSectionIds={platformSectionIds}
      embedded={embedded}
      onDrawerClose={onDrawerClose}
      drawerCloseLabel={drawerCloseLabel}
      drawerHeadTitle={drawerHeadTitle}
      drawerCloseSide={drawerCloseSide}
    />
  )
}
