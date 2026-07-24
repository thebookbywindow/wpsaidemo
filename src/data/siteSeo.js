/** Production origin for homepage SEO (canonical / hreflang / OG / JSON-LD). */
export const SITE_ORIGIN = 'https://www.wps.ai'

export const DEFAULT_LOCALE_BCP47 = 'en-US'

/** Locales that receive hreflang alternates (aligned with App supportedLocales). */
export const SITE_HREFLANG_LOCALES = [
  'en-US',
  'es-ES',
  'de-DE',
  'fr-FR',
  'ja-JP',
  'ko-KR',
  'pt-BR',
  'ar-SA',
  'it-IT',
  'nl-NL',
  'pl-PL',
  'tr-TR',
  'id-ID',
  'th-TH',
  'vi-VN',
  'ms-MY',
  'zh-CN',
  'zh-TW',
  'ru-RU',
]

export const HOME_OG_IMAGE_PATH = '/images/og/wps-ai-home-1200x630.png'
export const HOME_OG_IMAGE_WIDTH = 1200
export const HOME_OG_IMAGE_HEIGHT = 630
export const HOME_OG_IMAGE_ALT =
  'WPS AI suite-wide Office Copilot for Writer, Spreadsheet, Presentation, and PDF'

export function toOgLocale(bcp47 = DEFAULT_LOCALE_BCP47) {
  return `${bcp47}`.replace('-', '_')
}

export function homeCanonicalUrl(bcp47 = DEFAULT_LOCALE_BCP47) {
  return `${SITE_ORIGIN}/${bcp47}/`
}
