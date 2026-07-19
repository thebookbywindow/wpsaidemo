import { useEffect } from 'react'

/** True when the URL has an intentional in-page anchor (not empty / `#` / `#top`). */
export function hasIntentionalLocationHash(hash = '') {
  const normalized = String(hash || '').trim()
  if (!normalized || normalized === '#') return false
  if (normalized.toLowerCase() === '#top') return false
  return true
}

/**
 * Home reload / mount should land on the hero viewport unless the user
 * opened a deep-link hash (e.g. `#home-intl-ai`).
 */
export function useHomeScrollTopOnMount() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const scrollToHeroIfNeeded = () => {
      if (hasIntentionalLocationHash(window.location.hash)) return
      window.scrollTo(0, 0)
    }

    scrollToHeroIfNeeded()

    const onPageShow = (event) => {
      // Fresh load / reload — not bfcache restore of a prior scroll position.
      if (!event.persisted) scrollToHeroIfNeeded()
    }

    window.addEventListener('pageshow', onPageShow)
    return () => window.removeEventListener('pageshow', onPageShow)
  }, [])
}
