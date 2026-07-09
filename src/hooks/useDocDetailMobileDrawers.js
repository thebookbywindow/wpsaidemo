import { useCallback, useEffect, useState } from 'react'

const MOBILE_DRAWER_MEDIA_QUERY = '(max-width: 980px)'

export function useDocDetailMobileDrawers() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_DRAWER_MEDIA_QUERY)

    const syncMobileState = () => {
      const matches = mediaQuery.matches
      setIsMobile(matches)
      if (!matches) {
        setLeftOpen(false)
        setRightOpen(false)
      }
    }

    syncMobileState()
    mediaQuery.addEventListener('change', syncMobileState)
    return () => mediaQuery.removeEventListener('change', syncMobileState)
  }, [])

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
