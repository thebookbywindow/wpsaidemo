import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import { ChevronDown, ChevronUp, ListTree } from 'lucide-react'
import DocDetailMobileDrawer from './DocDetailMobileDrawer'
import DocDetailOverlayMain from './DocDetailOverlayMain'
import DocsCenterHeroSearch from './DocsCenterHeroSearch'
import DocsDetailCatalogSidebar from './DocsDetailCatalogSidebar'
import { useDocDetailMobileDrawers } from '../hooks/useDocDetailMobileDrawers'
import { useDocDetailMobileDrawerSwipe } from '../hooks/useDocDetailMobileDrawerSwipe'
import { useDocsCatalogSidebarSearch } from '../hooks/useDocsCatalogSidebarSearch'
import { buildDocsStaticMetaMap, createDocsPathKey } from '../data/docsCenterMeta'
import helpCenterCatalogEntries from '../data/helpCenterCatalogEntries.json'
import {
  buildHelpCenterMetaMap,
  buildHelpCenterSectionModels,
} from '../utils/helpCenterCatalog'
import {
  filterSectionsForLeafKeyword,
} from '../utils/docsCenterSearch'
import {
  getLocaleDocsPath,
  parseDocsRoute,
  normalizeDocsRoute,
  buildCanonicalDocPath,
  resolveDocRouteSlug,
  resolveDocSectionSlug,
  resolveDocBlockSlug,
  buildHelpDocRouteLookupKey,
  isValidDocDetailPlatformId,
  DOCS_CENTER_SCROLL_TO_SECTION_EVENT,
} from '../utils/docsRoute'
import {
  DOC_DETAIL_COMMON_SCOPE_SLUG,
  isDocDetailCommonScopeId,
  shouldDocDetailSectionUseCommonScope,
} from '../data/docDetailTocData'

const siteLocaleToDocLangMap = {
  'zh-cn': 'zh-cn',
  'zh-tw': 'zh-tw',
  'zh-hk': 'zh-tw',
  'en-us': 'en-us',
  'ja-jp': 'ja-jp',
  'ko-kr': 'ko-kr',
  'es-es': 'es-mx',
  'es-mx': 'es-mx',
}

const DOC_LANGUAGE_LABELS = {
  'zh-cn': '简体中文',
  'zh-tw': '繁體中文',
  'en-us': 'English',
  'ja-jp': '日本語',
  'ko-kr': '한국어',
  'es-mx': 'Español',
}

const HELP_CENTER_SECTION_SLUG_MAP = {
  WPS文字: 'writer',
  WPS表格: 'spreadsheet',
  WPS演示: 'presentation',
  'WPS PDF': 'pdf',
}

const HELP_CENTER_BLOCK_SLUG_MAP = {
  快速入门: 'quick-start',
  快速上手: 'quick-start',
  审阅与批注: 'review-and-comments',
  文档协作: 'document-collaboration',
  公式与函数: 'formulas-and-functions',
  协作模式: 'collaboration-mode',
  幻灯片设计: 'slide-design',
  放映与分享: 'present-and-share',
  编辑与批注: 'edit-and-annotate',
  转换与导出: 'convert-and-export',
}

function getDocLanguageFromLocale(locale) {
  return siteLocaleToDocLangMap[`${locale}`.toLowerCase()] ?? 'en-us'
}

function getDocLanguageLabel(language) {
  return DOC_LANGUAGE_LABELS[language] ?? language
}

function resolveAvailableDocLanguage(helpContent, preferredLanguage) {
  if (!helpContent) {
    return ''
  }
  if (helpContent[preferredLanguage]) {
    return preferredLanguage
  }
  if (helpContent['zh-cn']) {
    return 'zh-cn'
  }
  if (helpContent['en-us']) {
    return 'en-us'
  }
  return Object.keys(helpContent)[0] ?? ''
}

function buildMobileCatalogBlockKey(sectionTitle, blockTitle) {
  return `${sectionTitle}::${blockTitle}`
}

function safeIdSegment(value) {
  const raw = `${value ?? ''}`.trim()
  if (!raw) {
    return 'doc'
  }

  const parts = []
  let latinBuffer = ''

  Array.from(raw.toLowerCase()).forEach((char) => {
    if (/[a-z0-9]/.test(char)) {
      latinBuffer += char
      return
    }

    if (latinBuffer) {
      parts.push(latinBuffer)
      latinBuffer = ''
    }

    if (/\s|[-_]/.test(char)) {
      return
    }

    const codePoint = char.codePointAt(0)
    if (codePoint) {
      parts.push(codePoint.toString(16))
    }
  })

  if (latinBuffer) {
    parts.push(latinBuffer)
  }

  return parts.join('-') || 'doc'
}

function parseDocsRouteFromPathname(pathname) {
  return parseDocsRoute(pathname)
}

function escapeHtml(text) {
  return `${text ?? ''}`
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function renderHighlightedText(text, keyword) {
  if (!keyword) {
    return text
  }

  const source = `${text ?? ''}`
  const lowerSource = source.toLowerCase()
  const lowerKeyword = keyword.toLowerCase()
  const parts = []
  let cursor = 0
  let matchIndex = lowerSource.indexOf(lowerKeyword)

  while (matchIndex !== -1) {
    if (matchIndex > cursor) {
      parts.push(source.slice(cursor, matchIndex))
    }
    const match = source.slice(matchIndex, matchIndex + keyword.length)
    parts.push(
      <span key={`${match}-${matchIndex}`} className="docs-center-highlight">
        {match}
      </span>,
    )
    cursor = matchIndex + keyword.length
    matchIndex = lowerSource.indexOf(lowerKeyword, cursor)
  }

  if (cursor < source.length) {
    parts.push(source.slice(cursor))
  }

  return parts
}

function fallbackSlug(text, sectionSlugMap) {
  const raw = `${text ?? ''}`.trim()
  if (!raw) {
    return 'doc'
  }
  if (sectionSlugMap[raw]) {
    return sectionSlugMap[raw]
  }
  const latin = raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  if (latin) {
    return latin
  }
  return safeIdSegment(raw)
}

function getDocsScrollOffset() {
  const rootStyles = window.getComputedStyle(document.documentElement)
  const navHeight = Number.parseFloat(rootStyles.getPropertyValue('--nav-height')) || 60
  return navHeight + 18
}

function isCatalogLeafClickable(pathKey, staticMetaMap) {
  const meta = staticMetaMap[pathKey]
  return Boolean(meta?.helpContent && meta?.routeSlug)
}

export default function DocsCenterPage({
  currentLocale,
  currentPathname,
  navigateTo,
  docsUiText,
  activeSection,
}) {
  const [heroFilterKeyword, setHeroFilterKeyword] = useState('')
  const preferredDocLanguage = getDocLanguageFromLocale(currentLocale)

  const staticMetaMap = useMemo(() => buildDocsStaticMetaMap(), [])

  const sectionModels = useMemo(
    () => buildHelpCenterSectionModels(helpCenterCatalogEntries, currentLocale),
    [currentLocale],
  )

  const helpCenterMetaMap = useMemo(
    () => buildHelpCenterMetaMap(helpCenterCatalogEntries),
    [],
  )

  const catalogSectionSlugMap = HELP_CENTER_SECTION_SLUG_MAP
  const catalogBlockSlugMap = HELP_CENTER_BLOCK_SLUG_MAP
  const defaultCatalogSection = sectionModels[0]?.title ?? ''

  const displayPathBySourceKey = useMemo(() => {
    const nextMap = new Map()
    sectionModels.forEach((section) => {
      section.blocks.forEach((block) => {
        if (block.title && block.sourceTitle) {
          nextMap.set(
            createDocsPathKey([section.sourceTitle, block.sourceTitle]),
            [section.title, block.title],
          )
        }
        block.items.forEach((item) => {
          const sourceParts = block.sourceTitle
            ? [section.sourceTitle, block.sourceTitle, item.sourceLabel]
            : [section.sourceTitle, item.sourceLabel]
          const displayParts = block.title
            ? [section.title, block.title, item.label]
            : [section.title, item.label]
          nextMap.set(createDocsPathKey(sourceParts), displayParts)
        })
      })
    })
    return nextMap
  }, [sectionModels])

  const heroMatchKeyword = useMemo(
    () => heroFilterKeyword.trim().toLowerCase(),
    [heroFilterKeyword],
  )

  const visibleSections = useMemo(() => {
    if (heroMatchKeyword) {
      return filterSectionsForLeafKeyword(sectionModels, heroMatchKeyword)
    }

    return sectionModels
  }, [heroMatchKeyword, sectionModels])

  const helpDocRouteMap = useMemo(() => {
    const nextMap = new Map()
    Object.values(staticMetaMap).forEach((meta) => {
      if (!meta.helpContent || !meta.routeSlug) {
        return
      }
      const sectionSlug = resolveDocSectionSlug(meta, catalogSectionSlugMap, meta.pathParts, fallbackSlug)
      const blockSlug = resolveDocBlockSlug(meta, catalogBlockSlugMap, fallbackSlug)
      const routeKey = buildHelpDocRouteLookupKey(sectionSlug, blockSlug, meta.routeSlug)
      if (routeKey) {
        nextMap.set(routeKey, meta)
      }
      nextMap.set(`${sectionSlug}/${meta.routeSlug}`, meta)
    })
    return nextMap
  }, [catalogBlockSlugMap, staticMetaMap])

  const parsedRoute = useMemo(() => parseDocsRouteFromPathname(currentPathname), [currentPathname])

  const {
    sectionSlug: routeSectionSlug,
    blockSlug: routeBlockSlug,
    itemSlug: routeItemSlug,
    platformId: routePlatformId,
    detailSectionId: routeDetailSectionId,
    isLegacyFlatRoute,
    isLegacyMissingBlock,
  } = useMemo(() => normalizeDocsRoute(parsedRoute), [parsedRoute])

  const docSectionRouteReverseMap = useMemo(() => {
    const nextMap = new Map()
    Object.values(staticMetaMap).forEach((meta) => {
      if (!meta.sectionRouteSlug) {
        return
      }
      const displayParts = displayPathBySourceKey.get(meta.pathKey) ?? meta.pathParts
      const sectionLabel = displayParts[0] ?? meta.pathParts[0]
      nextMap.set(meta.sectionRouteSlug, sectionLabel)
    })
    return nextMap
  }, [displayPathBySourceKey, staticMetaMap])

  const currentDocMeta =
    (routeSectionSlug && routeItemSlug
      ? helpDocRouteMap.get(buildHelpDocRouteLookupKey(routeSectionSlug, routeBlockSlug, routeItemSlug))
        ?? helpDocRouteMap.get(`${routeSectionSlug}/${routeItemSlug}`)
      : null)
    ?? null

  useEffect(() => {
    if (!isLegacyFlatRoute && !isLegacyMissingBlock) {
      return
    }

    if (isLegacyMissingBlock && !currentDocMeta) {
      return
    }

    const canonicalPath = buildCanonicalDocPath(currentLocale, {
      sectionSlug: routeSectionSlug,
      blockSlug: currentDocMeta
        ? resolveDocBlockSlug(currentDocMeta, catalogBlockSlugMap, fallbackSlug)
        : routeBlockSlug,
      itemSlug: routeItemSlug,
      platformId: routePlatformId,
      detailSectionId: routeDetailSectionId,
    })

    if (canonicalPath !== currentPathname) {
      navigateTo(canonicalPath, { scrollToTop: false })
    }
  }, [
    catalogBlockSlugMap,
    currentDocMeta,
    currentLocale,
    currentPathname,
    isLegacyFlatRoute,
    isLegacyMissingBlock,
    navigateTo,
    routeBlockSlug,
    routeDetailSectionId,
    routeItemSlug,
    routePlatformId,
    routeSectionSlug,
  ])

  useEffect(() => {
    if (!currentDocMeta?.routeSlug || !routeDetailSectionId) {
      return
    }

    if (isDocDetailCommonScopeId(routePlatformId)) {
      return
    }

    if (routePlatformId && isValidDocDetailPlatformId(routePlatformId)) {
      return
    }

    if (!shouldDocDetailSectionUseCommonScope(currentDocMeta.routeSlug, routeDetailSectionId)) {
      return
    }

    const canonicalPath = buildCanonicalDocPath(currentLocale, {
      sectionSlug: routeSectionSlug,
      blockSlug: currentDocMeta
        ? resolveDocBlockSlug(currentDocMeta, catalogBlockSlugMap, fallbackSlug)
        : routeBlockSlug,
      itemSlug: routeItemSlug,
      platformId: DOC_DETAIL_COMMON_SCOPE_SLUG,
      detailSectionId: routeDetailSectionId,
    })

    if (canonicalPath !== currentPathname) {
      navigateTo(canonicalPath, { scrollToTop: false })
    }
  }, [
    catalogBlockSlugMap,
    currentDocMeta,
    currentLocale,
    currentPathname,
    navigateTo,
    routeBlockSlug,
    routeDetailSectionId,
    routeItemSlug,
    routePlatformId,
    routeSectionSlug,
  ])

  const currentDocDisplayParts = currentDocMeta
    ? displayPathBySourceKey.get(currentDocMeta.pathKey) ?? currentDocMeta.pathParts
    : null
  const currentDocAvailableLangs = currentDocMeta?.publishedLangs ?? []
  const displayedDocLanguage = resolveAvailableDocLanguage(currentDocMeta?.helpContent, preferredDocLanguage)
  const displayedDocLanguageLabel = displayedDocLanguage
    ? getDocLanguageLabel(displayedDocLanguage)
    : ''
  const currentDocContent =
    (displayedDocLanguage && currentDocMeta?.helpContent?.[displayedDocLanguage]) || ''
  const currentDocNeedsFallbackNotice =
    Boolean(currentDocMeta?.helpContent)
    && Boolean(displayedDocLanguage)
    && displayedDocLanguage !== preferredDocLanguage
  const currentDocFallbackNoticeHtml =
    currentDocMeta && currentDocNeedsFallbackNotice
      ? `<div class="docs-center-lang-notice">${escapeHtml(
          docsUiText.translationFallbackNotice.replace('{language}', displayedDocLanguageLabel),
        )}</div>`
      : ''

  const currentDocRouteSlug = currentDocMeta
    ? resolveDocRouteSlug(
        currentDocMeta,
        catalogSectionSlugMap,
        currentDocMeta.pathParts,
        fallbackSlug,
        catalogBlockSlugMap,
      )
    : ''
  const isZhContent = `${currentLocale}`.toLowerCase().startsWith('zh')
  const activeBlockTitle = currentDocDisplayParts?.length === 3 ? currentDocDisplayParts[1] : ''
  const [scrollLinkedTarget, setScrollLinkedTarget] = useState(null)
  const [collapsedBlocks, setCollapsedBlocks] = useState(() => new Set())
  const sidebarRef = useRef(null)
  const scrollSpyFrameRef = useRef(0)
  const scrollSpyLockRef = useRef(null)
  const scrollSpyUnlockTimeoutRef = useRef(0)
  const requestScrollSpyUpdateRef = useRef(() => {})
  const scrollToSectionTimeoutRef = useRef(0)
  const suppressRouteSectionScrollRef = useRef(false)
  const resolvedActiveSection =
    scrollLinkedTarget?.sectionTitle
    ?? (sectionModels.some((section) => section.title === activeSection)
      ? activeSection
      : defaultCatalogSection)
  const resolvedActiveBlockTitle = scrollLinkedTarget?.blockTitle ?? activeBlockTitle

  const scrollSpyTargets = useMemo(
    () =>
      visibleSections.flatMap((section) => [
        {
          id: `docs-section-${safeIdSegment(section.title)}`,
          sectionTitle: section.title,
          blockTitle: '',
        },
        ...section.blocks
          .filter((block) => block.title)
          .map((block) => ({
            id: `docs-block-${safeIdSegment(section.title)}-${safeIdSegment(block.title)}`,
            sectionTitle: section.title,
            blockTitle: block.title,
          })),
      ]),
    [visibleSections],
  )

  useEffect(() => {
    return () => {
      if (scrollSpyUnlockTimeoutRef.current) {
        window.clearTimeout(scrollSpyUnlockTimeoutRef.current)
        scrollSpyUnlockTimeoutRef.current = 0
      }
      if (scrollToSectionTimeoutRef.current) {
        window.clearTimeout(scrollToSectionTimeoutRef.current)
        scrollToSectionTimeoutRef.current = 0
      }
    }
  }, [])

  useEffect(() => {
    if (scrollSpyLockRef.current) {
      return
    }

    const sectionTitle = sectionModels.some((section) => section.title === activeSection)
      ? activeSection
      : defaultCatalogSection

    setScrollLinkedTarget((previous) => {
      // Catalog pages have no leaf route; keep scroll-spy L2 highlight when only the section slug changes.
      if (!activeBlockTitle && previous?.blockTitle) {
        if (!previous.sectionTitle || previous.sectionTitle === sectionTitle) {
          return previous
        }
      }

      if (
        previous?.sectionTitle === sectionTitle
        && previous?.blockTitle === activeBlockTitle
      ) {
        return previous
      }

      return {
        sectionTitle,
        blockTitle: activeBlockTitle,
      }
    })
  }, [activeBlockTitle, activeSection, defaultCatalogSection, sectionModels])

  const detailOverlayWasOpenRef = useRef(false)

  useEffect(() => {
    if (!currentDocMeta) {
      detailOverlayWasOpenRef.current = false
      return undefined
    }

    if (!detailOverlayWasOpenRef.current) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      detailOverlayWasOpenRef.current = true
    }

    return undefined
  }, [currentDocMeta?.pathKey, currentDocMeta])

  useEffect(() => {
    requestScrollSpyUpdateRef.current = () => {}
    if (currentDocMeta || !scrollSpyTargets.length) {
      if (scrollSpyUnlockTimeoutRef.current) {
        window.clearTimeout(scrollSpyUnlockTimeoutRef.current)
        scrollSpyUnlockTimeoutRef.current = 0
      }
      return undefined
    }

    function clearPendingScrollSpyUnlock() {
      if (!scrollSpyUnlockTimeoutRef.current) {
        return
      }
      window.clearTimeout(scrollSpyUnlockTimeoutRef.current)
      scrollSpyUnlockTimeoutRef.current = 0
    }

    function scheduleScrollSpyUpdate() {
      if (scrollSpyFrameRef.current) {
        return
      }
      scrollSpyFrameRef.current = window.requestAnimationFrame(() => {
        scrollSpyFrameRef.current = 0
        updateScrollLinkedTarget()
      })
    }

    function scheduleScrollSpyUnlock() {
      clearPendingScrollSpyUnlock()
      scrollSpyUnlockTimeoutRef.current = window.setTimeout(() => {
        scrollSpyUnlockTimeoutRef.current = 0
        scrollSpyLockRef.current = null
        scheduleScrollSpyUpdate()
      }, 140)
    }

    function updateScrollLinkedTarget() {
      const scrollOffset = getDocsScrollOffset()
      const lockedTarget = scrollSpyLockRef.current

      if (lockedTarget) {
        const lockedElement = document.getElementById(lockedTarget.targetId)
        const reachedTarget = lockedElement
          ? Math.abs(lockedElement.getBoundingClientRect().top - scrollOffset) <= 8
          : true
        const reachedPageEnd =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
        const lockExpired = window.performance.now() - lockedTarget.startedAt >= 2200

        if (!reachedTarget && !reachedPageEnd && !lockExpired) {
          clearPendingScrollSpyUnlock()
          return
        }

        scheduleScrollSpyUnlock()
        return
      }

      clearPendingScrollSpyUnlock()

      let crossedTarget = null

      scrollSpyTargets.forEach((target) => {
        const element = document.getElementById(target.id)
        if (!element) {
          return
        }
        if (element.getBoundingClientRect().top - scrollOffset <= 1) {
          crossedTarget = target
        }
      })

      // Prefer L2 block highlight: page top / section headers alone should not
      // leave the parent purple without an active secondary item.
      let nextActiveTarget =
        crossedTarget
        ?? scrollSpyTargets.find((target) => target.blockTitle)
        ?? scrollSpyTargets[0]

      if (nextActiveTarget && !nextActiveTarget.blockTitle) {
        const firstBlockInSection = scrollSpyTargets.find(
          (target) =>
            target.sectionTitle === nextActiveTarget.sectionTitle && target.blockTitle,
        )
        if (firstBlockInSection) {
          nextActiveTarget = firstBlockInSection
        }
      }

      setScrollLinkedTarget((previousTarget) => {
        if (
          previousTarget?.sectionTitle === nextActiveTarget.sectionTitle
          && previousTarget?.blockTitle === nextActiveTarget.blockTitle
        ) {
          return previousTarget
        }
        return nextActiveTarget
      })
    }

    requestScrollSpyUpdateRef.current = scheduleScrollSpyUpdate

    scheduleScrollSpyUpdate()
    window.addEventListener('scroll', scheduleScrollSpyUpdate, { passive: true })
    window.addEventListener('resize', scheduleScrollSpyUpdate)

    return () => {
      requestScrollSpyUpdateRef.current = () => {}
      clearPendingScrollSpyUnlock()
      window.removeEventListener('scroll', scheduleScrollSpyUpdate)
      window.removeEventListener('resize', scheduleScrollSpyUpdate)
      if (scrollSpyFrameRef.current) {
        window.cancelAnimationFrame(scrollSpyFrameRef.current)
        scrollSpyFrameRef.current = 0
      }
    }
  }, [currentDocMeta, scrollSpyTargets])

  useEffect(() => {
    const sidebarElement = sidebarRef.current
    if (!sidebarElement) {
      return
    }

    const activeNode =
      sidebarElement.querySelector('.docs-center-toc-child.active')
      ?? sidebarElement.querySelector('.docs-center-toc-parent-btn.active')

    if (!activeNode) {
      return
    }

    const sidebarRect = sidebarElement.getBoundingClientRect()
    const activeRect = activeNode.getBoundingClientRect()
    const buffer = 8

    if (activeRect.top < sidebarRect.top + buffer) {
      sidebarElement.scrollTop -= sidebarRect.top + buffer - activeRect.top
    } else if (activeRect.bottom > sidebarRect.bottom - buffer) {
      sidebarElement.scrollTop += activeRect.bottom - (sidebarRect.bottom - buffer)
    }
  }, [resolvedActiveBlockTitle, resolvedActiveSection, sectionModels])

  const navigatePreservingScroll = useCallback((targetPath) => {
    navigateTo(targetPath, { scrollToTop: false })
  }, [navigateTo])

  const resolveSectionTitleFromSlug = useCallback(
    (sectionSlug) => {
      const sourceSectionTitle = Object.entries(catalogSectionSlugMap).find(
        ([, slug]) => slug === sectionSlug,
      )?.[0]
      const sectionTitle =
        sectionModels.find((section) => section.sourceTitle === sourceSectionTitle)?.title
        ?? sourceSectionTitle
        ?? docSectionRouteReverseMap.get(sectionSlug)
        ?? ''

      if (!sectionTitle) {
        return ''
      }

      return sectionModels.some((section) => section.title === sectionTitle) ? sectionTitle : ''
    },
    [catalogSectionSlugMap, docSectionRouteReverseMap, sectionModels],
  )

  const handleScrollToSection = useCallback((sectionTitle, blockTitle = '') => {
    const targetId = blockTitle
      ? `docs-block-${safeIdSegment(sectionTitle)}-${safeIdSegment(blockTitle)}`
      : `docs-section-${safeIdSegment(sectionTitle)}`

    if (scrollSpyUnlockTimeoutRef.current) {
      window.clearTimeout(scrollSpyUnlockTimeoutRef.current)
      scrollSpyUnlockTimeoutRef.current = 0
    }

    if (scrollToSectionTimeoutRef.current) {
      window.clearTimeout(scrollToSectionTimeoutRef.current)
      scrollToSectionTimeoutRef.current = 0
    }

    scrollSpyLockRef.current = {
      targetId,
      sectionTitle,
      blockTitle,
      startedAt: window.performance.now(),
    }

    setScrollLinkedTarget({
      sectionTitle,
      blockTitle,
    })

    const attemptScroll = (attempt = 0) => {
      scrollToSectionTimeoutRef.current = 0
      const target = document.getElementById(targetId)
      if (!target) {
        if (attempt < 12) {
          scrollToSectionTimeoutRef.current = window.setTimeout(() => {
            attemptScroll(attempt + 1)
          }, 40)
          return
        }
        scrollSpyLockRef.current = null
        return
      }
      const scrollTop = target.getBoundingClientRect().top + window.scrollY - getDocsScrollOffset()
      window.scrollTo({ top: Math.max(0, scrollTop), behavior: 'smooth' })
      requestScrollSpyUpdateRef.current()
    }

    scrollToSectionTimeoutRef.current = window.setTimeout(() => {
      attemptScroll(0)
    }, 40)
  }, [])

  const scrollToSectionBySlug = useCallback(
    (sectionSlug) => {
      const sectionTitle = resolveSectionTitleFromSlug(sectionSlug)
      if (!sectionTitle) {
        return false
      }
      handleScrollToSection(sectionTitle)
      return true
    },
    [handleScrollToSection, resolveSectionTitleFromSlug],
  )

  const handleCatalogSectionNavigate = (sectionTitle) => {
    const section = sectionModels.find((item) => item.title === sectionTitle)
    const sourceTitle = section?.sourceTitle ?? sectionTitle
    const sectionSlug =
      catalogSectionSlugMap[sourceTitle] ?? fallbackSlug(sourceTitle, catalogSectionSlugMap)
    suppressRouteSectionScrollRef.current = true
    navigatePreservingScroll(getLocaleDocsPath(currentLocale, sectionSlug))
    handleScrollToSection(sectionTitle)
  }

  const handleCatalogBlockNavigate = (sectionTitle, blockTitle) => {
    const section = sectionModels.find((item) => item.title === sectionTitle)
    const sourceTitle = section?.sourceTitle ?? sectionTitle
    const sectionSlug =
      catalogSectionSlugMap[sourceTitle] ?? fallbackSlug(sourceTitle, catalogSectionSlugMap)
    suppressRouteSectionScrollRef.current = true
    navigatePreservingScroll(getLocaleDocsPath(currentLocale, sectionSlug))
    handleScrollToSection(sectionTitle, blockTitle)
  }

  useEffect(() => {
    if (!routeSectionSlug || routeItemSlug || currentDocMeta) {
      return
    }

    if (suppressRouteSectionScrollRef.current) {
      suppressRouteSectionScrollRef.current = false
      return
    }

    scrollToSectionBySlug(routeSectionSlug)
  }, [routeSectionSlug, routeItemSlug, currentDocMeta, scrollToSectionBySlug])

  useEffect(() => {
    const handleScrollRequest = (event) => {
      const sectionSlug = `${event?.detail?.sectionSlug ?? ''}`.trim() || routeSectionSlug
      if (!sectionSlug || routeItemSlug || currentDocMeta) {
        return
      }
      scrollToSectionBySlug(sectionSlug)
    }

    window.addEventListener(DOCS_CENTER_SCROLL_TO_SECTION_EVENT, handleScrollRequest)
    return () => {
      window.removeEventListener(DOCS_CENTER_SCROLL_TO_SECTION_EVENT, handleScrollRequest)
    }
  }, [currentDocMeta, routeItemSlug, routeSectionSlug, scrollToSectionBySlug])

  const handleDocDetailRouteChange = useCallback(({ platformId = '', detailSectionId = '' } = {}) => {
    if (!currentDocRouteSlug) {
      return
    }

    navigatePreservingScroll(
      getLocaleDocsPath(
        currentLocale,
        currentDocRouteSlug,
        platformId,
        detailSectionId,
      ),
    )
  }, [currentDocRouteSlug, currentLocale, navigatePreservingScroll])

  const handleNodeClick = (sourcePathParts) => {
    const pathKey = createDocsPathKey(sourcePathParts)
    const meta = staticMetaMap[pathKey]

    if (!meta?.helpContent || !meta?.routeSlug) {
      return
    }

    const docPathSlug = resolveDocRouteSlug(meta, catalogSectionSlugMap, meta.pathParts, fallbackSlug, catalogBlockSlugMap)
    navigatePreservingScroll(getLocaleDocsPath(currentLocale, docPathSlug))
  }

  const {
    comboboxRef: heroSearchComboboxRef,
    searchKeyword: heroSearchKeyword,
    setSearchKeyword: setHeroSearchKeyword,
    isDropdownOpen: isHeroSearchDropdownOpen,
    setIsDropdownOpen: setHeroSearchDropdownOpen,
    keyword: heroSearchMatchKeyword,
    results: heroSearchResults,
    handleSelectResult: handleHeroSearchSelect,
  } = useDocsCatalogSidebarSearch({
    sectionModels,
    staticMetaMap,
    searchScope: 'leaf',
    onLeafSelect: (_section, _block, sourcePathParts) => {
      handleNodeClick(sourcePathParts)
    },
    onBlockSelect: handleCatalogBlockNavigate,
  })

  const isHeroSearchResetMode = Boolean(heroMatchKeyword) && !heroSearchMatchKeyword

  const handleHeroSearch = () => {
    if (isHeroSearchResetMode) {
      setHeroFilterKeyword('')
      setHeroSearchDropdownOpen(false)
      return
    }

    if (heroSearchMatchKeyword && !heroSearchResults.length) {
      return
    }

    setHeroFilterKeyword(heroSearchKeyword)
    setHeroSearchDropdownOpen(false)
  }

  const handleHeroSearchClear = useCallback(() => {
    setHeroFilterKeyword('')
    setHeroSearchDropdownOpen(false)
  }, [setHeroSearchDropdownOpen])

  const handleBreadcrumbRootClick = () => {
    navigateTo(getLocaleDocsPath(currentLocale))
  }

  const {
    isMobile,
    rightOpen,
    toggleRight,
    openRight,
    closeAll,
  } = useDocDetailMobileDrawers()

  const showMobileCatalogDrawer = isMobile && !currentDocMeta

  useDocDetailMobileDrawerSwipe({
    enabled: showMobileCatalogDrawer,
    isMobile,
    rightOpen,
    showRight: true,
    openRight,
    closeAll,
  })

  useEffect(() => {
    closeAll()
  }, [closeAll, currentDocMeta])

  const handleCatalogBlockNavigateMobile = useCallback((sectionTitle, blockTitle) => {
    if (blockTitle) {
      setCollapsedBlocks((previous) => {
        const next = new Set(previous)
        next.delete(buildMobileCatalogBlockKey(sectionTitle, blockTitle))
        return next
      })
    }
    handleCatalogBlockNavigate(sectionTitle, blockTitle)
    closeAll()
  }, [closeAll, handleCatalogBlockNavigate])

  const toggleCatalogBlock = useCallback((sectionTitle, blockTitle) => {
    // 对齐官网：仅移动端可折叠；PC 始终展开
    if (!isMobile) return
    const blockKey = buildMobileCatalogBlockKey(sectionTitle, blockTitle)
    setCollapsedBlocks((previous) => {
      const next = new Set(previous)
      if (next.has(blockKey)) {
        next.delete(blockKey)
      } else {
        next.add(blockKey)
      }
      return next
    })
  }, [isMobile])

  const [mobileCatalogSync, setMobileCatalogSync] = useState(isMobile)
  if (mobileCatalogSync !== isMobile) {
    setMobileCatalogSync(isMobile)
    if (!isMobile) {
      setCollapsedBlocks(new Set())
    }
  }

  const catalogSidebar = (
    <DocsDetailCatalogSidebar
      ref={sidebarRef}
      sectionModels={visibleSections}
      staticMetaMap={staticMetaMap}
      helpCenterMetaMap={helpCenterMetaMap}
      activeSectionTitle={resolvedActiveSection}
      activeBlockKey={
        resolvedActiveBlockTitle
          ? `${resolvedActiveSection}::${resolvedActiveBlockTitle}`
          : ''
      }
      directoryTitle={docsUiText.directoryTitle}
      sidebarClassName="docs-center-sidebar"
      showLeafNodes={false}
      searchMode="none"
      expandAllVisibleSections={Boolean(heroMatchKeyword)}
      expandSectionsOnClickOnly={showMobileCatalogDrawer}
      onDrawerClose={showMobileCatalogDrawer ? closeAll : undefined}
      drawerCloseLabel={isZhContent ? '关闭目录' : 'Close directory'}
      drawerCloseSide={showMobileCatalogDrawer ? 'right' : 'left'}
      onSectionNavigate={showMobileCatalogDrawer ? undefined : handleCatalogSectionNavigate}
      onBlockNavigate={showMobileCatalogDrawer ? handleCatalogBlockNavigateMobile : handleCatalogBlockNavigate}
    />
  )

  const leftDrawerLabel = isZhContent ? '功能目录' : 'Directory'
  const leftDrawerHint = isZhContent ? '展开功能目录' : 'Open feature directory'

  return (
    <div
      className={`docs-center-page${
        currentDocMeta ? ' docs-center-page--detail-open' : ''
      }${showMobileCatalogDrawer ? ' docs-center-page--mobile-drawer' : ''}${
        showMobileCatalogDrawer && rightOpen ? ' has-mobile-drawer-open' : ''
      }`}
    >
      <div className="docs-center-top-wrap">
        <div className="docs-center-bg-layer" aria-hidden="true">
          <div className="docs-center-bg-image" />
          <div className="docs-center-bg-fade" />
        </div>

        <div className="docs-center-top-content">
          <section className="docs-center-hero">
            <h1 className="docs-center-hero-title">{docsUiText.heroTitle}</h1>
            <DocsCenterHeroSearch
              comboboxRef={heroSearchComboboxRef}
              searchKeyword={heroSearchKeyword}
              onSearchKeywordChange={setHeroSearchKeyword}
              isDropdownOpen={isHeroSearchDropdownOpen}
              onDropdownOpenChange={setHeroSearchDropdownOpen}
              searchPlaceholder={docsUiText.heroSearchPlaceholder}
              searchButtonLabel={
                isHeroSearchResetMode
                  ? docsUiText.heroSearchResetButton
                  : docsUiText.heroSearchButton
              }
              isResetMode={isHeroSearchResetMode}
              searchSrOnly={docsUiText.searchSrOnly}
              emptyResultsText={docsUiText.heroSearchEmptyResults}
              keyword={heroSearchMatchKeyword}
              results={heroSearchResults}
              onSelectResult={handleHeroSearchSelect}
              onSubmitSearch={handleHeroSearch}
              onSearchClear={handleHeroSearchClear}
            />
          </section>

          {showMobileCatalogDrawer ? (
            <>
              {rightOpen ? (
                <button
                  type="button"
                  className="docs-detail-mobile-drawer-backdrop"
                  aria-label={isZhContent ? '关闭目录' : 'Close directory'}
                  onClick={closeAll}
                />
              ) : null}
              <DocDetailMobileDrawer
                side="right"
                isOpen={rightOpen}
                isMobile={isMobile}
                onClose={closeAll}
                panelLabel={docsUiText.directoryTitle}
                showPanelHead={false}
              >
                {catalogSidebar}
              </DocDetailMobileDrawer>
            </>
          ) : null}

          <main className="docs-center-layout">
            <div className="docs-center-main-card">
              {showMobileCatalogDrawer ? null : catalogSidebar}

              <section className="docs-center-content">
                {visibleSections.length ? (
                  visibleSections.map((section) => (
                    <article
                      key={`catalog-${section.title}`}
                      id={`docs-section-${safeIdSegment(section.title)}`}
                      className="docs-center-section"
                    >
                      <h2 className="docs-center-section-title">{section.title}</h2>
                      <div className="docs-center-section-body">
                        {section.blocks.map((block, blockIndex) => {
                          const hasTitledGroup = Boolean(block.title)
                          const blockKey = hasTitledGroup
                            ? buildMobileCatalogBlockKey(section.title, block.title)
                            : ''
                          const isBlockExpanded =
                            !hasTitledGroup
                            || !isMobile
                            || !collapsedBlocks.has(blockKey)

                          return (
                            <div
                              key={`docs-block-${section.title}-${block.title || blockIndex}`}
                              id={
                                hasTitledGroup
                                  ? `docs-block-${safeIdSegment(section.title)}-${safeIdSegment(block.title)}`
                                  : undefined
                              }
                              className={
                                hasTitledGroup
                                  ? `docs-center-group-wrap${isBlockExpanded ? ' is-expanded' : ''}`
                                  : 'docs-center-group-wrap docs-center-group-wrap--flat'
                              }
                            >
                              {hasTitledGroup ? (
                                <section
                                  className={`docs-center-group${
                                    isBlockExpanded ? ' is-expanded' : ' is-collapsed'
                                  }`}
                                >
                                  {isMobile ? (
                                    <button
                                      type="button"
                                      className="docs-center-group-title docs-center-group-title-btn"
                                      aria-expanded={isBlockExpanded}
                                      onClick={() => toggleCatalogBlock(section.title, block.title)}
                                    >
                                      <span className="docs-center-group-title-text">
                                        {block.title}
                                      </span>
                                      {isBlockExpanded ? (
                                        <ChevronUp
                                          size={16}
                                          strokeWidth={1.5}
                                          className="docs-center-group-collapse-icon"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <ChevronDown
                                          size={16}
                                          strokeWidth={1.5}
                                          className="docs-center-group-collapse-icon"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </button>
                                  ) : (
                                    <div className="docs-center-group-title">
                                      <span className="docs-center-group-title-text">
                                        {block.title}
                                      </span>
                                    </div>
                                  )}
                                  {isBlockExpanded ? (
                                    <ul className="docs-center-items">
                                      {block.items.map((item) => {
                                        const sourcePathParts = [
                                          section.sourceTitle,
                                          block.sourceTitle,
                                          item.sourceLabel,
                                        ]
                                        const pathKey = createDocsPathKey(sourcePathParts)
                                        const isClickable = isCatalogLeafClickable(
                                          pathKey,
                                          staticMetaMap,
                                        )
                                        return (
                                          <li key={pathKey} className="docs-center-item-wrap">
                                            {isClickable ? (
                                              <button
                                                type="button"
                                                className="docs-center-item has-doc"
                                                onClick={() => handleNodeClick(sourcePathParts)}
                                              >
                                                {renderHighlightedText(item.label, heroMatchKeyword)}
                                              </button>
                                            ) : (
                                              <span className="docs-center-item">
                                                {renderHighlightedText(item.label, heroMatchKeyword)}
                                              </span>
                                            )}
                                          </li>
                                        )
                                      })}
                                    </ul>
                                  ) : null}
                                </section>
                              ) : (
                                <ul
                                  className={`docs-center-items docs-center-items--flat${
                                    blockIndex > 0 ? ' docs-center-items--spaced' : ''
                                  }`}
                                >
                                  {block.items.map((item) => {
                                    const sourcePathParts = [
                                      section.sourceTitle,
                                      item.sourceLabel,
                                    ]
                                    const pathKey = createDocsPathKey(sourcePathParts)
                                    const isClickable = isCatalogLeafClickable(
                                      pathKey,
                                      staticMetaMap,
                                    )
                                    return (
                                      <li key={pathKey} className="docs-center-item-wrap">
                                        {isClickable ? (
                                          <button
                                            type="button"
                                            className="docs-center-item has-doc"
                                            onClick={() => handleNodeClick(sourcePathParts)}
                                          >
                                            {renderHighlightedText(item.label, heroMatchKeyword)}
                                          </button>
                                        ) : (
                                          <span className="docs-center-item">
                                            {renderHighlightedText(item.label, heroMatchKeyword)}
                                          </span>
                                        )}
                                      </li>
                                    )
                                  })}
                                </ul>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </article>
                  ))
                ) : (
                  <article className="docs-center-section">
                    <h2 className="docs-center-section-title">
                      {heroMatchKeyword
                        ? docsUiText.heroSearchResultsTitle
                        : docsUiText.directoryTitle}
                    </h2>
                    <div className="docs-center-section-body">
                      <p className="docs-center-empty">
                        {heroMatchKeyword
                          ? docsUiText.heroSearchNoResults.replace(
                              '{keyword}',
                              heroFilterKeyword.trim(),
                            )
                          : docsUiText.noResults}
                      </p>
                    </div>
                  </article>
                )}
              </section>
            </div>
          </main>
        </div>
      </div>

      <div className="docs-center-float-actions">
        {showMobileCatalogDrawer ? (
          <button
            type="button"
            className={`docs-center-float-catalog-btn${rightOpen ? ' is-active' : ''}`}
            aria-label={`${leftDrawerHint}: ${leftDrawerLabel}`}
            aria-expanded={rightOpen}
            title={`${leftDrawerHint}: ${leftDrawerLabel}`}
            onClick={toggleRight}
          >
            <ListTree size={20} strokeWidth={2.2} aria-hidden="true" />
          </button>
        ) : null}
        <button
          type="button"
          aria-label={docsUiText.backToTopAriaLabel}
          title={docsUiText.backToTopAriaLabel}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      </div>

      <div className={`docs-center-overlay${currentDocMeta ? ' open' : ''}`}>
        {currentDocMeta ? (
          currentDocAvailableLangs.length ? (
            <DocDetailOverlayMain
              routeSlug={currentDocMeta.routeSlug}
              docContent={currentDocContent}
              docLanguage={displayedDocLanguage}
              isZhContent={isZhContent}
              sidebarTitle={docsUiText.docDetailTocSidebarTitle}
              articleBreadcrumbAriaLabel={docsUiText.articleBreadcrumbAriaLabel}
              emptyDocContentText={docsUiText.emptyDocContent}
              fallbackNoticeHtml={currentDocFallbackNoticeHtml}
              docDisplayParts={currentDocDisplayParts ?? []}
              breadcrumbRootLabel={docsUiText.heroTitle}
              onBreadcrumbRootClick={handleBreadcrumbRootClick}
              routePlatformId={routePlatformId}
              routeDetailSectionId={routeDetailSectionId}
              onDocRouteChange={handleDocDetailRouteChange}
              sectionModels={sectionModels}
              staticMetaMap={staticMetaMap}
              helpCenterMetaMap={helpCenterMetaMap}
              activeDocPathKey={currentDocMeta.pathKey}
              catalogDirectoryTitle={docsUiText.directoryTitle}
              catalogSearchPlaceholder={docsUiText.sidebarSearchPlaceholder}
              catalogSearchEmptyText={docsUiText.noResults}
              onCatalogLeafClick={handleNodeClick}
              onCatalogSectionNavigate={handleCatalogSectionNavigate}
              backToTopAriaLabel={docsUiText.backToTopAriaLabel}
            />
          ) : (
            <div className="docs-center-overlay-body">
              <p className="docs-center-empty">{docsUiText.unpublishedDoc}</p>
            </div>
          )
        ) : null}
      </div>
    </div>
  )
}
