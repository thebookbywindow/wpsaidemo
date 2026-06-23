export function joinPath(...segments) {
  const parts = segments
    .flat()
    .map((segment) => `${segment ?? ''}`.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)

  return parts.length ? `/${parts.join('/')}` : '/'
}
