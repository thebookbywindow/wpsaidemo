import { ChevronRight } from 'lucide-react'
import { getDocDetailCatalogSectionColumnsForIds, getDocDetailUniversalSectionGroupLabel } from '../data/docDetailTocData'
import { getDocDetailSectionLabel } from '../utils/docDetailSectionContent'
import { hasDocDetailIndexVideo } from '../utils/docDetailIndexVideo'
import DocDetailIndexVideoPlaceholder from './DocDetailIndexVideoPlaceholder'
import DocDetailCatalogUniversalCategory from './DocDetailCatalogUniversalCategory'
import DocDetailCatalogPlatformTypeSection from './DocDetailCatalogPlatformTypeSection'

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

  return (
    <div className="docs-detail-index-page">
      <header
        className={`docs-detail-index-header${hasIndexVideo ? ' has-intro' : ''}${
          docSummary ? ' has-summary' : ''
        }`}
      >
        <h1 className="docs-detail-index-title">{docTitle}</h1>
        <div
          className={`docs-detail-index-header-body${
            hasIndexVideo ? '' : ' docs-detail-index-header-body--no-video'
          }`}
        >
          {docSummary ? <p className="docs-detail-index-intro">{docSummary}</p> : null}
          <DocDetailIndexVideoPlaceholder
            isZhContent={isZhContent}
            title={docTitle}
            enabled={hasIndexVideo}
          />
        </div>
      </header>
      <div className="docs-detail-catalog-platform-rows">
        {isPlatformLess ? (
          <DocDetailCatalogUniversalCategory
            groupLabel={universalGroupLabel}
            sectionColumns={defaultSectionColumns}
            onSectionClick={onSectionClick}
          />
        ) : (
          <DocDetailCatalogPlatformTypeSection
            platforms={platforms}
            platformSectionColumns={platformSectionColumns}
            isZhContent={isZhContent}
            onSectionClick={onSectionClick}
            universalGroupLabel={hasUniversalSections ? universalGroupLabel : ''}
            universalSectionColumns={
              hasUniversalSections ? universalSectionColumns : null
            }
          />
        )}
      </div>
    </div>
  )
}

export default function DocDetailArticleBreadcrumb({
  docDisplayParts,
  rootLabel = '',
  activeSectionId,
  docLanguage,
  contentViewMode,
  onRootClick,
  onDocClick,
  ariaLabel,
  leadingAction = null,
  trailingAction = null,
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
    const sectionLabel = getDocDetailSectionLabel(activeSectionId, docLanguage)
    if (sectionLabel) {
      items.push({
        key: `section-${activeSectionId}`,
        label: sectionLabel,
        clickable: false,
      })
    }
  }

  const trailTitle = items.map((item) => item.label).join(' / ')

  return (
    <nav
      className={`docs-detail-breadcrumb${
        leadingAction ? ' docs-detail-breadcrumb--with-leading-action' : ''
      }${trailingAction ? ' docs-detail-breadcrumb--with-trailing-action' : ''}`}
      aria-label={ariaLabel}
    >
      {leadingAction ? (
        <>
          <span className="docs-detail-breadcrumb-leading">{leadingAction}</span>
          <span className="docs-detail-breadcrumb-sep docs-detail-breadcrumb-sep--leading" aria-hidden="true">
            |
          </span>
        </>
      ) : null}
      <div className="docs-detail-breadcrumb-trail" title={trailTitle}>
        <span className="docs-detail-breadcrumb-trail-inner">
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
        </span>
      </div>
      {trailingAction ? (
        <span className="docs-detail-breadcrumb-trailing">{trailingAction}</span>
      ) : null}
    </nav>
  )
}

