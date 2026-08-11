/**
 * Products header mega menu — Platforms cards (Windows / Mac for now).
 * Visual pattern aligned with wps.com Products → Platforms.
 */

export const PRODUCTS_HEADER_MEGA_MENU = Object.freeze({
  groups: Object.freeze([
    Object.freeze({
      id: 'platforms',
      titleKey: 'platforms',
      items: Object.freeze([
        {
          id: 'windows',
          labelKey: 'windows',
          eyebrowKey: 'officeFor',
          url: 'https://www.wps.com/office/windows/',
          iconSrc: '/images/platforms/windows.svg',
        },
        {
          id: 'mac',
          labelKey: 'mac',
          eyebrowKey: 'officeFor',
          url: 'https://www.wps.com/office/mac/',
          iconSrc: '/images/platforms/macos.svg',
        },
      ]),
    }),
  ]),
})

export function resolveProductsHeaderMegaMenu(copy = {}) {
  return {
    groups: PRODUCTS_HEADER_MEGA_MENU.groups.map((group) => ({
      id: group.id,
      title: copy[group.titleKey] ?? group.titleKey,
      items: group.items.map((item) => ({
        id: item.id,
        url: item.url,
        iconSrc: item.iconSrc,
        label: copy[item.labelKey] ?? item.labelKey,
        eyebrow: copy[item.eyebrowKey] ?? item.eyebrowKey,
      })),
    })),
  }
}
