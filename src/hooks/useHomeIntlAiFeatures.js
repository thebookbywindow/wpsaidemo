import { useMemo } from 'react'
import { INTL_AI_COPILOT_LINKS, INTL_AI_FEATURE_GROUPS } from '../data/intlAiFeatures'

/**
 * Resolves international AI feature catalog labels for the active UI language.
 * Copilot entry points are suite-wide, not a peer component group.
 */
export function useHomeIntlAiFeatures(copy) {
  return useMemo(() => {
    if (!copy) return { groups: [], copilotLinks: [], copilotLabel: '' }

    const groupLabels = copy.groups ?? {}
    const itemLabels = copy.items ?? {}
    const notes = copy.notes ?? {}

    const groups = INTL_AI_FEATURE_GROUPS.map((group) => ({
      id: group.id,
      title: groupLabels[group.id] ?? group.id,
      note: group.noteId ? notes[group.noteId] ?? null : null,
      items: group.items.map((item) => ({
        id: item.id,
        url: item.url,
        label: itemLabels[item.id] ?? item.id,
      })),
    }))

    const copilotLinks = INTL_AI_COPILOT_LINKS.map((item) => ({
      id: item.id,
      url: item.url,
      label: itemLabels[item.id] ?? item.id,
    }))

    return {
      groups,
      copilotLinks,
      copilotLabel: copy.copilotLabel ?? 'Office Copilot',
    }
  }, [copy])
}
