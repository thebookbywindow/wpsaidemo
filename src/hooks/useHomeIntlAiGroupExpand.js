import { useState } from 'react'

export const INTL_AI_GROUP_PREVIEW_LIMIT = 3

/**
 * Items shown for a group given expand state.
 * Empty / missing lists return [].
 */
export function getIntlAiGroupVisibleItems(
  items,
  expanded,
  limit = INTL_AI_GROUP_PREVIEW_LIMIT,
) {
  if (!Array.isArray(items) || items.length === 0) return []
  if (expanded || items.length <= limit) return items
  return items.slice(0, limit)
}

/** Whether the group needs an expand / collapse control. */
export function canExpandIntlAiGroup(items, limit = INTL_AI_GROUP_PREVIEW_LIMIT) {
  return (items?.length ?? 0) > limit
}

/**
 * Per-group expand state for intl AI feature cards.
 */
export function useHomeIntlAiGroupExpand() {
  const [expandedIds, setExpandedIds] = useState(() => new Set())

  const isExpanded = (groupId) => expandedIds.has(groupId)

  const toggleGroup = (groupId) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
  }

  return {
    previewLimit: INTL_AI_GROUP_PREVIEW_LIMIT,
    isExpanded,
    toggleGroup,
  }
}
