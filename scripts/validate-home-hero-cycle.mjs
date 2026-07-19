/**
 * State-matrix verification for homepage hero component typewriter cycle.
 * Run: node scripts/validate-home-hero-cycle.mjs
 */
import {
  HOME_HERO_COMPONENTS,
  HOME_HERO_COMPONENT_NAMES,
  HOME_HERO_TYPEWRITER_COMPONENTS,
  HOME_HERO_TYPEWRITER_NAMES,
  clampVisibleCharCount,
  getHeroLabelMeasureText,
  getHeroTypewriterSlotCount,
  getTypedHeroLabel,
  nextHeroComponentIndex,
  resolveHeroComponent,
  shouldShowHeroIcon,
  stepHeroTypewriter,
} from '../src/data/homeHeroComponents.js'
import { resolveHeroTitleParts } from '../src/data/homeHeroTitle.js'

const cases = []

function assert(name, condition, detail = '') {
  cases.push({ name, ok: Boolean(condition), detail })
}

// Index wrap
assert('normal: Writer → Spreadsheet index', nextHeroComponentIndex(0, 4) === 1)
assert('wrap: PDF → Writer index', nextHeroComponentIndex(3, 4) === 0)
assert('empty length → 0', nextHeroComponentIndex(2, 0) === 0)
assert('invalid index → 0', nextHeroComponentIndex(99, 4) === 0)

// Resolve
assert(
  'resolve Sheets',
  resolveHeroComponent(HOME_HERO_COMPONENTS, HOME_HERO_COMPONENT_NAMES.indexOf('Sheets'))
    ?.name === 'Sheets',
)
assert('resolve empty → null', resolveHeroComponent([], 0) === null)

// Data
assert('ten components', HOME_HERO_COMPONENTS.length === 10)
assert('nine typewriter components', HOME_HERO_TYPEWRITER_COMPONENTS.length === 9)
assert(
  'typewriter excludes Copilot',
  !HOME_HERO_TYPEWRITER_NAMES.includes('Copilot') &&
    HOME_HERO_TYPEWRITER_COMPONENTS.every((item) => item.id !== 'copilot'),
)
assert(
  'English names (Copilot + products)',
  HOME_HERO_COMPONENT_NAMES.join('|') ===
    'Copilot|Docs|Slides|Sheets|PDF|Photos|AirPage|AirSheet|Forms|DBSheet',
)
assert(
  'typewriter names exclude Copilot',
  HOME_HERO_TYPEWRITER_NAMES.join('|') ===
    'Docs|Slides|Sheets|PDF|Photos|AirPage|AirSheet|Forms|DBSheet',
)
assert(
  'official icon paths',
  HOME_HERO_COMPONENTS.map((item) => item.iconSrc).join('|') ===
    '/icons/wps/copilot.svg|/icons/wps/docs.svg|/icons/wps/slides.svg|/icons/wps/sheets.svg|/icons/wps/pdf.svg|/icons/wps/photos.svg|/icons/wps/airpage.svg|/icons/wps/airsheet.svg|/icons/wps/forms.svg|/icons/wps/dbsheet.svg',
)
assert(
  'measure uses longest label',
  getHeroLabelMeasureText(HOME_HERO_TYPEWRITER_COMPONENTS) === 'AirSheet',
)
assert('measure empty → ""', getHeroLabelMeasureText([]) === '')

assert(
  'typewriter cycle starts with Docs',
  HOME_HERO_TYPEWRITER_COMPONENTS[0].id === 'docs',
)

// Letter reveal — icon is slot 1, text follows
assert('icon slot only', getTypedHeroLabel('Writer', 1) === '' && shouldShowHeroIcon(1))
assert('icon + first letter', getTypedHeroLabel('Writer', 2) === 'W' && shouldShowHeroIcon(2))
assert('icon + full word', getTypedHeroLabel('Writer', 7) === 'Writer')
assert('type overflow clamps', getTypedHeroLabel('PDF', 99) === 'PDF')
assert('type empty / negative', getTypedHeroLabel('Writer', 0) === '' && !shouldShowHeroIcon(0))
assert('slot count includes icon', getHeroTypewriterSlotCount('PDF') === 4)
assert('clamp NaN → 0', clampVisibleCharCount(Number.NaN, 5) === 0)

// Typewriter state machine — normal typing path (6 letters + 1 icon slot)
{
  let state = { phase: 'typing', visibleCount: 0, index: 0, textLength: 7, itemCount: 4 }
  state = { ...state, ...stepHeroTypewriter(state) }
  assert('typing reveals icon slot first', state.phase === 'typing' && state.visibleCount === 1 && state.delayMs === 'char')

  state = { phase: 'typing', visibleCount: 7, index: 0, textLength: 7, itemCount: 4 }
  const held = stepHeroTypewriter(state)
  assert('typing complete → hold', held.phase === 'hold' && held.delayMs === 'hold')
}

// Hold → next word typing (icon → P → PD → PDF is one round)
{
  const pdfIndex = HOME_HERO_TYPEWRITER_NAMES.indexOf('PDF')
  const state = stepHeroTypewriter({
    phase: 'hold',
    visibleCount: 4,
    index: pdfIndex,
    textLength: 4,
    itemCount: HOME_HERO_TYPEWRITER_COMPONENTS.length,
  })
  assert(
    'hold PDF → next Photos typing from empty',
    state.phase === 'typing' &&
      state.index === pdfIndex + 1 &&
      HOME_HERO_TYPEWRITER_COMPONENTS[pdfIndex + 1].id === 'photos' &&
      state.visibleCount === 0 &&
      state.delayMs === 'gap',
  )
}

// Progressive reveal sequence for PDF (icon + letters)
{
  const frames = []
  const icons = []
  let state = { phase: 'typing', visibleCount: 0, index: 3, textLength: 4, itemCount: 4 }
  for (let i = 0; i < 4; i += 1) {
    state = { ...state, ...stepHeroTypewriter(state) }
    frames.push(getTypedHeroLabel('PDF', state.visibleCount))
    icons.push(shouldShowHeroIcon(state.visibleCount))
  }
  assert(
    'PDF types icon → P → PD → PDF',
    frames.join('|') === '|P|PD|PDF' && icons.join('|') === 'true|true|true|true',
  )
}

// Single item: stay on hold (no forced churn)
{
  const state = stepHeroTypewriter({
    phase: 'hold',
    visibleCount: 3,
    index: 0,
    textLength: 3,
    itemCount: 1,
  })
  assert('single item stays on hold', state.phase === 'hold' && state.index === 0)
}

// Empty itemCount
{
  const state = stepHeroTypewriter({
    phase: 'typing',
    visibleCount: 1,
    index: 0,
    textLength: 4,
    itemCount: 0,
  })
  assert('empty list safe', state.index === 0 && state.visibleCount === 0)
}

// Full cycle uniqueness via index helper
const seen = new Set()
let idx = 0
const total = HOME_HERO_TYPEWRITER_COMPONENTS.length
for (let step = 0; step < total; step += 1) {
  seen.add(HOME_HERO_TYPEWRITER_COMPONENTS[idx].id)
  idx = nextHeroComponentIndex(idx, total)
}
assert('typewriter full cycle 9 unique', seen.size === 9 && idx === 0)
assert('typewriter cycle includes Photos', seen.has('photos'))
assert('typewriter cycle excludes Copilot', !seen.has('copilot'))

// Copilot still exists for the dedicated section
assert('Copilot data kept', HOME_HERO_COMPONENTS[0].id === 'copilot')

// Mobile line break: join word stays with typewriter
assert(
  'split across join',
  resolveHeroTitleParts({
    lead: 'Create smarter & faster ',
    join: 'across',
  }).join === 'across' &&
    resolveHeroTitleParts({
      lead: 'Create smarter & faster ',
      join: 'across',
    }).main.trimEnd() === 'Create smarter & faster',
)
assert(
  'split 尽在 join',
  resolveHeroTitleParts({ lead: '更聪明、更高效地创作，', join: '尽在' }).join === '尽在',
)
assert(
  'parse across from legacy lead',
  resolveHeroTitleParts({ lead: 'Create smarter & faster across ' }).join === 'across',
)
assert(
  'empty join when no marker',
  resolveHeroTitleParts({ lead: 'Hello world' }).join === '',
)

const failed = cases.filter((item) => !item.ok)
for (const item of cases) {
  const mark = item.ok ? 'PASS' : 'FAIL'
  console.log(`${mark}  ${item.name}${item.detail ? ` — ${item.detail}` : ''}`)
}

if (failed.length) {
  console.error(`\n${failed.length} case(s) failed`)
  process.exit(1)
}

console.log(`\nAll ${cases.length} home-hero typewriter cases passed`)
