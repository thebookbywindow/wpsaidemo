import { useCallback, useEffect, useRef } from 'react'
import {
  HOME_TABS_SCROLL_PIN_GAP_PX,
  getIntlAiTabHorizontalScrollLeft,
} from './useHomeTabsScrollPin'

function readNavHeightPx() {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--nav-height')
    .trim()
  const parsed = Number.parseFloat(raw)
  return Number.isFinite(parsed) ? parsed : 60
}

function readStickyTopPx(gapPx = HOME_TABS_SCROLL_PIN_GAP_PX) {
  return readNavHeightPx() + gapPx
}

function getScrollingElement() {
  return document.scrollingElement || document.documentElement
}

function readScrollTop() {
  return getScrollingElement().scrollTop || window.scrollY || 0
}

function writeScrollTop(y) {
  getScrollingElement().scrollTop = Math.max(0, y)
}

/** Fast start, long gentle landing — feels less robotic than ease-in-out. */
function easeOutQuint(t) {
  return 1 - Math.pow(1 - t, 5)
}

function getSmoothScrollDuration(distancePx) {
  const distance = Math.abs(Number(distancePx) || 0)
  return Math.min(1300, Math.max(620, 520 + distance * 0.58))
}

export function getPillarScrollTargetY(block, tabsDockEl, stickyGapPx = 8) {
  if (!block) return 0
  const dockH = tabsDockEl?.offsetHeight ?? 56
  const offset = readStickyTopPx(stickyGapPx) + dockH + 12
  return Math.max(0, readScrollTop() + block.getBoundingClientRect().top - offset)
}

/**
 * rAF scroll — single easing curve, no mid-animation snaps.
 * Returns cancel fn.
 */
export function animateWindowScrollTo(targetY, { startY, onComplete } = {}) {
  const target = Math.max(0, targetY)
  const fromY = Number.isFinite(startY) ? startY : readScrollTop()
  const delta = target - fromY

  if (Math.abs(delta) < 2) {
    writeScrollTop(target)
    onComplete?.()
    return () => {}
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    writeScrollTop(target)
    onComplete?.()
    return () => {}
  }

  const duration = getSmoothScrollDuration(delta)
  const startTime = performance.now()
  let frame = 0
  let cancelled = false

  const tick = (now) => {
    if (cancelled) return
    const progress = Math.min(1, (now - startTime) / duration)
    writeScrollTop(fromY + delta * easeOutQuint(progress))
    if (progress < 1) {
      frame = window.requestAnimationFrame(tick)
    } else {
      writeScrollTop(target)
      onComplete?.()
    }
  }

  frame = window.requestAnimationFrame(tick)
  return () => {
    cancelled = true
    if (frame) window.cancelAnimationFrame(frame)
  }
}

/** Pick the pillar block whose top has most recently crossed the sticky line. */
export function getPillarIdFromScroll(blocks, stickyOffset) {
  if (!Array.isArray(blocks) || blocks.length === 0) return ''

  let activeId = blocks[0].dataset.pillarId ?? ''
  for (const block of blocks) {
    const top = block.getBoundingClientRect().top
    if (top <= stickyOffset + 32) {
      activeId = block.dataset.pillarId ?? activeId
    }
  }
  return activeId
}

/**
 * Sticky capsule tabs + stacked pillar sections.
 * Click tab → scroll to section; scroll → update active tab.
 */
export function useHomeIntlAiStickyAnchorTabs({
  pillarIds,
  activeId,
  setActiveId,
  tabsSelector = '.home-intl-ai-tabs',
  activeTabSelector = '.home-intl-ai-tab.is-active',
  stickyGapPx = HOME_TABS_SCROLL_PIN_GAP_PX,
}) {
  const tabsDockRef = useRef(null)
  const setActiveIdRef = useRef(setActiveId)
  const activeIdRef = useRef(activeId)
  const ignoreSpyUntilRef = useRef(0)
  const tabScrollBehaviorRef = useRef('auto')
  const scrollAnimationCancelRef = useRef(null)

  useEffect(() => {
    setActiveIdRef.current = setActiveId
  }, [setActiveId])

  useEffect(() => {
    activeIdRef.current = activeId
  }, [activeId])

  useEffect(
    () => () => {
      scrollAnimationCancelRef.current?.()
      scrollAnimationCancelRef.current = null
    },
    [],
  )

  const readScrollOffset = useCallback(() => {
    const dockH = tabsDockRef.current?.offsetHeight ?? 56
    return readStickyTopPx(stickyGapPx) + dockH + 12
  }, [stickyGapPx])

  const scrollToPillar = useCallback(
    (id) => {
      if (!id) return
      const block = document.getElementById(`home-intl-ai-pillar-${id}`)
      if (!block) return

      scrollAnimationCancelRef.current?.()
      scrollAnimationCancelRef.current = null

      tabScrollBehaviorRef.current = 'smooth'
      setActiveIdRef.current?.(id)

      const targetY = getPillarScrollTargetY(block, tabsDockRef.current, stickyGapPx)
      const startY = readScrollTop()
      const delta = targetY - startY

      if (Math.abs(delta) < 2) {
        writeScrollTop(targetY)
        return
      }

      const duration = getSmoothScrollDuration(delta)
      ignoreSpyUntilRef.current = performance.now() + duration + 200

      scrollAnimationCancelRef.current = animateWindowScrollTo(targetY, {
        startY,
        onComplete: () => {
          scrollAnimationCancelRef.current = null
          const settledY = getPillarScrollTargetY(block, tabsDockRef.current, stickyGapPx)
          if (Math.abs(readScrollTop() - settledY) > 3) {
            writeScrollTop(settledY)
          }
        },
      })
    },
    [stickyGapPx],
  )

  useEffect(() => {
    const blocks = pillarIds
      .map((id) => document.getElementById(`home-intl-ai-pillar-${id}`))
      .filter(Boolean)
    if (!blocks.length) return undefined

    let frame = 0
    const syncActiveFromScroll = () => {
      if (performance.now() < ignoreSpyUntilRef.current) return
      const nextId = getPillarIdFromScroll(blocks, readScrollOffset())
      if (!nextId || nextId === activeIdRef.current) return
      tabScrollBehaviorRef.current = 'auto'
      setActiveIdRef.current?.(nextId)
    }

    const onScrollOrResize = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        syncActiveFromScroll()
      })
    }

    syncActiveFromScroll()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [pillarIds, readScrollOffset])

  useEffect(() => {
    const dock = tabsDockRef.current
    if (!dock) return
    const scroller = dock.querySelector(tabsSelector)
    const activeTabEl = dock.querySelector(activeTabSelector)
    if (!scroller || !activeTabEl) return
    const behavior = tabScrollBehaviorRef.current === 'smooth' ? 'smooth' : 'auto'
    scroller.scrollTo({
      left: getIntlAiTabHorizontalScrollLeft(scroller, activeTabEl),
      behavior,
    })
  }, [activeId, tabsSelector, activeTabSelector])

  useEffect(() => {
    const hash = window.location.hash
    const match = hash.match(/^#home-intl-ai-(?:pillar-|tab-)([\w-]+)$/)
    const pillarId = match?.[1]
    if (!pillarId || !pillarIds.includes(pillarId)) return undefined

    const timer = window.setTimeout(() => {
      scrollToPillar(pillarId)
    }, 160)
    return () => window.clearTimeout(timer)
  }, [pillarIds, scrollToPillar])

  return { tabsDockRef, scrollToPillar }
}
