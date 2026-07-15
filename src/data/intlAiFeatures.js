/**
 * WPS International AI feature catalog (official AI feature landing URLs).
 * Component groups: Writer / Spreadsheet / Presentation / PDF / Photos.
 * Suite-wide Copilot entry points live in INTL_AI_COPILOT_LINKS (not a peer component).
 * No product/suite homepages, no Academy, no /tools/ mini-tool pages.
 * Labels resolved via uiText; keep ids stable for i18n keys.
 */
export const INTL_AI_COPILOT_LINKS = [
  {
    id: 'wps-ai-copilot-hub',
    url: 'https://www.wps.com/feature/wps-ai-your-office-copilot/',
    kind: 'feature',
  },
  { id: 'aipal', url: 'https://aipal.wps.com/', kind: 'feature' },
]

export const INTL_AI_FEATURE_GROUPS = [
  {
    id: 'writer',
    items: [
      { id: 'ai-writer', url: 'https://explore.wps.com/ai/ai-writer', kind: 'feature' },
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
        id: 'ai-spell-check',
        url: 'https://explore.wps.com/ai/ai-spell-check',
        kind: 'feature',
      },
      {
        id: 'ai-spell-check-alt',
        url: 'https://www.wps.com/ai-spell-check',
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
        id: 'ai-translator',
        url: 'https://explore.wps.com/ai/ai-translator',
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
        id: 'data-analyst',
        url: 'https://www.wps.com/feature/wps-ai-your-office-copilot/',
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
      {
        id: 'slides-designer',
        url: 'https://www.wps.com/feature/wps-ai-your-office-copilot/',
        kind: 'feature',
      },
    ],
  },
  {
    id: 'pdf',
    items: [
      {
        id: 'chat-with-pdf',
        url: 'https://explore.wps.com/pdf/chat-with-pdf',
        kind: 'feature',
      },
      {
        id: 'chat-pdf-feature',
        url: 'https://www.wps.com/feature/chat-pdf/',
        kind: 'feature',
      },
      {
        id: 'ai-pdf-summarizer',
        url: 'https://explore.wps.com/pdf/ai-pdf-summarizer',
        kind: 'feature',
      },
      {
        id: 'pdf-summarizer-feature',
        url: 'https://www.wps.com/feature/pdf-summarizer/',
        kind: 'feature',
      },
      {
        id: 'ai-translate-pdf',
        url: 'https://explore.wps.com/pdf/ai-translate-pdf',
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
      { id: 'pdf-ocr', url: 'https://explore.wps.com/pdf/pdf-ocr', kind: 'feature' },
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
        id: 'pdf-reader-extension',
        url: 'https://explore.wps.com/pdf/pdf-reader-extension',
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
        id: 'ai-photo-editor',
        url: 'https://explore.wps.com/ai/ai-photo-editor',
        kind: 'feature',
      },
      {
        id: 'ai-photo-editor-alt',
        url: 'https://explore.wps.com/photo/ai-photo-editor',
        kind: 'feature',
      },
      {
        id: 'ai-photo-editor-feature',
        url: 'https://www.wps.com/feature/ai-photo-editor/',
        kind: 'feature',
      },
      {
        id: 'ai-background-remover',
        url: 'https://explore.wps.com/ai/ai-background-remover',
        kind: 'feature',
      },
      {
        id: 'ai-background-remover-feature',
        url: 'https://www.wps.com/feature/ai-background-remover/',
        kind: 'feature',
      },
      {
        id: 'ai-photo-enhancer',
        url: 'https://explore.wps.com/ai/ai-photo-enhancer',
        kind: 'feature',
      },
      {
        id: 'photo-enhancer-feature',
        url: 'https://www.wps.com/feature/photo-enhancer/',
        kind: 'feature',
      },
      {
        id: 'ai-image-upscaler',
        url: 'https://explore.wps.com/ai/ai-image-upscaler',
        kind: 'feature',
      },
      {
        id: 'image-upscaler-feature',
        url: 'https://www.wps.com/feature/image-upscaler/',
        kind: 'feature',
      },
      {
        id: 'ai-photo-restoration',
        url: 'https://explore.wps.com/ai/ai-photo-restoration',
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

function validateFeatureItem(item, scope, seenIds, errors) {
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

  if (!Array.isArray(copilotLinks) || copilotLinks.length === 0) {
    errors.push('copilot links must be a non-empty array')
  } else {
    for (const item of copilotLinks) {
      validateFeatureItem(item, 'copilot', seenIds, errors)
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
      validateFeatureItem(item, `group ${group.id}`, seenIds, errors)
    }
  }

  return { ok: errors.length === 0, errors, itemCount: seenIds.size }
}
