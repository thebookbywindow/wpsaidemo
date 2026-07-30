/**
 * State-matrix verification for homepage trust dock (Notion-style pin handoff).
 * Run: node scripts/validate-home-trust-dock.mjs
 */
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { HOME_TRUST_BRANDS } from '../src/data/homeTrustBrands.js'
import { shouldPinTrustDock } from '../src/hooks/useHomeTrustDockPin.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const cases = []

function assert(name, condition, detail = '') {
  cases.push({ name, ok: Boolean(condition), detail })
}

const homePage = readFileSync(join(root, 'src/components/HomePage.jsx'), 'utf8')
const trustBar = readFileSync(join(root, 'src/components/HomeTrustBar.jsx'), 'utf8')
const css = readFileSync(join(root, 'src/index.css'), 'utf8')

assert('single HomeTrustBar (no dock/metrics split)', !homePage.includes('part="dock"'))
assert(
  'label + brands slot present',
  trustBar.includes('home-trust-bar-label') && trustBar.includes('home-trust-brands-slot'),
)
assert('no metrics cards', !trustBar.includes('TrustMetrics'))
const brandNames = HOME_TRUST_BRANDS.map((b) => (typeof b === 'string' ? b : b.name))
assert(
  'brands drop App Store / Google Play',
  !brandNames.includes('App Store') && !brandNames.includes('Google Play'),
)
assert(
  'brands include AWS / G2 / Trustpilot (not G2 Award)',
  brandNames.includes('AWS') &&
    brandNames.includes('G2') &&
    brandNames.includes('Trustpilot'),
)
assert(
  'brands exclude rating glyphs',
  !brandNames.some((b) => b.includes('★') || b.includes('4.8')),
)
assert('pinned class support', trustBar.includes('is-pinned'))
assert('fixed pin css', css.includes('.home-trust-dock.is-pinned'))

assert('normal: slot below fold → pinned', shouldPinTrustDock(900, 800, 48) === true)
assert('normal: slot meets dock → unpinned', shouldPinTrustDock(752, 800, 48) === false)
assert('boundary: slot exactly on pin line → unpinned', shouldPinTrustDock(752, 800, 48) === false)
assert('boundary: 1px below pin line → pinned', shouldPinTrustDock(753, 800, 48) === true)
assert('empty dock height → pinned', shouldPinTrustDock(100, 800, 0) === true)
assert('missing slotTop → pinned', shouldPinTrustDock(NaN, 800, 48) === true)
assert('scroll back up → pinned again', shouldPinTrustDock(900, 800, 48) === true)
assert(
  'mobile: disable pin even below fold',
  shouldPinTrustDock(900, 800, 48, { disablePin: true }) === false,
)
assert('css disables pin under 720px', css.includes('@media (max-width: 720px)') && css.includes('.home-trust-dock.is-pinned'))

assert('no Microsoft', !brandNames.includes('Microsoft'))
assert('seven brand names', HOME_TRUST_BRANDS.length === 7)

const failed = cases.filter((c) => !c.ok)
for (const c of cases) {
  console.log(`${c.ok ? 'PASS' : 'FAIL'}  ${c.name}${c.detail ? ` — ${c.detail}` : ''}`)
}

if (failed.length) {
  console.error(`\n${failed.length}/${cases.length} failed`)
  process.exit(1)
}

console.log(`\nAll ${cases.length} trust-dock checks passed`)
