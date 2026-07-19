import { useMemo, useState } from 'react'
import { getIntlAiTabIconSrc } from '../data/intlAiFeatures.js'

/** Resolve active group id when current selection is missing / empty. */
export function resolveIntlAiActiveGroupId(groups, activeId) {
  if (!groups?.length) return ''
  if (groups.some((group) => group.id === activeId)) return activeId
  return groups[0].id
}

/** Build capsule tab items from groups + optional short labels. */
export function buildIntlAiGroupTabs(groups, tabLabels = {}) {
  return (groups ?? []).map((group) => ({
    id: group.id,
    label: tabLabels[group.id] ?? group.title ?? group.id,
    iconSrc: getIntlAiTabIconSrc(group.id),
  }))
}

/**
 * Capsule tab selection for intl AI feature groups.
 */
export function useHomeIntlAiGroupTabs(groups, tabLabels = {}) {
  const defaultId = groups?.[0]?.id ?? ''
  const [activeId, setActiveId] = useState(defaultId)

  const resolvedActiveId = useMemo(
    () => resolveIntlAiActiveGroupId(groups, activeId),
    [groups, activeId],
  )

  const activeGroup = useMemo(
    () => groups?.find((group) => group.id === resolvedActiveId) ?? null,
    [groups, resolvedActiveId],
  )

  const tabs = useMemo(
    () => buildIntlAiGroupTabs(groups, tabLabels),
    [groups, tabLabels],
  )

  return {
    tabs,
    activeId: resolvedActiveId,
    activeGroup,
    setActiveId,
  }
}
