/** Official wps.com destinations for homepage top-topic cards (GSC-aligned). */
export const HOME_INTENT_LINK_TARGETS = Object.freeze({
  'wps-office-web': 'https://drive.wps.com/',
  'wps-ai-ppt': 'https://www.wps.com/feature/ai-ppt-maker/',
  'pdf-to-word': 'https://pdf.wps.com/convert-pdf-to-word/',
  'pdf-extension': 'https://www.wps.com/feature/pdf-reader-extension/',
})

/** Homepage intent hub cards — ordered by search demand (GSC impressions/clicks). */
export const HOME_INTENT_LINK_IDS = Object.freeze([
  'pdf-extension',
  'wps-office-web',
  'wps-ai-ppt',
  'pdf-to-word',
])

/**
 * High-intent links to official WPS.com top-search topic pages.
 */
export function useHomeIntentLinks() {
  return HOME_INTENT_LINK_IDS.map((id) => ({
    id,
    path: HOME_INTENT_LINK_TARGETS[id],
    external: true,
  }))
}
