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

/**
 * SEO signals for the international AI features directory page.
 */
export function useIntlAiFeaturesPageSeo({ enabled, title, description }) {
  useEffect(() => {
    if (!enabled || typeof document === 'undefined') return undefined

    const previousTitle = document.title
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')

    return () => {
      document.title = previousTitle
    }
  }, [enabled, title, description])
}
