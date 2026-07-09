/**
 * Per-feature heading metadata for structured doc detail pages.
 * compound entries include a resolved type plus feature/action labels for templates.
 */
export const DOC_DETAIL_FEATURE_HEADING_META = {
  'create-document': {
    type: 'action',
    feature: { en: 'Create Document', zh: '新建文档' },
    action: { en: 'Create a Document', zh: '新建文档' },
  },
  'ai-read-aloud': {
    type: 'noun',
    feature: { en: 'AI Read Aloud', zh: 'AI 朗读' },
  },
  'share-after-compression': {
    type: 'compound',
    compound: {
      resolvedType: 'action',
      feature: { en: 'Share After Compression', zh: '压缩后分享' },
      action: { en: 'Share a Document After Compression', zh: '压缩后分享文档' },
    },
  },
  'install-sign-in': {
    type: 'compound',
    compound: {
      resolvedType: 'action',
      feature: { en: 'Install and Sign In', zh: '安装与登录' },
      action: { en: 'Install and Sign In to WPS', zh: '安装并登录 WPS' },
    },
  },
  'wps-writer': {
    type: 'noun',
    feature: { en: 'WPS Writer', zh: 'WPS 文字' },
  },
}

const KNOWN_FORMULA_NAMES = new Set([
  'VLOOKUP',
  'HLOOKUP',
  'SUM',
  'SUMIF',
  'COUNT',
  'COUNTIF',
  'AVERAGE',
  'IF',
  'INDEX',
  'MATCH',
  'XLOOKUP',
])

const COMPOUND_MARKERS_EN = /\b(and|after|before|then|to|from|into|with)\b|\/|&/i
const COMPOUND_MARKERS_ZH = /[后与及、]|之后|之前|并|及/

const ACTION_PREFIX_EN = /^(create|creating|install|export|share|merge|print|save|open|reduce|send|convert|compress|sign|read|write|edit|delete|remove|add|insert|update|download|upload)\b/i
const ACTION_PREFIX_ZH = /^(新建|创建|安装|导出|分享|合并|打印|保存|打开|压缩|发送|转换|登录|朗读|编辑|删除|添加|插入|更新|下载|上传)/

export function isKnownFormulaName(name = '') {
  const normalized = `${name}`.trim().toUpperCase()
  return KNOWN_FORMULA_NAMES.has(normalized) || /^[A-Z]{2,}$/.test(normalized)
}

export function looksLikeCompoundFeature(name = '', isZhContent = false) {
  const text = `${name}`.trim()
  if (!text) {
    return false
  }

  return isZhContent
    ? COMPOUND_MARKERS_ZH.test(text)
    : COMPOUND_MARKERS_EN.test(text)
}

export function looksLikeActionFeature(name = '', isZhContent = false) {
  const text = `${name}`.trim()
  if (!text) {
    return false
  }

  if (isZhContent) {
    return ACTION_PREFIX_ZH.test(text)
  }

  return ACTION_PREFIX_EN.test(text) || /^creating\b/i.test(text)
}

export function resolveCompoundFeatureLabels(featureName = '', isZhContent = false) {
  const text = `${featureName}`.trim()
  if (!text) {
    return {
      resolvedType: 'noun',
      feature: text,
      action: text,
    }
  }

  if (isZhContent) {
    const afterMatch = text.match(/^(.+?)后(.+)$/)
    if (afterMatch) {
      const [, prefix, suffix] = afterMatch
      return {
        resolvedType: 'action',
        feature: text,
        action: `${prefix}${suffix}`,
      }
    }

    const andMatch = text.match(/^(.+?)(?:与|及|并)(.+)$/)
    if (andMatch) {
      const [, first, second] = andMatch
      return {
        resolvedType: 'action',
        feature: text,
        action: `${first}并${second}`,
      }
    }
  } else {
    const afterMatch = text.match(/^(.+?)\s+after\s+(.+)$/i)
    if (afterMatch) {
      const [, actionPart, conditionPart] = afterMatch
      return {
        resolvedType: 'action',
        feature: text,
        action: `${actionPart.trim()} After ${conditionPart.trim()}`,
      }
    }

    const andMatch = text.match(/^(.+?)\s+and\s+(.+)$/i)
    if (andMatch) {
      const [, first, second] = andMatch
      return {
        resolvedType: 'action',
        feature: text,
        action: `${first.trim()} and ${second.trim()}`,
      }
    }
  }

  return {
    resolvedType: looksLikeActionFeature(text, isZhContent) ? 'action' : 'noun',
    feature: text,
    action: inferActionPhrase(text, isZhContent),
  }
}

export function inferActionPhrase(featureName = '', isZhContent = false) {
  const text = `${featureName}`.trim()
  if (!text) {
    return text
  }

  if (isZhContent) {
    return text
  }

  if (/^create\b/i.test(text)) {
    return text.replace(/^create\b/i, 'Create a')
  }

  if (/^creating\b/i.test(text)) {
    return text.replace(/^creating\b/i, 'Create a')
  }

  if (/^install\b/i.test(text)) {
    return `${text} to WPS`
  }

  return `Use ${text}`
}

export function getDocDetailFeatureHeadingMeta(routeSlug = '') {
  return DOC_DETAIL_FEATURE_HEADING_META[routeSlug] ?? null
}
