import { ChevronRight } from 'lucide-react'
import {
  getDocDetailPlatforms,
  getDocDetailTocSections,
} from '../data/docDetailTocData'
import { getDocDetailPlatformIcon } from '../utils/docDetailPlatformIcons'

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
  embedded = false,
}) {
  const sections = getDocDetailTocSections(isZhContent)
  const isPlatformLess = platforms.length === 0
  const showStructuredNav = contentViewMode === 'section-detail'
  const platformLessGroupLabel = isZhContent ? '本功能' : 'On this feature'

  const renderSectionButtons = (platformId) =>
    sections.map((section) => {
      const isSectionActive = isPlatformLess
        ? contentViewMode === 'section-detail' && activeSectionId === section.id
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

  return (
    <aside
      className={`docs-detail-sidebar${embedded ? ' docs-detail-sidebar--embedded' : ''}`}
      aria-label={sidebarTitle}
    >
      {!embedded ? (
        <div className="docs-detail-sidebar-head">
          <h3>{sidebarTitle}</h3>
        </div>
      ) : null}
      <nav className="docs-detail-sidebar-nav">
        {isPlatformLess ? (
          <div className="docs-detail-sidebar-group is-expanded">
            <div
              className={`docs-detail-sidebar-platform docs-detail-sidebar-platform--feature docs-detail-sidebar-platform--static${
                showStructuredNav ? ' is-active' : ''
              }`}
            >
              <span className="docs-detail-sidebar-platform-main">
                <span className="docs-detail-sidebar-platform-label">{platformLessGroupLabel}</span>
              </span>
            </div>
            {showStructuredNav ? (
              <div className="docs-detail-sidebar-sections">
                {renderSectionButtons('')}
              </div>
            ) : null}
          </div>
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
                    {renderSectionButtons(platform.id)}
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
