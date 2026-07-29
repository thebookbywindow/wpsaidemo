import {
  resolveFreeAiToolsHeaderMegaMenu,
  FREE_AI_TOOLS_HEADER_MEGA_MENU,
} from '../src/data/freeAiToolsHeaderMegaMenu.js'

const expected = {
  aiWriting: [
    'https://www.toolsmart.ai/feature-free-paraphrasing-tool/',
    'https://www.toolsmart.ai/feature-free-text-summarizer/',
    'https://www.toolsmart.ai/feature-free-humanize-ai/',
    'https://www.toolsmart.ai/feature-free-undetectable-ai/',
    'https://www.toolsmart.ai/feature-free-ai-story-generator/',
    'https://www.toolsmart.ai/feature-free-sentence-rewriter/',
    'https://www.toolsmart.ai/feature-free-paragraph-rewriter/',
    'https://www.toolsmart.ai/feature-free-rewording-tool/',
  ],
  aiImage: [
    'https://www.toolsmart.ai/feature-background-remover/',
    'https://www.toolsmart.ai/feature-free-photo-restoration/',
    'https://www.toolsmart.ai/feature-unblur-image-for-free/',
    'https://www.toolsmart.ai/feature-free-watermark-remover/',
  ],
  socialMedia: [
    'https://www.toolsmart.ai/feature-youtube-to-mp3/',
    'https://www.toolsmart.ai/feature-free-youtube-video-downloader/',
    'https://www.toolsmart.ai/feature-free-instagram-video-downloader/',
    'https://www.toolsmart.ai/feature-free-facebook-video-downloader/',
    'https://www.toolsmart.ai/feature-free-tiktok-video-downloader/',
    'https://www.toolsmart.ai/feature-free-twitter-video-downloader/',
    'https://www.toolsmart.ai/feature-free-pinterest-video-downloader/',
    'https://www.toolsmart.ai/feature-free-youtube-thumbnail-downloader/',
  ],
}

if (FREE_AI_TOOLS_HEADER_MEGA_MENU.groups.length !== 3) {
  throw new Error(
    `expected 3 groups, got ${FREE_AI_TOOLS_HEADER_MEGA_MENU.groups.length}`,
  )
}

for (const group of FREE_AI_TOOLS_HEADER_MEGA_MENU.groups) {
  const urls = expected[group.id]
  if (!urls) throw new Error(`unexpected group ${group.id}`)
  const got = group.items.map((item) => item.url)
  if (JSON.stringify(got) !== JSON.stringify(urls)) {
    throw new Error(`URL mismatch for ${group.id}\n${JSON.stringify(got, null, 2)}`)
  }
}

const resolved = resolveFreeAiToolsHeaderMegaMenu({
  groups: {
    aiWriting: 'AI Writing Tools',
    aiImage: 'AI Image Tools',
    socialMedia: 'Social Media Tools',
  },
  links: {
    paraphrasingTool: 'Paraphrasing Tool',
    aiSummarizer: 'AI Summarizer',
  },
})

if (resolved.groups[0].title !== 'AI Writing Tools') {
  throw new Error('resolve title failed')
}
if (resolved.groups[0].items[0].label !== 'Paraphrasing Tool') {
  throw new Error('resolve label failed')
}
if (resolved.groups[0].itemColumns !== 2) {
  throw new Error('expected writing tools to use 2 item columns')
}

console.log('validate-free-ai-tools-header-mega: ok')
