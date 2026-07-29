/**
 * Free AI Tools header mega menu — aligned with https://www.wps.ai/ Free AI Tools panel.
 * Columns: AI Writing Tools / AI Image Tools / Social Media Tools (toolsmart.ai).
 */

export const FREE_AI_TOOLS_HEADER_MEGA_MENU = Object.freeze({
  groups: Object.freeze([
    Object.freeze({
      id: 'aiWriting',
      titleKey: 'aiWriting',
      iconSrc: '/icons/wps/docs.svg',
      itemColumns: 2,
      items: Object.freeze([
        {
          id: 'paraphrasing-tool',
          labelKey: 'paraphrasingTool',
          url: 'https://www.toolsmart.ai/feature-free-paraphrasing-tool/',
        },
        {
          id: 'ai-summarizer',
          labelKey: 'aiSummarizer',
          url: 'https://www.toolsmart.ai/feature-free-text-summarizer/',
        },
        {
          id: 'humanize-ai',
          labelKey: 'humanizeAi',
          url: 'https://www.toolsmart.ai/feature-free-humanize-ai/',
        },
        {
          id: 'undetectable-ai',
          labelKey: 'undetectableAi',
          url: 'https://www.toolsmart.ai/feature-free-undetectable-ai/',
        },
        {
          id: 'story-generator',
          labelKey: 'storyGenerator',
          url: 'https://www.toolsmart.ai/feature-free-ai-story-generator/',
        },
        {
          id: 'sentence-rewriter',
          labelKey: 'sentenceRewriter',
          url: 'https://www.toolsmart.ai/feature-free-sentence-rewriter/',
        },
        {
          id: 'paragraph-rewriter',
          labelKey: 'paragraphRewriter',
          url: 'https://www.toolsmart.ai/feature-free-paragraph-rewriter/',
        },
        {
          id: 'rewording-tool',
          labelKey: 'rewordingTool',
          url: 'https://www.toolsmart.ai/feature-free-rewording-tool/',
        },
      ]),
    }),
    Object.freeze({
      id: 'aiImage',
      titleKey: 'aiImage',
      iconSrc: '/icons/wps/photos.svg',
      itemColumns: 1,
      items: Object.freeze([
        {
          id: 'background-remover',
          labelKey: 'backgroundRemover',
          url: 'https://www.toolsmart.ai/feature-background-remover/',
        },
        {
          id: 'photo-restoration',
          labelKey: 'photoRestoration',
          url: 'https://www.toolsmart.ai/feature-free-photo-restoration/',
        },
        {
          id: 'unblur-image',
          labelKey: 'unblurImage',
          url: 'https://www.toolsmart.ai/feature-unblur-image-for-free/',
        },
        {
          id: 'watermark-remover',
          labelKey: 'watermarkRemover',
          url: 'https://www.toolsmart.ai/feature-free-watermark-remover/',
        },
      ]),
    }),
    Object.freeze({
      id: 'socialMedia',
      titleKey: 'socialMedia',
      iconKind: 'users',
      itemColumns: 2,
      items: Object.freeze([
        {
          id: 'youtube-to-mp3',
          labelKey: 'youtubeToMp3',
          url: 'https://www.toolsmart.ai/feature-youtube-to-mp3/',
        },
        {
          id: 'youtube-video-downloader',
          labelKey: 'youtubeVideoDownloader',
          url: 'https://www.toolsmart.ai/feature-free-youtube-video-downloader/',
        },
        {
          id: 'instagram-video-downloader',
          labelKey: 'instagramVideoDownloader',
          url: 'https://www.toolsmart.ai/feature-free-instagram-video-downloader/',
        },
        {
          id: 'facebook-video-downloader',
          labelKey: 'facebookVideoDownloader',
          url: 'https://www.toolsmart.ai/feature-free-facebook-video-downloader/',
        },
        {
          id: 'tiktok-video-downloader',
          labelKey: 'tiktokVideoDownloader',
          url: 'https://www.toolsmart.ai/feature-free-tiktok-video-downloader/',
        },
        {
          id: 'twitter-video-downloader',
          labelKey: 'twitterVideoDownloader',
          url: 'https://www.toolsmart.ai/feature-free-twitter-video-downloader/',
        },
        {
          id: 'pinterest-video-downloader',
          labelKey: 'pinterestVideoDownloader',
          url: 'https://www.toolsmart.ai/feature-free-pinterest-video-downloader/',
        },
        {
          id: 'youtube-thumbnail-downloader',
          labelKey: 'youtubeThumbnailDownloader',
          url: 'https://www.toolsmart.ai/feature-free-youtube-thumbnail-downloader/',
        },
      ]),
    }),
  ]),
})

export function resolveFreeAiToolsHeaderMegaMenu(copy = {}) {
  const groupTitles = copy.groups ?? {}
  const labels = copy.links ?? {}

  return {
    groups: FREE_AI_TOOLS_HEADER_MEGA_MENU.groups.map((group) => ({
      id: group.id,
      title: groupTitles[group.id] ?? group.titleKey,
      iconSrc: group.iconSrc,
      iconKind: group.iconKind ?? 'image',
      itemColumns: group.itemColumns ?? 1,
      items: group.items.map((item) => ({
        ...item,
        label: labels[item.labelKey] ?? item.labelKey,
      })),
    })),
  }
}
