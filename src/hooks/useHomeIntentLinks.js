import { joinPath } from '../utils/pathUrl'

/**
 * High-intent internal link targets for homepage SEO hubs.
 */
export function useHomeIntentLinks({
  currentUrlLocale,
  localeDownloadPath,
  localeAllProductsPath,
}) {
  return [
    {
      id: 'download',
      path: localeDownloadPath,
    },
    {
      id: 'online',
      path: localeAllProductsPath,
    },
    {
      id: 'pdf',
      path: joinPath(currentUrlLocale, 'pdf-tools/edit-pdf/'),
    },
    {
      id: 'pdf-to-word',
      path: joinPath(currentUrlLocale, 'pdf-tools/pdf-to-word/'),
    },
  ]
}
