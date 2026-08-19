import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { DocDetailMobileDrawerNavButton } from './DocDetailMobileDrawerNav'
import DocDetailTocPanel from './DocDetailTocPanel'

const POPOVER_WIDTH = 288
const POPOVER_GAP = 8
const POPOVER_VIEWPORT_GUTTER = 16

function getPopoverPosition(anchorRect) {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const navHeight = Number.parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
  ) || 64
  const panelWidth = Math.min(POPOVER_WIDTH, viewportWidth - POPOVER_VIEWPORT_GUTTER * 2)
  const maxLeft = viewportWidth - panelWidth - POPOVER_VIEWPORT_GUTTER
  const preferredLeft = anchorRect.right - panelWidth
  const left = Math.max(POPOVER_VIEWPORT_GUTTER, Math.min(preferredLeft, maxLeft))
  const top = Math.min(
    anchorRect.bottom + POPOVER_GAP,
    viewportHeight - POPOVER_VIEWPORT_GUTTER,
  )
  const maxHeight = Math.max(
    180,
    viewportHeight - top - POPOVER_VIEWPORT_GUTTER - navHeight * 0.15,
  )

  return {
    top: `${top}px`,
    left: `${left}px`,
    width: `${panelWidth}px`,
    maxHeight: `${maxHeight}px`,
  }
}

export default function DocDetailMobilePlatformPopover({
  label,
  hint,
  icon,
  isOpen,
  onToggle,
  onClose,
  sidebarTitle,
  isZhContent,
  expandedPlatformId,
  activePlatformId,
  activeSectionId,
  contentViewMode,
  onPlatformToggle,
  onSectionClick,
  platforms,
  universalSectionIds = [],
  platformSectionIds = [],
}) {
  const anchorRef = useRef(null)
  const panelRef = useRef(null)
  const [panelStyle, setPanelStyle] = useState(null)

  const updatePanelPosition = useCallback(() => {
    const anchor = anchorRef.current
    if (!anchor) {
      return
    }

    setPanelStyle(getPopoverPosition(anchor.getBoundingClientRect()))
  }, [])

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined
    }

    updatePanelPosition()
    window.addEventListener('resize', updatePanelPosition)
    window.addEventListener('scroll', updatePanelPosition, true)

    return () => {
      window.removeEventListener('resize', updatePanelPosition)
      window.removeEventListener('scroll', updatePanelPosition, true)
    }
  }, [isOpen, updatePanelPosition])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      const target = event.target
      if (!(target instanceof Node)) {
        return
      }

      if (anchorRef.current?.contains(target)) {
        return
      }

      if (panelRef.current?.contains(target)) {
        return
      }

      onClose()
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('touchstart', handlePointerDown, { passive: true })

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('touchstart', handlePointerDown)
    }
  }, [isOpen, onClose])

  return (
    <div className="docs-detail-platform-popover-anchor" ref={anchorRef}>
      <DocDetailMobileDrawerNavButton
        side="left"
        label={label}
        hint={hint}
        icon={icon}
        isOpen={isOpen}
        onClick={onToggle}
      />
      {isOpen && panelStyle
        ? createPortal(
            <>
              <button
                type="button"
                className="docs-detail-platform-popover-backdrop"
                aria-label={hint ? `${hint}：${label}` : label}
                onClick={onClose}
              />
              <div
                ref={panelRef}
                className="docs-detail-platform-popover"
                role="dialog"
                aria-modal="true"
                aria-label={label}
                style={panelStyle}
              >
                <DocDetailTocPanel
                  sidebarTitle={sidebarTitle}
                  isZhContent={isZhContent}
                  expandedPlatformId={expandedPlatformId}
                  activePlatformId={activePlatformId}
                  activeSectionId={activeSectionId}
                  contentViewMode={contentViewMode}
                  onPlatformToggle={onPlatformToggle}
                  onSectionClick={onSectionClick}
                  platforms={platforms}
                  universalSectionIds={universalSectionIds}
                  platformSectionIds={platformSectionIds}
                  embedded
                  variant="popover"
                />
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  )
}
