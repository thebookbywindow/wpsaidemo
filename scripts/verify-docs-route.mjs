import assert from 'node:assert/strict'
import {
  buildCanonicalDocPath,
  getLocaleDocsPath,
  normalizeDocsRoute,
  parseDocsRoute,
  resolveDocRouteSlug,
} from '../src/utils/docsRoute.js'
import { buildDocsStaticMetaMap } from '../src/data/docsCenterMeta.js'

const sectionSlugMap = {
  'Getting Started': 'getting-started',
}

function fallbackSlug(text) {
  return sectionSlugMap[text] ?? text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

const cases = [
  {
    name: 'L1+L2 feature route',
    pathname: '/en-us/docs/getting-started/wps-writer',
    expected: {
      sectionSlug: 'getting-started',
      itemSlug: 'wps-writer',
      platformId: '',
      isLegacyFlatRoute: false,
    },
  },
  {
    name: 'legacy flat feature route',
    pathname: '/en-us/docs/wps-writer',
    expected: {
      docRouteSlug: 'wps-writer',
      isLegacyFlatRoute: true,
    },
  },
  {
    name: 'L1+L2+platform detail route',
    pathname: '/en-us/docs/getting-started/wps-writer/windows/getting-started',
    expected: {
      sectionSlug: 'getting-started',
      itemSlug: 'wps-writer',
      platformId: 'windows',
      detailSectionId: 'getting-started',
      isLegacyFlatRoute: false,
    },
  },
  {
    name: 'legacy flat platform detail route',
    pathname: '/en-us/docs/wps-writer/windows/steps',
    expected: {
      docRouteSlug: 'wps-writer',
      platformId: 'windows',
      detailSectionId: 'getting-started',
      isLegacyFlatRoute: true,
    },
  },
  {
    name: 'L1 section route',
    pathname: '/en-us/docs/getting-started',
    expected: {
      sectionSlug: 'getting-started',
      itemSlug: '',
      isLegacyFlatRoute: false,
    },
  },
]

for (const testCase of cases) {
  const parsed = parseDocsRoute(testCase.pathname)
  Object.entries(testCase.expected).forEach(([key, value]) => {
    assert.equal(parsed[key], value, `${testCase.name}: ${key}`)
  })
}

const normalizedLegacy = normalizeDocsRoute(parseDocsRoute('/en-us/docs/wps-writer'))
assert.equal(normalizedLegacy.sectionSlug, 'getting-started')
assert.equal(normalizedLegacy.itemSlug, 'wps-writer')

assert.equal(
  buildCanonicalDocPath('en-us', normalizedLegacy).toLowerCase(),
  '/en-us/docs/getting-started/wps-writer',
)

assert.equal(
  getLocaleDocsPath('en-us', 'getting-started/wps-writer', 'windows', 'getting-started').toLowerCase(),
  '/en-us/docs/getting-started/wps-writer/windows/getting-started',
)

const metaMap = buildDocsStaticMetaMap()
const writerMeta = Object.values(metaMap).find((meta) => meta.routeSlug === 'wps-writer')
assert.ok(writerMeta, 'writer meta exists')

assert.equal(
  resolveDocRouteSlug(writerMeta, sectionSlugMap, ['Getting Started', 'WPS Writer'], fallbackSlug),
  'getting-started/wps-writer',
)

console.log('docs route verification passed')
