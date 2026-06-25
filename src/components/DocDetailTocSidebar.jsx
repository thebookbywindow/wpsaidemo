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
  onPlatformNavigate,
  onSectionAnchorClick,
  onFeatureTitleClick,
  platforms = getDocDetailPlatforms(),
  embedded = false,
}) {
  const sections = getDocDetailTocSections(isZhContent)
  const isPlatformLess = platforms.length === 0
  const showStructuredNav =
    contentViewMode === 'article-detail' || contentViewMode === 'platform-detail'

  const renderSectionButtons = (platformId) =>
    sections.map((section) => {
      const isSectionActive = isPlatformLess
        ? showStructuredNav && activeSectionId === section.id
        : activePlatformId === platformId
          && contentViewMode === 'platform-detail'
          && activeSectionId === section.id

      return (
        <button
          key={`doc-toc-section-${platformId || 'feature'}-${section.id}`}
          type="button"
          className={`docs-detail-sidebar-section${isSectionActive ? ' is-active' : ''}`}
          onClick={() => onSectionAnchorClick(platformId, section.id)}
        >
          {section.label}
        </button>
      )
    })

  const handleFeatureTitleClick = () => {
    onFeatureTitleClick?.()
  }

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
            <button
              type="button"
              className={`docs-detail-sidebar-platform docs-detail-sidebar-platform--feature${
                showStructuredNav ? ' is-active' : ''
              }`}
              aria-expanded
              onClick={handleFeatureTitleClick}
            >
              <span className="docs-detail-sidebar-platform-main">
                <span className="docs-detail-sidebar-platform-label">{sidebarTitle}</span>
              </span>
            </button>
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
              activePlatformId === platform.id && contentViewMode === 'platform-detail'
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
                  onClick={() => onPlatformNavigate(platform.id)}
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
