import { Fragment, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Globe, Users } from 'lucide-react'
import { FaFacebookF, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import DocsCenterPage from './components/DocsCenterPage'
import HomePage from './components/HomePage'
import AllProductsPage from './components/AllProductsPage'
import IntlAiFeaturesPage from './components/IntlAiFeaturesPage'
import LocalePage from './components/LocalePage'
import {
  encyclopediaEntriesByLocale,
  encyclopediaUiTextByLocale,
  resolveEncyclopediaLocale,
  resolveEncyclopediaEntriesForLocale,
} from './data/encyclopediaData'
import {
  blogCategoryFiltersByLanguage,
  encyclopediaCategoryBySlug,
  encyclopediaCategoryDefinitions,
  encyclopediaCategoryImageMap,
  resolveBlogPostsForLanguage,
} from './data/blogData'
import {
  answersForumFilterSectionsEn,
  answersForumQuestionItemsEn,
  answersForumTemplatesByLanguage,
  answersUiByLanguage,
  docsEnglishContent,
  docsUiByLanguage,
  resolveContentLanguage,
} from './data/siteLocaleData'
import { translateOfflinePhrase } from './data/offlinePhraseTranslations'
import {
  resolveFreeAiToolsHeaderMegaMenu,
} from './data/freeAiToolsHeaderMegaMenu.js'
import {
  resolveWpsFeaturesHeaderMegaMenu,
} from './data/wpsFeaturesHeaderMegaMenu.js'
import {
  resolveResourcesHeaderMegaMenu,
} from './data/resourcesHeaderMegaMenu.js'
import { uiTextByLanguage } from './data/uiText'
import {
  SITE_FOOTER_COMPANY_LINKS,
  SITE_FOOTER_PRODUCT_LINKS,
  SITE_FOOTER_SOCIAL_LINKS,
  SITE_FOOTER_SUPPORT_LINKS,
} from './data/siteFooterLinks'

const FOOTER_SOCIAL_ICONS = {
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  youtube: FaYoutube,
}
import {
  getLocaleDocsPath,
} from './utils/docsRoute'
import { ensureTrailingSlash, joinPath } from './utils/pathUrl'
import { normalizeLocaleCode, toUrlLocale } from './utils/localeUrl'

const products = [
  { name: 'PDF Tools', desc: 'WPS PDF: edit PDF, PDF to Word, convert & compress', color: '#e74c3c', iconKey: 'pdf' },
  { name: 'AI Writing', desc: 'WPS Writer for Word docs with AI assistance', color: '#534ab7', iconKey: 'writing' },
  { name: 'AI Slides', desc: 'PowerPoint-ready slides with AI Slides tools', color: '#d24726', iconKey: 'slides' },
  { name: 'AI Sheets', desc: 'Excel spreadsheets with AI formula help', color: '#217346', iconKey: 'sheets' },
  { name: 'AI Tools', desc: 'Online WPS tools for everyday office tasks', color: '#185fa5', iconKey: 'tools' },
]

const productsZh = [
  { name: 'PDF Tools', displayName: 'WPS PDF', desc: 'PDF 编辑、PDF 转 Word、转换与压缩', color: '#e74c3c', iconKey: 'pdf' },
  { name: 'AI Writing', displayName: 'WPS 文字', desc: '面向 Word 文档的 AI 写作与编辑', color: '#534ab7', iconKey: 'writing' },
  { name: 'AI Slides', displayName: 'AI 演示', desc: 'PowerPoint 演示与 AI Slides 工具', color: '#d24726', iconKey: 'slides' },
  { name: 'AI Sheets', displayName: 'AI 表格', desc: 'Excel 表格与 AI 公式辅助', color: '#217346', iconKey: 'sheets' },
  { name: 'AI Tools', displayName: '在线工具', desc: 'WPS 在线办公高频工具', color: '#185fa5', iconKey: 'tools' },
]

const templateMenuSections = [
  {
    title: 'DOCUMENT TEMPLATES',
    color: '#7c3aed',
    items: [
      { name: 'Resume Templates', path: 'resume-templates/' },
      { name: 'Cover Letter Templates', path: 'ai-writing/cover-letter/' },
    ],
  },
  {
    title: 'PRESENTATION TEMPLATES',
    color: '#d97706',
    items: [
      { name: 'Presentation Templates', path: 'presentation-templates/' },
      { name: 'Slide Themes', path: 'ai-slides/theme/' },
    ],
  },
  {
    title: 'SPREADSHEET TEMPLATES',
    color: '#0f766e',
    items: [
      { name: 'Excel Templates', path: 'ai-sheets/excel-templates/' },
    ],
  },
]

const features = [
  {
    title: 'AI-Powered',
    desc: 'Every tool enhanced with cutting-edge AI for smarter results.',
    iconKey: 'ai',
  },
  {
    title: '20 Languages',
    desc: 'Fully localized in 20 languages for global teams.',
    linkKey: 'worldwide',
    iconKey: 'languages',
  },
  {
    title: 'No Installation',
    desc: 'Works entirely in your browser, nothing to download.',
    iconKey: 'cloud',
  },
  {
    title: '40+ Tools',
    desc: 'One platform for all your document and productivity needs.',
    iconKey: 'tools',
  },
]

const featuresZh = [
  {
    title: 'AI 驱动',
    desc: '每个工具都结合前沿 AI 能力，帮助你更高效地产出结果。',
    iconKey: 'ai',
  },
  {
    title: '20 种语言',
    desc: '支持 20 种语言，满足全球团队协作需求。',
    linkKey: 'worldwide',
    iconKey: 'languages',
  },
  {
    title: '免安装',
    desc: '完全基于浏览器使用，无需下载安装。',
    iconKey: 'cloud',
  },
  {
    title: '40+ 工具',
    desc: '一站式覆盖文档处理与办公效率场景。',
    iconKey: 'tools',
  },
]

const desktopDownloadItems = [
  {
    name: 'Windows',
    version: 'WPS Office for Windows 10/11',
    desc: 'Best for daily documents, large spreadsheets, and office collaboration.',
    icon: '🪟',
    cta: 'Download for Windows',
  },
  {
    name: 'Mac',
    version: 'WPS Office for macOS',
    desc: 'Optimized for Intel and Apple Silicon (M1/M2/M3) devices.',
    icon: '🍏',
    cta: 'Download for Mac',
  },
  {
    name: 'Linux',
    version: 'WPS Office for Linux',
    desc: 'Lightweight office suite for Ubuntu and mainstream Linux distributions.',
    icon: '🐧',
    cta: 'Download for Linux',
  },
]

const desktopDownloadItemsZh = [
  {
    name: 'Windows',
    version: 'WPS Office Windows 10/11 版',
    desc: '适合日常文档处理、大型表格编辑和办公协作。',
    icon: '🪟',
    cta: '下载 Windows 版',
  },
  {
    name: 'Mac',
    version: 'WPS Office macOS 版',
    desc: '针对 Intel 和 Apple Silicon（M1/M2/M3）设备优化。',
    icon: '🍏',
    cta: '下载 Mac 版',
  },
  {
    name: 'Linux',
    version: 'WPS Office Linux 版',
    desc: '轻量级办公套件，适配 Ubuntu 与主流 Linux 发行版。',
    icon: '🐧',
    cta: '下载 Linux 版',
  },
]

const mobileDownloadItems = [
  {
    name: 'Android',
    version: 'WPS Office for Android',
    desc: 'Edit Word, Excel, and PDF files on the go with full cloud sync.',
    icon: '🤖',
    cta: 'Get on Google Play',
  },
  {
    name: 'iOS',
    version: 'WPS Office for iOS',
    desc: 'Create and review documents on iPhone and iPad seamlessly.',
    icon: '',
    cta: 'Get on App Store',
  },
]

const mobileDownloadItemsZh = [
  {
    name: 'Android',
    version: 'WPS Office Android 版',
    desc: '随时随地编辑 Word、Excel 和 PDF，完整支持云同步。',
    icon: '🤖',
    cta: '前往 Google Play',
  },
  {
    name: 'iOS',
    version: 'WPS Office iOS 版',
    desc: '在 iPhone 和 iPad 上流畅创建与审阅文档。',
    icon: '',
    cta: '前往 App Store',
  },
]

const toolkitItems = [
  {
    name: 'WPS PDF Reader Pro',
    desc: 'Read, annotate, and manage PDF documents with a smooth mobile experience.',
    icon: '📕',
    cta: 'Get on Google Play',
  },
  {
    name: 'WPS PDF Converter Pro',
    desc: 'Convert files, scan to PDF, and extract text with OCR support.',
    icon: '📘',
    cta: 'Get on Google Play',
  },
  {
    name: 'WPS PDF Extension',
    desc: 'View, edit, fill, convert, and share PDFs directly in your browser.',
    icon: '📙',
    cta: 'Install Now',
  },
]

const toolkitItemsZh = [
  {
    name: 'WPS PDF Reader Pro',
    desc: '流畅阅读、批注并管理 PDF 文档，移动端体验更顺手。',
    icon: '📕',
    cta: '前往 Google Play',
  },
  {
    name: 'WPS PDF Converter Pro',
    desc: '支持文件转换、扫描成 PDF 与 OCR 文本提取。',
    icon: '📘',
    cta: '前往 Google Play',
  },
  {
    name: 'WPS PDF Extension',
    desc: '可在浏览器中直接查看、编辑、填写、转换并分享 PDF。',
    icon: '📙',
    cta: '立即安装',
  },
]

const downloadFaqs = [
  {
    q: 'Is WPS Office free to download?',
    a: 'Yes. You can download and use the core features for free on desktop and mobile.',
  },
  {
    q: 'Is WPS Office compatible with Microsoft Office files?',
    a: 'Yes. WPS Office supports common formats such as DOCX, XLSX, PPTX, and PDF.',
  },
  {
    q: 'Which version should I download?',
    a: 'Choose Windows, Mac, or Linux based on your desktop OS, or Android/iOS for mobile.',
  },
  {
    q: 'Can I switch language after installation?',
    a: 'Yes. You can change language preferences in settings and use localized resources.',
  },
]

const downloadFaqsZh = [
  {
    q: 'WPS Office 可以免费下载吗？',
    a: '可以。桌面端与移动端均可免费使用核心功能。',
  },
  {
    q: 'WPS Office 兼容 Microsoft Office 文件吗？',
    a: '兼容。WPS Office 支持 DOCX、XLSX、PPTX、PDF 等常见格式。',
  },
  {
    q: '我应该下载哪个版本？',
    a: '桌面端请按系统选择 Windows、Mac 或 Linux，移动端请选择 Android/iOS。',
  },
  {
    q: '安装后可以切换语言吗？',
    a: '可以。您可以在设置中修改语言偏好并使用本地化资源。',
  },
]

const guideCategoryTabDefinitions = [
  { id: 'all', labelEn: 'All Guides', labelZh: '所有指南' },
  { id: 'pdf', labelEn: 'PDF', labelZh: 'PDF' },
  { id: 'writing', labelEn: 'Writing', labelZh: '写作' },
  { id: 'slides', labelEn: 'Slides', labelZh: '演示' },
  { id: 'sheets', labelEn: 'Sheets', labelZh: '表格' },
  { id: 'tools', labelEn: 'Tools', labelZh: '工具' },
]

const guideItems = [
  {
    category: 'pdf',
    title: 'How to Convert PDF to Word (3 Methods)',
    desc: 'Learn how to convert any PDF to an editable Word document using WPS AI, keeping all formatting intact.',
    readTime: '4 min read',
    slug: 'how-to-convert-pdf-to-word.html',
  },
  {
    category: 'pdf',
    title: 'How to Compress PDF Without Losing Quality',
    desc: 'Reduce PDF file sizes dramatically while maintaining visual quality - step-by-step guide.',
    readTime: '3 min read',
    slug: 'compress-pdf-without-quality-loss.html',
  },
  {
    category: 'pdf',
    title: 'Complete Guide to Merging and Splitting PDFs',
    desc: 'Everything you need to know about combining and splitting PDF files for better document management.',
    readTime: '5 min read',
    slug: 'merge-split-pdf-guide.html',
  },
  {
    category: 'writing',
    title: 'Getting Started with AI Writer',
    desc: 'Discover how to use AI Writer to create blog posts, emails, and more in minutes.',
    readTime: '5 min read',
    slug: 'ai-writer-getting-started.html',
  },
  {
    category: 'writing',
    title: 'How to Write Better AI Prompts for Content',
    desc: 'Master the art of prompt engineering to get higher quality content from AI writing tools.',
    readTime: '6 min read',
    slug: 'write-better-prompts.html',
  },
  {
    category: 'slides',
    title: 'How to Create a Presentation with AI in 5 Minutes',
    desc: 'Go from blank slide to complete presentation using AI Presentation Maker - a quick start guide.',
    readTime: '4 min read',
    slug: 'ai-presentation-guide.html',
  },
  {
    category: 'sheets',
    title: '10 Excel Formulas You Can Generate with AI',
    desc: 'Stop memorizing complex Excel formulas. Let AI generate VLOOKUP, INDEX-MATCH, and more for you.',
    readTime: '7 min read',
    slug: 'excel-formulas-ai.html',
  },
  {
    category: 'tools',
    title: 'How to Create a Custom QR Code in Seconds',
    desc: 'Generate custom branded QR codes for URLs, social media, and business cards - completely free.',
    readTime: '2 min read',
    slug: 'qr-code-guide.html',
  },
]

const guideItemsZh = [
  {
    category: 'pdf',
    title: '如何将 PDF 转为 Word（3 种方法）',
    desc: '学习使用 WPS AI 将 PDF 转成可编辑 Word，同时尽量保留原有排版格式。',
    readTime: '4 分钟阅读',
    slug: 'how-to-convert-pdf-to-word.html',
  },
  {
    category: 'pdf',
    title: '如何在不损失质量的情况下压缩 PDF',
    desc: '分步骤讲解如何在保持视觉质量的同时大幅减小 PDF 文件体积。',
    readTime: '3 分钟阅读',
    slug: 'compress-pdf-without-quality-loss.html',
  },
  {
    category: 'pdf',
    title: 'PDF 合并与拆分完整指南',
    desc: '一次讲清 PDF 合并与拆分的核心方法，提升文档管理效率。',
    readTime: '5 分钟阅读',
    slug: 'merge-split-pdf-guide.html',
  },
  {
    category: 'writing',
    title: 'AI Writer 入门指南',
    desc: '了解如何用 AI Writer 在几分钟内完成博客、邮件等内容创作。',
    readTime: '5 分钟阅读',
    slug: 'ai-writer-getting-started.html',
  },
  {
    category: 'writing',
    title: '如何写出更高质量的 AI 提示词',
    desc: '掌握提示词设计技巧，显著提升 AI 写作输出质量。',
    readTime: '6 分钟阅读',
    slug: 'write-better-prompts.html',
  },
  {
    category: 'slides',
    title: '5 分钟用 AI 做出完整演示文稿',
    desc: '从空白页面到完整幻灯片，快速上手 AI Presentation Maker。',
    readTime: '4 分钟阅读',
    slug: 'ai-presentation-guide.html',
  },
  {
    category: 'sheets',
    title: '10 个可由 AI 生成的 Excel 公式',
    desc: '不再死记复杂函数，让 AI 帮你生成 VLOOKUP、INDEX-MATCH 等公式。',
    readTime: '7 分钟阅读',
    slug: 'excel-formulas-ai.html',
  },
  {
    category: 'tools',
    title: '如何在几秒内创建自定义二维码',
    desc: '免费生成 URL、社媒与名片场景可用的品牌化二维码。',
    readTime: '2 分钟阅读',
    slug: 'qr-code-guide.html',
  },
]

const guideCategoryStyleMap = {
  pdf: 'bg-[#fdf1eb] text-[#b96944]',
  writing: 'bg-[#efecff] text-[#6e62b6]',
  slides: 'bg-[#fff4da] text-[#9b7c2f]',
  sheets: 'bg-[#e8fbf4] text-[#2d8a65]',
  tools: 'bg-[#e8f6ff] text-[#2a7fa7]',
}

const docsSidebarGroups = [
  {
    title: '新手入门',
    items: ['快速开始', '账号与权限', '常见问题 FAQ'],
  },
  {
    title: '文档',
    items: ['AI 文档', '格式与排版', '协作与评论'],
  },
  {
    title: '演示',
    items: ['AI 演示', '主题与母版', '动画与导出'],
  },
  {
    title: '表格',
    items: ['AI 表格', '公式与函数', '数据透视表'],
  },
  {
    title: 'PDF',
    items: ['格式转换', '页面编辑', '注释与签名', 'AI PDF'],
  },
  {
    title: 'WPS AI 工具',
    items: ['AI 写作', 'AI PPT', 'AI 图像工具', 'AI 论文'],
  },
  {
    title: '使用场景',
    items: ['学生学习', '职场办公', '内容创作'],
  },
  {
    title: '帮助与支持',
    items: ['更新日志', 'FAQ', '提交工单'],
  },
]

const docsKeyTopics = [
  {
    title: '新手入门',
    desc: '通过写文档、生成 PPT、制作表格或 PDF 编辑转化等场景任务，在几分钟内熟悉 WPS 文档中心的主要能力入口。',
  },
  {
    title: '核心功能与 AI',
    desc: '核心功能覆盖文字、表格、演示与 PDF 的非 AI 能力说明；WPS AI 工具区提供写作、翻译、PPT、图像等智能能力的独立文档索引。',
  },
  {
    title: '在线工具与场景',
    desc: '图片处理、格式转换与社交媒体类工具的使用说明集中呈现；使用场景帮助您按角色快速找到对应工作流。',
  },
  {
    title: '帮助与支持',
    desc: '更新日志、常见问题与工单/客服入口统一汇总，便于自助排查与反馈。',
  },
  {
    title: '工具与资源',
    desc: '图片工具、格式转换与社交媒体下载等在线工具文档独立成区，可按工具名称在左侧目录或顶部搜索中快速定位。',
  },
]

const docsQuickTabs = [
  '新手入门',
  '文档',
  '演示',
  '表格',
  'PDF',
  '智能文档',
  '智能表格',
  '智能表单',
  '多维表格',
  'AI Slides',
  '简历',
  'WPS 图片',
  '个人知识库',
  'WPS听记',
  'WPS AI 工具',
  '特色功能',
  '素材美化',
  '拓展工具',
  '使用场景',
  '帮助与支持',
]

const docsJumpCards = [
  { title: '产品介绍', sub: '产品定位与下载安装', section: '新手入门', linkKey: 'all-products' },
  { title: '套餐与费用', sub: '套餐分类与功能对比表', section: '新手入门', linkKey: 'pricing' },
  { title: '学习中心', sub: '典型场景视频教程', section: '文档', linkKey: 'guides' },
  { title: '社区中心', sub: '用户社群交流讨论', section: 'PDF', linkKey: 'answers' },
  { title: '模板中心', sub: '海量模板资源下载', section: '简历', linkKey: 'all-templates' },
]

const docsSectionSlugMap = {
  新手入门: 'getting-started',
  文档: 'writer',
  演示: 'presentation',
  表格: 'spreadsheet',
  PDF: 'pdf',
  智能文档: 'smart-doc',
  智能表格: 'smart-sheet',
  智能表单: 'smart-form',
  多维表格: 'multidim',
  'AI Slides': 'ai-slides',
  简历: 'resume',
  'WPS 图片': 'wps-image',
  个人知识库: 'knowledge-base',
  WPS听记: 'captalk',
  'WPS AI 工具': 'wps-ai',
  特色功能: 'features',
  素材美化: 'materials',
  拓展工具: 'online-tools',
  使用场景: 'use-cases',
  帮助与支持: 'help',
}

const docsCatalogSections = [
  {
    title: '新手入门',
    blocks: [
      {
        title: '快速上手',
        items: ['安装与登录'],
      },
      {
        title: '',
        items: ['WPS 文字', 'WPS 表格', 'WPS 演示', 'WPS PDF', 'WPS 云服务', 'PPT', '表格', '编辑转化', '智能文档', '智能表格', '智能表单', '多维表格', 'AI slides', '简历'],
      },
    ],
  },
  {
    title: '文档',
    blocks: [
      {
        title: '',
        items: [
          '拼写检查',
          '拆分/合并文件',
          '批量重命名文档',
          '热门字体颜色',
          '内置图标与图像',
          '添加复选框',
          '添加签名',
          '深入研究',
          '全文翻译',
          'Word 转 PDF',
          'Word 转纯图 PPT',
          '文档分类',
          '批量工具箱',
          '插入二维码、条形码',
          '文档转音频',
        ],
      },
      {
        title: 'AI 文档',
        items: ['AI 拼写检查', 'AI 伴写', 'AI 改写', 'AI 润色', '对照翻译', '文档问答', '全文总结', '文档生成 PPT'],
      },
    ],
  },
  {
    title: '演示',
    blocks: [
      {
        title: '',
        items: ['演示工具', '思维导图', '添加时间轴', '排练计时', '内置图标与图像', '协同编辑', 'PPT 转 PDF/图片'],
      },
      {
        title: 'AI 演示',
        items: ['AI 演示文稿生成器', 'AI 生成单/多页', 'AI 生成图片', 'AI 演讲稿', 'AI 改写', 'AI 帮写', '对照翻译', 'AI 演讲视频'],
      },
    ],
  },
  {
    title: '表格',
    blocks: [
      {
        title: '',
        items: ['合并居中单元格', '高亮重复项', '插入复选框', '批量重命名', '制作工具', 'Excel 转 PDF', '便捷公式', '拆分与合并', '智能工具箱', '数据对比', '筛选-高级模式', '表格打印智能排版', '查找录入', '表格批量插入图片'],
      },
      {
        title: 'AI 表格',
        items: ['表格助手', '操作表格', '快速问答', '快速建表', '批量生成', 'AI 数据分析', 'AI 写公式', 'AI 函数', 'AI 信息提取', 'AI 筛选'],
      },
    ],
  },
  {
    title: 'PDF',
    blocks: [
      {
        title: '格式转换',
        items: ['压缩', '组合', 'PDF 转 Word/Excel/PPT', 'Word/Excel/PPT/JPG 转 PDF', 'PDF 转 可搜索 PDF', 'PDF 转 可扫描 PDF', '输出为图片', '拆分', '批量压缩', '合并'],
      },
      {
        title: '页面编辑',
        items: ['插入页面', '提取页面', '裁剪页面', '替换页面', '复制粘贴页面', '移动页面顺序', '分割页面', '页面大小', '页面逆序', '删除空白页', '删除页面', '页面拼接'],
      },
      {
        title: '内容编辑',
        items: ['自动生成书签', '自动生成目录', '编辑内容&图片编辑', '编辑内容&文本编辑', '插入页码', '页眉页脚', '擦除', '水印', '文档背景', '扫描件预识别', '批量增删水印', 'PDF 查找替换', '附件'],
      },
      {
        title: '对象编辑',
        items: ['视频', '音频', '形状', '表单编辑', '识别表格', '提取表格'],
      },
      {
        title: '注释',
        items: ['PDF 链接', '图章工具'],
      },
      {
        title: '提取转换/OCR',
        items: ['PDF 转 TXT', 'PDF 提取图片', '扫描件识别', '智能优化', '扫描件编辑', '扫描件选项卡'],
      },
      {
        title: '公共能力',
        items: ['PDF 悬浮窗口', '拆分合并器', '系统预览窗格', '签署', '打印模板'],
      },
      {
        title: 'AI PDF',
        items: ['对照翻译', '文档问答', '全文总结', '文档生成 PPT', 'AI 印前优化'],
      },
    ],
  },
  {
    title: '智能文档',
    blocks: [{ title: '', items: ['智能文档'] }],
  },
  {
    title: '智能表格',
    blocks: [{ title: '', items: ['智能表格'] }],
  },
  {
    title: '智能表单',
    blocks: [{ title: '', items: ['智能表单'] }],
  },
  {
    title: '多维表格',
    blocks: [{ title: '', items: ['多维表格'] }],
  },
  {
    title: 'AI Slides',
    blocks: [{ title: '', items: ['AI Slides'] }],
  },
  {
    title: '简历',
    blocks: [{ title: '', items: ['简历'] }],
  },
  {
    title: 'WPS 图片',
    blocks: [
      {
        title: '',
        items: ['模糊影像', '画像删除文字'],
      },
      {
        title: '查看器',
        items: ['查看器', '工具箱', '另存为', '云相册', '批量导出和删除', '格式转换', '输出为图片'],
      },
      {
        title: '打印',
        items: ['图片打印'],
      },
      {
        title: '转换',
        items: ['图片转文字'],
      },
      {
        title: '',
        items: ['高级截屏', '图片悬浮工具栏', '截图取字', '另存为', '添加、调整等基础功能', '矫正', '调色-本地滤镜、色彩', '视频制作', '屏幕录制'],
      },
      {
        title: '编辑处理',
        items: ['图片压缩', '拼图', '修改尺寸', '图片批量处理', '图片编辑器', '批量导出和删除', '图片分割'],
      },
      {
        title: '',
        items: ['GIF 图制作', '图片翻译'],
      },
    ],
  },
  {
    title: '个人知识库',
    blocks: [{ title: '', items: ['个人知识库'] }],
  },
  {
    title: 'WPS听记',
    blocks: [{ title: '', items: ['语音速记'] }],
  },
  {
    title: 'WPS AI 工具',
    blocks: [
      {
        title: 'AI 表格',
        items: ['表格助手', 'AI 筛选'],
      },
      {
        title: 'AI PDF',
        items: ['Chat PDF', 'AI 翻译 PDF', 'AI PDF 摘要器', 'AI 印前优化'],
      },
      {
        title: 'AI PPT',
        items: ['AI 演示文稿生成器', '原生、无限制编辑', '多格式导出', 'AI 演讲视频'],
      },
      {
        title: 'AI 图表',
        items: ['在线流程图', 'AI 文档脑图', '灵犀 AI 流程图'],
      },
      {
        title: 'AI 图像工具',
        items: ['消除图像模糊', '水印去除', 'AI 照片编辑器', 'AI 背景去除器', 'AI 手绘转图片', 'AI 抠图', 'AI 变清晰', '智能水印', 'AI 消除', '格式转换', '输出为图片', '图片转 PDF', 'AI 裁剪', 'AI 提取文字', 'AI 公式/表格提取', 'AI 无痕改字', 'AI 文字清晰', '调色-AI 滤镜', 'AI 扩图', '无痕改字', '魔法改图'],
      },
      {
        title: 'AI 图形',
        items: ['AI 图形整理器', 'AI 概念图形制作'],
      },
      {
        title: 'AI 论文',
        items: ['AI 论文初稿', 'AI 开题报告', '知网 AI 选题分析', '知网 AI 选题综述'],
      },
      {
        title: 'AI 写作',
        items: ['智能文章生成', '标题产生器', '释义工具', 'AI 摘要器', 'AI 润色', '故事生成器', '句子重写器', '段落重写器', '改写工具', 'AI 邮件撰写器', 'AI 伴写', 'AI 拼写检查'],
      },
      {
        title: '',
        items: ['AI 翻译', 'AI 朗读', 'AI 合同审查'],
      },
      {
        title: '稻壳',
        items: ['AI 封面', 'AI 设计', 'AI 新建'],
      },
      {
        title: '',
        items: ['AI 生成 3D'],
      },
    ],
  },
  {
    title: '特色功能',
    blocks: [
      {
        title: '图表',
        items: ['思维导图', '流程图', '知识库思维导图'],
      },
      {
        title: '论文',
        items: ['论文排版', '论文 AIGC 检查', '论文查改助手', '论文助手 Web 插件'],
      },
    ],
  },
  {
    title: '素材美化',
    blocks: [
      {
        title: '文字类',
        items: ['云字体', '在线艺术字', '在线文本框', '文字样式', '项目符号', '在线符号'],
      },
      {
        title: '图片',
        items: ['图库'],
      },
      {
        title: '图表',
        items: ['在线图表'],
      },
      {
        title: '表格',
        items: ['在线表格样式'],
      },
      {
        title: '转 PPT',
        items: ['脑图 转 PPT', 'Word 转 PPT'],
      },
      {
        title: '智能特性',
        items: ['智能动画', '在线封面', '主题色', '渐变色'],
      },
    ],
  },
  {
    title: '拓展工具',
    blocks: [
      {
        title: '转换工具',
        items: ['WEBP 转 PNG', 'HEIC 转 JPG', 'WEBP 转 JPG', 'AVIF 转 JPG', 'HEIC 转 PNG', 'AVIF 转 PNG', 'HEIC 到 PDF', 'JPG 转 Excel'],
      },
      {
        title: '批量工具',
        items: ['批量删除', '批量打印', '批量重命名'],
      },
      {
        title: '社交媒体工具',
        items: ['YouTube 转 MP3', 'YouTube 视频下载器', 'Instagram 视频下载器', 'Facebook 视频下载器', 'Tiktok 视频下载器', 'Twitter 视频下载器', 'Pinterest 视频下载器', 'YouTube 缩略图下载器'],
      },
      {
        title: '公共工具',
        items: ['帮助中心', '首页右侧面板', '浏览器助手', '系统右键菜单', '系统文档属性入口'],
      },
    ],
  },
  {
    title: '使用场景',
    blocks: [
      {
        title: '学生学习',
        items: ['Chat PDF 读论文', '英文文献翻译工作流', 'AI 辅助写论文'],
      },
      {
        title: '',
        items: ['教师备课', 'AI 生成教案', '一键制作课件 PPT', '试题整理与格式化'],
      },
      {
        title: '职场办公',
        items: ['AI 写工作周报', 'AI 写会议纪要', 'AI 写项目汇报 PPT', 'AI 合同条款提取'],
      },
      {
        title: '内容创作',
        items: ['AI 生成文章初稿', '多语言版本创作', '社交媒体文案批量生产'],
      },
    ],
  },
  {
    title: '帮助与支持',
    blocks: [
      {
        title: '',
        items: ['更新日志'],
      },
      {
        title: '常见问题 FAQ',
        items: ['WPS 基础', 'WPS AI', '文档', '表格', 'PPT', 'PDF', '智能文档', '智能表格', '智能表单', '多维表格', 'AI Slides', '简历'],
      },
      {
        title: '',
        items: ['联系支持'],
      },
    ],
  },
]

const docsFaqItems = [
  {
    title: '新手入门',
    desc: '通过写文档、生成 PPT、制作表格或 PDF 编辑转化等场景任务，在几分钟内熟悉 WPS 文档中心的主要能力入口。',
  },
  {
    title: '核心功能与 AI',
    desc: '核心功能覆盖文字、表格、演示与 PDF 的非 AI 能力说明；WPS AI 工具区提供写作、翻译、PPT、图像等智能能力的独立文档索引。',
  },
  {
    title: '在线工具与场景',
    desc: '图片处理、格式转换与社交媒体类工具的使用说明集中呈现；使用场景帮助您按角色快速找到对应工作流。',
  },
  {
    title: '工具与资源',
    desc: '图片工具、格式转换与社交媒体下载等在线工具文档独立成区，可按工具名称在左侧目录或顶部搜索中快速定位。',
  },
  {
    title: '帮助与支持',
    desc: '更新日志、常见问题与工单/客服入口统一汇总，便于自助排查与反馈。',
  },
]

const docsSectionMarkersMap = {}

function splitDocsGroupsWithMarkers(items, markers) {
  const markerSet = new Set(markers)
  const blocks = []
  let current = { title: '', items: [] }

  items.forEach((item) => {
    if (markerSet.has(item)) {
      if (current.title || current.items.length > 0) {
        blocks.push(current)
      }
      current = { title: item, items: [] }
      return
    }
    current.items.push(item)
  })

  if (current.title || current.items.length > 0) {
    blocks.push(current)
  }

  return blocks
}

function getDocsSectionBlocks(section, sectionMarkersMap) {
  if (Array.isArray(section.blocks)) {
    return section.blocks
      .map((block) => ({
        title: block.title ?? '',
        items: Array.isArray(block.items) ? block.items.filter(Boolean) : [],
      }))
      .filter((block) => block.title || block.items.length > 0)
  }
  const items = section.groups ?? []
  const markers = sectionMarkersMap[section.title]
  if (!markers) {
    return [{ title: '', items }]
  }
  return splitDocsGroupsWithMarkers(items, markers).filter((block) => block.title || block.items.length > 0)
}

const blogCategoryAccentClassMap = {
  product: 'blog-card-accent--product',
  ai: 'blog-card-accent--ai',
  enterprise: 'blog-card-accent--company',
  stories: 'blog-card-accent--tips',
  tips: 'blog-card-accent--tips',
  company: 'blog-card-accent--company',
}

/** Official WPS social profiles — keep in sync with useHomePageSeo Organization.sameAs. */
const blogSocialLinks = [
  {
    id: 'twitter',
    label: 'X / Twitter',
    url: 'https://x.com/WPSOffice',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M14.36 4.47c.01.16.01.32.01.47 0 4.8-3.65 10.33-10.33 10.33-2.05 0-3.96-.6-5.57-1.63.29.03.57.05.87.05 1.7 0 3.27-.58 4.51-1.55a3.64 3.64 0 01-3.4-2.52c.23.03.45.05.69.05.33 0 .65-.04.96-.12A3.64 3.64 0 01.6 5.96v-.05c.54.3 1.16.48 1.82.5A3.64 3.64 0 011.3 3.3a10.32 10.32 0 007.49 3.8 4.1 4.1 0 01-.1-.83 3.63 3.63 0 016.28-2.48 7.14 7.14 0 002.31-.88 3.64 3.64 0 01-1.6 2.01 7.26 7.26 0 002.09-.57 7.83 7.83 0 01-1.81 1.12z" />
      </svg>
    ),
  },
  {
    id: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@WPSOffice',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M15.6 4.2a2 2 0 00-1.41-1.41C12.9 2.4 8 2.4 8 2.4s-4.9 0-6.19.38A2 2 0 00.4 4.2C0 5.5 0 8 0 8s0 2.5.4 3.8a2 2 0 001.41 1.41C3.1 13.6 8 13.6 8 13.6s4.9 0 6.19-.38a2 2 0 001.41-1.41C16 10.5 16 8 16 8s0-2.5-.4-3.8zM6.4 10.4V5.6l4.4 2.4-4.4 2.4z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/wps-office',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M14.82 0H1.18C.53 0 0 .53 0 1.18v13.64C0 15.47.53 16 1.18 16h13.64c.65 0 1.18-.53 1.18-1.18V1.18C16 .53 15.47 0 14.82 0zM4.74 13.62H2.37V6h2.37v7.62zm-1.19-8.66A1.37 1.37 0 112 3.6a1.37 1.37 0 011.55 1.36zM13.62 13.62h-2.37V9.9c0-.88-.02-2.02-1.23-2.02-1.23 0-1.42.96-1.42 1.95v3.8H6.24V6h2.27v1.04h.03c.32-.6 1.09-1.23 2.24-1.23 2.39 0 2.84 1.57 2.84 3.62v4.19z" />
      </svg>
    ),
  },
]

const pricingPlansEn = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['3 free conversions/day', '200MB file limit', '20 languages', 'Basic tools'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$6.99',
    period: '/month',
    features: [
      'Unlimited conversions',
      '200MB file limit',
      'All 40+ tools',
      'Priority processing',
      'Batch mode',
      'Ad-free',
    ],
    cta: 'Go Pro',
    featured: true,
  },
  {
    name: 'Team',
    price: '$4.99',
    period: '/month /user/month',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Admin dashboard',
      'API access',
      'SSO / SAML',
      'Priority support',
    ],
    cta: 'Contact Sales',
    featured: false,
  },
]

const pricingPlansZh = [
  {
    name: '免费版',
    price: '¥0',
    period: '/月',
    features: ['每天 3 次免费转换', '200MB 文件限制', '20 种语言', '基础工具'],
    cta: '免费开始',
    featured: false,
  },
  {
    name: '专业版',
    price: '¥39',
    period: '/月',
    features: [
      '无限次转换',
      '200MB 文件限制',
      '所有 40+ 工具',
      '优先处理',
      '批量模式',
      '无广告',
    ],
    cta: '升级专业版',
    featured: true,
  },
  {
    name: '团队版',
    price: '¥29',
    period: '/月 /用户/月',
    features: [
      '包含专业版所有功能',
      '团队协作',
      '管理员仪表板',
      'API 访问',
      'SSO / SAML',
      '优先支持',
    ],
    cta: '联系销售',
    featured: false,
  },
]

const answersHotCategories = [
  {
    title: 'WPS Writer',
    meta: 'Document Editing',
    desc: 'Formatting, styles, table of contents, comments, and long-form writing.',
    icon: 'Wr',
    accent: 'bg-[#4f46e5]',
  },
  {
    title: 'WPS Spreadsheet',
    meta: 'Data & Formulas',
    desc: 'Formula errors, pivot tables, charts, data cleanup, and import workflows.',
    icon: 'Sp',
    accent: 'bg-[#0f766e]',
  },
  {
    title: 'WPS Presentation',
    meta: 'Slides & Storytelling',
    desc: 'Themes, animation timing, speaker view, and design best practices.',
    icon: 'Pr',
    accent: 'bg-[#2563eb]',
  },
  {
    title: 'WPS PDF',
    meta: 'PDF Tools',
    desc: 'Convert, merge, compress, sign, and protect files for secure delivery.',
    icon: 'Pd',
    accent: 'bg-[#dc2626]',
  },
  {
    title: 'WPS AI',
    meta: 'AI Assistant',
    desc: 'Prompt tips, rewriting, summaries, and task automation in WPS AI.',
    icon: 'AI',
    accent: 'bg-[#7c3aed]',
  },
  {
    title: 'Templates',
    meta: 'Ready-to-use Layouts',
    desc: 'Template customization, branding, and localization across teams.',
    icon: 'Tp',
    accent: 'bg-[#a16207]',
  },
  {
    title: 'Cloud & Sync',
    meta: 'Storage',
    desc: 'Sync conflicts, version history, shared folders, and backup strategy.',
    icon: 'Cl',
    accent: 'bg-[#0891b2]',
  },
  {
    title: 'Team Collaboration',
    meta: 'Shared Editing',
    desc: 'Permissions, review comments, @mentions, and approval workflows.',
    icon: 'Tm',
    accent: 'bg-[#db2777]',
  },
  {
    title: 'Account & Billing',
    meta: 'Subscriptions',
    desc: 'Plan upgrades, invoices, license binding, and payment troubleshooting.',
    icon: 'Ac',
    accent: 'bg-[#475569]',
  },
  {
    title: 'WPS for Windows',
    meta: 'Desktop Client',
    desc: 'Install issues, startup errors, add-ins, and performance tuning.',
    icon: 'Ws',
    accent: 'bg-[#1d4ed8]',
  },
  {
    title: 'WPS for macOS',
    meta: 'Desktop Client',
    desc: 'Permissions, fonts, shortcuts, and Apple Silicon compatibility.',
    icon: 'Mc',
    accent: 'bg-[#0f172a]',
  },
  {
    title: 'WPS for Linux',
    meta: 'Desktop Client',
    desc: 'Package install, dependencies, rendering glitches, and locale setup.',
    icon: 'Lx',
    accent: 'bg-[#0f766e]',
  },
  {
    title: 'Mobile App',
    meta: 'Android & iOS',
    desc: 'File sync, account linking, scanner usage, and mobile editing tips.',
    icon: 'Mb',
    accent: 'bg-[#4f46e5]',
  },
  {
    title: 'Forms & Surveys',
    meta: 'Data Collection',
    desc: 'Form logic, share permissions, response export, and collaboration.',
    icon: 'Fm',
    accent: 'bg-[#c2410c]',
  },
  {
    title: 'Automation',
    meta: 'Macros & Workflows',
    desc: 'Automate repeated office tasks with formulas, scripts, and shortcuts.',
    icon: 'Au',
    accent: 'bg-[#0ea5e9]',
  },
  {
    title: 'API & Integrations',
    meta: 'Developer',
    desc: 'Connect WPS with internal tools, bots, and enterprise platforms.',
    icon: 'Ap',
    accent: 'bg-[#9333ea]',
  },
]

const answersHotCategoryZhTextByTitle = {
  'WPS Writer': {
    meta: '文档编辑',
    desc: '涵盖排版样式、目录、批注与长文写作等常见问题。',
  },
  'WPS Spreadsheet': {
    meta: '数据与公式',
    desc: '聚焦公式报错、透视表、图表分析、数据清洗与导入流程。',
  },
  'WPS Presentation': {
    meta: '演示与表达',
    desc: '包含主题设置、动画节奏、演讲者视图与设计实践。',
  },
  'WPS PDF': {
    meta: 'PDF 工具',
    desc: '支持转换、合并、压缩、签名和加密等交付场景。',
  },
  'WPS AI': {
    meta: 'AI 助手',
    desc: '提供提示词技巧、改写、总结与任务自动化实践。',
  },
  Templates: {
    meta: '现成模板',
    desc: '涉及模板定制、品牌统一与多语言协作规范。',
  },
  'Cloud & Sync': {
    meta: '云端存储',
    desc: '处理同步冲突、版本历史、共享文件夹与备份策略。',
  },
  'Team Collaboration': {
    meta: '多人协作',
    desc: '关注权限设置、评审评论、@提及和审批流程。',
  },
  'Account & Billing': {
    meta: '账号订阅',
    desc: '覆盖套餐升级、发票、授权绑定与支付异常。',
  },
  'WPS for Windows': {
    meta: '桌面客户端',
    desc: '解决安装问题、启动异常、插件冲突和性能调优。',
  },
  'WPS for macOS': {
    meta: '桌面客户端',
    desc: '聚焦权限、字体、快捷键与 Apple Silicon 兼容性。',
  },
  'WPS for Linux': {
    meta: '桌面客户端',
    desc: '包含安装包依赖、渲染问题与本地化环境配置。',
  },
  'Mobile App': {
    meta: 'Android 与 iOS',
    desc: '涵盖文件同步、账号绑定、扫描与移动编辑技巧。',
  },
  'Forms & Surveys': {
    meta: '数据采集',
    desc: '涉及表单逻辑、分享权限、结果导出与协同处理。',
  },
  Automation: {
    meta: '宏与流程',
    desc: '通过公式、脚本与快捷流程自动化重复办公任务。',
  },
  'API & Integrations': {
    meta: '开发集成',
    desc: '帮助将 WPS 连接到内部系统、机器人和企业平台。',
  },
}

const answersHowToItems = [
  {
    title: 'Start with search',
    desc: 'Search error codes, feature names, or short problem keywords before posting.',
  },
  {
    title: 'Ask a clear question',
    desc: 'Include your platform, app version, and exact steps so others can reproduce.',
  },
  {
    title: 'Close the loop',
    desc: 'Mark the best answer and share final notes to help the next user faster.',
  },
]

const answersHowToItemsZh = [
  {
    title: '先搜索再提问',
    desc: '发帖前先搜索错误码、功能名或简短问题关键词，通常能更快定位答案。',
  },
  {
    title: '问题描述要具体',
    desc: '请附上平台、版本和复现步骤，方便他人快速复现并给出准确建议。',
  },
  {
    title: '形成闭环反馈',
    desc: '找到方案后标记最佳答案，并补充结论，帮助后续用户更快解决同类问题。',
  },
]

const answersCommunityCards = [
  {
    title: 'Product Feedback Hub',
    desc: 'Share roadmap suggestions and vote on requested improvements.',
  },
  {
    title: 'WPS Academy Forum',
    desc: 'Discuss learning paths, certifications, and skill-building resources.',
  },
  {
    title: 'Template Creator Club',
    desc: 'Exchange ideas for business, education, and personal template design.',
  },
  {
    title: 'Automation Builders',
    desc: 'Talk about scripts, APIs, connectors, and workflow orchestration.',
  },
]

const answersCommunityCardsZh = [
  {
    title: '产品反馈中心',
    desc: '提交路线图建议，并为你希望优先实现的改进投票。',
  },
  {
    title: 'WPS 学院论坛',
    desc: '交流学习路径、认证体系和能力提升相关资源。',
  },
  {
    title: '模板创作者俱乐部',
    desc: '分享商业、教育和个人模板设计的实践经验。',
  },
  {
    title: '自动化构建者社区',
    desc: '讨论脚本、API、连接器与工作流编排方案。',
  },
]

const answersForumFilterSections = [
  {
    title: '内容',
    options: [
      { key: 'all', label: '所有问题', active: true },
      { key: 'no-answer', label: '没有答案' },
      { key: 'has-answer', label: '有答案' },
      { key: 'no-answer-or-comments', label: '没有答案或注释' },
      { key: 'accepted-answer', label: '带有接受的答案' },
      { key: 'recommended-answer', label: '带有推荐的答案' },
    ],
  },
]

const answersForumQuestionItems = [
  {
    badge: '官方已回复',
    title: '多语言文档批量替换品牌词后，目录页码错位怎么处理？',
    excerpt:
      '我们在一份 120 页的说明书里做批量替换，正文正常，但目录页码和锚点链接不同步。有没有稳定的修复顺序？',
    topic: 'WPS Writer · 目录与样式',
    replies: 6,
    votes: 23,
    author: 'WPS 支持工程师 · Lina',
    updatedAt: '今天 14:38',
  },
  {
    badge: '已采纳',
    title: '跨团队协作时，表格筛选视图总被互相覆盖，能独立保存吗？',
    excerpt:
      '10 人共享同一份报表，A 同事切换筛选后会影响 B 同事视图。想让每个人都能保存自己的筛选预设。',
    topic: 'WPS Spreadsheet · 协作',
    replies: 4,
    votes: 17,
    author: '社区版主 · Kevin',
    updatedAt: '今天 11:24',
  },
  {
    badge: '热门',
    title: '演示文稿导出为视频后，动画时间轴整体变快了',
    excerpt:
      '原始演示里每页动画都正常，但导出 MP4 后节奏明显加快。帧率和转场参数应该如何设置更稳定？',
    topic: 'WPS Presentation · 导出',
    replies: 3,
    votes: 31,
    author: '产品顾问 · Amber',
    updatedAt: '昨天 20:57',
  },
  {
    badge: '',
    title: 'PDF 合并后目录书签丢失，能否自动继承原文件结构？',
    excerpt:
      '合并 8 份合同后原有书签全部消失，只保留页面。有没有参数可以保留一级与二级书签层级？',
    topic: 'WPS PDF · 合并与书签',
    replies: 2,
    votes: 9,
    author: '企业用户 · 王宁',
    updatedAt: '昨天 17:05',
  },
  {
    badge: '官方已回复',
    title: 'AI 改写时术语被“优化”成口语，如何锁定专业词汇？',
    excerpt:
      '在法务和财务文案中，一些固定术语不能变更。希望 AI 改写只调整语句，不改动术语本体。',
    topic: 'WPS AI · 改写策略',
    replies: 8,
    votes: 28,
    author: 'AI 产品经理 · Iris',
    updatedAt: '昨天 10:43',
  },
  {
    badge: '',
    title: '模板库里同名模板太多，如何按团队规范快速筛选？',
    excerpt:
      '公司内部有多个部门上传了同名模板，员工经常选错版本。想建立“部门 + 版本”筛选视图。',
    topic: '模板中心 · 规范化',
    replies: 5,
    votes: 14,
    author: '运营同学 · Mia',
    updatedAt: '05-13 18:19',
  },
]

const supportedLocales = [
  { bcp47: 'en-US', code: 'en-us', short: 'US', label: 'English' },
  { bcp47: 'zh-HK', code: 'zh-hk', short: 'HK', label: '繁體中文' },
  { bcp47: 'es-MX', code: 'es-mx', short: 'MX', label: 'Español' },
  { bcp47: 'pt-BR', code: 'pt-br', short: 'BR', label: 'Português' },
  { bcp47: 'fr-FR', code: 'fr-fr', short: 'FR', label: 'Français' },
  { bcp47: 'id-ID', code: 'id-id', short: 'ID', label: 'Bahasa Indonesia' },
  { bcp47: 'vi-VN', code: 'vi-vn', short: 'VN', label: 'Tiếng Việt' },
  { bcp47: 'tr-TR', code: 'tr-tr', short: 'TR', label: 'Türkçe' },
  { bcp47: 'ru-RU', code: 'ru-ru', short: 'RU', label: 'Русский' },
  { bcp47: 'th-TH', code: 'th-th', short: 'TH', label: 'ไทย' },
]

const localeOptions = supportedLocales.map((item) => ({
  code: item.code,
  short: item.short,
  label: item.label,
}))

const allProductsSections = [
  {
    title: 'AI Tools',
    items: [
      { name: 'AI Detector', path: 'ai-tools/ai-detector/' },
      { name: 'Background Remover', path: 'ai-tools/bg-remover/' },
      { name: 'Chat with PDF', path: 'ai-tools/pdf-chat/' },
      { name: 'Image Compressor', path: 'ai-tools/img-compress/' },
      { name: 'Image to Text', path: 'ai-tools/img-to-text/' },
      { name: 'QR Code Generator', path: 'ai-tools/qr-gen/' },
    ],
  },
  {
    title: 'AI Writing',
    items: [
      { name: 'AI Summarizer', path: 'ai-writing/ai-summarizer/' },
      { name: 'AI Writer', path: 'ai-writing/ai-writer/' },
      { name: 'Blog Writer', path: 'ai-writing/blog-writer/' },
      { name: 'Cover Letter Generator', path: 'ai-writing/cover-letter/' },
      { name: 'Email Writer', path: 'ai-writing/email-writer/' },
      { name: 'Essay Writer', path: 'ai-writing/essay-writer/' },
      { name: 'Grammar Checker', path: 'ai-writing/grammar-check/' },
      { name: 'Paraphrase Tool', path: 'ai-writing/paraphrase/' },
      { name: 'Product Description Writer', path: 'ai-writing/product-desc/' },
      { name: 'Translator', path: 'ai-writing/translate/' },
    ],
  },
  {
    title: 'AI Sheets',
    items: [
      { name: 'AI Excel Assistant', path: 'ai-sheets/ai-excel/' },
      { name: 'Chart Generator', path: 'ai-sheets/chart-gen/' },
      { name: 'CSV to Excel', path: 'ai-sheets/csv-to-excel/' },
      { name: 'Data Analysis', path: 'ai-sheets/data-analysis/' },
      { name: 'Excel Templates', path: 'ai-sheets/excel-templates/' },
      { name: 'Formula Generator', path: 'ai-sheets/formula-gen/' },
    ],
  },
  {
    title: 'AI Slides',
    items: [
      { name: 'AI Presentation Maker', path: 'ai-slides/ai-ppt/' },
      { name: 'Chart Maker', path: 'ai-slides/chart-maker/' },
      { name: 'Mind Map Maker', path: 'ai-slides/mind-map/' },
      { name: 'Outline Generator', path: 'ai-slides/outline/' },
      { name: 'Slide Design Assistant', path: 'ai-slides/design/' },
      { name: 'Slides to Video', path: 'ai-slides/to-video/' },
      { name: 'Theme Generator', path: 'ai-slides/theme/' },
    ],
  },
  {
    title: 'PDF Tools',
    items: [
      { name: 'Compress PDF', path: 'pdf-tools/compress-pdf/' },
      { name: 'Edit PDF', path: 'pdf-tools/edit-pdf/' },
      { name: 'Excel to PDF', path: 'pdf-tools/excel-to-pdf/' },
      { name: 'JPG to PDF', path: 'pdf-tools/jpg-to-pdf/' },
      { name: 'Merge PDF', path: 'pdf-tools/merge-pdf/' },
      { name: 'PDF to Excel', path: 'pdf-tools/pdf-to-excel/' },
      { name: 'PDF to JPG', path: 'pdf-tools/pdf-to-jpg/' },
      { name: 'PDF to PPT', path: 'pdf-tools/pdf-to-ppt/' },
      { name: 'PDF to Word', path: 'pdf-tools/pdf-to-word/' },
      { name: 'PPT to PDF', path: 'pdf-tools/ppt-to-pdf/' },
      { name: 'Protect PDF', path: 'pdf-tools/protect-pdf/' },
      { name: 'Sign PDF', path: 'pdf-tools/sign-pdf/' },
      { name: 'Split PDF', path: 'pdf-tools/split-pdf/' },
      { name: 'Word to PDF', path: 'pdf-tools/word-to-pdf/' },
    ],
  },
]

const toolRootSet = new Set(
  allProductsSections
    .flatMap((section) => section.items.map((item) => item.path.split('/').filter(Boolean)[0]))
    .filter(Boolean),
)
const templateLibraryRootSet = new Set(['resume-templates', 'presentation-templates'])

const WPS_AI_FEATURES_ROUTE = 'wps-ai-features'
const LEGACY_AI_FEATURES_ROUTE = 'ai-features'

const localeSet = new Set(supportedLocales.map((item) => item.code))
const rootPageSet = new Set(['search', 'sitemap.xml'])
const contentRootSet = new Set([
  'docs',
  'academy',
  'encyclopedia',
  'community',
  'guides',
  'templates',
  'resume-templates',
  'presentation-templates',
  'blog',
  'pricing',
  'download',
  'all-products',
  'all-templates',
  'wps-ai-features',
  'worldwide',
  'locale',
  'answers',
])

function normalizeLocaleSegment(segment) {
  return normalizeLocaleCode(segment)
}

function splitPath(pathname) {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) {
    return { locale: 'en-us', normalizedSegments: [] }
  }

  const normalizedLocale = normalizeLocaleSegment(segments[0])
  if (localeSet.has(normalizedLocale)) {
    return { locale: normalizedLocale, normalizedSegments: segments.slice(1) }
  }
  return { locale: 'en-us', normalizedSegments: segments }
}

function normalizeRouteSegments(segments) {
  if (segments[0] === LEGACY_AI_FEATURES_ROUTE) {
    return [WPS_AI_FEATURES_ROUTE, ...segments.slice(1)]
  }
  return segments
}

function getCanonicalLocalizedPath(pathname, fallbackLocale = 'en-us') {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) {
    return joinPath(toUrlLocale(fallbackLocale))
  }

  const maybeLocale = normalizeLocaleSegment(segments[0])
  if (localeSet.has(maybeLocale)) {
    const urlLocale = toUrlLocale(maybeLocale)
    if (segments.length === 1) {
      return joinPath(urlLocale)
    }
    let innerSegments = normalizeRouteSegments(segments.slice(1))
    if (innerSegments[0] === 'worldwide') {
      innerSegments = ['locale', ...innerSegments.slice(1)]
    }
    if (!innerSegments.length) {
      return joinPath(urlLocale)
    }
    if (rootPageSet.has(innerSegments[0])) {
      return joinPath(...innerSegments)
    }
    return joinPath(urlLocale, ...innerSegments)
  }

  if (rootPageSet.has(segments[0])) {
    return joinPath(...segments)
  }

  if (contentRootSet.has(segments[0]) || toolRootSet.has(segments[0])) {
    return joinPath(toUrlLocale(fallbackLocale), ...normalizeRouteSegments(segments))
  }

  return null
}

function resolveLocaleFromPath(pathname) {
  return splitPath(pathname).locale
}

function getTemplateRouteInfo(normalizedSegments) {
  if (templateLibraryRootSet.has(normalizedSegments[0])) {
    return {
      kind: normalizedSegments[1] ? 'detail' : 'library',
      key: normalizedSegments[0] === 'resume-templates' ? 'resume' : 'presentation',
      slug: normalizedSegments[1] ?? null,
    }
  }
  if (normalizedSegments[0] === 'ai-sheets' && normalizedSegments[1] === 'excel-templates') {
    return {
      kind: normalizedSegments[2] ? 'detail' : 'library',
      key: 'excel',
      slug: normalizedSegments[2] ?? null,
    }
  }
  return null
}

function getTemplateLibraryKey(normalizedSegments) {
  const routeInfo = getTemplateRouteInfo(normalizedSegments)
  return routeInfo?.key ?? null
}

function getGuideRouteInfo(normalizedSegments) {
  if (normalizedSegments[0] !== 'guides') {
    return null
  }
  return {
    kind: normalizedSegments[1] ? 'detail' : 'index',
    slug: normalizedSegments[1] ?? null,
  }
}

function getBlogRouteInfo(normalizedSegments) {
  if (normalizedSegments[0] !== 'blog') {
    return null
  }
  return {
    kind: normalizedSegments[1] ? 'detail' : 'index',
    slug: normalizedSegments[1] ?? null,
  }
}

function resolveTemplateTargetPath(path, locale) {
  const normalizedPath = path
    .split('/')
    .filter(Boolean)
    .join('/')

  if (normalizedPath === 'ai-writing/cover-letter') {
    return joinPath(toUrlLocale(locale), 'resume-templates')
  }
  if (normalizedPath === 'ai-slides/theme') {
    return joinPath(toUrlLocale(locale), 'presentation-templates')
  }
  if (!normalizedPath) {
    return joinPath(toUrlLocale(locale), 'all-templates')
  }
  return joinPath(toUrlLocale(locale), normalizedPath)
}

function buildLocalizedPath(targetLocale, sourcePathname = window.location.pathname) {
  const { search, hash } = window.location
  const { normalizedSegments: rawSegments } = splitPath(sourcePathname)
  const normalizedSegments = normalizeRouteSegments(rawSegments)

  if (normalizedSegments.length === 0) {
    return joinPath(toUrlLocale(targetLocale))
  }

  if (rootPageSet.has(normalizedSegments[0])) {
    const rootPath = joinPath(...normalizedSegments)
    return `${rootPath}${search}${hash}`
  }

  if (contentRootSet.has(normalizedSegments[0]) || toolRootSet.has(normalizedSegments[0])) {
    const localizedPath = joinPath(toUrlLocale(targetLocale), ...normalizedSegments)
    return `${localizedPath}${search}${hash}`
  }

  return `${joinPath(toUrlLocale(targetLocale))}${search}${hash}`
}

function getPageType(pathname) {
  const { normalizedSegments } = splitPath(pathname)
  const templateRoute = getTemplateRouteInfo(normalizedSegments)
  const guideRoute = getGuideRouteInfo(normalizedSegments)
  const blogRoute = getBlogRouteInfo(normalizedSegments)
  if (normalizedSegments[0] === 'docs') {
    return 'docs-center'
  }
  if (blogRoute?.kind === 'detail') {
    return 'blog-detail'
  }
  if (blogRoute?.kind === 'index') {
    return 'blog'
  }
  if (normalizedSegments[0] === 'encyclopedia' || normalizedSegments[0] === 'academy') {
    return 'encyclopedia'
  }
  if (normalizedSegments[0] === 'download') {
    return 'download'
  }
  if (normalizedSegments[0] === 'pricing') {
    return 'pricing'
  }
  if (normalizedSegments[0] === 'all-products') {
    return 'all-products'
  }
  if (normalizedSegments[0] === 'all-templates') {
    return 'all-templates'
  }
  if (
    normalizedSegments[0] === WPS_AI_FEATURES_ROUTE
    || normalizedSegments[0] === LEGACY_AI_FEATURES_ROUTE
  ) {
    return 'ai-features'
  }
  if (normalizedSegments[0] === 'worldwide' || normalizedSegments[0] === 'locale') {
    return 'locale'
  }
  if (normalizedSegments[0] === 'answers' && normalizedSegments[1] === 'forum') {
    return 'answers-forum'
  }
  if (normalizedSegments[0] === 'answers') {
    return 'answers'
  }
  if (guideRoute?.kind === 'detail') {
    return 'guide-detail'
  }
  if (guideRoute?.kind === 'index') {
    return 'guides'
  }
  if (templateRoute?.kind === 'library') {
    return 'template-library'
  }
  if (templateRoute?.kind === 'detail') {
    return 'template-detail'
  }
  if (toolRootSet.has(normalizedSegments[0]) && normalizedSegments[1]) {
    return 'tool-demo'
  }
  return 'home'
}

function getLocaleHomePath(locale) {
  return joinPath(toUrlLocale(locale))
}

function getLocaleDownloadPath(locale) {
  return joinPath(toUrlLocale(locale), 'download')
}

function getLocalePricingPath(locale) {
  return joinPath(toUrlLocale(locale), 'pricing')
}

function getLocaleBlogPath(locale) {
  return joinPath(toUrlLocale(locale), 'blog')
}

function getLocaleEncyclopediaPath(locale) {
  return joinPath(toUrlLocale(locale), 'encyclopedia')
}

function getLocaleAnswersPath(locale) {
  return joinPath(toUrlLocale(locale), 'answers')
}

function getLocaleAnswersForumPath(locale, topicSlug = '') {
  if (topicSlug) {
    return joinPath(toUrlLocale(locale), 'answers', 'forum', topicSlug)
  }
  return joinPath(toUrlLocale(locale), 'answers', 'forum')
}

function toTopicSlug(value) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getLocaleAllProductsPath(locale) {
  return joinPath(toUrlLocale(locale), 'all-products')
}

function getLocaleAllTemplatesPath(locale) {
  return joinPath(toUrlLocale(locale), 'all-templates')
}

function getLocaleAiFeaturesPath(locale) {
  return joinPath(toUrlLocale(locale), WPS_AI_FEATURES_ROUTE)
}

function getLocaleLocalePath(locale) {
  return joinPath(toUrlLocale(locale), 'locale')
}

function getLocaleWorldwidePath(locale) {
  return getLocaleLocalePath(locale)
}

function getLocaleGuidesPath(locale) {
  return joinPath(toUrlLocale(locale), 'guides')
}

function getDocsJumpCardPath(locale, linkKey = '') {
  switch (linkKey) {
    case 'all-products':
      return getLocaleAllProductsPath(locale)
    case 'pricing':
      return getLocalePricingPath(locale)
    case 'guides':
      return getLocaleGuidesPath(locale)
    case 'answers':
      return getLocaleAnswersPath(locale)
    case 'all-templates':
      return getLocaleAllTemplatesPath(locale)
    default:
      return ''
  }
}

function formatBlogDate(dateString, locale = 'en-us') {
  const date = new Date(`${dateString}T12:00:00`)
  if (Number.isNaN(date.getTime())) {
    return dateString
  }
  const normalizedLocale = `${locale}`.replace(/_/g, '-')
  const dateLocale = normalizedLocale.startsWith('zh-hk')
    ? 'zh-HK'
    : normalizedLocale.startsWith('zh-tw')
      ? 'zh-TW'
      : normalizedLocale.startsWith('zh')
        ? 'zh-CN'
        : normalizedLocale
  return date.toLocaleDateString(dateLocale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function highlightEncyclopediaKeyword(text, query) {
  if (!query) {
    return [text]
  }

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const pieces = text.split(regex)

  return pieces.map((piece, index) => {
    if (piece.toLowerCase() === query.toLowerCase()) {
      return (
        <mark key={`${piece}-${index}`} className="ency-highlight">
          {piece}
        </mark>
      )
    }
    return piece
  })
}

function localizeSourceText(value, language, enabled) {
  if (!enabled || typeof value !== 'string') {
    return value
  }
  const sourceTextOverrides = {
    'More navigation': {
      zh: '更多导航',
      'zh-tw': '更多導覽',
      es: 'Más navegación',
      de: 'Weitere Navigation',
      fr: 'Plus de navigation',
      ja: 'その他のナビゲーション',
      ko: '추가 탐색',
      pt: 'Mais navegação',
      ar: 'مزيد من التنقل',
      it: 'Altra navigazione',
      nl: 'Meer navigatie',
      pl: 'Więcej nawigacji',
      tr: 'Daha fazla gezinme',
      id: 'Navigasi lainnya',
      th: 'การนำทางเพิ่มเติม',
      vi: 'Điều hướng khác',
      ms: 'Navigasi lain',
      ru: 'Дополнительная навигация',
    },
    '20 languages': {
      ja: '20言語',
    },
    '20 Languages': {
      ja: '20言語',
    },
    '40+ Tools': {
      ja: '40以上のツール',
    },
    'A-Z Index': {
      ja: 'A-Z インデックス',
    },
    'Social media tools': {
      ja: 'ソーシャルメディアツール',
    },
    'No Installation': {
      ja: 'インストール不要',
    },
    Company: {
      ja: '会社',
      th: 'บริษัท',
    },
    'Follow us': {
      ja: 'フォローする',
      ko: '팔로우하기',
      th: 'ติดตามเรา',
    },
    'AI-Powered': {
      ko: 'AI 기반',
    },
    Partners: {
      ja: 'パートナー',
      ko: '파트너',
      th: 'พันธมิตร',
    },
    'Sign In': {
      th: 'เข้าสู่ระบบ',
    },
    'Get Started Free': {
      th: 'เริ่มต้นฟรี',
    },
    'Start for Free': {
      th: 'เริ่มต้นฟรี',
    },
    'See how it works': {
      th: 'ดูวิธีการทำงาน',
      vi: 'Xem cách hoạt động',
    },
    'Trusted by 500M+ users worldwide': {
      th: 'ได้รับความไว้วางใจจากผู้ใช้กว่า 500 ล้านคนทั่วโลก',
    },
    'Your AI-Powered Office Suite': {
      th: 'ชุดโปรแกรมสำนักงานที่ขับเคลื่อนด้วย AI ของคุณ',
    },
    'WPS AI brings intelligent writing, PDF editing, presentations, and spreadsheets into one seamless experience.': {
      th: 'WPS AI รวมการเขียนอัจฉริยะ การแก้ไข PDF งานนำเสนอ และสเปรดชีตไว้ในประสบการณ์เดียวที่ลื่นไหล',
    },
    'Our Products': {
      th: 'ผลิตภัณฑ์ของเรา',
    },
    'Everything you need to work smarter': {
      th: 'ทุกสิ่งที่คุณต้องการเพื่อทำงานได้อย่างชาญฉลาดยิ่งขึ้น',
    },
    'AI-powered tools that adapt to your workflow': {
      th: 'เครื่องมือ AI ที่ปรับให้เข้ากับขั้นตอนการทำงานของคุณ',
    },
    'Ready to boost your productivity?': {
      th: 'พร้อมยกระดับประสิทธิภาพการทำงานของคุณหรือยัง?',
    },
    'Join 500 million users already using WPS AI': {
      th: 'เข้าร่วมกับผู้ใช้ 500 ล้านคนที่กำลังใช้ WPS AI อยู่แล้ว',
    },
    Products: {
      th: 'ผลิตภัณฑ์',
    },
    Support: {
      th: 'การสนับสนุน',
    },
  }
  const override = sourceTextOverrides[value]?.[language]
  if (override) {
    return override
  }
  const toolFreeQuestionMatch = value.match(/^Is (.+) free to use\?$/)
  if (toolFreeQuestionMatch) {
    const toolName = toolFreeQuestionMatch[1]
    const toolFreeQuestionTemplates = {
      zh: `${toolName} 可以免费使用吗？`,
      'zh-tw': `${toolName} 可以免費使用嗎？`,
      es: `¿Se puede usar ${toolName} gratis?`,
      de: `Kann ${toolName} kostenlos genutzt werden?`,
      fr: `${toolName} est-il gratuit ?`,
      ja: `${toolName} は無料で使えますか？`,
      ko: `${toolName} 무료로 사용할 수 있나요?`,
      pt: `É possível usar ${toolName} gratuitamente?`,
      ar: `هل يمكن استخدام ${toolName} مجانًا؟`,
      it: `È possibile usare ${toolName} gratuitamente?`,
      nl: `Is ${toolName} gratis te gebruiken?`,
      pl: `Czy z ${toolName} można korzystać bezpłatnie?`,
      tr: `${toolName} ücretsiz kullanılabilir mi?`,
      id: `Apakah ${toolName} dapat digunakan secara gratis?`,
      th: `${toolName} ใช้งานได้ฟรีหรือไม่?`,
      vi: `Có thể sử dụng ${toolName} miễn phí không?`,
      ms: `Bolehkah ${toolName} digunakan secara percuma?`,
      ru: `Можно ли пользоваться ${toolName} бесплатно?`,
    }
    return toolFreeQuestionTemplates[language] ?? value
  }
  return translateOfflinePhrase(language, value)
}

function localizeNestedStrings(value, localizeString) {
  if (typeof value === 'string') {
    return localizeString(value)
  }
  if (Array.isArray(value)) {
    return value.map((item) => localizeNestedStrings(item, localizeString))
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, localizeNestedStrings(item, localizeString)]),
    )
  }
  return value
}

function App() {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false)
  const [isWpsFeaturesMenuOpen, setIsWpsFeaturesMenuOpen] = useState(false)
  const [isTemplatesMenuOpen, setIsTemplatesMenuOpen] = useState(false)
  const [isOverflowMenuOpen, setIsOverflowMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  /** Mobile drawer: which parent nav key is expanded (null = all collapsed). */
  const [mobileNavExpandedKey, setMobileNavExpandedKey] = useState(null)
  const [visibleDesktopNavCount, setVisibleDesktopNavCount] = useState(0)
  /** True when center nav cannot fit — switch to hamburger (no squeezed desktop links). */
  const [isCompactNav, setIsCompactNav] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 719.98px)').matches,
  )
  const [allTemplatesTab, setAllTemplatesTab] = useState('category')
  const [activeGuideCategory, setActiveGuideCategory] = useState('all')
  const [activeTemplateFilter, setActiveTemplateFilter] = useState('All')
  const [activeBlogCategory, setActiveBlogCategory] = useState('all')
  const [activeBlogAuthor, setActiveBlogAuthor] = useState('')
  const [blogSearchQuery, setBlogSearchQuery] = useState('')
  const [encyclopediaSearchQuery, setEncyclopediaSearchQuery] = useState('')
  const [activeEncyclopediaCategory, setActiveEncyclopediaCategory] = useState('all')
  const [isBlogShareCopied, setIsBlogShareCopied] = useState(false)
  const [currentLocale, setCurrentLocale] = useState(() =>
    resolveLocaleFromPath(window.location.pathname),
  )
  const [currentPathname, setCurrentPathname] = useState(() => {
    const nextLocale = resolveLocaleFromPath(window.location.pathname)
    return getCanonicalLocalizedPath(window.location.pathname, nextLocale)
      ?? ensureTrailingSlash(window.location.pathname)
  })
  const currentUrlLocale = useMemo(() => toUrlLocale(currentLocale), [currentLocale])
  const langMenuRef = useRef(null)
  const mobileMenuButtonRef = useRef(null)
  const mobileMenuPanelRef = useRef(null)
  const headerInnerRef = useRef(null)
  const headerBrandRef = useRef(null)
  const desktopNavRef = useRef(null)
  const desktopNavMeasureRef = useRef(null)
  const desktopActionsWidthRef = useRef(300)
  const desktopMenuCloseTimeoutRef = useRef({
    products: 0,
    'wps-features': 0,
    templates: 0,
    overflow: 0,
  })

  const clearDesktopMenuCloseTimeout = useCallback((menuKey) => {
    const timeoutId = desktopMenuCloseTimeoutRef.current[menuKey]
    if (!timeoutId) {
      return
    }
    window.clearTimeout(timeoutId)
    desktopMenuCloseTimeoutRef.current[menuKey] = 0
  }, [])

  const closeDesktopMenu = useCallback((menuKey) => {
    if (menuKey === 'products') {
      setIsProductsMenuOpen(false)
      return
    }
    if (menuKey === 'wps-features') {
      setIsWpsFeaturesMenuOpen(false)
      return
    }
    if (menuKey === 'templates') {
      setIsTemplatesMenuOpen(false)
      return
    }
    if (menuKey === 'overflow') {
      setIsOverflowMenuOpen(false)
    }
  }, [])

  const openDesktopMenu = useCallback(
    (menuKey) => {
      clearDesktopMenuCloseTimeout('products')
      clearDesktopMenuCloseTimeout('wps-features')
      clearDesktopMenuCloseTimeout('templates')
      clearDesktopMenuCloseTimeout('overflow')
      setIsProductsMenuOpen(menuKey === 'products')
      setIsWpsFeaturesMenuOpen(menuKey === 'wps-features')
      setIsTemplatesMenuOpen(menuKey === 'templates')
      setIsOverflowMenuOpen(menuKey === 'overflow')
    },
    [clearDesktopMenuCloseTimeout],
  )

  const scheduleDesktopMenuClose = useCallback(
    (menuKey) => {
      clearDesktopMenuCloseTimeout(menuKey)
      desktopMenuCloseTimeoutRef.current[menuKey] = window.setTimeout(() => {
        closeDesktopMenu(menuKey)
        desktopMenuCloseTimeoutRef.current[menuKey] = 0
      }, 140)
    },
    [clearDesktopMenuCloseTimeout, closeDesktopMenu],
  )

  useEffect(() => {
    const mountLocale = resolveLocaleFromPath(window.location.pathname)
    const canonicalOnMount =
      getCanonicalLocalizedPath(window.location.pathname, mountLocale)
      ?? ensureTrailingSlash(window.location.pathname)
    if (canonicalOnMount !== window.location.pathname) {
      window.history.replaceState({}, '', canonicalOnMount)
    }

    const onPointerDown = (event) => {
      if (!langMenuRef.current?.contains(event.target)) {
        setIsLangOpen(false)
      }
      const isInsideMobileMenuButton = mobileMenuButtonRef.current?.contains(event.target)
      const isInsideMobileMenuPanel = mobileMenuPanelRef.current?.contains(event.target)
      if (!isInsideMobileMenuButton && !isInsideMobileMenuPanel) {
        setIsMobileMenuOpen(false)
        setMobileNavExpandedKey(null)
      }
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsLangOpen(false)
        setIsMobileMenuOpen(false)
        setMobileNavExpandedKey(null)
      }
    }
    const onPopState = () => {
      const nextLocale = resolveLocaleFromPath(window.location.pathname)
      const canonicalPath =
        getCanonicalLocalizedPath(window.location.pathname, nextLocale)
        ?? ensureTrailingSlash(window.location.pathname)
      if (canonicalPath !== window.location.pathname) {
        window.history.replaceState({}, '', canonicalPath)
      }
      setCurrentPathname(canonicalPath)
      setCurrentLocale(resolveLocaleFromPath(canonicalPath))
      setIsMobileMenuOpen(false)
      setMobileNavExpandedKey(null)
    }
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  useEffect(
    () => () => {
      clearDesktopMenuCloseTimeout('products')
      clearDesktopMenuCloseTimeout('templates')
      clearDesktopMenuCloseTimeout('wps-features')
      clearDesktopMenuCloseTimeout('overflow')
    },
    [clearDesktopMenuCloseTimeout],
  )

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 720) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const currentLocaleOption = useMemo(
    () => localeOptions.find((item) => item.code === currentLocale) ?? localeOptions[0],
    [currentLocale],
  )
  const contentLanguage = useMemo(() => resolveContentLanguage(currentLocale), [currentLocale])
  const isZhCnContent = contentLanguage === 'zh'
  const isZhTwContent = contentLanguage === 'zh-tw'
  const isZhContent = isZhCnContent || isZhTwContent
  const shouldUseOfflinePhraseTranslations = contentLanguage !== 'en'
  const localizeString = useCallback(
    (value) => localizeSourceText(value, contentLanguage, shouldUseOfflinePhraseTranslations),
    [contentLanguage, shouldUseOfflinePhraseTranslations],
  )
  const uiTextBase = isZhCnContent ? uiTextByLanguage.zh : uiTextByLanguage.en
  const uiText = useMemo(
    () => (isZhCnContent ? uiTextBase : localizeNestedStrings(uiTextBase, localizeString)),
    [isZhCnContent, localizeString, uiTextBase],
  )
  const wpsFeaturesHeaderMegaMenu = useMemo(
    () => resolveWpsFeaturesHeaderMegaMenu(uiText.nav.wpsFeaturesMega),
    [uiText.nav.wpsFeaturesMega],
  )
  const freeAiToolsHeaderMegaMenu = useMemo(
    () => resolveFreeAiToolsHeaderMegaMenu(uiText.nav.freeAiToolsMega),
    [uiText.nav.freeAiToolsMega],
  )
  useEffect(() => {
    document.documentElement.lang = currentLocale
    document.documentElement.dir = currentLocale.startsWith('ar') ? 'rtl' : 'ltr'
  }, [currentLocale])

  const localizedProducts = useMemo(() => {
    if (isZhCnContent) {
      return productsZh
    }
    return products.map((item) => ({
      ...item,
      displayName: localizeString(item.name),
      desc: localizeString(item.desc),
    }))
  }, [isZhCnContent, localizeString])
  const localizedFeatures = useMemo(() => {
    if (isZhCnContent) {
      return featuresZh
    }
    return features.map((item) => ({
      ...item,
      title: localizeString(item.title),
      desc: localizeString(item.desc),
    }))
  }, [isZhCnContent, localizeString])
  const localizedDesktopDownloadItems = useMemo(() => {
    if (isZhCnContent) {
      return desktopDownloadItemsZh
    }
    return desktopDownloadItems.map((item) => ({
      ...item,
      displayName: localizeString(item.name),
      version: localizeString(item.version),
      desc: localizeString(item.desc),
      cta: localizeString(item.cta),
    }))
  }, [isZhCnContent, localizeString])
  const localizedMobileDownloadItems = useMemo(() => {
    if (isZhCnContent) {
      return mobileDownloadItemsZh
    }
    return mobileDownloadItems.map((item) => ({
      ...item,
      displayName: localizeString(item.name),
      version: localizeString(item.version),
      desc: localizeString(item.desc),
      cta: localizeString(item.cta),
    }))
  }, [isZhCnContent, localizeString])
  const localizedToolkitItems = useMemo(() => {
    if (isZhCnContent) {
      return toolkitItemsZh
    }
    return toolkitItems.map((item) => ({
      ...item,
      displayName: localizeString(item.name),
      name: localizeString(item.name),
      desc: localizeString(item.desc),
      cta: localizeString(item.cta),
    }))
  }, [isZhCnContent, localizeString])
  const localizedDownloadFaqs = useMemo(() => {
    if (isZhCnContent) {
      return downloadFaqsZh
    }
    return downloadFaqs.map((item) => ({
      ...item,
      q: localizeString(item.q),
      a: localizeString(item.a),
    }))
  }, [isZhCnContent, localizeString])
  const guideCategoryTabs = useMemo(
    () =>
      guideCategoryTabDefinitions.map((tab) => ({
        id: tab.id,
        label:
          tab.id === 'all'
            ? uiText.guides.allGuides
            : isZhCnContent
              ? tab.labelZh
              : localizeString(tab.labelEn),
      })),
    [isZhCnContent, localizeString, uiText.guides.allGuides],
  )
  const localizedGuideItems = useMemo(() => {
    if (isZhCnContent) {
      return guideItemsZh
    }
    return guideItems.map((item) => ({
      ...item,
      title: localizeString(item.title),
      desc: localizeString(item.desc),
      readTime: localizeString(item.readTime),
    }))
  }, [isZhCnContent, localizeString])
  const localizedBlogCategoryFilters = useMemo(() => {
    const filters = blogCategoryFiltersByLanguage[contentLanguage] ?? blogCategoryFiltersByLanguage.en
    return filters.map((tab) => ({ ...tab }))
  }, [contentLanguage])
  const localizedAnswersHowToItems = useMemo(() => {
    if (isZhCnContent) {
      return answersHowToItemsZh
    }
    return answersHowToItems.map((item) => ({
      ...item,
      title: localizeString(item.title),
      desc: localizeString(item.desc),
    }))
  }, [isZhCnContent, localizeString])
  const localizedAnswersCommunityCards = useMemo(() => {
    if (isZhCnContent) {
      return answersCommunityCardsZh
    }
    return answersCommunityCards.map((item) => ({
      ...item,
      title: localizeString(item.title),
      desc: localizeString(item.desc),
    }))
  }, [isZhCnContent, localizeString])
  const localizedAnswersHotCategories = useMemo(() => {
    if (isZhCnContent) {
      return answersHotCategories.map((item) => ({
        ...item,
        ...(answersHotCategoryZhTextByTitle[item.title] ?? {}),
        displayTitle: item.title,
        displayMeta: answersHotCategoryZhTextByTitle[item.title]?.meta ?? item.meta,
      }))
    }
    return answersHotCategories.map((item) => ({
      ...item,
      displayTitle: localizeString(item.title),
      displayMeta: localizeString(item.meta),
      desc: localizeString(item.desc),
    }))
  }, [isZhCnContent, localizeString])
  const localizedTemplateMenuSections = useMemo(
    () =>
      templateMenuSections.map((section) => ({
        ...section,
        displayTitle: localizeString(section.title),
        items: section.items.map((item) => ({
          ...item,
          displayName: localizeString(item.name),
        })),
      })),
    [localizeString],
  )
  const localizedAllProductsSections = useMemo(
    () =>
      allProductsSections.map((section) => ({
        ...section,
        displayTitle: localizeString(section.title),
        items: section.items.map((item) => ({
          ...item,
          displayName: localizeString(item.name),
        })),
      })),
    [localizeString],
  )
  const docsUiTextBase = isZhContent ? (docsUiByLanguage[contentLanguage] ?? docsUiByLanguage.zh) : docsUiByLanguage.en
  const docsUiText = useMemo(
    () => (isZhContent ? docsUiTextBase : localizeNestedStrings(docsUiTextBase, localizeString)),
    [docsUiTextBase, isZhContent, localizeString],
  )
  const localizedDocsContent = useMemo(() => {
    if (isZhCnContent) {
      return {
        quickTabs: docsQuickTabs,
        sectionSlugMap: docsSectionSlugMap,
        catalogSections: docsCatalogSections,
        faqItems: docsFaqItems,
        sectionMarkersMap: docsSectionMarkersMap,
      }
    }

    const sectionLabelMap = Object.fromEntries(
      docsEnglishContent.quickTabs.map((section) => [section, localizeString(section)]),
    )

    return {
      quickTabs: docsEnglishContent.quickTabs.map((section) => sectionLabelMap[section]),
      sectionSlugMap: Object.fromEntries(
        Object.entries(docsEnglishContent.sectionSlugMap).map(([section, slug]) => [
          sectionLabelMap[section] ?? localizeString(section),
          slug,
        ]),
      ),
      catalogSections: docsEnglishContent.catalogSections.map((section) => ({
        ...section,
        title: sectionLabelMap[section.title] ?? localizeString(section.title),
        groups: (section.groups ?? []).map((group) => localizeString(group)),
        blocks: (section.blocks ?? []).map((block) => ({
          title: block.title ? localizeString(block.title) : '',
          items: block.items.map((item) => localizeString(item)),
        })),
      })),
      faqItems: docsEnglishContent.faqItems.map((item) => ({
        ...item,
        title: localizeString(item.title),
        desc: localizeString(item.desc),
      })),
      sectionMarkersMap: Object.fromEntries(
        Object.entries(docsEnglishContent.sectionMarkersMap ?? {}).map(([section, markers]) => [
          sectionLabelMap[section] ?? localizeString(section),
          markers.map((marker) => localizeString(marker)),
        ]),
      ),
    }
  }, [currentLocale, isZhCnContent, localizeString])
  const localizedDocsQuickTabs = localizedDocsContent.quickTabs
  const localizedDocsSectionSlugMap = localizedDocsContent.sectionSlugMap
  const localizedDocsCatalogSections = localizedDocsContent.catalogSections
  const localizedDocsSectionMarkersMap = localizedDocsContent.sectionMarkersMap ?? {}
  const localizedDocsSlugSectionMap = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(localizedDocsSectionSlugMap).map(([section, slug]) => [slug, section]),
      ),
    [localizedDocsSectionSlugMap],
  )
  const activeDocsSection = useMemo(() => {
    const { normalizedSegments } = splitPath(currentPathname)
    if (normalizedSegments[0] !== 'docs') {
      return localizedDocsQuickTabs[0]
    }
    return localizedDocsSlugSectionMap[normalizedSegments[1]] ?? localizedDocsQuickTabs[0]
  }, [currentPathname, localizedDocsQuickTabs, localizedDocsSlugSectionMap])
  const answersUiTextBase = isZhCnContent ? answersUiByLanguage.zh : answersUiByLanguage.en
  const answersUiText = useMemo(
    () => (isZhCnContent ? answersUiTextBase : localizeNestedStrings(answersUiTextBase, localizeString)),
    [answersUiTextBase, isZhCnContent, localizeString],
  )
  const localizedAnswersForumFilterSectionsBase = useMemo(() => {
    const base = isZhCnContent ? answersForumFilterSections : answersForumFilterSectionsEn
    return isZhCnContent ? base : localizeNestedStrings(base, localizeString)
  }, [isZhCnContent, localizeString])
  const localizedAnswersForumQuestionSeeds = useMemo(() => {
    const base = isZhCnContent ? answersForumQuestionItems : answersForumQuestionItemsEn
    return isZhCnContent ? base : localizeNestedStrings(base, localizeString)
  }, [isZhCnContent, localizeString])
  const localizedAnswersForumTemplates = useMemo(() => {
    const base = isZhCnContent
      ? answersForumTemplatesByLanguage.zh
      : answersForumTemplatesByLanguage.en
    return isZhCnContent ? base : localizeNestedStrings(base, localizeString)
  }, [isZhCnContent, localizeString])

  const allTemplatesSections = useMemo(
    () =>
      localizedTemplateMenuSections.map((section) => ({
        ...section,
        items: section.items.map((item) => ({
          ...item,
          targetPath: resolveTemplateTargetPath(item.path, currentLocale),
        })),
      })),
    [currentLocale, localizedTemplateMenuSections],
  )

  const allTemplatesAlphabetGroups = useMemo(() => {
    const deduped = new Map()
    localizedTemplateMenuSections.forEach((section) => {
      section.items.forEach((item) => {
        if (!deduped.has(item.name)) {
          deduped.set(item.name, item)
        }
      })
    })

    const groups = new Map()
    deduped.forEach((item) => {
      const firstChar = item.name.trim().charAt(0).toUpperCase()
      const letter = /^[A-Z]$/.test(firstChar) ? firstChar : '#'
      if (!groups.has(letter)) {
        groups.set(letter, [])
      }
      groups.get(letter).push({
        ...item,
        targetPath: resolveTemplateTargetPath(item.path, currentLocale),
      })
    })

    return Array.from(groups.entries())
      .sort(([a], [b]) => {
        if (a === '#') return 1
        if (b === '#') return -1
        return a.localeCompare(b)
      })
      .map(([letter, items]) => ({
        letter,
        items: items.sort((a, b) =>
          a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }),
        ),
      }))
  }, [currentLocale, localizedTemplateMenuSections])

  const homeProductCards = useMemo(
    () => {
      const sectionMap = new Map(localizedAllProductsSections.map((section) => [section.title, section]))
      return localizedProducts.map((productItem) => {
        const matchedSection = sectionMap.get(productItem.name)
        const firstToolPath = matchedSection?.items?.[0]?.path
        return {
          ...productItem,
          targetPath: firstToolPath
            ? joinPath(currentUrlLocale, firstToolPath)
            : getLocaleAllProductsPath(currentLocale),
        }
      })
    },
    [currentLocale, localizedAllProductsSections, localizedProducts],
  )
  const toolDemoByPath = useMemo(() => {
    const colorMap = new Map(localizedProducts.map((item) => [item.name, item.color]))
    const categoryIntroMap = {
      'AI Tools': 'Automate repetitive tasks and accelerate your daily workflow.',
      'AI Writing': 'Generate, rewrite, and polish content with AI assistance.',
      'AI Sheets': 'Analyze data, build formulas, and prepare cleaner reports.',
      'AI Slides': 'Create better presentations with AI-guided visual structure.',
      'PDF Tools': 'Convert, edit, merge, and secure PDF documents quickly.',
    }

    const map = new Map()
    localizedAllProductsSections.forEach((section) => {
      section.items.forEach((item) => {
        const normalized = item.path.split('/').filter(Boolean).join('/')
        map.set(normalized, {
          ...item,
          sectionTitle: section.title,
          sectionDisplayTitle: section.displayTitle ?? section.title,
          accentColor: colorMap.get(section.title) ?? '#534ab7',
          intro:
            localizeString(
              categoryIntroMap[section.title] ?? 'A practical workspace to preview core capabilities.',
            ),
        })
      })
    })
    return map
  }, [localizedAllProductsSections, localizedProducts, localizeString])

  const currentToolDemo = useMemo(() => {
    const { normalizedSegments } = splitPath(currentPathname)
    if (normalizedSegments.length < 2) {
      return null
    }
    const normalizedPath = `${normalizedSegments[0]}/${normalizedSegments[1]}`
    return toolDemoByPath.get(normalizedPath) ?? null
  }, [currentPathname, toolDemoByPath])

  const currentTemplateRoute = useMemo(() => {
    const { normalizedSegments } = splitPath(currentPathname)
    return getTemplateRouteInfo(normalizedSegments)
  }, [currentPathname])

  const templateLibraryPages = useMemo(() => ({
    resume: {
      title: localizeString('Resume Templates'),
      subtitle: uiText.templates.libraryDesc,
      filters: ['All', 'Professional', 'Creative', 'Simple', 'Modern', 'ATS-Friendly'],
      cards: [
        { name: 'Modern Professional', meta: `1 ${uiText.templates.pages} · ${uiText.templates.free}` },
        { name: 'Minimal Clean', meta: `1 ${uiText.templates.pages} · ${uiText.templates.free}` },
        { name: 'Creative Bold', meta: `1 ${uiText.templates.pages} · ${uiText.templates.free}` },
        { name: 'Executive', meta: `2 ${uiText.templates.pages} · ${uiText.templates.free}` },
        { name: 'Tech Focused', meta: `1 ${uiText.templates.pages} · ${uiText.templates.free}` },
        { name: 'Elegant', meta: `1 ${uiText.templates.pages} · ${uiText.templates.free}` },
        { name: 'Fresh Graduate', meta: `1 ${uiText.templates.pages} · ${uiText.templates.free}` },
        { name: 'Sidebar Dark', meta: `1 ${uiText.templates.pages} · ${uiText.templates.free}` },
        { name: 'Academic CV', meta: `2 ${uiText.templates.pages} · ${uiText.templates.free}` },
        { name: 'Infographic', meta: `1 ${uiText.templates.pages} · ${uiText.templates.free}` },
        { name: 'Two Column', meta: `1 ${uiText.templates.pages} · ${uiText.templates.free}` },
        { name: 'Timeline', meta: `1 ${uiText.templates.pages} · ${uiText.templates.free}` },
      ],
    },
    presentation: {
      title: localizeString('Presentation Templates'),
      subtitle: uiText.templates.libraryDesc,
      filters: ['All', 'Business', 'Education', 'Creative', 'Minimal', 'Pitch Deck'],
      cards: [
        { name: 'Startup Pitch Deck', meta: `20 ${uiText.templates.slides} · ${uiText.templates.free}` },
        { name: 'Business Plan', meta: `16 ${uiText.templates.slides} · ${uiText.templates.free}` },
        { name: 'Minimal Corporate', meta: `12 ${uiText.templates.slides} · ${uiText.templates.free}` },
        { name: 'Education & Training', meta: `14 ${uiText.templates.slides} · ${uiText.templates.free}` },
        { name: 'Creative Bold', meta: `18 ${uiText.templates.slides} · ${uiText.templates.free}` },
        { name: 'Annual Report', meta: `24 ${uiText.templates.slides} · ${uiText.templates.free}` },
        { name: 'Product Launch', meta: `15 ${uiText.templates.slides} · ${uiText.templates.free}` },
        { name: 'Marketing Strategy', meta: `18 ${uiText.templates.slides} · ${uiText.templates.free}` },
        { name: 'Portfolio', meta: `12 ${uiText.templates.slides} · ${uiText.templates.free}` },
        { name: 'Science & Research', meta: `16 ${uiText.templates.slides} · ${uiText.templates.free}` },
        { name: 'Dark Modern', meta: `14 ${uiText.templates.slides} · ${uiText.templates.free}` },
        { name: 'Infographic Deck', meta: `10 ${uiText.templates.slides} · ${uiText.templates.free}` },
      ],
    },
    excel: {
      title: localizeString('Excel Templates'),
      subtitle: uiText.templates.libraryDesc,
      filters: ['All', 'Finance', 'Project', 'Sales', 'Education', 'Operations'],
      cards: [
        { name: 'Monthly Budget Tracker', meta: `1 ${uiText.templates.sheet} · ${uiText.templates.free}` },
        { name: 'Invoice Template', meta: `1 ${uiText.templates.sheet} · ${uiText.templates.free}` },
        { name: 'Sales Dashboard', meta: `3 ${uiText.templates.sheets} · ${uiText.templates.free}` },
        { name: 'Project Timeline', meta: `2 ${uiText.templates.sheets} · ${uiText.templates.free}` },
        { name: 'Expense Reimbursement', meta: `1 ${uiText.templates.sheet} · ${uiText.templates.free}` },
        { name: 'Attendance Sheet', meta: `1 ${uiText.templates.sheet} · ${uiText.templates.free}` },
        { name: 'Inventory Control', meta: `2 ${uiText.templates.sheets} · ${uiText.templates.free}` },
        { name: 'Profit & Loss Statement', meta: `1 ${uiText.templates.sheet} · ${uiText.templates.free}` },
        { name: 'Order Tracker', meta: `1 ${uiText.templates.sheet} · ${uiText.templates.free}` },
        { name: 'Class Gradebook', meta: `2 ${uiText.templates.sheets} · ${uiText.templates.free}` },
        { name: 'Content Calendar', meta: `1 ${uiText.templates.sheet} · ${uiText.templates.free}` },
        { name: 'KPI Performance Report', meta: `2 ${uiText.templates.sheets} · ${uiText.templates.free}` },
      ],
    },
  }), [localizeString, uiText])

  const templateLibraryData = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(templateLibraryPages).map(([key, page]) => [
          key,
          {
            ...page,
            cards: page.cards.map((card, index) => {
              const fallbackTag =
                page.filters[1 + (index % Math.max(1, page.filters.length - 1))] ?? 'All'
              return {
                ...card,
                tags: card.tags ?? [fallbackTag],
                displayName: localizeString(card.name),
                displayMeta: localizeString(card.meta ?? ''),
                slug:
                  card.slug ??
                  card.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-+|-+$/g, ''),
              }
            }),
          },
        ]),
      ),
    [localizeString, templateLibraryPages],
  )

  const currentGuideRoute = useMemo(() => {
    const { normalizedSegments } = splitPath(currentPathname)
    return getGuideRouteInfo(normalizedSegments)
  }, [currentPathname])

  const currentGuide = useMemo(() => {
    if (currentGuideRoute?.kind !== 'detail' || !currentGuideRoute.slug) {
      return null
    }
    return localizedGuideItems.find((item) => item.slug === currentGuideRoute.slug) ?? null
  }, [currentGuideRoute, localizedGuideItems])

  const currentBlogRoute = useMemo(() => {
    const { normalizedSegments } = splitPath(currentPathname)
    return getBlogRouteInfo(normalizedSegments)
  }, [currentPathname])
  const localizedBlogPosts = useMemo(
    () =>
      resolveBlogPostsForLanguage(contentLanguage, localizeString).map((post) => ({
        ...post,
        imageAlt: post.imageAlt ?? post.title,
        readTime: post.readTime ?? '5 min read',
        tags: [...(post.tags ?? [])],
        body: [...(post.body ?? [])],
      })),
    [contentLanguage, localizeString],
  )

  const currentBlogPost = useMemo(() => {
    if (currentBlogRoute?.kind !== 'detail' || !currentBlogRoute.slug) {
      return null
    }
    return localizedBlogPosts.find((post) => post.slug === currentBlogRoute.slug) ?? null
  }, [currentBlogRoute, localizedBlogPosts])

  const filteredBlogPosts = useMemo(() => {
    const query = blogSearchQuery.trim().toLowerCase()
    return localizedBlogPosts.filter((post) => {
      if (activeBlogCategory !== 'all' && post.category !== activeBlogCategory) {
        return false
      }
      if (activeBlogAuthor && post.authorName !== activeBlogAuthor) {
        return false
      }
      if (!query) {
        return true
      }
      const haystack = [
        post.title,
        post.excerpt,
        post.authorName,
        post.authorRole,
        ...(post.tags ?? []),
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(query)
    })
  }, [activeBlogAuthor, activeBlogCategory, blogSearchQuery, localizedBlogPosts])

  const featuredFilteredBlogPosts = useMemo(
    () => filteredBlogPosts.filter((post) => post.featured),
    [filteredBlogPosts],
  )

  const showFeaturedBlogSection =
    activeBlogCategory === 'all' && !activeBlogAuthor && !blogSearchQuery.trim()

  const blogFeedPosts = useMemo(() => {
    if (showFeaturedBlogSection && featuredFilteredBlogPosts.length) {
      return filteredBlogPosts.filter((post) => !post.featured)
    }
    return filteredBlogPosts
  }, [featuredFilteredBlogPosts.length, filteredBlogPosts, showFeaturedBlogSection])

  const blogPrimaryPosts = useMemo(() => {
    if (showFeaturedBlogSection && featuredFilteredBlogPosts.length) {
      return featuredFilteredBlogPosts
    }
    return blogFeedPosts
  }, [blogFeedPosts, featuredFilteredBlogPosts, showFeaturedBlogSection])

  const blogCategoryLabelMap = useMemo(
    () =>
      Object.fromEntries(
        localizedBlogCategoryFilters
          .filter((tab) => tab.id !== 'all')
          .map((tab) => [tab.id, tab.label]),
      ),
    [localizedBlogCategoryFilters],
  )

  const blogSecondaryPosts =
    showFeaturedBlogSection && featuredFilteredBlogPosts.length ? blogFeedPosts : []

  const activeBlogCategoryLabel =
    activeBlogCategory !== 'all'
      ? localizedBlogCategoryFilters.find((tab) => tab.id === activeBlogCategory)?.label
      : null

  const blogPrimaryTitle =
    showFeaturedBlogSection && featuredFilteredBlogPosts.length
      ? uiText.blog.featured
      : activeBlogCategoryLabel ?? uiText.blog.moreNews

  const blogIsEmpty =
    (showFeaturedBlogSection ? featuredFilteredBlogPosts.length : 0) + blogFeedPosts.length === 0

  const blogOverlayRelatedPosts = useMemo(() => {
    if (!currentBlogPost) {
      return []
    }
    return localizedBlogPosts
      .filter(
        (post) =>
          post.slug !== currentBlogPost.slug &&
          (post.category === currentBlogPost.category ||
            post.authorName === currentBlogPost.authorName),
      )
      .slice(0, 3)
  }, [currentBlogPost, localizedBlogPosts])

  const currentTemplateLibrary = useMemo(() => {
    const key = currentTemplateRoute?.key
    return key ? templateLibraryData[key] ?? null : null
  }, [currentTemplateRoute, templateLibraryData])

  const filteredTemplateCards = useMemo(() => {
    if (!currentTemplateLibrary) {
      return []
    }
    if (activeTemplateFilter === 'All') {
      return currentTemplateLibrary.cards
    }
    return currentTemplateLibrary.cards.filter((card) =>
      (card.tags ?? []).includes(activeTemplateFilter),
    )
  }, [currentTemplateLibrary, activeTemplateFilter])

  const currentTemplateDetail = useMemo(() => {
    if (currentTemplateRoute?.kind !== 'detail' || !currentTemplateRoute.key) {
      return null
    }
    const library = templateLibraryData[currentTemplateRoute.key]
    if (!library) {
      return null
    }
    return (
      library.cards.find((item) => item.slug === currentTemplateRoute.slug) ?? {
        name: (currentTemplateRoute.slug ?? 'Template')
          .split('-')
          .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
          .join(' '),
        displayName: localizeString(
          (currentTemplateRoute.slug ?? 'Template')
            .split('-')
            .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
            .join(' '),
        ),
        meta: '1 page · Free',
        displayMeta: localizeString('1 page · Free'),
        slug: currentTemplateRoute.slug,
      }
    )
  }, [currentTemplateRoute, templateLibraryData, localizeString])

  useEffect(() => {
    if (currentTemplateRoute?.kind === 'library') {
      setActiveTemplateFilter('All')
    }
  }, [currentTemplateRoute?.kind, currentTemplateRoute?.key])

  useEffect(() => {
    if (currentBlogRoute?.kind === 'index') {
      return
    }
    setActiveBlogCategory('all')
    setActiveBlogAuthor('')
    setBlogSearchQuery('')
  }, [currentBlogRoute?.kind])

  useEffect(() => {
    if (!isBlogShareCopied) {
      return
    }
    const timerId = window.setTimeout(() => {
      setIsBlogShareCopied(false)
    }, 2000)
    return () => window.clearTimeout(timerId)
  }, [isBlogShareCopied])

  const handleLocaleSelect = (targetLocale) => {
    const localizedPath = buildLocalizedPath(targetLocale, currentPathname)
    const nextUrl = new URL(localizedPath, window.location.origin)
    const canonicalPathname =
      getCanonicalLocalizedPath(nextUrl.pathname, targetLocale)
      ?? ensureTrailingSlash(nextUrl.pathname)
    const nextPath = `${canonicalPathname}${nextUrl.search}${nextUrl.hash}`
    window.history.pushState({}, '', nextPath)
    window.scrollTo({ top: 0, left: 0 })
    setCurrentPathname(canonicalPathname)
    setCurrentLocale(resolveLocaleFromPath(canonicalPathname))
    setIsLangOpen(false)
    setIsProductsMenuOpen(false)
    setIsWpsFeaturesMenuOpen(false)
    setIsTemplatesMenuOpen(false)
    setIsOverflowMenuOpen(false)
    setIsMobileMenuOpen(false)
  }

  const navigateTo = (targetPath, options = {}) => {
    const { scrollToTop = true } = options
    const targetUrl = new URL(targetPath, window.location.origin)
    const fallbackLocale = resolveLocaleFromPath(targetUrl.pathname)
    const canonicalPathname =
      getCanonicalLocalizedPath(targetUrl.pathname, fallbackLocale)
      ?? ensureTrailingSlash(targetUrl.pathname)
    const canonicalTargetPath = `${canonicalPathname}${targetUrl.search}${targetUrl.hash}`
    const currentFullPath = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (canonicalTargetPath === currentFullPath) {
      if (scrollToTop) {
        window.scrollTo({ top: 0, left: 0 })
      }
      setIsLangOpen(false)
      setIsProductsMenuOpen(false)
      setIsWpsFeaturesMenuOpen(false)
      setIsTemplatesMenuOpen(false)
      setIsOverflowMenuOpen(false)
      setIsMobileMenuOpen(false)
      return
    }
    window.history.pushState({}, '', canonicalTargetPath)
    if (scrollToTop) {
      window.scrollTo({ top: 0, left: 0 })
    }
    setCurrentPathname(canonicalPathname)
    setCurrentLocale(resolveLocaleFromPath(canonicalPathname))
    setIsLangOpen(false)
    setIsProductsMenuOpen(false)
    setIsWpsFeaturesMenuOpen(false)
    setIsTemplatesMenuOpen(false)
    setIsOverflowMenuOpen(false)
    setIsMobileMenuOpen(false)
  }

  const handleBlogShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url: window.location.href })
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href)
      }
      setIsBlogShareCopied(true)
    } catch {
      // ignore
    }
  }

  const pageType = getPageType(currentPathname)
  const isBlogCenterPage = pageType === 'blog' || pageType === 'blog-detail'
  const isBlogOverlayOpen = pageType === 'blog-detail' && Boolean(currentBlogPost)
  const localeHomePath = getLocaleHomePath(currentLocale)
  const localeDownloadPath = getLocaleDownloadPath(currentLocale)
  const localePricingPath = getLocalePricingPath(currentLocale)
  const localeDocsPath = getLocaleDocsPath(currentLocale)
  const localeBlogPath = getLocaleBlogPath(currentLocale)
  const localeEncyclopediaPath = getLocaleEncyclopediaPath(currentLocale)
  const localeAnswersPath = getLocaleAnswersPath(currentLocale)
  const localeAllProductsPath = getLocaleAllProductsPath(currentLocale)
  const localeAllTemplatesPath = getLocaleAllTemplatesPath(currentLocale)
  const localeAiFeaturesPath = getLocaleAiFeaturesPath(currentLocale)
  const localeLocalePath = getLocaleLocalePath(currentLocale)
  const localeGuidesPath = getLocaleGuidesPath(currentLocale)
  const footerProductLinks = useMemo(
    () =>
      SITE_FOOTER_PRODUCT_LINKS.map((item) => ({
        id: item.id,
        label: uiText.footer.links[item.labelKey],
        href: item.href,
      })),
    [uiText.footer.links],
  )
  const footerCompanyLinks = useMemo(
    () =>
      SITE_FOOTER_COMPANY_LINKS.map((item) => ({
        id: item.id,
        label: uiText.footer.links[item.labelKey],
        href: item.href,
      })),
    [uiText.footer.links],
  )
  const footerSupportLinks = useMemo(
    () =>
      SITE_FOOTER_SUPPORT_LINKS.map((item) => ({
        id: item.id,
        label: uiText.footer.links[item.labelKey],
        href: item.internal === 'docs' ? localeDocsPath : item.href,
        external: !item.internal,
      })),
    [localeDocsPath, uiText.footer.links],
  )
  const footerSocialItems = SITE_FOOTER_SOCIAL_LINKS
  const { normalizedSegments: currentSegments } = splitPath(currentPathname)
  const currentContentRoot = currentSegments[0] ?? ''
  const isResourcesNavActive = useMemo(
    () => currentContentRoot === 'docs',
    [currentContentRoot],
  )
  const desktopOverflowMenuAriaLabel = isZhContent ? '更多导航' : localizeString('More navigation')
  const mobileMenuButtonAriaLabel = isMobileMenuOpen ? uiText.nav.closeMenu : uiText.nav.menu
  const desktopMainNavItems = useMemo(
    () => [
      {
        key: 'wps-features',
        type: 'wps-features',
        label: uiText.nav.wpsFeatures,
        path: localeAiFeaturesPath,
        isCurrent: pageType === 'ai-features',
      },
      {
        key: 'products',
        type: 'products',
        label: uiText.nav.freeAiTools,
        // Matches wps.ai: Free AI Tools trigger opens the panel; it is not a route.
        path: '#free-ai-tools',
        isCurrent: false,
      },
      {
        key: 'docs',
        type: 'link',
        label: uiText.nav.docsCenter,
        path: localeDocsPath,
        isCurrent: isResourcesNavActive,
      },
      {
        key: 'blog',
        type: 'external',
        label: uiText.nav.blog,
        path: 'https://www.wps.ai/blog/',
        isCurrent: false,
      },
    ],
    [
      isResourcesNavActive,
      localeAiFeaturesPath,
      localeDocsPath,
      pageType,
      uiText.nav.blog,
      uiText.nav.docsCenter,
      uiText.nav.freeAiTools,
      uiText.nav.wpsFeatures,
    ],
  )
  const visibleDesktopNavItems = isCompactNav
    ? []
    : desktopMainNavItems.slice(0, visibleDesktopNavCount)
  const overflowDesktopNavItems = isCompactNav
    ? []
    : desktopMainNavItems.slice(visibleDesktopNavCount)
  const isDesktopNavOverflowActive = overflowDesktopNavItems.some((item) => item.isCurrent)

  useLayoutEffect(() => {
    const innerNode = headerInnerRef.current
    const brandNode = headerBrandRef.current
    const measureNode = desktopNavMeasureRef.current
    if (!innerNode || !brandNode || !measureNode) {
      return undefined
    }

    const readMeasuredWidth = (key) =>
      measureNode.querySelector(`[data-nav-measure="${key}"]`)?.getBoundingClientRect().width ?? 0

    let frameId = 0
    const calculateCompactNav = () => {
      const brandWidth = brandNode.getBoundingClientRect().width
      const measuredActionsWidth = readMeasuredWidth('desktop-actions')
      if (measuredActionsWidth > 0) {
        desktopActionsWidthRef.current = measuredActionsWidth
      }

      const navWidths = desktopMainNavItems.map((item) =>
        readMeasuredWidth(`desktop-nav-${item.key}`),
      )
      const gapWidth = 2
      const innerGap = 24
      const fullNavWidth =
        navWidths.reduce((sum, width) => sum + width, 0)
        + Math.max(0, desktopMainNavItems.length - 1) * gapWidth
      const actionsWidth = desktopActionsWidthRef.current
      const availableForNav =
        innerNode.clientWidth - brandWidth - actionsWidth - innerGap * 2
      const mediaCompact = window.matchMedia('(max-width: 719.98px)').matches
      const nextCompact =
        mediaCompact
        || availableForNav < 8
        || fullNavWidth > availableForNav - 8

      setIsCompactNav((prev) => (prev === nextCompact ? prev : nextCompact))
      const nextVisibleCount = nextCompact ? 0 : desktopMainNavItems.length
      setVisibleDesktopNavCount((prev) => (prev === nextVisibleCount ? prev : nextVisibleCount))
      if (nextCompact) {
        setIsOverflowMenuOpen(false)
      }
    }

    const scheduleMeasurement = () => {
      window.cancelAnimationFrame(frameId)
      frameId = window.requestAnimationFrame(calculateCompactNav)
    }

    scheduleMeasurement()

    const resizeObserver =
      typeof ResizeObserver === 'function' ? new ResizeObserver(scheduleMeasurement) : null
    resizeObserver?.observe(innerNode)
    resizeObserver?.observe(brandNode)
    resizeObserver?.observe(measureNode)
    window.addEventListener('resize', scheduleMeasurement)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      window.removeEventListener('resize', scheduleMeasurement)
    }
  }, [desktopMainNavItems])

  useEffect(() => {
    if (isCompactNav) {
      setIsProductsMenuOpen(false)
      setIsWpsFeaturesMenuOpen(false)
      setIsTemplatesMenuOpen(false)
      setIsOverflowMenuOpen(false)
      return
    }
    setIsMobileMenuOpen(false)
    setMobileNavExpandedKey(null)
  }, [isCompactNav])

  const encyclopediaLocale = resolveEncyclopediaLocale(currentLocale)
  const encyclopediaUiBase =
    encyclopediaUiTextByLocale[encyclopediaLocale] ?? encyclopediaUiTextByLocale.en
  const encyclopediaUiText = useMemo(
    () => {
      const fallback = encyclopediaLocale === 'zh'
        ? {
            allTopics: '全部词条',
            categorySidebar: '分类',
            featuredTitle: '推荐词条',
            topicListTitle: '全部内容',
            openTopic: '查看详情',
            quickActions: '快捷入口',
            browseAnswers: '查看问答',
            continueLearning: '继续了解',
          }
        : {
            allTopics: 'All Topics',
            categorySidebar: 'Categories',
            featuredTitle: 'Featured topics',
            topicListTitle: 'All topics',
            openTopic: 'Open topic',
            quickActions: 'Quick actions',
            browseAnswers: 'Browse Q&A',
            continueLearning: 'Continue learning',
          }
      return {
        ...fallback,
        ...(encyclopediaLocale === 'zh' ? encyclopediaUiBase : localizeNestedStrings(encyclopediaUiBase, localizeString)),
      }
    },
    [encyclopediaLocale, encyclopediaUiBase, localizeString],
  )
  const encyclopediaEntries = useMemo(
    () =>
      resolveEncyclopediaEntriesForLocale(encyclopediaLocale, localizeString).map((entry) => {
        const category = encyclopediaCategoryBySlug[entry.slug] ?? 'overview'
        const docsPath = entry.docsSlug ? joinPath(localeDocsPath, entry.docsSlug) : localeDocsPath
        return {
          ...entry,
          category,
          image: encyclopediaCategoryImageMap[category] ?? encyclopediaCategoryImageMap.overview,
          docsPath,
        }
      }),
    [encyclopediaLocale, localizeString, localeDocsPath],
  )
  const encyclopediaCategoryTabs = useMemo(
    () =>
      encyclopediaCategoryDefinitions.map((tab) => ({
        ...tab,
        label:
          tab.id === 'all'
            ? encyclopediaUiText.allTopics
            : encyclopediaLocale === 'zh'
              ? tab.labelZh ?? tab.labelKey
              : encyclopediaLocale === 'ja'
                ? tab.labelJa ?? tab.labelKey
                : encyclopediaLocale === 'ko'
                  ? tab.labelKo ?? tab.labelKey
                  : encyclopediaLocale === 'zh-tw'
                    ? tab.labelZh ?? tab.labelKey
                    : localizeString(tab.labelKey),
      })),
    [encyclopediaLocale, encyclopediaUiText.allTopics, localizeString],
  )
  const encyclopediaCategoryLabelMap = useMemo(
    () => Object.fromEntries(encyclopediaCategoryTabs.map((tab) => [tab.id, tab.label])),
    [encyclopediaCategoryTabs],
  )
  const normalizedEncyclopediaQuery = encyclopediaSearchQuery.trim().toLowerCase()
  const searchedEncyclopediaEntries = useMemo(() => {
    if (!normalizedEncyclopediaQuery) {
      return encyclopediaEntries
    }
    return encyclopediaEntries.filter((entry) =>
      entry.title.toLowerCase().includes(normalizedEncyclopediaQuery)
      || entry.summary.toLowerCase().includes(normalizedEncyclopediaQuery)
      || (entry.body ?? []).some((paragraph) =>
        paragraph.toLowerCase().includes(normalizedEncyclopediaQuery),
      ),
    )
  }, [encyclopediaEntries, normalizedEncyclopediaQuery])
  const filteredEncyclopediaEntries = useMemo(() => {
    if (activeEncyclopediaCategory === 'all') {
      return searchedEncyclopediaEntries
    }
    return searchedEncyclopediaEntries.filter((entry) => entry.category === activeEncyclopediaCategory)
  }, [activeEncyclopediaCategory, searchedEncyclopediaEntries])
  const featuredEncyclopediaEntries = useMemo(
    () => filteredEncyclopediaEntries.slice(0, 3),
    [filteredEncyclopediaEntries],
  )
  const encyclopediaSlugFromRoute = useMemo(() => {
    if (currentSegments[0] !== 'encyclopedia' && currentSegments[0] !== 'academy') {
      return ''
    }
    const maybeSlug = currentSegments[1] ?? ''
    if (!maybeSlug || maybeSlug === 'index.html') {
      return ''
    }
    return maybeSlug.replace(/\.html$/i, '')
  }, [currentSegments])
  const currentEncyclopediaEntry = useMemo(
    () => encyclopediaEntries.find((entry) => entry.slug === encyclopediaSlugFromRoute) ?? null,
    [encyclopediaEntries, encyclopediaSlugFromRoute],
  )
  const currentEncyclopediaRelatedEntries = useMemo(() => {
    if (!currentEncyclopediaEntry) {
      return []
    }
    return (currentEncyclopediaEntry.related ?? [])
      .map((slug) => encyclopediaEntries.find((entry) => entry.slug === slug))
      .filter(Boolean)
      .slice(0, 4)
  }, [currentEncyclopediaEntry, encyclopediaEntries])
  const isEncyclopediaOverlayOpen = pageType === 'encyclopedia' && Boolean(currentEncyclopediaEntry)

  useEffect(() => {
    document.body.style.overflow =
      isBlogOverlayOpen || isEncyclopediaOverlayOpen || isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isBlogOverlayOpen, isEncyclopediaOverlayOpen, isMobileMenuOpen])

  const pricingPlans = useMemo(() => {
    if (isZhContent) {
      return pricingPlansZh
    }
    return pricingPlansEn.map((plan) => ({
      ...plan,
      name: localizeString(plan.name),
      period: localizeString(plan.period),
      features: plan.features.map((feature) => localizeString(feature)),
      cta: localizeString(plan.cta),
    }))
  }, [isZhContent, localizeString])


  const answersCategories = useMemo(
    () => localizedAnswersHotCategories.map((item, index) => ({
      ...item,
      slug: toTopicSlug(item.title),
      rank: index,
    })),
    [localizedAnswersHotCategories],
  )
  const answersCategoryBySlug = useMemo(
    () => new Map(answersCategories.map((item) => [item.slug, item])),
    [answersCategories],
  )
  const defaultAnswersForumCategory = answersCategories[0] ?? {
    title: 'WPS Writer',
    meta: 'Document Editing',
    desc: '',
    icon: 'Wr',
    accent: 'bg-[#4f46e5]',
    slug: 'wps-writer',
    rank: 0,
  }
  const activeAnswersForumCategory = useMemo(() => {
    const { normalizedSegments } = splitPath(currentPathname)
    if (normalizedSegments[0] !== 'answers' || normalizedSegments[1] !== 'forum') {
      return defaultAnswersForumCategory
    }
    const topicSlug = normalizedSegments[2]
    if (!topicSlug) {
      return defaultAnswersForumCategory
    }
    return answersCategoryBySlug.get(topicSlug) ?? defaultAnswersForumCategory
  }, [answersCategoryBySlug, currentPathname, defaultAnswersForumCategory])
  const activeAnswersForumCategoryDisplayTitle =
    activeAnswersForumCategory.displayTitle ?? activeAnswersForumCategory.title
  const activeAnswersForumCategoryDisplayMeta =
    activeAnswersForumCategory.displayMeta ?? activeAnswersForumCategory.meta
  const activeAnswersForumFilterSections = useMemo(() => {
    const formatCount = (value) => {
      if (value >= 1000) {
        const nextValue = (value / 1000).toFixed(value % 1000 === 0 ? 0 : 1)
        return `${nextValue}K`
      }
      return `${value}`
    }

    const total = 1500 + activeAnswersForumCategory.rank * 37
    const noAnswer = Math.max(120, Math.floor(total * 0.25))
    const hasAnswer = Math.max(360, total - noAnswer)
    const noAnswerOrComments = Math.max(96, Math.floor(total * 0.17))
    const acceptedAnswer = Math.max(72, Math.floor(hasAnswer * 0.58))
    const recommendedAnswer = Math.max(8, Math.floor(hasAnswer * 0.11))
    const countMap = new Map([
      ['all', total],
      ['no-answer', noAnswer],
      ['has-answer', hasAnswer],
      ['no-answer-or-comments', noAnswerOrComments],
      ['accepted-answer', acceptedAnswer],
      ['recommended-answer', recommendedAnswer],
    ])

    return localizedAnswersForumFilterSectionsBase.map((section) => ({
      ...section,
      options: section.options.map((option) => ({
        ...option,
        count: formatCount(countMap.get(option.key) ?? 0),
      })),
    }))
  }, [activeAnswersForumCategory, localizedAnswersForumFilterSectionsBase])
  const activeAnswersForumQuestionItems = useMemo(() => {
    const { titleTemplates, excerptTemplates, topicTags } = localizedAnswersForumTemplates
    const titleConnector = isZhContent ? '：' : ': '
    return localizedAnswersForumQuestionSeeds.map((seed, index) => ({
      ...seed,
      title: `${activeAnswersForumCategoryDisplayTitle}${titleConnector}${titleTemplates[index % titleTemplates.length]}`,
      excerpt: excerptTemplates[index % excerptTemplates.length].replace(
        /\{topic\}/g,
        activeAnswersForumCategoryDisplayTitle,
      ),
      topic: `${activeAnswersForumCategoryDisplayTitle} · ${topicTags[index % topicTags.length]}`,
    }))
  }, [
    activeAnswersForumCategoryDisplayTitle,
    isZhContent,
    localizedAnswersForumQuestionSeeds,
    localizedAnswersForumTemplates,
  ])
  const activeAnswersForumTotalCount = activeAnswersForumFilterSections[0]?.options[0]?.count ?? '0'
  const answersForumSummaryText = isZhContent
    ? `${activeAnswersForumTotalCount}${answersUiText.forumSummaryMiddle}${activeAnswersForumCategoryDisplayTitle}相关`
    : `${activeAnswersForumTotalCount} ${answersUiText.forumSummaryMiddle} ${activeAnswersForumCategoryDisplayTitle}`
  const answersForumIntroText = isZhContent
    ? `${answersUiText.forumIntroPrefix}${activeAnswersForumCategoryDisplayMeta}${answersUiText.forumIntroConnector}${activeAnswersForumCategoryDisplayTitle}${answersUiText.forumIntroSuffix}`
    : `${answersUiText.forumIntroPrefix} ${activeAnswersForumCategoryDisplayMeta}${answersUiText.forumIntroConnector} ${activeAnswersForumCategoryDisplayTitle} ${answersUiText.forumIntroSuffix}`
  const filteredLocalizedGuides = localizedGuideItems.filter(
    (item) => activeGuideCategory === 'all' || item.category === activeGuideCategory,
  )
  const renderDesktopMainNavItem = (item) => {
    if (item.type === 'wps-features') {
      return (
        <div
          key={item.key}
          className="relative flex h-full shrink-0 items-center"
          onMouseEnter={() => openDesktopMenu('wps-features')}
          onMouseLeave={() => scheduleDesktopMenuClose('wps-features')}
        >
          <a
            className={`home-page-header-link flex h-full items-center whitespace-nowrap border-x border-transparent px-[14px] text-[14px] font-medium transition ${
              item.isCurrent
                ? 'home-page-header-link--active'
                : isWpsFeaturesMenuOpen
                  ? 'home-page-header-link--open'
                  : 'home-page-header-link--idle'
            }`}
            href={item.path}
            onClick={(event) => {
              event.preventDefault()
              navigateTo(item.path)
            }}
          >
            {item.label}
            <span
              className={`ml-1 inline-flex h-4 w-4 items-center justify-center transition ${
                isWpsFeaturesMenuOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            >
              <svg
                className="h-[10px] w-[10px]"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M1.5 3.25L5 6.75L8.5 3.25"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>

          {isWpsFeaturesMenuOpen && (
            <div
              className="fixed inset-x-0 top-[59px] z-[100] home-nav-mega-panel"
              onMouseEnter={() => openDesktopMenu('wps-features')}
              onMouseLeave={() => scheduleDesktopMenuClose('wps-features')}
            >
              <div className="mx-auto w-full max-w-[1200px]">
                <div className="home-nav-wps-features-mega home-nav-mega-grid grid w-full">
                  {wpsFeaturesHeaderMegaMenu.groups.map((group) => (
                    <section
                      key={group.id}
                      className="home-nav-wps-features-mega-column home-nav-mega-card min-w-0"
                    >
                      <div className="flex items-center gap-2">
                        {group.iconSrc ? (
                          <img
                            className="h-4 w-4 shrink-0"
                            src={group.iconSrc}
                            alt=""
                            draggable={false}
                            decoding="async"
                          />
                        ) : null}
                        <h4 className="text-[13px] font-semibold text-[#261f38]">{group.title}</h4>
                      </div>
                      <div className="mt-2.5 flex flex-col gap-0.5">
                        {group.items.map((linkItem) => (
                          <a
                            key={linkItem.id}
                            href={linkItem.url}
                            className="home-nav-mega-link truncate text-[13px]"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsWpsFeaturesMenuOpen(false)}
                          >
                            {linkItem.label}
                          </a>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
                <div className="flex justify-end px-[18px] pb-4">
                  <a
                    href={item.path}
                    className="home-nav-mega-cta inline-flex text-[12.5px] font-semibold"
                    onClick={(event) => {
                      event.preventDefault()
                      navigateTo(item.path)
                    }}
                  >
                    {uiText.nav.seeAllFeatures}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    if (item.type === 'products') {
      return (
        <div
          key={item.key}
          className="relative flex h-full shrink-0 items-center"
          onMouseEnter={() => openDesktopMenu('products')}
          onMouseLeave={() => scheduleDesktopMenuClose('products')}
        >
          <a
            className={`home-page-header-link flex h-full items-center whitespace-nowrap border-x border-transparent px-[14px] text-[14px] font-medium transition ${
              item.isCurrent
                ? 'home-page-header-link--active'
                : isProductsMenuOpen
                  ? 'home-page-header-link--open'
                  : 'home-page-header-link--idle'
            }`}
            href={item.path}
            aria-haspopup="true"
            aria-expanded={isProductsMenuOpen}
            onClick={(event) => {
              event.preventDefault()
              if (isProductsMenuOpen) {
                setIsProductsMenuOpen(false)
                return
              }
              openDesktopMenu('products')
            }}
          >
            {item.label}
            <span
              className={`ml-1 inline-flex h-4 w-4 items-center justify-center transition ${
                isProductsMenuOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            >
              <svg
                className="h-[10px] w-[10px]"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M1.5 3.25L5 6.75L8.5 3.25"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>

          {isProductsMenuOpen && (
            <div
              className="fixed inset-x-0 top-[59px] z-[100] home-nav-mega-panel"
              onMouseEnter={() => openDesktopMenu('products')}
              onMouseLeave={() => scheduleDesktopMenuClose('products')}
            >
              <div className="mx-auto w-full max-w-[1200px]">
                <div className="home-nav-free-ai-tools-mega home-nav-mega-grid grid w-full">
                  {freeAiToolsHeaderMegaMenu.groups.map((group) => (
                    <section
                      key={group.id}
                      className="home-nav-free-ai-tools-mega-column home-nav-mega-card min-w-0"
                    >
                      <div className="flex items-center gap-2">
                        {group.iconKind === 'users' ? (
                          <Users
                            className="h-4 w-4 shrink-0 text-[#534ab7]"
                            aria-hidden="true"
                          />
                        ) : group.iconSrc ? (
                          <img
                            className="h-4 w-4 shrink-0"
                            src={group.iconSrc}
                            alt=""
                            draggable={false}
                            decoding="async"
                          />
                        ) : null}
                        <h4 className="text-[13px] font-semibold text-[#261f38]">{group.title}</h4>
                      </div>
                      <div
                        className={`mt-2.5 gap-0.5${
                          group.itemColumns === 2
                            ? ' home-nav-free-ai-tools-mega-links--two-col grid'
                            : ' flex flex-col'
                        }`}
                      >
                        {group.items.map((linkItem) => (
                          <a
                            key={linkItem.id}
                            href={linkItem.url}
                            className="home-nav-mega-link truncate text-[13px]"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsProductsMenuOpen(false)}
                          >
                            {linkItem.label}
                          </a>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    if (item.type === 'templates') {
      return (
        <div
          key={item.key}
          className="relative flex h-full shrink-0 items-center"
          onMouseEnter={() => openDesktopMenu('templates')}
          onMouseLeave={() => scheduleDesktopMenuClose('templates')}
        >
          <a
            className={`home-page-header-link flex h-full items-center border-x border-transparent px-[14px] text-[14px] font-medium transition ${
              item.isCurrent
                ? 'home-page-header-link--active'
                : isTemplatesMenuOpen
                  ? 'home-page-header-link--open'
                  : 'home-page-header-link--idle'
            }`}
            href={item.path}
            onClick={(event) => {
              event.preventDefault()
              navigateTo(item.path)
            }}
          >
            {item.label}
            <span
              className={`ml-1 inline-flex h-4 w-4 items-center justify-center transition ${
                isTemplatesMenuOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            >
              <svg
                className="h-[10px] w-[10px]"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path
                  d="M1.5 3.25L5 6.75L8.5 3.25"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>

          {isTemplatesMenuOpen && (
            <div
              className="fixed inset-x-0 top-[59px] z-[100] home-nav-mega-panel"
              onMouseEnter={() => openDesktopMenu('templates')}
              onMouseLeave={() => scheduleDesktopMenuClose('templates')}
            >
              <div
                className="home-nav-mega-grid mx-auto grid w-full max-w-[1200px] grid-cols-3"
              >
                {localizedTemplateMenuSections.map((section) => (
                  <section
                    key={section.title}
                    className="home-nav-mega-card min-w-0"
                  >
                    <h3
                      className="text-[11px] font-semibold tracking-[0.04em] text-[#9e91b5]"
                    >
                      {section.displayTitle ?? section.title}
                    </h3>
                    <div className="mt-3 flex flex-col gap-2">
                      {section.items.map((sectionItem) => {
                        const targetPath = resolveTemplateTargetPath(sectionItem.path, currentLocale)
                        return (
                          <a
                            key={sectionItem.name}
                            href={targetPath}
                            className="home-nav-mega-link inline-flex items-center gap-2 text-[14px]"
                            onClick={(event) => {
                              event.preventDefault()
                              navigateTo(targetPath)
                            }}
                          >
                            <span
                              className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] text-[10px] font-semibold"
                              style={{
                                color: section.color,
                                backgroundColor: `${section.color}1f`,
                              }}
                              aria-hidden="true"
                            >
                              □
                            </span>
                            {sectionItem.displayName ?? sectionItem.name}
                          </a>
                        )
                      })}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          )}
        </div>
      )
    }

    if (item.type === 'external') {
      return (
        <a
          key={item.key}
          className="home-page-header-link home-page-header-link--idle flex h-full shrink-0 items-center whitespace-nowrap border-x border-transparent px-[14px] text-[14px] font-medium transition"
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
        </a>
      )
    }

    return (
      <a
        key={item.key}
        className={`home-page-header-link flex h-full shrink-0 items-center whitespace-nowrap border-x border-transparent px-[14px] text-[14px] font-medium transition ${
          item.isCurrent
            ? 'home-page-header-link--active'
            : 'home-page-header-link--idle'
        }`}
        href={item.path}
        onClick={(event) => {
          event.preventDefault()
          navigateTo(item.path)
        }}
      >
        {item.label}
      </a>
    )
  }

  const isDesktopMegaMenuOpen =
    isProductsMenuOpen
    || isWpsFeaturesMenuOpen
    || isTemplatesMenuOpen

  return (
    <div className="home-figma-page home-v2 min-h-screen overflow-x-clip text-[#0d0d0d]">
      <header className={`sticky top-0 z-20 hv2-nav hv2-chrome home-page-header${isDesktopMegaMenuOpen ? ' home-page-header--mega-open' : ''}${isCompactNav ? ' home-page-header--compact' : ''}`}>
        <div
          ref={headerInnerRef}
          className="home-page-header-inner hv2-nav__inner relative mx-auto flex h-[62px] w-full max-w-[1200px] items-center"
        >
          <div ref={headerBrandRef} className="flex shrink-0 items-center justify-start">
            <a
              className="hv2-nav__brand flex shrink-0 items-center whitespace-nowrap"
              aria-label="WPS AI home"
              href={localeHomePath}
              onClick={(event) => {
                event.preventDefault()
                navigateTo(localeHomePath)
              }}
            >
              <img
                className="home-page-header-logo hv2-nav__logo"
                src="/images/home-v2/nav-logo-ai.svg"
                alt=""
                width={24}
                height={24}
                draggable={false}
                decoding="async"
                aria-hidden="true"
              />
              <img
                className="hv2-nav__wordmark"
                src="/images/home-v2/nav-wordmark.svg"
                alt="WPS AI"
                width={67}
                height={24}
                draggable={false}
                decoding="async"
              />
            </a>
          </div>
          <nav
            className="home-page-header-nav hidden h-full min-w-0 flex-1 flex-nowrap items-stretch justify-center gap-[2px] min-[720px]:flex"
            ref={desktopNavRef}
          >
            {visibleDesktopNavItems.map((item) => renderDesktopMainNavItem(item))}
            {overflowDesktopNavItems.length > 0 && (
              <div
                className="relative flex h-full shrink-0 items-center"
                onMouseEnter={() => openDesktopMenu('overflow')}
                onMouseLeave={() => scheduleDesktopMenuClose('overflow')}
              >
                <button
                  className={`home-page-header-link flex h-full w-[42px] items-center justify-center border-x border-transparent transition ${
                    isDesktopNavOverflowActive
                      ? 'home-page-header-link--active'
                      : isOverflowMenuOpen
                        ? 'home-page-header-link--open'
                        : 'home-page-header-link--idle'
                  }`}
                  type="button"
                  onClick={() => openDesktopMenu('overflow')}
                  aria-expanded={isOverflowMenuOpen}
                  aria-haspopup="menu"
                  aria-label={desktopOverflowMenuAriaLabel}
                >
                  <span
                    className={`inline-flex h-4 w-4 items-center justify-center transition ${
                      isOverflowMenuOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      className="h-[10px] w-[10px]"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M1.5 3.25L5 6.75L8.5 3.25"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                {isOverflowMenuOpen && (
                  <div
                    className="home-nav-floating-panel absolute left-1/2 top-full z-[100] hidden w-[190px] -translate-x-1/2 p-2.5 md:block"
                    onMouseEnter={() => openDesktopMenu('overflow')}
                    onMouseLeave={() => scheduleDesktopMenuClose('overflow')}
                  >
                    {overflowDesktopNavItems.map((item, index) => (
                      <a
                        key={item.key}
                        className={`${index === 0 ? '' : 'mt-1 '}flex px-3 py-2 text-[13px] transition ${
                          item.isCurrent
                            ? 'rounded-[12px] bg-[linear-gradient(135deg,rgba(255,255,255,0.96)_0%,rgba(244,236,255,0.96)_100%)] text-[#8f5bff] shadow-[inset_0_1px_0_rgba(255,255,255,0.92)]'
                            : 'home-nav-floating-item'
                        }`}
                        href={item.path}
                        onClick={(event) => {
                          if (item.type === 'external') {
                            setIsOverflowMenuOpen(false)
                            return
                          }
                          event.preventDefault()
                          if (item.type === 'products') {
                            openDesktopMenu('products')
                            return
                          }
                          navigateTo(item.path)
                        }}
                        {...(item.type === 'external'
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>
          <div
            ref={desktopNavMeasureRef}
            aria-hidden="true"
            className="pointer-events-none invisible absolute left-0 top-0 -z-10 flex h-0 items-center gap-[2px] overflow-hidden whitespace-nowrap"
          >
            {desktopMainNavItems.map((item) => (
              <span
                key={`measure-${item.key}`}
                data-nav-measure={`desktop-nav-${item.key}`}
                className={`inline-flex h-[60px] shrink-0 items-center px-[14px] text-[14px] font-medium ${
                  item.type === 'link' ? '' : 'border-x border-transparent'
                }`}
              >
                {item.label}
                {item.type !== 'link' && (
                  <span className="ml-1 inline-flex h-4 w-4 items-center justify-center" aria-hidden="true">
                    <svg className="h-[10px] w-[10px]" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1.5 3.25L5 6.75L8.5 3.25"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </span>
            ))}
            <span
              data-nav-measure="desktop-nav-overflow"
              className="inline-flex h-[60px] w-[42px] shrink-0 items-center justify-center border-x border-transparent"
            >
              <span className="inline-flex h-4 w-4 items-center justify-center" aria-hidden="true">
                <svg className="h-[10px] w-[10px]" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1.5 3.25L5 6.75L8.5 3.25"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
            <span
              data-nav-measure="desktop-actions"
              className="inline-flex shrink-0 items-center justify-end gap-3 whitespace-nowrap"
            >
              <span className="inline-flex h-[23px] w-[23px] shrink-0" />
              <span className="inline-flex h-[36px] items-center rounded-full px-5 text-[14px] font-semibold">
                {uiText.nav.getStartedFree}
              </span>
              <span className="inline-flex h-[36px] items-center px-3 text-[14px] font-medium">
                {uiText.nav.signIn}
              </span>
            </span>
          </div>
          <div
            className="home-page-header-actions relative hidden shrink-0 items-center justify-end gap-2 whitespace-nowrap min-[720px]:flex min-[960px]:gap-3"
            ref={langMenuRef}
          >
            <button
              className="home-nav-trigger-button inline-flex shrink-0 items-center justify-center gap-0 p-0 transition"
              type="button"
              onClick={() => setIsLangOpen((prev) => !prev)}
              aria-expanded={isLangOpen}
              aria-haspopup="dialog"
            >
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.25 0.749954C17.049 0.749954 21.75 5.45096 21.75 11.25C21.75 16.9281 17.2428 21.5536 11.611 21.7439L11.25 21.75C11.1294 21.75 11.0092 21.7479 10.8896 21.7439L10.5311 21.7257C5.06742 21.3563 0.75 16.8073 0.75 11.25C0.75 5.45096 5.45101 0.749954 11.25 0.749954ZM14.5563 2.87667L14.4842 2.90387C13.5923 3.25607 12.8041 3.8868 12.8106 4.7487C12.8131 5.08015 13.119 7.1371 12.4641 7.0986C11.8089 7.0601 11.663 6.12525 10.9616 5.8659C9.8444 5.45255 9.2319 6.59005 9.3439 7.5606C9.4195 8.21545 11.1789 10.6371 10.1528 11.25C9.542 11.615 7.97785 9.81915 7.35065 9.43415C6.73045 9.05335 5.52575 9.58325 4.74735 8.9529C4.2374 8.5399 4.63815 6.6597 4.5286 6.0871C4.47715 5.8197 4.3655 5.6188 4.22935 5.46655L4.29018 5.54332C3.01526 7.09639 2.25 9.08381 2.25 11.25C2.25 16.0964 6.08072 20.0481 10.8795 20.2425L10.9269 20.2247C11.1097 20.1177 11.2894 20.0056 11.466 19.8887C11.6637 19.7034 11.7936 19.4572 11.8349 19.1894C12.1306 17.3722 10.6116 17.6802 10.1867 16.8122C9.7989 16.0194 10.8212 16.0184 10.8024 14.0423C10.7107 13.4273 10.7779 12.797 10.9711 12.2814C11.4334 11.0487 12.9577 9.5143 14.8389 10.2581C15.8067 10.6406 15.4024 12.2331 15.7237 12.5894C16.501 13.4518 17.5728 12.9363 18.5356 13.4753C19.0316 13.7532 19.2297 14.66 19.306 15.4748L19.288 15.3028C19.9034 14.0847 20.25 12.7078 20.25 11.25C20.25 7.44672 17.8909 4.19448 14.5563 2.87667Z"
                  fill="#757575"
                />
                <circle cx="11.25" cy="11.25" r="10.125" stroke="#757575" strokeWidth="2.25" />
              </svg>
              <span className="sr-only">
                {currentLocaleOption.short} {currentLocaleOption.label}
              </span>
            </button>
            {isLangOpen && (
              <div
                className="home-nav-locale-panel absolute right-0 top-[calc(100%+10px)] z-30 w-[min(460px,calc(100vw-24px))] p-4"
              >
                <div className="grid grid-cols-2 gap-[6px] min-[540px]:grid-cols-4">
                  {localeOptions.map((item) => (
                    <button
                      key={item.code}
                      type="button"
                      className={`flex items-center gap-2 px-3 py-2 text-left text-[12px] transition ${
                        currentLocale === item.code
                          ? 'home-nav-locale-item-active'
                          : 'home-nav-locale-item'
                      }`}
                      onClick={() => handleLocaleSelect(item.code)}
                    >
                      <span className="w-5 shrink-0 text-[11px] font-semibold text-[#5f5e5a]">
                        {item.short}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
                <div className="home-nav-locale-panel__footer mt-3 flex justify-end border-t border-[#f0ecf8] pt-3">
                  <a
                    href={localeLocalePath}
                    className="home-nav-locale-panel-link text-[12px] font-semibold text-[#8f5bff] transition hover:text-[#7348e6] hover:underline"
                    onClick={(event) => {
                      event.preventDefault()
                      setIsLangOpen(false)
                      navigateTo(localeLocalePath)
                    }}
                  >
                    {uiText.nav.localePanelLink}
                  </a>
                </div>
              </div>
            )}
            <button
              className="home-page-header-cta hv2-nav__cta"
              type="button"
              aria-label={uiText.nav.getStartedFree}
              onClick={() => navigateTo(localeDownloadPath)}
            >
              <span className="hv2-nav__cta-full">{uiText.nav.getStartedFree}</span>
              <span className="hv2-nav__cta-short">{uiText.nav.download}</span>
            </button>
            <div className="hv2-nav__auth header-auth theme-light">
              <button className="home-page-header-signin sign-in-btn" type="button">
                {uiText.nav.signIn}
              </button>
            </div>
          </div>
          <div
            className="home-page-header-mobile-controls relative ml-auto flex shrink-0 items-center gap-2 min-[720px]:hidden"
            ref={mobileMenuButtonRef}
          >
            <button
              className="home-page-header-mobile-signin inline-flex shrink-0 rounded-[8px] px-3 py-2 text-[13px] font-medium text-[#4a5568] transition hover:bg-[#f1efe8] hover:text-[#1a202c]"
              type="button"
            >
              {uiText.nav.signIn}
            </button>
            <button
              className={`inline-flex h-9 w-9 items-center justify-center rounded-[8px] border border-[#e2e8f0] transition ${
                isMobileMenuOpen
                  ? 'bg-[#f6f5ff] text-[#534ab7]'
                  : 'bg-transparent text-[#4a5568] hover:border-[#afa9ec] hover:text-[#534ab7]'
              }`}
              type="button"
              onClick={() => {
                setIsMobileMenuOpen((prev) => {
                  const next = !prev
                  if (!next) setMobileNavExpandedKey(null)
                  return next
                })
              }}
              aria-expanded={isMobileMenuOpen}
              aria-haspopup="dialog"
              aria-label={mobileMenuButtonAriaLabel}
            >
              <svg className="h-[18px] w-[18px]" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                {isMobileMenuOpen ? (
                  <path
                    d="M4.5 4.5L13.5 13.5M13.5 4.5L4.5 13.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                ) : (
                  <>
                    <path d="M3.5 5H14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M3.5 9H14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M3.5 13H14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuPanelRef}
          className={`fixed inset-x-0 bottom-0 top-[60px] z-30 border-t border-[#e2e8f0] bg-white shadow-[0_16px_36px_rgba(15,23,42,0.12)]${isCompactNav ? '' : ' min-[720px]:hidden'}`}
        >
          <div className="h-full overflow-y-auto px-3 py-2">
            <nav className="home-mobile-nav" aria-label={uiText.nav.menu}>
              {desktopMainNavItems.map((item) => {
                const isExpanded = mobileNavExpandedKey === item.key
                const toggleExpanded = () => {
                  setMobileNavExpandedKey((prev) => (prev === item.key ? null : item.key))
                }
                const closeMobileNav = () => {
                  setIsMobileMenuOpen(false)
                  setMobileNavExpandedKey(null)
                }

                if (item.type === 'products' || item.type === 'wps-features') {
                  const groups =
                    item.type === 'products'
                      ? freeAiToolsHeaderMegaMenu.groups
                      : wpsFeaturesHeaderMegaMenu.groups

                  return (
                    <div key={`mobile-${item.key}`} className="home-mobile-nav__section">
                      <button
                        type="button"
                        className="home-mobile-nav__trigger"
                        aria-expanded={isExpanded}
                        aria-controls={`mobile-nav-panel-${item.key}`}
                        id={`mobile-nav-trigger-${item.key}`}
                        onClick={toggleExpanded}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="home-mobile-nav__chevron" aria-hidden="true" />
                      </button>
                      {isExpanded ? (
                        <div
                          id={`mobile-nav-panel-${item.key}`}
                          role="region"
                          aria-labelledby={`mobile-nav-trigger-${item.key}`}
                          className="home-mobile-nav__panel"
                        >
                          {groups.map((group) => (
                            <div key={`mobile-${item.key}-${group.id}`} className="home-mobile-nav__group">
                              <p className="home-mobile-nav__group-label">{group.title}</p>
                              {group.items.map((linkItem) => {
                                const href = linkItem.url || group.items[0]?.url
                                const label = linkItem.label || linkItem.title
                                if (!href || !label) return null
                                return (
                                  <a
                                    key={linkItem.id}
                                    className="home-mobile-nav__link"
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={closeMobileNav}
                                  >
                                    {label}
                                  </a>
                                )
                              })}
                            </div>
                          ))}
                          {item.type === 'wps-features' ? (
                            <a
                              className="home-mobile-nav__link"
                              href={item.path}
                              onClick={(event) => {
                                event.preventDefault()
                                closeMobileNav()
                                navigateTo(item.path)
                              }}
                            >
                              {uiText.nav.seeAllFeatures}
                            </a>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  )
                }

                if (item.type === 'external') {
                  return (
                    <a
                      key={`mobile-${item.key}`}
                      className="home-mobile-nav__link"
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMobileNav}
                    >
                      {item.label}
                    </a>
                  )
                }

                return (
                  <a
                    key={`mobile-${item.key}`}
                    className={`home-mobile-nav__link${item.isCurrent ? ' is-active' : ''}`}
                    href={item.path}
                    onClick={(event) => {
                      event.preventDefault()
                      closeMobileNav()
                      navigateTo(item.path)
                    }}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>
            <div className="home-mobile-nav__footer">
              <p className="home-mobile-nav__footer-label">{uiText.nav.language}</p>
              <div className="grid grid-cols-2 gap-1 px-1">
                {localeOptions.map((item) => (
                  <button
                    key={`mobile-locale-${item.code}`}
                    type="button"
                    className={`home-mobile-nav__link flex items-center gap-2 text-left ${
                      currentLocale === item.code ? 'is-active' : ''
                    }`}
                    onClick={() => handleLocaleSelect(item.code)}
                  >
                    <span className="w-6 shrink-0 text-[12px] font-medium text-[#737373]">
                      {item.short}
                    </span>
                    <span className="truncate text-[14px]">{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex justify-end px-1">
                <a
                  href={localeLocalePath}
                  className="text-[13px] font-semibold text-[#8f5bff] transition hover:text-[#7348e6] hover:underline"
                  onClick={(event) => {
                    event.preventDefault()
                    setIsMobileMenuOpen(false)
                    setMobileNavExpandedKey(null)
                    navigateTo(localeLocalePath)
                  }}
                >
                  {uiText.nav.localePanelLink}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        {pageType === 'home' ? (
          <HomePage
            uiText={uiText}
            localeDownloadPath={localeDownloadPath}
            localeAllProductsPath={localeAllProductsPath}
            localeAiFeaturesPath={localeAiFeaturesPath}
            localeEncyclopediaPath={localeEncyclopediaPath}
            currentUrlLocale={currentUrlLocale}
            navigateTo={navigateTo}
            contentLanguage={contentLanguage}
          />
        ) : pageType === 'ai-features' ? (
          <IntlAiFeaturesPage copy={uiText.home.intlAiFeatures} />
        ) : pageType === 'docs-center' ? (
          <DocsCenterPage
            currentLocale={currentLocale}
            currentPathname={currentPathname}
            navigateTo={navigateTo}
            docsUiText={docsUiText}
            sectionSlugMap={localizedDocsSectionSlugMap}
            activeSection={activeDocsSection}
            catalogSections={localizedDocsCatalogSections}
            sourceCatalogSections={docsCatalogSections}
            sectionMarkersMap={localizedDocsSectionMarkersMap}
            sourceSectionMarkersMap={docsSectionMarkersMap}
            getSectionBlocks={getDocsSectionBlocks}
          />
        ) : isBlogCenterPage ? (
          <div className="blog-center">
            <a href="#blog-main" className="blog-skip-link">
              Skip to content
            </a>
            <header className="blog-hero">
              <div className="blog-center-container blog-hero-inner">
                <h1 className="blog-hero-title">{uiText.blog.heroTitle}</h1>
                <p className="blog-hero-sub">
                  {uiText.blog.heroDesc}
                </p>
                <div className="blog-search-wrap">
                  <label className="blog-search-input-wrap" aria-label="Search articles">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <input
                      id="blogSearchInput"
                      type="search"
                      placeholder={uiText.blog.searchPlaceholder}
                      autoComplete="off"
                      value={blogSearchQuery}
                      onChange={(event) => {
                        setBlogSearchQuery(event.target.value)
                        setActiveBlogAuthor('')
                      }}
                    />
                  </label>
                </div>
              </div>
            </header>

            <div className="blog-center-container blog-filters" role="tablist" aria-label={uiText.templates.categories}>
              {localizedBlogCategoryFilters.map((tab) => (
                <button
                  key={`blog-tab-${tab.id}`}
                  type="button"
                  className={`blog-filter-btn${activeBlogCategory === tab.id ? ' active' : ''}`}
                  role="tab"
                  aria-selected={activeBlogCategory === tab.id}
                  onClick={() => {
                    setActiveBlogCategory(tab.id)
                    setActiveBlogAuthor('')
                    setBlogSearchQuery('')
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div id="blog-main" className="blog-main blog-center-container">
              {blogIsEmpty ? (
                <p className="blog-empty">{uiText.blog.noResults}</p>
              ) : (
                <div className={`blog-home-grid${blogSecondaryPosts.length ? '' : ' blog-home-grid--single'}`}>
                  <section className="blog-section blog-section--primary" id="blogFeaturedSection">
                    <h2 className="blog-section-title">{blogPrimaryTitle}</h2>
                    <div className="blog-primary-list">
                      {blogPrimaryPosts.map((post) => (
                        <article
                          key={`primary-${post.slug}`}
                          className="blog-card blog-card--primary"
                          onClick={() => navigateTo(joinPath(currentUrlLocale, 'blog', post.slug))}
                        >
                          <div
                            className={`blog-card-accent ${blogCategoryAccentClassMap[post.category] ?? blogCategoryAccentClassMap.ai}`}
                          />
                          {post.image ? (
                            <div className="blog-card-media">
                              <img src={post.image} alt={post.imageAlt ?? post.title} loading="lazy" />
                            </div>
                          ) : null}
                          <div className="blog-card-body">
                            <p className="blog-card-meta">
                              {activeBlogCategory === 'all' ? (
                                <span className="blog-card-category-chip">
                                  {blogCategoryLabelMap[post.category] ?? localizeString('All')}
                                </span>
                              ) : null}
                              <time dateTime={post.date}>{formatBlogDate(post.date, currentLocale)}</time>
                              <span className="blog-card-sep">|</span>
                              <span>{post.readTime}</span>
                              <span className="blog-card-sep">|</span>
                              <a
                                href="#"
                                className="blog-author-link"
                                onClick={(event) => {
                                  event.preventDefault()
                                  event.stopPropagation()
                                  setActiveBlogAuthor(post.authorName)
                                  setActiveBlogCategory('all')
                                  setBlogSearchQuery('')
                                }}
                              >
                                {post.authorName}
                              </a>
                              <span className="blog-card-role"> - {post.authorRole}</span>
                            </p>
                            <h3 className="blog-card-title">
                              <a
                                href={joinPath(currentUrlLocale, 'blog', post.slug)}
                                onClick={(event) => {
                                  event.preventDefault()
                                  event.stopPropagation()
                                  navigateTo(joinPath(currentUrlLocale, 'blog', post.slug))
                                }}
                              >
                                {post.title}
                              </a>
                            </h3>
                            <p className="blog-card-excerpt">{post.excerpt}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>

                  {blogSecondaryPosts.length ? (
                    <aside className="blog-section blog-section--secondary" id="blogMoreSection">
                      <h2 className="blog-section-title">{uiText.blog.moreNews}</h2>
                      <div className="blog-secondary-list">
                        {blogSecondaryPosts.map((post) => (
                          <article
                            key={`secondary-${post.slug}`}
                            className="blog-card blog-card--secondary"
                            onClick={() => navigateTo(joinPath(currentUrlLocale, 'blog', post.slug))}
                          >
                            {post.image ? (
                              <div className="blog-card-thumb">
                                <img src={post.image} alt={post.imageAlt ?? post.title} loading="lazy" />
                              </div>
                            ) : null}
                            <div className="blog-card-body">
                              <p className="blog-card-meta">
                                {activeBlogCategory === 'all' ? (
                                  <span className="blog-card-category-chip">
                                    {blogCategoryLabelMap[post.category] ?? localizeString('All')}
                                  </span>
                                ) : null}
                                <time dateTime={post.date}>{formatBlogDate(post.date, currentLocale)}</time>
                                <span className="blog-card-sep">|</span>
                                <span>{post.readTime}</span>
                                <span className="blog-card-sep">|</span>
                                <a
                                  href="#"
                                  className="blog-author-link"
                                  onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    setActiveBlogAuthor(post.authorName)
                                    setActiveBlogCategory('all')
                                    setBlogSearchQuery('')
                                  }}
                                >
                                  {post.authorName}
                                </a>
                              </p>
                              <h3 className="blog-card-title">
                                <a
                                  href={joinPath(currentUrlLocale, 'blog', post.slug)}
                                  onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    navigateTo(joinPath(currentUrlLocale, 'blog', post.slug))
                                  }}
                                >
                                  {post.title}
                                </a>
                              </h3>
                              <p className="blog-card-excerpt">{post.excerpt}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </aside>
                  ) : null}
                </div>
              )}
            </div>

            <footer className="blog-follow blog-center-container">
              <span>{uiText.blog.followUs}</span>
              {blogSocialLinks.map((social) => (
                <a
                  key={`social-${social.id}`}
                  href={social.url}
                  className="blog-social"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </footer>
            <div
              className={`blog-overlay${isBlogOverlayOpen ? ' open' : ''}`}
              id="blogOverlay"
              aria-hidden={isBlogOverlayOpen ? 'false' : 'true'}
            >
              <div className="blog-overlay-inner">
                <div className="blog-overlay-topbar">
                  <button
                    type="button"
                    className="blog-overlay-btn blog-overlay-btn--ghost blog-overlay-btn--sm"
                    onClick={() => {
                      setIsBlogShareCopied(false)
                      navigateTo(localeBlogPath)
                    }}
                  >
                    {uiText.blog.backToBlog}
                  </button>
                  <button
                    type="button"
                    className="blog-overlay-btn blog-overlay-btn--ghost blog-overlay-btn--sm"
                    onClick={handleBlogShare}
                  >
                    {isBlogShareCopied ? uiText.blog.copied : uiText.blog.share}
                  </button>
                </div>

                {currentBlogPost ? (
                  <>
                    <article className="blog-article" id="blogArticle">
                      <p className="blog-article-meta">
                        <time dateTime={currentBlogPost.date}>
                          {formatBlogDate(currentBlogPost.date, currentLocale)}
                        </time>{' '}
                        |
                        <a
                          href="#"
                          className="blog-author-link"
                          onClick={(event) => {
                            event.preventDefault()
                            setActiveBlogAuthor(currentBlogPost.authorName)
                            setActiveBlogCategory('all')
                            setBlogSearchQuery('')
                            navigateTo(localeBlogPath)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                        >
                          {' '}
                          {currentBlogPost.authorName}
                        </a>
                        <span className="blog-card-role"> - {currentBlogPost.authorRole}</span>
                        <span className="blog-card-sep">|</span>
                        <span>{currentBlogPost.readTime}</span>
                      </p>
                      <h1>{currentBlogPost.title}</h1>
                      <p className="blog-article-lead">{currentBlogPost.excerpt}</p>
                      {currentBlogPost.image ? (
                        <figure className="blog-article-cover">
                          <img src={currentBlogPost.image} alt={currentBlogPost.imageAlt ?? currentBlogPost.title} />
                        </figure>
                      ) : null}
                      <div className="blog-article-body">
                        {currentBlogPost.body.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      <div className="blog-article-tags">
                        <span>{uiText.blog.tags}</span>
                        {(currentBlogPost.tags ?? []).map((tag) => (
                          <span key={`blog-tag-${tag}`} className="blog-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                    <aside className="blog-related" id="blogRelated">
                      <h3>{uiText.blog.relatedPosts}</h3>
                      <div id="blogRelatedList" className="blog-related-list">
                        {blogOverlayRelatedPosts.map((post) => (
                          <a
                            key={`blog-related-${post.slug}`}
                            href={joinPath(currentUrlLocale, 'blog', post.slug)}
                            className="blog-related-item"
                            onClick={(event) => {
                              event.preventDefault()
                                    navigateTo(joinPath(currentUrlLocale, 'blog', post.slug))
                            }}
                          >
                            <span className="blog-related-date">
                              {formatBlogDate(post.date, currentLocale)}
                            </span>
                            <span className="blog-related-title">{post.title}</span>
                          </a>
                        ))}
                      </div>
                    </aside>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ) : pageType === 'encyclopedia' ? (
          <div className="ency-center">
            <a href="#ency-main" className="ency-skip-link">
              {encyclopediaUiText.skipToMain}
            </a>

            <header className="ency-hero">
              <div className="ency-container ency-hero-inner">
                <h1 className="ency-hero-title">{encyclopediaUiText.heroTitle}</h1>
                <p className="ency-hero-sub">{encyclopediaUiText.heroSubtitle}</p>
                <div className="blog-search-wrap ency-search-wrap">
                  <label
                    className="blog-search-input-wrap"
                    aria-label={encyclopediaUiText.searchPlaceholder}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
                      <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                    <input
                      id="encySearchInput"
                      type="search"
                      placeholder={encyclopediaUiText.searchPlaceholder}
                      autoComplete="off"
                      value={encyclopediaSearchQuery}
                      onChange={(event) => setEncyclopediaSearchQuery(event.target.value)}
                    />
                  </label>
                </div>
              </div>
            </header>

            <section className="ency-promo ency-container" aria-label={encyclopediaUiText.promoSectionLabel}>
              <div className="ency-promo-inner">
                <p className="ency-promo-text">{encyclopediaUiText.promoTitle}</p>
                <a
                  href={getLocaleDocsPath(currentLocale, 'wps-ai')}
                  className="ency-btn ency-btn--primary ency-btn--sm"
                  onClick={(event) => {
                    event.preventDefault()
                    navigateTo(getLocaleDocsPath(currentLocale, 'wps-ai'), { scrollToTop: false })
                  }}
                >
                  {encyclopediaUiText.promoCta}
                </a>
              </div>
            </section>

            <div id="ency-main" className="ency-main ency-container">
              <div className="ency-layout">
                <aside className="ency-sidebar" aria-label={encyclopediaUiText.categorySidebar}>
                  <p className="ency-sidebar-label">{encyclopediaUiText.categorySidebar}</p>
                  {encyclopediaCategoryTabs.map((tab) => {
                    const count =
                      tab.id === 'all'
                        ? encyclopediaEntries.length
                        : encyclopediaEntries.filter((entry) => entry.category === tab.id).length
                    return (
                      <button
                        key={`ency-sidebar-${tab.id}`}
                        type="button"
                        className={`ency-sidebar-item${activeEncyclopediaCategory === tab.id ? ' active' : ''}`}
                        onClick={() => setActiveEncyclopediaCategory(tab.id)}
                      >
                        <span className="ency-sidebar-item-label">{tab.label}</span>
                        <span className="ency-sidebar-item-count">{count}</span>
                      </button>
                    )
                  })}
                </aside>

                <div className="ency-content">
                  {filteredEncyclopediaEntries.length > 0 ? (
                    <>
                      {activeEncyclopediaCategory === 'all' ? (
                        <section className="ency-section">
                          <h2 className="ency-section-title">{encyclopediaUiText.featuredTitle}</h2>
                          <div className="ency-featured-grid">
                            {featuredEncyclopediaEntries.map((entry) => (
                              <article
                                key={`ency-featured-${entry.slug}`}
                                className="ency-topic-card ency-topic-card--featured"
                                onClick={() => navigateTo(joinPath(localeEncyclopediaPath, entry.slug))}
                              >
                                <div className="ency-topic-media">
                                  <img src={entry.image} alt={entry.title} loading="lazy" />
                                </div>
                                <div className="ency-topic-body">
                                  <span className="ency-topic-chip">
                                    {encyclopediaCategoryLabelMap[entry.category] ?? encyclopediaUiText.allTopics}
                                  </span>
                                  <h3>{highlightEncyclopediaKeyword(entry.title, normalizedEncyclopediaQuery)}</h3>
                                  <p>{entry.summary}</p>
                                  <button type="button" className="ency-topic-link">
                                    {encyclopediaUiText.openTopic}
                                  </button>
                                </div>
                              </article>
                            ))}
                          </div>
                        </section>
                      ) : null}

                      <section className="ency-section">
                        <h2 className="ency-section-title">{encyclopediaUiText.topicListTitle}</h2>
                        <div className="ency-topic-grid" role="region" aria-live="polite">
                          {filteredEncyclopediaEntries.map((entry) => (
                            <article
                              key={`ency-topic-${entry.slug}`}
                              className="ency-topic-card"
                              onClick={() => navigateTo(joinPath(localeEncyclopediaPath, entry.slug))}
                            >
                              <div className="ency-topic-body">
                                <div className="ency-topic-meta">
                                  {activeEncyclopediaCategory === 'all' ? (
                                    <span className="ency-topic-chip">
                                      {encyclopediaCategoryLabelMap[entry.category] ?? encyclopediaUiText.allTopics}
                                    </span>
                                  ) : null}
                                  <span>{encyclopediaUiText.lastUpdated} {entry.updated}</span>
                                </div>
                                <h3>{highlightEncyclopediaKeyword(entry.title, normalizedEncyclopediaQuery)}</h3>
                                <p>{entry.summary}</p>
                              </div>
                            </article>
                          ))}
                        </div>
                      </section>
                    </>
                  ) : (
                    <p id="encyEmpty" className="ency-empty">
                      {encyclopediaUiText.noResults}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div
              className={`ency-overlay ${isEncyclopediaOverlayOpen ? 'open' : ''}`}
              id="encyOverlay"
              aria-hidden={!isEncyclopediaOverlayOpen}
            >
              <div className="ency-overlay-inner">
                <div className="ency-overlay-topbar">
                  <button
                    type="button"
                    className="ency-btn ency-btn--ghost ency-btn--sm"
                    onClick={() => navigateTo(localeEncyclopediaPath)}
                  >
                    {encyclopediaUiText.backToIndex}
                  </button>
                  <a
                    href={localeDocsPath}
                    className="ency-btn ency-btn--ghost ency-btn--sm"
                    onClick={(event) => {
                      event.preventDefault()
                      navigateTo(localeDocsPath)
                    }}
                  >
                    {encyclopediaUiText.browseDocs}
                  </a>
                </div>

                {currentEncyclopediaEntry && (
                  <>
                    <article className="ency-article" id="encyArticle">
                      <p className="ency-article-meta">
                        {encyclopediaUiText.lastUpdated} {currentEncyclopediaEntry.updated}
                      </p>
                      <h1>{currentEncyclopediaEntry.title}</h1>
                      <p className="ency-article-lead">{currentEncyclopediaEntry.summary}</p>
                      <figure className="ency-article-cover">
                        <img src={currentEncyclopediaEntry.image} alt={currentEncyclopediaEntry.title} />
                      </figure>
                      <div className="ency-article-body">
                        {currentEncyclopediaEntry.body.map((paragraph, index) => (
                          <p
                            key={`${currentEncyclopediaEntry.slug}-p${index}`}
                            className="ency-article-paragraph"
                            style={{ whiteSpace: 'pre-line' }}
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <div className="ency-article-actions">
                        <h3>{encyclopediaUiText.quickActions}</h3>
                        <div className="ency-article-action-grid">
                          <a
                            href={currentEncyclopediaEntry.docsPath ?? localeDocsPath}
                            className="ency-article-action-link"
                            onClick={(event) => {
                              event.preventDefault()
                              navigateTo(currentEncyclopediaEntry.docsPath ?? localeDocsPath)
                            }}
                          >
                            {encyclopediaUiText.browseDocs}
                          </a>
                          <a
                            href={localeAnswersPath}
                            className="ency-article-action-link"
                            onClick={(event) => {
                              event.preventDefault()
                              navigateTo(localeAnswersPath)
                            }}
                          >
                            {encyclopediaUiText.browseAnswers}
                          </a>
                          <a
                            href={localePricingPath}
                            className="ency-article-action-link"
                            onClick={(event) => {
                              event.preventDefault()
                              navigateTo(localePricingPath)
                            }}
                          >
                            {localizeString('Plans & Pricing')}
                          </a>
                        </div>
                      </div>
                    </article>
                    <aside className="ency-related" id="encyRelated">
                      <h2>{encyclopediaUiText.continueLearning}</h2>
                      <ul id="encyRelatedList" className="ency-related-list">
                        {currentEncyclopediaRelatedEntries.length > 0 ? (
                          currentEncyclopediaRelatedEntries.map((entry) => (
                            <li key={`related-${entry.slug}`}>
                              <a
                                href={joinPath(localeEncyclopediaPath, entry.slug)}
                                className="ency-related-link"
                                onClick={(event) => {
                                  event.preventDefault()
                                  navigateTo(joinPath(localeEncyclopediaPath, entry.slug))
                                }}
                              >
                                {entry.title}
                              </a>
                            </li>
                          ))
                        ) : (
                          <li className="ency-related-empty">—</li>
                        )}
                      </ul>
                    </aside>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : pageType === 'download' ? (
          <div className="bg-transparent">
            <section className="site-page-hero site-page-hero--aurora px-6 py-14">
              <div className="mx-auto w-full max-w-[1160px] text-center">
                <h1 className="text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-[-0.03em] text-[#1a202c]">
                  {uiText.download.heroTitle}
                </h1>
                <p className="mx-auto mt-4 max-w-[780px] text-[14px] leading-7 text-[#4a5568]">
                  {uiText.download.heroDesc}
                </p>
                <p className="mt-3 text-[12px] text-[#6b7181]">
                  {uiText.download.latestVersionNote}
                </p>
                <button className="mt-6 rounded-[8px] bg-[#534ab7] px-12 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#3c3489]">
                  {uiText.download.title}
                </button>
              </div>
      </section>

            <section className="site-page-transition-section site-page-transition-section--aurora px-6 pb-10">
              <div className="site-page-overlap-panel mx-auto w-full max-w-[1160px] rounded-[14px] border border-[#e2e8f0] bg-white p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)] md:p-8">
                <h2 className="text-[34px] font-semibold text-[#1a202c]">WPS Office</h2>
                <p className="mx-auto mt-3 max-w-[930px] text-[13px] leading-7 text-[#4a5568]">
                  {uiText.download.suiteDesc}
                </p>

                <p className="mt-10 text-[12px] font-medium uppercase tracking-[0.08em] text-[#6e7382]">
                  {uiText.download.desktopVersions}
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {localizedDesktopDownloadItems.map((item) => (
                    <article
                      key={item.name}
                      className="rounded-[12px] border border-[#e2e8f0] bg-[#fafbfc] p-5 text-left"
                    >
                      <div className="text-[26px]">{item.icon}</div>
                      <p className="mt-2 text-[11px] text-[#8b90a1]">{item.version}</p>
                      <h3 className="mt-1 text-[28px] font-semibold leading-none text-[#1f2432]">
                        {item.displayName ?? item.name}
                      </h3>
                      <p className="mt-3 min-h-[44px] text-[12px] leading-5 text-[#62697b]">
                        {item.desc}
                      </p>
                      <button className="mt-5 w-full rounded-[8px] bg-[#534ab7] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#3c3489]">
                        {item.cta}
                      </button>
                    </article>
                  ))}
                </div>

                <p className="mt-10 text-[12px] font-medium uppercase tracking-[0.08em] text-[#6e7382]">
                  {uiText.download.mobileApps}
                </p>
                <div className="mx-auto mt-4 grid max-w-[760px] gap-4 md:grid-cols-2">
                  {localizedMobileDownloadItems.map((item) => (
                    <article
                      key={item.name}
                      className="rounded-[12px] border border-[#e2e8f0] bg-[#fafbfc] p-5 text-left"
                    >
                      <div className="text-[24px]">{item.icon}</div>
                      <p className="mt-2 text-[11px] text-[#8b90a1]">{item.version}</p>
                      <h3 className="mt-1 text-[28px] font-semibold leading-none text-[#1f2432]">
                        {item.displayName ?? item.name}
                      </h3>
                      <p className="mt-3 min-h-[44px] text-[12px] leading-5 text-[#62697b]">
                        {item.desc}
                      </p>
                      <button className="mt-5 w-full rounded-[8px] bg-[#534ab7] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#3c3489]">
                        {item.cta}
                      </button>
                    </article>
                  ))}
                </div>

                <p className="mx-auto mt-10 max-w-[840px] text-[12.5px] leading-6 text-[#6b7181]">
                  {uiText.download.updateNote}
                </p>
                <button
                  type="button"
                  onClick={() => navigateTo(localeLocalePath)}
                  className="mt-4 text-[13px] font-semibold text-[#534ab7] underline underline-offset-2"
                >
                  {uiText.download.worldwideCta}
                </button>
              </div>
            </section>

            <section className="px-6 pb-14">
              <div className="mx-auto w-full max-w-[1160px] rounded-[14px] border border-[#e2e8f0] bg-white p-6 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)] md:p-8">
                <h2 className="text-[30px] font-semibold text-[#1a202c]">
                  {uiText.download.pdfToolkit}
                </h2>
                <p className="mx-auto mt-3 max-w-[900px] text-[13px] leading-7 text-[#4a5568]">
                  {uiText.download.pdfToolkitDesc}
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {localizedToolkitItems.map((item) => (
                    <article
                      key={item.name}
                      className="rounded-[12px] border border-[#e2e8f0] bg-[#fafbfc] p-5 text-left"
                    >
                      <div className="text-[24px]">{item.icon}</div>
                      <h3 className="mt-3 text-[20px] font-semibold text-[#1f2432]">
                        {item.displayName ?? item.name}
                      </h3>
                      <p className="mt-2 min-h-[44px] text-[12px] leading-5 text-[#62697b]">
                        {item.desc}
                      </p>
                      <button className="mt-5 w-full rounded-[8px] bg-[#534ab7] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#3c3489]">
                        {item.cta}
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-6 pb-14">
              <div className="mx-auto w-full max-w-[1160px] rounded-[14px] border border-[#e2e8f0] bg-white p-6 md:p-8">
                <h2 className="text-[24px] font-semibold text-[#1a202c]">{uiText.download.faq}</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {localizedDownloadFaqs.map((item) => (
                    <article key={item.q} className="rounded-[10px] border border-[#e2e8f0] bg-[#fafbfc] p-4">
                      <h3 className="text-[15px] font-semibold text-[#1f2432]">{item.q}</h3>
                      <p className="mt-2 text-[13px] leading-6 text-[#5a6070]">{item.a}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : pageType === 'guides' ? (
          <div className="bg-transparent">
            <section className="site-page-hero site-page-hero--mist px-6 pb-5 pt-12">
              <div className="mx-auto w-full max-w-[1160px] text-center">
                <h1 className="text-[clamp(34px,4.4vw,52px)] font-extrabold tracking-[-0.03em] text-[#1f2433]">
                  {uiText.guides.title}
                </h1>
                <p className="mt-2 text-[15px] text-[#5f6776]">
                  {uiText.guides.desc}
                </p>
              </div>
            </section>

            <section className="site-page-transition-section site-page-transition-section--lift site-page-transition-section--mist px-6 pb-10 pt-4">
              <div className="mx-auto w-full max-w-[1160px]">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {guideCategoryTabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveGuideCategory(tab.id)}
                      className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${
                        activeGuideCategory === tab.id
                          ? 'border-[#5a51c9] bg-[#5a51c9] text-white'
                          : 'border-[#d8dde8] bg-[#f7f8fb] text-[#6b7280] hover:border-[#bbb5ec] hover:text-[#4a43a5]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredLocalizedGuides.map((guide) => (
                    <article
                      key={guide.slug}
                      className="flex h-full flex-col overflow-hidden rounded-[10px] border border-[#e1e4ec] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)] transition hover:-translate-y-[1px] hover:shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
                    >
                      <div className="px-4 pb-4 pt-4">
                        <span
                          className={`inline-flex rounded-[5px] px-2 py-[2px] text-[11px] font-semibold lowercase ${
                            guideCategoryStyleMap[guide.category] ?? 'bg-[#f0f2f7] text-[#5f6778]'
                          }`}
                        >
                          {guide.category}
                        </span>
                        <h2 className="mt-3 text-[clamp(20px,1.5vw,28px)] font-semibold leading-[1.3] text-[#1f2432]">
                          {guide.title}
                        </h2>
                        <p className="mt-2 text-[13px] leading-6 text-[#5f6778]">{guide.desc}</p>
                      </div>
                      <div className="mt-auto flex items-center justify-between border-t border-[#edeff4] bg-[#f4f2ed] px-4 py-3">
                        <span className="text-[11px] text-[#9aa3b3]">{guide.readTime}</span>
                        <a
                          href={joinPath(currentUrlLocale, 'guides', guide.slug)}
                          className="text-[12px] font-semibold text-[#5a51c9] transition hover:text-[#3f38a6]"
                          onClick={(event) => {
                            event.preventDefault()
                            navigateTo(joinPath(currentUrlLocale, 'guides', guide.slug))
                          }}
                        >
                          {uiText.guides.readGuide} →
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : pageType === 'guide-detail' && currentGuide ? (
          <div className="bg-transparent">
            <section className="site-page-top-surface border-b border-[#e3e7ef] px-6 py-4">
              <div className="mx-auto w-full max-w-[1160px]">
                <div className="flex items-center gap-2 text-[12px] text-[#7b8395]">
                  <button type="button" onClick={() => navigateTo(localeHomePath)} className="hover:text-[#534ab7]">
                    {localizeString('Home')}
                  </button>
                  <span>›</span>
                  <button
                    type="button"
                    onClick={() => navigateTo(localeGuidesPath)}
                    className="hover:text-[#534ab7]"
                  >
                    Guides
                  </button>
                  <span>›</span>
                  <span className="font-semibold text-[#2e3442]">{currentGuide.title}</span>
                </div>
              </div>
            </section>

            <section className="site-page-top-surface border-b border-[#e3e7ef] px-6 py-10">
              <div className="mx-auto w-full max-w-[1160px]">
                <span
                  className={`inline-flex rounded-[5px] px-2 py-[2px] text-[11px] font-semibold lowercase ${
                    guideCategoryStyleMap[currentGuide.category] ?? 'bg-[#f0f2f7] text-[#5f6778]'
                  }`}
                >
                  {currentGuide.category}
                </span>
                <h1 className="mt-3 max-w-[920px] text-[clamp(30px,4.2vw,52px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#1a202c]">
                  {currentGuide.title}
                </h1>
                <p className="mt-4 max-w-[900px] text-[17px] leading-8 text-[#4f586b]">
                  {currentGuide.desc}
                </p>
                <p className="mt-3 text-[13px] text-[#8e97a8]">{currentGuide.readTime}</p>
              </div>
            </section>

            <section className="px-6 py-10">
              <div className="mx-auto w-full max-w-[860px] rounded-[14px] border border-[#dee3ef] bg-white p-6 shadow-[0_3px_16px_rgba(15,23,42,0.05)] md:p-8">
                <h2 className="text-[26px] font-semibold text-[#1f2432]">{uiText.toolDemo.step1}</h2>
                <p className="mt-3 text-[15px] leading-7 text-[#586174]">
                  Navigate to wps.ai and select the tool you need from the navigation menu.
                  You can also drag and drop files directly onto the tool page.
                </p>

                <h2 className="mt-8 text-[26px] font-semibold text-[#1f2432]">{uiText.toolDemo.step2}</h2>
                <p className="mt-3 text-[15px] leading-7 text-[#586174]">
                  Click the upload area or drag your file to begin. Most conversions are fully
                  automatic - just wait for processing to complete (usually under 30 seconds).
                </p>

                <h2 className="mt-8 text-[26px] font-semibold text-[#1f2432]">{uiText.toolDemo.step3}</h2>
                <p className="mt-3 text-[15px] leading-7 text-[#586174]">
                  Once processing is complete, click the download button. Your file will be saved
                  to your device immediately. Files are deleted from our servers within 24 hours.
                </p>

                <div className="mt-10 rounded-[12px] border border-[#e1e5f0] bg-[#f8f9fc] p-5 text-center">
                  <h3 className="text-[20px] font-semibold text-[#1f2432]">{uiText.toolDemo.readyToTry}</h3>
                  <button
                    type="button"
                    className="mt-4 rounded-[8px] bg-[#534ab7] px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-[#3c3489]"
                    onClick={() => navigateTo(localeGuidesPath)}
                  >
                    {uiText.guides.backToGuides}
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : pageType === 'pricing' ? (
          <div className="site-page-hero site-page-hero--mist px-6 py-16">
            <section className="mx-auto w-full max-w-[1160px]">
              <div className="text-center">
                <h1 className="text-[clamp(34px,4.8vw,56px)] font-extrabold tracking-[-0.03em] text-[#1a202c]">
                  {uiText.pricing.title}
                </h1>
                <p className="mt-2 text-[14px] text-[#6b7280]">
                  {uiText.pricing.desc}
                </p>
              </div>

              <div className="mx-auto mt-10 grid max-w-[920px] gap-4 md:grid-cols-3">
                {pricingPlans.map((plan) => (
                  <article
                    key={plan.name}
                    className={`relative rounded-[14px] border bg-white p-6 ${
                      plan.featured
                        ? 'border-[#7f77dd] shadow-[0_8px_22px_rgba(83,74,183,0.15)]'
                        : 'border-[#e5e7ef] shadow-[0_1px_3px_rgba(15,23,42,0.04)]'
                    }`}
                  >
                    {plan.featured && (
                      <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#534ab7] px-3 py-1 text-[11px] font-semibold text-white">
                        Most Popular
                      </span>
                    )}
                    <h2 className="text-center text-[24px] font-semibold text-[#1f2432]">
                      {plan.name}
                    </h2>
                    <p className="mt-3 text-center">
                      <span className="text-[52px] font-extrabold leading-none tracking-[-0.02em] text-[#534ab7]">
                        {plan.price}
                      </span>
                      <span className="ml-1 text-[16px] text-[#95a0b3]">{plan.period}</span>
                    </p>

                    <ul className="mt-6 flex min-h-[220px] flex-col gap-2.5">
                      {plan.features.map((feature) => (
                        <li
                          key={`${plan.name}-${feature}`}
                          className="flex items-start gap-2 text-[14px] text-[#4f5666]"
                        >
                          <span className="mt-[1px] text-[13px] font-bold text-[#22a06b]">✓</span>
                          <span>{feature}</span>
            </li>
                      ))}
          </ul>

                    <button
                      type="button"
                      className={`mt-2 w-full rounded-[8px] px-4 py-2.5 text-[14px] font-semibold transition ${
                        plan.featured
                          ? 'bg-[#534ab7] text-white hover:bg-[#3c3489]'
                          : 'bg-[#f4f5f8] text-[#303644] hover:bg-[#ebeef4]'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </article>
                ))}
        </div>
            </section>
          </div>
        ) : pageType === 'all-templates' ? (
          <div className="bg-transparent">
            <section className="site-page-hero site-page-hero--aurora px-6 py-14">
              <div className="mx-auto w-full max-w-[1160px] text-center">
                <p className="mx-auto inline-flex rounded-[20px] bg-[#ddd8fb] px-3 py-1 text-[12px] font-semibold text-[#3c3489]">
                  {uiText.templates.libraryTitle}
                </p>
                <h1 className="mt-4 text-[clamp(30px,4.5vw,48px)] font-extrabold tracking-[-0.03em] text-[#1a202c]">
                  {uiText.templates.allTemplatesTitle}
                </h1>
                <p className="mx-auto mt-3 max-w-[860px] text-[15px] leading-7 text-[#4a5568]">
                  {uiText.templates.allTemplatesDesc}
                </p>
              </div>
            </section>

            <section className="site-page-transition-section site-page-transition-section--aurora px-6 py-8">
              <div className="site-page-overlap-panel mx-auto w-full max-w-[1160px] overflow-hidden rounded-[16px] border border-[#e2e8f0] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e2e8f0] bg-[#fafbfc] px-5 py-4">
                  <p className="text-[14px] font-semibold text-[#2f3542]">
                    {allTemplatesTab === 'category'
                      ? `${uiText.templates.categories} (${allTemplatesSections.length})`
                      : `${localizeString('A-Z Index')} (${allTemplatesAlphabetGroups.length} ${localizeString('letters')})`}
                  </p>
                  <div className="inline-flex overflow-hidden rounded-[10px] border border-[#d8dcef] bg-white">
                    <button
                      type="button"
                      onClick={() => setAllTemplatesTab('category')}
                      className={`px-4 py-2 text-[12px] font-semibold transition ${
                        allTemplatesTab === 'category'
                          ? 'bg-[#534ab7] text-white'
                          : 'text-[#6a7080] hover:bg-[#f3f4f8] hover:text-[#2f3542]'
                      }`}
                    >
                      {uiText.allProducts.viewByCategory}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllTemplatesTab('alphabet')}
                      className={`border-l border-[#d8dde3] px-4 py-2 text-[12px] font-semibold transition ${
                        allTemplatesTab === 'alphabet'
                          ? 'bg-[#534ab7] text-white'
                          : 'text-[#6a7080] hover:bg-[#f3f4f8] hover:text-[#2f3542]'
                      }`}
                    >
                      {uiText.allProducts.viewAZ}
                    </button>
                  </div>
                </div>

                  {allTemplatesTab === 'category'
                    ? (
                        <div className="p-4 md:p-6">
                          {allTemplatesSections.map((section, sectionIndex) => (
                            <Fragment key={section.title}>
                              <h2
                                className={`text-[14px] font-semibold text-[#2f3542]${
                                  sectionIndex > 0 ? ' mt-6 border-t border-[#eef2f7] pt-6' : ''
                                }`}
                              >
                                {section.displayTitle ?? section.title}
                              </h2>
                              <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                                {section.items.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.targetPath}
                                    className="rounded-[8px] px-3 py-1.5 text-[12.5px] text-[#4f5666] transition hover:bg-[#f5f3ff] hover:text-[#534ab7]"
                                    onClick={(event) => {
                                      event.preventDefault()
                                      navigateTo(item.targetPath)
                                    }}
                                  >
                                    {item.displayName ?? item.name}
                                  </a>
                                ))}
                              </div>
                            </Fragment>
                          ))}
                        </div>
                      )
                    : (
                        <div className="grid gap-4 p-4 md:grid-cols-2 md:p-6 lg:grid-cols-3">
                          {allTemplatesAlphabetGroups.map((group) => (
                            <section
                              key={group.letter}
                              className="rounded-[12px] border border-[#e2e8f0] bg-[#fafbfc] p-4"
                            >
                              <h2 className="inline-flex rounded-[8px] bg-[#eeedfe] px-3 py-1 text-[12px] font-semibold tracking-wide text-[#3c3489]">
                                {group.letter}
                              </h2>
                              <div className="mt-3 grid gap-2">
                                {group.items.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.targetPath}
                                    className="rounded-[8px] px-3 py-1.5 text-[12.5px] text-[#4f5666] transition hover:bg-[#f5f3ff] hover:text-[#534ab7]"
                                    onClick={(event) => {
                                      event.preventDefault()
                                      navigateTo(item.targetPath)
                                    }}
                                  >
                                    {item.displayName ?? item.name}
                                  </a>
                                ))}
                              </div>
                            </section>
                          ))}
                        </div>
                      )}
              </div>
            </section>
          </div>
        ) : currentTemplateRoute?.kind === 'library' && currentTemplateLibrary ? (
          <div className="bg-transparent">
            <section className="site-page-top-surface border-b border-[#e3e7ef] px-6 py-12">
              <div className="mx-auto w-full max-w-[1160px]">
                <h1 className="text-[50px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#1a202c]">
                  {currentTemplateLibrary.title}
                </h1>
                <p className="mt-2 text-[20px] text-[#556074]">
                  {currentTemplateLibrary.subtitle}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {currentTemplateLibrary.filters.map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveTemplateFilter(filter)}
                      className={`rounded-full px-3 py-1.5 text-[13px] font-semibold transition ${
                        activeTemplateFilter === filter
                          ? 'bg-[#534ab7] text-white'
                          : 'border border-[#d6dcea] bg-white text-[#5d6577] hover:border-[#b8b2ea] hover:text-[#534ab7]'
                      }`}
                    >
                      {localizeString(filter)}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-6 py-10">
              <div className="mx-auto grid w-full max-w-[1160px] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTemplateCards.map((card) => (
                  <article
                    key={card.name}
                    className="cursor-pointer rounded-[12px] border border-[#dbe2ef] bg-white p-3 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition hover:-translate-y-[2px] hover:shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
                    onClick={() => {
                      if (!currentTemplateRoute?.key) return
                      const targetPath = currentTemplateRoute.key === 'excel'
                        ? joinPath(currentUrlLocale, 'ai-sheets', 'excel-templates', card.slug)
                        : joinPath(
                          currentUrlLocale,
                          currentTemplateRoute.key === 'resume' ? 'resume-templates' : 'presentation-templates',
                          card.slug,
                        )
                      navigateTo(targetPath)
                    }}
                  >
                    <div className="grid h-[170px] place-items-center rounded-[10px] border border-[#e5eaf3] bg-gradient-to-br from-[#f7f8fc] to-[#edf1f9]">
                      <span className="text-[13px] font-semibold text-[#7b8395]">
                        {uiText.templates.preview}
                      </span>
                    </div>
                    <h2 className="mt-3 text-[17px] font-semibold text-[#1f2432]">{card.displayName ?? card.name}</h2>
                    <p className="mt-1 text-[13px] text-[#7b8395]">{card.displayMeta ?? card.meta}</p>
                    <button
                      type="button"
                      className="mt-3 w-full rounded-[8px] bg-[#f3f4f8] px-3 py-2 text-[13px] font-semibold text-[#394054] transition hover:bg-[#eceff5]"
                    >
                      {localizeString('Use Template')}
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : currentTemplateRoute?.kind === 'detail' && currentTemplateDetail ? (
          <div className="site-page-hero site-page-hero--mist px-6 py-6">
            <section className="mx-auto w-full max-w-[1160px]">
              <div className="grid gap-6 lg:grid-cols-[0.58fr_0.42fr]">
                <div className="rounded-[12px] border border-[#d8deea] bg-[#f0f1fb] p-4">
                  <div className="grid min-h-[520px] place-items-center rounded-[10px] border border-[#d7deea] bg-[#f2f2fc]">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border-2 border-[#9e71c8] text-[18px] text-[#9e71c8]">
                      ▦
                    </span>
                  </div>
                </div>

                <div className="pt-1">
                  <h1 className="text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#1a202c]">
                    {currentTemplateDetail.displayName ?? currentTemplateDetail.name}
                  </h1>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[13px] text-[#6b7280]">
                    <span className="rounded-[4px] bg-[#e7f7f0] px-2 py-1 text-[12px] font-semibold text-[#188c63]">
                      {uiText.templates.free}
                    </span>
                    <span className="rounded-[4px] bg-[#e9f1f8] px-2 py-1 text-[12px] font-semibold text-[#376e93]">
                      {currentTemplateRoute.key === 'resume'
                        ? localizeString('ATS-Friendly')
                        : currentTemplateRoute.key === 'presentation'
                          ? localizeString('Business')
                          : localizeString('Finance')}
                    </span>
                    <span className="text-[13px] text-[#6b7280]">{currentTemplateDetail.displayMeta ?? currentTemplateDetail.meta}</span>
                  </div>

                  <div className="mt-4 flex items-center gap-5">
                    <button
                      type="button"
                      className="rounded-[9px] bg-[#534ab7] px-6 py-2.5 text-[15px] font-semibold text-white transition hover:bg-[#3c3489]"
                    >
                      {localizeString('Use Template')}
                    </button>
                    <button
                      type="button"
                      className="text-[16px] font-semibold text-[#4b5563] transition hover:text-[#1f2937]"
                    >
                      {uiText.templates.preview}
                    </button>
                  </div>
                  <p className="mt-2.5 text-[13px] text-[#a3aab8]">
                    {localizeString('Ready in one click with editable sections.')}
                  </p>
                </div>
              </div>
            </section>
          </div>
        ) : pageType === 'tool-demo' && currentToolDemo ? (
          <div className="bg-transparent">
            <section className="site-page-top-surface border-b border-[#e3e7ef] px-6 py-4">
              <div className="mx-auto w-full max-w-[1160px]">
                <div className="flex items-center gap-2 text-[12px] text-[#7b8395]">
                  <button type="button" onClick={() => navigateTo(localeHomePath)} className="hover:text-[#534ab7]">
                    {localizeString('Home')}
                  </button>
                  <span>›</span>
                  <button
                    type="button"
                    onClick={() => navigateTo(localeAllProductsPath)}
                    className="hover:text-[#534ab7]"
                  >
                    {currentToolDemo.sectionDisplayTitle ?? currentToolDemo.sectionTitle}
                  </button>
                  <span>›</span>
                  <span className="font-semibold text-[#2e3442]">{currentToolDemo.displayName ?? currentToolDemo.name}</span>
                </div>
              </div>
            </section>

            <section className="site-page-top-surface border-b border-[#e3e7ef] px-6 py-10">
              <div className="mx-auto w-full max-w-[1160px]">
                <h1 className="text-[50px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#1a202c]">
                  {currentToolDemo.displayName ?? currentToolDemo.name}
                </h1>
                <p className="mt-2 text-[20px] text-[#4e5668]">{currentToolDemo.intro}</p>
                <p className="mt-2 max-w-[760px] text-[17px] leading-8 text-[#95a0b3]">
                  {currentToolDemo.sectionTitle === 'AI Writing'
                    ? localizeString('Generate polished content faster with AI-powered drafting and rewriting.')
                    : localizeString('Upload your files and process them securely with one click. Supports multilingual workflows.')}
                </p>
              </div>
            </section>

            <section className="px-6 py-10">
              <div className="mx-auto grid w-full max-w-[1160px] gap-5 lg:grid-cols-[1fr_0.38fr]">
                <div className="rounded-[12px] border border-[#d9e0eb] bg-white p-4">
                  {currentToolDemo.sectionTitle === 'AI Writing' ? (
                    <>
                      <textarea
                        className="h-[150px] w-full resize-none rounded-[8px] border border-[#d7deeb] px-3 py-3 text-[14px] text-[#2f3542] outline-none placeholder:text-[#9aa3b5] focus:border-[#aaa4ec]"
                        placeholder={localizeString('Describe what you want to write...')}
                      />
                      <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                        <div className="flex flex-wrap gap-3">
                          <label className="flex flex-col gap-1 text-[12px] text-[#7d8596]">
                            {localizeString('Tone')}
                            <select className="h-8 min-w-[110px] rounded-[6px] border border-[#d5dbea] bg-white px-2 text-[13px] text-[#374151] outline-none">
                              <option>{localizeString('Professional')}</option>
                              <option>{localizeString('Casual')}</option>
                              <option>{localizeString('Persuasive')}</option>
                              <option>{localizeString('Informative')}</option>
                              <option>{localizeString('Creative')}</option>
                            </select>
                          </label>
                          <label className="flex flex-col gap-1 text-[12px] text-[#7d8596]">
                            {localizeString('Length')}
                            <select className="h-8 min-w-[130px] rounded-[6px] border border-[#d5dbea] bg-white px-2 text-[13px] text-[#374151] outline-none">
                              <option>{localizeString('Short (100 words)')}</option>
                              <option>{localizeString('Medium (300 words)')}</option>
                              <option>{localizeString('Long (600 words)')}</option>
                              <option>{localizeString('Extended (1000+ words)')}</option>
                            </select>
                          </label>
                        </div>
                        <button
                          type="button"
                          className="h-8 rounded-[6px] bg-[#534ab7] px-8 text-[13px] font-semibold text-white transition hover:bg-[#3c3489]"
                        >
                          {localizeString('Generate')}
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="grid min-h-[280px] place-items-center rounded-[10px] border border-dashed border-[#cfd8e8] bg-[#fafbff] p-6 text-center">
                      <div>
                        <span className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-[12px] border-2 border-[#7f77dd] text-[18px] text-[#534ab7]">
                          ↑
                        </span>
                        <p className="mt-4 text-[26px] font-semibold text-[#2e3442]">{uiText.toolDemo.dropFiles}</p>
                        <p className="mt-1 text-[17px] text-[#7d8596]">{uiText.toolDemo.orClick}</p>
                        <p className="mt-2 text-[16px] text-[#6f7788]">
                          {localizeString('Supported formats:')}
                          {' '}
                          <span className="font-semibold text-[#303644]">
                            {currentToolDemo.sectionTitle === 'PDF Tools'
                              ? '.pdf'
                              : currentToolDemo.sectionTitle === 'AI Tools'
                                ? '.jpg,.jpeg,.png,.webp,.gif'
                                : currentToolDemo.sectionTitle === 'AI Sheets'
                                  ? '.xls,.xlsx,.csv'
                                  : '.ppt,.pptx,.pdf'}
                          </span>
                          {' '}
                          · {localizeString('Max file size:')}
                          {' '}
                          <span className="font-semibold text-[#303644]">200MB</span>
                        </p>
                        <button
                          type="button"
                          className="mt-4 rounded-[8px] bg-[#534ab7] px-7 py-2 text-[16px] font-semibold text-white transition hover:bg-[#3c3489]"
                        >
                          {localizeString('Browse Files')}
                        </button>
                        <p className="mt-3 text-[16px] text-[#7d8596]">
                          {localizeString('Daily limit: 3 free conversions')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <aside className="rounded-[12px] border border-[#d9e0eb] bg-white p-4">
                  <h2 className="text-[30px] font-semibold text-[#1f2432]">{uiText.toolDemo.howItWorks}</h2>
                  <ol className="mt-4 flex flex-col gap-3 text-[17px] text-[#5d6475]">
                    {[uiText.toolDemo.step1, uiText.toolDemo.step2, uiText.toolDemo.step3].map((step, index) => (
                      <li key={step} className="flex items-center gap-2">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e8e9ff] text-[12px] font-semibold text-[#534ab7]">
                          {index + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </aside>
              </div>
            </section>

            <section className="bg-[#efeee9] px-6 py-10">
              <div className="mx-auto w-full max-w-[1160px]">
                <h2 className="text-[45px] font-semibold tracking-[-0.02em] text-[#1f2432]">
                  {uiText.download.faq}
                </h2>
                <div className="mt-6 divide-y divide-[#d7dce6] rounded-[12px] border border-[#dde1ea] bg-white">
                  {[
                    localizeString(`Is ${currentToolDemo.displayName ?? currentToolDemo.name} free to use?`),
                    localizeString('What file formats are supported?'),
                    localizeString('Is my file secure?'),
                    localizeString('How accurate is the result?'),
                  ].map((question) => (
                    <button
                      key={question}
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-4 text-left text-[17px] font-medium text-[#2e3442] transition hover:bg-[#f8f9fc]"
                    >
                      <span>{question}</span>
                      <span className="text-[12px] text-[#9aa3b5]">▾</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : pageType === 'all-products' ? (
          <AllProductsPage
            copy={uiText.allProducts}
            sections={localizedAllProductsSections}
            currentUrlLocale={currentUrlLocale}
            navigateTo={navigateTo}
          />
        ) : pageType === 'answers' ? (
          <div className="bg-transparent">
            <section className="site-page-hero site-page-hero--warm relative overflow-hidden px-6 py-10">
              <div
                className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] md:block"
                  aria-hidden="true"
                >
                <div className="absolute right-14 top-3 h-20 w-20 rounded-full bg-[#f78ac7]/70" />
                <div className="absolute right-28 top-9 h-16 w-16 rounded-full bg-[#88c7ff]/80" />
                <div className="absolute right-20 top-28 h-10 w-56 rounded-[999px] bg-white/45" />
                <div className="absolute right-44 top-24 h-7 w-28 rounded-[999px] bg-[#c7bef8]/50" />
              </div>
              <div className="mx-auto w-full max-w-[1160px]">
                <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[#6a7080]">
                  {answersUiText.heroKicker}
                </p>
                <h1 className="mt-2 text-[clamp(30px,4.2vw,46px)] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#1a202c]">
                  {answersUiText.heroTitle}
                </h1>
                <p className="mt-3 max-w-[720px] text-[14px] leading-7 text-[#4b5263]">
                  {answersUiText.heroDescription}
                </p>
                <div className="mt-6 flex w-full max-w-[660px] items-center rounded-[10px] border border-[#d4dae7] bg-white p-1 shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
                  <input
                    className="h-10 flex-1 rounded-[8px] border-none px-3 text-[13px] text-[#2d3442] outline-none placeholder:text-[#9aa0ae]"
                    type="text"
                    placeholder={answersUiText.heroSearchPlaceholder}
                  />
                  <button
                    type="button"
                    className="h-10 rounded-[8px] bg-[#534ab7] px-5 text-[13px] font-semibold text-white transition hover:bg-[#3c3489]"
                  >
                    {answersUiText.heroSearchButton}
                  </button>
                </div>
              </div>
            </section>

            <section className="site-page-transition-section site-page-transition-section--lift site-page-transition-section--warm px-6 py-10">
              <div className="mx-auto w-full max-w-[1160px]">
                <h2 className="text-[34px] font-semibold tracking-[-0.02em] text-[#1a202c]">
                  {answersUiText.popularTitle}
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {answersCategories.map((item) => (
                    <article
                      key={item.slug}
                      className="cursor-pointer rounded-[8px] border border-[#dee4ee] bg-white px-4 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                      role="button"
                      tabIndex={0}
                      onClick={() => navigateTo(getLocaleAnswersForumPath(currentLocale, item.slug))}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          navigateTo(getLocaleAnswersForumPath(currentLocale, item.slug))
                        }
                      }}
                    >
                      <span
                        className={`inline-flex h-9 w-9 items-center justify-center rounded-[6px] text-[12px] font-semibold uppercase text-white ${item.accent}`}
                      >
                        {item.icon}
                      </span>
                      <h3 className="mt-3 text-[15px] font-semibold text-[#1f2432]">
                        {item.displayTitle ?? item.title}
                      </h3>
                      <p className="mt-0.5 text-[12px] font-medium text-[#7b8395]">
                        {item.displayMeta ?? item.meta}
                      </p>
                      <p className="mt-2 text-[12.5px] leading-6 text-[#545b6d]">{item.desc}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-6 pb-10">
              <div className="mx-auto w-full max-w-[1160px]">
                <h2 className="text-[34px] font-semibold tracking-[-0.02em] text-[#1a202c]">
                  {answersUiText.howToTitle}
                </h2>
                <p className="mt-2 text-[13px] text-[#5d6475]">
                  {answersUiText.howToDescription}
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  {localizedAnswersHowToItems.map((item, index) => (
                    <article
                      key={item.title}
                      className="rounded-[8px] border border-[#dee4ee] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                    >
                      <span className="inline-flex rounded-[6px] bg-[#eeedfe] px-2 py-1 text-[11px] font-semibold text-[#3c3489]">
                        {answersUiText.stepLabel} {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="mt-3 text-[15px] font-semibold text-[#1f2432]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[12.5px] leading-6 text-[#545b6d]">{item.desc}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="px-6 pb-14">
              <div className="mx-auto w-full max-w-[1160px]">
                <h2 className="text-[34px] font-semibold tracking-[-0.02em] text-[#1a202c]">
                  {answersUiText.communitiesTitle}
                </h2>
                <p className="mt-2 text-[13px] text-[#5d6475]">
                  {answersUiText.communitiesDescription}
                </p>
                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {localizedAnswersCommunityCards.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[8px] border border-[#dee4ee] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                    >
                      <h3 className="text-[15px] font-semibold text-[#1f2432]">{item.title}</h3>
                      <p className="mt-2 text-[12.5px] leading-6 text-[#545b6d]">{item.desc}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : pageType === 'answers-forum' ? (
          <div className="bg-transparent">
            <section className="site-page-hero site-page-hero--warm relative overflow-hidden border-b border-[#d9dee8] px-6 py-8">
              <div
                className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] md:block"
                aria-hidden="true"
              >
                <div className="absolute right-5 top-3 h-12 w-52 rounded-[8px] bg-[#d8d3f7]/85" />
                <div className="absolute right-12 top-20 h-12 w-64 rounded-[8px] bg-[#c7d8fa]/85" />
                <div className="absolute right-24 top-9 h-12 w-48 rounded-[8px] bg-[#f0c9e7]/80" />
                <div className="absolute right-16 top-36 h-10 w-56 rounded-[8px] bg-[#d8d3f7]/65" />
              </div>
              <div className="mx-auto w-full max-w-[1160px]">
                <button
                  type="button"
                  className="text-[12px] font-medium text-[#5f6880] transition hover:text-[#3e475a]"
                  onClick={() => navigateTo(localeAnswersPath)}
                >
                  {answersUiText.forumBackHome}
                </button>
                <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#72798a]">
                  {answersUiText.forumKicker}
                </p>
                <h1 className="mt-2 text-[clamp(30px,4vw,42px)] font-extrabold tracking-[-0.02em] text-[#1f2432]">
                  {activeAnswersForumCategoryDisplayTitle}
                  {' '}
                  {answersUiText.forumTitleSuffix}
                </h1>
                <p className="mt-2 max-w-[760px] text-[13px] leading-6 text-[#4e5567]">
                  {answersForumIntroText}
                </p>
              </div>
            </section>

            <section className="site-page-transition-section site-page-transition-section--warm px-6 py-8">
              <div className="site-page-overlap-panel mx-auto w-full max-w-[1160px] overflow-hidden rounded-[8px] border border-[#d9dee9] bg-white">
                <div className="grid lg:grid-cols-[260px_minmax(0,1fr)]">
                  <aside className="border-b border-[#e4e8f1] bg-[#f8f9fc] p-4 lg:border-b-0 lg:border-r lg:p-5">
                    <h2 className="text-[34px] font-semibold tracking-[-0.02em] text-[#1f2432]">
                      {answersUiText.forumFiltersTitle}
                    </h2>
                    <div className="mt-4 border-y border-[#dfe3ec] py-5">
                      {activeAnswersForumFilterSections.map((section) => (
                        <section key={section.title}>
                          <h3 className="text-[18px] font-semibold text-[#1f2432]">{section.title}</h3>
                          <div className="mt-2 space-y-1.5">
                            {section.options.map((option) => (
                              <button
                                key={`${section.title}-${option.label}`}
                                type="button"
                                className="flex w-full items-center gap-2 rounded-[6px] px-0.5 py-1.5 text-left text-[13.5px] text-[#364052] transition hover:bg-[#eef2f8]"
                              >
                                <span className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border border-[#bfc6d5]">
                                  <span
                                    className={`h-2.5 w-2.5 rounded-full ${
                                      option.active ? 'bg-[#1e73d8]' : 'bg-transparent'
                                    }`}
                                  />
                                </span>
                                <span className="truncate">{option.label}</span>
                                <span
                                  className={`ml-auto inline-flex min-w-[38px] justify-center rounded-full px-2 py-[1px] text-[11px] font-semibold ${
                                    option.active
                                      ? 'bg-[#1e73d8] text-white'
                                      : 'bg-[#e5e7eb] text-[#5e6677]'
                                  }`}
                                >
                                  {option.count}
                                </span>
                              </button>
                            ))}
                          </div>
                        </section>
                      ))}
                    </div>
                  </aside>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e4e8f1] px-4 py-3 text-[13px] lg:px-5">
                      <p className="font-medium text-[#2f3542]">
                        {answersForumSummaryText}
                      </p>
                      <button
                        type="button"
                        className="text-[12px] font-medium text-[#5b6478] transition hover:text-[#3d4658]"
                      >
                        {answersUiText.forumSortLabel}
                      </button>
                    </div>

                    <div className="divide-y divide-[#e8ecf3]">
                      {activeAnswersForumQuestionItems.map((item) => (
                        <article
                          key={item.title}
                          className="group flex flex-wrap items-start gap-3 px-4 py-4 transition hover:bg-[#fbfcff] lg:px-5"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              {item.badge ? (
                                <span className="inline-flex rounded-[999px] bg-[#e8f7eb] px-2 py-0.5 text-[11px] font-semibold text-[#1b7a3d]">
                                  {item.badge}
                                </span>
                              ) : null}
                              <button
                                type="button"
                                className="truncate text-left text-[15px] font-semibold text-[#1f4a7f] transition group-hover:text-[#153863]"
                              >
                                {item.title}
                              </button>
                            </div>
                            <p className="mt-1 text-[12.5px] leading-6 text-[#51596b]">{item.excerpt}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-[#6d7587]">
                              <span className="rounded-[4px] bg-[#f1f4fa] px-2 py-0.5 text-[#4f586b]">
                                {item.topic}
                              </span>
                              <span>{answersUiText.forumRepliesLabel} {item.replies}</span>
                              <span>·</span>
                              <span>{answersUiText.forumVotesLabel} {item.votes}</span>
                            </div>
                          </div>
                          <div className="w-full text-[12px] text-[#7a8192] sm:w-[200px] sm:text-right">
                            <p className="font-medium text-[#4f5668]">{item.author}</p>
                            <p className="mt-1">{answersUiText.forumUpdatedPrefix} {item.updatedAt}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : pageType === 'locale' ? (
          <LocalePage contentLanguage={contentLanguage} navigateTo={navigateTo} />
        ) : null}
      </main>

      <footer className="site-footer hv2-footer hv2-chrome">
        <div className="hv2-container site-footer-shell">
          <div className="hv2-footer__top site-footer-top">
            <div className="hv2-footer__brand site-footer-brand-col">
              <img
                className="hv2-footer__logo site-footer-brand-logo"
                src="/images/home-v2/footer-logo-wps.svg"
                alt="WPS"
                width={96}
                height={24}
                draggable={false}
                decoding="async"
              />
              <p className="hv2-footer__address site-footer-address">
                WPS SOFTWARE PTE. LTD.
                <br />
                6 RAFFLES QUAY #14-06
                <br />
                SINGAPORE (048580)
              </p>
            </div>

            <nav className="hv2-footer__col site-footer-links-col" aria-labelledby="hv2-footer-product">
              <p id="hv2-footer-product" className="hv2-footer__col-title site-footer-heading">
                {uiText.footer.product}
              </p>
              <ul className="hv2-footer__links site-footer-link-list">
                {footerProductLinks.map((link) => (
                  <li key={`footer-product-${link.id}`}>
                    <a
                      href={link.href}
                      className="hv2-footer__link site-footer-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="hv2-footer__col site-footer-links-col" aria-labelledby="hv2-footer-company">
              <p id="hv2-footer-company" className="hv2-footer__col-title site-footer-heading">
                {uiText.footer.company}
              </p>
              <ul className="hv2-footer__links site-footer-link-list">
                {footerCompanyLinks.map((link) => (
                  <li key={`footer-company-${link.id}`}>
                    <a
                      href={link.href}
                      className="hv2-footer__link site-footer-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="hv2-footer__col site-footer-links-col" aria-labelledby="hv2-footer-support">
              <p id="hv2-footer-support" className="hv2-footer__col-title site-footer-heading">
                {uiText.footer.support}
              </p>
              <ul className="hv2-footer__links site-footer-link-list">
                {footerSupportLinks.map((link) => (
                  <li key={`footer-support-${link.id}`}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="hv2-footer__link site-footer-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="hv2-footer__link site-footer-link"
                        onClick={(event) => {
                          event.preventDefault()
                          navigateTo(link.href)
                        }}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <nav
              className="hv2-footer__col hv2-footer__col--social site-footer-social-col"
              aria-labelledby="hv2-footer-social"
            >
              <p id="hv2-footer-social" className="hv2-footer__col-title site-footer-heading">
                {uiText.footer.followUs}
              </p>
              <ul className="hv2-footer__socials site-footer-social-row">
                {footerSocialItems.map((social) => {
                  const Icon = FOOTER_SOCIAL_ICONS[social.id]
                  return (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        aria-label={social.label}
                        className="hv2-footer__social site-footer-social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {Icon ? <Icon size={18} aria-hidden="true" /> : null}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
          <p className="hv2-footer__copyright site-footer-copyright">
            Copyright © Kingsoft Office Software, All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
