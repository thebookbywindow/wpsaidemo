import { ChevronRight } from 'lucide-react'
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

export function DocDetailDocCatalogIndex({
  docTitle = '',
  docSummary = '',
  isZhContent,
  onPlatformClick,
  platforms,
}) {
  return (
    <div className="docs-detail-index-page">
      <header className="docs-detail-index-header">
        <h2>{docTitle}</h2>
        <div className="docs-detail-index-header-body">
          {docSummary ? <p>{docSummary}</p> : null}
          <DocDetailIndexVideoPlaceholder isZhContent={isZhContent} title={docTitle} />
        </div>
      </header>
      <section className="docs-detail-catalog-platform-section" aria-labelledby="docs-detail-platform-picker-title">
        <h3 id="docs-detail-platform-picker-title" className="docs-detail-catalog-platform-heading">
          {isZhContent ? '选择平台' : 'Select platform'}
        </h3>
        <ul className="docs-detail-catalog-platform-grid" role="list">
          {platforms.map((platform) => {
            const PlatformIcon = getDocDetailPlatformIcon(platform.id)

            return (
              <li key={`doc-catalog-${platform.id}`} className="docs-detail-catalog-platform-item">
                <div
                  role="link"
                  tabIndex={0}
                  className="docs-detail-catalog-platform-tile"
                  onClick={() => onPlatformClick(platform.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      onPlatformClick(platform.id)
                    }
                  }}
                >
                  <span className="docs-detail-catalog-platform-icon" aria-hidden="true">
                    <PlatformIcon size={18} strokeWidth={1.85} />
                  </span>
                  <span className="docs-detail-catalog-platform-name">{platform.label}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}

export default function DocDetailArticleBreadcrumb({
  docDisplayParts,
  rootLabel = '',
  platformLabel,
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
        && contentViewMode === 'platform-detail',
      onClick: onDocClick,
    })
  })

  if (platformLabel && contentViewMode === 'platform-detail') {
    items.push({
      key: `platform-${platformLabel}`,
      label: platformLabel,
      clickable: false,
    })
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

