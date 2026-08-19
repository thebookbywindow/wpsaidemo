/**
 * PDF Tools header mega menu — aligned with https://pdf.wps.com/en/.
 * The trigger keeps its existing internal key so the shared desktop/mobile
 * navigation state remains stable while the visible menu matches WPS PDF.
 */

export const FREE_AI_TOOLS_HEADER_MEGA_MENU = Object.freeze({
  groups: Object.freeze([
    Object.freeze({
      id: 'convertCompress',
      titleKey: 'convertCompress',
      items: Object.freeze([
        {
          id: 'compress-pdf',
          labelKey: 'compressPdf',
          iconKind: 'compress',
          url: 'https://pdf.wps.com/en/pdf-tools/compress-pdf/',
        },
        {
          id: 'convert-pdf',
          labelKey: 'convertPdf',
          iconKind: 'convert',
          url: 'https://pdf.wps.com/en/pdf-tools/convert-pdf/',
        },
      ]),
    }),
    Object.freeze({
      id: 'splitMerge',
      titleKey: 'splitMerge',
      items: Object.freeze([
        {
          id: 'split-pdf',
          labelKey: 'splitPdf',
          iconKind: 'split',
          url: 'https://pdf.wps.com/en/pdf-tools/split-pdf/',
        },
        {
          id: 'merge-pdf',
          labelKey: 'mergePdf',
          iconKind: 'merge',
          url: 'https://pdf.wps.com/en/pdf-tools/merge-pdf/',
        },
      ]),
    }),
    Object.freeze({
      id: 'sign',
      titleKey: 'sign',
      items: Object.freeze([
        {
          id: 'signing-pdf',
          labelKey: 'signingPdf',
          iconKind: 'sign',
          url: 'https://pdf.wps.com/en/pdf-tools/sign-pdf/',
        },
      ]),
    }),
    Object.freeze({
      id: 'convertFromPdf',
      titleKey: 'convertFromPdf',
      items: Object.freeze([
        {
          id: 'pdf-to-word',
          labelKey: 'pdfToWord',
          iconKind: 'word',
          url: 'https://pdf.wps.com/en/pdf-tools/pdf-to-word/',
        },
        {
          id: 'pdf-to-excel',
          labelKey: 'pdfToExcel',
          iconKind: 'excel',
          url: 'https://pdf.wps.com/en/pdf-tools/pdf-to-excel/',
        },
        {
          id: 'pdf-to-ppt',
          labelKey: 'pdfToPpt',
          iconKind: 'ppt',
          url: 'https://pdf.wps.com/en/pdf-tools/pdf-to-ppt/',
        },
        {
          id: 'pdf-to-jpg',
          labelKey: 'pdfToJpg',
          iconKind: 'jpg',
          url: 'https://pdf.wps.com/en/pdf-tools/pdf-to-jpg/',
        },
      ]),
    }),
    Object.freeze({
      id: 'convertToPdf',
      titleKey: 'convertToPdf',
      items: Object.freeze([
        {
          id: 'word-to-pdf',
          labelKey: 'wordToPdf',
          iconKind: 'word',
          url: 'https://pdf.wps.com/en/pdf-tools/word-to-pdf/',
        },
        {
          id: 'excel-to-pdf',
          labelKey: 'excelToPdf',
          iconKind: 'excel',
          url: 'https://pdf.wps.com/en/pdf-tools/excel-to-pdf/',
        },
        {
          id: 'ppt-to-pdf',
          labelKey: 'pptToPdf',
          iconKind: 'ppt',
          url: 'https://pdf.wps.com/en/pdf-tools/ppt-to-pdf/',
        },
        {
          id: 'jpg-to-pdf',
          labelKey: 'jpgToPdf',
          iconKind: 'jpg',
          url: 'https://pdf.wps.com/en/pdf-tools/jpg-to-pdf/',
        },
      ]),
    }),
    Object.freeze({
      id: 'otherConversion',
      titleKey: 'otherConversion',
      badgeKey: 'newBadge',
      items: Object.freeze([
        {
          id: 'xml-to-pdf',
          labelKey: 'xmlToPdf',
          iconKind: 'xml',
          url: 'https://pdf.wps.com/en/pdf-tools/xml-to-pdf/',
        },
        {
          id: 'word-to-jpg',
          labelKey: 'wordToJpg',
          iconKind: 'word',
          url: 'https://pdf.wps.com/en/pdf-tools/word-to-jpg/',
        },
        {
          id: 'jpg-to-word',
          labelKey: 'jpgToWord',
          iconKind: 'jpg',
          url: 'https://pdf.wps.com/en/pdf-tools/jpg-to-word/',
        },
      ]),
    }),
  ]),
})

export function resolveFreeAiToolsHeaderMegaMenu(copy = {}) {
  const groupTitles = copy.groups ?? {}
  const labels = copy.links ?? {}

  return {
    groups: FREE_AI_TOOLS_HEADER_MEGA_MENU.groups.map((group) => ({
      id: group.id,
      title: groupTitles[group.id] ?? group.titleKey,
      badge: group.badgeKey ? copy[group.badgeKey] ?? group.badgeKey : '',
      items: group.items.map((item) => ({
        ...item,
        label: labels[item.labelKey] ?? item.labelKey,
      })),
    })),
  }
}
