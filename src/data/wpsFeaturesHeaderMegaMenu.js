/**
 * WPS.com header «WPS features» mega menu (3 columns).
 * Link targets verified against official wps.com / explore.wps.com pages.
 */
export const WPS_FEATURES_HEADER_MEGA_MENU = Object.freeze({
  aiFeatures: Object.freeze({
    titleKey: 'aiFeaturesTitle',
    linkColumns: Object.freeze([
      Object.freeze([
        {
          id: 'ai-spell-check',
          labelKey: 'aiSpellCheck',
          url: 'https://www.wps.com/feature/spell-check/',
        },
        {
          id: 'ai-parallel-translate',
          labelKey: 'aiParallelTranslate',
          url: 'https://www.wps.com/feature/ai-translator/',
        },
        {
          id: 'ai-slides',
          labelKey: 'aiSlides',
          url: 'https://ai.wps.com/aislides/en-US/',
        },
        {
          id: 'ai-writer',
          labelKey: 'aiWriter',
          url: 'https://www.wps.com/feature/ai-writer/',
        },
        {
          id: 'chat-pdf',
          labelKey: 'chatPdf',
          url: 'https://www.wps.com/feature/chat-pdf/',
        },
      ]),
      Object.freeze([
        {
          id: 'ai-translate-pdf',
          labelKey: 'aiTranslatePdf',
          url: 'https://explore.wps.com/pdf/ai-translate-pdf',
        },
        {
          id: 'ai-pdf-summarizer',
          labelKey: 'aiPdfSummarizer',
          url: 'https://explore.wps.com/pdf/ai-pdf-summarizer',
        },
        {
          id: 'ai-photo-editor',
          labelKey: 'aiPhotoEditor',
          url: 'https://www.wps.com/feature/ai-photo-editor/',
        },
        {
          id: 'ai-background-remover',
          labelKey: 'aiBackgroundRemover',
          url: 'https://www.wps.com/feature/ai-background-remover/',
        },
      ]),
    ]),
  }),
  officeFeatures: Object.freeze({
    titleKey: 'officeFeaturesTitle',
    items: Object.freeze([
      {
        id: 'wps-writer',
        labelKey: 'wpsWriter',
        url: 'https://www.wps.com/office/writer/',
      },
      {
        id: 'wps-spreadsheet',
        labelKey: 'wpsSpreadsheet',
        url: 'https://www.wps.com/office/spreadsheet/',
      },
      {
        id: 'wps-presentation',
        labelKey: 'wpsPresentation',
        url: 'https://www.wps.com/office/presentation/',
      },
      {
        id: 'wps-pdf',
        labelKey: 'wpsPdf',
        url: 'https://www.wps.com/office/pdf/',
      },
    ]),
  }),
  audienceFeatures: Object.freeze({
    titleKey: 'audienceTitle',
    items: Object.freeze([
      {
        id: 'students',
        labelKey: 'students',
        url: 'https://www.wps.com/academy/solution/free-office-for-students/',
      },
      {
        id: 'teachers',
        labelKey: 'teachers',
        url: 'https://www.wps.com/academy/solution/free-office-for-teachers/',
      },
    ]),
  }),
})

export function resolveWpsFeaturesHeaderMegaMenu(copy) {
  const labels = copy?.links ?? {}
  const title = (key, fallback) => copy?.[key] ?? fallback

  const mapLink = (item) => ({
    ...item,
    label: labels[item.labelKey] ?? item.labelKey,
  })

  return {
    aiFeatures: {
      title: title('aiFeaturesTitle', 'WPS AI Features'),
      linkColumns: WPS_FEATURES_HEADER_MEGA_MENU.aiFeatures.linkColumns.map((column) =>
        column.map(mapLink),
      ),
    },
    officeFeatures: {
      title: title('officeFeaturesTitle', 'WPS Features'),
      items: WPS_FEATURES_HEADER_MEGA_MENU.officeFeatures.items.map(mapLink),
    },
    audienceFeatures: {
      title: title('audienceTitle', 'Features for'),
      items: WPS_FEATURES_HEADER_MEGA_MENU.audienceFeatures.items.map(mapLink),
    },
  }
}
