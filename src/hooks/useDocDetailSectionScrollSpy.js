import { useEffect, useLayoutEffect, useRef } from 'react'
import { getDocDetailTocSections } from '../data/docDetailTocData'
import {
  getDocDetailScrollOffset,
  getDocDetailSectionElementId,
  syncDocDetailScrollOffsetVar,
} from '../utils/docDetailSectionContent'

export function useDocDetailSectionScrollSpy({
  enabled = false,
  isZhContent = false,
  bodyHtml = '',
  onActiveSectionChange,
}) {
  const scrollSpyFrameRef = useRef(0)
  const scrollSpyLockRef = useRef(null)
  const scrollSpyUnlockTimeoutRef = useRef(0)

  const onActiveSectionChangeRef = useRef(onActiveSectionChange)
  useLayoutEffect(() => {
    onActiveSectionChangeRef.current = onActiveSectionChange
  })

  useEffect(() => {
    if (!enabled || !bodyHtml) {
      return undefined
    }

    const sections = getDocDetailTocSections(isZhContent)
    const scrollSpyTargets = sections.map((section) => ({
      sectionId: section.id,
      elementId: getDocDetailSectionElementId(section.id),
    }))

    function clearPendingUnlock() {
      if (!scrollSpyUnlockTimeoutRef.current) {
        return
      }
      window.clearTimeout(scrollSpyUnlockTimeoutRef.current)
      scrollSpyUnlockTimeoutRef.current = 0
    }

    function scheduleUnlock() {
      clearPendingUnlock()
      scrollSpyUnlockTimeoutRef.current = window.setTimeout(() => {
        scrollSpyUnlockTimeoutRef.current = 0
        scrollSpyLockRef.current = null
        scheduleUpdate()
      }, 140)
    }

    function updateActiveSectionFromScroll() {
      syncDocDetailScrollOffsetVar()
      const scrollOffset = getDocDetailScrollOffset()
      const lockedTarget = scrollSpyLockRef.current

      if (lockedTarget) {
        const lockedElement = document.getElementById(lockedTarget.elementId)
        const reachedTarget = lockedElement
          ? Math.abs(lockedElement.getBoundingClientRect().top - scrollOffset) <= 8
          : true
        const reachedPageEnd =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
        const lockExpired = window.performance.now() - lockedTarget.startedAt >= 2200

        if (!reachedTarget && !reachedPageEnd && !lockExpired) {
          clearPendingUnlock()
          return
        }

        scheduleUnlock()
        return
      }

      clearPendingUnlock()

      let nextSectionId = ''

      scrollSpyTargets.forEach((target) => {
        const element = document.getElementById(target.elementId)
        if (!element) {
          return
        }

        if (element.getBoundingClientRect().top - scrollOffset <= 0) {
          nextSectionId = target.sectionId
        }
      })

      onActiveSectionChangeRef.current(nextSectionId)
    }

    function scheduleUpdate() {
      if (scrollSpyFrameRef.current) {
        return
      }

      scrollSpyFrameRef.current = window.requestAnimationFrame(() => {
        scrollSpyFrameRef.current = 0
        updateActiveSectionFromScroll()
      })
    }

    scheduleUpdate()
    syncDocDetailScrollOffsetVar()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      if (scrollSpyFrameRef.current) {
        window.cancelAnimationFrame(scrollSpyFrameRef.current)
        scrollSpyFrameRef.current = 0
      }
      clearPendingUnlock()
    }
  }, [bodyHtml, enabled, isZhContent])

  const lockScrollSpy = (sectionId) => {
    scrollSpyLockRef.current = {
      elementId: getDocDetailSectionElementId(sectionId),
      startedAt: window.performance.now(),
    }
  }

  return { lockScrollSpy }
}
