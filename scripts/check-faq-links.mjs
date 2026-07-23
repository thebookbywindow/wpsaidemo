/**
 * Regression: Home FAQ + keyFacts external links must return HTTP 200.
 * Usage: node scripts/check-faq-links.mjs
 */
import fs from 'node:fs'
import https from 'node:https'
import http from 'node:http'
import { URL } from 'node:url'

const text = fs.readFileSync(new URL('../src/data/uiText.js', import.meta.url), 'utf8')
const faqBlocks = []
let idx = 0
while ((idx = text.indexOf('faqTopics:', idx)) !== -1) {
  faqBlocks.push(text.slice(idx, idx + 22000))
  idx += 10
}
const keyFactsBlocks = []
idx = 0
while ((idx = text.indexOf('keyFacts:', idx)) !== -1) {
  keyFactsBlocks.push(text.slice(idx, idx + 4000))
  idx += 9
}

const urlRe = /https?:\/\/[^\s)\]"']+/g
const urls = [
  ...new Set(
    [...faqBlocks, ...keyFactsBlocks].flatMap((block) => block.match(urlRe) || []),
  ),
]

function checkUrl(rawUrl, redirects = 0) {
  return new Promise((resolve) => {
    let parsed
    try {
      parsed = new URL(rawUrl)
    } catch {
      resolve({ url: rawUrl, status: 'INVALID', finalUrl: rawUrl })
      return
    }
    const lib = parsed.protocol === 'http:' ? http : https
    const req = lib.request(
      {
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        path: parsed.pathname + parsed.search,
        method: 'GET',
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml',
        },
        timeout: 20000,
      },
      (res) => {
        const status = res.statusCode || 0
        const loc = res.headers.location
        res.resume()
        if ([301, 302, 303, 307, 308].includes(status) && loc && redirects < 8) {
          const next = new URL(loc, parsed).href
          checkUrl(next, redirects + 1).then((r) =>
            resolve({ url: rawUrl, status: r.status, finalUrl: r.finalUrl }),
          )
          return
        }
        resolve({ url: rawUrl, status, finalUrl: parsed.href })
      },
    )
    req.on('timeout', () => {
      req.destroy()
      resolve({ url: rawUrl, status: 'TIMEOUT', finalUrl: rawUrl })
    })
    req.on('error', (err) => {
      resolve({ url: rawUrl, status: `ERR:${err.code || err.message}`, finalUrl: rawUrl })
    })
    req.end()
  })
}

console.log(`Checking ${urls.length} FAQ/keyFacts URLs...\n`)
const results = await Promise.all(urls.map((u) => checkUrl(u)))
const bad = results.filter((r) => r.status !== 200)
for (const r of results.sort((a, b) => a.url.localeCompare(b.url))) {
  const mark = r.status === 200 ? 'OK' : 'FAIL'
  console.log(`${mark}\t${r.status}\t${r.url}`)
}
if (bad.length) {
  console.error(`\n${bad.length} broken link(s)`)
  process.exit(1)
}
console.log(`\nAll ${urls.length} links OK`)
