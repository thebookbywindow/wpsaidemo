import fs from 'node:fs'
import https from 'node:https'
import http from 'node:http'
import { URL } from 'node:url'

const text = fs.readFileSync(new URL('../src/data/intlAiFeatures.js', import.meta.url), 'utf8')
const urls = [...new Set(text.match(/https?:\/\/[^\s'"]+/g) || [])]

function checkUrl(rawUrl, redirects = 0) {
  return new Promise((resolve) => {
    let parsed
    try {
      parsed = new URL(rawUrl)
    } catch {
      resolve({ url: rawUrl, status: 'INVALID' })
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
          checkUrl(new URL(loc, parsed).href, redirects + 1).then((r) =>
            resolve({ url: rawUrl, status: r.status, finalUrl: r.finalUrl }),
          )
          return
        }
        resolve({ url: rawUrl, status, finalUrl: parsed.href })
      },
    )
    req.on('timeout', () => {
      req.destroy()
      resolve({ url: rawUrl, status: 'TIMEOUT' })
    })
    req.on('error', (err) => resolve({ url: rawUrl, status: `ERR:${err.code || err.message}` }))
    req.end()
  })
}

console.log(`Checking ${urls.length} intl AI feature URLs...\n`)
const CONCURRENCY = 8
const results = []
for (let i = 0; i < urls.length; i += CONCURRENCY) {
  const chunk = urls.slice(i, i + CONCURRENCY)
  results.push(...(await Promise.all(chunk.map((u) => checkUrl(u)))))
  console.log(`progress ${Math.min(i + CONCURRENCY, urls.length)}/${urls.length}`)
}
const bad = results.filter((r) => r.status !== 200)
console.log('\n=== BAD ===')
for (const r of bad) console.log(`${r.status}\t${r.url}`)
console.log(`\nOK: ${results.length - bad.length}, BAD: ${bad.length}`)
if (bad.length) process.exitCode = 1
