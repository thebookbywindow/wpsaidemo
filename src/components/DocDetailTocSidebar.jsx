import { useLayoutEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  DOC_DETAIL_COMMON_SCOPE_SLUG,
  DOC_DETAIL_FEATURE_SCOPE_ID,
  filterDocDetailSectionsByIds,
  getDocDetailPlatforms,
  getDocDetailTocSections,
  getDocDetailUniversalSectionGroupLabel,
  isDocDetailCommonScopeId,
} from '../data/docDetailTocData'
import { getDocDetailFeatureIcon, getDocDetailPlatformIcon } from '../utils/docDetailPlatformIcons'

const RAIL_ACCENT_HEIGHT = 20

export default function DocDetailTocSidebar({
  sidebarTitle,
  isZhContent,
  expandedPlatformId,
  activePlatformId,
  activeSectionId,
  contentViewMode,
  onPlatformToggle,
  onSectionClick,
  platforms = getDocDetailPlatforms(),
  universalSectionIds = [],
  platformSectionIds = [],
  embedded = false,
  onDrawerClose,
  drawerCloseLabel = '',
  drawerHeadTitle = '',
  drawerCloseSide = 'left',
  variant = 'default',
}) {
  const isPopover = variant === 'popover'
  const showRail = embedded && !isPopover
  const showPlatformIcons = isPopover
  const PlatformChevron = isPopover ? ChevronDown : ChevronRight
  const chevronSize = isPopover ? 18 : 18
  const sections = getDocDetailTocSections(isZhContent)
  const isPlatformLess = platforms.length === 0
  const hasUniversalSections = universalSectionIds.length > 0 && !isPlatformLess
  const isHybrid = hasUniversalSections
  const platformLessGroupLabel = getDocDetailUniversalSectionGroupLabel(isZhContent, 'sidebar')
  const FeatureIcon = getDocDetailFeatureIcon()
  const universalSections = filterDocDetailSectionsByIds(sections, universalSectionIds)
  const platformSections = filterDocDetailSectionsByIds(
    sections,
    platformSectionIds.length > 0 ? platformSectionIds : sections.map((section) => section.id),
  )

  const navRef = useRef(null)
  const [accentTop, setAccentTop] = useState(4)

  useLayoutEffect(() => {
    if (!showRail) return undefined

    const updateAccent = () => {
      const nav = navRef.current
      if (!nav) return
      const currentBtn =
        nav.querySelector('.docs-detail-sidebar-group.is-current .docs-detail-sidebar-platform')
        || nav.querySelector('.docs-detail-sidebar-group.is-expanded .docs-detail-sidebar-platform')
      if (!currentBtn) return
      const navTop = nav.getBoundingClientRect().top
      const btnRect = currentBtn.getBoundingClientRect()
      const offset = btnRect.top - navTop + Math.max(0, (btnRect.height - RAIL_ACCENT_HEIGHT) / 2)
      setAccentTop(offset)
    }

    updateAccent()
    window.addEventListener('resize', updateAccent)
    return () => window.removeEventListener('resize', updateAccent)
  }, [
    showRail,
    expandedPlatformId,
    activePlatformId,
    activeSectionId,
    contentViewMode,
    platforms,
    universalSectionIds,
    platformSectionIds,
    isZhContent,
  ])

  const renderSectionButtons = (platformId, sectionList) =>
    sectionList.map((section) => {
      const isUniversalScope = platformId === ''
      const isSectionActive = isUniversalScope
        ? isDocDetailCommonScopeId(activePlatformId)
          && contentViewMode === 'section-detail'
          && activeSectionId === section.id
        : activePlatformId === platformId
          && contentViewMode === 'section-detail'
          && activeSectionId === section.id

      return (
        <button
          key={`doc-toc-section-${platformId || 'feature'}-${section.id}`}
          type="button"
          className={`docs-detail-sidebar-section${isSectionActive ? ' is-active' : ''}`}
          onClick={() => onSectionClick(platformId, section.id)}
        >
          {section.label}
        </button>
      )
    })

  const renderPlatformLeading = (label, Icon) => (
    <span className="docs-detail-sidebar-platform-main">
      <span className="docs-detail-sidebar-platform-leading">
        {showPlatformIcons && Icon ? (
          <span className="docs-detail-sidebar-platform-icon" aria-hidden="true">
            <Icon size={13} strokeWidth={1.85} />
          </span>
        ) : null}
        <span className="docs-detail-sidebar-platform-label">{label}</span>
      </span>
      <PlatformChevron
        size={chevronSize}
        className="docs-detail-sidebar-platform-chevron"
        aria-hidden="true"
      />
    </span>
  )

  const renderFeatureGroup = (sectionList, { expandable = true } = {}) => {
    const isFeatureExpanded = expandedPlatformId === DOC_DETAIL_COMMON_SCOPE_SLUG
      || expandedPlatformId === DOC_DETAIL_FEATURE_SCOPE_ID
    const isFeatureActive =
      isDocDetailCommonScopeId(activePlatformId) && contentViewMode === 'section-detail'

    return (
      <div
        className={`docs-detail-sidebar-group${isFeatureExpanded ? ' is-expanded' : ''}${
          isFeatureActive ? ' is-current' : ''
        }`}
      >
        {expandable ? (
          <button
            type="button"
            className={`docs-detail-sidebar-platform docs-detail-sidebar-platform--feature${
              isFeatureActive ? ' is-active' : ''
            }${isFeatureExpanded ? ' is-expanded' : ''}`}
            aria-expanded={isFeatureExpanded}
            onClick={() => onPlatformToggle(DOC_DETAIL_FEATURE_SCOPE_ID)}
          >
            {renderPlatformLeading(platformLessGroupLabel, FeatureIcon)}
          </button>
        ) : (
          <div
            className={`docs-detail-sidebar-platform docs-detail-sidebar-platform--feature docs-detail-sidebar-platform--static${
              isFeatureActive ? ' is-active' : ''
            }`}
          >
            {renderPlatformLeading(platformLessGroupLabel, FeatureIcon)}
          </div>
        )}
        {isFeatureExpanded ? (
          <div className="docs-detail-sidebar-sections">
            {renderSectionButtons('', sectionList)}
          </div>
        ) : null}
      </div>
    )
  }

  const renderPlatformGroup = (platform, sectionList) => {
    const isExpanded =
      Boolean(expandedPlatformId) && expandedPlatformId === platform.id
    const isPlatformActive =
      activePlatformId === platform.id && contentViewMode === 'section-detail'
    const PlatformIcon = getDocDetailPlatformIcon(platform.id)

    return (
      <div
        key={`doc-toc-platform-${platform.id}`}
        className={`docs-detail-sidebar-group${isExpanded ? ' is-expanded' : ''}${
          isPlatformActive ? ' is-current' : ''
        }`}
      >
        <button
          type="button"
          className={`docs-detail-sidebar-platform${isPlatformActive ? ' is-active' : ''}${
            isExpanded ? ' is-expanded' : ''
          }`}
          aria-expanded={isExpanded}
          onClick={() => onPlatformToggle(platform.id)}
        >
          {renderPlatformLeading(platform.label, PlatformIcon)}
        </button>
        {isExpanded ? (
          <div className="docs-detail-sidebar-sections">
            {renderSectionButtons(platform.id, sectionList)}
          </div>
        ) : null}
      </div>
    )
  }

  const CloseIcon = drawerCloseSide === 'right' ? ChevronRight : ChevronLeft
  const showSidebarHead = !embedded || Boolean(onDrawerClose)
  const sidebarHeadTitle = onDrawerClose ? drawerHeadTitle || sidebarTitle : sidebarTitle

  const navBody = (
    <>
      {isPlatformLess ? (
        renderFeatureGroup(sections)
      ) : isHybrid ? (
        <>
          {renderFeatureGroup(universalSections)}
          {platforms.map((platform) => renderPlatformGroup(platform, platformSections))}
        </>
      ) : (
        platforms.map((platform) => renderPlatformGroup(platform, sections))
      )}
    </>
  )

  return (
    <aside
      className={`docs-detail-sidebar${embedded ? ' docs-detail-sidebar--embedded' : ''}${
        isPopover ? ' docs-detail-sidebar--popover' : ''
      }`}
      aria-label={sidebarHeadTitle}
    >
      {showSidebarHead ? (
        <div
          className={`docs-center-sidebar-heading${
            onDrawerClose ? ' has-drawer-close has-drawer-close--leading' : ''
          }${!onDrawerClose ? ' docs-detail-sidebar-head' : ''}`}
        >
          {onDrawerClose ? (
            <button
              type="button"
              className="docs-detail-mobile-drawer-close docs-center-sidebar-drawer-close"
              aria-label={drawerCloseLabel || sidebarHeadTitle}
              title={drawerCloseLabel || sidebarHeadTitle}
              onClick={onDrawerClose}
            >
              <CloseIcon size={16} strokeWidth={2.25} aria-hidden="true" />
            </button>
          ) : null}
          <h3>{sidebarHeadTitle}</h3>
        </div>
      ) : null}
      <nav ref={navRef} className="docs-detail-sidebar-nav" aria-label={sidebarHeadTitle}>
        {showRail ? (
          <>
            <div className="docs-detail-sidebar-rail" aria-hidden="true">
              <div className="docs-detail-sidebar-rail-track" />
              <div
                className="docs-detail-sidebar-rail-accent"
                style={{ top: `${accentTop}px` }}
              />
            </div>
            <div className="docs-detail-sidebar-nav-content">{navBody}</div>
          </>
        ) : (
          navBody
        )}
      </nav>
    </aside>
  )
}
