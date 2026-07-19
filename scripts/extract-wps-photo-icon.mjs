import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'

const htmlPath = path.join(os.tmpdir(), 'wps-home.html')
const h = fs.readFileSync(htmlPath, 'utf8')
const marker = 'alt="Photo"'
const i = h.indexOf(marker)
if (i < 0) {
  console.error('Photo marker not found')
  process.exit(1)
}

const srcStart = h.lastIndexOf('src="', i)
const srcEnd = h.indexOf('"', srcStart + 5)
const src = h.slice(srcStart + 5, srcEnd)

if (!src.startsWith('data:image/svg+xml')) {
  console.error('unexpected src', src.slice(0, 80))
  process.exit(1)
}

const comma = src.indexOf(',')
let svg = decodeURIComponent(src.slice(comma + 1))
svg = svg.replace(/&#39;/g, "'")
if (!/xmlns=/.test(svg)) {
  svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
}

const out = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../public/icons/wps/photos.svg',
)
fs.writeFileSync(out, `${svg.trim()}\n`, 'utf8')
console.log('wrote', out, fs.statSync(out).size)
