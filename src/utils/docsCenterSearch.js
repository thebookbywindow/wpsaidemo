export function includesCatalogKeyword(text, keyword) {
  return `${text ?? ''}`.toLowerCase().includes(keyword)
}

export function sectionMatchesKeyword(section, keyword) {
  return (
    includesCatalogKeyword(section.title, keyword)
    || includesCatalogKeyword(section.sourceTitle, keyword)
  )
}

export function blockMatchesKeyword(block, keyword) {
  return (
    includesCatalogKeyword(block.title, keyword)
    || includesCatalogKeyword(block.sourceTitle, keyword)
  )
}

export function itemMatchesKeyword(item, keyword) {
  return (
    includesCatalogKeyword(item.label, keyword)
    || includesCatalogKeyword(item.sourceLabel, keyword)
  )
}

export function filterSectionsForCatalogDirectory(sectionModels, keyword) {
  if (!keyword) {
    return sectionModels
  }

  return sectionModels
    .map((section) => {
      const sectionMatches = sectionMatchesKeyword(section, keyword)
      const nextBlocks = section.blocks
        .map((block) => {
          const blockMatches = blockMatchesKeyword(block, keyword)
          if (!sectionMatches && !blockMatches) {
            return null
          }

          return {
            ...block,
            items: block.items,
          }
        })
        .filter(Boolean)

      if (!nextBlocks.length) {
        return null
      }

      return {
        ...section,
        blocks: nextBlocks,
      }
    })
    .filter(Boolean)
}

export function filterSectionsForKeyword(sectionModels, keyword) {
  if (!keyword) {
    return sectionModels
  }

  return sectionModels
    .map((section) => {
      const sectionMatches = sectionMatchesKeyword(section, keyword)
      const nextBlocks = section.blocks
        .map((block) => {
          const blockMatches = blockMatchesKeyword(block, keyword)
          const nextItems =
            sectionMatches || blockMatches
              ? block.items
              : block.items.filter((item) => itemMatchesKeyword(item, keyword))
          if (!nextItems.length) {
            return null
          }
          return {
            ...block,
            items: nextItems,
          }
        })
        .filter(Boolean)

      if (!nextBlocks.length) {
        return null
      }

      return {
        ...section,
        blocks: nextBlocks,
      }
    })
    .filter(Boolean)
}

export function filterSectionsForLeafKeyword(sectionModels, keyword) {
  if (!keyword) {
    return sectionModels
  }

  return sectionModels
    .map((section) => {
      const nextBlocks = section.blocks
        .map((block) => {
          const nextItems = block.items.filter((item) => itemMatchesKeyword(item, keyword))
          if (!nextItems.length) {
            return null
          }
          return {
            ...block,
            items: nextItems,
          }
        })
        .filter(Boolean)

      if (!nextBlocks.length) {
        return null
      }

      return {
        ...section,
        blocks: nextBlocks,
      }
    })
    .filter(Boolean)
}

export function buildCatalogSearchResults(
  sectionModels,
  keyword,
  searchScope = 'leaf',
) {
  const normalizedKeyword = `${keyword ?? ''}`.trim().toLowerCase()
  if (!normalizedKeyword) {
    return []
  }

  const leafResults = []
  const sectionResults = []
  const blockResults = []
  const includeCatalog = searchScope === 'catalog' || searchScope === 'all'
  const includeLeaf = searchScope === 'leaf' || searchScope === 'all'

  sectionModels.forEach((section) => {
    if (includeCatalog && sectionMatchesKeyword(section, normalizedKeyword)) {
      sectionResults.push({
        key: `section-${section.title}`,
        type: 'section',
        label: section.title,
        sectionTitle: section.title,
      })
    }

    section.blocks.forEach((block) => {
      if (
        includeCatalog
        && block.title
        && blockMatchesKeyword(block, normalizedKeyword)
      ) {
        blockResults.push({
          key: `block-${section.title}::${block.title}`,
          type: 'block',
          label: block.title,
          sectionTitle: section.title,
          blockTitle: block.title,
        })
      }

      if (!includeLeaf) {
        return
      }

      block.items.forEach((item) => {
        if (!itemMatchesKeyword(item, normalizedKeyword)) {
          return
        }

        const sourcePathParts = block.sourceTitle
          ? [section.sourceTitle, block.sourceTitle, item.sourceLabel]
          : [section.sourceTitle, item.sourceLabel]

        leafResults.push({
          key: createCatalogSearchLeafKey(sourcePathParts),
          type: 'leaf',
          label: item.label,
          pathKey: createCatalogSearchLeafKey(sourcePathParts),
          sourcePathParts,
          sectionTitle: section.title,
          blockTitle: block.title ?? '',
          section,
          block,
          item,
        })
      })
    })
  })

  if (searchScope === 'catalog') {
    return [...sectionResults, ...blockResults]
  }

  if (searchScope === 'all') {
    return [...sectionResults, ...blockResults, ...leafResults]
  }

  return leafResults
}

function createCatalogSearchLeafKey(sourcePathParts) {
  return sourcePathParts.filter(Boolean).join(' / ')
}

export function getCatalogSearchResultMetaLabel(result) {
  if (!result || result.type === 'section') {
    return ''
  }

  if (result.type === 'block') {
    return `${result.sectionTitle ?? ''}`.trim()
  }

  if (result.type === 'leaf') {
    const sectionTitle = `${result.sectionTitle ?? result.section?.title ?? ''}`.trim()
    const blockTitle = `${result.blockTitle ?? result.block?.title ?? ''}`.trim()
    return [sectionTitle, blockTitle].filter(Boolean).join(' / ')
  }

  return ''
}

export function resolveHeroSearchScrollTarget(sectionModels, keyword) {
  const normalizedKeyword = `${keyword ?? ''}`.trim().toLowerCase()
  if (!normalizedKeyword) {
    return null
  }

  const filtered = filterSectionsForLeafKeyword(sectionModels, normalizedKeyword)
  const firstSection = filtered[0]
  if (!firstSection) {
    return null
  }

  const matchedBlock = firstSection.blocks[0]

  return {
    sectionTitle: firstSection.title,
    blockTitle: matchedBlock?.title ?? '',
  }
}
