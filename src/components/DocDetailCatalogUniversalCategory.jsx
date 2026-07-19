import { useId, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import DocDetailCatalogSectionGrid from './DocDetailCatalogSectionGrid'

export default function DocDetailCatalogUniversalCategory({
  groupLabel,
  sectionColumns,
  onSectionClick,
  platformId = '',
  headingId,
  defaultExpanded = true,
  collapsible = true,
}) {
  const bodyId = useId()
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const resolvedHeadingId =
    headingId
    ?? (platformId ? `doc-catalog-platform-${platformId}` : 'doc-catalog-platform-feature')

  return (
    <section
      className={`docs-detail-catalog-platform-category${
        collapsible && !isExpanded ? ' is-collapsed' : ''
      }`}
      aria-labelledby={resolvedHeadingId}
    >
      {collapsible ? (
        <button
          type="button"
          className="docs-detail-catalog-platform-category-title-btn"
          aria-expanded={isExpanded}
          aria-controls={bodyId}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          <span id={resolvedHeadingId} className="docs-detail-catalog-platform-category-title">
            {groupLabel}
          </span>
          {isExpanded ? (
            <ChevronUp
              size={16}
              strokeWidth={2}
              className="docs-detail-catalog-platform-category-collapse-icon"
              aria-hidden="true"
            />
          ) : (
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="docs-detail-catalog-platform-category-collapse-icon"
              aria-hidden="true"
            />
          )}
        </button>
      ) : (
        <h4 id={resolvedHeadingId} className="docs-detail-catalog-platform-category-title">
          {groupLabel}
        </h4>
      )}

      {isExpanded ? (
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
