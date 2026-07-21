import { useMemo } from 'react'
import {
  INTL_AI_COPILOT_LINKS,
  INTL_AI_FEATURE_GROUPS,
  getIntlAiTabIconSrc,
  resolveIntlAiFeatureItem,
} from '../data/intlAiFeatures'

export { resolveIntlAiFeatureItem }
export const INTL_AI_COPILOT_GROUP_ID = 'copilot'

/**
 * Resolves international AI feature catalog for the active UI language.
 * Copilot is prepended as the first capsule group (suite-wide), then component groups.
 */
export function useHomeIntlAiFeatures(copy) {
  return useMemo(() => {
    if (!copy) return { groups: [] }

    const groupLabels = copy.groups ?? {}
    const tabLabels = copy.tabs ?? {}
    const itemLabels = copy.items ?? {}
    const itemDescriptions = copy.itemDescriptions ?? {}
    const notes = copy.notes ?? {}

    const copilotGroup = {
      id: INTL_AI_COPILOT_GROUP_ID,
      title: groupLabels.copilot ?? copy.copilotLabel ?? 'Office Copilot',
      iconSrc: getIntlAiTabIconSrc(INTL_AI_COPILOT_GROUP_ID),
      note: notes.copilotNote ?? null,
      items: INTL_AI_COPILOT_LINKS.map((item) =>
        resolveIntlAiFeatureItem(item, itemLabels, itemDescriptions),
      ),
    }

    const componentGroups = INTL_AI_FEATURE_GROUPS.map((group) => ({
      id: group.id,
      title: groupLabels[group.id] ?? group.id,
      iconSrc: getIntlAiTabIconSrc(group.id),
      note: group.noteId ? notes[group.noteId] ?? null : null,
      items: group.items.map((item) =>
        resolveIntlAiFeatureItem(item, itemLabels, itemDescriptions),
      ),
    }))

    return {
      groups: [copilotGroup, ...componentGroups],
      tabLabels,
    }
  }, [copy])
}
