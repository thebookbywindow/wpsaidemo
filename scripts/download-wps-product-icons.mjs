import fs from 'fs'
import path from 'path'
import os from 'os'
import { fileURLToPath } from 'url'

const htmlPath = path.join(os.tmpdir(), 'wps-home.html')
const html = fs.readFileSync(htmlPath, 'utf8')
const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/icons/wps')
fs.mkdirSync(outDir, { recursive: true })

const labels = [
  'Docs',
  'Slides',
  'Sheets',
  'PDF',
  'Photo',
  'AirPage',
  'AirSheet',
  'Forms',
  'DBSheet',
]

for (const label of labels) {
  const marker = `>${label}</span>`
  const end = html.indexOf(marker)
  const before = html.lastIndexOf('<svg', end)
  const svgEnd = html.indexOf('</svg>', before)
  let svg = html.slice(before, svgEnd + '</svg>'.length)

  svg = svg
    .replace(/\s*data-v-[a-z0-9]+=""/g, '')
    .replace(/\s*data-v-[a-z0-9]+(?=[\s>])/g, '')
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .trim()

  if (!/xmlns=/.test(svg)) {
    svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')
  }

  // Unique clipPath ids per file to avoid collisions if ever inlined
  const id = label.toLowerCase()
  svg = svg.replace(/clip0_3743_3212/g, `clip0_wps_${id}`)

  fs.writeFileSync(path.join(outDir, `${id}.svg`), `${svg}\n`, 'utf8')
  console.log('wrote', id, svg.length)
}
