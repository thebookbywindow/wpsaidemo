import { useLayoutEffect, useState } from 'react'

const VIEWPORT_PADDING = 8

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
      const spaceBelow = window.innerHeight - rect.bottom - gap - VIEWPORT_PADDING
      const resolvedMaxHeight = Math.min(maxHeight, Math.max(96, spaceBelow))

      setStyle({
        position: 'fixed',
        top: `${rect.bottom + gap}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        maxHeight: `${resolvedMaxHeight}px`,
        zIndex: 60,
      })
    }

    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)

    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [anchorRef, gap, isOpen, maxHeight])

  return style
}
