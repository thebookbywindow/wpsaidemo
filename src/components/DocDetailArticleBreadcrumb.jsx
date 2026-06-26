import { ChevronRight } from 'lucide-react'
import { getDocDetailCatalogSectionColumnsForIds, getDocDetailUniversalSectionGroupLabel, isDocDetailCommonScopeId } from '../data/docDetailTocData'
import { getDocDetailSectionLabel } from '../utils/docDetailSectionContent'
import { getDocDetailFeatureIcon, getDocDetailPlatformIcon } from '../utils/docDetailPlatformIcons'
import { hasDocDetailIndexVideo } from '../utils/docDetailIndexVideo'
import DocDetailIndexVideoPlaceholder from './DocDetailIndexVideoPlaceholder'

function getBreadcrumbDocParts(docDisplayParts = []) {
  if (docDisplayParts.length >= 3) {
    return [docDisplayParts[docDisplayParts.length - 1]]
  }

  return docDisplayParts.slice(1)
}

export function getDocDetailDisplayTitle(docDisplayParts = []) {
  const breadcrumbParts = getBreadcrumbDocParts(docDisplayParts)
  if (breadcrumbParts.length > 0) {
    return breadcrumbParts[breadcrumbParts.length - 1]
  }

  return docDisplayParts[docDisplayParts.length - 1] ?? ''
}

export function DocDetailDocCatalogIndex({
  docTitle = '',
  docSummary = '',
  isZhContent,
  onSectionClick,
  platforms,
  routeSlug = '',
  universalSectionIds = [],
  platformSectionIds = [],
}) {
  const isPlatformLess = platforms.length === 0
  const hasUniversalSections = universalSectionIds.length > 0 && !isPlatformLess
  const FeatureIcon = getDocDetailFeatureIcon()
  const universalGroupLabel = getDocDetailUniversalSectionGroupLabel(isZhContent, 'catalog')
  const hasIndexVideo = hasDocDetailIndexVideo(routeSlug)
  const universalSectionColumns = getDocDetailCatalogSectionColumnsForIds(
    isZhContent,
    universalSectionIds,
  )
  const platformSectionColumns = getDocDetailCatalogSectionColumnsForIds(
    isZhContent,
    platformSectionIds.length > 0 ? platformSectionIds : undefined,
  )
  const defaultSectionColumns = getDocDetailCatalogSectionColumnsForIds(isZhContent)

  const renderSectionGrid = (platformId, sectionColumns = defaultSectionColumns) => (
    <div className="docs-detail-catalog-sections-grid">
      {sectionColumns.map((columnSections, columnIndex) => (
        <div
          key={`doc-catalog-${platformId || 'feature'}-col-${columnIndex}`}
          className="docs-detail-catalog-sections-column"
        >
          {columnSections.map((section) => (
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
      ))}
    </div>
  )

  return (
    <div className="docs-detail-index-page">
      <header className="docs-detail-index-header">
        <h2>{docTitle}</h2>
        <div
          className={`docs-detail-index-header-body${
            hasIndexVideo ? '' : ' docs-detail-index-header-body--no-video'
          }`}
        >
          {docSummary ? <p>{docSummary}</p> : null}
          <DocDetailIndexVideoPlaceholder
            isZhContent={isZhContent}
            title={docTitle}
            enabled={hasIndexVideo}
          />
        </div>
      </header>
      <div className="docs-detail-catalog-platform-rows">
        {isPlatformLess ? (
          <section
            className="docs-detail-catalog-platform-row docs-detail-catalog-platform-row--feature"
            aria-labelledby="doc-catalog-platform-feature"
          >
            <span className="docs-detail-catalog-platform-icon" aria-hidden="true">
              <FeatureIcon size={14} strokeWidth={1.85} />
            </span>
            <h3
              id="doc-catalog-platform-feature"
              className="docs-detail-catalog-platform-name docs-detail-catalog-platform-name--feature"
            >
              {universalGroupLabel}
            </h3>
            {renderSectionGrid('')}
          </section>
        ) : (
          <>
            {hasUniversalSections ? (
              <section
                className="docs-detail-catalog-platform-row docs-detail-catalog-platform-row--feature"
                aria-labelledby="doc-catalog-platform-feature"
              >
                <span className="docs-detail-catalog-platform-icon" aria-hidden="true">
                  <FeatureIcon size={14} strokeWidth={1.85} />
                </span>
                <h3
                  id="doc-catalog-platform-feature"
                  className="docs-detail-catalog-platform-name docs-detail-catalog-platform-name--feature"
                >
                  {universalGroupLabel}
                </h3>
                {renderSectionGrid('', universalSectionColumns)}
              </section>
            ) : null}
            {platforms.map((platform) => {
              const PlatformIcon = getDocDetailPlatformIcon(platform.id)

              return (
                <section
                  key={`doc-catalog-${platform.id}`}
                  className="docs-detail-catalog-platform-row"
                  aria-labelledby={`doc-catalog-platform-${platform.id}`}
                >
                  <span className="docs-detail-catalog-platform-icon" aria-hidden="true">
                    <PlatformIcon size={14} strokeWidth={1.85} />
                  </span>
                  <h3 id={`doc-catalog-platform-${platform.id}`} className="docs-detail-catalog-platform-name">
                    {platform.label}
                  </h3>
                  {renderSectionGrid(platform.id, platformSectionColumns)}
                </section>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default function DocDetailArticleBreadcrumb({
  docDisplayParts,
  rootLabel = '',
  platformLabel,
  generalScopeLabel = '',
  scopePlatformId = '',
  activeSectionId,
  docLanguage,
  contentViewMode,
  onRootClick,
  onDocClick,
  ariaLabel,
}) {
  const items = []

  if (rootLabel) {
    items.push({
      key: 'docs-center-root',
      label: rootLabel,
      clickable: Boolean(onRootClick),
      onClick: onRootClick,
    })
  }

  const breadcrumbDocParts = getBreadcrumbDocParts(docDisplayParts)

  breadcrumbDocParts.forEach((label, trailIndex) => {
    const isLastDocPart = trailIndex === breadcrumbDocParts.length - 1

    items.push({
      key: `doc-${label}-${trailIndex}`,
      label,
      clickable:
        isLastDocPart
        && Boolean(onDocClick)
        && contentViewMode !== 'doc-catalog-index',
      onClick: onDocClick,
    })
  })

  if (contentViewMode === 'section-detail') {
    if (platformLabel) {
      items.push({
        key: `platform-${platformLabel}`,
        label: platformLabel,
        clickable: false,
      })
    } else if (isDocDetailCommonScopeId(scopePlatformId) && generalScopeLabel) {
      items.push({
        key: 'general-scope',
        label: generalScopeLabel,
        clickable: false,
      })
    }
  }

  if (contentViewMode === 'section-detail') {
    const sectionLabel = getDocDetailSectionLabel(activeSectionId, docLanguage)
    if (sectionLabel) {
      items.push({
        key: `section-${activeSectionId}`,
        label: sectionLabel,
        clickable: false,
      })
    }
  }

  return (
    <nav className="docs-detail-breadcrumb" aria-label={ariaLabel}>
      {items.map((item, index) => (
        <span key={item.key} className="docs-detail-breadcrumb-item">
          {index > 0 ? (
            <ChevronRight size={14} className="docs-detail-breadcrumb-sep" aria-hidden="true" />
          ) : null}
          {item.clickable ? (
            <button type="button" className="docs-detail-breadcrumb-link" onClick={item.onClick}>
              {item.label}
            </button>
          ) : (
            <span className={index === items.length - 1 ? 'docs-detail-breadcrumb-current' : ''}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}

