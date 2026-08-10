const localeToContentLanguageMap = {
  'en-us': 'en',
  'zh-hk': 'zh-tw',
  'es-mx': 'es',
  'pt-br': 'pt',
  'fr-fr': 'fr',
  'id-id': 'id',
  'vi-vn': 'vi',
  'tr-tr': 'tr',
  'ru-ru': 'ru',
  'th-th': 'th',
  'de-de': 'de',
  'ja-jp': 'ja',
  'it-it': 'it',
  'pl-pl': 'pl',
  'hi-in': 'hi',
  'tl-ph': 'tl',
  'ms-my': 'ms',
  // Legacy site locales
  'es-es': 'es',
  'ko-kr': 'ko',
  'ar-sa': 'ar',
  'nl-nl': 'nl',
  'zh-cn': 'zh',
  'zh-tw': 'zh-tw',
}

const contentLanguageFallbackMap = {
  es: 'en',
  de: 'en',
  fr: 'en',
  ja: 'en',
  ko: 'en',
  pt: 'en',
  ar: 'en',
  it: 'en',
  nl: 'en',
  pl: 'en',
  tr: 'en',
  id: 'en',
  th: 'en',
  vi: 'en',
  ms: 'en',
  hi: 'en',
  tl: 'en',
  'zh-tw': 'zh',
  ru: 'en',
}

function withContentLanguageAliases(source) {
  const entries = Object.entries(contentLanguageFallbackMap).map(([language, fallbackLanguage]) => [
    language,
    source[fallbackLanguage] ?? source.en,
  ])
  return {
    ...source,
    ...Object.fromEntries(entries),
  }
}

export function resolveContentLanguage(locale = 'en-us') {
  const normalized = `${locale}`.toLowerCase().replace(/_/g, '-')
  const mapped = localeToContentLanguageMap[normalized]
  if (mapped) {
    return mapped
  }
  if (normalized.startsWith('zh')) {
    return 'zh'
  }
  return normalized.split('-')[0] || 'en'
}

const docsQuickTabsEn = [
  'Getting Started',
  'Writer',
  'Presentation',
  'Spreadsheet',
  'PDF',
  'Smart Docs',
  'Smart Sheets',
  'Smart Forms',
  'Multidim Tables',
  'AI Slides',
  'Resume',
  'WPS Image',
  'Personal Knowledge Base',
  'WPS Captalk',
  'WPS AI Tools',
  'Key Features',
  'Assets & Beautify',
  'Online Tools',
  'Use Cases',
  'Help & Support',
]

const docsSectionSlugMapEn = {
  'Getting Started': 'getting-started',
  Writer: 'writer',
  Presentation: 'presentation',
  Spreadsheet: 'spreadsheet',
  PDF: 'pdf',
  'Smart Docs': 'smart-doc',
  'Smart Sheets': 'smart-sheet',
  'Smart Forms': 'smart-form',
  'Multidim Tables': 'multidim',
  'AI Slides': 'ai-slides',
  Resume: 'resume',
  'WPS Image': 'wps-image',
  'Personal Knowledge Base': 'knowledge-base',
  'WPS Captalk': 'captalk',
  'WPS AI Tools': 'wps-ai',
  'Key Features': 'features',
  'Assets & Beautify': 'materials',
  'Online Tools': 'online-tools',
  'Use Cases': 'use-cases',
  'Help & Support': 'help',
}

const docsCatalogSectionsEn = [
  {
    title: 'Getting Started',
    blocks: [
      {
        title: 'Quick Setup',
        items: ['Install & Sign In'],
      },
      {
        title: '',
        items: ['WPS Writer', 'WPS Spreadsheet', 'WPS Presentation', 'WPS PDF', 'WPS Cloud', 'PPT', 'Spreadsheet', 'Edit & Convert', 'Smart Docs', 'Smart Sheets', 'Smart Forms', 'Multidim Tables', 'AI Slides', 'Resume'],
      },
    ],
  },
  {
    title: 'Writer',
    blocks: [
      {
        title: '',
        items: ['Spell Check', 'Split/Merge Files', 'Batch Rename Documents', 'Popular Fonts & Colors', 'Built-in Icons & Images', 'Add Checkboxes', 'Add Signature', 'Deep Research', 'Full Document Translation', 'Word to PDF', 'Word to Image PPT', 'Document Classification', 'Batch Toolbox', 'Insert QR Codes & Barcodes', 'Document to Audio'],
      },
      {
        title: 'AI Writer',
        items: ['AI Spell Check', 'AI Co-writing', 'AI Rewrite', 'AI Polish', 'Side-by-side Translation', 'Document Q&A', 'Full Summary', 'Document to PPT'],
      },
    ],
  },
  {
    title: 'Presentation',
    blocks: [
      {
        title: '',
        items: ['Presentation Tools', 'Mind Map', 'Add Timeline', 'Rehearse Timing', 'Built-in Icons & Images', 'Collaborative Editing', 'PPT to PDF/Images'],
      },
      {
        title: 'AI Presentation',
        items: ['AI Presentation Generator', 'AI Single/Multi-slide Generation', 'AI Image Generation', 'AI Speech Draft', 'AI Rewrite', 'AI Writing Assistant', 'Side-by-side Translation', 'AI Presentation Video'],
      },
    ],
  },
  {
    title: 'Spreadsheet',
    blocks: [
      {
        title: '',
        items: ['Merge & Center Cells', 'Highlight Duplicates', 'Insert Checkboxes', 'Batch Rename', 'Creation Tools', 'Excel to PDF', 'Quick Formulas', 'Split & Merge', 'Smart Toolbox', 'Data Comparison', 'Advanced Filter Mode', 'Smart Print Layout', 'Find & Fill', 'Batch Insert Images'],
      },
      {
        title: 'AI Spreadsheet',
        items: ['Spreadsheet Assistant', 'Operate Spreadsheet', 'Quick Q&A', 'Quick Table Creation', 'Batch Generation', 'AI Data Analysis', 'AI Formula Writing', 'AI Functions', 'AI Information Extraction', 'AI Filter'],
      },
    ],
  },
  {
    title: 'PDF',
    blocks: [
      {
        title: 'Format Conversion',
        items: ['Compress', 'Combine', 'PDF to Word/Excel/PPT', 'Word/Excel/PPT/JPG to PDF', 'PDF to Searchable PDF', 'PDF to Scanned PDF', 'Output as Images', 'Split', 'Batch Compress', 'Merge'],
      },
      {
        title: 'Page Editing',
        items: ['Insert Pages', 'Extract Pages', 'Crop Pages', 'Replace Pages', 'Copy/Paste Pages', 'Move Page Order', 'Split Pages', 'Page Size', 'Reverse Pages', 'Delete Blank Pages', 'Delete Pages', 'Page Stitching'],
      },
      {
        title: 'Content Editing',
        items: ['Auto-generate Bookmarks', 'Auto-generate Table of Contents', 'Edit Content & Images', 'Edit Content & Text', 'Insert Page Numbers', 'Header & Footer', 'Erase', 'Watermark', 'Document Background', 'Scanned File Pre-recognition', 'Batch Add/Remove Watermarks', 'PDF Find & Replace', 'Attachments'],
      },
      {
        title: 'Object Editing',
        items: ['Video', 'Audio', 'Shapes', 'Form Editing', 'Recognize Tables', 'Extract Tables'],
      },
      {
        title: 'Comments',
        items: ['PDF Links', 'Stamp Tool'],
      },
      {
        title: 'Extract/Convert/OCR',
        items: ['PDF to TXT', 'Extract Images from PDF', 'Scanned File Recognition', 'Smart Optimization', 'Scanned File Editing', 'Scanned File Tabs'],
      },
      {
        title: 'Shared Capabilities',
        items: ['PDF Floating Window', 'Split & Merge Tool', 'System Preview Pane', 'Sign', 'Print Templates'],
      },
      {
        title: 'AI PDF',
        items: ['Side-by-side Translation', 'Document Q&A', 'Full Summary', 'Document to PPT', 'AI Prepress Optimization'],
      },
    ],
  },
  {
    title: 'Smart Docs',
    blocks: [{ title: '', items: ['Smart Docs'] }],
  },
  {
    title: 'Smart Sheets',
    blocks: [{ title: '', items: ['Smart Sheets'] }],
  },
  {
    title: 'Smart Forms',
    blocks: [{ title: '', items: ['Smart Forms'] }],
  },
  {
    title: 'Multidim Tables',
    blocks: [{ title: '', items: ['Multidim Tables'] }],
  },
  {
    title: 'AI Slides',
    blocks: [{ title: '', items: ['AI Slides'] }],
  },
  {
    title: 'Resume',
    blocks: [{ title: '', items: ['Resume'] }],
  },
  {
    title: 'WPS Image',
    blocks: [
      {
        title: '',
        items: ['Blurred Image Repair', 'Portrait Text Removal'],
      },
      {
        title: 'Viewer',
        items: ['Viewer', 'Toolbox', 'Save As', 'Cloud Album', 'Batch Export & Delete', 'Format Conversion', 'Output as Images'],
      },
      {
        title: 'Print',
        items: ['Image Printing'],
      },
      {
        title: 'Convert',
        items: ['Image to Text'],
      },
      {
        title: '',
        items: ['Advanced Screenshot', 'Floating Image Toolbar', 'Screenshot OCR', 'Save As', 'Add/Adjust Basics', 'Correction', 'Local Filters & Colors', 'Video Creation', 'Screen Recording'],
      },
      {
        title: 'Editing & Processing',
        items: ['Image Compression', 'Collage', 'Resize', 'Batch Image Processing', 'Image Editor', 'Batch Export & Delete', 'Image Split'],
      },
      {
        title: '',
        items: ['GIF Maker', 'Image Translation'],
      },
    ],
  },
  {
    title: 'Personal Knowledge Base',
    blocks: [{ title: '', items: ['Personal Knowledge Base'] }],
  },
  {
    title: 'WPS Captalk',
    blocks: [{ title: '', items: ['Voice Transcription'] }],
  },
  {
    title: 'WPS AI Tools',
    blocks: [
      {
        title: 'AI Spreadsheet',
        items: ['Spreadsheet Assistant', 'AI Filter'],
      },
      {
        title: 'AI PDF',
        items: ['Chat PDF', 'AI PDF Translation', 'AI PDF Summarizer', 'AI Prepress Optimization'],
      },
      {
        title: 'AI PPT',
        items: ['AI Presentation Generator', 'Native Unlimited Editing', 'Multi-format Export', 'AI Presentation Video'],
      },
      {
        title: 'AI Charts',
        items: ['Online Flowchart', 'AI Document Mind Map', 'Lingxi AI Flowchart'],
      },
      {
        title: 'AI Image Tools',
        items: ['Unblur Images', 'Remove Watermarks', 'AI Photo Editor', 'AI Background Remover', 'AI Sketch to Image', 'AI Cutout', 'AI Sharpen', 'Smart Watermark', 'AI Erase', 'Format Conversion', 'Output as Images', 'Image to PDF', 'AI Crop', 'AI Text Extraction', 'AI Formula/Table Extraction', 'AI Text Replacement', 'AI Clear Text', 'AI Filters & Color Grading', 'AI Expand Image', 'Text Replacement', 'Magic Image Edit'],
      },
      {
        title: 'AI Graphics',
        items: ['AI Graphic Organizer', 'AI Concept Graphic Creation'],
      },
      {
        title: 'AI Papers',
        items: ['AI Paper First Draft', 'AI Proposal Report', 'CNKI AI Topic Analysis', 'CNKI AI Topic Review'],
      },
      {
        title: 'AI Writing',
        items: ['Smart Article Generation', 'Title Generator', 'Paraphrasing Tool', 'AI Summarizer', 'AI Polish', 'Story Generator', 'Sentence Rewriter', 'Paragraph Rewriter', 'Rewrite Tool', 'AI Email Writer', 'AI Co-writing', 'AI Spell Check'],
      },
      {
        title: '',
        items: ['AI Translation', 'AI Read Aloud', 'AI Contract Review'],
      },
      {
        title: 'Daoke',
        items: ['AI Cover', 'AI Design', 'AI New'],
      },
      {
        title: '',
        items: ['AI 3D Generation'],
      },
    ],
  },
  {
    title: 'Key Features',
    blocks: [
      {
        title: 'Charts',
        items: ['Mind Map', 'Flowchart', 'Knowledge Base Mind Map'],
      },
      {
        title: 'Academic Papers',
        items: ['Paper Formatting', 'Paper AIGC Check', 'Paper Revision Assistant', 'Paper Assistant Web Plugin'],
      },
    ],
  },
  {
    title: 'Assets & Beautify',
    blocks: [
      {
        title: 'Text',
        items: ['Cloud Fonts', 'Online WordArt', 'Online Text Box', 'Text Styles', 'Bullets', 'Online Symbols'],
      },
      {
        title: 'Images',
        items: ['Gallery'],
      },
      {
        title: 'Charts',
        items: ['Online Charts'],
      },
      {
        title: 'Spreadsheets',
        items: ['Online Table Styles'],
      },
      {
        title: 'To PPT',
        items: ['Mind Map to PPT', 'Word to PPT'],
      },
      {
        title: 'Smart Features',
        items: ['Smart Animation', 'Online Covers', 'Theme Colors', 'Gradients'],
      },
    ],
  },
  {
    title: 'Online Tools',
    blocks: [
      {
        title: 'Conversion Tools',
        items: ['WEBP to PNG', 'HEIC to JPG', 'WEBP to JPG', 'AVIF to JPG', 'HEIC to PNG', 'AVIF to PNG', 'HEIC to PDF', 'JPG to Excel'],
      },
      {
        title: 'Batch Tools',
        items: ['Batch Delete', 'Batch Print', 'Batch Rename'],
      },
      {
        title: 'Social Media Tools',
        items: ['YouTube to MP3', 'YouTube Video Downloader', 'Instagram Video Downloader', 'Facebook Video Downloader', 'Tiktok Video Downloader', 'Twitter Video Downloader', 'Pinterest Video Downloader', 'YouTube Thumbnail Downloader'],
      },
      {
        title: 'Shared Tools',
        items: ['Help Center', 'Homepage Right Panel', 'Browser Assistant', 'System Context Menu', 'System Document Properties Entry'],
      },
    ],
  },
  {
    title: 'Use Cases',
    blocks: [
      {
        title: 'Student Learning',
        items: ['Read Papers with Chat PDF', 'English Literature Translation Workflow', 'AI-assisted Paper Writing'],
      },
      {
        title: '',
        items: ['Teacher Lesson Prep', 'AI Lesson Plan Generation', 'One-click Courseware PPT', 'Question Organization & Formatting'],
      },
      {
        title: 'Workplace Productivity',
        items: ['AI Weekly Report Writing', 'AI Meeting Minutes', 'AI Project Report PPT', 'AI Contract Clause Extraction'],
      },
      {
        title: 'Content Creation',
        items: ['AI First Draft Generation', 'Multi-language Content Creation', 'Batch Social Media Copywriting'],
      },
    ],
  },
  {
    title: 'Help & Support',
    blocks: [
      {
        title: '',
        items: ['Release Notes'],
      },
      {
        title: 'FAQ',
        items: ['WPS Basics', 'WPS AI', 'Writer', 'Spreadsheet', 'PPT', 'PDF', 'Smart Docs', 'Smart Sheets', 'Smart Forms', 'Multidim Tables', 'AI Slides', 'Resume'],
      },
      {
        title: '',
        items: ['Contact Support'],
      },
    ],
  },
]

export const docsEnglishContent = {
  ui: {
    heroTitle: 'Docs Center',
    searchSrOnly: 'Search documentation',
    heroSearchPlaceholder: 'Search docs by keyword',
    heroSearchButton: 'Search',
    heroSearchResetButton: 'Reset',
    heroSearchResultsTitle: 'Search results',
    heroSearchEmptyResults: 'No matching features found',
    heroSearchNoResults: 'No matching features found for "{keyword}".',
    sidebarSearchPlaceholder: 'Search in directory',
    directoryTitle: 'DOCUMENT OUTLINE',
    faqTitle: 'Frequently asked questions',
    backToTopAriaLabel: 'Back to top',
    overlayBackLabel: '← Back to directory',
    docDetailTocSidebarTitle: 'Document Outline',
    articleBreadcrumbAriaLabel: 'Article breadcrumb',
    noResults: 'No matching documentation items found.',
    emptyDocContent: 'No content available.',
    unpublishedDoc: 'This document is not published yet.',
    translationFallbackNotice:
      'This article is not available in your selected language. Showing {language} instead.',
  },
  quickTabs: docsQuickTabsEn,
  jumpCards: [
    { title: 'Product Intro', sub: 'Positioning and installation guide', section: 'Getting Started' },
    { title: 'Plans & Billing', sub: 'Plan tiers and feature comparison', section: 'Getting Started' },
    { title: 'Learning Center', sub: 'Video tutorials for typical tasks', section: 'Writer' },
    { title: 'Community Hub', sub: 'Discuss and exchange with users', section: 'PDF' },
    { title: 'Template Center', sub: 'Explore downloadable templates', section: 'Resume' },
  ],
  sectionSlugMap: docsSectionSlugMapEn,
  catalogSections: docsCatalogSectionsEn,
  faqItems: [
    {
      title: 'How do I choose the right WPS plan?',
      desc: 'Compare Free, Pro, and Team plans by AI usage limits, collaboration features, and admin controls.',
    },
    {
      title: 'Can I import Microsoft Office files?',
      desc: 'Yes. WPS supports DOCX, XLSX, PPTX, and common PDF workflows with high compatibility.',
    },
    {
      title: 'How do I report a bug with reproducible steps?',
      desc: 'Collect app version, platform details, and operation steps, then submit a ticket in Help & Support.',
    },
    {
      title: 'Where can I learn AI features quickly?',
      desc: 'Start with Smart Docs, Smart Sheets, and AI Slides sections for beginner workflows and examples.',
    },
    {
      title: 'How can teams standardize templates and styles?',
      desc: 'Use shared template libraries, naming rules, and brand assets to enforce consistent output.',
    },
  ],
  sectionMarkersMap: {},
}

export const docsUiByLanguage = withContentLanguageAliases({
  en: docsEnglishContent.ui,
  zh: {
    heroTitle: '文档中心',
    searchSrOnly: '文档搜索',
    heroSearchPlaceholder: '请输入关键词搜索产品文档',
    heroSearchButton: '搜索',
    heroSearchResetButton: '重置',
    heroSearchResultsTitle: '搜索结果',
    heroSearchEmptyResults: '未找到匹配的功能',
    heroSearchNoResults: '未找到与「{keyword}」匹配的功能文档。',
    sidebarSearchPlaceholder: '在目录中搜索',
    directoryTitle: '文档大纲',
    faqTitle: '常见问题 FAQ',
    backToTopAriaLabel: '回到顶部',
    overlayBackLabel: '← 返回目录',
    docDetailTocSidebarTitle: '文档目录',
    articleBreadcrumbAriaLabel: '文章面包屑',
    noResults: '未找到匹配的文档目录项。',
    emptyDocContent: '暂无内容',
    unpublishedDoc: '该文档尚未发布。',
    translationFallbackNotice: '当前语言暂无翻译，已自动切换为 {language}。',
  },
})

docsUiByLanguage['zh-tw'] = {
  heroTitle: '文件中心',
  searchSrOnly: '文件搜尋',
  heroSearchPlaceholder: '請輸入關鍵字搜尋產品文件',
  heroSearchButton: '搜尋',
  heroSearchResetButton: '重置',
  heroSearchResultsTitle: '搜尋結果',
  heroSearchEmptyResults: '未找到匹配的功能',
  heroSearchNoResults: '未找到與「{keyword}」匹配的功能文件。',
  sidebarSearchPlaceholder: '在目錄中搜尋',
  directoryTitle: '文件大綱',
  faqTitle: '常見問題 FAQ',
  backToTopAriaLabel: '回到頂部',
  overlayBackLabel: '← 返回目錄',
  docDetailTocSidebarTitle: '文件目錄',
  articleBreadcrumbAriaLabel: '文章麵包屑',
  noResults: '未找到符合條件的文件目錄項。',
  emptyDocContent: '暫無內容',
  unpublishedDoc: '該文件尚未發布。',
  translationFallbackNotice: '目前語言暫無翻譯，已自動切換為 {language}。',
}

export const answersForumFilterSectionsEn = [
  {
    title: 'Content',
    options: [
      { key: 'all', label: 'All questions', active: true },
      { key: 'no-answer', label: 'No answers' },
      { key: 'has-answer', label: 'Has answers' },
      { key: 'no-answer-or-comments', label: 'No answers or comments' },
      { key: 'accepted-answer', label: 'Accepted answers' },
      { key: 'recommended-answer', label: 'Recommended answers' },
    ],
  },
]

export const answersForumQuestionItemsEn = [
  {
    badge: 'Official Reply',
    title: '',
    excerpt: '',
    topic: '',
    replies: 6,
    votes: 23,
    author: 'WPS Support Engineer · Lina',
    updatedAt: 'Today 14:38',
  },
  {
    badge: 'Accepted',
    title: '',
    excerpt: '',
    topic: '',
    replies: 4,
    votes: 17,
    author: 'Community Moderator · Kevin',
    updatedAt: 'Today 11:24',
  },
  {
    badge: 'Popular',
    title: '',
    excerpt: '',
    topic: '',
    replies: 3,
    votes: 31,
    author: 'Product Consultant · Amber',
    updatedAt: 'Yesterday 20:57',
  },
  {
    badge: '',
    title: '',
    excerpt: '',
    topic: '',
    replies: 2,
    votes: 9,
    author: 'Enterprise User · Ning Wang',
    updatedAt: 'Yesterday 17:05',
  },
  {
    badge: 'Official Reply',
    title: '',
    excerpt: '',
    topic: '',
    replies: 8,
    votes: 28,
    author: 'AI Product Manager · Iris',
    updatedAt: 'Yesterday 10:43',
  },
  {
    badge: '',
    title: '',
    excerpt: '',
    topic: '',
    replies: 5,
    votes: 14,
    author: 'Operations Specialist · Mia',
    updatedAt: '05-13 18:19',
  },
]

export const answersForumTemplatesByLanguage = withContentLanguageAliases({
  en: {
    titleTemplates: [
      'what should I check first when layouts break after batch processing?',
      'how can we reduce version conflicts in multi-user collaboration?',
      'why does exported output differ from the editing view?',
      'how do we keep rendering consistent across platforms?',
      'what reusable workflow can standardize repeated tasks?',
      'how can we balance AI efficiency with controllable outcomes?',
    ],
    excerptTemplates: [
      'In {topic} workflows, we often hit “looks fine locally but broken online”. We need a reliable troubleshooting order to reproduce and isolate root causes.',
      'Multiple roles edit the same files in {topic} and versions keep overwriting each other. Looking for a clear collaboration guideline to reduce rework.',
      'The same file behaves differently between editing mode and exported output, especially in paragraphs, charts, or comments. Which settings should we verify first?',
      'There are visible differences when opening the same file on Windows and macOS. How should we configure {topic} for consistent delivery?',
      'We want to turn frequent tasks into reusable operation templates for faster onboarding. Which {topic} steps should be standardized first?',
      'AI improves speed, but we still need outcome control. In {topic} workflows, what checkpoints help keep quality stable?',
    ],
    topicTags: ['Basics', 'Collaboration', 'Export & Compatibility', 'Cross-platform', 'Workflow Templates', 'AI Practice'],
  },
  zh: {
    titleTemplates: [
      '批量处理后样式错位，应该先检查哪些设置？',
      '多人协作下版本冲突频发，推荐怎样的流程？',
      '导出结果与编辑页不一致，这类问题如何排查？',
      '跨平台打开后显示差异明显，如何保证一致性？',
      '想把重复步骤标准化，有没有可复用的实践方案？',
      '接入 AI 辅助后，如何平衡效率与结果可控性？',
    ],
    excerptTemplates: [
      '在 {topic} 场景下，团队经常会遇到“本地正常、线上错位”的情况，想要一套可以稳定复现和定位问题的排查顺序。',
      '目前我们在使用 {topic} 时由多个角色共同编辑，版本来回覆盖。希望建立一条明确的协作规范，减少返工成本。',
      '同一个文件在编辑态与导出态表现不同，尤其是段落、图表或批注部分。希望知道优先检查的关键选项。',
      'Windows 与 macOS 打开同一份内容时会有细节差异，想了解在 {topic} 里该如何配置，避免交付前反复校对。',
      '团队希望把常见任务沉淀为操作模板，提升新人上手速度。请问在 {topic} 方向有哪些值得先固化的步骤？',
      '引入 AI 后效率提升明显，但也担心结果不可控。想知道在 {topic} 工作流里，怎样设置检查点更稳妥。',
    ],
    topicTags: ['基础使用', '协作规范', '导出与兼容', '跨端一致性', '流程模板', 'AI 实践'],
  },
})

export const answersUiByLanguage = withContentLanguageAliases({
  en: {
    heroKicker: 'WPS AI Community',
    heroTitle: 'What do you need help with today?',
    heroDescription:
      'Explore verified tips from the community and support engineers, or search existing questions before posting a new one.',
    heroSearchPlaceholder: 'Search topics, feature names, or error codes',
    heroSearchButton: 'Search',
    popularTitle: 'Popular Products & Categories',
    howToTitle: 'How to use Answers effectively',
    howToDescription: 'A few simple habits help you get faster and more accurate replies.',
    stepLabel: 'Step',
    communitiesTitle: 'Other WPS Communities',
    communitiesDescription: 'Join specialized spaces to discuss roadmap ideas and advanced workflows.',
    forumBackHome: '← Back to Answers Home',
    forumKicker: 'WPS AI Answers',
    forumTitleSuffix: 'Community',
    forumIntroPrefix: 'This topic focuses on',
    forumIntroConnector: ', and the question list and filters are organized around',
    forumIntroSuffix: 'workflows, collaboration patterns, and troubleshooting scenarios.',
    forumFiltersTitle: 'Filters',
    forumSummaryMiddle: 'questions related to',
    forumSortLabel: 'Sort by: Recently updated ▾',
    forumRepliesLabel: 'Replies',
    forumVotesLabel: 'Votes',
    forumUpdatedPrefix: 'Updated',
  },
  zh: {
    heroKicker: 'WPS AI Community',
    heroTitle: '今天你需要什么帮助？',
    heroDescription: '浏览来自社区与支持工程师的经验建议，或先搜索已有问题，再发布新提问。',
    heroSearchPlaceholder: '搜索主题、功能名或错误码',
    heroSearchButton: '搜索',
    popularTitle: '热门产品与分类',
    howToTitle: '如何更高效地使用 Answers',
    howToDescription: '保持几个简单习惯，可以更快拿到更准确的回复。',
    stepLabel: '步骤',
    communitiesTitle: '其他 WPS 社区',
    communitiesDescription: '加入专题社区，讨论路线图想法与进阶工作流实践。',
    forumBackHome: '← 返回 Answers 首页',
    forumKicker: 'WPS AI Answers',
    forumTitleSuffix: '问答社区',
    forumIntroPrefix: '当前主题聚焦于',
    forumIntroConnector: '方向，问题列表与筛选项都围绕',
    forumIntroSuffix: '的典型使用场景、协作流程和故障排查展开。',
    forumFiltersTitle: '筛选器',
    forumSummaryMiddle: '个问题与',
    forumSortLabel: '排序依据：已更新 ▾',
    forumRepliesLabel: '回答',
    forumVotesLabel: '赞同',
    forumUpdatedPrefix: '更新于',
  },
})
