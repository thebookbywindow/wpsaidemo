import { useMemo } from 'react'
import { flattenDocDetailCatalogSectionColumns } from '../data/docDetailTocData'

export default function DocDetailCatalogSectionGrid({
  platformId = '',
  sectionColumns,
  onSectionClick,
}) {
  const sections = useMemo(
    () => flattenDocDetailCatalogSectionColumns(sectionColumns),
    [sectionColumns],
  )

  return (
    <div className="docs-detail-catalog-sections-wrap">
      <div className="docs-detail-catalog-sections-grid">
        {sections.map((section) => (
          <button
            key={`doc-catalog-${platformId || 'feature'}-${section.id}`}
            type="button"
            className="docs-detail-section-link"
            onClick={() => onSectionClick(platformId, section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  )
}
