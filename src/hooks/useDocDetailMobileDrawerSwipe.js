import { useEffect, useRef } from 'react'

const MIN_SWIPE_DISTANCE = 56
const HORIZONTAL_SWIPE_RATIO = 1.35
const MAX_VERTICAL_DRIFT = 72

function isSwipeIgnoredTarget(target) {
  if (!(target instanceof Element)) {
    return false
  }

  return Boolean(
    target.closest(
      'a, button, input, textarea, select, label, .docs-detail-mobile-drawer-panel, .docs-detail-mobile-drawer-nav, .docs-detail-platform-popover',
    ),
  )
}

export function useDocDetailMobileDrawerSwipe({
  enabled = false,
  isMobile = false,
  rightOpen = false,
  showRight = true,
  openRight,
  closeAll,
}) {
  const touchStartRef = useRef(null)

  useEffect(() => {
    if (!enabled || !isMobile) {
      return undefined
    }

    const handleTouchStart = (event) => {
      if (isSwipeIgnoredTarget(event.target)) {
        touchStartRef.current = null
        return
      }

      const touch = event.touches[0]
      if (!touch) {
        return
      }

      touchStartRef.current = {
        x: touch.clientX,
        y: touch.clientY,
      }
    }

    const handleTouchEnd = (event) => {
      const start = touchStartRef.current
      touchStartRef.current = null

      if (!start || isSwipeIgnoredTarget(event.target)) {
        return
      }

      const touch = event.changedTouches[0]
      if (!touch) {
        return
      }

      const deltaX = touch.clientX - start.x
      const deltaY = touch.clientY - start.y

      if (Math.abs(deltaY) > MAX_VERTICAL_DRIFT && Math.abs(deltaY) >= Math.abs(deltaX)) {
        return
      }

      if (Math.abs(deltaX) < MIN_SWIPE_DISTANCE) {
        return
      }

      if (Math.abs(deltaX) <= Math.abs(deltaY) * HORIZONTAL_SWIPE_RATIO) {
        return
      }

      if (deltaX > 0) {
        if (rightOpen) {
          closeAll()
        }
        return
      }

      if (!rightOpen && showRight) {
        openRight()
      }
    }

    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [
    closeAll,
    enabled,
    isMobile,
    openRight,
    rightOpen,
    showRight,
  ])
}
