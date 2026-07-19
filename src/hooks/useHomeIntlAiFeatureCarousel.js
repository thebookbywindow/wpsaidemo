import { useEffect, useState } from 'react'

/**
 * Single-item carousel within the active intl AI group.
 * Resets to the first item when the capsule tab changes.
 */
export function clampIntlAiFeatureIndex(index, count) {
  if (!(count > 0)) return 0
  const i = Number(index)
  if (!Number.isFinite(i)) return 0
  return Math.min(count - 1, Math.max(0, Math.trunc(i)))
}

export function stepIntlAiFeatureIndex(index, count, delta) {
  if (!(count > 1)) return clampIntlAiFeatureIndex(index, count)
  const step = Number.isFinite(delta) ? Math.trunc(delta) : 0
  if (step === 0) return clampIntlAiFeatureIndex(index, count)
  const start = clampIntlAiFeatureIndex(index, count)
  return (start + step + count * 8) % count
}

export function useHomeIntlAiFeatureCarousel(items, activeGroupId) {
  const [index, setIndex] = useState(0)
  const list = Array.isArray(items) ? items : []
  const count = list.length

  useEffect(() => {
    setIndex(0)
  }, [activeGroupId])

  const safeIndex = clampIntlAiFeatureIndex(index, count)
  const item = count > 0 ? list[safeIndex] : null

  const goPrev = () => {
    setIndex((prev) => stepIntlAiFeatureIndex(prev, count, -1))
  }

  const goNext = () => {
    setIndex((prev) => stepIntlAiFeatureIndex(prev, count, 1))
  }

  return {
    item,
    index: safeIndex,
    count,
    canNav: count > 1,
    goPrev,
    goNext,
  }
}
