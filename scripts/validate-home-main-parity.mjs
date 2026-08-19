/**
 * Static contract checks for the homepage main parity implementation.
 * Run: node scripts/validate-home-main-parity.mjs
 */
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const app = readFileSync(join(root, 'src/App.jsx'), 'utf8')
const homePage = readFileSync(join(root, 'src/components/HomePage.jsx'), 'utf8')
const deck = readFileSync(join(root, 'src/components/HomeIntlAiFeatures.jsx'), 'utf8')
const proof = readFileSync(join(root, 'src/components/HomeMediaProof.jsx'), 'utf8')
const downloads = readFileSync(join(root, 'src/components/HomePlatformDownloads.jsx'), 'utf8')
const faq = readFileSync(join(root, 'src/components/HomeFaq.jsx'), 'utf8')
const homeStyles = readFileSync(join(root, 'src/styles/home-v2.css'), 'utf8')

const checks = []

function assert(name, condition, detail = '') {
  checks.push({ name, ok: Boolean(condition), detail })
}

const sectionOrder = [
  'hv2-hero',
  'hv2-deck',
  'hv2-cases',
  'hv2-proof',
  'hv2-download',
  'hv2-faq',
]

assert(
  'home main has the scoped parity class',
  /<main[^>]*className=\{[^}]*home-v2-main/.test(app),
)
assert('HomePage does not add a nested shell wrapper', !homePage.includes('<div className="home-v2-main">'))

let previousIndex = -1
for (const className of sectionOrder) {
  const index = homePage.indexOf(`className="${className}`)
  assert(`section exists: ${className}`, index >= 0)
  assert(`section order: ${className}`, index > previousIndex)
  previousIndex = index
}

assert('main-only scope excludes CTA from HomePage', !homePage.includes('className="hv2-cta"'))
assert('deck content does not add a nested section shell', !deck.includes('className="home-ai-capabilities-section home-ai-deck-section"'))
assert('proof content does not add a nested section shell', !proof.includes('className="home-media-proof-section"'))
assert('download content uses the live inner container', downloads.includes('hv2-download__inner'))
assert('faq content does not add a nested layout shell', !faq.includes('className="home-faq-layout"'))
assert('home styles keep mobile parity rules', /@media\s*\(max-width:\s*720px\)/.test(homeStyles))
assert('home styles keep proof grid responsive rules', homeStyles.includes('.home-v2-main .home-media-grid'))
assert('proof mobile uses horizontal two-card pages', homeStyles.includes('.hv2-proof__page') && homeStyles.includes('grid-template-columns: repeat(2'))

const failed = checks.filter((check) => !check.ok)
for (const check of checks) {
  console.log(`${check.ok ? 'PASS' : 'FAIL'}  ${check.name}${check.detail ? ` — ${check.detail}` : ''}`)
}

if (failed.length) {
  console.error(`\n${failed.length} homepage parity check(s) failed`)
  process.exit(1)
}

console.log(`\nAll ${checks.length} homepage parity checks passed`)
