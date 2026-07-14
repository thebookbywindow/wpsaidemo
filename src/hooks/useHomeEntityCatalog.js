import { useMemo } from 'react'
import { joinPath } from '../utils/pathUrl'

/**
 * Builds homepage product/platform entity catalog with internal links.
 */
export function useHomeEntityCatalog({
  currentUrlLocale,
  localeAllProductsPath,
  localeDownloadPath,
}) {
  return useMemo(() => {
    const officePath = (segment) => joinPath(currentUrlLocale, segment)

    return [
      {
        id: 'office',
        items: [
          { id: 'docs', label: 'Writer', glyph: 'W', color: '#2B7DE9', path: officePath('ai-writing/ai-writer/') },
          { id: 'slides', label: 'Presentation', glyph: 'P', color: '#E67E22', path: officePath('ai-slides/ai-ppt/') },
          { id: 'sheets', label: 'Spreadsheets', glyph: 'S', color: '#27AE60', path: officePath('ai-sheets/ai-excel/') },
          { id: 'pdf', label: 'WPS PDF', glyph: 'P', color: '#E74C3C', path: officePath('pdf-tools/edit-pdf/') },
        ],
      },
      {
        id: 'ai',
        items: [
          { id: 'wps-ai', label: 'WPS AI', glyph: 'A', color: '#5B6CFF', path: localeAllProductsPath },
          { id: 'ai-slides', label: 'AI Slides', glyph: 'S', color: '#E84393', path: officePath('ai-slides/ai-ppt/') },
        ],
      },
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
    ]
  }, [currentUrlLocale, localeAllProductsPath, localeDownloadPath])
}
