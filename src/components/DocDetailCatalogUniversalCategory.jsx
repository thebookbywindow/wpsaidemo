import DocDetailCatalogSectionGrid from './DocDetailCatalogSectionGrid'

export default function DocDetailCatalogUniversalCategory({
  groupLabel,
  sectionColumns,
  onSectionClick,
  platformId = '',
  headingId,
}) {
  const resolvedHeadingId =
    headingId
    ?? (platformId ? `doc-catalog-platform-${platformId}` : 'doc-catalog-platform-feature')

  return (
    <section
      className="docs-detail-catalog-platform-category"
      aria-labelledby={resolvedHeadingId}
    >
      <h4 id={resolvedHeadingId} className="docs-detail-catalog-platform-category-title">
        {groupLabel}
      </h4>
      <div className="docs-detail-catalog-platform-category-body">
        <DocDetailCatalogSectionGrid
          platformId={platformId}
          sectionColumns={sectionColumns}
          onSectionClick={onSectionClick}
        />
      </div>
    </section>
  )
}
