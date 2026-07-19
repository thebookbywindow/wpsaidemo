import { useMemo } from 'react'
import { HOME_AI_PILLARS } from '../data/homeAiCapabilities'
import { HOME_HERO_COMPONENTS } from '../data/homeHeroComponents'
import {
  INTL_AI_COPILOT_LINKS,
  INTL_AI_FEATURE_GROUPS,
  resolveIntlAiFeatureItem,
} from '../data/intlAiFeatures'

const HERO_ICON_BY_ID = Object.fromEntries(
  HOME_HERO_COMPONENTS.map((item) => [item.id, item.iconSrc]),
)

/**
 * Suite-wide AI capability cards for the homepage.
 */
export function useHomeAiCapabilities(copy) {
  return useMemo(() => {
    if (!copy) return { pillars: [] }

    const pillarCopy = copy.pillars ?? {}
    const itemLabels = copy.items ?? {}
    const itemDescriptions = copy.itemDescriptions ?? {}

    const copilotEntries = INTL_AI_COPILOT_LINKS.map((item) => [
      item.id,
      resolveIntlAiFeatureItem(item, itemLabels, itemDescriptions),
    ])
    const groupEntries = INTL_AI_FEATURE_GROUPS.flatMap((group) =>
      group.items.map((item) => [
        item.id,
        resolveIntlAiFeatureItem(item, itemLabels, itemDescriptions),
      ]),
    )
    const groupItemsById = Object.fromEntries([...copilotEntries, ...groupEntries])

    const pillars = HOME_AI_PILLARS.map((pillar) => {
      const labels = pillarCopy[pillar.id] ?? {}
      const featureCopy = labels.features ?? {}
      const featureDetails = labels.featureDetails ?? {}

      const features = (pillar.featureIds ?? []).map((featureId) => {
        const resolved = groupItemsById[featureId]
        return {
          id: featureId,
          label: featureCopy[featureId] ?? resolved?.label ?? featureId,
          description:
            featureDetails[featureId] ?? resolved?.description ?? '',
          url: resolved?.url ?? null,
        }
      })

      const spotlightId =
        pillar.spotlightImageId ?? pillar.featureIds?.[0] ?? ''
      const spotlightResolved =
        groupItemsById[spotlightId] ?? groupItemsById[pillar.featureIds?.[0]]

      return {
        id: pillar.id,
        directoryGroupId: pillar.directoryGroupId ?? pillar.id,
        productPageUrl: pillar.productPageUrl ?? null,
        label: labels.label ?? pillar.id,
        tagline: labels.tagline ?? '',
        iconSrc: HERO_ICON_BY_ID[pillar.iconId] ?? null,
        spotlightImageSrc: spotlightResolved?.imageSrc ?? null,
        spotlightLead: labels.spotlightLead ?? '',
        features,
      }
    })

    return { pillars }
  }, [copy])
}
