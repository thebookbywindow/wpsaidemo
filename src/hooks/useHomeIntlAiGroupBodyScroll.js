import { useEffect, useRef } from 'react'

/** Keep the group card clear of the viewport bottom edge. */
export const HOME_INTL_AI_GROUP_BOTTOM_GAP_PX = 16

/** Floor so a tiny viewport still shows a usable list. */
export const HOME_INTL_AI_GROUP_MIN_H_PX = 160

/**
 * Max height so a sticky group card never extends past the viewport bottom.
 */
export function getIntlAiViewportFitMaxHeightPx({
  viewportHeight,
  top,
  bottomGap = HOME_INTL_AI_GROUP_BOTTOM_GAP_PX,
  minHeight = HOME_INTL_AI_GROUP_MIN_H_PX,
}) {
  const vh = Number(viewportHeight)
  const t = Number(top)
  const gap = Number(bottomGap)
  const minH = Number(minHeight)
  if (!(vh > 0) || !Number.isFinite(t)) {
    return Number.isFinite(minH) && minH > 0 ? minH : HOME_INTL_AI_GROUP_MIN_H_PX
  }
  const floor = Number.isFinite(minH) && minH > 0 ? minH : HOME_INTL_AI_GROUP_MIN_H_PX
  const gapPx = Number.isFinite(gap) ? gap : HOME_INTL_AI_GROUP_BOTTOM_GAP_PX
  return Math.max(floor, Math.floor(vh - t - gapPx))
}

/**
 * Wheel over the group must not drive page scroll (sticky tab pin).
 * Always trap; the list consumes deltaY instead.
 */
export function shouldTrapIntlAiGroupWheel() {
  return true
}

/**
 * Apply wheel delta to an element. Normalizes line/page deltaMode.
 */
export function applyWheelDeltaToScrollTop(scroller, deltaY, deltaMode = 0) {
  if (!scroller) return 0
  let dy = Number(deltaY) || 0
  if (deltaMode === 1) dy *= 16
  if (deltaMode === 2) dy *= scroller.clientHeight || 1
  const prev = scroller.scrollTop
  scroller.scrollTop = prev + dy
  return scroller.scrollTop - prev
}

/**
 * Caps the active group card to the viewport and scrolls the list inside.
 * Wheel / trackpad over the card never propagates to the page.
 */
export function useHomeIntlAiGroupBodyScroll(activeId) {
  const groupRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = 0
  }, [activeId])

  useEffect(() => {
    const group = groupRef.current
    const list = listRef.current
    if (!group || !list) return undefined

    const syncMaxHeight = () => {
      const maxH = getIntlAiViewportFitMaxHeightPx({
        viewportHeight: window.innerHeight,
        top: group.getBoundingClientRect().top,
      })
      group.style.maxHeight = `${maxH}px`
    }

    const onWheel = (event) => {
      if (!shouldTrapIntlAiGroupWheel()) return
      event.preventDefault()
      event.stopPropagation()
      applyWheelDeltaToScrollTop(list, event.deltaY, event.deltaMode)
    }

    let frame = 0
    const scheduleSync = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        syncMaxHeight()
      })
    }

    syncMaxHeight()
    group.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('resize', scheduleSync)
    window.addEventListener('scroll', scheduleSync, { passive: true })
    const observer = new ResizeObserver(scheduleSync)
    observer.observe(group)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      group.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', scheduleSync)
      window.removeEventListener('scroll', scheduleSync)
      observer.disconnect()
      group.style.maxHeight = ''
    }
  }, [activeId])

  return { groupRef, listRef }
}
