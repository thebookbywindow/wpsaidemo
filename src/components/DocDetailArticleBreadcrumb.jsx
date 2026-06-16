import { ChevronRight } from 'lucide-react'
import { DOC_DETAIL_TOC_PLATFORMS, getDocDetailTocSections } from '../data/docDetailTocData'
import { getDocDetailSectionLabel } from '../utils/docDetailSectionContent'

export function DocDetailDocCatalogIndex({ isZhContent, onSectionClick }) {
  const sections = getDocDetailTocSections(isZhContent)
  const title = isZhContent ? '全部端与内容板块' : 'All platforms and sections'
  const hint = isZhContent
    ? '选择端和板块，查看对应的文档内容'
    : 'Choose a platform and section to view the corresponding content'

  return (
    <div className="docs-detail-index-page">
      <header className="docs-detail-index-header">
        <h2>{title}</h2>
        <p>{hint}</p>
      </header>
      <div className="docs-detail-catalog-grid">
        {DOC_DETAIL_TOC_PLATFORMS.map((platform) => (
          <section key={`doc-catalog-${platform.id}`} className="docs-detail-catalog-card">
            <div className="docs-detail-catalog-card-head">
              <span className="docs-detail-platform-chip">{platform.label}</span>
            </div>
            <div className="docs-detail-catalog-sections">
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
        ))}
      </div>
    </div>
  )
}

export default function DocDetailArticleBreadcrumb({
  docDisplayParts,
  platformLabel,
  activeSectionId,
  docLanguage,
  contentViewMode,
  onPlatformClick,
  onRootClick,
  onDocClick,
  ariaLabel,
}) {
  const items = docDisplayParts.map((label, index) => ({
    key: `doc-${label}-${index}`,
    label,
    clickable:
      (index === 0 && Boolean(onRootClick))
      || (index === 1 && Boolean(onDocClick) && contentViewMode !== 'doc-catalog-index'),
    onClick: index === 0 ? onRootClick : onDocClick,
  }))

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
  const indexHint = isZhContent ? '请选择要查看的内容板块' : 'Choose a section to view'

  return (
    <div className="docs-detail-index-page">
      <header className="docs-detail-index-header">
        <span className="docs-detail-platform-chip docs-detail-platform-chip--large">{platformLabel}</span>
        <h2>{indexTitle}</h2>
        <p>{indexHint}</p>
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
