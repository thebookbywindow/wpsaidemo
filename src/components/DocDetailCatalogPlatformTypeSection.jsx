import { useDocDetailFlatPlatformCatalog } from '../hooks/useDocDetailPlatformCatalogGroups'
import DocDetailCatalogUniversalCategory from './DocDetailCatalogUniversalCategory'

export default function DocDetailCatalogPlatformTypeSection({
  platforms,
  platformSectionColumns,
  isZhContent,
  onSectionClick,
  universalGroupLabel = '',
  universalSectionColumns = null,
}) {
  const catalogPlatforms = useDocDetailFlatPlatformCatalog(platforms, isZhContent)
  const showUniversalCategory = Boolean(universalGroupLabel && universalSectionColumns)

  if (!catalogPlatforms.length && !showUniversalCategory) {
    return null
  }

  return (
    <div className="docs-detail-catalog-platform-type">
      {showUniversalCategory ? (
        <DocDetailCatalogUniversalCategory
          groupLabel={universalGroupLabel}
          sectionColumns={universalSectionColumns}
          onSectionClick={onSectionClick}
        />
      ) : null}
      {catalogPlatforms.map((platform) => (
        <DocDetailCatalogUniversalCategory
          key={`doc-catalog-${platform.catalogId}`}
          groupLabel={platform.label}
          platformId={platform.routeId}
          headingId={`doc-catalog-platform-${platform.catalogId}`}
          sectionColumns={platformSectionColumns}
          onSectionClick={onSectionClick}
        />
      ))}
    </div>
  )
}
