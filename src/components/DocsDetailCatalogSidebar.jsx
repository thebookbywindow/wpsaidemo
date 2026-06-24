import { forwardRef, useEffect, useMemo, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { createDocsPathKey } from '../data/docsCenterMeta'

function includesKeyword(text, keyword) {
  return `${text ?? ''}`.toLowerCase().includes(keyword)
}

function renderHighlightedText(text, keyword) {
  if (!keyword) {
    return text
  }

  const source = `${text ?? ''}`
  const lowerSource = source.toLowerCase()
  const lowerKeyword = keyword.toLowerCase()
  const parts = []
  let cursor = 0
  let matchIndex = lowerSource.indexOf(lowerKeyword)

  while (matchIndex !== -1) {
    if (matchIndex > cursor) {
      parts.push(source.slice(cursor, matchIndex))
    }
    const match = source.slice(matchIndex, matchIndex + keyword.length)
    parts.push(
      <span key={`${match}-${matchIndex}`} className="docs-center-highlight">
        {match}
      </span>,
    )
    cursor = matchIndex + keyword.length
    matchIndex = lowerSource.indexOf(lowerKeyword, cursor)
  }

  if (cursor < source.length) {
    parts.push(source.slice(cursor))
  }

  return parts
}

function filterHomeCatalogTree(sectionModels, keyword) {
  if (!keyword) {
    return sectionModels
  }

  return sectionModels
    .map((section) => {
      const sectionMatches = includesKeyword(section.title, keyword)
      const titledBlocks = section.blocks.filter((block) => block.title)
      const nextBlocks = sectionMatches
        ? titledBlocks
        : titledBlocks.filter((block) => includesKeyword(block.title, keyword))

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

function filterDetailCatalogTree(sectionModels, keyword) {
  if (!keyword) {
    return sectionModels
  }

  return sectionModels
    .map((section) => {
      const sectionMatches = includesKeyword(section.title, keyword)
      const nextBlocks = section.blocks
        .map((block) => {
          const blockMatches = includesKeyword(block.title, keyword)
          const nextItems =
            sectionMatches || blockMatches
              ? block.items
              : block.items.filter((item) => includesKeyword(item.label, keyword))

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

function findActiveLocation(sectionModels, activeDocPathKey) {
  if (!activeDocPathKey) {
    return { sectionTitle: '', blockTitle: '', blockKey: '' }
  }

  for (const section of sectionModels) {
    for (const block of section.blocks) {
      for (const item of block.items) {
        const sourcePathParts = block.sourceTitle
          ? [section.sourceTitle, block.sourceTitle, item.sourceLabel]
          : [section.sourceTitle, item.sourceLabel]

        if (createDocsPathKey(sourcePathParts) === activeDocPathKey) {
          return {
            sectionTitle: section.title,
            blockTitle: block.title,
            blockKey: block.title ? buildBlockKey(section.title, block.title) : '',
          }
        }
      }
    }
  }

  return { sectionTitle: '', blockTitle: '', blockKey: '' }
}

function getBlockTitleFromBlockKey(blockKey) {
  const separatorIndex = `${blockKey ?? ''}`.indexOf('::')
  if (separatorIndex < 0) {
    return ''
  }

  return blockKey.slice(separatorIndex + 2)
}

function resolveSidebarActiveLocation({
  sectionModels,
  activeDocPathKey,
  activeSectionTitle,
  activeBlockKey,
}) {
  if (activeDocPathKey) {
    return findActiveLocation(sectionModels, activeDocPathKey)
  }

  return {
    sectionTitle: activeSectionTitle,
    blockTitle: getBlockTitleFromBlockKey(activeBlockKey),
    blockKey: activeBlockKey,
  }
}

function buildBlockKey(sectionTitle, blockTitle) {
  return `${sectionTitle}::${blockTitle}`
}

function sectionHasExpandableChildren(section, showLeafNodes) {
  if (showLeafNodes) {
    return section.blocks.some((block) => block.items.length > 0)
  }

  return section.blocks.some((block) => block.title)
}

function getVisibleTitledBlocks(section) {
  return section.blocks.filter((block) => block.title)
}

function createExpandedSetsFromLocation(location) {
  const sections = new Set()
  const blocks = new Set()

  if (location.sectionTitle) {
    sections.add(location.sectionTitle)
  }

  if (location.blockKey) {
    blocks.add(location.blockKey)
  }

  return { sections, blocks }
}

function mergeExpandedSection(previous, sectionTitle) {
  if (!sectionTitle || previous.has(sectionTitle)) {
    return previous
  }

  const next = new Set(previous)
  next.add(sectionTitle)
  return next
}

function mergeExpandedBlock(previous, blockKey) {
  if (!blockKey || previous.has(blockKey)) {
    return previous
  }

  const next = new Set(previous)
  next.add(blockKey)
  return next
}

function scopeSectionModelsToActiveSection(sectionModels, sectionTitle) {
  if (!sectionTitle) {
    return sectionModels
  }

  return sectionModels.filter((section) => section.title === sectionTitle)
}

function scopeSectionModelsToActiveBlock(sectionModels, blockKey) {
  if (!blockKey) {
    return sectionModels
  }

  return sectionModels
    .map((section) => {
      const nextBlocks = section.blocks.filter(
        (block) => block.title && buildBlockKey(section.title, block.title) === blockKey,
      )

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

const DocsDetailCatalogSidebar = forwardRef(function DocsDetailCatalogSidebar(
  {
    sectionModels,
    staticMetaMap,
    helpCenterMetaMap = {},
    activeDocPathKey = '',
    activeSectionTitle = '',
    activeBlockKey = '',
    directoryTitle,
    searchPlaceholder,
    sidebarClassName = 'docs-center-sidebar docs-detail-catalog-sidebar',
    showLeafNodes = true,
    limitToActiveSection = false,
    onLeafClick,
    onSectionNavigate,
    onBlockNavigate,
  },
  ref,
) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const keyword = searchKeyword.trim().toLowerCase()
  const hasSearchKeyword = Boolean(keyword)

  const activeLocation = useMemo(
    () =>
      resolveSidebarActiveLocation({
        sectionModels,
        activeDocPathKey,
        activeSectionTitle,
        activeBlockKey,
      }),
    [activeBlockKey, activeDocPathKey, activeSectionTitle, sectionModels],
  )

  const scopedSectionModels = useMemo(() => {
    if (!limitToActiveSection) {
      return sectionModels
    }

    const sectionScoped = scopeSectionModelsToActiveSection(
      sectionModels,
      activeLocation.sectionTitle,
    )

    if (activeLocation.blockKey) {
      return scopeSectionModelsToActiveBlock(sectionScoped, activeLocation.blockKey)
    }

    return sectionScoped
  }, [activeLocation.blockKey, activeLocation.sectionTitle, limitToActiveSection, sectionModels])

  const filteredSections = useMemo(
    () =>
      showLeafNodes
        ? filterDetailCatalogTree(scopedSectionModels, keyword)
        : filterHomeCatalogTree(scopedSectionModels, keyword),
    [keyword, scopedSectionModels, showLeafNodes],
  )

  const [expandedSections, setExpandedSections] = useState(() => {
    if (!showLeafNodes) {
      return new Set()
    }

    return createExpandedSetsFromLocation(
      resolveSidebarActiveLocation({
        sectionModels,
        activeDocPathKey,
        activeSectionTitle,
        activeBlockKey,
      }),
    ).sections
  })
  const [expandedBlocks, setExpandedBlocks] = useState(() => {
    if (!showLeafNodes) {
      return new Set()
    }

    return createExpandedSetsFromLocation(
      resolveSidebarActiveLocation({
        sectionModels,
        activeDocPathKey,
        activeSectionTitle,
        activeBlockKey,
      }),
    ).blocks
  })

  useEffect(() => {
    if (hasSearchKeyword || activeDocPathKey) {
      return
    }

    if (!showLeafNodes) {
      setExpandedSections(() =>
        activeSectionTitle ? new Set([activeSectionTitle]) : new Set(),
      )
      return
    }

    if (!activeSectionTitle) {
      return
    }

    setExpandedSections((previous) => mergeExpandedSection(previous, activeSectionTitle))

    if (activeBlockKey) {
      setExpandedBlocks((previous) => mergeExpandedBlock(previous, activeBlockKey))
    }
  }, [activeBlockKey, activeDocPathKey, activeSectionTitle, hasSearchKeyword, showLeafNodes])

  const toggleSection = (sectionTitle) => {
    setExpandedSections((previous) => {
      const next = new Set(previous)
      if (next.has(sectionTitle)) {
        next.delete(sectionTitle)
      } else {
        next.add(sectionTitle)
      }
      return next
    })
  }

  const toggleBlock = (blockKey) => {
    setExpandedBlocks((previous) => {
      const next = new Set(previous)
      if (next.has(blockKey)) {
        next.delete(blockKey)
      } else {
        next.add(blockKey)
      }
      return next
    })
  }

  const handleSectionClick = (sectionTitle) => {
    if (!limitToActiveSection) {
      toggleSection(sectionTitle)
    }
    onSectionNavigate?.(sectionTitle)
  }

  const handleBlockClick = (section, block) => {
    const blockKey = buildBlockKey(section.title, block.title)
    toggleBlock(blockKey)
    onBlockNavigate?.(section.title, block.title)
  }

  const handleLeafClick = (section, block, sourcePathParts) => {
    setExpandedSections((previous) => mergeExpandedSection(previous, section.title))

    if (block.title) {
      setExpandedBlocks((previous) =>
        mergeExpandedBlock(previous, buildBlockKey(section.title, block.title)),
      )
    }

    onLeafClick?.(sourcePathParts)
  }

  const renderLeaf = (section, block, item) => {
    const sourcePathParts = block.sourceTitle
      ? [section.sourceTitle, block.sourceTitle, item.sourceLabel]
      : [section.sourceTitle, item.sourceLabel]
    const pathKey = createDocsPathKey(sourcePathParts)
    const meta = staticMetaMap[pathKey]
    const isClickable = Boolean(meta?.helpContent && meta?.routeSlug)
    const isActive = pathKey === activeDocPathKey

    if (isClickable) {
      return (
        <button
          key={pathKey}
          type="button"
          className={`docs-center-toc-leaf has-doc${isActive ? ' active' : ''}`}
          onClick={() => handleLeafClick(section, block, sourcePathParts)}
        >
          {renderHighlightedText(item.label, keyword)}
        </button>
      )
    }

    return (
      <span key={pathKey} className="docs-center-toc-leaf">
        {renderHighlightedText(item.label, keyword)}
      </span>
    )
  }

  const scopedBlockTitle =
    activeLocation.blockTitle || getBlockTitleFromBlockKey(activeLocation.blockKey)

  const sidebarHeading = (() => {
    if (!limitToActiveSection) {
      return directoryTitle
    }

    if (activeLocation.sectionTitle && scopedBlockTitle) {
      return `${activeLocation.sectionTitle} > ${scopedBlockTitle}`
    }

    return scopedBlockTitle || activeLocation.sectionTitle || directoryTitle
  })()

  const renderScopedLeafNodes = (section) => (
    <div className="docs-center-toc-leaves docs-center-toc-leaves--scoped-flat">
      {section.blocks.flatMap((block) => block.items.map((item) => renderLeaf(section, block, item)))}
    </div>
  )

  const renderSectionContent = (section) => {
    if (showLeafNodes) {
      return section.blocks.map((block, blockIndex) => {
        if (block.title) {
          const blockKey = buildBlockKey(section.title, block.title)
          const isBlockExpanded = hasSearchKeyword || expandedBlocks.has(blockKey)

          return (
            <div
              key={blockKey}
              className={`docs-center-toc-block${isBlockExpanded ? ' is-expanded' : ''}`}
            >
              <button
                type="button"
                className={`docs-center-toc-child docs-center-toc-block-btn docs-center-toc-expand-btn${
                  activeLocation.blockKey === blockKey ? ' active' : ''
                }${isBlockExpanded ? ' is-expanded' : ''}`}
                aria-expanded={isBlockExpanded}
                onClick={() => handleBlockClick(section, block)}
              >
                <span className="docs-center-toc-expand-label">
                  {renderHighlightedText(block.title, keyword)}
                </span>
                {block.items.length > 0 ? (
                  <ChevronRight
                    size={12}
                    className="docs-center-toc-expand-chevron"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
              {isBlockExpanded ? (
                <div className="docs-center-toc-leaves">
                  {block.items.map((item) => renderLeaf(section, block, item))}
                </div>
              ) : null}
            </div>
          )
        }

        return (
          <div
            key={`detail-catalog-flat-${section.title}-${blockIndex}`}
            className="docs-center-toc-leaves docs-center-toc-leaves--flat"
          >
            {block.items.map((item) => renderLeaf(section, block, item))}
          </div>
        )
      })
    }

    return getVisibleTitledBlocks(section).map((block) => {
      const blockKey = buildBlockKey(section.title, block.title)

      return (
        <button
          key={blockKey}
          type="button"
          className={`docs-center-toc-child${
            activeLocation.blockKey === blockKey ? ' active' : ''
          }`}
          onClick={() => onBlockNavigate?.(section.title, block.title)}
        >
          {renderHighlightedText(block.title, keyword)}
        </button>
      )
    })
  }

  return (
    <aside ref={ref} className={sidebarClassName} aria-label={sidebarHeading}>
      <h3>{sidebarHeading}</h3>
      <label className="docs-center-sidebar-search">
        <span aria-hidden="true">⌕</span>
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
        />
      </label>
      <div>
        {limitToActiveSection ? (
          filteredSections.map((section) => (
            <div
              key={`detail-catalog-scoped-${section.title}-${activeLocation.blockKey}`}
              className="docs-center-toc-children docs-center-toc-children--scoped-root"
            >
              {renderScopedLeafNodes(section)}
            </div>
          ))
        ) : (
          filteredSections.map((section) => {
            const isSectionExpanded = hasSearchKeyword || expandedSections.has(section.title)

            return (
              <div
                key={`detail-catalog-${section.title}`}
                className={`docs-center-toc-parent${isSectionExpanded ? ' is-expanded' : ''}`}
              >
                <button
                  type="button"
                  className={`docs-center-toc-parent-btn docs-center-toc-expand-btn${
                    activeLocation.sectionTitle === section.title ? ' active' : ''
                  }${isSectionExpanded ? ' is-expanded' : ''}`}
                  aria-expanded={isSectionExpanded}
                  onClick={() => handleSectionClick(section.title)}
                >
                  <span className="docs-center-toc-expand-label">
                    {renderHighlightedText(section.title, keyword)}
                  </span>
                  {sectionHasExpandableChildren(section, showLeafNodes) ? (
                    <ChevronRight
                      size={13}
                      className="docs-center-toc-expand-chevron"
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
                {isSectionExpanded ? (
                  <div className="docs-center-toc-children">{renderSectionContent(section)}</div>
                ) : null}
              </div>
            )
          })
        )}
      </div>
    </aside>
  )
})

export default DocsDetailCatalogSidebar
