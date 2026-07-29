/**
 * Resources header mega menu — aligned with https://www.wps.ai/ Resources panel.
 * Columns: WPS AI Guides + AI Word / Translation / PowerPoint / PDF / Photos.
 */

export const RESOURCES_HEADER_MEGA_MENU = Object.freeze({
  groups: Object.freeze([
    Object.freeze({
      id: 'guides',
      titleKey: 'guides',
      iconSrc: '/icons/wps/copilot.svg',
      items: Object.freeze([
        {
          id: 'beginners-guide',
          labelKey: 'beginnersGuide',
          url: 'https://www.wps.com/blog/ai-what-is-wps-ai/',
        },
        {
          id: 'ai-spell-check',
          labelKey: 'aiSpellCheck',
          url: 'https://www.wps.com/academy/ai-spell-check-new-feature-in-wps-office-quick-tutorials-1880435/',
        },
        {
          id: 'ai-parallel-translate',
          labelKey: 'aiParallelTranslate',
          url: 'https://www.wps.com/blog/how-to-use-wps-ai-translate-a-completed-guide/',
        },
        {
          id: 'chat-pdf',
          labelKey: 'chatPdf',
          url: 'https://www.wps.com/academy/how-to-use-the-chat-pdf-function-quick-tutorials-1875510/',
        },
      ]),
    }),
    Object.freeze({
      id: 'aiWord',
      titleKey: 'aiWord',
      iconSrc: '/icons/wps/docs.svg',
      items: Object.freeze([
        {
          id: 'ai-word-how-to',
          labelKey: 'howTo',
          // Matches live wps.ai Resources panel (AI Word → How to).
          url: 'https://www.wps.ai/blog/category/articles-of-translator/how-to-translate/',
        },
        {
          id: 'ai-word-top-list',
          labelKey: 'topList',
          url: 'https://www.wps.ai/blog/category/articles-of-writing/best-ai-writing-tools/',
        },
        {
          id: 'ai-word-compare',
          labelKey: 'compare',
          url: 'https://www.wps.ai/blog/category/articles-of-writing/ai-writer-review/',
        },
        {
          id: 'ai-word-learn-more',
          labelKey: 'learnMore',
          url: 'https://www.wps.ai/blog/category/articles-of-word/',
          isLearnMore: true,
        },
      ]),
    }),
    Object.freeze({
      id: 'aiTranslation',
      titleKey: 'aiTranslation',
      iconSrc: '/icons/wps/docs.svg',
      iconKind: 'languages',
      items: Object.freeze([
        {
          id: 'ai-translation-how-to',
          labelKey: 'howTo',
          url: 'https://www.wps.ai/blog/category/articles-of-translator/how-to-translate/',
        },
        {
          id: 'ai-translation-top-list',
          labelKey: 'topList',
          url: 'https://www.wps.ai/blog/category/articles-of-translator/top-list-of-translators/',
        },
        {
          id: 'ai-translation-compare',
          labelKey: 'compare',
          url: 'https://www.wps.ai/blog/category/articles-of-translator/translator-comparison/',
        },
        {
          id: 'ai-translation-learn-more',
          labelKey: 'learnMore',
          url: 'https://www.wps.ai/blog/category/articles-of-translator/',
          isLearnMore: true,
        },
      ]),
    }),
    Object.freeze({
      id: 'aiPowerpoint',
      titleKey: 'aiPowerpoint',
      iconSrc: '/icons/wps/slides.svg',
      items: Object.freeze([
        {
          id: 'ai-ppt-how-to',
          labelKey: 'howTo',
          url: 'https://www.wps.ai/blog/category/articles-of-ppt/ai-ppt-tutorial/',
        },
        {
          id: 'ai-ppt-top-list',
          labelKey: 'topList',
          url: 'https://www.wps.ai/blog/category/articles-of-ppt/top-list-of-ppt/',
        },
        {
          id: 'ai-ppt-compare',
          labelKey: 'compare',
          url: 'https://www.wps.ai/blog/category/articles-of-ppt/ppt-comparison/',
        },
        {
          id: 'ai-ppt-learn-more',
          labelKey: 'learnMore',
          url: 'https://www.wps.ai/blog/category/articles-of-ppt/',
          isLearnMore: true,
        },
      ]),
    }),
    Object.freeze({
      id: 'aiPdf',
      titleKey: 'aiPdf',
      iconSrc: '/icons/wps/pdf.svg',
      items: Object.freeze([
        {
          id: 'ai-pdf-how-to',
          labelKey: 'howTo',
          url: 'https://www.wps.ai/blog/category/articles-of-pdf/ai-pdf-tutorial/',
        },
        {
          id: 'ai-pdf-top-list',
          labelKey: 'topList',
          url: 'https://www.wps.ai/blog/category/articles-of-pdf/top-list/',
        },
        {
          id: 'ai-pdf-compare',
          labelKey: 'compare',
          url: 'https://www.wps.ai/blog/category/articles-of-pdf/pdf-comparison/',
        },
        {
          id: 'ai-pdf-learn-more',
          labelKey: 'learnMore',
          url: 'https://www.wps.ai/blog/category/articles-of-pdf/',
          isLearnMore: true,
        },
      ]),
    }),
    Object.freeze({
      id: 'aiPhotos',
      titleKey: 'aiPhotos',
      iconSrc: '/icons/wps/photos.svg',
      items: Object.freeze([
        {
          id: 'ai-photos-how-to',
          labelKey: 'howTo',
          url: 'https://www.wps.ai/blog/category/articles-of-photos/ai-photo-tutorial/',
        },
        {
          id: 'ai-photos-top-list',
          labelKey: 'topList',
          url: 'https://www.wps.ai/blog/category/articles-of-photos/top-list-of-photo-ai/',
        },
        {
          id: 'ai-photos-compare',
          labelKey: 'compare',
          url: 'https://www.wps.ai/blog/category/articles-of-photos/photo-ai-comparison/',
        },
        {
          id: 'ai-photos-learn-more',
          labelKey: 'learnMore',
          url: 'https://www.wps.ai/blog/category/articles-of-photos/',
          isLearnMore: true,
        },
      ]),
    }),
  ]),
})

export function resolveResourcesHeaderMegaMenu(copy = {}) {
  const groupTitles = copy.groups ?? {}
  const labels = copy.links ?? {}

  return {
    groups: RESOURCES_HEADER_MEGA_MENU.groups.map((group) => ({
      id: group.id,
      title: groupTitles[group.id] ?? group.titleKey,
      iconSrc: group.iconSrc,
      iconKind: group.iconKind ?? 'image',
      items: group.items.map((item) => ({
        ...item,
        label: labels[item.labelKey] ?? item.labelKey,
      })),
    })),
  }
}
