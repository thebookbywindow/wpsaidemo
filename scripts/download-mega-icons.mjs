import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../public/icons/wps')

const remoteAssets = [
  {
    name: 'mega-ai.png',
    url: 'https://global-static.wpscdn.com/cms/seo-website/ai-website-test/_nuxt/icon_ai.BDZvGLkn.png',
  },
  {
    name: 'mega-features.png',
    url: 'https://global-static.wpscdn.com/cms/seo-website/ai-website-test/_nuxt/icon_features.8Oi2VcT5.png',
  },
]

/** Official wps.ai mega menu «Features for» icon (served as inline data URL on site). */
const audienceBase64 =
  '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'

fs.mkdirSync(outDir, { recursive: true })

await Promise.all(
  remoteAssets.map(async ({ name, url }) => {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    const dest = path.join(outDir, name)
    fs.writeFileSync(dest, buf)
    console.log('saved', dest, buf.length)
  }),
)

const audienceDest = path.join(outDir, 'mega-audience.png')
fs.writeFileSync(audienceDest, Buffer.from(audienceBase64, 'base64'))
console.log('saved', audienceDest, fs.statSync(audienceDest).size)
