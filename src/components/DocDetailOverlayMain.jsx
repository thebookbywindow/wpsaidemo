import { useMemo } from 'react'
import DocDetailArticleBreadcrumb, {
  DocDetailDocCatalogIndex,
  DocDetailPlatformSectionIndex,
} from './DocDetailArticleBreadcrumb'
import DocDetailTocPanel from './DocDetailTocPanel'
import { DOC_DETAIL_TOC_PLATFORMS } from '../data/docDetailTocData'
import { useDocDetailToc } from '../hooks/useDocDetailToc'
import {
  buildDocDetailSectionMarkdown,
  supportsStructuredDocSections,
} from '../utils/docDetailSectionContent'

function escapeHtml(text) {
  return `${text ?? ''}`
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function markdownToHtml(markdown, emptyText = 'No content available.') {
  if (!markdown) {
    return `<p class="docs-center-empty">${escapeHtml(emptyText)}</p>`
  }

  let html = escapeHtml(markdown)
  html = html.replace(/```[\w]*\n?([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`)
  html = html.replace(/^# (.+)$/gm, (_, title) => `<h1>${title.replace(/\*\*.*?\*\*/g, '').trim()}</h1>`)
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^---$/gm, '<hr>')
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  html = html.replace(/((?:^&gt; .+$\n?)+)/gm, (match) => {
    const inner = match.replace(/^&gt; (.+)$/gm, '<p>$1</p>').trim()
    return `<blockquote>${inner}</blockquote>\n`
  })
  html = html.replace(/^([-*•]) (.+)$/gm, (_, __, item) => `<li>${item}</li>`)
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
  html = html.replace(/^\d+\. (.+)$/gm, (_, item) => `<oli>${item}</oli>`)
  html = html.replace(/(<oli>.*<\/oli>\n?)+/g, (match) =>
    `<ol>${match.replaceAll('<oli>', '<li>').replaceAll('</oli>', '</li>')}</ol>`,
  )

  const lines = html.split('\n')
  const processedLines = []
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed) {
      continue
    }
    if (
      trimmed.startsWith('<h')
      || trimmed.startsWith('<ul>')
      || trimmed.startsWith('<ol>')
      || trimmed.startsWith('<pre>')
      || trimmed.startsWith('<table')
      || trimmed.startsWith('<blockquote')
      || trimmed.startsWith('<hr>')
      || trimmed.startsWith('</')
    ) {
      processedLines.push(trimmed)
    } else {
      processedLines.push(`<p>${trimmed}</p>`)
    }
  }

  return processedLines.join('\n')
}

export default function DocDetailOverlayMain({
  routeSlug,
  docContent,
  docLanguage,
  isZhContent,
  sidebarTitle,
  emptyDocContentText,
  fallbackNoticeHtml = '',
  docDisplayParts = [],
  articleBreadcrumbAriaLabel = 'Article breadcrumb',
  onBreadcrumbRootClick,
  routePlatformId = '',
  routeDetailSectionId = '',
  onDocRouteChange,
}) {
  const {
    expandedPlatformId,
    activePlatformId,
    activeSectionId,
    contentViewMode,
    handleSidebarPlatformToggle,
    handleSectionClick,
    handleBreadcrumbPlatformClick,
    handleBreadcrumbDocClick,
  } = useDocDetailToc({
    routePlatformId,
    routeDetailSectionId,
    onRouteChange: onDocRouteChange,
  })

  const platformLabel =
    DOC_DETAIL_TOC_PLATFORMS.find((platform) => platform.id === activePlatformId)?.label ?? ''

  const usesStructuredSections = supportsStructuredDocSections(routeSlug, docContent, docLanguage)

  const displayMarkdown = useMemo(() => {
    if (!usesStructuredSections || contentViewMode !== 'section-detail') {
      return docContent
    }

    return buildDocDetailSectionMarkdown({
      markdown: docContent,
      sectionId: activeSectionId,
      docLang: docLanguage,
    })
  }, [
    activeSectionId,
    contentViewMode,
    docContent,
    docLanguage,
    usesStructuredSections,
  ])

  const docHtml = useMemo(() => {
    if (contentViewMode === 'platform-index' || contentViewMode === 'doc-catalog-index') {
      return fallbackNoticeHtml
    }
    return `${fallbackNoticeHtml}${markdownToHtml(displayMarkdown, emptyDocContentText)}`
  }, [contentViewMode, displayMarkdown, emptyDocContentText, fallbackNoticeHtml])

  const handlePlatformSectionClick = (sectionId) => {
    handleSectionClick(activePlatformId, sectionId)
  }

  return (
    <div
      className={`docs-center-overlay-main${
        usesStructuredSections ? '' : ' docs-center-overlay-main--single'
      }`}
    >
      {usesStructuredSections ? (
        <DocDetailTocPanel
          sidebarTitle={sidebarTitle}
          isZhContent={isZhContent}
          expandedPlatformId={expandedPlatformId}
          activePlatformId={activePlatformId}
          activeSectionId={activeSectionId}
          contentViewMode={contentViewMode}
          onPlatformClick={handleSidebarPlatformToggle}
          onSectionClick={handleSectionClick}
        />
      ) : null}
      <div className="docs-center-overlay-body docs-center-md">
        <div className="docs-detail-article-panel">
          {usesStructuredSections ? (
            <DocDetailArticleBreadcrumb
              docDisplayParts={docDisplayParts}
              platformLabel={platformLabel}
              activeSectionId={activeSectionId}
              docLanguage={docLanguage}
              contentViewMode={contentViewMode}
              onPlatformClick={() => handleBreadcrumbPlatformClick(activePlatformId)}
              onRootClick={onBreadcrumbRootClick}
              onDocClick={handleBreadcrumbDocClick}
              ariaLabel={articleBreadcrumbAriaLabel}
            />
          ) : null}
          <div className="docs-detail-article-content">
            {usesStructuredSections && contentViewMode === 'doc-catalog-index' ? (
              <DocDetailDocCatalogIndex
                isZhContent={isZhContent}
                onSectionClick={handleSectionClick}
              />
            ) : usesStructuredSections && contentViewMode === 'platform-index' ? (
              <DocDetailPlatformSectionIndex
                platformLabel={platformLabel}
                isZhContent={isZhContent}
                onSectionClick={handlePlatformSectionClick}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: docHtml }} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
