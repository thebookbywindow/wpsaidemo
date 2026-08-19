export function getBreadcrumbDocParts(docDisplayParts = []) {
  if (docDisplayParts.length >= 3) {
    return [docDisplayParts[docDisplayParts.length - 1]]
  }

  return docDisplayParts.slice(1)
}

export function getDocDetailDisplayTitle(docDisplayParts = []) {
  const breadcrumbParts = getBreadcrumbDocParts(docDisplayParts)
  if (breadcrumbParts.length > 0) {
    return breadcrumbParts[breadcrumbParts.length - 1]
  }

  return docDisplayParts[docDisplayParts.length - 1] ?? ''
}
