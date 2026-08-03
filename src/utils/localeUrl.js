const LOCALE_BCP47_BY_CODE = {
  'en-us': 'en-US',
  'zh-hk': 'zh-HK',
  'es-mx': 'es-MX',
  'pt-br': 'pt-BR',
  'fr-fr': 'fr-FR',
  'id-id': 'id-ID',
  'vi-vn': 'vi-VN',
  'tr-tr': 'tr-TR',
  'ru-ru': 'ru-RU',
  'th-th': 'th-TH',
  // Legacy aliases kept for URL normalize / content fallbacks
  'es-es': 'es-ES',
  'de-de': 'de-DE',
  'ja-jp': 'ja-JP',
  'ko-kr': 'ko-KR',
  'ar-sa': 'ar-SA',
  'it-it': 'it-IT',
  'nl-nl': 'nl-NL',
  'pl-pl': 'pl-PL',
  'ms-my': 'ms-MY',
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW',
}

const LOCALE_CODE_BY_BCP47 = Object.fromEntries(
  Object.entries(LOCALE_BCP47_BY_CODE).map(([code, bcp47]) => [bcp47.toLowerCase(), code]),
)

const LOCALE_ALIAS_MAP = {
  en: 'en-us',
  zh: 'zh-hk',
  es: 'es-mx',
}

/** URL path segment — always lowercase (e.g. `en-us`, not `en-US`). */
export function toUrlLocale(localeCode) {
  return `${localeCode ?? ''}`.toLowerCase().replace(/_/g, '-')
}

/** BCP47 tag for html lang / hreflang / og (e.g. `en-US`). */
export function toBcp47Locale(localeCode) {
  const normalized = `${localeCode ?? ''}`.toLowerCase().replace(/_/g, '-')
  return LOCALE_BCP47_BY_CODE[normalized] ?? localeCode
}

export function normalizeLocaleCode(localeSegment) {
  const normalized = `${localeSegment ?? ''}`.toLowerCase().replace(/_/g, '-')
  return LOCALE_CODE_BY_BCP47[normalized]
    ?? LOCALE_ALIAS_MAP[normalized]
    ?? normalized
}

export function isSupportedLocaleCode(localeCode) {
  return Boolean(LOCALE_BCP47_BY_CODE[`${localeCode ?? ''}`.toLowerCase().replace(/_/g, '-')])
}
