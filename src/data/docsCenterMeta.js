import { writerHelpContent } from './writerHelpContent.js'
import { installSetupHelpContent } from './installSetupHelpContent.js'
import {
  aiReadAloudHelpContent,
  createDocumentHelpContent,
  shareAfterCompressionHelpContent,
} from './wpsWriterQuickStartHelpContent.js'

export const ALL_DOC_LANGS = ['zh-cn', 'zh-tw', 'en-us', 'ja-jp', 'ko-kr', 'es-mx']

export function createDocsPathKey(pathParts = []) {
  return pathParts.filter(Boolean).join(' / ')
}

export { writerHelpContent }

const zhOnlyPublishedLangs = ['zh-cn']

function createInternalDocEntry(
  pathParts,
  routeSlug,
  helpContent,
  publishedLangs = zhOnlyPublishedLangs,
  options = {},
) {
  return {
    pathParts,
    routeSlug,
    docRouteSlug: options.docRouteSlug ?? '',
    sectionRouteSlug: options.sectionRouteSlug ?? '',
    blockRouteSlug: options.blockRouteSlug ?? '',
    helpContent,
    publishedLangs: [...publishedLangs],
  }
}

const staticMetaEntries = [
  createInternalDocEntry(
    ['新手入门', '快速上手', '安装与登录'],
    'install-sign-in',
    installSetupHelpContent,
    ALL_DOC_LANGS,
  ),
  createInternalDocEntry(
    ['新手入门', 'WPS 文字'],
    'wps-writer',
    writerHelpContent,
    ALL_DOC_LANGS,
  ),
  createInternalDocEntry(
    ['WPS文字', '快速入门', '新建文档'],
    'create-document',
    createDocumentHelpContent,
    ALL_DOC_LANGS,
    { blockRouteSlug: 'quick-start' },
  ),
  createInternalDocEntry(
    ['WPS文字', '快速入门', 'AI朗读'],
    'ai-read-aloud',
    aiReadAloudHelpContent,
    ALL_DOC_LANGS,
    { blockRouteSlug: 'quick-start' },
  ),
  createInternalDocEntry(
    ['WPS文字', '快速入门', '压缩后分享'],
    'share-after-compression',
    shareAfterCompressionHelpContent,
    ALL_DOC_LANGS,
    { blockRouteSlug: 'quick-start' },
  ),
]

export function buildDocsStaticMetaMap() {
  return Object.fromEntries(
    staticMetaEntries.map((entry) => {
      const pathKey = createDocsPathKey(entry.pathParts)
      return [
        pathKey,
        {
          ...entry,
          pathKey,
        },
      ]
    }),
  )
}
