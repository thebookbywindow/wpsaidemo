import {
  resolveResourcesHeaderMegaMenu,
  RESOURCES_HEADER_MEGA_MENU,
} from '../src/data/resourcesHeaderMegaMenu.js'

const expected = {
  guides: [
    'https://www.wps.com/blog/ai-what-is-wps-ai/',
    'https://www.wps.com/academy/ai-spell-check-new-feature-in-wps-office-quick-tutorials-1880435/',
    'https://www.wps.com/blog/how-to-use-wps-ai-translate-a-completed-guide/',
    'https://www.wps.com/academy/how-to-use-the-chat-pdf-function-quick-tutorials-1875510/',
  ],
  aiWord: [
    'https://www.wps.ai/blog/category/articles-of-translator/how-to-translate/',
    'https://www.wps.ai/blog/category/articles-of-writing/best-ai-writing-tools/',
    'https://www.wps.ai/blog/category/articles-of-writing/ai-writer-review/',
    'https://www.wps.ai/blog/category/articles-of-word/',
  ],
  aiTranslation: [
    'https://www.wps.ai/blog/category/articles-of-translator/how-to-translate/',
    'https://www.wps.ai/blog/category/articles-of-translator/top-list-of-translators/',
    'https://www.wps.ai/blog/category/articles-of-translator/translator-comparison/',
    'https://www.wps.ai/blog/category/articles-of-translator/',
  ],
  aiPowerpoint: [
    'https://www.wps.ai/blog/category/articles-of-ppt/ai-ppt-tutorial/',
    'https://www.wps.ai/blog/category/articles-of-ppt/top-list-of-ppt/',
    'https://www.wps.ai/blog/category/articles-of-ppt/ppt-comparison/',
    'https://www.wps.ai/blog/category/articles-of-ppt/',
  ],
  aiPdf: [
    'https://www.wps.ai/blog/category/articles-of-pdf/ai-pdf-tutorial/',
    'https://www.wps.ai/blog/category/articles-of-pdf/top-list/',
    'https://www.wps.ai/blog/category/articles-of-pdf/pdf-comparison/',
    'https://www.wps.ai/blog/category/articles-of-pdf/',
  ],
  aiPhotos: [
    'https://www.wps.ai/blog/category/articles-of-photos/ai-photo-tutorial/',
    'https://www.wps.ai/blog/category/articles-of-photos/top-list-of-photo-ai/',
    'https://www.wps.ai/blog/category/articles-of-photos/photo-ai-comparison/',
    'https://www.wps.ai/blog/category/articles-of-photos/',
  ],
}

if (RESOURCES_HEADER_MEGA_MENU.groups.length !== 6) {
  throw new Error(`expected 6 groups, got ${RESOURCES_HEADER_MEGA_MENU.groups.length}`)
}

for (const group of RESOURCES_HEADER_MEGA_MENU.groups) {
  const urls = expected[group.id]
  if (!urls) throw new Error(`unexpected group ${group.id}`)
  const got = group.items.map((item) => item.url)
  if (JSON.stringify(got) !== JSON.stringify(urls)) {
    throw new Error(`URL mismatch for ${group.id}\n${JSON.stringify(got, null, 2)}`)
  }
}

const resolved = resolveResourcesHeaderMegaMenu({
  groups: {
    guides: 'WPS AI Guides',
    aiWord: 'AI Word',
    aiTranslation: 'AI Translation',
    aiPowerpoint: 'AI PowerPoint',
    aiPdf: 'AI PDF',
    aiPhotos: 'AI Photos',
  },
  links: {
    beginnersGuide: "Beginner's Guide",
    howTo: 'How to',
    topList: 'Top list',
    compare: 'Compare',
    learnMore: 'Learn More >',
    aiSpellCheck: 'AI Spell Check',
    aiParallelTranslate: 'AI Parallel Translate',
    chatPdf: 'Chat PDF',
  },
})

if (resolved.groups[0].title !== 'WPS AI Guides') {
  throw new Error('resolve title failed')
}
if (resolved.groups[1].items[3].isLearnMore !== true) {
  throw new Error('learn more flag missing')
}

console.log(`resources mega menu OK: ${resolved.groups.map((g) => g.id).join(', ')}`)
