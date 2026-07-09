import { DOC_DETAIL_TOC_PLATFORMS } from '../data/docDetailTocData'
import {
  getDocDetailFeatureHeadingMeta,
  inferActionPhrase,
  isKnownFormulaName,
  looksLikeActionFeature,
  looksLikeCompoundFeature,
  resolveCompoundFeatureLabels,
} from '../data/docDetailFeatureHeadingMeta'

const PLATFORM_LABELS_ZH = {
  windows: 'Windows',
  mac: 'Mac',
  linux: 'Linux',
  web: 'Web',
  android: 'Android',
  ios: 'iOS',
  common: '各平台',
}

function isZhLanguage(docLang = '') {
  return docLang === 'zh-cn' || docLang === 'zh-tw'
}

function getLocalizedValue(value, isZhContent) {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  return isZhContent ? value.zh ?? value.en ?? '' : value.en ?? value.zh ?? ''
}

function getPlatformLabel(platformId = '', isZhContent = false) {
  const normalized = `${platformId}`.trim().toLowerCase()
  if (!normalized || normalized === 'common' || normalized === 'feature') {
    return isZhContent ? PLATFORM_LABELS_ZH.common : 'All Platforms'
  }

  const matched = DOC_DETAIL_TOC_PLATFORMS.find((platform) => platform.id === normalized)
  if (matched) {
    if (isZhContent && PLATFORM_LABELS_ZH[normalized]) {
      return PLATFORM_LABELS_ZH[normalized]
    }
    return matched.label === 'IOS' ? 'iOS' : matched.label
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1)
}

function classifyFeatureType({
  routeSlug,
  featureName,
  isZhContent,
}) {
  const configured = getDocDetailFeatureHeadingMeta(routeSlug)
  if (configured?.type) {
    return configured
  }

  if (isKnownFormulaName(featureName)) {
    return {
      type: 'formula',
      feature: { en: featureName.toUpperCase(), zh: featureName.toUpperCase() },
    }
  }

  if (looksLikeCompoundFeature(featureName, isZhContent)) {
    const resolved = resolveCompoundFeatureLabels(featureName, isZhContent)
    return {
      type: 'compound',
      compound: {
        resolvedType: resolved.resolvedType,
        feature: {
          en: featureName,
          zh: featureName,
        },
        action: {
          en: resolved.action,
          zh: resolved.action,
        },
      },
    }
  }

  if (looksLikeActionFeature(featureName, isZhContent)) {
    return {
      type: 'action',
      feature: { en: featureName, zh: featureName },
      action: {
        en: inferActionPhrase(featureName, false),
        zh: featureName,
      },
    }
  }

  return {
    type: 'noun',
    feature: { en: featureName, zh: featureName },
  }
}

function resolveFeatureContext({
  routeSlug,
  docTitle,
  isZhContent,
}) {
  const configured = classifyFeatureType({
    routeSlug,
    featureName: docTitle,
    isZhContent,
  })

  if (configured.type === 'compound' && configured.compound) {
    const { resolvedType, feature, action } = configured.compound
    return {
      type: resolvedType,
      feature: getLocalizedValue(feature, isZhContent),
      action: getLocalizedValue(action, isZhContent),
      functionName: '',
    }
  }

  const feature = getLocalizedValue(configured.feature ?? docTitle, isZhContent)
  const action = getLocalizedValue(
    configured.action ?? inferActionPhrase(feature, isZhContent),
    isZhContent,
  )

  return {
    type: configured.type,
    feature,
    action,
    functionName: configured.type === 'formula'
      ? getLocalizedValue(configured.feature ?? docTitle, isZhContent).toUpperCase()
      : '',
  }
}

function buildEnglishHeading(sectionId, context, platform) {
  const { type, feature, action, functionName } = context

  switch (sectionId) {
    case 'features-overview':
      if (type === 'formula') {
        return `${functionName || feature} in WPS on ${platform}: Introduction`
      }
      if (type === 'action') {
        return `${feature} in WPS on ${platform}: Introduction`
      }
      return `WPS ${feature} on ${platform}: Introduction`
    case 'how-to-guide':
      if (type === 'formula') {
        return `How to Use the ${functionName || feature} Function in WPS on ${platform}`
      }
      if (type === 'action') {
        return `How to ${action} in WPS on ${platform}`
      }
      return `How to Use WPS ${feature} on ${platform}`
    case 'faq':
      if (type === 'formula') {
        return `${functionName || feature} in WPS on ${platform} FAQ`
      }
      if (type === 'action') {
        return `${feature} in WPS on ${platform} FAQ`
      }
      return `WPS ${feature} on ${platform} FAQ`
    default:
      return feature
  }
}

function buildChineseHeading(sectionId, context, platform) {
  const { type, feature, action, functionName } = context

  switch (sectionId) {
    case 'features-overview':
      if (type === 'formula') {
        return `WPS ${platform} ${functionName || feature} 函数：简介`
      }
      if (type === 'action') {
        return `在 WPS ${platform} 上${feature}：简介`
      }
      return `WPS ${platform} ${feature}：简介`
    case 'how-to-guide':
      if (type === 'formula') {
        return `如何在 WPS ${platform} 中使用 ${functionName || feature} 函数`
      }
      if (type === 'action') {
        return `如何在 WPS ${platform} 上${action}`
      }
      return `如何在 WPS ${platform} 上使用${feature}`
    case 'faq':
      if (type === 'formula') {
        return `WPS ${platform} ${functionName || feature} 函数常见问题`
      }
      if (type === 'action') {
        return `在 WPS ${platform} 上${feature}常见问题`
      }
      return `WPS ${platform} ${feature}常见问题`
    default:
      return feature
  }
}

export function buildDocDetailArticleHeading({
  routeSlug = '',
  sectionId = '',
  platformId = '',
  docTitle = '',
  docLang = 'en-us',
}) {
  const title = `${docTitle ?? ''}`.trim()
  if (!title || !sectionId) {
    return title
  }

  const isZhContent = isZhLanguage(docLang)
  const platform = getPlatformLabel(platformId, isZhContent)
  const context = resolveFeatureContext({
    routeSlug,
    docTitle: title,
    isZhContent,
  })

  if (isZhContent) {
    return buildChineseHeading(sectionId, context, platform)
  }

  return buildEnglishHeading(sectionId, context, platform)
}

/** @deprecated Use buildDocDetailArticleHeading for template-based headings. */
export function getDocDetailArticleHeading(docTitle, sectionLabel) {
  const title = `${docTitle ?? ''}`.trim()
  const section = `${sectionLabel ?? ''}`.trim()

  if (title && section) {
    return `${title} · ${section}`
  }

  return title || section
}
