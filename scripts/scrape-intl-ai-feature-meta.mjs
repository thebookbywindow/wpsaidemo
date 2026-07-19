/**
 * Concurrently scrape og:image + description from intl AI feature URLs,
 * download images to public/images/intl-ai-features/, write src/data/intlAiFeatureMeta.js
 *
 * Usage: node scripts/scrape-intl-ai-feature-meta.mjs [--force]
 */
import { createWriteStream } from 'node:fs'
import { access, mkdir, writeFile } from 'node:fs/promises'
import { dirname, extname, join } from 'node:path'
import { Readable } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { fileURLToPath } from 'node:url'
import { listIntlAiFeatureItems } from '../src/data/intlAiFeatures.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'public', 'images', 'intl-ai-features')
const OUT_DATA = join(ROOT, 'src', 'data', 'intlAiFeatureMeta.js')
const CONCURRENCY = 8
const FORCE = process.argv.includes('--force')
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

function decodeHtmlEntities(value) {
  return String(value ?? '')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

function pickMetaContent(html, names) {
  for (const name of names) {
    const patterns = [
      new RegExp(
        `<meta[^>]+(?:property|name)=["']${name}["'][^>]+content=["']([^"']+)["']`,
        'i',
      ),
      new RegExp(
        `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${name}["']`,
        'i',
      ),
    ]
    for (const re of patterns) {
      const match = html.match(re)
      if (match?.[1]) return decodeHtmlEntities(match[1])
    }
  }
  return ''
}

function resolveUrl(url, pageUrl) {
  try {
    return new URL(url, pageUrl).href
  } catch {
    return url
  }
}

function isGenericStockImage(url) {
  return /unsplash|placeholder|pexels|pixabay|istock|shutterstock/i.test(url)
}

/** Pull src/alt/class/id from raw <img> tags. */
export function extractHtmlImages(html) {
  const out = []
  const re = /<img\b[^>]*>/gi
  let m
  while ((m = re.exec(html))) {
    const tag = m[0]
    const src = tag.match(/\bsrc=["']([^"']+)["']/i)?.[1]
    if (!src) continue
    out.push({
      src: decodeHtmlEntities(src),
      alt: decodeHtmlEntities(tag.match(/\balt=["']([^"']*)["']/i)?.[1] || ''),
      className: tag.match(/\bclass=["']([^"']*)["']/i)?.[1] || '',
      id: tag.match(/\bid=["']([^"']*)["']/i)?.[1] || '',
    })
  }
  return out
}

function extractJsonLdScreenshots(html) {
  const urls = []
  const re = /"screenshot"\s*:\s*"([^"]+)"/gi
  let m
  while ((m = re.exec(html))) urls.push(decodeHtmlEntities(m[1]))
  return urls
}

/** Prefetch / preload image links (Nuxt SPA pages often only expose assets this way). */
function extractPrefetchImages(html) {
  const urls = []
  const re =
    /<link[^>]+rel=["'](?:prefetch|preload)["'][^>]+as=["']image["'][^>]+href=["']([^"']+)["']/gi
  const reAlt =
    /<link[^>]+href=["']([^"']+)["'][^>]+rel=["'](?:prefetch|preload)["'][^>]+as=["']image["']/gi
  let m
  while ((m = re.exec(html))) urls.push(decodeHtmlEntities(m[1]))
  while ((m = reAlt.exec(html))) urls.push(decodeHtmlEntities(m[1]))
  return urls
}

/**
 * Score an image as a WPS product UI screenshot.
 * Reject people / avatars / stock / logos / decorations.
 */
export function scoreWpsProductScreenshot({ src, alt = '', className = '', id = '' }) {
  if (!src || !/^https?:\/\//i.test(src)) return -Infinity
  if (isGenericStockImage(src)) return -Infinity
  if (!/\.(png|jpe?g|webp|gif)(?:$|\?)/i.test(src)) return -Infinity

  const blob = `${src} ${alt} ${className} ${id}`

  // People / testimonials / avatars
  if (/rounded-full|avatar|testimonial|w-14\s+h-14/i.test(className)) return -Infinity
  if (/\b(Jane|Marco|Samira|John|Mary|Alex|David|Sarah)\b/i.test(alt)) return -Infinity
  if (/^[A-Z][a-z]+\s+[A-Z]\.?$/.test(alt.trim())) return -Infinity

  // Chrome / UI chrome noise
  if (/logo|favicon|sprite|1x1|pixel|icon\.|floating decoration|decoration/i.test(blob)) {
    return -Infinity
  }
  if (/ai-wps-office-logo/i.test(src)) return -Infinity

  let score = 0

  // Strong product signals in alt text
  if (
    /\b(wps|ai|table|document|spreadsheet|excel|pdf|slide|photo|ocr|prompt|generat|editor|convert|extract|insert|highlight|summar|translat|chat|form|sheet)\b/i.test(
      alt,
    )
  ) {
    score += 50
  }
  if (/screenshot|demo|step|product|ui|interface/i.test(blob)) score += 20
  if (/step-image|hero|feature/i.test(`${className} ${id}`)) score += 25
  if (/aspect-\[3\/2\]|object-cover/i.test(className)) score += 15

  // Hosts that actually host product shots on WPS pages
  if (/imgdb\.cn/i.test(src)) score += 40
  if (/abroadad\.cache\.wpscdn\.com\/upload\/ad_adapter/i.test(src)) score += 45
  // Official SEO/feature marketing stills (product UI), not avatars (avatars rejected above)
  if (/seo-engine-admin/i.test(src)) score += 35
  // Copilot / AI site Nuxt assets (often real product banners without alt text)
  if (/wps_ai_website|_nuxt\/.*(?:banner|hero|demo|screenshot|ai-|features-)/i.test(src)) {
    score += 35
  }
  if (/aipal\.wps\.com\/_nuxt\/features-/i.test(src)) score += 40
  if (/website-prod\.cache\.wpscdn\.com\/img\//i.test(src)) score -= 10

  // Prefer raster content over tiny assets
  if (/\/upload\//i.test(src)) score += 8

  return score
}

/**
 * Pick a real WPS product screenshot from the page — never stock people photos.
 */
export function pickBestImageUrl(html, pageUrl) {
  const scored = []

  for (const img of extractHtmlImages(html)) {
    const score = scoreWpsProductScreenshot(img)
    if (score > 0) scored.push({ url: img.src, score, via: 'img' })
  }

  for (const url of extractJsonLdScreenshots(html)) {
    const score = scoreWpsProductScreenshot({ src: url, alt: 'screenshot' })
    if (score > 0) scored.push({ url, score: score + 10, via: 'jsonld' })
  }

  for (const url of extractPrefetchImages(html)) {
    const abs = resolveUrl(url, pageUrl)
    const score = scoreWpsProductScreenshot({
      src: abs,
      alt: /features-/i.test(abs) ? 'product feature screenshot' : 'prefetch image',
    })
    if (score > 0) scored.push({ url: abs, score: score + 5, via: 'prefetch' })
  }

  const og = pickMetaContent(html, ['og:image', 'twitter:image'])
  if (og) {
    const score = scoreWpsProductScreenshot({
      src: og,
      alt: 'og image',
      className: '',
      id: 'og',
    })
    // og alone is weaker than in-page product shots (often marketing stock)
    if (score > 0) scored.push({ url: og, score: score - 15, via: 'og' })
  }

  scored.sort((a, b) => b.score - a.score)
  const best = scored[0]
  if (!best || best.score < 20) return ''
  return resolveUrl(best.url, pageUrl)
}

function pickDescription(html) {
  return pickMetaContent(html, [
    'og:description',
    'twitter:description',
    'description',
  ])
}

function extensionFromUrl(url) {
  try {
    const pathExt = extname(new URL(url).pathname).toLowerCase()
    if (['.png', '.jpg', '.jpeg', '.webp', '.gif'].includes(pathExt)) return pathExt
  } catch {
    /* ignore */
  }
  return '.jpg'
}

async function fileExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': UA,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.text()
}

async function downloadImage(imageUrl, destPath) {
  if (!FORCE && (await fileExists(destPath))) return { skipped: true }
  const res = await fetch(imageUrl, {
    headers: { 'User-Agent': UA, Accept: 'image/*,*/*' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`image HTTP ${res.status}`)
  if (!res.body) throw new Error('image body empty')
  await mkdir(dirname(destPath), { recursive: true })
  await pipeline(Readable.fromWeb(res.body), createWriteStream(destPath))
  return { skipped: false }
}

async function mapPool(items, limit, worker) {
  const results = new Array(items.length)
  let next = 0
  async function run() {
    while (next < items.length) {
      const i = next++
      results[i] = await worker(items[i], i)
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => run()),
  )
  return results
}

function toJsModule(metaById) {
  const sorted = Object.keys(metaById)
    .sort()
    .reduce((acc, id) => {
      acc[id] = metaById[id]
      return acc
    }, {})
  return `/** Auto-generated by scripts/scrape-intl-ai-feature-meta.mjs — do not edit by hand. */\nexport const INTL_AI_FEATURE_META = ${JSON.stringify(sorted, null, 2)}\n`
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const items = listIntlAiFeatureItems()

  const byUrl = new Map()
  for (const item of items) {
    if (!byUrl.has(item.url)) byUrl.set(item.url, [])
    byUrl.get(item.url).push(item)
  }
  const uniqueUrls = [...byUrl.keys()]

  console.log(
    `Scraping ${uniqueUrls.length} unique URLs for ${items.length} items (concurrency=${CONCURRENCY})…`,
  )

  let pageOk = 0
  let pageFail = 0
  let imgOk = 0
  let imgSkip = 0
  let imgFail = 0

  const scrapedByUrl = new Map()
  await mapPool(uniqueUrls, CONCURRENCY, async (url) => {
    try {
      const html = await fetchText(url)
      const page = {
        description: pickDescription(html),
        imageUrl: pickBestImageUrl(html, url),
      }
      scrapedByUrl.set(url, page)
      pageOk += 1
      console.log(
        `OK  ${url} | desc=${page.description ? 'yes' : 'no'} img=${page.imageUrl ? 'yes' : 'no'}`,
      )
    } catch (err) {
      pageFail += 1
      scrapedByUrl.set(url, { description: '', imageUrl: '' })
      console.error(`FAIL ${url}: ${err.message}`)
    }
  })

  const metaById = {}
  for (const item of items) {
    const page = scrapedByUrl.get(item.url) || { description: '', imageUrl: '' }
    metaById[item.id] = {
      description: page.description || '',
      imageSrc: null,
      sourceImageUrl: page.imageUrl || '',
    }
  }

  const byImageUrl = new Map()
  for (const item of items) {
    const imageUrl = metaById[item.id].sourceImageUrl
    if (!imageUrl) continue
    if (!byImageUrl.has(imageUrl)) byImageUrl.set(imageUrl, [])
    byImageUrl.get(imageUrl).push(item.id)
  }

  // Download once per unique image URL; each item id gets its own public filename.
  await mapPool([...byImageUrl.entries()], CONCURRENCY, async ([imageUrl, ids]) => {
    const ext = extensionFromUrl(imageUrl)
    let sharedBuffer = null
    try {
      if (!FORCE) {
        const firstPath = join(OUT_DIR, `${ids[0]}${ext}`)
        if (await fileExists(firstPath)) {
          for (const id of ids) {
            const fileName = `${id}${ext}`
            const dest = join(OUT_DIR, fileName)
            if (!(await fileExists(dest))) {
              const { copyFile } = await import('node:fs/promises')
              await copyFile(firstPath, dest)
            }
            metaById[id].imageSrc = `/images/intl-ai-features/${fileName}`
          }
          imgSkip += 1
          console.log(`SKIP ${ids[0]}${ext} (and ${ids.length - 1} aliases)`)
          return
        }
      }

      const res = await fetch(imageUrl, {
        headers: { 'User-Agent': UA, Accept: 'image/*,*/*' },
        redirect: 'follow',
      })
      if (!res.ok) throw new Error(`image HTTP ${res.status}`)
      sharedBuffer = Buffer.from(await res.arrayBuffer())
      await mkdir(OUT_DIR, { recursive: true })
      for (const id of ids) {
        const fileName = `${id}${ext}`
        const dest = join(OUT_DIR, fileName)
        await writeFile(dest, sharedBuffer)
        metaById[id].imageSrc = `/images/intl-ai-features/${fileName}`
      }
      imgOk += 1
      console.log(`IMG  ${ids[0]}${ext} ×${ids.length}`)
    } catch (err) {
      imgFail += 1
      console.error(`IMG FAIL ${ids[0]}: ${err.message}`)
    }
  })

  await writeFile(OUT_DATA, toJsModule(metaById), 'utf8')
  console.log(`\nWrote ${OUT_DATA}`)
  console.log(
    `pages ok=${pageOk} fail=${pageFail} | images ok=${imgOk} skip=${imgSkip} fail=${imgFail} | meta=${Object.keys(metaById).length}`,
  )
  if (pageOk === 0) process.exit(1)
}

import { pathToFileURL } from 'node:url'

const invokedAsMain =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(process.argv[1]).href

if (invokedAsMain) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
