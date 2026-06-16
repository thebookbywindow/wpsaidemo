export const DOC_DETAIL_TOC_PLATFORMS = [
  { id: 'windows', label: 'Windows' },
  { id: 'mac', label: 'Mac' },
  { id: 'linux', label: 'Linux' },
  { id: 'web', label: 'Web' },
  { id: 'android', label: 'Android' },
  { id: 'ios', label: 'iOS' },
]

export const DOC_DETAIL_TOC_SECTIONS_ZH = [
  { id: 'summary', label: '功能摘要' },
  { id: 'description', label: '功能说明' },
  { id: 'steps', label: '操作步骤' },
  { id: 'faq', label: '常见问题' },
  { id: 'related', label: '关联问题' },
  { id: 'notes', label: '注意事项' },
]

export const DOC_DETAIL_TOC_SECTIONS_EN = [
  { id: 'summary', label: 'Feature Summary' },
  { id: 'description', label: 'Feature Description' },
  { id: 'steps', label: 'Steps' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Questions' },
  { id: 'notes', label: 'Notes' },
]

export function getDocDetailTocSections(isZhContent) {
  return isZhContent ? DOC_DETAIL_TOC_SECTIONS_ZH : DOC_DETAIL_TOC_SECTIONS_EN
}
