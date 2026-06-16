const LOCALE_BCP47_BY_CODE = {
  'en-us': 'en-US',
  'es-es': 'es-ES',
  'de-de': 'de-DE',
  'fr-fr': 'fr-FR',
  'ja-jp': 'ja-JP',
  'ko-kr': 'ko-KR',
  'pt-br': 'pt-BR',
  'ar-sa': 'ar-SA',
  'it-it': 'it-IT',
  'nl-nl': 'nl-NL',
  'pl-pl': 'pl-PL',
  'tr-tr': 'tr-TR',
  'id-id': 'id-ID',
  'th-th': 'th-TH',
  'vi-vn': 'vi-VN',
  'ms-my': 'ms-MY',
  'zh-cn': 'zh-CN',
  'zh-tw': 'zh-TW',
  'ru-ru': 'ru-RU',
  'es-mx': 'es-MX',
}

const LOCALE_CODE_BY_BCP47 = Object.fromEntries(
  Object.entries(LOCALE_BCP47_BY_CODE).map(([code, bcp47]) => [bcp47.toLowerCase(), code]),
)

const LOCALE_ALIAS_MAP = {
  en: 'en-us',
  zh: 'zh-cn',
}

export function toUrlLocale(localeCode) {
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
