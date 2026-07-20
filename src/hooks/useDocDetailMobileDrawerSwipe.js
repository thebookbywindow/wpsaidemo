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

/** 移动端：右滑打开左侧目录，左滑关闭 */
export function useDocDetailMobileDrawerSwipe({
  enabled = false,
  isMobile = false,
  leftOpen = false,
  showLeft = true,
  openLeft,
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

      // 左滑：关闭已打开的目录
      if (deltaX < 0) {
        if (leftOpen) {
          closeAll()
        }
        return
      }

      // 右滑：打开左侧目录
      if (!leftOpen && showLeft) {
        openLeft()
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
    leftOpen,
    openLeft,
    showLeft,
  ])
}
