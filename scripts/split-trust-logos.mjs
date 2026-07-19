/**
 * Crop the 7 right-side trust logos from the hero trust bar PNG.
 * Run: node scripts/split-trust-logos.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const src = path.join(
  root,
  'public/images/home-trust-bar.png',
)
const outDir = path.join(root, 'public/images/trust-logos')

/** Manual x bounds on 1024×79 strip — logos after UNESCO */
const LOGOS = [
  { id: 'ficci', x0: 112, x1: 205, label: 'FICCI' },
  { id: 'app-store', x0: 205, x1: 335, label: 'App Store' },
  { id: 'google-play', x0: 335, x1: 468, label: 'Google Play' },
  { id: 'cnet', x0: 468, x1: 565, label: 'CNET' },
  { id: 'trustpilot', x0: 565, x1: 708, label: 'Trustpilot' },
  { id: 'techradar', x0: 708, x1: 868, label: 'TechRadar' },
  { id: 'forbes', x0: 868, x1: 1018, label: 'Forbes' },
]

const TRUST = { r: 100, g: 116, b: 139 }

async function processLogo({ id, x0, x1, label }) {
  const meta = await sharp(src).metadata()
  const pad = 4
  const left = Math.max(0, x0 - pad)
  const width = Math.min(meta.width, x1 + pad) - left

  const { data, info } = await sharp(src)
    .extract({ left, top: 0, width, height: meta.height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const out = Buffer.alloc(data.length)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const lum = r + g + b
    if (lum <= 12) {
      out[i] = 0
      out[i + 1] = 0
      out[i + 2] = 0
      out[i + 3] = 0
    } else {
      const alpha = Math.min(255, Math.max(120, lum * 14))
      out[i] = TRUST.r
      out[i + 1] = TRUST.g
      out[i + 2] = TRUST.b
      out[i + 3] = alpha
    }
  }

  const outPath = path.join(outDir, `${id}.png`)
  await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .resize({ height: 32, fit: 'inside' })
    .png()
    .toFile(outPath)

  console.log('wrote', label, '→', path.relative(root, outPath))
}

async function main() {
  if (!fs.existsSync(src)) {
    console.error('Missing source:', src)
    process.exit(1)
  }
  fs.mkdirSync(outDir, { recursive: true })
  await Promise.all(LOGOS.map(processLogo))
  console.log(`\nDone — ${LOGOS.length} logos in public/images/trust-logos/`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
