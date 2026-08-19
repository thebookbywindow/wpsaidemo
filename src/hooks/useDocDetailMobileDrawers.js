import { useCallback, useState, useSyncExternalStore } from 'react'
import {
  DOCS_CENTER_CATALOG_COMPACT_MEDIA_QUERY,
  DOCS_CENTER_TOC_COMPACT_MEDIA_QUERY,
} from '../constants/docsCenterLayout'

function createMatchMediaStore(query) {
  const subscribe = (onStoreChange) => {
    const mediaQuery = window.matchMedia(query)
    mediaQuery.addEventListener('change', onStoreChange)
    return () => mediaQuery.removeEventListener('change', onStoreChange)
  }
  const getSnapshot = () => window.matchMedia(query).matches
  const getServerSnapshot = () => false
  return { subscribe, getSnapshot, getServerSnapshot }
}

const tocCompactStore = createMatchMediaStore(DOCS_CENTER_TOC_COMPACT_MEDIA_QUERY)
const catalogCompactStore = createMatchMediaStore(DOCS_CENTER_CATALOG_COMPACT_MEDIA_QUERY)

export function useDocDetailMobileDrawers() {
  const isTocCompact = useSyncExternalStore(
    tocCompactStore.subscribe,
    tocCompactStore.getSnapshot,
    tocCompactStore.getServerSnapshot,
  )
  const isCatalogCompact = useSyncExternalStore(
    catalogCompactStore.subscribe,
    catalogCompactStore.getSnapshot,
    catalogCompactStore.getServerSnapshot,
  )
  /** 列表页/旧调用：两侧都收拢时的「全移动端」 */
  const isMobile = isCatalogCompact

  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [catalogCompactSeen, setCatalogCompactSeen] = useState(isCatalogCompact)
  const [tocCompactSeen, setTocCompactSeen] = useState(isTocCompact)
  if (catalogCompactSeen !== isCatalogCompact) {
    setCatalogCompactSeen(isCatalogCompact)
    if (!isCatalogCompact) {
      setLeftOpen(false)
    }
  }
  if (tocCompactSeen !== isTocCompact) {
    setTocCompactSeen(isTocCompact)
    if (!isTocCompact) {
      setRightOpen(false)
    }
  }

  const closeAll = useCallback(() => {
    setLeftOpen(false)
    setRightOpen(false)
  }, [])

  const toggleLeft = useCallback(() => {
    setLeftOpen((open) => !open)
    setRightOpen(false)
  }, [])

  const toggleRight = useCallback(() => {
    setRightOpen((open) => !open)
    setLeftOpen(false)
  }, [])

  const openLeft = useCallback(() => {
    setLeftOpen(true)
    setRightOpen(false)
  }, [])

  const openRight = useCallback(() => {
    setRightOpen(true)
    setLeftOpen(false)
  }, [])

  return {
    isTocCompact,
    isCatalogCompact,
    isMobile,
    leftOpen,
    rightOpen,
    toggleLeft,
    toggleRight,
    openLeft,
    openRight,
    closeAll,
  }
}
