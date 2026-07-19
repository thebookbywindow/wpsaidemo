import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'

const htmlPath = path.join(os.tmpdir(), 'wps-home.html')
const h = fs.readFileSync(htmlPath, 'utf8')

const markers = ['>WPS AI</span>', '>Copilot</span>', 'alt="WPS AI"', 'alt="Copilot"']
let hit = -1
let used = ''
for (const marker of markers) {
  hit = h.indexOf(marker)
  if (hit >= 0) {
    used = marker
    break
  }
}

if (hit < 0) {
  console.error('no WPS AI / Copilot marker')
  process.exit(1)
}

console.log('marker', used, 'at', hit)
console.log(h.slice(Math.max(0, hit - 600), hit + 120).replace(/\s+/g, ' ').slice(0, 800))

const before = h.lastIndexOf('<svg', hit)
const svgEnd = h.indexOf('</svg>', before)
if (before < 0 || svgEnd < 0 || hit - before > 8000) {
  // try data URI img near marker
  const srcStart = h.lastIndexOf('src="', hit)
  const srcEnd = h.indexOf('"', srcStart + 5)
  const src = h.slice(srcStart + 5, srcEnd)
  if (!src.startsWith('data:image/svg+xml')) {
    console.error('no nearby svg/data uri')
    process.exit(1)
  }
  const comma = src.indexOf(',')
  let svg = decodeURIComponent(src.slice(comma + 1)).replace(/&#39;/g, "'")
  if (!/xmlns=/.test(svg)) svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
  const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/icons/wps/copilot.svg')
  fs.writeFileSync(out, `${svg.trim()}\n`, 'utf8')
  console.log('wrote data-uri', out, fs.statSync(out).size)
  process.exit(0)
}

let svg = h.slice(before, svgEnd + '</svg>'.length)
svg = svg
  .replace(/\s*data-v-[a-z0-9]+=""/g, '')
  .replace(/\s*data-v-[a-z0-9]+(?=[\s>])/g, '')
  .replace(/\s+/g, ' ')
  .replace(/> </g, '><')
  .trim()
if (!/xmlns=/.test(svg)) {
  svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
}
svg = svg.replace(/clip0_[a-z0-9_]+/gi, 'clip0_wps_copilot')

const out = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/icons/wps/copilot.svg')
fs.writeFileSync(out, `${svg}\n`, 'utf8')
console.log('wrote svg', out, fs.statSync(out).size)
