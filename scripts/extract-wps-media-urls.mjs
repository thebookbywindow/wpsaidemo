import fs from 'node:fs'

const html = fs.readFileSync(new URL('../temp-wps-home.html', import.meta.url), 'utf8')

const videoUrls = [...html.matchAll(/"videoUrl":(\d+)/g)].map((m) => m[1])
// WPS embeds strings in a JSON array at end - extract string table
const stringTableMatch = html.match(/\[(\"[^\"]*\"(?:,\"[^\"]*\")*)\]/g)
// Better: find all https URLs that look like review links in order
const reviewUrls = [
  ...html.matchAll(
    /"(https:\/\/www\.(?:techradar|cnet|capterra|tomsguide|androidauthority|macworld|pcworld|laptopmag|g2)\.com[^"]+)"/g,
  ),
].map((m) => m[1])

const youtubeUrls = [...html.matchAll(/"(https:\/\/www\.youtube\.com\/watch\?v=[^"]+)"/g)].map((m) => m[1])

console.log('youtube count', youtubeUrls.length)
youtubeUrls.forEach((u) => console.log(u))
console.log('\nreview count', reviewUrls.length)
reviewUrls.forEach((u) => console.log(u))

// Parse structured blocks: quote + author + videoUrl pattern
const blocks = [
  ...html.matchAll(
    /\{"quote":\d+,"author":\d+,"thumbImg":\d+,"star":\d+,"videoUrl":\d+\}/g,
  ),
]
console.log('\npr/g2 style blocks', blocks.length)

// Extract string literals sequentially after "Trusted by Experts" 
const anchor = html.indexOf('Trusted by Experts')
const chunk = html.slice(anchor, anchor + 120000)
const strings = [...chunk.matchAll(/"((?:\\.|[^"\\])*)"/g)].map((m) =>
  m[1].replace(/\\u0026/g, '&').replace(/\\"/g, '"'),
)
const filtered = strings.filter(
  (s) =>
    s.startsWith('http')
    && (/youtube|techradar|cnet|capterra|g2\.com|androidauthority|macworld|pcworld|laptopmag|tomsguide/i.test(
      s,
    )),
)
console.log('\nordered http strings in section:', filtered.length)
filtered.forEach((s) => console.log(s))
