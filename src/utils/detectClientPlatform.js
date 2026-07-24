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
})

export function getClientPlatformLabel(platformId) {
  return CLIENT_PLATFORM_LABELS[platformId] ?? CLIENT_PLATFORM_LABELS.windows
}

/** Placeholder until real per-platform installer URLs are wired (wps.com-style). */
export function alertPlatformDownload(platformIdOrLabel) {
  const known = CLIENT_PLATFORM_LABELS[platformIdOrLabel]
  const label = known ?? String(platformIdOrLabel || getClientPlatformLabel('windows'))
  window.alert(`Download WPS Office for ${label}`)
}

export function detectAndAlertPlatformDownload() {
  if (typeof navigator === 'undefined') {
    alertPlatformDownload('windows')
    return 'windows'
  }
  const platformId = detectClientPlatform(navigator.userAgent, {
    maxTouchPoints: navigator.maxTouchPoints ?? 0,
  })
  alertPlatformDownload(platformId)
  return platformId
}
