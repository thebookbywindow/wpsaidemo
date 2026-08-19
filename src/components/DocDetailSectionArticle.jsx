import DocDetailIndexVideoPlaceholder from './DocDetailIndexVideoPlaceholder'
import DocDetailSectionShareButton from './DocDetailSectionShareButton'
import { getDocDetailUpdatedLabel } from '../utils/docDetailSectionContent'

export default function DocDetailSectionArticle({
  articleTitle = '',
  sectionLabel,
  sectionBodyHtml,
  fallbackNoticeHtml = '',
  isZhContent,
  updatedAt = '',
  showIndexVideo = false,
}) {
  const updatedLabel = getDocDetailUpdatedLabel(isZhContent)

  return (
    <article className="docs-detail-section-article">
      {fallbackNoticeHtml ? (
        <div dangerouslySetInnerHTML={{ __html: fallbackNoticeHtml }} />
      ) : null}
      <header className="docs-detail-section-article-header">
        <h1 className="docs-detail-section-article-title">{articleTitle}</h1>
        <div className="docs-detail-section-article-meta">
          {updatedAt ? (
            <p className="docs-detail-section-article-updated">
              <span className="docs-detail-section-article-updated-label">{updatedLabel}</span>
              <time dateTime={updatedAt}>{updatedAt}</time>
            </p>
          ) : null}
          <DocDetailSectionShareButton
            isZhContent={isZhContent}
            title={sectionLabel}
            className="docs-detail-section-share--inline"
          />
        </div>
        {showIndexVideo ? (
          <div className="docs-detail-section-article-video">
            <DocDetailIndexVideoPlaceholder isZhContent={isZhContent} title={sectionLabel} />
          </div>
        ) : null}
      </header>
      <div
        className="docs-detail-section-article-body"
        dangerouslySetInnerHTML={{ __html: sectionBodyHtml }}
      />
      <footer className="docs-detail-section-article-footer">
        <DocDetailSectionShareButton
          isZhContent={isZhContent}
          title={sectionLabel}
          className="docs-detail-section-share--footer"
        />
      </footer>
    </article>
  )
}
