import DocDetailIndexVideoPlaceholder from './DocDetailIndexVideoPlaceholder'
import DocDetailSectionShareButton from './DocDetailSectionShareButton'
import { getDocDetailUpdatedLabel } from '../utils/docDetailSectionContent'

export default function DocDetailPlatformArticle({
  articleTitle = '',
  bodyHtml = '',
  fallbackNoticeHtml = '',
  isZhContent,
  updatedAt = '',
}) {
  const updatedLabel = getDocDetailUpdatedLabel(isZhContent)

  return (
    <article className="docs-detail-platform-article">
      {fallbackNoticeHtml ? (
        <div dangerouslySetInnerHTML={{ __html: fallbackNoticeHtml }} />
      ) : null}
      <header className="docs-detail-section-article-header">
        <h1 className="docs-detail-platform-article-title">{articleTitle}</h1>
        <div className="docs-detail-section-article-meta">
          {updatedAt ? (
            <p className="docs-detail-section-article-updated">
              <span className="docs-detail-section-article-updated-label">{updatedLabel}</span>
              <time dateTime={updatedAt}>{updatedAt}</time>
            </p>
          ) : (
            <span className="docs-detail-section-article-updated" aria-hidden="true" />
          )}
          <DocDetailSectionShareButton isZhContent={isZhContent} title={articleTitle} />
        </div>
        <div className="docs-detail-section-article-video">
          <DocDetailIndexVideoPlaceholder isZhContent={isZhContent} title={articleTitle} />
        </div>
      </header>
      <div
        className="docs-detail-platform-article-body docs-detail-section-article-body"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </article>
  )
}
