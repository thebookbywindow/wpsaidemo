import { createDocsPathKey } from '../data/docsCenterMeta'
import { translateHelpCenterLabel } from '../data/helpCenterCatalogI18n'

function getPrimaryDocumentLink(entry) {
  return entry?.documents?.[0]?.link_url ?? ''
}

function getPrimaryDocumentName(entry) {
  return entry?.documents?.[0]?.name ?? entry.feature
}

export function buildHelpCenterSectionModels(entries = [], locale = 'zh-cn') {
  const sectionMap = new Map()

  entries.forEach((entry) => {
    const l1 = `${entry.l1 ?? ''}`.trim()
    const l2 = `${entry.l2 ?? ''}`.trim()
    const feature = `${entry.feature ?? ''}`.trim()

    if (!l1 || !l2 || !feature) {
      return
    }

    if (!sectionMap.has(l1)) {
      sectionMap.set(l1, {
        title: translateHelpCenterLabel(l1, locale),
        sourceTitle: l1,
        blocks: new Map(),
      })
    }

    const section = sectionMap.get(l1)
    if (!section.blocks.has(l2)) {
      section.blocks.set(l2, {
        title: translateHelpCenterLabel(l2, locale),
        sourceTitle: l2,
        items: new Map(),
      })
    }

    const block = section.blocks.get(l2)
    if (!block.items.has(feature)) {
      block.items.set(feature, {
        label: translateHelpCenterLabel(feature, locale),
        sourceLabel: feature,
        variants: [],
      })
    }

    block.items.get(feature).variants.push({
      id: entry.ID,
      platform: entry.platform,
      path: entry.path,
      linkUrl: getPrimaryDocumentLink(entry),
      documentName: getPrimaryDocumentName(entry),
      sourceType: entry.documents?.[0]?.source_type ?? '',
    })
  })

  return Array.from(sectionMap.values()).map((section) => ({
    title: section.title,
    sourceTitle: section.sourceTitle,
    blocks: Array.from(section.blocks.values()).map((block) => ({
      title: block.title,
      sourceTitle: block.sourceTitle,
      items: Array.from(block.items.values()),
    })),
  }))
}

export function buildHelpCenterMetaMap(entries = []) {
  const groupedEntries = new Map()

  entries.forEach((entry) => {
    const l1 = `${entry.l1 ?? ''}`.trim()
    const l2 = `${entry.l2 ?? ''}`.trim()
    const feature = `${entry.feature ?? ''}`.trim()

    if (!l1 || !l2 || !feature) {
      return
    }

    const pathKey = createDocsPathKey([l1, l2, feature])
    if (!groupedEntries.has(pathKey)) {
      groupedEntries.set(pathKey, {
        pathKey,
        l1,
        l2,
        feature,
        variants: [],
      })
    }

    groupedEntries.get(pathKey).variants.push({
      id: entry.ID,
      platform: entry.platform,
      path: entry.path,
      linkUrl: getPrimaryDocumentLink(entry),
      documentName: getPrimaryDocumentName(entry),
      sourceType: entry.documents?.[0]?.source_type ?? '',
    })
  })

  const metaMap = {}

  groupedEntries.forEach((group) => {
    const primaryVariant =
      group.variants.find((variant) => variant.platform === 'win')
      ?? group.variants.find((variant) => variant.platform === 'mac')
      ?? group.variants[0]

    metaMap[group.pathKey] = {
      pathKey: group.pathKey,
      pathParts: [group.l1, group.l2, group.feature],
      l1: group.l1,
      l2: group.l2,
      feature: group.feature,
      linkUrl: primaryVariant?.linkUrl ?? '',
      documentName: primaryVariant?.documentName ?? group.feature,
      variants: group.variants,
    }
  })

  return metaMap
}

export function resolveHelpCenterPathParts(section, block, item) {
  return [section.sourceTitle, block.sourceTitle, item.sourceLabel]
}

export function isHelpCenterCatalogItem(item) {
  return Array.isArray(item?.variants) && item.variants.length > 0
}

export function resolveHelpCenterLinkUrl(meta, preferredPlatform = '') {
  if (!meta?.variants?.length) {
    return meta?.linkUrl ?? ''
  }

  const normalizedPlatform = `${preferredPlatform ?? ''}`.trim().toLowerCase()
  if (normalizedPlatform) {
    const platformMatch = meta.variants.find(
      (variant) => `${variant.platform ?? ''}`.toLowerCase() === normalizedPlatform,
    )
    if (platformMatch?.linkUrl) {
      return platformMatch.linkUrl
    }
  }

  const winMatch = meta.variants.find((variant) => variant.platform === 'win')
  if (winMatch?.linkUrl) {
    return winMatch.linkUrl
  }

  const macMatch = meta.variants.find((variant) => variant.platform === 'mac')
  if (macMatch?.linkUrl) {
    return macMatch.linkUrl
  }

  return meta.linkUrl ?? meta.variants[0]?.linkUrl ?? ''
}

export function openHelpCenterDocument(meta, preferredPlatform = '') {
  const linkUrl = resolveHelpCenterLinkUrl(meta, preferredPlatform)
  if (!linkUrl) {
    return false
  }

  window.open(linkUrl, '_blank', 'noopener,noreferrer')
  return true
}
