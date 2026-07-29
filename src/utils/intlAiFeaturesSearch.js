/**
 * Pure helpers for Intl AI features directory search / instant filter.
 */

export function normalizeIntlAiSearchQuery(query) {
  return `${query ?? ''}`.trim().toLowerCase()
}

function itemMatchesQuery(item, query) {
  const label = `${item?.label ?? ''}`.toLowerCase()
  return Boolean(label) && label.includes(query)
}

/**
 * Instant filter: match entry labels only; drop groups with zero matches.
 * Empty / whitespace query → original groups (reference equality preserved).
 */
export function filterIntlAiFeatureGroups(groups, query) {
  if (!Array.isArray(groups) || groups.length === 0) return []

  const normalized = normalizeIntlAiSearchQuery(query)
  if (!normalized) return groups

  return groups
    .map((group) => {
      const items = (group.items ?? []).filter((item) => itemMatchesQuery(item, normalized))
      if (!items.length) return null
      return { ...group, items }
    })
    .filter(Boolean)
}

/**
 * Split a label into plain / match segments for highlight rendering.
 * Matching is case-insensitive; segment text keeps original casing.
 */
export function splitIntlAiLabelByQuery(label, query) {
  const text = `${label ?? ''}`
  const normalized = normalizeIntlAiSearchQuery(query)
  if (!text || !normalized) return [{ text, match: false }]

  const lower = text.toLowerCase()
  const parts = []
  let cursor = 0
  let index = lower.indexOf(normalized, cursor)

  while (index !== -1) {
    if (index > cursor) {
      parts.push({ text: text.slice(cursor, index), match: false })
    }
    parts.push({
      text: text.slice(index, index + normalized.length),
      match: true,
    })
    cursor = index + normalized.length
    index = lower.indexOf(normalized, cursor)
  }

  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), match: false })
  }

  return parts.length ? parts : [{ text, match: false }]
}
