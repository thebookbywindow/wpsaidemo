import { HOME_HERO_COMPONENTS } from './homeHeroComponents.js'
import { INTL_AI_FEATURE_META } from './intlAiFeatureMeta.js'

/**
 * Merge catalog item with scraped page meta (product screenshot + description).
 * uiText itemDescriptions can override scraped description per locale.
 */
export function resolveIntlAiFeatureItem(item, itemLabels = {}, itemDescriptions = {}) {
  const meta = INTL_AI_FEATURE_META?.[item.id] ?? {}
  return {
    id: item.id,
    url: item.url,
    label: itemLabels[item.id] ?? item.id,
    description: itemDescriptions[item.id] || meta.description || '',
    imageSrc: meta.imageSrc || null,
  }
}

/**
 * WPS International AI feature catalog (official AI feature landing URLs).
 * Component groups: Writer / Spreadsheet / Presentation / PDF / Photos /
 * AirPage / AirSheet / Forms / DBSheet.
 * Suite-wide Copilot entry points live in INTL_AI_COPILOT_LINKS (not a peer component).
 * No product/suite homepages, no Academy, no /tools/ mini-tool pages.
 * Labels resolved via uiText; keep ids stable for i18n keys.
 */

/** Capsule tab id → hero product id (Writer→Docs, Spreadsheet→Sheets, etc.). */
export const INTL_AI_TAB_HERO_IDS = Object.freeze({
  copilot: 'copilot',
  writer: 'docs',
  spreadsheet: 'sheets',
  presentation: 'slides',
  pdf: 'pdf',
  photos: 'photos',
  airpage: 'airpage',
  airsheet: 'airsheet',
  forms: 'forms',
  dbsheet: 'dbsheet',
})

const HERO_ICON_BY_ID = Object.freeze(
  Object.fromEntries(
    HOME_HERO_COMPONENTS.map((item) => [item.id, item.iconSrc]),
  ),
)

/** Resolve `/icons/wps/*.svg` for a capsule tab id; missing → null. */
export function getIntlAiTabIconSrc(tabId) {
  const heroId = INTL_AI_TAB_HERO_IDS[tabId]
  if (!heroId) return null
  return HERO_ICON_BY_ID[heroId] ?? null
}

export const INTL_AI_COPILOT_LINKS = [
  {
    id: 'wps-ai-copilot-hub',
    url: 'https://www.wps.com/feature/wps-ai-your-office-copilot/',
    kind: 'feature',
  },
  { id: 'aipal', url: 'https://aipal.wps.com/', kind: 'feature' },
]

/**
 * One canonical landing URL per capability.
 * Prefer www.wps.com/feature/ over explore twins; never repeat the same URL across groups.
 * AirPage / AirSheet keep only product-unique links (shared Writer/Sheets AI lives in those groups).
 * DBSheet had no unique EN AI landing pages — omitted from the directory map.
 */
export const INTL_AI_FEATURE_GROUPS = [
  {
    id: 'writer',
    items: [
      {
        id: 'ai-writer-feature',
        url: 'https://www.wps.com/feature/ai-writer/',
        kind: 'feature',
      },
      {
        id: 'ai-text-generator',
        url: 'https://www.wps.com/feature/ai-text-generator/',
        kind: 'feature',
      },
      {
        id: 'ai-summarizer',
        url: 'https://www.wps.com/feature/ai-summarizer/',
        kind: 'feature',
      },
      {
        id: 'ai-improve-writing',
        url: 'https://explore.wps.com/ai/ai-improve-writing',
        kind: 'feature',
      },
      {
        id: 'spell-check-feature',
        url: 'https://www.wps.com/feature/spell-check/',
        kind: 'feature',
      },
      {
        id: 'grammar-checker',
        url: 'https://www.wps.com/feature/grammar-checker/',
        kind: 'feature',
      },
      {
        id: 'ai-translator-feature',
        url: 'https://www.wps.com/feature/ai-translator/',
        kind: 'feature',
      },
      {
        id: 'document-translator',
        url: 'https://www.wps.com/feature/document-translator/',
        kind: 'feature',
      },
      {
        id: 'ai-document-translator',
        url: 'https://explore.wps.com/word/ai-document-translator',
        kind: 'feature',
      },
      {
        id: 'extract-text-with-ai',
        url: 'https://www.wps.com/feature/extract-text-with-ai/',
        kind: 'feature',
      },
    ],
  },
  {
    id: 'spreadsheet',
    items: [
      {
        id: 'ai-in-excel-spreadsheets',
        url: 'https://www.wps.com/feature/ai-in-excel-spreadsheets/',
        kind: 'feature',
      },
      {
        id: 'ai-excel-formula-generator',
        url: 'https://www.wps.com/feature/ai-excel-formula-generator/',
        kind: 'feature',
      },
      {
        id: 'ai-table-generator',
        url: 'https://www.wps.com/feature/ai-table-generator/',
        kind: 'feature',
      },
      {
        id: 'jpg-to-excel',
        url: 'https://www.wps.com/feature/jpg-to-excel/',
        kind: 'feature',
      },
    ],
    noteId: 'spreadsheetClientNote',
  },
  {
    id: 'presentation',
    items: [
      {
        id: 'ai-powerpoint-generator',
        url: 'https://explore.wps.com/ppt/ai-powerpoint-generator',
        kind: 'feature',
      },
      {
        id: 'ai-ppt-maker',
        url: 'https://www.wps.com/feature/ai-ppt-maker/',
        kind: 'feature',
      },
      {
        id: 'free-presentation-maker',
        url: 'https://explore.wps.com/ppt/free-presentation-maker',
        kind: 'feature',
      },
      {
        id: 'ai-translate-powerpoint',
        url: 'https://explore.wps.com/ppt/ai-translate-powerpoint',
        kind: 'feature',
      },
      {
        id: 'slides-translator',
        url: 'https://www.wps.com/feature/slides-translator/',
        kind: 'feature',
      },
    ],
  },
  {
    id: 'pdf',
    items: [
      {
        id: 'chat-pdf-feature',
        url: 'https://www.wps.com/feature/chat-pdf/',
        kind: 'feature',
      },
      {
        id: 'pdf-summarizer-feature',
        url: 'https://www.wps.com/feature/pdf-summarizer/',
        kind: 'feature',
      },
      {
        id: 'pdf-document-translation',
        url: 'https://www.wps.com/feature/pdf-document-translation/',
        kind: 'feature',
      },
      {
        id: 'translate-scanned-pdf',
        url: 'https://explore.wps.com/pdf/translate-scanned-pdf',
        kind: 'feature',
      },
      {
        id: 'pdf-ocr-feature',
        url: 'https://www.wps.com/feature/pdf-ocr/',
        kind: 'feature',
      },
      {
        id: 'convert-scanned-pdf-to-word',
        url: 'https://explore.wps.com/pdf/convert-scanned-pdf-to-word',
        kind: 'feature',
      },
      {
        id: 'pdf-reader-extension-feature',
        url: 'https://www.wps.com/feature/pdf-reader-extension/',
        kind: 'feature',
      },
      {
        id: 'chrome-pdf-extension',
        url: 'https://chromewebstore.google.com/detail/wps-pdf/kdpelmjpfafjppnhbloffcjpeomlnpah',
        kind: 'feature',
      },
    ],
  },
  {
    id: 'photos',
    items: [
      {
        id: 'ai-photo-editor-feature',
        url: 'https://www.wps.com/feature/ai-photo-editor/',
        kind: 'feature',
      },
      {
        id: 'ai-background-remover-feature',
        url: 'https://www.wps.com/feature/ai-background-remover/',
        kind: 'feature',
      },
      {
        id: 'photo-enhancer-feature',
        url: 'https://www.wps.com/feature/photo-enhancer/',
        kind: 'feature',
      },
      {
        id: 'image-upscaler-feature',
        url: 'https://www.wps.com/feature/image-upscaler/',
        kind: 'feature',
      },
      {
        id: 'ai-photo-restoration-feature',
        url: 'https://www.wps.com/feature/ai-photo-restoration/',
        kind: 'feature',
      },
      {
        id: 'ai-remove-object',
        url: 'https://explore.wps.com/ai/ai-remove-object-from-photo',
        kind: 'feature',
      },
      {
        id: 'magic-eraser',
        url: 'https://www.wps.com/feature/magic-eraser/',
        kind: 'feature',
      },
      {
        id: 'ai-remove-text',
        url: 'https://explore.wps.com/ai/ai-remove-text-from-image',
        kind: 'feature',
      },
      {
        id: 'extract-text-from-image',
        url: 'https://explore.wps.com/photo/extract-text-from-image',
        kind: 'feature',
      },
      {
        id: 'image-watermark-remover',
        url: 'https://explore.wps.com/photo/image-watermark-remover',
        kind: 'feature',
      },
    ],
  },
  {
    id: 'airpage',
    items: [
      {
        id: 'airpage-online-document-editor',
        url: 'https://www.wps.com/feature/online-document-editor/',
        kind: 'feature',
      },
      {
        id: 'airpage-word-online',
        url: 'https://www.wps.com/feature/word-online/',
        kind: 'feature',
      },
    ],
    noteId: 'airpageNote',
  },
  {
    id: 'airsheet',
    items: [
      {
        id: 'airsheet-excel-online',
        url: 'https://www.wps.com/feature/excel-online/',
        kind: 'feature',
      },
      {
        id: 'airsheet-online-excel-editor',
        url: 'https://explore.wps.com/excel/online-excel-sheet-editor',
        kind: 'feature',
      },
    ],
    noteId: 'airsheetNote',
  },
  {
    id: 'forms',
    items: [
      {
        id: 'forms-online-form-builder',
        // Official slug spelling on wps.com
        url: 'https://www.wps.com/feature/online-form-bulider/',
        kind: 'feature',
      },
      {
        id: 'forms-smart-form',
        url: 'https://explore.wps.com/docs/smart-form',
        kind: 'feature',
      },
      {
        id: 'forms-survey-creator',
        url: 'https://explore.wps.com/docs/survey-creator',
        kind: 'feature',
      },
      {
        id: 'forms-google-forms-alt',
        url: 'https://www.wps.com/topic/google-forms-alternative/',
        kind: 'feature',
      },
      {
        id: 'forms-fillable-forms',
        url: 'https://www.wps.com/feature/free-file-fillable-forms/',
        kind: 'feature',
      },
      {
        id: 'forms-create-fillable',
        url: 'https://explore.wps.com/docs/create-fillable-form',
        kind: 'feature',
      },
    ],
    noteId: 'formsNote',
  },
]

export function listIntlAiFeatureItems() {
  const groupItems = INTL_AI_FEATURE_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      groupId: group.id,
      ...item,
    })),
  )
  const copilotItems = INTL_AI_COPILOT_LINKS.map((item) => ({
    groupId: 'copilot',
    ...item,
  }))
  return [...copilotItems, ...groupItems]
}

function normalizeFeatureUrl(url) {
  if (!url || typeof url !== 'string') return ''
  return url.replace(/\/$/, '').toLowerCase()
}

function validateFeatureItem(item, scope, seenIds, seenUrls, errors) {
  if (!item?.id) {
    errors.push(`${scope} has item without id`)
    return
  }
  if (seenIds.has(item.id)) errors.push(`duplicate item id: ${item.id}`)
  seenIds.add(item.id)

  if (!item.url || typeof item.url !== 'string') {
    errors.push(`item ${item.id} missing url`)
  } else if (!/^https:\/\//i.test(item.url)) {
    errors.push(`item ${item.id} url must be https: ${item.url}`)
  } else if (/\/academy\//i.test(item.url)) {
    errors.push(`item ${item.id} must not be an Academy tutorial URL`)
  } else if (/\/tools\//i.test(item.url)) {
    errors.push(`item ${item.id} must not be a /tools/ mini-tool URL`)
  } else if (/\/office\//i.test(item.url)) {
    errors.push(`item ${item.id} must not be an office product homepage`)
  } else if (
    /wps\.ai\/?$/i.test(item.url) ||
    /\/ai-homepage\/?/i.test(item.url) ||
    /explore\.wps\.com\/ai\/?$/i.test(item.url)
  ) {
    errors.push(`item ${item.id} must not be a suite/AI homepage`)
  } else {
    const normalizedUrl = normalizeFeatureUrl(item.url)
    if (seenUrls.has(normalizedUrl)) {
      errors.push(`duplicate feature url: ${item.url} (${item.id})`)
    } else {
      seenUrls.add(normalizedUrl)
    }
  }

  if (item.kind !== 'feature') {
    errors.push(`item ${item.id} kind must be feature`)
  }
}

export function validateIntlAiFeatures(
  groups = INTL_AI_FEATURE_GROUPS,
  copilotLinks = INTL_AI_COPILOT_LINKS,
) {
  const errors = []
  const seenIds = new Set()
  const seenUrls = new Set()

  if (!Array.isArray(copilotLinks) || copilotLinks.length === 0) {
    errors.push('copilot links must be a non-empty array')
  } else {
    for (const item of copilotLinks) {
      validateFeatureItem(item, 'copilot', seenIds, seenUrls, errors)
    }
  }

  if (!Array.isArray(groups) || groups.length === 0) {
    errors.push('groups must be a non-empty array')
    return { ok: false, errors, itemCount: seenIds.size }
  }

  for (const group of groups) {
    if (!group?.id) errors.push('group missing id')
    if (!Array.isArray(group?.items) || group.items.length === 0) {
      errors.push(`group ${group?.id ?? '?'} has no items`)
      continue
    }

    for (const item of group.items) {
      validateFeatureItem(item, `group ${group.id}`, seenIds, seenUrls, errors)
    }
  }

  return { ok: errors.length === 0, errors, itemCount: seenIds.size }
}

const INTL_AI_FEATURE_CATALOG = Object.freeze([
  ...INTL_AI_COPILOT_LINKS,
  ...INTL_AI_FEATURE_GROUPS.flatMap((group) => group.items),
])

/** Official landing-page URL by stable feature id. */
export const INTL_AI_FEATURE_URL_BY_ID = Object.freeze(
  Object.fromEntries(INTL_AI_FEATURE_CATALOG.map((item) => [item.id, item.url])),
)

export function getIntlAiFeatureUrl(id) {
  if (!id) return null
  return INTL_AI_FEATURE_URL_BY_ID[id] ?? null
}
