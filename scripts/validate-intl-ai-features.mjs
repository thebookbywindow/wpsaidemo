import { listIntlAiFeatureItems, validateIntlAiFeatures } from '../src/data/intlAiFeatures.js'
import { uiTextByLanguage } from '../src/data/uiText.js'

const structure = validateIntlAiFeatures()
const errors = [...structure.errors]

for (const language of ['en', 'zh']) {
  const copy = uiTextByLanguage[language]?.home?.intlAiFeatures
  if (!copy) {
    errors.push(`uiText.${language}.home.intlAiFeatures missing`)
    continue
  }

  for (const key of ['title', 'summary', 'copilotLabel', 'groups', 'items', 'notes']) {
    if (copy[key] == null) errors.push(`uiText.${language}.intlAiFeatures.${key} missing`)
  }

  for (const group of ['writer', 'spreadsheet', 'presentation', 'pdf', 'photos']) {
    if (!copy.groups?.[group]) {
      errors.push(`uiText.${language}.intlAiFeatures.groups.${group} missing`)
    }
  }

  if (copy.groups?.suite) {
    errors.push(`uiText.${language}.intlAiFeatures.groups.suite must be removed (Copilot is not a peer component)`)
  }

  if (!copy.notes?.spreadsheetClientNote) {
    errors.push(`uiText.${language}.intlAiFeatures.notes.spreadsheetClientNote missing`)
  }

  for (const item of listIntlAiFeatureItems()) {
    if (!copy.items?.[item.id]) {
      errors.push(`uiText.${language}.intlAiFeatures.items.${item.id} missing`)
    }
  }
}

if (errors.length > 0) {
  console.error('intlAiFeatures validation failed:')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log(
  `intlAiFeatures OK: ${structure.itemCount} items, en/zh labels complete`,
)
