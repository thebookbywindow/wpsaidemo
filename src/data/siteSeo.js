/** Production origin for homepage SEO (canonical / hreflang / OG / JSON-LD). */
export const SITE_ORIGIN = 'https://www.wps.ai'

export const DEFAULT_LOCALE_BCP47 = 'en-US'

/** Locales that receive hreflang alternates (aligned with App supportedLocales). */
export const SITE_HREFLANG_LOCALES = [
  'en-US',
  'zh-HK',
  'es-MX',
  'pt-BR',
  'fr-FR',
  'id-ID',
  'vi-VN',
  'tr-TR',
  'ru-RU',
  'th-TH',
]

export const HOME_OG_IMAGE_PATH = '/images/og/wps-ai-home-1200x630.png'
export const HOME_OG_IMAGE_WIDTH = 1200
export const HOME_OG_IMAGE_HEIGHT = 630
export const HOME_OG_IMAGE_ALT =
  'WPS AI suite-wide Office Copilot for Writer, Spreadsheet, Presentation, and PDF'

export function toOgLocale(bcp47 = DEFAULT_LOCALE_BCP47) {
  const parts = `${bcp47}`.replace(/_/g, '-').split('-').filter(Boolean)
  if (parts.length === 0) return 'en_US'
  if (parts.length === 1) return parts[0].toLowerCase()
  const [lang, region, ...rest] = parts
  const tail = rest.length ? `_${rest.join('_')}` : ''
  return `${lang.toLowerCase()}_${region.toUpperCase()}${tail}`
}

/** Canonical homepage URL — locale segment is lowercase (`/en-us/`). */
export function homeCanonicalUrl(bcp47 = DEFAULT_LOCALE_BCP47) {
  const urlLocale = `${bcp47}`.toLowerCase().replace(/_/g, '-')
  return `${SITE_ORIGIN}/${urlLocale}/`
}

/** Canonical AI features directory URL — locale segment is lowercase (`/en-us/wps-ai-features/`). */
export function aiFeaturesCanonicalUrl(bcp47 = DEFAULT_LOCALE_BCP47) {
  const urlLocale = `${bcp47}`.toLowerCase().replace(/_/g, '-')
  return `${SITE_ORIGIN}/${urlLocale}/wps-ai-features/`
}
