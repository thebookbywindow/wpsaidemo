/**
 * Resources mega menu — Docs Center hub + four core app L1 sections.
 */

export const RESOURCES_DOCS_CORE_APPS = Object.freeze([
  Object.freeze({
    key: 'writer',
    sectionSlug: 'writer',
    iconSrc: '/icons/wps/docs.svg',
  }),
  Object.freeze({
    key: 'spreadsheet',
    sectionSlug: 'spreadsheet',
    iconSrc: '/icons/wps/sheets.svg',
  }),
  Object.freeze({
    key: 'presentation',
    sectionSlug: 'presentation',
    iconSrc: '/icons/wps/slides.svg',
  }),
  Object.freeze({
    key: 'pdf',
    sectionSlug: 'pdf',
    iconSrc: '/icons/wps/pdf.svg',
  }),
])

export function resolveResourcesHeaderMegaMenu(copy = {}) {
  const appLabels = copy.apps ?? {}
  return {
    docsCenter: {
      title: copy.docsCenterTitle ?? 'Docs Center',
    },
    coreAppsTitle: copy.coreAppsTitle ?? 'Core apps',
    coreApps: RESOURCES_DOCS_CORE_APPS.map((app) => ({
      ...app,
      label: appLabels[app.key] ?? app.key,
    })),
  }
}
