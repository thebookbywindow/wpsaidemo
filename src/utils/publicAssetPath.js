const rawBaseUrl =
  typeof import.meta !== 'undefined'
  && import.meta.env
  && typeof import.meta.env.BASE_URL === 'string'
    ? import.meta.env.BASE_URL
    : '/'

export const PUBLIC_BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl : `${rawBaseUrl}/`
export const PUBLIC_BASE_PATH = PUBLIC_BASE_URL === '/' ? '' : PUBLIC_BASE_URL.slice(0, -1)

function isExternalPath(value) {
  return /^(?:[a-z][a-z\d+.-]*:|\/\/|data:|#)/i.test(value)
}

export function withPublicAssetPath(path = '') {
  const value = `${path ?? ''}`
  if (!value || isExternalPath(value)) {
    return value
  }

  const normalized = value.replace(/^\/+/, '')
  const normalizedBasePath = PUBLIC_BASE_PATH.replace(/^\/+/, '')
  if (
    normalizedBasePath
    && (normalized === normalizedBasePath || normalized.startsWith(`${normalizedBasePath}/`))
  ) {
    return `/${normalized}`
  }

  return `${PUBLIC_BASE_URL}${normalized}`
}

export function stripPublicBasePath(pathname = '') {
  const value = `${pathname || '/'}`
  if (!PUBLIC_BASE_PATH) {
    return value
  }

  if (value === PUBLIC_BASE_PATH || value === `${PUBLIC_BASE_PATH}/`) {
    return '/'
  }

  if (value.startsWith(`${PUBLIC_BASE_PATH}/`)) {
    return value.slice(PUBLIC_BASE_PATH.length)
  }

  return value
}
