import fs from 'fs'
import path from 'path'
import os from 'os'

const htmlPath = path.join(os.tmpdir(), 'wps-home.html')
const html = fs.readFileSync(htmlPath, 'utf8')

const urls = [...html.matchAll(/https?:\/\/[^"'\\\s)]+\.(?:svg|png|webp|jpg)/gi)].map((m) => m[0])
const uniq = [...new Set(urls)]
const hit = uniq.filter((u) =>
  /doc|slide|sheet|pdf|product|icon|app|suite|writer|excel|ppt|word|wps/i.test(u),
)

console.log('total', uniq.length, 'hit', hit.length)
for (const u of hit.slice(0, 100)) console.log(u)

// also search relative /_next/static image paths
const rel = [...html.matchAll(/\/_next\/[^"'\\\s)]+\.(?:svg|png|webp|jpg)/gi)].map((m) => m[0])
const relHit = [...new Set(rel)].filter((u) =>
  /doc|slide|sheet|pdf|product|icon|app|writer|excel|ppt|word/i.test(u),
)
console.log('relHit', relHit.length)
for (const u of relHit.slice(0, 80)) console.log(u)

// dump nearby context for "Docs"
const idx = html.indexOf('>Docs<')
console.log('Docs idx', idx)
if (idx > 0) console.log(html.slice(Math.max(0, idx - 400), idx + 200))
