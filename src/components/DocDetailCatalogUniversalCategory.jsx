import { useId, useState, useSyncExternalStore } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import DocDetailCatalogSectionGrid from './DocDetailCatalogSectionGrid'
import { DOCS_CENTER_CATALOG_COMPACT_MEDIA_QUERY } from '../constants/docsCenterLayout'
import { DOC_DETAIL_PLATFORM_ICON_MAP } from '../utils/docDetailPlatformIcons'

function CatalogPlatformHeadingIcon({ platformId }) {
  const Icon = DOC_DETAIL_PLATFORM_ICON_MAP[platformId]
  if (!Icon) {
    return null
  }

  return (
    <span className="docs-detail-catalog-platform-icon" aria-hidden="true">
      <Icon size={18} strokeWidth={1.75} />
    </span>
  )
}

function subscribeCatalogCompact(onStoreChange) {
  const mediaQuery = window.matchMedia(DOCS_CENTER_CATALOG_COMPACT_MEDIA_QUERY)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getCatalogCompactSnapshot() {
  return window.matchMedia(DOCS_CENTER_CATALOG_COMPACT_MEDIA_QUERY).matches
}

function getCatalogCompactServerSnapshot() {
  return false
}

export default function DocDetailCatalogUniversalCategory({
  groupLabel,
  sectionColumns,
  onSectionClick,
  platformId = '',
  headingId,
  defaultExpanded = true,
  collapsible,
}) {
  const bodyId = useId()
  const isMobile = useSyncExternalStore(
    subscribeCatalogCompact,
    getCatalogCompactSnapshot,
    getCatalogCompactServerSnapshot,
  )
  // 对齐官网：仅移动端可折叠；PC 始终展开
  const canCollapse = collapsible ?? isMobile
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const [collapseSeen, setCollapseSeen] = useState(canCollapse)
  if (collapseSeen !== canCollapse) {
    setCollapseSeen(canCollapse)
    if (!canCollapse) {
      setIsExpanded(true)
    }
  }
  const showExpanded = !canCollapse || isExpanded
  const resolvedHeadingId =
    headingId
    ?? (platformId ? `doc-catalog-platform-${platformId}` : 'doc-catalog-platform-feature')

  const titleContent = (
    <span className="docs-detail-catalog-platform-heading-main">
      {platformId ? <CatalogPlatformHeadingIcon platformId={platformId} /> : null}
      <span id={resolvedHeadingId} className="docs-detail-catalog-platform-category-title">
        {groupLabel}
      </span>
    </span>
  )

  return (
    <section
      className={`docs-detail-catalog-platform-category${
        canCollapse && !isExpanded ? ' is-collapsed' : ''
      }`}
      aria-labelledby={resolvedHeadingId}
    >
      {canCollapse ? (
        <button
          type="button"
          className="docs-detail-catalog-platform-category-title-btn"
          aria-expanded={isExpanded}
          aria-controls={bodyId}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          {titleContent}
          {isExpanded ? (
            <ChevronUp
              size={16}
              strokeWidth={1.5}
              className="docs-detail-catalog-platform-category-collapse-icon"
              aria-hidden="true"
            />
          ) : (
            <ChevronDown
              size={16}
              strokeWidth={1.5}
              className="docs-detail-catalog-platform-category-collapse-icon"
              aria-hidden="true"
            />
          )}
        </button>
      ) : (
        <div className="docs-detail-catalog-platform-category-title-static">
          {titleContent}
        </div>
      )}

      {showExpanded ? (
        <div id={bodyId} className="docs-detail-catalog-platform-category-body">
          <DocDetailCatalogSectionGrid
            platformId={platformId}
            sectionColumns={sectionColumns}
            onSectionClick={onSectionClick}
          />
        </div>
      ) : null}
    </section>
  )
}
