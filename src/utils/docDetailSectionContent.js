import { DOC_DETAIL_TOC_SECTIONS_EN, DOC_DETAIL_TOC_SECTIONS_ZH } from '../data/docDetailTocData'

export const STRUCTURED_DOC_ROUTE_SLUGS = new Set(['create-document'])

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
