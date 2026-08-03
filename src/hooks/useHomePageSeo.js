import { useEffect } from 'react'
import {
  DEFAULT_LOCALE_BCP47,
  HOME_OG_IMAGE_ALT,
  HOME_OG_IMAGE_HEIGHT,
  HOME_OG_IMAGE_PATH,
  HOME_OG_IMAGE_WIDTH,
  SITE_HREFLANG_LOCALES,
  SITE_ORIGIN,
  homeCanonicalUrl,
  toOgLocale,
} from '../data/siteSeo'
import { toBcp47Locale } from '../utils/localeUrl'

const JSON_LD_ID = 'home-seo-graph'
const HREFLANG_ATTR = 'data-home-hreflang'

function upsertMeta(attribute, key, content) {
  if (typeof document === 'undefined' || !content) return

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel, href, attributes = {}) {
  if (typeof document === 'undefined' || !href) return

  const attrEntries = Object.entries(attributes)
  const selector = [
    `link[rel="${rel}"]`,
    ...attrEntries.map(([name, value]) => `[${name}="${value}"]`),
  ].join('')

  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    attrEntries.forEach(([name, value]) => element.setAttribute(name, value))
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  if (typeof document === 'undefined') return

  let script = document.getElementById(id)
  if (!script) {
    script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

function clearHomeHreflangLinks() {
  document.head.querySelectorAll(`link[${HREFLANG_ATTR}]`).forEach((node) => node.remove())
}

function upsertHreflangLinks() {
  clearHomeHreflangLinks()

  const links = [
    { hreflang: 'x-default', href: homeCanonicalUrl(DEFAULT_LOCALE_BCP47) },
    { hreflang: 'en', href: homeCanonicalUrl(DEFAULT_LOCALE_BCP47) },
    ...SITE_HREFLANG_LOCALES.map((bcp47) => ({
      hreflang: bcp47,
      href: homeCanonicalUrl(bcp47),
    })),
  ]

  links.forEach(({ hreflang, href }) => {
    const element = document.createElement('link')
    element.setAttribute('rel', 'alternate')
    element.setAttribute('hreflang', hreflang)
    element.setAttribute('href', href)
    element.setAttribute(HREFLANG_ATTR, '1')
    document.head.appendChild(element)
  })
}

function buildHomeJsonLd({ title, description, faqs, localeBcp47, pageUrl, isZh }) {
  const organizationDescription = isZh
    ? 'WPS AI 是免费 WPS Office 内的 AI 能力层与贯穿全套件的 Office Copilot，提供起草、改写、摘要、表格分析、幻灯片生成与 Chat PDF。'
    : 'WPS AI is the AI layer and suite-wide Office Copilot inside WPS Office — drafting, rewriting, summarization, spreadsheet analysis, slide generation, and Chat PDF across the free office suite.'

  const websiteDescription = isZh
    ? 'WPS AI 官方站点 —— 免费 WPS Office 内的 Office Copilot。'
    : 'Official site for WPS AI — the free Office Copilot inside WPS Office.'

  const softwareDescription = isZh
    ? 'WPS AI 是 WPS Office（又称 WPS / 金山办公）内部的 AI 能力层，不是另一套独立办公软件；它在 Writer、Spreadsheet、Presentation 与 PDF 中提供起草、改写、摘要、公式辅助、幻灯片生成与 Chat PDF —— 贯穿全套件的 Office Copilot。'
    : 'WPS AI is the AI layer inside WPS Office (also called WPS or Kingsoft Office). It is not a separate suite: it adds AI drafting, rewriting, summarization, formula help, slide generation, and Chat PDF across Writer, Spreadsheet, Presentation, and PDF — your suite-wide Office Copilot.'

  const featureList = isZh
    ? [
        'AI 写作 — 在 Writer 中即时起草与语气切换',
        '幻灯片设计 — 在 Presentation 中一键生成 PPT',
        '数据分析 — 与表格对话并获得公式辅助',
        'PDF AI 阅读 — 通过 Chat PDF 提取文档洞察',
        '长文档 AI 摘要',
        'AI 图片编辑工具',
      ]
    : [
        'AI Writing — instant drafts and tone switching in Writer',
        'Slide Designer — one-click PPT generation in Presentation',
        'Data Analyst — chat with spreadsheets and formula assistance',
        'PDF AI Reader — Chat PDF insight extraction',
        'AI Summarizer for long documents',
        'AI photo editing tools',
      ]

  const offerDescription = isZh
    ? '免费下载 WPS Office 并使用 WPS AI；更高 AI 额度见可选的 WPS Pro+。'
    : 'Free WPS Office download with WPS AI; higher AI limits on optional WPS Pro+.'

  const ogImage = `${SITE_ORIGIN}${HOME_OG_IMAGE_PATH}`
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: 'WPS AI',
      alternateName: ['WPS Office', 'Kingsoft Office', 'WPS'],
      url: `${SITE_ORIGIN}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/favicon.svg`,
      },
      description: organizationDescription,
      sameAs: [
        'https://www.wps.com/',
        'https://www.youtube.com/@WPSOffice',
        'https://www.linkedin.com/company/wps-office',
        'https://x.com/WPSOffice',
        'https://www.facebook.com/WPSOffice',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      name: 'WPS AI',
      url: `${SITE_ORIGIN}/`,
      inLanguage: localeBcp47,
      description: websiteDescription,
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: title,
      description,
      inLanguage: localeBcp47,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      about: [
        { '@id': `${SITE_ORIGIN}/#software` },
        { '@id': `${SITE_ORIGIN}/#organization` },
      ],
      primaryEntityOfPage: { '@id': `${SITE_ORIGIN}/#software` },
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${SITE_ORIGIN}/#software`,
      name: 'WPS AI',
      alternateName: ['WPS Office Copilot', 'WPS Office'],
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'OfficeSuite',
      operatingSystem: 'Windows, macOS, Linux, Android, iOS, Web',
      url: pageUrl,
      image: ogImage,
      description: softwareDescription,
      featureList,
      inLanguage: localeBcp47,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: offerDescription,
      },
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    },
  ]

  if (faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      isPartOf: { '@id': `${pageUrl}#webpage` },
      mainEntity: faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  }
}

/**
 * Applies homepage SEO/GEO signals: title, meta, hreflang, and a single JSON-LD @graph.
 */
export function useHomePageSeo({
  enabled,
  title,
  description,
  faqs = [],
  locale = DEFAULT_LOCALE_BCP47,
}) {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return undefined

    const localeBcp47 = toBcp47Locale(locale || DEFAULT_LOCALE_BCP47) || DEFAULT_LOCALE_BCP47
    const pageUrl = homeCanonicalUrl(localeBcp47)
    const ogImage = `${SITE_ORIGIN}${HOME_OG_IMAGE_PATH}`
    const ogLocale = toOgLocale(localeBcp47)
    const isZh = localeBcp47.toLowerCase().startsWith('zh')
    const previousTitle = document.title
    const previousLang = document.documentElement.lang

    document.documentElement.lang = localeBcp47
    document.title = title

    upsertMeta('name', 'description', description)
    upsertMeta(
      'name',
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    )

    upsertLink('canonical', pageUrl)
    upsertHreflangLinks()

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'WPS AI')
    upsertMeta('property', 'og:locale', ogLocale)
    upsertMeta('property', 'og:url', pageUrl)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', ogImage)
    upsertMeta('property', 'og:image:width', String(HOME_OG_IMAGE_WIDTH))
    upsertMeta('property', 'og:image:height', String(HOME_OG_IMAGE_HEIGHT))
    upsertMeta('property', 'og:image:alt', HOME_OG_IMAGE_ALT)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)
    upsertMeta('name', 'twitter:image:alt', HOME_OG_IMAGE_ALT)

    upsertJsonLd(
      JSON_LD_ID,
      buildHomeJsonLd({ title, description, faqs, localeBcp47, pageUrl, isZh }),
    )

    return () => {
      document.title = previousTitle
      document.documentElement.lang = previousLang
      clearHomeHreflangLinks()
      document.getElementById(JSON_LD_ID)?.remove()
      document.head.querySelector('link[rel="canonical"]')?.remove()
    }
  }, [description, enabled, faqs, locale, title])
}
