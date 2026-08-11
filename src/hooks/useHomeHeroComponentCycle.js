import { useEffect, useMemo, useState } from 'react'
import {
  HOME_HERO_TYPEWRITER_COMPONENTS,
  getHeroLabelMeasureText,
  getHeroTypewriterSlotCount,
  getTypedHeroLabel,
  resolveHeroComponent,
  shouldShowHeroIcon,
  stepHeroTypewriter,
} from '../data/homeHeroComponents'

const HOLD_MS = 2200
const GAP_MS = 80

function resolveDelay(kind) {
  if (kind === 'hold') return HOLD_MS
  if (kind === 'gap') return GAP_MS
  return GAP_MS
}

function readPrefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Rotates hero product labels — full word per item; vertical poll only (no L/R width slide).
 */
export function useHomeHeroComponentCycle({
  items = HOME_HERO_TYPEWRITER_COMPONENTS,
  paused = false,
} = {}) {
  const [index, setIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(0)
  const [phase, setPhase] = useState('typing')
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(readPrefersReducedMotion)

  const measureText = useMemo(() => getHeroLabelMeasureText(items), [items])
  const active = resolveHeroComponent(items, index)
  const fullName = active?.name ?? ''
  const typedName = getTypedHeroLabel(fullName, visibleCount)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setPrefersReducedMotion(Boolean(media.matches))
    media.addEventListener?.('change', sync)
    return () => media.removeEventListener?.('change', sync)
  }, [])

  useEffect(() => {
    if (paused || !items?.length) return undefined

    let cancelled = false
    let timerId = 0
    let machine = {
      phase: 'typing',
      visibleCount: 0,
      index: 0,
    }

    const publish = () => {
      setPhase(machine.phase)
      setIndex(machine.index)
      setVisibleCount(machine.visibleCount)
    }

    const run = () => {
      if (cancelled) return

      const current = resolveHeroComponent(items, machine.index)
      const slotCount = getHeroTypewriterSlotCount(current?.name ?? '')
      const next = stepHeroTypewriter({
        phase: machine.phase,
        visibleCount: machine.visibleCount,
        index: machine.index,
        textLength: slotCount,
        itemCount: items.length,
      })

      machine = {
        phase: next.phase,
        visibleCount: next.visibleCount,
        index: next.index,
      }
      publish()

      if (next.delayMs === 0) return
      timerId = window.setTimeout(run, resolveDelay(next.delayMs))
    }

    run()

    return () => {
      cancelled = true
      window.clearTimeout(timerId)
    }
  }, [paused, items])

  return {
    active,
    index,
    phase,
    typedName: fullName,
    visibleCount,
    showIcon: Boolean(active),
    measureText,
    prefersReducedMotion,
    items,
  }
}
