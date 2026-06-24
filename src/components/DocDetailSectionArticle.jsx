import DocDetailIndexVideoPlaceholder from './DocDetailIndexVideoPlaceholder'
import DocDetailSectionShareButton from './DocDetailSectionShareButton'
import { getDocDetailUpdatedLabel } from '../utils/docDetailSectionContent'

export default function DocDetailSectionArticle({
  sectionLabel,
  sectionBodyHtml,
  fallbackNoticeHtml = '',
  isZhContent,
  updatedAt = '',
}) {
  const updatedLabel = getDocDetailUpdatedLabel(isZhContent)

  return (
    <article className="docs-detail-section-article">
      {fallbackNoticeHtml ? (
        <div dangerouslySetInnerHTML={{ __html: fallbackNoticeHtml }} />
      ) : null}
      <header className="docs-detail-section-article-header">
        <h2>{sectionLabel}</h2>
        <div className="docs-detail-section-article-meta">
          {updatedAt ? (
            <p className="docs-detail-section-article-updated">
              <span className="docs-detail-section-article-updated-label">{updatedLabel}</span>
              <time dateTime={updatedAt}>{updatedAt}</time>
            </p>
          ) : (
            <span className="docs-detail-section-article-updated" aria-hidden="true" />
          )}
          <DocDetailSectionShareButton isZhContent={isZhContent} title={sectionLabel} />
        </div>
        <div className="docs-detail-section-article-video">
          <DocDetailIndexVideoPlaceholder isZhContent={isZhContent} title={sectionLabel} />
        </div>
      </header>
      <div
        className="docs-detail-section-article-body"
        dangerouslySetInnerHTML={{ __html: sectionBodyHtml }}
      />
    </article>
  )
}
