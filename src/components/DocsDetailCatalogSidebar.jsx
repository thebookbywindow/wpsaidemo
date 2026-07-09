import { forwardRef, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { createDocsPathKey } from '../data/docsCenterMeta'
import { useDocsCatalogSidebarSearch } from '../hooks/useDocsCatalogSidebarSearch'
import DocsCatalogSidebarSearch from './DocsCatalogSidebarSearch'

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

function exclusiveExpandedSection(sectionTitle) {
  return sectionTitle ? new Set([sectionTitle]) : new Set()
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
    searchEmptyText = 'No matching items',
    searchMode = 'dropdown',
    expandAllVisibleSections = false,
    sidebarClassName = 'docs-center-sidebar docs-detail-catalog-sidebar',
    showLeafNodes = true,
    limitToActiveSection = false,
    expandSectionsOnClickOnly = false,
    onDrawerClose,
    drawerCloseLabel = '',
    onLeafClick,
    onSectionNavigate,
    onBlockNavigate,
  },
  ref,
) {
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

  const showSidebarSearch = searchMode !== 'none'
  const displayedSectionModels = scopedSectionModels

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

  const handleLeafClick = (section, block, sourcePathParts) => {
    setExpandedSections((previous) => mergeExpandedSection(previous, section.title))

    if (block.title) {
      setExpandedBlocks((previous) =>
        mergeExpandedBlock(previous, buildBlockKey(section.title, block.title)),
      )
    }

    onLeafClick?.(sourcePathParts)
  }

  const {
    comboboxRef,
    searchKeyword: dropdownSearchKeyword,
    setSearchKeyword: setDropdownSearchKeyword,
    isDropdownOpen,
    setIsDropdownOpen,
    keyword,
    results,
    handleSelectResult,
  } = useDocsCatalogSidebarSearch({
    sectionModels: scopedSectionModels,
    showLeafNodes,
    searchScope: undefined,
    onLeafSelect: handleLeafClick,
    onBlockSelect: onBlockNavigate,
    onSectionSelect: onSectionNavigate,
  })

  useEffect(() => {
    if (activeDocPathKey) {
      return
    }

    if (!showLeafNodes) {
      if (expandSectionsOnClickOnly) {
        if (activeSectionTitle) {
          setExpandedSections(exclusiveExpandedSection(activeSectionTitle))
        }
        return
      }

      if (expandAllVisibleSections) {
        setExpandedSections(
          new Set(displayedSectionModels.map((section) => section.title)),
        )
        return
      }

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
  }, [
    activeBlockKey,
    activeDocPathKey,
    activeSectionTitle,
    displayedSectionModels,
    expandAllVisibleSections,
    expandSectionsOnClickOnly,
    showLeafNodes,
  ])

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
      if (expandSectionsOnClickOnly) {
        setExpandedSections((previous) => {
          if (previous.has(sectionTitle) && previous.size === 1) {
            return previous
          }
          return exclusiveExpandedSection(sectionTitle)
        })
      } else {
        toggleSection(sectionTitle)
      }
    }
    if (!expandSectionsOnClickOnly) {
      onSectionNavigate?.(sectionTitle)
    }
  }

  const handleBlockClick = (section, block) => {
    const blockKey = buildBlockKey(section.title, block.title)
    toggleBlock(blockKey)
    onBlockNavigate?.(section.title, block.title)
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
          {item.label}
        </button>
      )
    }

    return (
      <span key={pathKey} className="docs-center-toc-leaf">
        {item.label}
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
          const isBlockExpanded = expandedBlocks.has(blockKey)

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
                  {block.title}
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
          {block.title}
        </button>
      )
    })
  }

  return (
    <aside ref={ref} className={sidebarClassName} aria-label={sidebarHeading}>
      <div className={`docs-center-sidebar-heading${onDrawerClose ? ' has-drawer-close' : ''}`}>
        <h3>{sidebarHeading}</h3>
        {onDrawerClose ? (
          <button
            type="button"
            className="docs-detail-mobile-drawer-close docs-center-sidebar-drawer-close"
            aria-label={drawerCloseLabel || sidebarHeading}
            title={drawerCloseLabel || sidebarHeading}
            onClick={onDrawerClose}
          >
            <ChevronLeft size={16} strokeWidth={2.25} aria-hidden="true" />
          </button>
        ) : null}
      </div>
      {showSidebarSearch ? (
        <DocsCatalogSidebarSearch
          comboboxRef={comboboxRef}
          searchKeyword={dropdownSearchKeyword}
          onSearchKeywordChange={setDropdownSearchKeyword}
          isDropdownOpen={isDropdownOpen}
          onDropdownOpenChange={setIsDropdownOpen}
          searchPlaceholder={searchPlaceholder}
          emptyResultsText={searchEmptyText}
          keyword={keyword}
          results={results}
          onSelectResult={handleSelectResult}
          showResultMeta={!limitToActiveSection}
        />
      ) : null}
      <div className="docs-center-sidebar-body">
        {limitToActiveSection ? (
          displayedSectionModels.map((section) => (
            <div
              key={`detail-catalog-scoped-${section.title}-${activeLocation.blockKey}`}
              className="docs-center-toc-children docs-center-toc-children--scoped-root"
            >
              {renderScopedLeafNodes(section)}
            </div>
          ))
        ) : (
          displayedSectionModels.map((section) => {
            const isSectionExpanded = expandedSections.has(section.title)

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
                    {section.title}
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
