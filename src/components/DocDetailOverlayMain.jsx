import { useEffect, useMemo } from 'react'
import DocDetailArticleBreadcrumb, {
  DocDetailDocCatalogIndex,
  DocDetailPlatformSectionIndex,
  getDocDetailDisplayTitle,
} from './DocDetailArticleBreadcrumb'
import DocDetailArticlePager from './DocDetailArticlePager'
import DocDetailSectionArticle from './DocDetailSectionArticle'
import DocDetailTocPanel from './DocDetailTocPanel'
import DocsDetailCatalogSidebar from './DocsDetailCatalogSidebar'
import {
  getDocDetailPlatforms,
  isDocDetailPlatformAllowed,
} from '../data/docDetailTocData'
import { useDocDetailArticleNav } from '../hooks/useDocDetailArticleNav'
import { useDocDetailToc } from '../hooks/useDocDetailToc'
import {
  buildDocDetailSectionMarkdown,
  extractDocDetailSection,
  extractDocDetailUpdatedAt,
  extractDocFeatureSummaryIntro,
  getDocDetailSectionLabel,
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
  breadcrumbRootLabel = '',
  onBreadcrumbRootClick,
  routePlatformId = '',
  routeDetailSectionId = '',
  onDocRouteChange,
  sectionModels = [],
  staticMetaMap = {},
  activeDocPathKey = '',
  catalogDirectoryTitle = 'Directory',
  catalogSearchPlaceholder = 'Search directory',
  onCatalogLeafClick,
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

  const docDetailPlatforms = useMemo(
    () => getDocDetailPlatforms(routeSlug),
    [routeSlug],
  )

  useEffect(() => {
    if (!routePlatformId || isDocDetailPlatformAllowed(routeSlug, routePlatformId)) {
      return
    }

    onDocRouteChange?.({ platformId: '', detailSectionId: '' })
  }, [onDocRouteChange, routePlatformId, routeSlug])

  const platformLabel =
    docDetailPlatforms.find((platform) => platform.id === activePlatformId)?.label ?? ''

  const usesStructuredSections = supportsStructuredDocSections(routeSlug, docContent, docLanguage)

  const docTitle = useMemo(() => getDocDetailDisplayTitle(docDisplayParts), [docDisplayParts])

  const docFeatureSummary = useMemo(
    () => extractDocFeatureSummaryIntro(docContent, docLanguage),
    [docContent, docLanguage],
  )

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

  const docUpdatedAt = useMemo(
    () => extractDocDetailUpdatedAt(docContent),
    [docContent],
  )

  const activeSectionLabel = getDocDetailSectionLabel(activeSectionId, docLanguage)

  const activeSectionBodyHtml = useMemo(() => {
    if (!usesStructuredSections || contentViewMode !== 'section-detail') {
      return ''
    }

    return markdownToHtml(
      extractDocDetailSection(docContent, activeSectionId, docLanguage),
      emptyDocContentText,
    )
  }, [
    activeSectionId,
    contentViewMode,
    docContent,
    docLanguage,
    emptyDocContentText,
    usesStructuredSections,
  ])

  const handlePlatformSectionClick = (sectionId) => {
    handleSectionClick(activePlatformId, sectionId)
  }

  const { prev: prevArticle, next: nextArticle } = useDocDetailArticleNav({
    platforms: docDetailPlatforms,
    isZhContent,
    activePlatformId,
    activeSectionId,
    contentViewMode,
  })

  const handleArticlePagerNavigate = (platformId, sectionId) => {
    handleSectionClick(platformId, sectionId)
    window.requestAnimationFrame(() => {
      document.querySelector('.docs-detail-article-panel')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  return (
    <div
      className={`docs-center-overlay-main${
        usesStructuredSections ? '' : ' docs-center-overlay-main--single'
      }`}
    >
      <DocsDetailCatalogSidebar
        sectionModels={sectionModels}
        staticMetaMap={staticMetaMap}
        activeDocPathKey={activeDocPathKey}
        directoryTitle={catalogDirectoryTitle}
        searchPlaceholder={catalogSearchPlaceholder}
        onLeafClick={onCatalogLeafClick}
      />
      <div className="docs-center-overlay-body docs-center-md">
        <div className="docs-detail-article-panel">
          {usesStructuredSections ? (
            <DocDetailArticleBreadcrumb
              docDisplayParts={docDisplayParts}
              rootLabel={breadcrumbRootLabel}
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
                docTitle={docTitle}
                docSummary={docFeatureSummary}
                isZhContent={isZhContent}
                onSectionClick={handleSectionClick}
                platforms={docDetailPlatforms}
              />
            ) : usesStructuredSections && contentViewMode === 'platform-index' ? (
              <DocDetailPlatformSectionIndex
                platformLabel={platformLabel}
                isZhContent={isZhContent}
                onSectionClick={handlePlatformSectionClick}
              />
            ) : usesStructuredSections && contentViewMode === 'section-detail' ? (
              <DocDetailSectionArticle
                sectionLabel={activeSectionLabel}
                sectionBodyHtml={activeSectionBodyHtml}
                fallbackNoticeHtml={fallbackNoticeHtml}
                isZhContent={isZhContent}
                updatedAt={docUpdatedAt}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: docHtml }} />
            )}
            {usesStructuredSections && contentViewMode === 'section-detail' ? (
              <DocDetailArticlePager
                prev={prevArticle}
                next={nextArticle}
                isZhContent={isZhContent}
                onNavigate={handleArticlePagerNavigate}
              />
            ) : null}
          </div>
        </div>
      </div>
      {usesStructuredSections ? (
        <DocDetailTocPanel
          sidebarTitle={docTitle || sidebarTitle}
          isZhContent={isZhContent}
          expandedPlatformId={expandedPlatformId}
          activePlatformId={activePlatformId}
          activeSectionId={activeSectionId}
          contentViewMode={contentViewMode}
          onPlatformClick={handleSidebarPlatformToggle}
          onSectionClick={handleSectionClick}
          platforms={docDetailPlatforms}
        />
      ) : null}
    </div>
  )
}
