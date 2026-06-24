import { useCallback, useState } from 'react'

export function getDocDetailSectionShareLabels(isZhContent) {
  return {
    shareAriaLabel: isZhContent ? '分享' : 'Share',
    copiedAriaLabel: isZhContent ? '链接已复制' : 'Link copied',
  }
}

export function useDocDetailSectionShare({ title = '' } = {}) {
  const [isCopied, setIsCopied] = useState(false)

  const share = useCallback(async () => {
    const url = window.location.href
    const shareTitle = title || document.title

    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, url })
        return
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        setIsCopied(true)
        window.setTimeout(() => setIsCopied(false), 2000)
      }
    } catch (error) {
      if (error?.name === 'AbortError') {
        return
      }
    }
  }, [title])

  return {
    share,
    isCopied,
  }
}
