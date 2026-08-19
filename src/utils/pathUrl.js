import { PUBLIC_BASE_PATH, PUBLIC_BASE_URL } from './publicAssetPath'

export function ensureTrailingSlash(pathname = '') {
  const normalized = `${pathname ?? ''}`.split('?')[0].split('#')[0]
  if (!normalized || normalized === '/') {
    return '/'
  }
  return normalized.endsWith('/') ? normalized : `${normalized}/`
}

export function joinPath(...segments) {
  const parts = segments
    .flat()
    .map((segment) => `${segment ?? ''}`.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)

  if (!parts.length) {
    return PUBLIC_BASE_URL
  }

  const joined = parts.join('/')
  const normalizedBasePath = PUBLIC_BASE_PATH.replace(/^\/+/, '')
  if (
    normalizedBasePath
    && (joined === normalizedBasePath || joined.startsWith(`${normalizedBasePath}/`))
  ) {
    return `/${joined}/`
  }

  return `${PUBLIC_BASE_URL}${joined}/`
}
