/**
 * Regression checks for homepage outbound / shell jump targets.
 * Catches: footer social href="#", fragile G2 per-review deep links,
 * and dead official WPS destinations used on the homepage surface.
 *
 * Run: node scripts/validate-home-outbound-links.mjs
 */
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

let failed = 0
let passed = 0

function assert(name, condition, detail = '') {
  if (condition) {
    passed += 1
    console.log(`PASS  ${name}`)
    return
  }
  failed += 1
  console.error(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`)
}

function read(rel) {
  return readFileSync(join(root, rel), 'utf8')
}

function curlOk(url) {
  const p = spawnSync(
    'curl.exe',
    [
      '-sS',
      '-L',
      '--max-redirs',
      '8',
      '-o',
      'NUL',
      '-w',
      '%{http_code}',
      '-A',
      UA,
      '--connect-timeout',
      '12',
      '--max-time',
      '30',
      '--http1.1',
      url,
    ],
    { encoding: 'utf8', windowsHide: true },
  )
  const code = Number((p.stdout || '').trim())
  return Number.isFinite(code) && code >= 200 && code < 400
}

const app = read('src/App.jsx')

assert(
  'blogSocialLinks define https urls for twitter/youtube/linkedin',
  /id:\s*'twitter'[\s\S]*?url:\s*'https:\/\/x\.com\/WPSOffice'/.test(app) &&
    /id:\s*'youtube'[\s\S]*?url:\s*'https:\/\/www\.youtube\.com\/@WPSOffice'/.test(app) &&
    /id:\s*'linkedin'[\s\S]*?url:\s*'https:\/\/www\.linkedin\.com\/company\/wps-office'/.test(
      app,
    ),
)

const footerSocialSnippet = app.match(
  /footerSocialItems\.map\(\(social\)\s*=>\s*\([\s\S]*?<\/a>\s*\)\)/,
)?.[0] ?? ''
assert(
  'footer social anchors use social.url',
  footerSocialSnippet.includes('href={social.url}'),
)
assert(
  'footer social anchors do not use href="#"',
  footerSocialSnippet.length > 0 && !footerSocialSnippet.includes('href="#"'),
)

const blogSocialSnippet = app.match(
  /blogSocialLinks\.map\(\(social\)\s*=>\s*\([\s\S]*?<\/a>\s*\)\)/,
)?.[0] ?? ''
assert(
  'blog social anchors use social.url',
  blogSocialSnippet.includes('href={social.url}'),
)
assert(
  'blog social anchors do not use href="#"',
  blogSocialSnippet.length > 0 && !blogSocialSnippet.includes('href="#"'),
)

const media = read('src/data/homeMediaProof.js')
assert(
  'G2 cards use durable product review hubs (no per-review deep links)',
  !/g2\.com\/products\/[^/]+\/reviews\/[\w-]+-review-\d+/.test(media) &&
    media.includes('https://www.g2.com/products/wps-office/reviews') &&
    media.includes('https://www.g2.com/products/wps-writer/reviews'),
)

const intent = read('src/hooks/useHomeIntentLinks.js')
const intentUrls = [...intent.matchAll(/'(https?:\/\/[^']+)'/g)].map((m) => m[1])
assert('intent hub has 4 official destinations', intentUrls.length === 4, String(intentUrls.length))

const coreUrls = [
  ...intentUrls,
  'https://www.wps.com/office/writer/',
  'https://www.wps.com/office/spreadsheet/',
  'https://www.wps.com/office/presentation/',
  'https://www.wps.com/office/pdf/',
  'https://www.wps.com/feature/ai-writer/',
  'https://www.wps.com/feature/chat-pdf/',
  'https://www.wps.com/feature/ai-ppt-maker/',
  'https://www.wps.com/about-us/',
  'https://www.wps.com/download/',
  'https://www.wps.com/buy/',
  'https://drive.wps.com/',
]

for (const url of coreUrls) {
  assert(`live OK ${url}`, curlOk(url))
}

if (failed) {
  console.error(`\n${failed} home outbound link check(s) failed (${passed} passed)`)
  process.exit(1)
}

console.log(`\nAll ${passed} home outbound link checks passed`)
