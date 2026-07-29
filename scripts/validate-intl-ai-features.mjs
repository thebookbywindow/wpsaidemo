import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  getIntlAiTabIconSrc,
  INTL_AI_TAB_HERO_IDS,
  listIntlAiFeatureItems,
  resolveIntlAiFeatureItem,
  validateIntlAiFeatures,
} from '../src/data/intlAiFeatures.js'
import { INTL_AI_FEATURE_META } from '../src/data/intlAiFeatureMeta.js'
import { uiTextByLanguage } from '../src/data/uiText.js'
import {
  INTL_AI_GROUP_PREVIEW_LIMIT,
  canExpandIntlAiGroup,
  getIntlAiGroupVisibleItems,
} from '../src/hooks/useHomeIntlAiGroupExpand.js'
import {
  buildIntlAiGroupTabs,
  resolveIntlAiActiveGroupId,
} from '../src/hooks/useHomeIntlAiGroupTabs.js'
import {
  getAdjacentIntlAiTabId,
  getIntlAiProgressFromTabIndex,
  getIntlAiScrollablePx,
  getIntlAiScrollProgress,
  getIntlAiTabHorizontalScrollLeft,
  getIntlAiTabIndexFromProgress,
  HOME_INTL_AI_STICKY_GAP_PX,
  HOME_INTL_AI_TAB_HYSTERESIS,
} from '../src/hooks/useHomeIntlAiTabsScrollPin.js'
import {
  clampIntlAiFeatureIndex,
  stepIntlAiFeatureIndex,
} from '../src/hooks/useHomeIntlAiFeatureCarousel.js'
import {
  applyWheelDeltaToScrollTop,
  getIntlAiViewportFitMaxHeightPx,
  shouldTrapIntlAiGroupWheel,
} from '../src/hooks/useHomeIntlAiGroupBodyScroll.js'
import { hasIntentionalLocationHash } from '../src/hooks/useHomeScrollTopOnMount.js'
import {
  filterIntlAiFeatureGroups,
  normalizeIntlAiSearchQuery,
  splitIntlAiLabelByQuery,
} from '../src/utils/intlAiFeaturesSearch.js'
import {
  pickBestImageUrl,
  scoreWpsProductScreenshot,
} from './scrape-intl-ai-feature-meta.mjs'

const structure = validateIntlAiFeatures()
const errors = [...structure.errors]
const cases = []

function assert(name, condition, detail = '') {
  cases.push({ name, ok: Boolean(condition), detail })
  if (!condition) errors.push(`${name}${detail ? ` — ${detail}` : ''}`)
}

const four = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }]
const three = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]

assert('preview limit is 3', INTL_AI_GROUP_PREVIEW_LIMIT === 3)
assert('normal collapsed shows 3 of 4', getIntlAiGroupVisibleItems(four, false).length === 3)
assert('normal expanded shows all 4', getIntlAiGroupVisibleItems(four, true).length === 4)
assert('boundary exactly 3 → no expand', canExpandIntlAiGroup(three) === false)
assert('boundary 4 → can expand', canExpandIntlAiGroup(four) === true)
assert('empty items → []', getIntlAiGroupVisibleItems([], false).length === 0)
assert('null items → []', getIntlAiGroupVisibleItems(null, true).length === 0)
assert('missing items → no expand', canExpandIntlAiGroup(undefined) === false)
assert(
  'collapsed keeps first three ids',
  getIntlAiGroupVisibleItems(four, false)
    .map((i) => i.id)
    .join(',') === 'a,b,c',
)

const sampleGroups = [
  { id: 'writer', title: 'Writer' },
  { id: 'photos', title: 'Photos / Visual AI' },
  { id: 'airpage', title: 'AirPage' },
]
assert(
  'tabs use short labels',
  buildIntlAiGroupTabs(sampleGroups, { photos: 'Photos' })
    .map((t) => t.label)
    .join('|') === 'Writer|Photos|AirPage',
)
assert(
  'active id falls back when missing',
  resolveIntlAiActiveGroupId(sampleGroups, 'missing') === 'writer',
)
assert(
  'active id keeps valid selection',
  resolveIntlAiActiveGroupId(sampleGroups, 'airpage') === 'airpage',
)
assert('empty groups → empty active id', resolveIntlAiActiveGroupId([], 'writer') === '')
assert(
  'capsule starts with Copilot tab label',
  buildIntlAiGroupTabs(
    [{ id: 'copilot', title: 'Office Copilot' }, { id: 'writer', title: 'Writer' }],
    { copilot: 'Copilot' },
  )[0].label === 'Copilot',
)

const searchSampleGroups = [
  {
    id: 'writer',
    title: 'Writer',
    items: [
      { id: 'ai-writer', label: 'AI Writer' },
      { id: 'spell-check', label: 'Spell Check' },
    ],
  },
  {
    id: 'photos',
    title: 'Photos / Visual AI',
    items: [{ id: 'photo-editor', label: 'AI Photo Editor' }],
  },
  {
    id: 'forms',
    title: 'Forms',
    items: [{ id: 'smart-form', label: 'Smart Form' }],
  },
]
assert('search normalize trims + lowercases', normalizeIntlAiSearchQuery('  PDF  ') === 'pdf')
assert(
  'search empty query returns same groups ref',
  filterIntlAiFeatureGroups(searchSampleGroups, '   ') === searchSampleGroups,
)
assert(
  'search filters by link label',
  filterIntlAiFeatureGroups(searchSampleGroups, 'spell')
    .map((g) => `${g.id}:${g.items.map((i) => i.id).join(',')}`)
    .join('|') === 'writer:spell-check',
)
assert(
  'search hides empty groups',
  filterIntlAiFeatureGroups(searchSampleGroups, 'zzz').length === 0,
)
assert(
  'search ignores group title-only matches',
  filterIntlAiFeatureGroups(searchSampleGroups, 'Visual').length === 0,
)
assert(
  'search highlight splits matched span',
  splitIntlAiLabelByQuery('AI Photo Editor', 'photo')
    .map((part) => `${part.match ? 'M' : 'T'}:${part.text}`)
    .join('|') === 'T:AI |M:Photo|T: Editor',
)
assert(
  'search highlight empty query is plain',
  splitIntlAiLabelByQuery('AI Writer', '  ').length === 1 &&
    splitIntlAiLabelByQuery('AI Writer', '  ')[0].match === false,
)

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const expectedTabIcons = {
  copilot: '/icons/wps/copilot.svg',
  writer: '/icons/wps/docs.svg',
  spreadsheet: '/icons/wps/sheets.svg',
  presentation: '/icons/wps/slides.svg',
  pdf: '/icons/wps/pdf.svg',
  photos: '/icons/wps/photos.svg',
  airpage: '/icons/wps/airpage.svg',
  airsheet: '/icons/wps/airsheet.svg',
  forms: '/icons/wps/forms.svg',
  dbsheet: '/icons/wps/dbsheet.svg',
}
for (const [tabId, iconSrc] of Object.entries(expectedTabIcons)) {
  assert(
    `tab icon map ${tabId}`,
    getIntlAiTabIconSrc(tabId) === iconSrc && INTL_AI_TAB_HERO_IDS[tabId] != null,
  )
  const diskPath = join(rootDir, 'public', iconSrc.replace(/^\//, ''))
  assert(`tab icon file exists ${tabId}`, existsSync(diskPath), diskPath)
}
assert(
  'tabs include iconSrc from map',
  buildIntlAiGroupTabs([{ id: 'writer', title: 'Writer' }])[0].iconSrc ===
    '/icons/wps/docs.svg',
)
assert('unknown tab icon → null', getIntlAiTabIconSrc('missing') == null)

const swipeTabs = [
  { id: 'copilot' },
  { id: 'writer' },
  { id: 'spreadsheet' },
]
assert(
  'scroll down / swipe up → next tab',
  getAdjacentIntlAiTabId(swipeTabs, 'copilot', 1) === 'writer',
)
assert(
  'scroll up / swipe down → prev tab',
  getAdjacentIntlAiTabId(swipeTabs, 'writer', -1) === 'copilot',
)
assert(
  'scroll clamps at first',
  getAdjacentIntlAiTabId(swipeTabs, 'copilot', -1) === 'copilot',
)
assert(
  'scroll clamps at last',
  getAdjacentIntlAiTabId(swipeTabs, 'spreadsheet', 1) === 'spreadsheet',
)
assert('scroll empty tabs → ""', getAdjacentIntlAiTabId([], 'copilot', 1) === '')

assert('sticky gap is 20px', HOME_INTL_AI_STICKY_GAP_PX === 20)
assert(
  'pin progress 0 before sticky',
  getIntlAiScrollProgress({ trackTop: 200, stickyTop: 80, scrollable: 900 }) === 0,
)
assert(
  'pin progress 1 at end of track',
  getIntlAiScrollProgress({ trackTop: -820, stickyTop: 80, scrollable: 900 }) === 1,
)
assert(
  'pin progress mid-track',
  Math.abs(
    getIntlAiScrollProgress({ trackTop: -370, stickyTop: 80, scrollable: 900 }) - 0.5,
  ) < 0.001,
)
assert(
  'progress → first tab',
  getIntlAiTabIndexFromProgress(0, 10) === 0,
)
assert(
  'progress → last tab',
  getIntlAiTabIndexFromProgress(1, 10) === 9,
)
assert(
  'progress → mid tab',
  getIntlAiTabIndexFromProgress(0.5, 5) === 2,
)
assert(
  'single tab → index 0',
  getIntlAiTabIndexFromProgress(0.8, 1) === 0,
)
assert(
  'hysteresis keeps current near boundary',
  getIntlAiTabIndexFromProgress(0.5 / 9, 10, 0, HOME_INTL_AI_TAB_HYSTERESIS) === 0,
)
assert(
  'hysteresis advances after buffer',
  getIntlAiTabIndexFromProgress((0.5 + HOME_INTL_AI_TAB_HYSTERESIS + 0.02) / 9, 10, 0) === 1,
)
assert(
  'locked scrollable ignores live panel shrink',
  getIntlAiScrollablePx(2000, 400) === 1600 &&
    getIntlAiScrollablePx(2000, 300) === 1700 &&
    getIntlAiScrollablePx(2000, 400) === getIntlAiScrollablePx(2000, 400),
)
assert(
  'scrollable floor is 1',
  getIntlAiScrollablePx(100, 100) === 1 && getIntlAiScrollablePx(50, 80) === 1,
)
assert(
  'group max-height fits viewport bottom',
  getIntlAiViewportFitMaxHeightPx({ viewportHeight: 800, top: 200, bottomGap: 16 }) === 584,
)
assert(
  'group max-height floors on tiny space',
  getIntlAiViewportFitMaxHeightPx({ viewportHeight: 200, top: 180, minHeight: 160 }) === 160,
)
assert(
  'group max-height empty viewport → min',
  getIntlAiViewportFitMaxHeightPx({ viewportHeight: 0, top: 10 }) === 160,
)
assert('group wheel always traps outer scroll', shouldTrapIntlAiGroupWheel() === true)
assert(
  'wheel delta applies to list scrollTop',
  (() => {
    const el = { scrollTop: 10, clientHeight: 100 }
    applyWheelDeltaToScrollTop(el, 40, 0)
    return el.scrollTop === 50
  })(),
)
assert(
  'wheel delta null scroller → 0',
  applyWheelDeltaToScrollTop(null, 20, 0) === 0,
)

assert(
  'reject unsplash stock as product shot',
  scoreWpsProductScreenshot({
    src: 'https://images.unsplash.com/photo-1.jpg',
    alt: 'office table',
  }) === -Infinity,
)
assert(
  'reject testimonial avatar photos',
  scoreWpsProductScreenshot({
    src: 'https://res-academy.cache.wpscdn.com/x.jpg',
    alt: 'Jane D.',
    className: 'w-14 h-14 rounded-full object-cover',
  }) === -Infinity,
)
assert(
  'prefer imgdb product screenshot alt',
  scoreWpsProductScreenshot({
    src: 'https://pic1.imgdb.cn/item/abc.png',
    alt: 'AI converting unstructured text into a structured table',
    className: 'w-full h-auto aspect-[3/2] object-cover',
  }) >= 80,
)
assert(
  'meta covers most feature items',
  Object.keys(INTL_AI_FEATURE_META).length >= 80,
)
assert(
  'resolve item merges scraped description + image',
  (() => {
    const item = resolveIntlAiFeatureItem(
      { id: 'ai-table-generator', url: 'https://www.wps.com/feature/ai-table-generator/' },
      { 'ai-table-generator': 'AI Table Generator' },
      {},
    )
    return (
      item.label === 'AI Table Generator' &&
      Boolean(item.description) &&
      Boolean(item.imageSrc)
    )
  })(),
)
assert(
  'picker skips stock og for in-page product shot',
  pickBestImageUrl(
    `<meta property="og:image" content="https://images.unsplash.com/photo-x.jpg"/>
     <img src="https://pic1.imgdb.cn/item/a.png" alt="Highlighting text in a WPS Office document" class="aspect-[3/2] object-cover"/>`,
    'https://www.wps.com/feature/ai-table-generator/',
  ).includes('imgdb.cn'),
)
assert('carousel clamp empty → 0', clampIntlAiFeatureIndex(3, 0) === 0)
assert('carousel clamp high → last', clampIntlAiFeatureIndex(9, 3) === 2)
assert('carousel step wraps forward', stepIntlAiFeatureIndex(2, 3, 1) === 0)
assert('carousel step wraps backward', stepIntlAiFeatureIndex(0, 3, -1) === 2)
assert('carousel step single stays', stepIntlAiFeatureIndex(0, 1, 1) === 0)
assert(
  'tab index → progress ends',
  getIntlAiProgressFromTabIndex(0, 4) === 0 &&
    getIntlAiProgressFromTabIndex(3, 4) === 1,
)
assert(
  'empty scrollable → progress 0',
  getIntlAiScrollProgress({ trackTop: 0, stickyTop: 80, scrollable: 0 }) === 0,
)

assert('hash empty → no deep link', hasIntentionalLocationHash('') === false)
assert('hash # → no deep link', hasIntentionalLocationHash('#') === false)
assert('hash #top → no deep link', hasIntentionalLocationHash('#top') === false)
assert(
  'hash #home-intl-ai → deep link',
  hasIntentionalLocationHash('#home-intl-ai') === true,
)
assert(
  'tab horizontal scroll centers',
  getIntlAiTabHorizontalScrollLeft(
    { clientWidth: 200, scrollLeft: 0 },
    { offsetLeft: 150, offsetWidth: 40 },
  ) === 70,
)
assert(
  'tab horizontal scroll null → 0',
  getIntlAiTabHorizontalScrollLeft(null, null) === 0,
)

for (const language of ['en', 'zh']) {
  const copy = uiTextByLanguage[language]?.home?.intlAiFeatures
  if (!copy) {
    errors.push(`uiText.${language}.home.intlAiFeatures missing`)
    continue
  }

  for (const key of [
    'title',
    'summary',
    'expandLabel',
    'collapseLabel',
    'tabs',
    'groups',
    'items',
    'notes',
  ]) {
    if (copy[key] == null) errors.push(`uiText.${language}.intlAiFeatures.${key} missing`)
  }

  for (const tabId of [
    'copilot',
    'writer',
    'spreadsheet',
    'presentation',
    'pdf',
    'photos',
    'airpage',
    'airsheet',
    'forms',
    'dbsheet',
  ]) {
    if (!copy.tabs?.[tabId]) {
      errors.push(`uiText.${language}.intlAiFeatures.tabs.${tabId} missing`)
    }
  }

  for (const group of [
    'copilot',
    'writer',
    'spreadsheet',
    'presentation',
    'pdf',
    'photos',
  ]) {
    if (!copy.groups?.[group]) {
      errors.push(`uiText.${language}.intlAiFeatures.groups.${group} missing`)
    }
  }

  if (copy.groups?.suite) {
    errors.push(`uiText.${language}.intlAiFeatures.groups.suite must be removed (use groups.copilot)`)
  }

  if (!copy.notes?.copilotNote) {
    errors.push(`uiText.${language}.intlAiFeatures.notes.copilotNote missing`)
  }

  if (!copy.notes?.spreadsheetClientNote) {
    errors.push(`uiText.${language}.intlAiFeatures.notes.spreadsheetClientNote missing`)
  }

  for (const key of [
    'searchPlaceholder',
    'searchAriaLabel',
    'searchEmpty',
    'searchClearLabel',
  ]) {
    if (!copy[key]) {
      errors.push(`uiText.${language}.intlAiFeatures.${key} missing`)
    }
  }

  for (const item of listIntlAiFeatureItems()) {
    if (!copy.items?.[item.id]) {
      errors.push(`uiText.${language}.intlAiFeatures.items.${item.id} missing`)
    }
  }
}

for (const item of cases) {
  console.log(`${item.ok ? 'PASS' : 'FAIL'}  ${item.name}${item.detail ? ` — ${item.detail}` : ''}`)
}

if (errors.length > 0) {
  console.error('intlAiFeatures validation failed:')
  for (const error of errors) {
    console.error(`- ${error}`)
  }
  process.exit(1)
}

console.log(
  `intlAiFeatures OK: ${structure.itemCount} items, en/zh labels complete, ${cases.length} expand-state checks passed`,
)
