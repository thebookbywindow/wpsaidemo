import { useCallback, useMemo, useState } from 'react'

export function getDocDetailSectionShareLabels(isZhContent) {
  return {
    shareLabel: isZhContent ? '分享：' : 'Share:',
    shareAriaLabel: isZhContent ? '分享' : 'Share',
    copiedAriaLabel: isZhContent ? '链接已复制' : 'Link copied',
    facebook: 'Facebook',
    whatsapp: 'WhatsApp',
    messenger: isZhContent ? 'Messenger' : 'Messenger',
    google: 'Google',
    email: isZhContent ? '邮件' : 'Email',
    copyLink: isZhContent ? '复制链接' : 'Copy link',
  }
}

function openShareWindow(url) {
  window.open(url, '_blank', 'noopener,noreferrer,width=640,height=640')
}

export function useDocDetailSectionShare({ title = '' } = {}) {
  const [isCopied, setIsCopied] = useState(false)

  const getSharePayload = useCallback(() => {
    const url = window.location.href
    const shareTitle = title || document.title
    return { url, shareTitle }
  }, [title])

  const copyLink = useCallback(async () => {
    const { url } = getSharePayload()

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url)
        setIsCopied(true)
        window.setTimeout(() => setIsCopied(false), 2000)
      }
    } catch {
      // Ignore clipboard permission errors.
    }
  }, [getSharePayload])

  const shareToFacebook = useCallback(() => {
    const { url } = getSharePayload()
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`)
  }, [getSharePayload])

  const shareToWhatsApp = useCallback(() => {
    const { url, shareTitle } = getSharePayload()
    const text = `${shareTitle} ${url}`.trim()
    openShareWindow(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`)
  }, [getSharePayload])

  const shareToMessenger = useCallback(() => {
    const { url } = getSharePayload()
    const encoded = encodeURIComponent(url)
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = `fb-messenger://share/?link=${encoded}`
      return
    }
    openShareWindow(`https://www.facebook.com/dialog/send?link=${encoded}&redirect_uri=${encoded}&display=popup`)
  }, [getSharePayload])

  const shareToGoogle = useCallback(() => {
    const { url, shareTitle } = getSharePayload()
    openShareWindow(
      `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(url)}`,
    )
  }, [getSharePayload])

  const shareByEmail = useCallback(() => {
    const { url, shareTitle } = getSharePayload()
    window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(url)}`
  }, [getSharePayload])

  const actions = useMemo(
    () => ({
      facebook: shareToFacebook,
      whatsapp: shareToWhatsApp,
      messenger: shareToMessenger,
      google: shareToGoogle,
      email: shareByEmail,
      copyLink,
    }),
    [copyLink, shareByEmail, shareToFacebook, shareToGoogle, shareToMessenger, shareToWhatsApp],
  )

  return {
    actions,
    isCopied,
    copyLink,
  }
}
