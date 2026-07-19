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
    featureIds: ['ai-writer', 'ai-summarizer'],
  }),
  Object.freeze({
    id: 'sheets',
    iconId: 'sheets',
    directoryGroupId: 'spreadsheet',
    productPageUrl: 'https://www.wps.com/office/spreadsheet/',
    spotlightImageId: 'ai-in-excel-spreadsheets',
    featureIds: ['ai-excel-formula-generator', 'ai-in-excel-spreadsheets'],
  }),
  Object.freeze({
    id: 'slides',
    iconId: 'slides',
    directoryGroupId: 'presentation',
    productPageUrl: 'https://www.wps.com/office/presentation/',
    spotlightImageId: 'ai-ppt-maker',
    featureIds: ['ai-ppt-maker', 'ai-powerpoint-generator'],
  }),
  Object.freeze({
    id: 'pdf',
    iconId: 'pdf',
    directoryGroupId: 'pdf',
    productPageUrl: 'https://www.wps.com/office/pdf/',
    spotlightImageId: 'chat-with-pdf',
    featureIds: ['chat-with-pdf', 'ai-pdf-summarizer'],
  }),
  Object.freeze({
    id: 'photos',
    iconId: 'photos',
    directoryGroupId: 'photos',
    featureIds: ['ai-photo-editor', 'ai-background-remover'],
  }),
  Object.freeze({
    id: 'airpage',
    iconId: 'airpage',
    directoryGroupId: 'airpage',
    featureIds: ['airpage-ai-writer', 'airpage-ai-summarizer'],
  }),
  Object.freeze({
    id: 'airsheet',
    iconId: 'airsheet',
    directoryGroupId: 'airsheet',
    featureIds: ['airsheet-ai-formula-generator', 'airsheet-ai-in-spreadsheets'],
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
    directoryGroupId: 'dbsheet',
    featureIds: ['dbsheet-ai-table-generator', 'dbsheet-ai-in-spreadsheets'],
  }),
])

/** Core homepage AI tabs — Docs / PDF / Slides / Sheets. */
export const HOME_AI_CORE_PILLAR_IDS = Object.freeze(['docs', 'pdf', 'slides', 'sheets'])

/** Build /ai-features anchor for a homepage pillar card. */
export function getHomeAiPillarDirectoryHref(localeAiFeaturesPath, directoryGroupId) {
  if (!localeAiFeaturesPath || !directoryGroupId) return null
  return `${localeAiFeaturesPath}#intl-ai-group-${directoryGroupId}`
}
