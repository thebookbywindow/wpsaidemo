import { DOC_DETAIL_TOC_SECTIONS_EN, DOC_DETAIL_TOC_SECTIONS_ZH } from '../data/docDetailTocData'

export const STRUCTURED_DOC_ROUTE_SLUGS = new Set([
  'wps-writer',
  'install-sign-in',
  'create-document',
  'ai-read-aloud',
  'share-after-compression',
])

const DOC_DETAIL_SECTION_HEADINGS = {
  'zh-cn': Object.fromEntries(DOC_DETAIL_TOC_SECTIONS_ZH.map((item) => [item.id, item.label])),
  'zh-tw': {
    'product-updates': '產品更新 / 發行說明',
    'features-overview': '功能概述',
    'plans-pricing': '方案與定價',
    'getting-started': '快速入門',
    'how-to-guide': '操作指南',
    faq: '常見問題',
    notes: '注意事項',
    glossary: '術語表',
    'related-resources': '相關資源',
  },
  'en-us': Object.fromEntries(DOC_DETAIL_TOC_SECTIONS_EN.map((item) => [item.id, item.label])),
  'ja-jp': {
    'product-updates': '製品アップデート / リリースノート',
    'features-overview': '機能概要',
    'plans-pricing': 'プランと料金',
    'getting-started': 'はじめに',
    'how-to-guide': '操作ガイド',
    faq: 'よくある質問',
    notes: '注意事項',
    glossary: '用語集',
    'related-resources': '関連リソース',
  },
  'ko-kr': {
    'product-updates': '제품 업데이트 / 릴리스 노트',
    'features-overview': '기능 개요',
    'plans-pricing': '요금제 및 가격',
    'getting-started': '시작하기',
    'how-to-guide': '사용 가이드',
    faq: '자주 묻는 질문',
    notes: '주의사항',
    glossary: '용어집',
    'related-resources': '관련 리소스',
  },
  'es-mx': {
    'product-updates': 'Actualizaciones / Notas de version',
    'features-overview': 'Descripcion general de funciones',
    'plans-pricing': 'Planes y precios',
    'getting-started': 'Primeros pasos',
    'how-to-guide': 'Guia de procedimientos',
    faq: 'Preguntas frecuentes',
    notes: 'Notas',
    glossary: 'Glosario',
    'related-resources': 'Recursos relacionados',
  },
}

function getSectionHeadings(docLang) {
  return DOC_DETAIL_SECTION_HEADINGS[docLang] ?? DOC_DETAIL_SECTION_HEADINGS['en-us']
}

function splitMarkdownSections(markdown) {
  const sections = new Map()
  const lines = `${markdown ?? ''}`.split('\n')
  let currentTitle = ''
  let buffer = []

  lines.forEach((line) => {
    const headingMatch = line.match(/^## (.+)$/)
    if (headingMatch) {
      if (currentTitle) {
        sections.set(currentTitle, buffer.join('\n').trim())
      }
      currentTitle = headingMatch[1].trim()
      buffer = []
      return
    }
    buffer.push(line)
  })

  if (currentTitle) {
    sections.set(currentTitle, buffer.join('\n').trim())
  }

  return sections
}

export function supportsStructuredDocSections(routeSlug, markdown, docLang) {
  if (!STRUCTURED_DOC_ROUTE_SLUGS.has(routeSlug) || !markdown) {
    return false
  }

  const headings = getSectionHeadings(docLang)
  const sections = splitMarkdownSections(markdown)
  return Object.values(headings).some((title) => sections.has(title))
}

export function extractDocDetailSection(markdown, sectionId, docLang) {
  const headings = getSectionHeadings(docLang)
  const sectionTitle = headings[sectionId]
  if (!sectionTitle || !markdown) {
    return markdown ?? ''
  }

  const sections = splitMarkdownSections(markdown)
  return sections.get(sectionTitle) ?? ''
}

export function getDocDetailSectionLabel(sectionId, docLang) {
  const headings = getSectionHeadings(docLang)
  return headings[sectionId] ?? sectionId
}

export function extractDocFeatureSummaryIntro(markdown, docLang) {
  const summaryBody = extractDocDetailSection(markdown, 'features-overview', docLang)
  if (!summaryBody) {
    return ''
  }

  const introLines = []
  for (const line of summaryBody.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) {
      if (introLines.length > 0) {
        break
      }
      continue
    }
    if (trimmed.startsWith('-')) {
      break
    }
    introLines.push(trimmed)
  }

  return introLines.join(' ').trim()
}

function truncatePreviewText(text, maxLength = 96) {
  const normalized = `${text ?? ''}`.replace(/\s+/g, ' ').trim()
  if (!normalized) {
    return ''
  }

  if (normalized.length <= maxLength) {
    return normalized
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`
}

function stripMarkdownInline(text) {
  return `${text ?? ''}`
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim()
}

export function extractDocFeatureSummaryCapabilities(markdown, docLang) {
  const summaryBody = extractDocDetailSection(markdown, 'features-overview', docLang)
  if (!summaryBody) {
    return []
  }

  return summaryBody
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('-'))
    .map((line) => stripMarkdownInline(line.replace(/^-\s*/, '')))
    .filter(Boolean)
}

export function extractDocDetailMetaLine(markdown) {
  const blockquoteMatch = `${markdown ?? ''}`.match(/^>\s*(.+)$/m)
  return blockquoteMatch?.[1]?.trim() ?? ''
}

export function extractDocDetailSectionPreview(markdown, sectionId, docLang, maxLength = 96) {
  const body = extractDocDetailSection(markdown, sectionId, docLang)
  if (!body) {
    return ''
  }

  const lines = body.split('\n').map((line) => line.trim()).filter(Boolean)

  for (const line of lines) {
    if (line.startsWith('### ')) {
      const heading = stripMarkdownInline(line.replace(/^###\s+/, ''))
      const headingIndex = lines.indexOf(line)
      const nextLine = lines[headingIndex + 1]
      if (nextLine && !nextLine.startsWith('#')) {
        return truncatePreviewText(`${heading} — ${stripMarkdownInline(nextLine)}`, maxLength)
      }
      return truncatePreviewText(heading, maxLength)
    }

    if (line.startsWith('- **')) {
      const question = line.match(/^-\s*\*\*(.+?)\*\*/)?.[1]
      if (question) {
        return truncatePreviewText(stripMarkdownInline(question), maxLength)
      }
    }

    if (line.startsWith('- ')) {
      const item = stripMarkdownInline(line.replace(/^-\s*/, ''))
      if (item && !item.startsWith('[')) {
        return truncatePreviewText(item, maxLength)
      }
    }

    if (/^\d+\.\s/.test(line)) {
      return truncatePreviewText(stripMarkdownInline(line.replace(/^\d+\.\s*/, '')), maxLength)
    }

    if (!line.startsWith('**') && !line.startsWith('>')) {
      return truncatePreviewText(stripMarkdownInline(line), maxLength)
    }
  }

  return ''
}

export function buildDocDetailSectionMarkdown({
  markdown,
  sectionId,
  docLang,
}) {
  const sectionBody = extractDocDetailSection(markdown, sectionId, docLang)
  if (!sectionBody) {
    return markdown ?? ''
  }

  const headings = getSectionHeadings(docLang)
  const sectionTitle = headings[sectionId] ?? sectionId

  return `## ${sectionTitle}\n\n${sectionBody}`
}

const DOC_DETAIL_UPDATED_PATTERNS = [
  /更新日期[：:]\s*([^|]+)/,
  /Last Updated:\s*([^|]+)/i,
  /更新日[：:]\s*([^|]+)/,
  /업데이트:\s*([^|]+)/,
  /Actualizado:\s*([^|]+)/i,
]

export function extractDocDetailUpdatedAt(markdown) {
  if (!markdown) {
    return ''
  }

  const blockquoteMatch = markdown.match(/^>\s*(.+)$/m)
  if (!blockquoteMatch) {
    return ''
  }

  const metaLine = blockquoteMatch[1]

  for (const pattern of DOC_DETAIL_UPDATED_PATTERNS) {
    const match = metaLine.match(pattern)
    if (match) {
      return match[1].trim()
    }
  }

  return ''
}

export function getDocDetailUpdatedLabel(isZhContent) {
  return isZhContent ? '最近更新：' : 'Last updated: '
}

export function getDocDetailSectionElementId(sectionId) {
  return `doc-detail-section-${sectionId}`
}

function escapeRegExp(text) {
  return `${text ?? ''}`.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export function injectDocDetailSectionAnchors(html, docLang) {
  if (!html) {
    return html
  }

  const headings = getSectionHeadings(docLang)
  let result = html

  Object.entries(headings).forEach(([sectionId, title]) => {
    const anchorId = getDocDetailSectionElementId(sectionId)
    result = result.replace(
      new RegExp(`<h2>${escapeRegExp(title)}</h2>`, 'g'),
      `<h2 id="${anchorId}" class="docs-detail-platform-section-heading" data-doc-section="${sectionId}">${title}</h2>`,
    )
  })

  return result
}

export function getDocDetailScrollOffset() {
  if (typeof window === 'undefined') {
    return 72
  }

  const rootStyles = window.getComputedStyle(document.documentElement)
  const navHeight = Number.parseFloat(rootStyles.getPropertyValue('--nav-height')) || 60

  return navHeight + 12
}

export function syncDocDetailScrollOffsetVar() {
  const offset = getDocDetailScrollOffset()

  if (typeof document !== 'undefined') {
    document.documentElement.style.setProperty('--docs-detail-scroll-offset', `${offset}px`)
  }

  return offset
}

export function scrollToDocDetailSection(sectionId, attempt = 0) {
  syncDocDetailScrollOffsetVar()

  const elementId = getDocDetailSectionElementId(sectionId)
  const element =
    document.getElementById(elementId)
    ?? document.querySelector(`[data-doc-section="${sectionId}"]`)

  if (!element) {
    if (attempt < 8) {
      window.requestAnimationFrame(() => scrollToDocDetailSection(sectionId, attempt + 1))
    }
    return
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function scrollDocDetailPanelToTop(attempt = 0) {
  const panel = document.querySelector('.docs-detail-article-panel')
  const catalogSidebar = document.querySelector('.docs-detail-catalog-sidebar')

  if (!panel) {
    if (attempt < 10) {
      window.requestAnimationFrame(() => scrollDocDetailPanelToTop(attempt + 1))
    }
    return
  }

  const panelTop = panel.getBoundingClientRect().top
  const alignTop = catalogSidebar
    ? catalogSidebar.getBoundingClientRect().top
    : panelTop
  const delta = panelTop - alignTop

  if (Math.abs(delta) > 1) {
    window.scrollTo({ top: Math.max(0, window.scrollY + delta), behavior: 'auto' })
  }

  if (attempt >= 10) {
    return
  }

  window.requestAnimationFrame(() => {
    const panelAfter = document.querySelector('.docs-detail-article-panel')
    const sidebarAfter = document.querySelector('.docs-detail-catalog-sidebar')
    if (!panelAfter) {
      return
    }

    const nextPanelTop = panelAfter.getBoundingClientRect().top
    const nextAlignTop = sidebarAfter
      ? sidebarAfter.getBoundingClientRect().top
      : nextPanelTop

    if (Math.abs(nextPanelTop - nextAlignTop) > 2) {
      scrollDocDetailPanelToTop(attempt + 1)
    }
  })
}

const PLATFORM_MATCH_ALIASES = {
  windows: ['windows', 'win'],
  mac: ['mac', 'macos'],
  linux: ['linux'],
  web: ['web'],
  android: ['android'],
  ios: ['ios'],
}

const DESKTOP_PLATFORM_IDS = new Set(['windows', 'mac', 'linux', 'web'])
const MOBILE_PLATFORM_IDS = new Set(['ios', 'android'])

function collectMentionedPlatformIds(text) {
  const trimmed = `${text ?? ''}`.trim()
  const normalized = trimmed.toLowerCase()
  const mentioned = new Set()

  Object.entries(PLATFORM_MATCH_ALIASES).forEach(([platformId, aliases]) => {
    aliases.forEach((alias) => {
      const prefixPattern = new RegExp(`^${escapeRegExp(alias)}\\s*[：:]`, 'i')
      if (prefixPattern.test(trimmed) || normalized.includes(alias)) {
        mentioned.add(platformId)
      }
    })
  })

  if (/桌面端|desktop/i.test(trimmed)) {
    DESKTOP_PLATFORM_IDS.forEach((platformId) => mentioned.add(platformId))
  }
  if (/移动端|mobile/i.test(trimmed)) {
    MOBILE_PLATFORM_IDS.forEach((platformId) => mentioned.add(platformId))
  }

  return mentioned
}

function lineMatchesPlatform(text, platformId) {
  const trimmed = `${text ?? ''}`.trim()
  if (!trimmed) {
    return false
  }

  const clauses = trimmed.split(/[；;]/).map((segment) => segment.trim()).filter(Boolean)
  if (clauses.length > 1) {
    return clauses.some((clause) => lineMatchesPlatform(clause, platformId))
  }

  const mentioned = collectMentionedPlatformIds(trimmed)
  if (mentioned.size === 0) {
    return true
  }

  const mentionsAllDesktop = [...DESKTOP_PLATFORM_IDS].every((id) => mentioned.has(id))
  const mentionsAllMobile = [...MOBILE_PLATFORM_IDS].every((id) => mentioned.has(id))
  if (mentionsAllDesktop && mentionsAllMobile) {
    return true
  }

  return mentioned.has(platformId)
}

export function extractStructuredDocTitle(markdown) {
  const match = `${markdown ?? ''}`.match(/^# (.+)$/m)
  if (!match) {
    return ''
  }

  return match[1].replace(/\*\*.*?\*\*/g, '').trim()
}

export function stripStructuredDocLead(markdown) {
  const output = []
  let skippedTitle = false
  const lines = `${markdown ?? ''}`.split('\n')

  lines.forEach((line) => {
    if (!skippedTitle && /^# /.test(line)) {
      skippedTitle = true
      return
    }

    if (line.startsWith('> ') || line.trim() === '---') {
      return
    }

    output.push(line)
  })

  return output.join('\n').trimStart()
}

export function adaptStructuredDocMarkdownForPlatform(markdown, platformId, docLang) {
  if (!markdown || !platformId) {
    return markdown ?? ''
  }

  const headings = getSectionHeadings(docLang)
  const proceduralSectionTitles = new Set([
    headings['getting-started'],
    headings['how-to-guide'],
  ])
  let inStepsSection = false
  let stepCounter = 0
  const output = []

  markdown.split('\n').forEach((line) => {
    const headingMatch = line.match(/^## (.+)$/)
    if (headingMatch) {
      inStepsSection = proceduralSectionTitles.has(headingMatch[1].trim())
      stepCounter = 0
      output.push(line)
      return
    }

    if (line.startsWith('> ') || line.trim() === '---') {
      return
    }

    const isListLine = /^[-*•] /.test(line)
    const isOrderedLine = /^\d+\. /.test(line)

    if (isListLine || isOrderedLine) {
      if (!lineMatchesPlatform(line, platformId)) {
        return
      }

      if (inStepsSection && isOrderedLine) {
        stepCounter += 1
        output.push(line.replace(/^\d+\./, `${stepCounter}.`))
        return
      }
    }

    output.push(line)
  })

  return output.join('\n')
}
