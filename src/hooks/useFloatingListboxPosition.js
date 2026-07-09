import { useLayoutEffect, useState } from 'react'

const VIEWPORT_PADDING = 8
const MIN_LISTBOX_HEIGHT = 96

function getVisibleViewportBounds() {
  const viewport = window.visualViewport
  if (viewport) {
    return {
      top: viewport.offsetTop,
      bottom: viewport.offsetTop + viewport.height,
      height: viewport.height,
    }
  }

  return {
    top: 0,
    bottom: window.innerHeight,
    height: window.innerHeight,
  }
}

export function useFloatingListboxPosition({
  anchorRef,
  isOpen,
  maxHeight = 280,
  gap = 4,
}) {
  const [style, setStyle] = useState(null)

  useLayoutEffect(() => {
    if (!isOpen || !anchorRef.current) {
      setStyle(null)
      return undefined
    }

    const updatePosition = () => {
      const anchor = anchorRef.current
      if (!anchor) {
        return
      }

      const rect = anchor.getBoundingClientRect()
      const viewport = getVisibleViewportBounds()
      const spaceBelow = viewport.bottom - rect.bottom - gap - VIEWPORT_PADDING
      const spaceAbove = rect.top - viewport.top - gap - VIEWPORT_PADDING
      const preferBelow = spaceBelow >= MIN_LISTBOX_HEIGHT || spaceBelow >= spaceAbove
      const availableSpace = preferBelow ? spaceBelow : spaceAbove
      const resolvedMaxHeight = Math.min(
        maxHeight,
        Math.max(MIN_LISTBOX_HEIGHT, availableSpace),
      )

      if (preferBelow) {
        setStyle({
          position: 'fixed',
          top: `${rect.bottom + gap}px`,
          bottom: 'auto',
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          maxHeight: `${resolvedMaxHeight}px`,
          zIndex: 60,
        })
        return
      }

      setStyle({
        position: 'fixed',
        top: 'auto',
        bottom: `${window.innerHeight - rect.top + gap}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        maxHeight: `${resolvedMaxHeight}px`,
        zIndex: 60,
      })
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    const visualViewport = window.visualViewport
    visualViewport?.addEventListener('resize', updatePosition)
    visualViewport?.addEventListener('scroll', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
      visualViewport?.removeEventListener('resize', updatePosition)
      visualViewport?.removeEventListener('scroll', updatePosition)
    }
  }, [anchorRef, gap, isOpen, maxHeight])

  return style
}
