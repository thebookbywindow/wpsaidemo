/** Region + language rows for /locale/. Region and language names use the locale's own language. */
export const localePageEntries = [
  { code: 'en-us', region: 'United States', language: 'English', sortKey: 'United States' },
  {
    code: 'zh-hk',
    region: '中國香港',
    language: '繁體中文',
    languageGroup: '中文',
    sortKey: '中國香港',
    searchTerms: ['中国香港', '中國香港', 'China Hong Kong', 'Hong Kong', '香港', '繁體中文', '繁体中文', '中文'],
  },
  // Future: { code: 'zh-cn', region: '中国大陆', language: '简体中文', languageGroup: '中文', ... },
  { code: 'es-mx', region: 'México', language: 'Español', sortKey: 'Mexico' },
  { code: 'pt-br', region: 'Brasil', language: 'Português', sortKey: 'Brasil' },
  { code: 'fr-fr', region: 'France', language: 'Français', sortKey: 'France' },
  { code: 'id-id', region: 'Indonesia', language: 'Bahasa Indonesia', sortKey: 'Indonesia' },
  { code: 'vi-vn', region: 'Việt Nam', language: 'Tiếng Việt', sortKey: 'Viet Nam' },
  { code: 'th-th', region: 'ประเทศไทย', language: 'ไทย', sortKey: 'Thailand' },
  { code: 'tr-tr', region: 'Türkiye', language: 'Türkçe', sortKey: 'Turkiye' },
  { code: 'ru-ru', region: 'Россия', language: 'Русский', sortKey: 'Russia' },
]

function resolveLocaleEntryLabel(entry) {
  return entry.label ?? `${entry.region} - ${entry.language}`
}

function resolveLanguageGroup(entry) {
  return entry.languageGroup ?? entry.language
}

function toLanguageGroupId(groupTitle, fallbackCode) {
  const slug = `${groupTitle ?? ''}`
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0080-\uFFFF-]/g, '')
  return slug ? `lang-${slug}` : `lang-${fallbackCode}`
}

/**
 * Group locales by language (`languageGroup` or native `language` name).
 * Chinese variants share the `中文` bucket — not script names like 繁體中文.
 */
export function buildLocalePageGroups() {
  const groups = []
  const groupByKey = new Map()

  for (const entry of localePageEntries) {
    const groupKey = resolveLanguageGroup(entry)
    const item = {
      id: entry.code,
      code: entry.code,
      label: resolveLocaleEntryLabel(entry),
      searchTerms: entry.searchTerms,
    }

    let group = groupByKey.get(groupKey)

    if (!group) {
      group = {
        id: toLanguageGroupId(groupKey, entry.code),
        title: groupKey,
        items: [],
      }
      groupByKey.set(groupKey, group)
      groups.push(group)
    }

    group.items.push(item)
  }

  return groups
}
