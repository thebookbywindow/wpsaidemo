import { ChevronLeft, ChevronRight } from 'lucide-react'
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
}) {
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

  const renderFeatureGroup = (sectionList, { expandable = true } = {}) => {
    const isFeatureExpanded = expandedPlatformId === DOC_DETAIL_COMMON_SCOPE_SLUG
      || expandedPlatformId === DOC_DETAIL_FEATURE_SCOPE_ID
    const isFeatureActive =
      isDocDetailCommonScopeId(activePlatformId) && contentViewMode === 'section-detail'

    return (
      <div
        className={`docs-detail-sidebar-group${isFeatureExpanded ? ' is-expanded' : ''}`}
      >
        {expandable ? (
          <button
            type="button"
            className={`docs-detail-sidebar-platform docs-detail-sidebar-platform--feature${
              isFeatureActive ? ' is-active' : ''
            }`}
            aria-expanded={isFeatureExpanded}
            onClick={() => onPlatformToggle(DOC_DETAIL_FEATURE_SCOPE_ID)}
          >
            <span className="docs-detail-sidebar-platform-main">
              <span className="docs-detail-sidebar-platform-icon" aria-hidden="true">
                <FeatureIcon size={13} strokeWidth={1.85} />
              </span>
              <span className="docs-detail-sidebar-platform-label">{platformLessGroupLabel}</span>
            </span>
            <ChevronRight
              size={13}
              className="docs-detail-sidebar-platform-chevron"
              aria-hidden="true"
            />
          </button>
        ) : (
          <div
            className={`docs-detail-sidebar-platform docs-detail-sidebar-platform--feature docs-detail-sidebar-platform--static${
              isFeatureActive ? ' is-active' : ''
            }`}
          >
            <span className="docs-detail-sidebar-platform-main">
              <span className="docs-detail-sidebar-platform-icon" aria-hidden="true">
                <FeatureIcon size={13} strokeWidth={1.85} />
              </span>
              <span className="docs-detail-sidebar-platform-label">{platformLessGroupLabel}</span>
            </span>
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

  const CloseIcon = drawerCloseSide === 'right' ? ChevronRight : ChevronLeft
  const showSidebarHead = !embedded || Boolean(onDrawerClose)
  const sidebarHeadTitle = onDrawerClose ? drawerHeadTitle || sidebarTitle : sidebarTitle

  return (
    <aside
      className={`docs-detail-sidebar${embedded ? ' docs-detail-sidebar--embedded' : ''}`}
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
      <nav className="docs-detail-sidebar-nav">
        {isPlatformLess ? (
          renderFeatureGroup(sections)
        ) : isHybrid ? (
          <>
            {renderFeatureGroup(universalSections)}
            {platforms.map((platform) => {
              const isExpanded =
                Boolean(expandedPlatformId) && expandedPlatformId === platform.id
              const isPlatformActive =
                activePlatformId === platform.id && contentViewMode === 'section-detail'
              const PlatformIcon = getDocDetailPlatformIcon(platform.id)

              return (
                <div
                  key={`doc-toc-platform-${platform.id}`}
                  className={`docs-detail-sidebar-group${isExpanded ? ' is-expanded' : ''}`}
                >
                  <button
                    type="button"
                    className={`docs-detail-sidebar-platform${isPlatformActive ? ' is-active' : ''}`}
                    aria-expanded={isExpanded}
                    onClick={() => onPlatformToggle(platform.id)}
                  >
                    <span className="docs-detail-sidebar-platform-main">
                      <span className="docs-detail-sidebar-platform-icon" aria-hidden="true">
                        <PlatformIcon size={13} strokeWidth={1.85} />
                      </span>
                      <span className="docs-detail-sidebar-platform-label">{platform.label}</span>
                    </span>
                    <ChevronRight
                      size={13}
                      className="docs-detail-sidebar-platform-chevron"
                      aria-hidden="true"
                    />
                  </button>
                  {isExpanded ? (
                    <div className="docs-detail-sidebar-sections">
                      {renderSectionButtons(platform.id, platformSections)}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </>
        ) : (
          platforms.map((platform) => {
            const isExpanded =
              Boolean(expandedPlatformId) && expandedPlatformId === platform.id
            const isPlatformActive =
              activePlatformId === platform.id && contentViewMode === 'section-detail'
            const PlatformIcon = getDocDetailPlatformIcon(platform.id)

            return (
              <div
                key={`doc-toc-platform-${platform.id}`}
                className={`docs-detail-sidebar-group${isExpanded ? ' is-expanded' : ''}`}
              >
                <button
                  type="button"
                  className={`docs-detail-sidebar-platform${isPlatformActive ? ' is-active' : ''}`}
                  aria-expanded={isExpanded}
                  onClick={() => onPlatformToggle(platform.id)}
                >
                  <span className="docs-detail-sidebar-platform-main">
                    <span className="docs-detail-sidebar-platform-icon" aria-hidden="true">
                      <PlatformIcon size={13} strokeWidth={1.85} />
                    </span>
                    <span className="docs-detail-sidebar-platform-label">{platform.label}</span>
                  </span>
                  <ChevronRight
                    size={13}
                    className="docs-detail-sidebar-platform-chevron"
                    aria-hidden="true"
                  />
                </button>
                {isExpanded ? (
                  <div className="docs-detail-sidebar-sections">
                    {renderSectionButtons(platform.id, sections)}
                  </div>
                ) : null}
              </div>
            )
          })
        )}
      </nav>
    </aside>
  )
}
