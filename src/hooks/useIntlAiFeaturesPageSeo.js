import { useEffect } from 'react'
import {
  DEFAULT_LOCALE_BCP47,
  HOME_OG_IMAGE_PATH,
  SITE_HREFLANG_LOCALES,
  SITE_ORIGIN,
  aiFeaturesCanonicalUrl,
  toOgLocale,
} from '../data/siteSeo'
import { toBcp47Locale } from '../utils/localeUrl'

const JSON_LD_ID = 'ai-features-seo-graph'
const HREFLANG_ATTR = 'data-ai-features-hreflang'

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

function clearHreflangLinks() {
  // Also drop static index.html / homepage alternates so this page is self-canonical.
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((node) => node.remove())
}

function upsertHreflangLinks() {
  clearHreflangLinks()

  const links = [
    { hreflang: 'x-default', href: aiFeaturesCanonicalUrl(DEFAULT_LOCALE_BCP47) },
    { hreflang: 'en', href: aiFeaturesCanonicalUrl(DEFAULT_LOCALE_BCP47) },
    ...SITE_HREFLANG_LOCALES.map((bcp47) => ({
      hreflang: bcp47,
      href: aiFeaturesCanonicalUrl(bcp47),
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

function buildAiFeaturesJsonLd({ title, description, localeBcp47, pageUrl }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: localeBcp47,
      },
    ],
  }
}

/**
 * Minimal SEO for the AI features directory: self-canonical, hreflang, OG/Twitter,
 * and CollectionPage only (no BreadcrumbList — page has no visible breadcrumbs).
 */
export function useIntlAiFeaturesPageSeo({
  enabled,
  title,
  description,
  locale = DEFAULT_LOCALE_BCP47,
}) {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return undefined

    const localeBcp47 = toBcp47Locale(locale || DEFAULT_LOCALE_BCP47) || DEFAULT_LOCALE_BCP47
    const pageUrl = aiFeaturesCanonicalUrl(localeBcp47)
    const ogImage = `${SITE_ORIGIN}${HOME_OG_IMAGE_PATH}`
    const ogLocale = toOgLocale(localeBcp47)
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

    // Drop homepage graph if SPA navigated here without home cleanup finishing first.
    document.getElementById('home-seo-graph')?.remove()

    upsertLink('canonical', pageUrl)
    upsertHreflangLinks()

    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:site_name', 'WPS AI')
    upsertMeta('property', 'og:locale', ogLocale)
    upsertMeta('property', 'og:url', pageUrl)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:image', ogImage)

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', ogImage)

    upsertJsonLd(
      JSON_LD_ID,
      buildAiFeaturesJsonLd({
        title,
        description,
        localeBcp47,
        pageUrl,
      }),
    )

    return () => {
      document.title = previousTitle
      document.documentElement.lang = previousLang
      clearHreflangLinks()
      document.getElementById(JSON_LD_ID)?.remove()
      document.head.querySelector('link[rel="canonical"]')?.remove()
    }
  }, [description, enabled, locale, title])
}
