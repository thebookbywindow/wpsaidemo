/**
 * WPS AI Features header mega menu — Copilot + 4 core apps × 4 top AI capabilities.
 * Prefer canonical www.wps.com/feature/ URLs aligned with intlAiFeatures catalog.
 */
import { withPublicAssetPath } from '../utils/publicAssetPath'

export const WPS_FEATURES_HEADER_MEGA_MENU = Object.freeze({
  groups: Object.freeze([
    Object.freeze({
      id: 'copilot',
      titleKey: 'groupCopilot',
      iconSrc: withPublicAssetPath('/icons/wps/copilot.svg'),
      items: Object.freeze([
        {
          id: 'wps-ai-copilot-hub',
          labelKey: 'officeCopilot',
          url: 'https://www.wps.com/feature/wps-ai-your-office-copilot/',
        },
        {
          id: 'aipal',
          labelKey: 'aipal',
          url: 'https://aipal.wps.com/',
        },
      ]),
    }),
    Object.freeze({
      id: 'writer',
      titleKey: 'groupWriter',
      iconSrc: withPublicAssetPath('/icons/wps/docs.svg'),
      items: Object.freeze([
        {
          id: 'ai-writer',
          labelKey: 'aiWriter',
          url: 'https://www.wps.com/feature/ai-writer/',
        },
        {
          id: 'ai-summarizer',
          labelKey: 'aiSummarizer',
          url: 'https://www.wps.com/feature/ai-summarizer/',
        },
        {
          id: 'ai-improve-writing',
          labelKey: 'aiImproveWriting',
          url: 'https://explore.wps.com/ai/ai-improve-writing',
        },
        {
          id: 'ai-translator',
          labelKey: 'aiTranslator',
          url: 'https://www.wps.com/feature/ai-translator/',
        },
      ]),
    }),
    Object.freeze({
      id: 'spreadsheet',
      titleKey: 'groupSpreadsheet',
      iconSrc: withPublicAssetPath('/icons/wps/sheets.svg'),
      items: Object.freeze([
        {
          id: 'ai-in-excel-spreadsheets',
          labelKey: 'aiInSpreadsheets',
          url: 'https://www.wps.com/feature/ai-in-excel-spreadsheets/',
        },
        {
          id: 'ai-excel-formula-generator',
          labelKey: 'aiFormulaGenerator',
          url: 'https://www.wps.com/feature/ai-excel-formula-generator/',
        },
        {
          id: 'ai-table-generator',
          labelKey: 'aiTableGenerator',
          url: 'https://www.wps.com/feature/ai-table-generator/',
        },
        {
          id: 'jpg-to-excel',
          labelKey: 'jpgToExcel',
          url: 'https://www.wps.com/feature/jpg-to-excel/',
        },
      ]),
    }),
    Object.freeze({
      id: 'presentation',
      titleKey: 'groupPresentation',
      iconSrc: withPublicAssetPath('/icons/wps/slides.svg'),
      items: Object.freeze([
        {
          id: 'ai-ppt-maker',
          labelKey: 'aiPptMaker',
          url: 'https://www.wps.com/feature/ai-ppt-maker/',
        },
        {
          id: 'ai-powerpoint-generator',
          labelKey: 'aiPowerpointGenerator',
          url: 'https://explore.wps.com/ppt/ai-powerpoint-generator',
        },
        {
          id: 'free-presentation-maker',
          labelKey: 'freePresentationMaker',
          url: 'https://explore.wps.com/ppt/free-presentation-maker',
        },
        {
          id: 'slides-translator',
          labelKey: 'aiSlidesTranslator',
          url: 'https://www.wps.com/feature/slides-translator/',
        },
      ]),
    }),
    Object.freeze({
      id: 'pdf',
      titleKey: 'groupPdf',
      iconSrc: withPublicAssetPath('/icons/wps/pdf.svg'),
      items: Object.freeze([
        {
          id: 'chat-pdf',
          labelKey: 'chatPdf',
          url: 'https://www.wps.com/feature/chat-pdf/',
        },
        {
          id: 'pdf-summarizer',
          labelKey: 'aiPdfSummarizer',
          url: 'https://www.wps.com/feature/pdf-summarizer/',
        },
        {
          id: 'pdf-document-translation',
          labelKey: 'aiTranslatePdf',
          url: 'https://www.wps.com/feature/pdf-document-translation/',
        },
        {
          id: 'pdf-ocr',
          labelKey: 'pdfOcr',
          url: 'https://www.wps.com/feature/pdf-ocr/',
        },
      ]),
    }),
  ]),
})

export function resolveWpsFeaturesHeaderMegaMenu(copy) {
  const labels = copy?.links ?? {}
  const groupTitles = copy?.groups ?? {}

  return {
    title: copy?.aiFeaturesTitle ?? 'WPS AI Features',
    groups: WPS_FEATURES_HEADER_MEGA_MENU.groups.map((group) => ({
      id: group.id,
      title: groupTitles[group.id] ?? group.titleKey,
      iconSrc: group.iconSrc,
      items: group.items.map((item) => ({
        ...item,
        label: labels[item.labelKey] ?? item.labelKey,
      })),
    })),
  }
}
