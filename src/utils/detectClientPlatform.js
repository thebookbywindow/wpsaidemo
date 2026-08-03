/**
 * Detect client OS for WPS Office download CTA (aligned with wps.com style UA sniffing).
 * Returns one of: windows | mac | ipad | ios | android | linux
 */
export function detectClientPlatform(userAgent = '', { maxTouchPoints = 0 } = {}) {
  const ua = String(userAgent || '')

  // iPadOS 13+ may report as Macintosh + touch
  if (/iPad/i.test(ua) || (/Macintosh/i.test(ua) && maxTouchPoints > 1)) {
    return 'ipad'
  }
  if (/iPhone|iPod/i.test(ua)) {
    return 'ios'
  }
  if (/Android/i.test(ua)) {
    return 'android'
  }
  if (/Mac OS X|Macintosh/i.test(ua)) {
    return 'mac'
  }
  if (/Windows|Win64|Win32/i.test(ua)) {
    return 'windows'
  }
  if (/Linux|X11|CrOS/i.test(ua)) {
    return 'linux'
  }

  // Desktop sites usually fall back to Windows installer
  return 'windows'
}

export const CLIENT_PLATFORM_LABELS = Object.freeze({
  windows: 'Windows',
  mac: 'Mac',
  ipad: 'iPad',
  ios: 'iOS',
  android: 'Android',
  linux: 'Linux',
  deb: 'Linux Deb',
  rpm: 'Linux Rpm',
})

/** Official CDN / store URLs (aligned with wps.com WPSDownloadSDK defaults for www.wps.ai). */
export const WPS_PLATFORM_DOWNLOAD_URLS = Object.freeze({
  windows: 'https://wdl1.pcfg.cache.wpscdn.com/wps/download.html?channel=601.1065',
  mac: 'https://wdl1.pcfg.cache.wpscdn.com/wpsdl/macwpsoffice/download/installer/WPS_Office_Installer_0024.31300027.zip',
  linux:
    'https://wdl1.pcfg.cache.wpscdn.com/wpsdl/wpsoffice/download/linux/11723/wps-office_11.1.0.11723.XA_amd64.deb',
  deb: 'https://wdl1.pcfg.cache.wpscdn.com/wpsdl/wpsoffice/download/linux/11723/wps-office_11.1.0.11723.XA_amd64.deb',
  rpm: 'https://wdl1.pcfg.cache.wpscdn.com/wpsdl/wpsoffice/download/linux/11723/wps-office-11.1.0.11723.XA-1.x86_64.rpm',
  android:
    'https://play.google.com/store/apps/details?id=cn.wps.moffice_eng&referrer=utm_source%3Dseo_com_wpsai%26utm_medium%3Dpid%26source%3Dseo_com_wpsai',
  ios: 'https://wpsoffice.onelink.me/Z13H/otff13lj',
  ipad: 'https://wpsoffice.onelink.me/Z13H/otff13lj',
})

export const WPS_INSTALL_GUIDANCE_URL = 'https://www.wps.com/download/install-guidance/'

export function getClientPlatformLabel(platformId) {
  return CLIENT_PLATFORM_LABELS[platformId] ?? CLIENT_PLATFORM_LABELS.windows
}

export function normalizePlatformDownloadId(platformIdOrLabel) {
  const raw = String(platformIdOrLabel || '').trim()
  if (!raw) return 'windows'
  const lower = raw.toLowerCase()
  if (WPS_PLATFORM_DOWNLOAD_URLS[lower]) return lower
  if (lower.includes('deb')) return 'deb'
  if (lower.includes('rpm')) return 'rpm'
  if (lower.includes('windows') || lower === 'win') return 'windows'
  if (lower.includes('mac') || lower.includes('os x')) return 'mac'
  if (lower.includes('linux')) return 'linux'
  if (lower.includes('android') || lower.includes('google')) return 'android'
  if (lower.includes('ios') || lower.includes('iphone') || lower.includes('app store') || lower.includes('appstore')) {
    return 'ios'
  }
  if (lower.includes('ipad')) return 'ipad'
  return 'windows'
}

export function getPlatformDownloadUrl(platformIdOrLabel) {
  const id = normalizePlatformDownloadId(platformIdOrLabel)
  return WPS_PLATFORM_DOWNLOAD_URLS[id] || WPS_PLATFORM_DOWNLOAD_URLS.windows
}

/** Trigger real installer / store download (wps.com-style). */
export function startPlatformDownload(platformIdOrLabel, { openGuidance = false } = {}) {
  if (typeof window === 'undefined') return null

  const id = normalizePlatformDownloadId(platformIdOrLabel)
  const url = getPlatformDownloadUrl(id)
  if (!url) return null

  const anchor = document.createElement('a')
  anchor.href = url
  anchor.target = '_blank'
  anchor.rel = 'noopener noreferrer'
  anchor.style.display = 'none'
  document.body.appendChild(anchor)
  anchor.click()
  anchor.remove()

  if (openGuidance && (id === 'windows' || id === 'mac')) {
    window.open(WPS_INSTALL_GUIDANCE_URL, '_blank', 'noopener,noreferrer')
  }

  return { id, url }
}

/** @deprecated name kept for callers — now starts a real download. */
export function alertPlatformDownload(platformIdOrLabel) {
  return startPlatformDownload(platformIdOrLabel, { openGuidance: true })
}

export function detectAndAlertPlatformDownload() {
  if (typeof navigator === 'undefined') {
    return startPlatformDownload('windows', { openGuidance: true })
  }
  const platformId = detectClientPlatform(navigator.userAgent, {
    maxTouchPoints: navigator.maxTouchPoints ?? 0,
  })
  startPlatformDownload(platformId, { openGuidance: true })
  return platformId
}
