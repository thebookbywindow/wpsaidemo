import { useMemo } from 'react'

/**
 * Homepage platform catalog with download links.
 */
export function useHomeEntityCatalog({ localeDownloadPath }) {
  return useMemo(
    () => [
      {
        id: 'platforms',
        items: [
          { id: 'windows', label: 'Windows', platform: 'windows', path: localeDownloadPath },
          { id: 'mac', label: 'Mac', platform: 'mac', path: localeDownloadPath },
          { id: 'ipad', label: 'iPad', platform: 'ipad', path: localeDownloadPath },
          { id: 'ios', label: 'iOS', platform: 'ios', path: localeDownloadPath },
          { id: 'android', label: 'Android', platform: 'android', path: localeDownloadPath },
          { id: 'linux', label: 'Linux', platform: 'linux', path: localeDownloadPath },
        ],
      },
    ],
    [localeDownloadPath],
  )
}
