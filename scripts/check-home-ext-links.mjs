import fs from 'node:fs'
import https from 'node:https'
import http from 'node:http'
import { URL } from 'node:url'

const text = fs.readFileSync(new URL('../src/data/uiText.js', import.meta.url), 'utf8')

const homeEnStart = text.indexOf('home: {')
const homeZhStart = text.indexOf('home: {', homeEnStart + 1)
const footerEn = text.indexOf('footer: {', homeEnStart)
const footerZh = text.indexOf('footer: {', homeZhStart)

const blocks = [text.slice(homeEnStart, footerEn), text.slice(homeZhStart, footerZh)]
const urlRe = /https?:\/\/[^\s)\]"']+/g
const urls = [...new Set(blocks.flatMap((block) => block.match(urlRe) || []))].filter(
  (u) => !u.includes('wpscdn.com') && !u.includes('imgdb.cn') && !u.includes('clarity.ms'),
)

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
            resolve({ url: rawUrl, status: r.status, finalUrl: r.finalUrl, via: status }),
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

console.log(`Checking ${urls.length} home page external URLs...\n`)
const CONCURRENCY = 8
const results = []
for (let i = 0; i < urls.length; i += CONCURRENCY) {
  const chunk = urls.slice(i, i + CONCURRENCY)
  results.push(...(await Promise.all(chunk.map((u) => checkUrl(u)))))
  console.log(`progress ${Math.min(i + CONCURRENCY, urls.length)}/${urls.length}`)
}

const bad = results.filter((r) => r.status !== 200)
const good = results.filter((r) => r.status === 200)

console.log('\n=== BAD / NON-200 ===')
for (const r of bad.sort((a, b) => String(a.url).localeCompare(b.url))) {
  console.log(`${r.status}\t${r.url}${r.finalUrl !== r.url ? ` -> ${r.finalUrl}` : ''}`)
}
console.log(`\nOK: ${good.length}, BAD: ${bad.length}`)

if (bad.length) {
  process.exitCode = 1
}
