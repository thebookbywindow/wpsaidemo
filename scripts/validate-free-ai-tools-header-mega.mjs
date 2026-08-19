import {
  resolveFreeAiToolsHeaderMegaMenu,
  FREE_AI_TOOLS_HEADER_MEGA_MENU,
} from '../src/data/freeAiToolsHeaderMegaMenu.js'

const expected = {
  convertCompress: [
    'https://pdf.wps.com/en/pdf-tools/compress-pdf/',
    'https://pdf.wps.com/en/pdf-tools/convert-pdf/',
  ],
  splitMerge: [
    'https://pdf.wps.com/en/pdf-tools/split-pdf/',
    'https://pdf.wps.com/en/pdf-tools/merge-pdf/',
  ],
  sign: [
    'https://pdf.wps.com/en/pdf-tools/sign-pdf/',
  ],
  convertFromPdf: [
    'https://pdf.wps.com/en/pdf-tools/pdf-to-word/',
    'https://pdf.wps.com/en/pdf-tools/pdf-to-excel/',
    'https://pdf.wps.com/en/pdf-tools/pdf-to-ppt/',
    'https://pdf.wps.com/en/pdf-tools/pdf-to-jpg/',
  ],
  convertToPdf: [
    'https://pdf.wps.com/en/pdf-tools/word-to-pdf/',
    'https://pdf.wps.com/en/pdf-tools/excel-to-pdf/',
    'https://pdf.wps.com/en/pdf-tools/ppt-to-pdf/',
    'https://pdf.wps.com/en/pdf-tools/jpg-to-pdf/',
  ],
  otherConversion: [
    'https://pdf.wps.com/en/pdf-tools/xml-to-pdf/',
    'https://pdf.wps.com/en/pdf-tools/word-to-jpg/',
    'https://pdf.wps.com/en/pdf-tools/jpg-to-word/',
  ],
}

if (FREE_AI_TOOLS_HEADER_MEGA_MENU.groups.length !== 6) {
  throw new Error(
    `expected 6 groups, got ${FREE_AI_TOOLS_HEADER_MEGA_MENU.groups.length}`,
  )
}

for (const group of FREE_AI_TOOLS_HEADER_MEGA_MENU.groups) {
  const urls = expected[group.id]
  if (!urls) throw new Error(`unexpected group ${group.id}`)
  const got = group.items.map((item) => item.url)
  if (JSON.stringify(got) !== JSON.stringify(urls)) {
    throw new Error(`URL mismatch for ${group.id}\n${JSON.stringify(got, null, 2)}`)
  }
}

const resolved = resolveFreeAiToolsHeaderMegaMenu({
  groups: {
    convertCompress: 'Convert & Compress',
    splitMerge: 'Split & Merge',
    sign: 'Sign',
    convertFromPdf: 'Convert from PDF',
    convertToPdf: 'Convert to PDF',
    otherConversion: 'Other Conversion',
  },
  links: {
    compressPdf: 'Compress PDF',
    convertPdf: 'Convert PDF',
  },
})

if (resolved.groups[0].title !== 'Convert & Compress') {
  throw new Error('resolve title failed')
}
if (resolved.groups[0].items[0].label !== 'Compress PDF') {
  throw new Error('resolve label failed')
}
if (resolved.groups[5].badge !== 'newBadge') {
  throw new Error('resolve badge fallback failed')
}

console.log('validate-pdf-tools-header-mega: ok')
