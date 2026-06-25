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
    summary: '功能摘要',
    description: '功能說明',
    steps: '操作步驟',
    faq: '常見問題',
    related: '關聯問題',
    notes: '注意事項',
  },
  'en-us': Object.fromEntries(DOC_DETAIL_TOC_SECTIONS_EN.map((item) => [item.id, item.label])),
  'ja-jp': {
    summary: '機能概要',
    description: '機能説明',
    steps: '操作手順',
    faq: 'よくある質問',
    related: '関連する質問',
    notes: '注意事項',
  },
  'ko-kr': {
    summary: '기능 요약',
    description: '기능 설명',
    steps: '操作 단계',
    faq: '자주 묻는 질문',
    related: '관련 질문',
    notes: '주의사항',
  },
  'es-mx': {
    summary: 'Resumen de funciones',
    description: 'Descripcion de funciones',
    steps: 'Pasos de operacion',
    faq: 'Preguntas frecuentes',
    related: 'Preguntas relacionadas',
    notes: 'Notas',
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
  const summaryBody = extractDocDetailSection(markdown, 'summary', docLang)
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
  const stepsTitle = headings.steps
  let inStepsSection = false
  let stepCounter = 0
  const output = []

  markdown.split('\n').forEach((line) => {
    const headingMatch = line.match(/^## (.+)$/)
    if (headingMatch) {
      inStepsSection = headingMatch[1].trim() === stepsTitle
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
