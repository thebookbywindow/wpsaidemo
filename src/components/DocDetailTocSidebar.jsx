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
  onPlatformClick,
  onSectionClick,
  platforms = getDocDetailPlatforms(),
}) {
  const sections = getDocDetailTocSections(isZhContent)

  return (
    <aside className="docs-detail-sidebar" aria-label={sidebarTitle}>
      <div className="docs-detail-sidebar-head">
        <h3>{sidebarTitle}</h3>
      </div>
      <nav className="docs-detail-sidebar-nav">
        {platforms.map((platform) => {
          const isExpanded =
            Boolean(expandedPlatformId) && expandedPlatformId === platform.id
          const isPlatformActive =
            activePlatformId === platform.id && contentViewMode !== 'doc-catalog-index'
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
                onClick={() => onPlatformClick(platform.id)}
              >
                <span className="docs-detail-sidebar-platform-main">
                  <span className="docs-detail-sidebar-platform-icon" aria-hidden="true">
                    <PlatformIcon size={13} strokeWidth={1.85} />
                  </span>
                  <span>{platform.label}</span>
                </span>
                <ChevronRight
                  size={13}
                  className="docs-detail-sidebar-platform-chevron"
                  aria-hidden="true"
                />
              </button>
              {isExpanded ? (
                <div className="docs-detail-sidebar-sections">
                  {sections.map((section) => {
                    const isSectionActive =
                      activePlatformId === platform.id
                      && contentViewMode === 'section-detail'
                      && activeSectionId === section.id

                    return (
                      <button
                        key={`doc-toc-section-${platform.id}-${section.id}`}
                        type="button"
                        className={`docs-detail-sidebar-section${
                          isSectionActive ? ' is-active' : ''
                        }`}
                        onClick={() => onSectionClick(platform.id, section.id)}
                      >
                        {section.label}
                      </button>
                    )
                  })}
                </div>
              ) : null}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}
