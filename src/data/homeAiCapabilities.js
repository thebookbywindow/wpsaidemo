/**
 * Homepage AI capability pillars — curated cards for a quick suite overview.
 * Maps to intlAiFeatures item ids for label fallback only.
 */
export const HOME_AI_PILLARS = Object.freeze([
  Object.freeze({
    id: 'docs',
    iconId: 'docs',
    directoryGroupId: 'writer',
    productPageUrl: 'https://www.wps.com/office/writer/',
    spotlightImageId: 'ai-writer-feature',
    // SEO/GEO: Writer drafting → summarize → rewrite → translate (nav + feature hub order)
    featureIds: [
      'ai-writer-feature',
      'ai-summarizer',
      'ai-improve-writing',
      'ai-translator-feature',
    ],
  }),
  Object.freeze({
    id: 'sheets',
    iconId: 'sheets',
    directoryGroupId: 'spreadsheet',
    productPageUrl: 'https://www.wps.com/office/spreadsheet/',
    spotlightImageId: 'ai-in-excel-spreadsheets',
    // Full spreadsheet AI map (4) — formula / chat / tables / image→Excel
    featureIds: [
      'ai-excel-formula-generator',
      'ai-in-excel-spreadsheets',
      'ai-table-generator',
      'jpg-to-excel',
    ],
  }),
  Object.freeze({
    id: 'slides',
    iconId: 'slides',
    directoryGroupId: 'presentation',
    productPageUrl: 'https://www.wps.com/office/presentation/',
    spotlightImageId: 'ai-ppt-maker',
    // Prefer www.wps.com/feature landings; PPT maker + generator + free maker + translator
    featureIds: [
      'ai-ppt-maker',
      'ai-powerpoint-generator',
      'free-presentation-maker',
      'slides-translator',
    ],
  }),
  Object.freeze({
    id: 'pdf',
    iconId: 'pdf',
    directoryGroupId: 'pdf',
    productPageUrl: 'https://www.wps.com/office/pdf/',
    spotlightImageId: 'chat-pdf-feature',
    // Chat / summarize / translate / OCR — highest-intent PDF AI queries
    featureIds: [
      'chat-pdf-feature',
      'pdf-summarizer-feature',
      'pdf-document-translation',
      'pdf-ocr-feature',
    ],
  }),
  Object.freeze({
    id: 'photos',
    iconId: 'photos',
    directoryGroupId: 'photos',
    featureIds: ['ai-photo-editor-feature', 'ai-background-remover-feature'],
  }),
  Object.freeze({
    id: 'airpage',
    iconId: 'airpage',
    directoryGroupId: 'airpage',
    featureIds: ['airpage-online-document-editor', 'airpage-word-online'],
  }),
  Object.freeze({
    id: 'airsheet',
    iconId: 'airsheet',
    directoryGroupId: 'airsheet',
    featureIds: ['airsheet-excel-online', 'airsheet-online-excel-editor'],
  }),
  Object.freeze({
    id: 'forms',
    iconId: 'forms',
    directoryGroupId: 'forms',
    featureIds: ['forms-smart-form', 'forms-survey-creator'],
  }),
  Object.freeze({
    id: 'dbsheet',
    iconId: 'dbsheet',
    // No unique EN AI landing pages — point directory deep-link to Spreadsheet AI.
    directoryGroupId: 'spreadsheet',
    featureIds: ['ai-table-generator', 'ai-in-excel-spreadsheets'],
  }),
])

/** Core homepage AI tabs — Docs / PDF / Slides / Sheets. */
export const HOME_AI_CORE_PILLAR_IDS = Object.freeze(['docs', 'pdf', 'slides', 'sheets'])

/** Build /ai-features anchor for a homepage pillar card. */
export function getHomeAiPillarDirectoryHref(localeAiFeaturesPath, directoryGroupId) {
  if (!localeAiFeaturesPath || !directoryGroupId) return null
  return `${localeAiFeaturesPath}#intl-ai-group-${directoryGroupId}`
}
