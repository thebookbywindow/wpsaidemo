import { useCallback, useEffect, useMemo, useRef } from 'react'
import DocDetailArticleBreadcrumb, {
  getDocDetailDisplayTitle,
} from './DocDetailArticleBreadcrumb'
import DocDetailPlatformArticle from './DocDetailPlatformArticle'
import DocDetailTocPanel from './DocDetailTocPanel'
import DocsDetailCatalogSidebar from './DocsDetailCatalogSidebar'
import {
  getDocDetailPlatforms,
  isDocDetailPlatformAllowed,
} from '../data/docDetailTocData'
import { useDocDetailToc } from '../hooks/useDocDetailToc'
import { useDocDetailSectionScrollSpy } from '../hooks/useDocDetailSectionScrollSpy'
import {
  adaptStructuredDocMarkdownForPlatform,
  extractDocDetailUpdatedAt,
  injectDocDetailSectionAnchors,
  scrollDocDetailPanelToTop,
  scrollToDocDetailSection,
  stripStructuredDocLead,
  supportsStructuredDocSections,
  syncDocDetailScrollOffsetVar,
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
  helpCenterMetaMap = {},
  activeDocPathKey = '',
  catalogDirectoryTitle = 'Directory',
  catalogSearchPlaceholder = 'Search directory',
  catalogSearchEmptyText = 'No matching items',
  onCatalogLeafClick,
}) {
  const docDetailPlatforms = useMemo(
    () => getDocDetailPlatforms(routeSlug),
    [routeSlug],
  )
  const hasDocPlatforms = docDetailPlatforms.length > 0
  const usesStructuredSections = supportsStructuredDocSections(routeSlug, docContent, docLanguage)

  const {
    expandedPlatformId,
    activePlatformId,
    activeSectionId,
    contentViewMode,
    handlePlatformNavigate,
    handleSectionAnchorClick,
    consumePendingScrollSectionId,
    consumeShouldScrollSectionId,
    setScrollLinkedSectionId,
  } = useDocDetailToc({
    routePlatformId,
    routeDetailSectionId,
    onRouteChange: onDocRouteChange,
    hasPlatforms: hasDocPlatforms,
  })

  const showStructuredArticle =
    contentViewMode === 'platform-detail' || contentViewMode === 'article-detail'

  useEffect(() => {
    if (!routePlatformId || isDocDetailPlatformAllowed(routeSlug, routePlatformId)) {
      return
    }

    const fallbackPlatformId = docDetailPlatforms[0]?.id ?? ''
    onDocRouteChange?.({ platformId: fallbackPlatformId, detailSectionId: '' })
  }, [docDetailPlatforms, onDocRouteChange, routePlatformId, routeSlug])

  useEffect(() => {
    if (!usesStructuredSections || !hasDocPlatforms || routePlatformId) {
      return
    }

    const defaultPlatformId = docDetailPlatforms[0]?.id
    if (!defaultPlatformId) {
      return
    }

    onDocRouteChange?.({ platformId: defaultPlatformId, detailSectionId: '' })
  }, [
    docDetailPlatforms,
    hasDocPlatforms,
    onDocRouteChange,
    routePlatformId,
    usesStructuredSections,
  ])

  const previousPlatformIdRef = useRef('')
  const previousDocRouteRef = useRef({ routeSlug: '', routePlatformId: '' })

  const platformLabel =
    docDetailPlatforms.find((platform) => platform.id === activePlatformId)?.label ?? ''

  useEffect(() => {
    if (contentViewMode !== 'platform-detail' || !routePlatformId) {
      previousPlatformIdRef.current = routePlatformId
      return
    }

    if (previousPlatformIdRef.current !== routePlatformId) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scrollDocDetailPanelToTop()
        })
      })
    }

    previousPlatformIdRef.current = routePlatformId
  }, [contentViewMode, routePlatformId])

  useEffect(() => {
    if (!usesStructuredSections) {
      previousDocRouteRef.current = { routeSlug, routePlatformId }
      return
    }

    const previousRoute = previousDocRouteRef.current
    const docChanged = previousRoute.routeSlug !== routeSlug

    if (docChanged) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scrollDocDetailPanelToTop()
        })
      })
    }

    previousDocRouteRef.current = { routeSlug, routePlatformId }
  }, [routePlatformId, routeSlug, usesStructuredSections])

  const docTitle = useMemo(() => getDocDetailDisplayTitle(docDisplayParts), [docDisplayParts])

  const docHtml = useMemo(
    () => `${fallbackNoticeHtml}${markdownToHtml(docContent, emptyDocContentText)}`,
    [docContent, emptyDocContentText, fallbackNoticeHtml],
  )

  const platformArticleContent = useMemo(() => {
    if (!usesStructuredSections || !showStructuredArticle) {
      return { articleTitle: docTitle, bodyHtml: '' }
    }

    const scopedMarkdown = hasDocPlatforms
      ? adaptStructuredDocMarkdownForPlatform(docContent, activePlatformId, docLanguage)
      : docContent
    const bodyMarkdown = stripStructuredDocLead(scopedMarkdown)
    const html = markdownToHtml(bodyMarkdown, emptyDocContentText)
    const bodyHtml = injectDocDetailSectionAnchors(html, docLanguage)

    return { articleTitle: docTitle, bodyHtml }
  }, [
    activePlatformId,
    docContent,
    docLanguage,
    docTitle,
    emptyDocContentText,
    hasDocPlatforms,
    showStructuredArticle,
    usesStructuredSections,
  ])

  const handleScrollSpySectionChange = useCallback((sectionId) => {
    setScrollLinkedSectionId((currentSectionId) =>
      currentSectionId === sectionId ? currentSectionId : sectionId,
    )
  }, [setScrollLinkedSectionId])

  const handleFeatureTitleClick = useCallback(() => {
    window.requestAnimationFrame(() => {
      scrollDocDetailPanelToTop()
    })
  }, [])

  const { lockScrollSpy } = useDocDetailSectionScrollSpy({
    enabled: usesStructuredSections && showStructuredArticle,
    isZhContent,
    bodyHtml: platformArticleContent.bodyHtml,
    onActiveSectionChange: handleScrollSpySectionChange,
  })

  const lockScrollSpyRef = useRef(lockScrollSpy)
  lockScrollSpyRef.current = lockScrollSpy

  useEffect(() => {
    if (!showStructuredArticle) {
      return undefined
    }

    const syncOffset = () => {
      syncDocDetailScrollOffsetVar()
    }

    syncOffset()
    window.addEventListener('resize', syncOffset)

    return () => {
      window.removeEventListener('resize', syncOffset)
    }
  }, [platformArticleContent.bodyHtml, platformLabel, showStructuredArticle])

  useEffect(() => {
    if (!showStructuredArticle) {
      return
    }

    const pendingSectionId = consumePendingScrollSectionId()
    const legacySectionId = routeDetailSectionId
    const scrollTargetId = pendingSectionId || legacySectionId

    if (scrollTargetId) {
      if (legacySectionId) {
        setScrollLinkedSectionId(legacySectionId)
        onDocRouteChange?.({ platformId: routePlatformId, detailSectionId: '' })
      }

      lockScrollSpyRef.current(scrollTargetId)
      scrollToDocDetailSection(scrollTargetId)
      return
    }

    const clickedSectionId = consumeShouldScrollSectionId()
    if (clickedSectionId) {
      lockScrollSpyRef.current(clickedSectionId)
      scrollToDocDetailSection(clickedSectionId)
    }
  }, [
    activeSectionId,
    consumePendingScrollSectionId,
    consumeShouldScrollSectionId,
    onDocRouteChange,
    platformArticleContent.bodyHtml,
    routeDetailSectionId,
    routePlatformId,
    setScrollLinkedSectionId,
    showStructuredArticle,
  ])

  const docUpdatedAt = useMemo(
    () => extractDocDetailUpdatedAt(docContent),
    [docContent],
  )

  const showDetailTocSidebar = usesStructuredSections && showStructuredArticle

  return (
    <div className="docs-center-overlay-main">
      <DocsDetailCatalogSidebar
        sectionModels={sectionModels}
        staticMetaMap={staticMetaMap}
        helpCenterMetaMap={helpCenterMetaMap}
        activeDocPathKey={activeDocPathKey}
        directoryTitle={catalogDirectoryTitle}
        searchPlaceholder={catalogSearchPlaceholder}
        searchEmptyText={catalogSearchEmptyText}
        limitToActiveSection
        onLeafClick={onCatalogLeafClick}
      />
      <div className="docs-center-overlay-body docs-center-md">
        <div className="docs-detail-article-panel">
          {usesStructuredSections ? (
            <DocDetailArticleBreadcrumb
              docDisplayParts={docDisplayParts}
              rootLabel={breadcrumbRootLabel}
              platformLabel={platformLabel}
              contentViewMode={contentViewMode}
              onRootClick={onBreadcrumbRootClick}
              ariaLabel={articleBreadcrumbAriaLabel}
            />
          ) : null}
          <div
            className={`docs-detail-article-layout${
              showDetailTocSidebar ? ' docs-detail-article-layout--with-toc' : ''
            }`}
          >
            <div
              className={`docs-detail-article-content${
                showStructuredArticle ? ' docs-detail-article-content--platform-detail' : ''
              }`}
            >
              {usesStructuredSections && showStructuredArticle ? (
                <DocDetailPlatformArticle
                  key={hasDocPlatforms ? activePlatformId : 'article-detail'}
                  articleTitle={platformArticleContent.articleTitle}
                  bodyHtml={platformArticleContent.bodyHtml}
                  fallbackNoticeHtml={fallbackNoticeHtml}
                  isZhContent={isZhContent}
                  updatedAt={docUpdatedAt}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: docHtml }} />
              )}
            </div>
            {showDetailTocSidebar ? (
              <DocDetailTocPanel
                sidebarTitle={docTitle || sidebarTitle}
                isZhContent={isZhContent}
                expandedPlatformId={expandedPlatformId}
                activePlatformId={activePlatformId}
                activeSectionId={activeSectionId}
                contentViewMode={contentViewMode}
                onPlatformNavigate={handlePlatformNavigate}
                onSectionAnchorClick={handleSectionAnchorClick}
                onFeatureTitleClick={handleFeatureTitleClick}
                platforms={docDetailPlatforms}
                embedded
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
