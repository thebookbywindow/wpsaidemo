/** Region + language rows for /locale/. */
export const localePageEntries = [
  { code: 'en-us', region: 'United States', language: 'English', sortKey: 'United States' },
  { code: 'zh-hk', region: 'Hong Kong', language: '繁體中文', sortKey: 'Hong Kong' },
  { code: 'es-mx', region: 'México', language: 'Español', sortKey: 'Mexico' },
  { code: 'pt-br', region: 'Brasil', language: 'Português', sortKey: 'Brasil' },
  { code: 'fr-fr', region: 'France', language: 'Français', sortKey: 'France' },
  { code: 'id-id', region: 'Indonesia', language: 'Bahasa Indonesia', sortKey: 'Indonesia' },
  { code: 'vi-vn', region: 'Việt Nam', language: 'Tiếng Việt', sortKey: 'Viet Nam' },
  { code: 'th-th', region: 'ประเทศไทย', language: 'ไทย', sortKey: 'Thailand' },
  { code: 'tr-tr', region: 'Türkiye', language: 'Türkçe', sortKey: 'Turkiye' },
  { code: 'ru-ru', region: 'Россия', language: 'Русский', sortKey: 'Russia' },
]

/** Regional buckets (display order). */
export const localeRegionGroups = [
  { id: 'global-english', titleKey: 'globalEnglish', codes: ['en-us'] },
  { id: 'greater-china', titleKey: 'greaterChina', codes: ['zh-hk'] },
  { id: 'latin-america', titleKey: 'latinAmerica', codes: ['es-mx', 'pt-br'] },
  { id: 'western-europe', titleKey: 'westernEurope', codes: ['fr-fr'] },
  { id: 'southeast-asia', titleKey: 'southeastAsia', codes: ['id-id', 'vi-vn', 'th-th'] },
  { id: 'eurasia', titleKey: 'eurasia', codes: ['tr-tr', 'ru-ru'] },
]

const entryByCode = new Map(localePageEntries.map((entry) => [entry.code, entry]))

export function buildLocalePageGroups(groupTitles = {}) {
  return localeRegionGroups.map((group) => ({
    id: group.id,
    title: groupTitles[group.titleKey] ?? group.titleKey,
    items: group.codes
      .map((code) => {
        const entry = entryByCode.get(code)
        if (!entry) return null
        return {
          id: code,
          code,
          label: `${entry.region} - ${entry.language}`,
        }
      })
      .filter(Boolean),
  }))
}
