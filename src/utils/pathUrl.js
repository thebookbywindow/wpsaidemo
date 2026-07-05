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
    return '/'
  }

  return `/${parts.join('/')}/`
}
