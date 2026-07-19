import { useEffect, useRef } from 'react'

/** Gap below the fixed nav before the capsule sticks. */
export const HOME_TABS_SCROLL_PIN_GAP_PX = 20

/** @deprecated Use HOME_TABS_SCROLL_PIN_GAP_PX */
export const HOME_INTL_AI_STICKY_GAP_PX = HOME_TABS_SCROLL_PIN_GAP_PX

/**
 * Dead-zone around a tab's progress center so tiny height/progress
 * noise cannot flip the active tab back and forth.
 */
export const HOME_INTL_AI_TAB_HYSTERESIS = 0.28

/**
 * Move active capsule tab by delta (-1 prev / +1 next). Clamps at ends.
 */
export function getAdjacentIntlAiTabId(tabs, activeId, delta) {
  if (!Array.isArray(tabs) || tabs.length === 0) return ''
  const step = Number.isFinite(delta) ? Math.sign(delta) : 0
  if (step === 0) return activeId || tabs[0].id

  const index = tabs.findIndex((tab) => tab.id === activeId)
  const start = index < 0 ? 0 : index
  const next = Math.min(tabs.length - 1, Math.max(0, start + step))
  return tabs[next].id
}

/**
 * Progress through the sticky track while the panel is pinned.
 * 0 = just stuck; 1 = about to unstick at the bottom of the track.
 */
export function getIntlAiScrollProgress({ trackTop, stickyTop, scrollable }) {
  if (!(scrollable > 0) || !Number.isFinite(trackTop) || !Number.isFinite(stickyTop)) {
    return 0
  }
  return Math.min(1, Math.max(0, (stickyTop - trackTop) / scrollable))
}

/**
 * Distance the page can scroll while the panel stays pinned.
 * Always use a locked panel height (max measured), never the live
 * content height — otherwise tab switches change scrollable and
 * progress flips tabs in a feedback loop (visible shake).
 */
export function getIntlAiScrollablePx(trackHeight, lockedPanelHeight) {
  return Math.max(1, (Number(trackHeight) || 0) - (Number(lockedPanelHeight) || 0))
}

/** Map scroll progress [0,1] → tab index. */
export function getIntlAiTabIndexFromProgress(
  progress,
  tabCount,
  currentIndex = null,
  hysteresis = HOME_INTL_AI_TAB_HYSTERESIS,
) {
  if (!(tabCount > 1)) return 0
  const p = Math.min(1, Math.max(0, Number(progress) || 0))
  const raw = p * (tabCount - 1)
  const rounded = Math.round(raw)

  if (
    currentIndex == null ||
    !Number.isFinite(currentIndex) ||
    currentIndex < 0 ||
    currentIndex >= tabCount
  ) {
    return rounded
  }

  if (rounded === currentIndex) return currentIndex

  const buffer = Math.min(0.45, Math.max(0, Number(hysteresis) || 0))
  if (rounded > currentIndex) {
    return raw >= currentIndex + 0.5 + buffer ? rounded : currentIndex
  }
  return raw <= currentIndex - 0.5 - buffer ? rounded : currentIndex
}

/** Map tab index → scroll progress for click-to-scroll alignment. */
export function getIntlAiProgressFromTabIndex(index, tabCount) {
  if (!(tabCount > 1)) return 0
  const i = Math.min(tabCount - 1, Math.max(0, Number(index) || 0))
  return i / (tabCount - 1)
}

/**
 * Horizontally center an active tab inside its overflow scroller.
 * Avoids element.scrollIntoView which can vertically jump the page.
 */
export function getIntlAiTabHorizontalScrollLeft(scroller, tab) {
  if (!scroller || !tab) return 0
  const tabLeft = tab.offsetLeft
  const tabWidth = tab.offsetWidth
  const viewW = scroller.clientWidth
  if (!(viewW > 0) || !(tabWidth > 0)) return Math.max(0, scroller.scrollLeft || 0)
  return Math.max(0, tabLeft - (viewW - tabWidth) / 2)
}

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

/**
 * Sticky panel + tall track: further page scroll advances tabs (~20px under nav).
 */
export function useHomeTabsScrollPin({
  tabs,
  activeId,
  setActiveId,
  cssPrefix,
  tabsSelector,
  activeTabSelector,
  stickyGapPx = HOME_TABS_SCROLL_PIN_GAP_PX,
}) {
  const trackRef = useRef(null)
  const panelRef = useRef(null)
  const tabsRef = useRef(tabs)
  const activeIdRef = useRef(activeId)
  const setActiveIdRef = useRef(setActiveId)
  const ignoreScrollSyncUntilRef = useRef(0)
  const tabScrollBehaviorRef = useRef('auto')
  const lockedPanelHeightRef = useRef(0)

  const tabCountVar = `--${cssPrefix}-tab-count`
  const panelHVar = `--${cssPrefix}-panel-h`
  const resolvedTabsSelector = tabsSelector ?? `.${cssPrefix}-tabs`
  const resolvedActiveTabSelector =
    activeTabSelector ?? `.${cssPrefix}-tab.is-active`

  useEffect(() => {
    tabsRef.current = tabs
  }, [tabs])

  useEffect(() => {
    activeIdRef.current = activeId
  }, [activeId])

  useEffect(() => {
    setActiveIdRef.current = setActiveId
  }, [setActiveId])

  useEffect(() => {
    const track = trackRef.current
    const panel = panelRef.current
    if (!track || !panel) return undefined

    const tabCount = () => Math.max(1, tabsRef.current?.length ?? 1)

    const syncTrackMetrics = () => {
      const count = tabCount()
      track.style.setProperty(tabCountVar, String(count))

      const stickyTop = readStickyTopPx(stickyGapPx)
      const viewportCap = Math.max(
        160,
        Math.floor(window.innerHeight - stickyTop - 12),
      )
      const measuredH = Math.ceil(panel.getBoundingClientRect().height)
      if (measuredH > 0) {
        lockedPanelHeightRef.current = Math.min(
          viewportCap,
          Math.max(lockedPanelHeightRef.current, measuredH),
        )
      }
      lockedPanelHeightRef.current = Math.min(
        viewportCap,
        lockedPanelHeightRef.current || measuredH || 0,
      )
      const lockedH = lockedPanelHeightRef.current
      const liveH = measuredH > 0 ? measuredH : lockedH
      if (lockedH > 0) {
        track.style.setProperty(panelHVar, `${lockedH}px`)
        panel.style.minHeight = ''
        panel.style.maxHeight = `${viewportCap}px`
      }

      const section = track.closest('.home-ai-capabilities-section')
      const peekPx = Math.max(
        0,
        Math.min(140, Math.floor(window.innerHeight - stickyTop - liveH - 40)),
      )
      section?.style.setProperty('--home-intl-ai-peek', `${peekPx}px`)

      const trackHeight = track.offsetHeight
      const panelHeight = lockedH || panel.offsetHeight
      return {
        count,
        panelHeight,
        trackHeight,
        scrollable: getIntlAiScrollablePx(trackHeight, panelHeight),
      }
    }

    const syncActiveFromScroll = () => {
      if (performance.now() < ignoreScrollSyncUntilRef.current) return

      const { count, scrollable } = syncTrackMetrics()
      const stickyTop = readStickyTopPx(stickyGapPx)
      const progress = getIntlAiScrollProgress({
        trackTop: track.getBoundingClientRect().top,
        stickyTop,
        scrollable,
      })
      const list = tabsRef.current ?? []
      const currentIndex = list.findIndex((tab) => tab.id === activeIdRef.current)
      const index = getIntlAiTabIndexFromProgress(progress, count, currentIndex)
      const nextId = list[index]?.id
      if (!nextId || nextId === activeIdRef.current) return
      tabScrollBehaviorRef.current = 'auto'
      setActiveIdRef.current?.(nextId)
    }

    let frame = 0
    const onScrollOrResize = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        syncActiveFromScroll()
      })
    }

    syncActiveFromScroll()
    const observer = new ResizeObserver(onScrollOrResize)
    observer.observe(track)
    observer.observe(panel)
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [tabCountVar, panelHVar, stickyGapPx])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    const scroller = panel.querySelector(resolvedTabsSelector)
    const activeTabEl = panel.querySelector(resolvedActiveTabSelector)
    if (!scroller || !activeTabEl) return
    const behavior = tabScrollBehaviorRef.current === 'smooth' ? 'smooth' : 'auto'
    scroller.scrollTo({
      left: getIntlAiTabHorizontalScrollLeft(scroller, activeTabEl),
      behavior,
    })
  }, [activeId, resolvedTabsSelector, resolvedActiveTabSelector])

  const selectTab = (id) => {
    const list = tabsRef.current ?? []
    const index = list.findIndex((tab) => tab.id === id)
    if (index < 0) return

    tabScrollBehaviorRef.current = 'smooth'
    setActiveIdRef.current?.(id)

    const track = trackRef.current
    const panel = panelRef.current
    if (!track || !panel) return

    const lockedH = lockedPanelHeightRef.current || panel.offsetHeight
    const trackHeight = track.offsetHeight
    const scrollable = getIntlAiScrollablePx(trackHeight, lockedH)
    const stickyTop = readStickyTopPx(stickyGapPx)
    const progress = getIntlAiProgressFromTabIndex(index, list.length)
    const trackTopDoc = window.scrollY + track.getBoundingClientRect().top
    const targetY = trackTopDoc - stickyTop + progress * scrollable

    ignoreScrollSyncUntilRef.current = performance.now() + 480
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' })
  }

  return { trackRef, panelRef, selectTab }
}

/**
 * Intl AI capsule: sticky ~20px under nav, scroll advances tabs.
 */
export function useHomeIntlAiTabsScrollPin({ tabs, activeId, setActiveId }) {
  return useHomeTabsScrollPin({
    tabs,
    activeId,
    setActiveId,
    cssPrefix: 'home-intl-ai',
    tabsSelector: '.home-intl-ai-tabs',
    activeTabSelector: '.home-intl-ai-tab.is-active',
  })
}
