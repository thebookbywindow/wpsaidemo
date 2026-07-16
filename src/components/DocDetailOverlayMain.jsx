import { useCallback, useEffect, useMemo, useRef } from 'react'
import { ListTree } from 'lucide-react'
import DocDetailArticleBreadcrumb, {
  DocDetailDocCatalogIndex,
  getDocDetailDisplayTitle,
} from './DocDetailArticleBreadcrumb'
import DocDetailArticlePager from './DocDetailArticlePager'
import DocDetailMobileDrawer from './DocDetailMobileDrawer'
import { DocDetailMobileDrawerNavButton } from './DocDetailMobileDrawerNav'
import DocDetailSectionArticle from './DocDetailSectionArticle'
import DocDetailTocPanel from './DocDetailTocPanel'
import DocsDetailCatalogSidebar from './DocsDetailCatalogSidebar'
import {
  getDocDetailPlatformSectionIds,
  getDocDetailPlatforms,
  getDocDetailUniversalSectionIds,
  hasDocDetailUniversalSections,
  isDocDetailCommonScopeId,
  isDocDetailPlatformAllowed,
  isDocDetailPlatformLess,
  shouldDocDetailSectionUseCommonScope,
} from '../data/docDetailTocData'
import { useDocDetailArticleNav } from '../hooks/useDocDetailArticleNav'
import { useDocDetailMobileDrawers } from '../hooks/useDocDetailMobileDrawers'
import { useDocDetailMobileDrawerSwipe } from '../hooks/useDocDetailMobileDrawerSwipe'
import { useDocDetailToc } from '../hooks/useDocDetailToc'
import {
  adaptStructuredDocMarkdownForPlatform,
  extractDocDetailSection,
  extractDocDetailUpdatedAt,
  extractDocFeatureSummaryIntro,
  getDocDetailSectionLabel,
  scrollDocDetailPanelToTop,
  supportsStructuredDocSections,
} from '../utils/docDetailSectionContent'
import { buildDocDetailArticleHeading } from '../utils/docDetailArticleHeading'
import { hasDocDetailIndexVideo } from '../utils/docDetailIndexVideo'
import { getDocDetailPlatformIcon } from '../utils/docDetailPlatformIcons'

function escapeHtml(text) {
  return `${text ?? ''}`
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function convertMarkdownListsToHtml(text) {
  const lines = text.split('\n')
  const output = []
  let index = 0

  const renderList = (items) => {
    const hasNested = items.some((item) => item.subs.length > 0)
    const listClass = hasNested ? ' class="docs-detail-faq-list"' : ''
    const listItems = items
      .map((item) => {
        if (item.subs.length) {
          const answers = item.subs
            .map((sub) => `<li class="docs-detail-faq-answer-item">${sub}</li>`)
            .join('')
          return `<li class="docs-detail-faq-item"><p class="docs-detail-faq-question">${item.content}</p><ul class="docs-detail-faq-answers">${answers}</ul></li>`
        }
        return `<li>${item.content}</li>`
      })
      .join('\n')
    return `<ul${listClass}>\n${listItems}\n</ul>`
  }

  while (index < lines.length) {
    const topMatch = lines[index]?.match(/^([-*•]) (.+)$/)
    if (!topMatch) {
      output.push(lines[index])
      index += 1
      continue
    }

    const items = []
    while (index < lines.length) {
      const currentTop = lines[index]?.match(/^([-*•]) (.+)$/)
      if (!currentTop) {
        break
      }

      const item = { content: currentTop[2], subs: [] }
      index += 1
      while (index < lines.length && /^  [-*•] (.+)$/.test(lines[index])) {
        const subMatch = lines[index].match(/^  [-*•] (.+)$/)
        item.subs.push(subMatch[1])
        index += 1
      }
      items.push(item)
    }

    output.push(renderList(items))
  }

  return output.join('\n')
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
  html = convertMarkdownListsToHtml(html)
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
      || trimmed.startsWith('<ul')
      || trimmed.startsWith('<ol')
      || trimmed.startsWith('<li')
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
  onCatalogSectionNavigate,
  backToTopAriaLabel = 'Back to top',
}) {
  const docDetailPlatforms = useMemo(
    () => getDocDetailPlatforms(routeSlug),
    [routeSlug],
  )
  const hasDocPlatforms = docDetailPlatforms.length > 0
  const usesStructuredSections = supportsStructuredDocSections(routeSlug, docContent, docLanguage)
  const hasDocUniversalSections = hasDocDetailUniversalSections(routeSlug)
  const hasFeatureScopeGroup =
    hasDocUniversalSections || (usesStructuredSections && !hasDocPlatforms)
  const universalSectionIds = useMemo(
    () => getDocDetailUniversalSectionIds(routeSlug),
    [routeSlug],
  )
  const platformSectionIds = useMemo(
    () => getDocDetailPlatformSectionIds(routeSlug, isZhContent),
    [isZhContent, routeSlug],
  )

  const {
    expandedPlatformId,
    activePlatformId,
    activeSectionId,
    contentViewMode,
    handleSidebarPlatformToggle,
    handleSectionClick,
    handleBreadcrumbDocClick,
  } = useDocDetailToc({
    routePlatformId,
    routeDetailSectionId,
    onRouteChange: onDocRouteChange,
    routeSlug,
    hasPlatforms: hasDocPlatforms,
    hasFeatureScopeGroup,
    usesStructuredSections,
  })

  const showDetailContent = contentViewMode !== 'doc-catalog-index'

  useEffect(() => {
    if (!routePlatformId || isDocDetailPlatformAllowed(routeSlug, routePlatformId)) {
      return
    }

    onDocRouteChange?.({ platformId: '', detailSectionId: '' })
  }, [onDocRouteChange, routePlatformId, routeSlug])

  const previousDocRouteRef = useRef({
    routeSlug: '',
    routePlatformId: '',
    routeDetailSectionId: '',
  })

  useEffect(() => {
    if (!usesStructuredSections || !hasDocPlatforms) {
      return
    }

    if (routePlatformId && !routeDetailSectionId) {
      onDocRouteChange?.({ platformId: '', detailSectionId: '' })
    }
  }, [
    hasDocPlatforms,
    onDocRouteChange,
    routeDetailSectionId,
    routePlatformId,
    usesStructuredSections,
  ])

  useEffect(() => {
    if (!usesStructuredSections) {
      previousDocRouteRef.current = {
        routeSlug,
        routePlatformId,
        routeDetailSectionId,
      }
      return
    }

    const previousRoute = previousDocRouteRef.current
    const docChanged = previousRoute.routeSlug !== routeSlug
    const returnedToCatalogIndex =
      previousRoute.routeSlug === routeSlug
      && !routePlatformId
      && !routeDetailSectionId
      && (
        Boolean(previousRoute.routePlatformId)
        || Boolean(previousRoute.routeDetailSectionId)
      )
    const detailRouteChanged =
      previousRoute.routePlatformId !== routePlatformId
      || previousRoute.routeDetailSectionId !== routeDetailSectionId

    if (docChanged || returnedToCatalogIndex || detailRouteChanged) {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          scrollDocDetailPanelToTop()
        })
      })
    }

    previousDocRouteRef.current = {
      routeSlug,
      routePlatformId,
      routeDetailSectionId,
    }
  }, [
    hasDocPlatforms,
    routeDetailSectionId,
    routePlatformId,
    routeSlug,
    usesStructuredSections,
  ])

  const docTitle = useMemo(() => getDocDetailDisplayTitle(docDisplayParts), [docDisplayParts])

  const docFeatureSummary = useMemo(
    () => extractDocFeatureSummaryIntro(docContent, docLanguage),
    [docContent, docLanguage],
  )

  const scopedMarkdown = useMemo(() => {
    if (!usesStructuredSections) {
      return docContent
    }

    if (hasDocPlatforms && activePlatformId && !isDocDetailCommonScopeId(activePlatformId)) {
      return adaptStructuredDocMarkdownForPlatform(docContent, activePlatformId, docLanguage)
    }

    return docContent
  }, [activePlatformId, docContent, docLanguage, hasDocPlatforms, usesStructuredSections])

  const docHtml = useMemo(() => {
    if (contentViewMode === 'doc-catalog-index') {
      return fallbackNoticeHtml
    }
    return `${fallbackNoticeHtml}${markdownToHtml(docContent, emptyDocContentText)}`
  }, [contentViewMode, docContent, emptyDocContentText, fallbackNoticeHtml])

  const docUpdatedAt = useMemo(
    () => extractDocDetailUpdatedAt(docContent),
    [docContent],
  )

  const activeSectionLabel = getDocDetailSectionLabel(activeSectionId, docLanguage)

  const sectionArticleHeading = useMemo(
    () => buildDocDetailArticleHeading({
      routeSlug,
      sectionId: activeSectionId,
      platformId: activePlatformId,
      docTitle,
      docLang: docLanguage,
    }),
    [activePlatformId, activeSectionId, docLanguage, docTitle, routeSlug],
  )

  const activeSectionBodyHtml = useMemo(() => {
    if (!usesStructuredSections || contentViewMode !== 'section-detail') {
      return ''
    }

    return markdownToHtml(
      extractDocDetailSection(scopedMarkdown, activeSectionId, docLanguage),
      emptyDocContentText,
    )
  }, [
    activeSectionId,
    contentViewMode,
    docLanguage,
    emptyDocContentText,
    scopedMarkdown,
    usesStructuredSections,
  ])

  const { prev: prevArticle, next: nextArticle } = useDocDetailArticleNav({
    platforms: docDetailPlatforms,
    isZhContent,
    activePlatformId,
    activeSectionId,
    contentViewMode,
    universalSectionIds,
    platformSectionIds,
    hasUniversalSections: hasDocUniversalSections,
  })

  const {
    isMobile,
    leftOpen,
    rightOpen,
    toggleLeft,
    toggleRight,
    openLeft,
    openRight,
    closeAll,
  } = useDocDetailMobileDrawers()

  const showDetailTocSidebar = usesStructuredSections && showDetailContent

  useDocDetailMobileDrawerSwipe({
    enabled: usesStructuredSections,
    isMobile,
    leftOpen,
    rightOpen,
    showRight: showDetailTocSidebar,
    openLeft,
    openRight,
    closeAll,
  })

  const handleArticlePagerNavigate = useCallback((platformId, sectionId) => {
    closeAll()
    handleSectionClick(platformId, sectionId)
  }, [closeAll, handleSectionClick])

  const handleCatalogLeafClick = useCallback(
    (payload) => {
      closeAll()
      onCatalogLeafClick?.(payload)
    },
    [closeAll, onCatalogLeafClick],
  )

  const handleCatalogSectionNavigate = useCallback(
    (sectionTitle) => {
      closeAll()
      onCatalogSectionNavigate?.(sectionTitle)
    },
    [closeAll, onCatalogSectionNavigate],
  )

  const handleDrawerSectionClick = useCallback(
    (platformId, sectionId) => {
      closeAll()
      handleSectionClick(platformId, sectionId)
    },
    [closeAll, handleSectionClick],
  )

  const handleDrawerPlatformToggle = useCallback(
    (platformId) => {
      handleSidebarPlatformToggle(platformId)
    },
    [handleSidebarPlatformToggle],
  )

  const leftDrawerLabel = isZhContent ? '功能目录' : 'Directory'
  const leftDrawerHint = isZhContent ? '展开功能目录' : 'Open feature directory'
  const leftDrawerCloseLabel = isZhContent ? '关闭目录' : 'Close directory'
  const rightDrawerLabel = isZhContent ? '端与章节' : 'Platform & Section'
  const rightDrawerHint = isZhContent ? '选择平台与章节' : 'Choose platform and section'
  const rightDrawerCloseLabel = isZhContent ? '关闭端与章节' : 'Close platform & section'
  const rightDrawerIcon = getDocDetailPlatformIcon(activePlatformId)

  return (
    <div
      className={`docs-center-overlay-main${
        isMobile ? ' docs-center-overlay-main--mobile-drawers' : ''
      }${leftOpen || rightOpen ? ' has-mobile-drawer-open' : ''}`}
    >
      {isMobile && (leftOpen || rightOpen) ? (
        <button
          type="button"
          className="docs-detail-mobile-drawer-backdrop"
          aria-label={isZhContent ? '关闭导航' : 'Close navigation'}
          onClick={closeAll}
        />
      ) : null}
      <DocDetailMobileDrawer
        side="left"
        isOpen={leftOpen}
        isMobile={isMobile}
        onClose={closeAll}
        panelLabel={catalogDirectoryTitle || leftDrawerLabel}
        showPanelHead={false}
      >
        <DocsDetailCatalogSidebar
          sectionModels={sectionModels}
          staticMetaMap={staticMetaMap}
          helpCenterMetaMap={helpCenterMetaMap}
          activeDocPathKey={activeDocPathKey}
          directoryTitle={catalogDirectoryTitle}
          searchPlaceholder={catalogSearchPlaceholder}
          searchEmptyText={catalogSearchEmptyText}
          limitToActiveSection
          onSectionNavigate={handleCatalogSectionNavigate}
          onDrawerClose={isMobile ? closeAll : undefined}
          drawerCloseLabel={isMobile ? leftDrawerCloseLabel : ''}
          onLeafClick={handleCatalogLeafClick}
        />
      </DocDetailMobileDrawer>
      <div className="docs-center-overlay-body docs-center-md">
        <div className="docs-detail-article-panel">
          {usesStructuredSections ? (
            <DocDetailArticleBreadcrumb
              docDisplayParts={docDisplayParts}
              rootLabel={breadcrumbRootLabel}
              activeSectionId={activeSectionId}
              docLanguage={docLanguage}
              contentViewMode={contentViewMode}
              onRootClick={onBreadcrumbRootClick}
              onDocClick={handleBreadcrumbDocClick}
              ariaLabel={articleBreadcrumbAriaLabel}
              leadingAction={null}
              trailingAction={
                isMobile && showDetailTocSidebar ? (
                  <DocDetailMobileDrawerNavButton
                    side="right"
                    label={rightDrawerLabel}
                    hint={rightDrawerHint}
                    icon={rightDrawerIcon}
                    isOpen={rightOpen}
                    onClick={toggleRight}
                  />
                ) : null
              }
            />
          ) : null}
          <div
            className={`docs-detail-article-layout${
              showDetailTocSidebar ? ' docs-detail-article-layout--with-toc' : ''
            }`}
          >
            <div className="docs-detail-article-content">
              {usesStructuredSections && contentViewMode === 'doc-catalog-index' ? (
                <DocDetailDocCatalogIndex
                  docTitle={docTitle}
                  docSummary={docFeatureSummary}
                  isZhContent={isZhContent}
                  onSectionClick={handleSectionClick}
                  platforms={docDetailPlatforms}
                  routeSlug={routeSlug}
                  universalSectionIds={universalSectionIds}
                  platformSectionIds={platformSectionIds}
                />
              ) : usesStructuredSections && contentViewMode === 'section-detail' ? (
                <>
                  <DocDetailSectionArticle
                    articleTitle={sectionArticleHeading}
                    sectionLabel={activeSectionLabel}
                    sectionBodyHtml={activeSectionBodyHtml}
                    fallbackNoticeHtml={fallbackNoticeHtml}
                    isZhContent={isZhContent}
                    updatedAt={docUpdatedAt}
                    routeSlug={routeSlug}
                    showIndexVideo={
                      hasDocDetailIndexVideo(routeSlug) && activeSectionId === 'features-overview'
                    }
                  />
                  <DocDetailArticlePager
                    prev={prevArticle}
                    next={nextArticle}
                    isZhContent={isZhContent}
                    onNavigate={handleArticlePagerNavigate}
                  />
                </>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: docHtml }} />
              )}
            </div>
            {showDetailTocSidebar ? (
              <DocDetailMobileDrawer
                side="right"
                isOpen={rightOpen}
                isMobile={isMobile}
                onClose={closeAll}
                panelLabel={rightDrawerLabel}
                showPanelHead={false}
              >
                <DocDetailTocPanel
                  sidebarTitle={docTitle || sidebarTitle}
                  drawerHeadTitle={rightDrawerLabel}
                  isZhContent={isZhContent}
                  expandedPlatformId={expandedPlatformId}
                  activePlatformId={activePlatformId}
                  activeSectionId={activeSectionId}
                  contentViewMode={contentViewMode}
                  onPlatformToggle={handleDrawerPlatformToggle}
                  onSectionClick={handleDrawerSectionClick}
                  platforms={docDetailPlatforms}
                  universalSectionIds={universalSectionIds}
                  platformSectionIds={platformSectionIds}
                  onDrawerClose={isMobile ? closeAll : undefined}
                  drawerCloseLabel={isMobile ? rightDrawerCloseLabel : ''}
                  drawerCloseSide="right"
                  embedded
                />
              </DocDetailMobileDrawer>
            ) : null}
          </div>
        </div>
      </div>

      <div className="docs-center-float-actions docs-detail-float-actions">
        {isMobile ? (
          <button
            type="button"
            className={`docs-center-float-catalog-btn${leftOpen ? ' is-active' : ''}`}
            aria-label={`${leftDrawerHint}: ${leftDrawerLabel}`}
            aria-expanded={leftOpen}
            title={`${leftDrawerHint}: ${leftDrawerLabel}`}
            onClick={toggleLeft}
          >
            <ListTree size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
        ) : null}
        <button
          type="button"
          aria-label={backToTopAriaLabel}
          title={backToTopAriaLabel}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      </div>
    </div>
  )
}
