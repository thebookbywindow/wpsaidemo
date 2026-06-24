import { ChevronRight } from 'lucide-react'
import { getDocDetailTocSections } from '../data/docDetailTocData'
import { getDocDetailSectionLabel } from '../utils/docDetailSectionContent'
import { getDocDetailPlatformIcon } from '../utils/docDetailPlatformIcons'
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

export function DocDetailDocCatalogIndex({ docTitle = '', docSummary = '', isZhContent, onSectionClick, platforms }) {
  const sections = getDocDetailTocSections(isZhContent)

  return (
    <div className="docs-detail-index-page">
      <header className="docs-detail-index-header">
        <h2>{docTitle}</h2>
        <div className="docs-detail-index-header-body">
          {docSummary ? <p>{docSummary}</p> : null}
          <DocDetailIndexVideoPlaceholder isZhContent={isZhContent} title={docTitle} />
        </div>
      </header>
      <div className="docs-detail-catalog-platform-rows">
        {platforms.map((platform) => {
          const PlatformIcon = getDocDetailPlatformIcon(platform.id)

          return (
          <section key={`doc-catalog-${platform.id}`} className="docs-detail-catalog-platform-row">
            <span className="docs-detail-catalog-platform-icon" aria-hidden="true">
              <PlatformIcon size={14} strokeWidth={1.85} />
            </span>
            <h3 className="docs-detail-catalog-platform-name">{platform.label}</h3>
            <div className="docs-detail-catalog-sections-grid">
              {sections.map((section) => (
                <button
                  key={`doc-catalog-${platform.id}-${section.id}`}
                  type="button"
                  className="docs-detail-section-link"
                  onClick={() => onSectionClick(platform.id, section.id)}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </section>
          )
        })}
      </div>
    </div>
  )
}

export default function DocDetailArticleBreadcrumb({
  docDisplayParts,
  rootLabel = '',
  platformLabel,
  activeSectionId,
  docLanguage,
  contentViewMode,
  onPlatformClick,
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

  if (platformLabel && contentViewMode !== 'doc-catalog-index') {
    items.push({
      key: `platform-${platformLabel}`,
      label: platformLabel,
      clickable: contentViewMode === 'section-detail',
      onClick: onPlatformClick,
    })
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

export function DocDetailPlatformSectionIndex({
  platformLabel,
  isZhContent,
  onSectionClick,
}) {
  const sections = getDocDetailTocSections(isZhContent)
  const indexTitle = isZhContent ? `${platformLabel} 文档目录` : `${platformLabel} documentation`

  return (
    <div className="docs-detail-index-page">
      <header className="docs-detail-index-header">
        <h2>{indexTitle}</h2>
      </header>
      <ul className="docs-detail-section-list">
        {sections.map((section) => (
          <li key={`platform-index-${section.id}`}>
            <button
              type="button"
              className="docs-detail-section-link"
              onClick={() => onSectionClick(section.id)}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
