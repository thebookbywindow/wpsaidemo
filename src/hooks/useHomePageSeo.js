import { useEffect } from 'react'

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

/**
 * Applies homepage SEO/GEO signals: title, meta, and JSON-LD entities.
 */
export function useHomePageSeo({ enabled, title, description, faqs = [], locale = 'en' }) {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return undefined

    const previousTitle = document.title
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    const origin = window.location.origin
    const pageUrl = `${origin}${window.location.pathname}`

    upsertJsonLd('home-seo-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'WPS AI',
      url: origin,
      logo: `${origin}/favicon.svg`,
      description,
      sameAs: ['https://www.wps.com/'],
    })

    upsertJsonLd('home-seo-software', {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'WPS AI',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, Windows, macOS, Linux, Android, iOS',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description,
      url: pageUrl,
      inLanguage: locale,
    })

    if (faqs.length > 0) {
      upsertJsonLd('home-seo-faq', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
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

    return () => {
      document.title = previousTitle
      ;['home-seo-organization', 'home-seo-software', 'home-seo-faq'].forEach((id) => {
        document.getElementById(id)?.remove()
      })
    }
  }, [description, enabled, faqs, locale, title])
}
