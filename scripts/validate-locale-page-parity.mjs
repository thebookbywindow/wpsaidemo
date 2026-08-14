import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const page = readFileSync(join(root, 'src/components/LocalePage.jsx'), 'utf8')
const css = readFileSync(join(root, 'src/index.css'), 'utf8')
const errors = []
let passed = 0

function assert(name, condition) {
  if (!condition) errors.push(name)
  else passed += 1
}

assert('hero class', page.includes('locale-page-hero'))
assert('search form', page.includes('locale-page-search'))
assert('library panel', page.includes('locale-page-library'))
assert('group section', page.includes('locale-page-group'))
assert('links grid', page.includes('locale-page-links'))
assert('h1 80px', css.includes('font-size: 80px'))
assert('h1 max-width 1100px', /locale-page-hero h1[\s\S]{0,80}max-width: 1100px/.test(css))
assert('letter-spacing -3px', css.includes('letter-spacing: -3px'))
assert('search height 60px', /locale-page-search[\s\S]{0,240}height: 60px/.test(css))
assert(
  'search gradient button',
  css.includes('linear-gradient(93deg, #5f62fd, #f359ce)'),
)
assert('search icon asset', page.includes('/images/locale-search.svg'))
assert('backdrop 2222x840', css.includes('background-size: 2222px 840px'))
assert('hero-backdrop asset', css.includes("url('/images/home-v2/hero-backdrop.webp')"))
assert('library 87.5vw', css.includes('min(1680px, 87.5vw)'))
assert('library blur', /locale-page-library[\s\S]{0,280}backdrop-filter: blur\(10px\)/.test(css))
assert('auto-fill locale grid', css.includes('repeat(auto-fill, minmax(252px, 1fr))'))
assert('link color #6b6b6b', /locale-page-links a[\s\S]{0,400}color: #6b6b6b/.test(css))
assert('hover #9c75f0', /locale-page-links a:hover[\s\S]{0,120}color: #9c75f0/.test(css))
assert('group title 28/36', css.includes('font-size: 28px') && css.includes('line-height: 36px'))

if (errors.length) {
  console.error(`locale-page parity FAIL (${errors.length})`)
  for (const item of errors) console.error(` - ${item}`)
  process.exit(1)
}

console.log(`locale-page parity ok (${passed} checks)`)
