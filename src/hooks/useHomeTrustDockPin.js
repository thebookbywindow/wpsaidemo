import { useEffect, useRef, useState } from 'react'

/** Below this width, brands stay in normal flow — never pin on the first viewport. */
export const HOME_TRUST_DOCK_PIN_DISABLE_MQ = '(max-width: 720px)'

/**
 * Pure pin decision for Notion-style trust brands handoff.
 * Pinned while the in-flow slot is still below the viewport bottom dock line.
 */
export function shouldPinTrustDock(
  slotTop,
  viewportHeight,
  dockHeight,
  { disablePin = false } = {},
) {
  if (disablePin) return false
  if (!Number.isFinite(slotTop) || !Number.isFinite(viewportHeight)) return true
  if (!(dockHeight > 0)) return true
  return slotTop > viewportHeight - dockHeight
}

/**
 * Desktop: brands fixed to first viewport bottom until the in-flow slot catches them.
 * Mobile: never pin — brands only appear when the trust section scrolls into view.
 */
export function useHomeTrustDockPin() {
  const slotRef = useRef(null)
  const dockRef = useRef(null)
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const slot = slotRef.current
    const dock = dockRef.current
    if (!slot || !dock) return undefined

    let frame = 0
    const mobileMq = window.matchMedia(HOME_TRUST_DOCK_PIN_DISABLE_MQ)

    const syncHeight = () => {
      const height = Math.ceil(dock.getBoundingClientRect().height)
      const next = `${Math.max(height, 1)}px`
      document.documentElement.style.setProperty('--home-trust-dock-h', next)
      slot.style.minHeight = next
      return height
    }

    const syncPin = () => {
      const disablePin = mobileMq.matches

      if (disablePin) {
        syncHeight()
        setPinned(false)
        return
      }

      const height = syncHeight()
      const nextPinned = shouldPinTrustDock(
        slot.getBoundingClientRect().top,
        window.innerHeight,
        height,
      )
      setPinned((prev) => (prev === nextPinned ? prev : nextPinned))
    }

    const onScrollOrResize = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        syncPin()
      })
    }

    syncPin()
    const observer = new ResizeObserver(onScrollOrResize)
    observer.observe(dock)
    observer.observe(slot)
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    mobileMq.addEventListener('change', onScrollOrResize)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      mobileMq.removeEventListener('change', onScrollOrResize)
    }
  }, [])

  return { slotRef, dockRef, pinned }
}
